import { test, expect } from "@playwright/test";
import { blockGoogleTracking, googleCommands } from "./analytics-helpers";
import { fillAudit, submitAudit } from "./form-helpers";
test.beforeEach(async ({ page }) => blockGoogleTracking(page));
test("confirmed submission emits no sale, booking or revenue", async ({
  page,
}) => {
  await page.goto("/apply");
  expect(
    (await googleCommands(page)).some(([, n]) => n === "application_submit"),
  ).toBe(false);
  await fillAudit(page);
  await page.route("**/api/leads", (route) =>
    route.fulfill({ json: { success: true, receipt: "analytics-fixture" } }),
  );
  await submitAudit(page);
  await expect
    .poll(
      async () =>
        (await googleCommands(page)).filter(
          ([, n]) => n === "application_submit",
        ).length,
    )
    .toBe(1);
  const commands = await googleCommands(page);
  expect(JSON.stringify(commands)).not.toMatch(
    /alex@example|6625550100|17000|purchase|calendar_booked/,
  );
  await page.reload();
  await expect(page.locator("#google-tag-config")).toHaveCount(1);
  expect(
    (await googleCommands(page)).filter(([, n]) => n === "application_submit"),
  ).toHaveLength(0);
});
test("failed submission never emits a conversion", async ({ page }) => {
  await page.goto("/apply");
  await fillAudit(page);
  await page.route("**/api/leads", (route) =>
    route.fulfill({
      status: 503,
      json: { success: false, message: "Unavailable" },
    }),
  );
  await submitAudit(page);
  await expect(page.getByRole("status")).toHaveText("Unavailable");
  expect(
    (await googleCommands(page)).some(([, n]) =>
      ["application_submit", "lead_submit_success", "conversion"].includes(
        String(n),
      ),
    ),
  ).toBe(false);
});
test("audit CTA and case-study view use consistent event names", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Request a Revenue Leakage Audit", exact: true })
    .first()
    .click();
  await expect
    .poll(async () =>
      (await googleCommands(page)).some(([, n]) => n === "audit_cta_click"),
    )
    .toBe(true);
  await page.goto("/results/roofing-revenue-system");
  await expect
    .poll(async () =>
      (await googleCommands(page)).some(([, n]) => n === "case_study_view"),
    )
    .toBe(true);
});
