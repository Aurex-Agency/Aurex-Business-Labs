import { test, expect, type Page } from "@playwright/test";
async function stepOne(page: Page) {
  await page.locator("#firstName").fill("Alex");
  await page.locator("#lastName").fill("Example");
  await page.locator("#businessName").fill("Example Services");
  await page.locator("#website").fill("example.com");
  await page.locator("#email").fill("alex@example.com");
  await page.locator("#phone").fill("6625550100");
  await page.locator("#city").fill("Tupelo");
  await page
    .getByRole("button", { name: "Continue to the opportunity" })
    .click();
  await expect(
    page.getByRole("heading", { name: "About the Opportunity" }),
  ).toBeVisible();
}
async function stepTwo(page: Page) {
  await page.locator("#service").fill("Commercial equipment");
  await page.locator("#customerValue").selectOption("$5,000 to $10,000");
  await page.locator("#timeline").selectOption("Within 30 days");
  await page.locator("#source").fill("Google Search");
  await page.locator("#budget").selectOption("$5,000 to $10,000");
  await page
    .locator("#challenge")
    .fill("Our website needs a clearer quote request process.");
}
test.beforeEach(async ({ page }) => {
  await page.route(
    "https://api.leadconnectorhq.com/widget/booking/**",
    (route) =>
      route.fulfill({
        contentType: "text/html",
        body: '<!doctype html><html lang="en"><head><title>Test calendar</title></head><body><main><h1>Available review times</h1></main></body></html>',
      }),
  );
  await page.route("https://link.msgsndr.com/js/form_embed.js", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "" }),
  );
  await page.goto("/revenue-website");
});
test("primary heading, canonical, real portfolio, and no default tracking", async ({
  page,
}) => {
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Turn yourwebsite into asales system.",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://aurexbusinesslab.com/revenue-website",
  );
  for (const name of [
    "Norton Equipment Co",
    "Triple R Trailers",
    "Wood Eye Clinic",
    "NetTech",
  ])
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
  await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
});
test("primary CTA and all desktop navigation anchors reach destinations", async ({
  page,
}) => {
  await page
    .getByRole("link", {
      name: "Get My Free Website Revenue Review",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/#review$/);
  await expect(
    page.getByRole("heading", { name: "About Your Business" }),
  ).toBeInViewport();
  for (const [name, id] of [
    ["The System", "system"],
    ["What You Get", "what-you-get"],
    ["Selected Work", "selected-work"],
    ["Process", "process"],
    ["FAQ", "faq"],
  ]) {
    await page
      .getByRole("navigation", { name: "Main navigation", exact: true })
      .getByRole("link", { name, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});
test("mobile menu opens and closes using keyboard and Escape restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "The System" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeHidden();
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Space");
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "FAQ", exact: true })
    .click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeHidden();
  await expect(page).toHaveURL(/#faq$/);
});
test("FAQ works with keyboard", async ({ page }) => {
  const summary = page.locator("summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await expect(page.locator("details").first().locator("p")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(page.locator("details").first()).not.toHaveAttribute("open", "");
});
test("VSL is visible without autoplay or an initial video download", async ({
  page,
}) => {
  const video = page.locator(".hero-video video");
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute("preload", "none");
  await expect(video).toHaveAttribute("controls", "");
  await expect(video).toHaveAttribute("playsinline", "");
  await expect(video).not.toHaveAttribute("autoplay");
  await expect(video.locator("track")).toHaveAttribute("kind", "captions");
  expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  expect(
    await page.evaluate(() =>
      performance
        .getEntriesByType("resource")
        .some((r) => r.name.endsWith(".mp4")),
    ),
  ).toBe(false);
  await page
    .getByRole("link", { name: "Book My Free Website Review", exact: true })
    .click();
  await expect(page).toHaveURL(/#review$/);
});
test("incomplete form provides inline errors and accessible summary", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Continue to the opportunity" })
    .click();
  await expect(page.locator(".error-summary")).toBeFocused();
  await expect(page.locator("#firstName")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.locator("#firstName-error")).toHaveText(
    "Enter your first name.",
  );
  await expect(
    page.getByRole("heading", { name: "About Your Business" }),
  ).toBeVisible();
});
test("valid first step advances and back preserves answers", async ({
  page,
}) => {
  await stepOne(page);
  await expect(
    page.getByRole("heading", { name: "About the Opportunity" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.locator("#firstName")).toHaveValue("Alex");
});
test("valid lead includes attribution and redirects only after server acceptance", async ({
  page,
}) => {
  await page.goto(
    "/revenue-website?utm_source=google&utm_medium=cpc&utm_campaign=website&gclid=sample-click",
  );
  let payload: Record<string, unknown> = {};
  await page.route("**/api/leads", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({
      json: { success: true, receipt: "mock-accepted-receipt" },
    });
  });
  await stepOne(page);
  await stepTwo(page);
  await page
    .getByRole("button", { name: "Request My Free Review", exact: true })
    .click();
  await expect(page).toHaveURL(/\/revenue-website\/thank-you#book$/);
  const calendar = page.getByRole("dialog", {
    name: "Choose your review time.",
  });
  await expect(calendar).toBeVisible();
  await expect(calendar.locator("iframe")).toHaveAttribute(
    "src",
    "https://api.leadconnectorhq.com/widget/booking/qUq69dSX0qUknYNhFJOY",
  );
  await page.getByRole("button", { name: "Close booking calendar" }).click();
  await expect(calendar).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Choose My Review Time" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Choose My Review Time" }).click();
  await expect(calendar).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(calendar).not.toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "request",
  );
  expect(payload.email).toBe("alex@example.com");
  expect(payload.website).toBe("https://example.com");
  expect(payload.attribution).toMatchObject({
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "website",
    gclid: "sample-click",
  });
});
test("failed delivery preserves answers and supports retry", async ({
  page,
}) => {
  let attempts = 0;
  await page.route("**/api/leads", async (route) => {
    attempts++;
    await route.fulfill(
      attempts === 1
        ? {
            status: 502,
            json: {
              success: false,
              message: "Your request could not be delivered. Please try again.",
            },
          }
        : { json: { success: true, receipt: "retry-receipt" } },
    );
  });
  await stepOne(page);
  await stepTwo(page);
  await page
    .getByRole("button", { name: "Request My Free Review", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "could not be delivered",
  );
  await expect(page.locator(".booking-dialog")).toHaveCount(0);
  await expect(page.locator("#challenge")).toHaveValue(
    "Our website needs a clearer quote request process.",
  );
  await expect(
    page.getByRole("button", { name: "Request My Free Review", exact: true }),
  ).toBeEnabled();
  await page
    .getByRole("button", { name: "Request My Free Review", exact: true })
    .click();
  await expect(page).toHaveURL(/thank-you#book$/);
});
test("mobile sticky CTA hides at form", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".problem-section").scrollIntoViewIfNeeded();
  await expect(page.locator(".mobile-sticky")).toBeVisible();
  await page.locator("#firstName").scrollIntoViewIfNeeded();
  await expect(page.locator(".mobile-sticky")).toHaveCount(0);
});
for (const width of [360, 390, 430, 768, 1024, 1280, 1440, 1920])
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
    await page.evaluate(() => document.fonts.ready);
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
      .toBeLessThanOrEqual(width);
  });
test("secondary pages, temporary root redirect, sitemap and noindex", async ({
  page,
  request,
}) => {
  const root = await request.get("/", { maxRedirects: 0 });
  expect(root.status()).toBe(307);
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Privacy policy.",
  );
  await page.goto("/revenue-website/thank-you");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(
    page.getByRole("button", { name: "Choose My Review Time" }),
  ).toBeVisible();
  await expect(page.locator(".booking-dialog iframe")).toHaveCount(0);
  expect(
    await page.evaluate(() => sessionStorage.getItem("aurex-confirmed-lead")),
  ).toBeNull();
  await page.goto("/not-a-real-page");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "off the map",
  );
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).not.toContain("thank-you");
});
test("server rejects malformed, invalid, automated, and cross-origin requests", async ({
  request,
}) => {
  const malformed = await request.post("/api/leads", {
    data: "{bad",
    headers: { "Content-Type": "application/json" },
  });
  expect(malformed.status()).toBe(400);
  const empty = await request.post("/api/leads", { data: {} });
  expect(empty.status()).toBe(400);
  const cross = await request.post("/api/leads", {
    data: {},
    headers: { origin: "https://example.org" },
  });
  expect(cross.status()).toBe(403);
  const oversized = await request.post("/api/leads", {
    data: { challenge: "x".repeat(25000) },
  });
  expect(oversized.status()).toBe(413);
});
test("unconfigured production delivery cannot return false success", async ({
  request,
}) => {
  const payload = {
    firstName: "Alex",
    lastName: "Example",
    businessName: "Example Services",
    website: "example.com",
    email: "alex@example.com",
    phone: "6625550100",
    city: "Tupelo",
    service: "Equipment",
    customerValue: "$5,000 to $10,000",
    source: "Google",
    timeline: "Within 30 days",
    budget: "$5,000 to $10,000",
    challenge: "We need a clear quote process.",
    companyWebsite: "",
    startedAt: Date.now() - 10000,
    sourcePage: "/revenue-website",
    attribution: {},
  };
  const result = await request.post("/api/leads", {
    data: payload,
    headers: {
      origin: new URL(
        process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000",
      ).origin,
    },
  });
  expect(result.status()).toBe(503);
  expect(await result.json()).toMatchObject({ success: false });
  const bot = await request.post("/api/leads", {
    data: { ...payload, companyWebsite: "spam" },
  });
  expect(bot.status()).toBe(400);
  const fast = await request.post("/api/leads", {
    data: { ...payload, startedAt: Date.now() + 1000 },
  });
  expect(fast.status()).toBe(400);
});

test("VSL plays, seeks, and loads English captions", async ({ page }) => {
  const video = page.locator(".hero-video video");
  await video.evaluate((v: HTMLVideoElement) => {
    v.muted = true;
    v.textTracks[0].mode = "showing";
  });
  const playButton = page.getByRole("button", {
    name: "Click to play",
    exact: true,
  });
  await playButton.focus();
  await page.keyboard.press("Enter");
  await expect(playButton).toHaveCount(0);
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(0);
  await expect
    .poll(() =>
      video.evaluate(
        (v: HTMLVideoElement) => v.textTracks[0].cues?.length || 0,
      ),
    )
    .toBeGreaterThan(20);
  const duration = await video.evaluate((v: HTMLVideoElement) => v.duration);
  expect(duration).toBeGreaterThan(85);
  expect(duration).toBeLessThan(87);
  await video.evaluate((v: HTMLVideoElement) => {
    v.pause();
    v.currentTime = 57;
  });
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.seeking))
    .toBe(false);
  expect(await video.evaluate((v: HTMLVideoElement) => v.error)).toBeNull();
  await expect
    .poll(() =>
      video.evaluate((v: HTMLVideoElement) => {
        const cue = v.textTracks[0].activeCues?.[0] as VTTCue | undefined;
        return cue?.text || "";
      }),
    )
    .toContain("21 days");
});
test("desktop system visual follows the four story stages", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const titles = [
    "A clear offer. A relevant message. A reason to choose you.",
    "Turn a useful visit into a qualified inquiry.",
    "An inquiry arrives. A response goes out. Your team knows what comes next.",
    "See the journey from campaign to conversation in one place.",
  ];
  for (let index = 0; index < 4; index++) {
    await page
      .locator(".system-step")
      .nth(index)
      .evaluate((e) =>
        e.scrollIntoView({ block: "center", behavior: "instant" }),
      );
    await expect(page.locator(".system-sticky h3")).toHaveText(titles[index]);
  }
});

test("revised offer and payback commitment are prominent and consistent", async ({
  page,
}) => {
  await expect(page.locator(".hero-copy .price-note")).toContainText("$3,500");
  await expect(page.locator(".price")).toContainText("$3,500");
  await expect(page.locator(".price")).toContainText("Two payments of $1,750");
  await expect(page.locator(".payback-promise")).toHaveCount(3);
  await page.locator(".hero-copy .payback-promise").click();
  await expect(page).toHaveURL(/#launch-guarantee$/);
  await expect(page.locator("#launch-guarantee")).toContainText("$1,000 back");
  await expect(page.locator("#launch-guarantee")).toContainText(
    "within its control",
  );
  const structured = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(structured).toContain('"minPrice":3500');
  expect(await page.locator("body").innerText()).not.toContain(
    "$500 project credit",
  );
  await expect(page.locator(".hero-video")).toHaveCount(1);
});
