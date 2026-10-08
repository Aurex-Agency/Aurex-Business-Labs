import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const browser = await chromium.launch({ headless: true });
await fs.mkdir("artifacts", { recursive: true });
for (const width of [375, 768, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    reducedMotion: "reduce",
  });
  await page.route(/^https:\/\//, (route) =>
    route.fulfill({ contentType: "application/javascript", body: "" }),
  );
  for (const [name, path] of [
    ["home", "/"],
    ["system", "/revenue-capture-system"],
    ["apply", "/apply"],
    ["article", "/insights/cost-per-lead-vs-cost-per-sold-job"],
  ]) {
    await page.goto(
      `${process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3002"}${path}`,
    );
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `artifacts/${name}-${width}-full.png`,
      fullPage: true,
    });
    await page.screenshot({ path: `artifacts/${name}-${width}.png` });
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )
    )
      throw new Error(`Overflow: ${path} at ${width}`);
  }
  await page.close();
}
await browser.close();
console.log(
  "Captured home, offer, application and article at 375, 768 and 1440 pixels.",
);
