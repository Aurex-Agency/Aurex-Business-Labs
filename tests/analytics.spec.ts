import { test, expect } from "@playwright/test";
import { blockGoogleTracking, googleCommands } from "./analytics-helpers";

test.beforeEach(async ({ page }) => {
  await blockGoogleTracking(page);
});

test("GA4 and Ads initialize once and sends one CTA event without form data", async ({
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
  expect(
    (await googleCommands(page)).filter(
      ([command, id]) => command === "config" && id === "AW-18192936048",
    ),
  ).toHaveLength(1);
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

test("GA4 and Ads count a confirmed lead once and never counts a direct thank-you visit", async ({
  page,
}) => {
  await page.goto("/revenue-website/thank-you");
  await expect(page.locator("#google-tag-config")).toHaveCount(1);
  expect(
    (await googleCommands(page)).some(
      ([, name]) => name === "lead_submit_success",
    ),
  ).toBe(false);
  expect(
    (await googleCommands(page)).some(([, name]) => name === "conversion"),
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
  expect(
    (await googleCommands(page)).filter(([, name]) => name === "conversion"),
  ).toEqual([
    [
      "event",
      "conversion",
      {
        send_to: "AW-18192936048/zv3HCJH3sYAdEPDYiOND",
        transaction_id: "analytics-test-receipt",
      },
    ],
  ]);
  await page.reload();
  await expect(page.locator("#google-tag-config")).toHaveCount(1);
  expect(
    (await googleCommands(page)).some(
      ([, name]) => name === "lead_submit_success",
    ),
  ).toBe(false);
  expect(
    (await googleCommands(page)).some(([, name]) => name === "conversion"),
  ).toBe(false);
});

for (const scenario of ["development", "expired"] as const) {
  test(`GA4 and Ads ignore a ${scenario} submission receipt`, async ({
    page,
  }) => {
    await page.goto("/revenue-website/thank-you");
    await page.evaluate(
      (scenario) =>
        sessionStorage.setItem(
          "aurex-confirmed-lead",
          JSON.stringify({
            receipt: "ignored-receipt",
            time: Date.now() - (scenario === "expired" ? 31 * 60 * 1000 : 0),
            development: scenario === "development",
          }),
        ),
      scenario,
    );
    await page.reload();
    await expect(page.locator("#google-tag-config")).toHaveCount(1);
    expect(
      (await googleCommands(page)).some(
        ([, name]) => name === "conversion" || name === "lead_submit_success",
      ),
    ).toBe(false);
    expect(
      await page.evaluate(() => sessionStorage.getItem("aurex-confirmed-lead")),
    ).toBeNull();
  });
}
