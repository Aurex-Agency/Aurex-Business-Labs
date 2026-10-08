import { test, expect } from "@playwright/test";
import { publicRoutes } from "../src/lib/site-config";
import { blockGoogleTracking } from "./analytics-helpers";
import { fillContact, submitContact } from "./form-helpers";
test.beforeEach(async ({ page }) => blockGoogleTracking(page));
for (const path of publicRoutes)
  test(`route ${path}: content, schema and contractor positioning without pricing`, async ({
    page,
  }) => {
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
      /\$17,000|\$8,000|45-Day Core Launch|two new implementation|Great presence\./,
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
test("legacy routes redirect without losing campaign parameters", async ({
  request,
}) => {
  for (const [from, to] of [
    ["/approach", "/revenue-capture-system"],
    ["/revenue-website", "/revenue-capture-system"],
    ["/revenue-website/thank-you", "/apply"],
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
    .getByRole("link", { name: "The System", exact: true })
    .click();
  await expect(page).toHaveURL(/\/revenue-capture-system$/);
  await page.goto("/work");
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
test("feeds keep contractor positioning without prices", async ({
  request,
}) => {
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
      /17,000|8,000|Great presence|Strategy, Websites/,
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
  await expect(
    page.getByRole("heading", {
      name: "More booked jobs. More from each lead.",
    }),
  ).toBeVisible();
  await expect(page.locator(".s-chapter")).toHaveCount(4);
});

test("homepage preserves the contractor offer and audit path without pricing", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByText("Aurex Revenue Capture System", { exact: true }).first(),
  ).toBeVisible();
  for (const name of ["Capture.", "Convert.", "Recover.", "Compound."])
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
  await page
    .getByRole("link", { name: "Request an audit", exact: true })
    .click();
  await expect(page).toHaveURL(/\/apply$/);
  await expect(page.locator('[name="investmentReady"]')).toHaveCount(0);
  await expect(page.locator('[name="smsConsent"]')).not.toBeChecked();
  await page
    .getByRole("button", { name: "Request My Revenue Leakage Audit" })
    .click();
  await expect(page.locator("#firstName")).toBeFocused();
  for (const [id, value] of Object.entries({
    firstName: "Alex",
    lastName: "Example",
    email: "alex@example.com",
    businessName: "Example Roofing",
    role: "Owner",
    primaryService: "Roof replacement",
    bottleneck: "Estimates need better follow-up",
  }))
    await page.locator(`#${id}`).fill(value);
  for (const [id, value] of Object.entries({
    trade: "Roofing",
    annualRevenue: "Prefer to discuss",
    monthlyLeads: "20 to 50",
    marketingSpend: "Not sure",
    jobValue: "Varies",
    hasStaff: "Yes",
    capacity: "Yes",
    tracksSales: "Partially",
    caseStudyInterest: "Maybe",
  }))
    await page.locator(`#${id}`).selectOption(value);
  await page.route("**/api/leads", (route) => {
    const data = route.request().postDataJSON();
    expect(data.sourcePage).toBe("/apply");
    expect(data.investmentReady).toBeUndefined();
    expect(data.smsConsent).toBe(false);
    return route.fulfill({ json: { success: true, receipt: "audit-fixture" } });
  });
  await page
    .getByRole("button", { name: "Request My Revenue Leakage Audit" })
    .click();
  await expect(page.locator("form")).toHaveCount(0);
});
