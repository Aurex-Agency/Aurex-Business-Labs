import { test, expect } from "@playwright/test";
import { blockGoogleTracking, googleCommands } from "./analytics-helpers";
import { fillContact, submitContact } from "./form-helpers";
test.beforeEach(async ({ page }) => blockGoogleTracking(page));
test("confirmed submission emits no sale, booking or revenue", async ({
  page,
}) => {
  await page.goto("/contact");
  expect(
    (await googleCommands(page)).some(([, n]) => n === "contact_submit"),
  ).toBe(false);
  await fillContact(page);
  await page.route("**/api/leads", (route) =>
    route.fulfill({ json: { success: true, receipt: "analytics-fixture" } }),
  );
  await submitContact(page);
  await expect
    .poll(
      async () =>
        (await googleCommands(page)).filter(([, n]) => n === "contact_submit")
          .length,
    )
    .toBe(1);
  const commands = await googleCommands(page);
  expect(JSON.stringify(commands)).not.toMatch(
    /alex@example|6625550100|17000|purchase|calendar_booked/,
  );
  await page.reload();
  await expect(page.locator("#google-tag-config")).toHaveCount(1);
  expect(
    (await googleCommands(page)).filter(([, n]) => n === "contact_submit"),
  ).toHaveLength(0);
});
test("failed submission never emits a conversion", async ({ page }) => {
  await page.goto("/contact");
  await fillContact(page);
  await page.route("**/api/leads", (route) =>
    route.fulfill({
      status: 503,
      json: { success: false, message: "Unavailable" },
    }),
  );
  await submitContact(page);
  await expect(page.getByRole("status")).toHaveText("Unavailable");
  expect(
    (await googleCommands(page)).some(([, n]) =>
      ["contact_submit", "lead_submit_success", "conversion"].includes(
        String(n),
      ),
    ),
  ).toBe(false);
});
test("contact CTA and project view use consistent event names", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Let’s talk", exact: true })
    .first()
    .click();
  await expect
    .poll(async () =>
      (await googleCommands(page)).some(([, n]) => n === "contact_cta_click"),
    )
    .toBe(true);
  await page.goto("/work/norton-equipment");
  await expect
    .poll(async () =>
      (await googleCommands(page)).some(([, n]) => n === "project_view"),
    )
    .toBe(true);
});
