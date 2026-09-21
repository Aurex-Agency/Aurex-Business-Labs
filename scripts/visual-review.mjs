import { chromium } from "@playwright/test";
const browser = await chromium.launch({ headless: true });
const sizes = [
  [1440, 1200],
  [1024, 900],
  [768, 1024],
  [390, 844],
  [360, 800],
  [430, 932],
  [1280, 900],
  [1920, 1200],
];
for (const [width, height] of sizes) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:3001/revenue-website", {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);
  for (const img of await page.locator(".project-image").all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((i) => i.decode());
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: `artifacts/review-${width}x${height}.png`,
    fullPage: true,
  });
  await page.screenshot({ path: `artifacts/viewport-${width}x${height}.png` });
  console.log(width, {
    overflow: await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    errors,
  });
  if (width === 1440 || width === 390) {
    await page.screenshot({ path: `artifacts/hero-${width}.png` });
    for (const id of ["selected-work", "review"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await page.screenshot({ path: `artifacts/${id}-${width}.png` });
    }
  }
  await page.close();
}
await browser.close();
