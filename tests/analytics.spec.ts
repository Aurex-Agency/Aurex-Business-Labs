import { test, expect } from "@playwright/test";
import { blockGoogleTracking, googleCommands } from "./analytics-helpers";

test.beforeEach(async ({ page }) => {
  await blockGoogleTracking(page);
});

test("GA4 initializes once and sends one CTA event without form data", async ({
  page,
}) => {
  await page.goto("/revenue-website");
  await expect(page.locator('script[src*="/gtag/js"]')).toHaveCount(1);
  await expect
    .poll(
      async () =>
        (await googleCommands(page)).filter(
          ([command, id]) => command === "config" && id === "G-N6CM45VW84",
        ).length,
    )
    .toBe(1);
  await page
    .getByRole("link", { name: "Book My Free Website Review", exact: true })
    .click();
  const commands = await googleCommands(page);
  const events = commands.filter(
    ([command, name]) => command === "event" && name === "hero_cta_click",
  );
  expect(events).toEqual([
    [
      "event",
      "hero_cta_click",
      { item: "below_video", send_to: "G-N6CM45VW84" },
    ],
  ]);
  expect(commands.filter(([command]) => command === "js")).toHaveLength(1);
  expect(commands.some(([, name]) => name === "lead_submit_success")).toBe(
    false,
  );
});

test("GA4 counts a confirmed lead once and never counts a direct thank-you visit", async ({
  page,
}) => {
  await page.goto("/revenue-website/thank-you");
  await expect(page.locator("#google-tag-config")).toHaveCount(1);
  expect(
    (await googleCommands(page)).some(
      ([, name]) => name === "lead_submit_success",
    ),
  ).toBe(false);
  await page.evaluate(() =>
    sessionStorage.setItem(
      "aurex-confirmed-lead",
      JSON.stringify({
        receipt: "analytics-test-receipt",
        time: Date.now(),
        development: false,
      }),
    ),
  );
  await page.reload();
  await expect
    .poll(
      async () =>
        (await googleCommands(page)).filter(
          ([, name]) => name === "lead_submit_success",
        ).length,
    )
    .toBe(1);
  expect(
    (await googleCommands(page)).find(
      ([, name]) => name === "lead_submit_success",
    ),
  ).toEqual([
    "event",
    "lead_submit_success",
    { transaction_id: "analytics-test-receipt", send_to: "G-N6CM45VW84" },
  ]);
  await page.reload();
  await expect(page.locator("#google-tag-config")).toHaveCount(1);
  expect(
    (await googleCommands(page)).some(
      ([, name]) => name === "lead_submit_success",
    ),
  ).toBe(false);
});
