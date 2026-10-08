import { test, expect } from "@playwright/test";
import { publicRoutes } from "../src/lib/site-config";
import { blockGoogleTracking } from "./analytics-helpers";
import { fillAudit, submitAudit } from "./form-helpers";
test.beforeEach(async ({ page }) => blockGoogleTracking(page));
for (const path of publicRoutes) {
  test(`route ${path}: content, canonical, schema and no runtime errors`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://aurexbusinesslab.com${path === "/" ? "" : path}`,
    );
    expect((await page.title()).length).toBeGreaterThan(20);
    for (const raw of await page
      .locator('script[type="application/ld+json"]')
      .allTextContents())
      expect(JSON.parse(raw)["@context"]).toBe("https://schema.org");
    expect(await page.locator("body").innerText()).not.toMatch(
      /\$320,?000|\$320K|Aurex Agency/,
    );
    expect(errors).toEqual([]);
  });
}
test("all public internal links resolve", async ({ page, request }) => {
  const paths = new Set<string>();
  for (const path of publicRoutes) {
    await page.goto(path);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")!)))
      paths.add(href.split("#")[0]);
  }
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBeLessThan(400);
  }
});
test("homepage and legacy redirects preserve campaigns", async ({
  request,
}) => {
  expect((await request.get("/", { maxRedirects: 0 })).status()).toBe(200);
  for (const [from, to] of [
    ["/revenue-website", "/revenue-capture-system"],
    ["/revenue-website/thank-you", "/apply"],
  ]) {
    const res = await request.get(`${from}?utm_source=fixture`, {
      maxRedirects: 0,
    });
    expect(res.status()).toBe(301);
    expect(res.headers().location).toBe(`${to}?utm_source=fixture`);
  }
});
test("navigation and mobile keyboard dismissal", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "Results", exact: true })
    .click();
  await expect(page).toHaveURL(/\/results$/);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/about$/);
});
test("application validates, preserves answers on failure, and confirms only delivery", async ({
  page,
}) => {
  await page.goto("/apply");
  await submitAudit(page);
  await expect(page.locator("#firstName")).toBeFocused();
  await expect(page.locator("#firstName")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByRole("checkbox")).not.toBeChecked();
  await fillAudit(page);
  await page.route("**/api/leads", (route) =>
    route.fulfill({
      status: 502,
      json: { success: false, message: "Delivery failed. Please try again." },
    }),
  );
  await submitAudit(page);
  await expect(page.getByRole("status")).toContainText("Delivery failed");
  await expect(page.locator("#email")).toHaveValue("alex@example.com");
  await page.route("**/api/leads", async (route) => {
    expect(route.request().postDataJSON().smsConsent).toBe(false);
    expect(route.request().postDataJSON().sourcePage).toBe("/apply");
    await route.fulfill({
      json: { success: true, receipt: "fixture-success" },
    });
  });
  await submitAudit(page);
  await expect(page.getByRole("status")).toContainText("has been received");
  await expect(page.locator("form")).toHaveCount(0);
});
test("production missing webhook returns an error", async ({ request }) => {
  const response = await request.post("/api/leads", {
    data: {
      firstName: "Fixture",
      lastName: "Test",
      businessName: "Synthetic test",
      email: "test@example.com",
      sourcePage: "/revenue-website",
      companyWebsite: "",
      startedAt: Date.now() - 10000,
    },
    headers: { "x-real-ip": "browser-test-fixture" },
  });
  expect(response.status()).toBe(503);
  expect((await response.json()).success).toBe(false);
});
test("feeds, robots, sitemap, manifest and missing registration", async ({
  page,
  request,
}) => {
  for (const path of [
    "/sitemap.xml",
    "/robots.txt",
    "/llms.txt",
    "/rss.xml",
    "/manifest.webmanifest",
  ]) {
    const r = await request.get(path);
    expect(r.status()).toBe(200);
    expect(await r.text()).not.toContain("320,000");
  }
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("User-Agent: OAI-SearchBot");
  expect(robots).toContain("User-Agent: GPTBot\nDisallow: /");
  await page.goto("/contractor-revenue-scorecard");
  await expect(
    page.getByText("Registration is not open yet.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Browse Contractor Insights" }).click();
  await expect(page).toHaveURL(/\/insights$/);
  expect((await request.get("/not-a-real-page")).status()).toBe(404);
});
for (const width of [375, 768, 1440])
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
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
