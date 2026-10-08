import type { Page } from "@playwright/test";
export async function fillContact(page: Page) {
  for (const [id, value] of Object.entries({
    firstName: "Alex",
    lastName: "Example",
    businessName: "Example Services",
    email: "alex@example.com",
    website: "example.com",
    phone: "6625550100",
    challenge: "We would like a more distinctive and useful website.",
  }))
    await page.locator(`#${id}`).fill(value);
}
export async function submitContact(page: Page) {
  await page
    .getByRole("button", { name: "Send your message", exact: true })
    .click();
}
