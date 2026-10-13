import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { blockGoogleTracking } from "./analytics-helpers";

const tags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];

// Records Meta pixel calls so tests can prove which standard events fire.
async function recordPixel(page: Page) {
  await page.addInitScript(() => {
    const calls: unknown[][] = [];
    Object.assign(window, {
      __pixel: calls,
      fbq: (...args: unknown[]) => calls.push(args),
    });
  });
}
const standardEvents = (page: Page) =>
  page.evaluate(() =>
    (window as unknown as { __pixel: unknown[][] }).__pixel.filter(
      (c) => c[0] === "track",
    ),
  );

async function mockLeads(page: Page) {
  const posts: Record<string, unknown>[] = [];
  await page.route("**/api/leads", (route) => {
    const data = route.request().postDataJSON();
    posts.push(data);
    const qualified =
      data.annualRevenue !== "Under $500K" &&
      data.staff !== "No, it’s just me and the crew";
    return route.fulfill({
      json: {
        success: true,
        receipt: `receipt-${posts.length}`,
        route:
          data.stage === "partial"
            ? "partial"
            : qualified
              ? "qualified"
              : "unqualified",
      },
    });
  });
  return posts;
}

async function contactStep(page: Page) {
  await page.goto("/call");
  for (const [id, value] of Object.entries({
    firstName: "Alex",
    lastName: "Example",
    phone: "6625550100",
    email: "alex@example.com",
    businessName: "Example Roofing",
  }))
    await page.locator(`#call-${id}`).fill(value);
  await page.getByRole("button", { name: "Continue" }).click();
}

async function answer(page: Page, values: Record<string, string>) {
  for (const [id, value] of Object.entries(values))
    await page.locator(`#call-${id}`).selectOption(value);
  await page
    .getByRole("button", { name: /^(Continue|Submit and pick a time)/ })
    .click();
}

test.beforeEach(async ({ page }) => {
  await blockGoogleTracking(page);
  await recordPixel(page);
});

test("funnel page has no navigation and stays out of search", async ({
  page,
}) => {
  await page.goto("/call");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Stop losing revenue from leads that disappear",
    }),
  ).toBeVisible();
  await expect(page.locator("nav")).toHaveCount(0);
  await expect(page.locator("header a")).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(page.locator("#call-firstName")).toBeVisible();
});

test("qualified applicant sends a partial, then fires Lead once", async ({
  page,
}) => {
  const posts = await mockLeads(page);
  await contactStep(page);
  await expect(page.getByText("Step 2 of 5")).toBeVisible();
  expect(posts).toHaveLength(1);
  expect(posts[0].stage).toBe("partial");
  expect(posts[0].annualRevenue).toBeUndefined();
  await answer(page, { trade: "Roofing", annualRevenue: "$1M to $3M" });
  await answer(page, {
    monthlyLeads: "25 to 50",
    leadSource: "Google search",
    bottleneck: "Estimates go out but too few close",
  });
  await answer(page, {
    staff: "Yes, full-time staff",
    jobValue: "$15,000 to $30,000",
  });
  expect(await standardEvents(page)).toHaveLength(0);
  await answer(page, { caseStudyInterest: "Maybe, I’d want details" });
  await expect(
    page.getByRole("heading", { name: "Last step: pick a time for your call" }),
  ).toBeVisible();
  expect(posts[1].stage).toBe("complete");
  expect(posts[1].sourcePage).toBe("/call");
  expect(posts[1].contactTimezone).toMatch(/^[A-Za-z_]+(\/[A-Za-z0-9_+-]+)*$/);
  expect(await standardEvents(page)).toEqual([
    ["track", "Lead", {}, { eventID: "receipt-2" }],
  ]);
});

test("revenue under $500K exits early with no pixel event", async ({
  page,
}) => {
  const posts = await mockLeads(page);
  await contactStep(page);
  await answer(page, { trade: "HVAC", annualRevenue: "Under $500K" });
  await expect(
    page.getByText(/isn’t the right fit at this stage/),
  ).toBeVisible();
  expect(posts.at(-1)?.monthlyLeads).toBeUndefined();
  expect(await standardEvents(page)).toEqual([]);
});

test("no staff with small jobs is disqualified with no pixel event", async ({
  page,
}) => {
  await mockLeads(page);
  await contactStep(page);
  await answer(page, { trade: "Plumbing", annualRevenue: "$1M to $3M" });
  await answer(page, {
    monthlyLeads: "10 to 25",
    leadSource: "Paid ads",
    bottleneck: "Not enough leads coming in",
  });
  await answer(page, {
    staff: "No, it’s just me and the crew",
    jobValue: "Under $1,000",
  });
  await expect(
    page.getByText(/isn’t the right fit at this stage/),
  ).toBeVisible();
  expect(await standardEvents(page)).toEqual([]);
});

test("Other trade asks which trade", async ({ page }) => {
  await mockLeads(page);
  await contactStep(page);
  await page.locator("#call-trade").selectOption("Other");
  await page.locator("#call-annualRevenue").selectOption("$3M to $5M");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator("#call-tradeOther")).toBeFocused();
  await expect(page.locator("#call-tradeOther")).toHaveAttribute(
    "aria-describedby",
    "call-tradeOther-error",
  );
});

test("booked page fires Schedule once per session", async ({ page }) => {
  await page.goto(
    "/call/booked?event_start_time=2026-10-15T15:00:00Z&assigned_to=Aurex",
  );
  await expect(
    page.getByRole("heading", { level: 1, name: /You’re booked/ }),
  ).toBeVisible();
  await expect(page.getByText(/October 15/)).toBeVisible();
  await expect
    .poll(() => standardEvents(page))
    .toEqual([["track", "Schedule", {}]]);
  await page.reload();
  await expect(page.getByText(/October 15/)).toBeVisible();
  expect(await standardEvents(page)).toEqual([]);
});

for (const path of ["/call", "/call/booked"])
  test(`@a11y ${path}`, async ({ page }) => {
    await page.goto(path);
    expect(
      (await new AxeBuilder({ page }).withTags(tags).analyze()).violations,
    ).toEqual([]);
  });

test("@a11y funnel errors and later steps", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await mockLeads(page);
  await page.goto("/call");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator("#call-firstName")).toBeFocused();
  await expect(page.locator("#call-firstName")).toHaveAttribute(
    "aria-describedby",
    "call-firstName-error",
  );
  expect(
    (await new AxeBuilder({ page }).withTags(tags).analyze()).violations,
  ).toEqual([]);
  await contactStep(page);
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator("#call-trade")).toBeFocused();
  expect(
    (await new AxeBuilder({ page }).withTags(tags).analyze()).violations,
  ).toEqual([]);
});
