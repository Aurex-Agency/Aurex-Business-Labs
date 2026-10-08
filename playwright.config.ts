import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 3,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3002",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    ...devices["Desktop Chrome"],
    reducedMotion: "reduce",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "npm run build -- --webpack && npm start -- --hostname 127.0.0.1 --port 3002",
        env: {
          GHL_WEBHOOK_URL: "",
          LEAD_DEV_MODE: "false",
          NEXT_PUBLIC_GA4_ID: "G-N6CM45VW84",
          NEXT_PUBLIC_GTM_ID: "",
          NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID: "",
          NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL: "",
          NEXT_PUBLIC_META_PIXEL_ID: "",
          NEXT_PUBLIC_GHL_FORM_EMBED_URL: "",
          NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL: "",
          NEXT_PUBLIC_GHL_AUDIT_URL: "",
          NEXT_PUBLIC_ZOOM_REGISTRATION_URL: "",
          NEXT_PUBLIC_GHL_WEBINAR_FORM_URL: "",
        },
        url: "http://127.0.0.1:3002",
        reuseExistingServer: false,
        timeout: 120000,
      },
});
