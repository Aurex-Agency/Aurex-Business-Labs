import { chromium } from "@playwright/test";
import sharp from "sharp";
import fs from "node:fs/promises";
const browser = await chromium.launch({ headless: true });
for (const [name, url] of [
  ["norton", "https://nortonequipmentco.com"],
  ["triple-r", "https://triplertrailers.com"],
  ["wood-eye", "https://woodeyeclinic.com"],
  ["nettech", "https://nettech.ms"],
]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.screenshot({ path: `artifacts/${name}-source.png` });
    await sharp(`artifacts/${name}-source.png`)
      .resize(1440)
      .webp({ quality: 85 })
      .toFile(`public/projects/${name}.webp`);
    await fs.writeFile(
      `artifacts/${name}-text.txt`,
      await page.locator("body").innerText(),
    );
    console.log(name, await page.title());
  } catch (e) {
    console.log(name, e.message);
  }
  await page.close();
}
await browser.close();
