import { test, expect } from "@playwright/test";
import { publicRoutes } from "../src/lib/site-config";
import { blockGoogleTracking } from "./analytics-helpers";
import { fillContact, submitContact } from "./form-helpers";
test.beforeEach(async ({ page }) => blockGoogleTracking(page));
for (const path of publicRoutes)
  test(`route ${path}: content, schema and offer removal`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    const r = await page.goto(path);
    expect(r?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://aurexbusinesslab.com${path === "/" ? "" : path}`,
    );
    for (const raw of await page
      .locator('script[type="application/ld+json"]')
      .allTextContents())
      expect(JSON.parse(raw)["@context"]).toBe("https://schema.org");
    expect(await page.content()).not.toMatch(
      /Revenue Capture System|Revenue Leakage Audit|\$17,000|45-Day Core Launch|120-day partnership|two new implementation/,
    );
    expect(errors).toEqual([]);
  });
test("all internal links resolve", async ({ page, request }) => {
  const paths = new Set<string>();
  for (const p of publicRoutes) {
    await page.goto(p);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")!)))
      paths.add(href.split("#")[0]);
  }
  for (const p of paths)
    expect((await request.get(p)).status(), p).toBeLessThan(400);
});
test("retired offer routes redirect without losing campaign parameters", async ({
  request,
}) => {
  for (const [from, to] of [
    ["/revenue-website", "/approach"],
    ["/revenue-capture-system", "/approach"],
    ["/apply", "/contact"],
    ["/revenue-website/thank-you", "/contact"],
    ["/results", "/work"],
    ["/results/roofing-revenue-system", "/work"],
  ]) {
    const r = await request.get(`${from}?utm_source=fixture`, {
      maxRedirects: 0,
    });
    expect(r.status()).toBe(301);
    expect(r.headers().location).toBe(`${to}?utm_source=fixture`);
  }
});
test("desktop navigation, project journey and mobile dialog keyboard control", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/work$/);
  await page.getByRole("link", { name: /Norton Equipment Co/ }).click();
  await expect(page).toHaveURL(/\/work\/norton-equipment$/);
  await page.getByRole("link", { name: "Next project" }).click();
  await expect(page).toHaveURL(/\/work\/triple-r-trailers$/);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /About/ })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("contact form errors, failure recovery and confirmed success", async ({
  page,
}) => {
  await page.goto("/contact");
  await submitContact(page);
  await expect(page.locator("#firstName")).toBeFocused();
  await expect(page.locator("#firstName")).toHaveAttribute(
    "aria-describedby",
    "firstName-error",
  );
  await fillContact(page);
  await page.route("**/api/leads", (route) =>
    route.fulfill({
      status: 502,
      json: { success: false, message: "Delivery failed. Please try again." },
    }),
  );
  await submitContact(page);
  await expect(page.getByRole("status")).toContainText("Delivery failed");
  await expect(page.locator("#email")).toHaveValue("alex@example.com");
  await page.route("**/api/leads", (route) => {
    const data = route.request().postDataJSON();
    expect(data.sourcePage).toBe("/contact");
    expect(data.investmentReady).toBeUndefined();
    return route.fulfill({
      json: { success: true, receipt: "studio-fixture" },
    });
  });
  await submitContact(page);
  await expect(page.getByRole("status")).toContainText("Message received");
  await expect(page.locator("form")).toHaveCount(0);
});
test("production without delivery configuration fails closed", async ({
  request,
}) => {
  const r = await request.post("/api/leads", {
    headers: { "x-real-ip": "studio-fixture" },
    data: {
      firstName: "Synthetic",
      lastName: "Example",
      email: "test@example.com",
      businessName: "Fixture",
      challenge: "A synthetic contact-form test.",
      sourcePage: "/contact",
      startedAt: Date.now() - 10000,
      companyWebsite: "",
    },
  });
  expect(r.status()).toBe(503);
});
test("feeds contain no retired offer", async ({ request }) => {
  for (const p of [
    "/sitemap.xml",
    "/llms.txt",
    "/rss.xml",
    "/robots.txt",
    "/manifest.webmanifest",
  ]) {
    const r = await request.get(p);
    expect(r.status()).toBe(200);
    expect(await r.text()).not.toMatch(
      /Revenue Capture System|Revenue Leakage Audit|17,000|\/apply|\/revenue-capture-system/,
    );
  }
  expect((await request.get("/not-real")).status()).toBe(404);
});
for (const width of [375, 768, 1440])
  test(`responsive pages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of publicRoutes) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        path,
      ).toBe(true);
    }
  });
test("scroll motion responds and reduced-motion keeps the complete experience", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const art = page.locator(".s-hero-art");
  await page.waitForTimeout(1500);
  const initial = await art.evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollTo(0, 450));
  await expect
    .poll(() => art.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(initial);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const still = await art.evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollTo(0, 450));
  await page.waitForTimeout(250);
  expect(await art.evaluate((el) => getComputedStyle(el).transform)).toBe(
    still,
  );
  await expect(page.locator(".s-project")).toHaveCount(4);
  await expect(page.locator(".s-chapter")).toHaveCount(3);
});
