import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publicRoutes } from "../src/lib/site-config";
import { blockGoogleTracking } from "./analytics-helpers";
const tags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];
test.beforeEach(async ({ page }) => blockGoogleTracking(page));
for (const path of publicRoutes)
  test(`@a11y ${path}`, async ({ page }) => {
    await page.goto(path);
    expect(
      (await new AxeBuilder({ page }).withTags(tags).analyze()).violations,
    ).toEqual([]);
  });
test("@a11y mobile menu, error associations and skip navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/contact");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  expect(
    (await new AxeBuilder({ page }).withTags(tags).analyze()).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Send your message" }).click();
  await expect(page.locator("#firstName")).toHaveAttribute(
    "aria-describedby",
    "firstName-error",
  );
  expect(
    (await new AxeBuilder({ page }).withTags(tags).analyze()).violations,
  ).toEqual([]);
});

test("@a11y audit errors and form associations", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/apply");
  await page
    .getByRole("button", { name: "Request My Revenue Leakage Audit" })
    .click();
  await expect(page.locator("#firstName")).toHaveAttribute(
    "aria-describedby",
    "firstName-error",
  );
  expect(
    (await new AxeBuilder({ page }).withTags(tags).analyze()).violations,
  ).toEqual([]);
});
