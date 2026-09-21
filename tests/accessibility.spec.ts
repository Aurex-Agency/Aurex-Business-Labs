import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const tags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];
test("@a11y mobile booking dialog has an accessible name and controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route(
    "https://api.leadconnectorhq.com/widget/booking/**",
    (route) =>
      route.fulfill({
        contentType: "text/html",
        body: '<!doctype html><html lang="en"><head><title>Calendar fixture</title></head><body><main><h1>Available times</h1></main></body></html>',
      }),
  );
  await page.route("https://link.msgsndr.com/js/form_embed.js", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "" }),
  );
  await page.goto("/revenue-website/thank-you#book");
  await expect(
    page.getByRole("dialog", { name: "Choose your review time." }),
  ).toBeVisible();
  const result = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(result.violations).toEqual([]);
  await page.getByRole("button", { name: "Close booking calendar" }).click();
  await expect(
    page.getByRole("button", { name: "Choose My Review Time" }),
  ).toBeFocused();
});
test("@a11y landing page has no WCAG violations", async ({ page }) => {
  await page.goto("/revenue-website");
  await page.locator("#selected-work").scrollIntoViewIfNeeded();
  await expect(page.locator(".project-image").first()).toBeVisible();
  const result = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(result.violations).toEqual([]);
});
test("@a11y form error state and mobile menu have no WCAG violations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/revenue-website");
  await page
    .getByRole("button", { name: "Continue to the opportunity" })
    .click();
  let result = await new AxeBuilder({ page })
    .include("#review")
    .withTags(tags)
    .analyze();
  expect(result.violations).toEqual([]);
  await page.getByRole("button", { name: "Open menu" }).click();
  result = await new AxeBuilder({ page })
    .include(".site-header")
    .withTags(tags)
    .analyze();
  expect(result.violations).toEqual([]);
});
test("@a11y thank-you and privacy pages have no WCAG violations", async ({
  page,
}) => {
  for (const path of ["/revenue-website/thank-you", "/privacy"]) {
    await page.goto(path);
    const result = await new AxeBuilder({ page }).withTags(tags).analyze();
    expect(result.violations).toEqual([]);
  }
});
