export const campaignKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "msclkid",
  "fbclid",
] as const;
export type Attribution = Partial<
  Record<(typeof campaignKeys)[number] | "landingPage" | "referrer", string>
>;
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  let stored: Attribution = {};
  try {
    stored = JSON.parse(sessionStorage.getItem("aurex-attribution") || "{}");
  } catch {}
  const params = new URLSearchParams(window.location.search);
  const incoming = Object.fromEntries(
    campaignKeys
      .filter((key) => params.has(key))
      .map((key) => [key, params.get(key)!.slice(0, 500)]),
  );
  const result = Object.keys(incoming).length
    ? {
        ...incoming,
        landingPage: window.location.href.slice(0, 2000),
        referrer: document.referrer.slice(0, 2000),
      }
    : {
        ...stored,
        landingPage: stored.landingPage || window.location.href.slice(0, 2000),
        referrer: stored.referrer || document.referrer.slice(0, 2000),
      };
  try {
    sessionStorage.setItem("aurex-attribution", JSON.stringify(result));
  } catch {}
  return result;
}
