import type { Page } from "@playwright/test";
export async function blockGoogleTracking(page: Page) {
  // Prevent analytics, calendars and registration providers from receiving test traffic.
  await page.route(/^https:\/\//, (route) =>
    route.fulfill({
      contentType:
        route.request().resourceType() === "document"
          ? "text/html"
          : "application/javascript",
      body:
        route.request().resourceType() === "document"
          ? "<!doctype html><html lang='en'><title>Test provider</title><body><main>Test provider</main></body></html>"
          : "",
    }),
  );
}
export async function googleCommands(page: Page) {
  return page.evaluate(() =>
    (window.dataLayer || [])
      .filter(
        (entry) => entry && typeof entry === "object" && "length" in entry,
      )
      .map((entry) => Array.from(entry as ArrayLike<unknown>)),
  );
}
