import type { Page } from "@playwright/test";
export async function fillAudit(page: Page) {
  for (const [id, value] of Object.entries({
    firstName: "Alex",
    lastName: "Example",
    businessName: "Example Services",
    website: "example.com",
    email: "alex@example.com",
    phone: "6625550100",
    role: "Owner",
    primaryService: "Roof replacement",
    bottleneck: "Open estimates need consistent follow-up.",
  }))
    await page.locator(`#${id}`).fill(value);
  for (const id of [
    "trade",
    "annualRevenue",
    "monthlyLeads",
    "marketingSpend",
    "jobValue",
    "hasStaff",
    "capacity",
    "tracksSales",
    "investmentReady",
    "caseStudyInterest",
  ])
    await page.locator(`#${id}`).selectOption({ index: 1 });
}
export async function submitAudit(page: Page) {
  await page
    .getByRole("button", {
      name: "Request My Revenue Leakage Audit",
      exact: true,
    })
    .click();
}
