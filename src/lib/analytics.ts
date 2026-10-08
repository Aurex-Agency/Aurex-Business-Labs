export type AnalyticsEvent =
  | "contact_cta_click"
  | "contact_start"
  | "contact_submit"
  | "project_view"
  | "audit_cta_click"
  | "case_study_view"
  | "webinar_register_click"
  | "application_start"
  | "application_submit"
  | "calendar_open"
  | "calendar_booked"
  | "testimonial_play"
  | "pricing_view"
  | "email_click"
  | "hero_cta_click"
  | "secondary_cta_click"
  | "pricing_cta_click"
  | "phone_click"
  | "form_start"
  | "lead_submit_attempt"
  | "lead_submit_success"
  | "lead_submit_error"
  | "calendar_click"
  | "selected_work_click"
  | "faq_open";
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
const configuredGa4Id = process.env.NEXT_PUBLIC_GA4_ID ?? "";
export const ga4Id = /^G-[A-Z0-9]+$/.test(configuredGa4Id)
  ? configuredGa4Id
  : undefined;
export const gtmId = /^GTM-[A-Z0-9]+$/.test(
  process.env.NEXT_PUBLIC_GTM_ID || "",
)
  ? process.env.NEXT_PUBLIC_GTM_ID
  : undefined;
const configuredAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID ?? "";
export const adsId = /^AW-\d+$/.test(configuredAdsId)
  ? configuredAdsId
  : undefined;
export const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
export const metaPixelId = /^\d+$/.test(
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
)
  ? process.env.NEXT_PUBLIC_META_PIXEL_ID
  : undefined;
export function track(event: AnalyticsEvent, details?: Record<string, string>) {
  if (
    typeof window === "undefined" ||
    (!gtmId && !adsId && !ga4Id && !metaPixelId)
  )
    return;
  if (metaPixelId) window.fbq?.("trackCustom", event, details || {});
  window.dataLayer = window.dataLayer || [];
  if (gtmId) window.dataLayer.push({ event, ...details });
  if (ga4Id || adsId) {
    window.gtag =
      window.gtag ||
      function () {
        // Preserve Google's documented arguments-object queue format.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };
  }
  if (ga4Id) window.gtag?.("event", event, { ...details, send_to: ga4Id });
}
export function confirmedConversion(receipt: string) {
  track("lead_submit_success", { transaction_id: receipt });
  if (adsId && adsLabel && window.gtag)
    window.gtag("event", "conversion", {
      send_to: `${adsId}/${adsLabel}`,
      transaction_id: receipt,
    });
}
