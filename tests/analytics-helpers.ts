import type { Page } from "@playwright/test";

export async function blockGoogleTracking(page: Page) {
  await page.route(
    /^https:\/\/([^/]+\.)?(googletagmanager\.com|google-analytics\.com)\//,
    (route) =>
      route.fulfill({ contentType: "application/javascript", body: "" }),
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
