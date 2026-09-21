export const campaignKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "wbraid",
  "gbraid",
  "msclkid",
  "fbclid",
] as const;
export const ATTRIBUTION_TTL = 90 * 24 * 60 * 60 * 1000;
export const ATTRIBUTION_STORAGE_KEY = "aurex-attribution";
export type CampaignKey = (typeof campaignKeys)[number];
export type AttributionFields = Partial<
  Record<CampaignKey | "landingPage" | "referrer", string>
>;
export type AttributionTouch = AttributionFields & {
  storedAt: number;
  expiresAt: number;
};
export type Attribution = AttributionFields & {
  firstTouch?: AttributionTouch;
  latestTouch?: AttributionTouch;
};
type StoredAttribution = {
  version: 2;
  firstTouch?: AttributionTouch;
  latestTouch?: AttributionTouch;
};

// Store only the page address, never arbitrary query strings, fragments or credentials.
// Campaign values have their own allowlisted fields, so URLs need no query data.
export function attributionPageUrl(value: string): string {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol)
      ? `${url.origin}${url.pathname}`.slice(0, 2000)
      : "";
  } catch {
    return "";
  }
}
function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
export function attributionFields(value: unknown): AttributionFields {
  const fields: AttributionFields = {};
  if (!record(value)) return fields;
  for (const key of campaignKeys) {
    const v = value[key];
    // Never lowercase or otherwise normalize click identifiers.
    if (typeof v === "string" && v.trim() && v.length <= 500) fields[key] = v;
  }
  for (const key of ["landingPage", "referrer"] as const) {
    if (typeof value[key] === "string")
      fields[key] = attributionPageUrl(value[key]);
  }
  return fields;
}
function readTouch(value: unknown, now: number): AttributionTouch | undefined {
  if (!record(value)) return;
  const { storedAt, expiresAt } = value;
  if (
    typeof storedAt !== "number" ||
    !Number.isSafeInteger(storedAt) ||
    storedAt < 0 ||
    typeof expiresAt !== "number" ||
    !Number.isSafeInteger(expiresAt) ||
    storedAt > now ||
    expiresAt <= now ||
    expiresAt - storedAt !== ATTRIBUTION_TTL
  )
    return;
  return { ...attributionFields(value), storedAt, expiresAt };
}
function readStorage(
  kind: "localStorage" | "sessionStorage",
  now: number,
): StoredAttribution {
  const empty: StoredAttribution = { version: 2 };
  try {
    const value: unknown = JSON.parse(
      window[kind].getItem(ATTRIBUTION_STORAGE_KEY) || "null",
    );
    if (!record(value)) return empty;
    if (value.version === 2)
      return {
        version: 2,
        firstTouch: readTouch(value.firstTouch, now),
        latestTouch: readTouch(value.latestTouch, now),
      };
    // Upgrade the old active-session record once. Its original capture time is unknown.
    if (kind === "sessionStorage" && value.version === undefined) {
      const fields = attributionFields(value);
      if (Object.keys(fields).length) {
        const touch = {
          ...fields,
          storedAt: now,
          expiresAt: now + ATTRIBUTION_TTL,
        };
        return { version: 2, firstTouch: touch, latestTouch: touch };
      }
    }
  } catch {
    /* Storage may be blocked or malformed. */
  }
  return empty;
}
let memory: StoredAttribution = { version: 2 };
let lastCampaignSignature: string | undefined;

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const now = Date.now();
  // Re-read persistent storage before every capture, including form submission,
  // so a tab with an old campaign cannot overwrite a newer touch from another tab.
  const records = [
    readStorage("localStorage", now),
    readStorage("sessionStorage", now),
    memory,
  ];
  const first = records
    .map((r) => readTouch(r.firstTouch, now))
    .filter((t): t is AttributionTouch => !!t)
    .sort((a, b) => a.storedAt - b.storedAt)[0];
  const latest = records
    .map((r) => readTouch(r.latestTouch, now))
    .filter((t): t is AttributionTouch => !!t)
    .sort((a, b) => b.storedAt - a.storedAt)[0];
  const params = new URLSearchParams(window.location.search);
  const incoming = attributionFields(
    Object.fromEntries(campaignKeys.map((key) => [key, params.get(key)])),
  );
  const signature = JSON.stringify(incoming);
  const newCampaign =
    Object.keys(incoming).length > 0 && signature !== lastCampaignSignature;
  lastCampaignSignature = signature;
  const touch: AttributionTouch = {
    ...incoming,
    landingPage: attributionPageUrl(window.location.href),
    referrer: attributionPageUrl(document.referrer),
    storedAt: now,
    expiresAt: now + ATTRIBUTION_TTL,
  };
  memory = {
    version: 2,
    firstTouch: first || touch,
    latestTouch: newCampaign || !latest ? touch : latest,
  };
  for (const kind of ["localStorage", "sessionStorage"] as const) {
    try {
      window[kind].setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(memory));
    } catch {
      /* Keep working with the other store or this document's memory. */
    }
  }
  // Flat aliases preserve existing GHL workflows; nested touches are authoritative.
  return {
    ...attributionFields(memory.latestTouch),
    firstTouch: { ...memory.firstTouch! },
    latestTouch: { ...memory.latestTouch! },
  };
}
