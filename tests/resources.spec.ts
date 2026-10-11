import { test, expect } from "@playwright/test";
import { blockGoogleTracking, googleCommands } from "./analytics-helpers";
import { resources } from "../src/content/resources";
test.beforeEach(async ({ page }) => blockGoogleTracking(page));
test("homepage directs readers to ungated resources without sales or financial qualification", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore free resources", exact: false })
    .click();
  await expect(page).toHaveURL(/\/resources$/);
  await expect(page.getByText("No sign-up required")).toBeVisible();
  for (const resource of resources)
    await expect(
      page.getByRole("link", { name: new RegExp(resource.title) }),
    ).toBeVisible();
  await page.goto("/apply");
  for (const name of [
    "annualRevenue",
    "marketingSpend",
    "jobValue",
    "investmentReady",
    "budget",
  ])
    await expect(page.locator(`[name="${name}"]`)).toHaveCount(0);
});
test("downloads contain the actual resource content without a form", async ({
  page,
  request,
}) => {
  for (const resource of resources) {
    await page.goto(`/resources/${resource.slug}`);
    await expect(page.locator('input[type="email"]')).toHaveCount(0);
    const link = page.getByRole("link", {
      name: resource.downloadLabel,
      exact: false,
    });
    await expect(link).toHaveAttribute("download", "");
    const response = await request.get(resource.download);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain(
      resource.visual === "scorecard" ? "Sold jobs" : resource.steps[0].title,
    );
  }
});
test("scorecard calculates actual handoffs, handles zero and rejects inconsistent cohorts", async ({
  page,
}) => {
  await page.goto("/resources/contractor-revenue-scorecard");
  const calculate = page.getByRole("button", {
    name: "Calculate handoff rates",
  });
  await calculate.click();
  await expect(page.locator("#scorecard-error")).toContainText(
    "Enter a whole number",
  );
  for (const [i, n] of [100, 80, 40, 30, 12].entries())
    await page.locator(`#count-${i}`).fill(String(n));
  await calculate.click();
  await expect(page.locator(".l-score-results dd")).toHaveText([
    "80.0%",
    "50.0%",
    "75.0%",
    "40.0%",
  ]);
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download your results" }).click();
  expect((await downloadEvent).suggestedFilename()).toBe("aurex-scorecard.csv");
  const commands = await googleCommands(page);
  const completion = commands.filter(
    ([, name]) => name === "resource_tool_complete",
  );
  expect(completion).toHaveLength(1);
  expect(JSON.stringify(completion)).not.toMatch(
    /80\.0|50\.0|75\.0|40\.0|inquiries|counts/,
  );
  expect(
    commands.some(([, name]) =>
      ["conversion", "lead_submit_success"].includes(String(name)),
    ),
  ).toBe(false);
  await page.locator("#count-1").fill("101");
  await calculate.click();
  await expect(page.locator("#scorecard-error")).toContainText(
    "same group of inquiries",
  );
  await expect(page.locator(".l-score-results")).toHaveCount(0);
  for (let i = 0; i < 5; i++) await page.locator(`#count-${i}`).fill("0");
  await calculate.click();
  await expect(page.locator(".l-score-results dd")).toHaveText(
    Array(4).fill("No denominator"),
  );
  await page.getByRole("button", { name: "Reset", exact: false }).click();
  await expect(page.locator("#count-0")).toHaveValue("");
});
test("checklist supports keyboard review, reset and session-only progress", async ({
  page,
}) => {
  await page.goto("/resources/lead-response-checklist");
  const checks = page.getByRole("checkbox");
  await checks.first().focus();
  await page.keyboard.press("Space");
  await expect(checks.first()).toBeChecked();
  await expect(
    page.getByText("1 of 10 reviewed", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset", exact: false }).click();
  await expect(checks.first()).not.toBeChecked();
  await checks.first().check();
  await page.reload();
  await expect(page.getByRole("checkbox").first()).not.toBeChecked();
});
test("educational content and downloads remain available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3002/");
  await expect(
    page.getByRole("heading", { name: "Good work deserves a better system." }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Explore free resources", exact: false })
    .click();
  await page
    .getByRole("link", { name: /Open Estimate Follow-up Playbook/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "Agree on the next conversation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Download the playbook/ }),
  ).toBeVisible();
  await context.close();
});

test("framework controls change the illustrated stage and resource destination", async ({
  page,
}) => {
  await page.goto("/revenue-capture-system");
  const controls = page.locator(".f-explorer-controls");
  await controls.getByRole("button", { name: /Recover/ }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.locator(".f-explorer-scene .l-message-scene"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore the recover resource" }),
  ).toHaveAttribute("href", "/resources/estimate-follow-up-playbook");
  await controls.getByRole("button", { name: /Compound/ }).click();
  await expect(
    page.locator(".f-explorer-scene .l-compound-scene"),
  ).toBeVisible();
});
