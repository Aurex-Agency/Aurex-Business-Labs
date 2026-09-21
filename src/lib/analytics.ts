export type AnalyticsEvent =
  | "hero_cta_click"
  | "secondary_cta_click"
  | "pricing_cta_click"
  | "phone_click"
  | "form_start"
  | "form_step_one_complete"
  | "lead_submit_attempt"
  | "lead_submit_success"
  | "lead_submit_error"
  | "calendar_click"
  | "selected_work_click"
  | "faq_open";
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}
export const gtmId = /^GTM-[A-Z0-9]+$/.test(
  process.env.NEXT_PUBLIC_GTM_ID || "",
)
  ? process.env.NEXT_PUBLIC_GTM_ID
  : undefined;
export const adsId = /^AW-\d+$/.test(
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID || "",
)
  ? process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID
  : undefined;
export function track(event: AnalyticsEvent, details?: Record<string, string>) {
  if (typeof window === "undefined" || (!gtmId && !adsId)) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...details });
}
export function confirmedConversion(receipt: string) {
  track("lead_submit_success", { transaction_id: receipt });
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (adsId && label && window.gtag)
    window.gtag("event", "conversion", {
      send_to: `${adsId}/${label}`,
      transaction_id: receipt,
    });
}
