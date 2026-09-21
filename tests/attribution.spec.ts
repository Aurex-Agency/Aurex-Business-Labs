import { test, expect, type Page } from "@playwright/test";
import { blockGoogleTracking, googleCommands } from "./analytics-helpers";
import {
  ATTRIBUTION_STORAGE_KEY as KEY,
  ATTRIBUTION_TTL as TTL,
  type Attribution,
} from "../src/lib/attribution";

const read = (
  page: Page,
  kind: "sessionStorage" | "localStorage" = "sessionStorage",
): Promise<Attribution> =>
  page.evaluate(
    ({ key, kind }) => JSON.parse(window[kind].getItem(key) || "{}") ?? {},
    { key: KEY, kind },
  );
async function captured(page: Page) {
  await expect
    .poll(async () => (await read(page)).firstTouch?.storedAt)
    .toBeGreaterThan(0);
  return read(page);
}
async function fillAndSubmit(page: Page) {
  for (const [id, value] of Object.entries({
    firstName: "Alex",
    lastName: "Example",
    businessName: "Example Services",
    website: "example.com",
    email: "alex@example.com",
    phone: "6625550100",
    city: "Tupelo",
  }))
    await page.locator(`#${id}`).fill(value);
  await page
    .getByRole("button", { name: "Continue to the opportunity" })
    .click();
  await page.locator("#service").fill("Equipment sales");
  await page.locator("#customerValue").selectOption("$5,000 to $10,000");
  await page.locator("#timeline").selectOption("Within 30 days");
  await page.locator("#source").fill("Google");
  await page.locator("#budget").selectOption("$5,000 to $10,000");
  await page
    .locator("#challenge")
    .fill("We need a better website for our business.");
  await page
    .getByRole("button", { name: "Request My Free Review", exact: true })
    .click();
}

test.beforeEach(async ({ page }) => {
  await blockGoogleTracking(page);
  await page.route(
    "https://api.leadconnectorhq.com/widget/booking/**",
    (route) =>
      route.fulfill({ contentType: "text/html", body: "<p>Test calendar</p>" }),
  );
  await page.route("https://link.msgsndr.com/js/form_embed.js", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "" }),
  );
});

test("captures every UTM and exact-case GCLID through the homepage redirect", async ({
  page,
}) => {
  const fields = {
    utm_source: "Google",
    utm_medium: "cpc",
    utm_campaign: "Website Fall",
    utm_term: "Custom Sites",
    utm_content: "Blue Video",
    gclid: "AbC_123-XyZ+Plus",
  };
  await page.goto(`/?${new URLSearchParams(fields)}`);
  await expect(page).toHaveURL(/\/revenue-website\?/);
  const value = await captured(page);
  expect(value.firstTouch).toMatchObject(fields);
  expect(value.latestTouch).toEqual(value.firstTouch);
  expect(value.firstTouch!.expiresAt - value.firstTouch!.storedAt).toBe(TTL);
  expect(await read(page, "localStorage")).toEqual(value);
});
for (const key of ["wbraid", "gbraid", "msclkid", "fbclid"] as const) {
  test(`captures ${key.toUpperCase()} with exact capitalization`, async ({
    page,
  }) => {
    await page.goto(`/revenue-website?${key}=AbC_123-XyZ`);
    const value = await captured(page);
    expect(value.firstTouch?.[key]).toBe("AbC_123-XyZ");
    expect(value.latestTouch?.[key]).toBe("AbC_123-XyZ");
  });
}

test("same-tab navigation and query removal retain both touches without renewing expiration", async ({
  page,
}) => {
  await page.goto("/revenue-website?utm_source=google&gclid=InitialGCLID");
  const initial = await captured(page);
  await page.evaluate(() =>
    history.replaceState(null, "", "/revenue-website#review"),
  );
  await page.goto("/privacy");
  await page.goto("/revenue-website");
  expect(await captured(page)).toEqual(initial);
  expect(await read(page, "localStorage")).toEqual(initial);
});

test("new tab restores attribution after the original tab is closed", async ({
  page,
  context,
}) => {
  await page.goto("/revenue-website?utm_source=google&wbraid=FirstBraid");
  const initial = await captured(page);
  await page.close();
  const next = await context.newPage();
  await blockGoogleTracking(next);
  await next.goto("/revenue-website");
  expect(await captured(next)).toEqual(initial);
});

test("first touch stays fixed while latest touch replaces rather than mixes campaigns", async ({
  page,
}) => {
  const now = Date.now();
  await page.clock.setFixedTime(now);
  await page.goto(
    "/revenue-website?utm_source=google&gclid=FirstClick&utm_campaign=Original",
  );
  const initial = await captured(page);
  await page.clock.setFixedTime(now + 10000);
  await page.evaluate(() =>
    history.pushState(null, "", "?utm_source=microsoft&msclkid=LatestClick"),
  );
  await expect
    .poll(async () => (await read(page)).latestTouch?.msclkid)
    .toBe("LatestClick");
  const next = await read(page);
  expect(next.firstTouch).toEqual(initial.firstTouch);
  expect(next.latestTouch?.gclid).toBeUndefined();
  expect(next.latestTouch?.utm_campaign).toBeUndefined();
  expect(next.latestTouch?.storedAt).toBe(now + 10000);
  await page.evaluate(() =>
    history.replaceState(null, "", "?gclid=&utm_source=&unrelated=value"),
  );
  await page.reload();
  expect(await captured(page)).toEqual(next);
});

test("stale open tab adopts the latest campaign from another tab on submission", async ({
  page,
  context,
}) => {
  await page.goto("/revenue-website?gclid=OriginalClick");
  const initial = await captured(page);
  const next = await context.newPage();
  await blockGoogleTracking(next);
  await next.goto("/revenue-website?gbraid=NewerClick");
  const newer = await captured(next);
  let payload: { attribution?: Attribution } = {};
  await page.route("**/api/leads", (route) => {
    payload = route.request().postDataJSON();
    return route.fulfill({
      status: 502,
      json: { success: false, message: "Test response" },
    });
  });
  await fillAndSubmit(page);
  await expect
    .poll(() => payload.attribution?.latestTouch?.gbraid)
    .toBe("NewerClick");
  expect(payload.attribution?.firstTouch).toEqual(initial.firstTouch);
  expect(payload.attribution?.latestTouch).toEqual(newer.latestTouch);
  expect(payload.attribution?.gclid).toBeUndefined();
});

test("90-day expiration is exact and direct visits do not extend it", async ({
  page,
}) => {
  const now = Date.now();
  await page.clock.setFixedTime(now);
  await page.goto("/revenue-website?gclid=ExpiredClick");
  const initial = await captured(page);
  await page.clock.setFixedTime(now + TTL - 1);
  await page.goto("/revenue-website");
  expect(await captured(page)).toEqual(initial);
  await page.clock.setFixedTime(now + TTL);
  await page.reload();
  const expired = await captured(page);
  expect(expired.firstTouch?.gclid).toBeUndefined();
  expect(expired.latestTouch?.gclid).toBeUndefined();
  expect(expired.firstTouch?.storedAt).toBe(now + TTL);
  expect(await read(page, "localStorage")).toEqual(expired);
});

test("first and latest touches expire independently", async ({ page }) => {
  const now = Date.now();
  await page.clock.setFixedTime(now);
  await page.goto("/revenue-website?gclid=OldClick");
  await captured(page);
  await page.clock.setFixedTime(now + TTL / 3);
  await page.goto("/revenue-website?wbraid=RecentClick");
  const recent = await captured(page);
  await page.clock.setFixedTime(now + TTL);
  await page.goto("/revenue-website");
  const value = await captured(page);
  expect(value.firstTouch?.gclid).toBeUndefined();
  expect(value.latestTouch).toEqual(recent.latestTouch);
});

test("migrates legacy session data and strips unknown fields and URL query PII", async ({
  page,
}) => {
  await page.addInitScript(
    ({ key }) => {
      sessionStorage.setItem(
        key,
        JSON.stringify({
          gclid: "LegacyClick",
          email: "private@example.com",
          firstName: "Private",
          landingPage:
            "https://example.com/landing?email=private@example.com#phone=123",
          referrer: "https://user:password@example.org/from?phone=123#secret",
        }),
      );
    },
    { key: KEY },
  );
  await page.goto("/revenue-website");
  const value = await captured(page);
  expect(value.firstTouch).toMatchObject({
    gclid: "LegacyClick",
    landingPage: "https://example.com/landing",
    referrer: "https://example.org/from",
  });
  expect(JSON.stringify(await read(page, "localStorage"))).not.toMatch(
    /private|password|email|phone|firstName/i,
  );
});

test("malformed storage recovers without blocking capture", async ({
  page,
}) => {
  await page.addInitScript((key) => {
    localStorage.setItem(key, "{bad");
    sessionStorage.setItem(key, "null");
  }, KEY);
  await page.goto("/revenue-website?gbraid=RecoverClick");
  expect((await captured(page)).firstTouch?.gbraid).toBe("RecoverClick");
});

for (const kind of ["localStorage", "sessionStorage", "both"] as const) {
  test(`submission retains captured attribution when ${kind} is unavailable`, async ({
    page,
  }) => {
    await page.addInitScript((kind) => {
      for (const key of ["localStorage", "sessionStorage"]) {
        if (key === kind || kind === "both")
          Object.defineProperty(window, key, {
            get() {
              throw new DOMException("Blocked", "SecurityError");
            },
          });
      }
    }, kind);
    await page.goto("/revenue-website?gclid=MemoryClick");
    // Wait for hydration and capture before removing the campaign from the URL.
    await expect(page.locator("#google-tag-config")).toHaveCount(1);
    await page.locator("#firstName").fill("Alex");
    await page.evaluate(() =>
      history.replaceState(null, "", "/revenue-website"),
    );
    let payload: { attribution?: Attribution } = {};
    await page.route("**/api/leads", (route) => {
      payload = route.request().postDataJSON();
      return route.fulfill({
        status: 502,
        json: { success: false, message: "Test response" },
      });
    });
    await fillAndSubmit(page);
    await expect
      .poll(() => payload.attribution?.firstTouch?.gclid)
      .toBe("MemoryClick");
    expect(payload.attribution?.latestTouch?.gclid).toBe("MemoryClick");
  });
}

test("submission sends both touches after query removal, stores no form PII, and converts only once", async ({
  page,
}) => {
  await page.goto(
    "/revenue-website?utm_source=google&gclid=FirstId&email=private@example.com#phone=123",
  );
  const first = await captured(page);
  await page.goto(
    "/revenue-website?utm_source=google&wbraid=LatestWbraid&gbraid=LatestGbraid",
  );
  const latest = await captured(page);
  await page.evaluate(() =>
    history.replaceState(null, "", "/revenue-website#review"),
  );
  let payload: { attribution?: Attribution } = {};
  await page.route("**/api/leads", (route) => {
    payload = route.request().postDataJSON();
    return route.fulfill({
      json: { success: true, receipt: "attribution-test-receipt" },
    });
  });
  await fillAndSubmit(page);
  await expect(page).toHaveURL(/thank-you#book$/);
  expect(payload.attribution?.firstTouch).toEqual(first.firstTouch);
  expect(payload.attribution?.latestTouch).toEqual(latest.latestTouch);
  expect(payload.attribution).toMatchObject({
    wbraid: "LatestWbraid",
    gbraid: "LatestGbraid",
  });
  for (const kind of ["sessionStorage", "localStorage"] as const) {
    expect(JSON.stringify(await read(page, kind))).not.toMatch(
      /alex|private|email|phone|firstName|Example Services/i,
    );
  }
  await expect
    .poll(
      async () =>
        (await googleCommands(page)).filter(
          ([, name]) => name === "lead_submit_success",
        ).length,
    )
    .toBe(1);
  await page.reload();
  await expect(page.locator("#google-tag-config")).toHaveCount(1);
  expect(
    (await googleCommands(page)).filter(
      ([, name]) => name === "lead_submit_success",
    ),
  ).toHaveLength(0);
});
