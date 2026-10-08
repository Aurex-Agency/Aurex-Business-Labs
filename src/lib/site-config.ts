import { roofingProof, type ProofRecord } from "./proof";
export function webUrl(value: string | undefined) {
  try {
    const url = new URL(value || "");
    return ["https:", "http:"].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url.href.replace(/\/$/, "")
      : undefined;
  } catch {
    return undefined;
  }
}
const brandName = "Aurex Business Labs";
const canonicalUrl = "https://aurexbusinesslab.com";
const companyDescription =
  "Aurex Business Labs is a customer acquisition and revenue systems company for established residential contractors. Through the Aurex Revenue Capture System, we help contractors generate qualified opportunities, improve lead response and booking, recover missed revenue, and build repeat and referral systems.";
export const site = {
  brandName,
  name: brandName,
  legalName: process.env.SITE_LEGAL_NAME || "",
  domain: "aurexbusinesslab.com",
  canonicalUrl,
  canonical: canonicalUrl,
  url: canonicalUrl,
  founderName: process.env.SITE_FOUNDER_NAME || "",
  founderPhoto: /^\/(?!\/)/.test(process.env.SITE_FOUNDER_PHOTO || "")
    ? process.env.SITE_FOUNDER_PHOTO
    : undefined,
  founderBio: process.env.SITE_FOUNDER_BIO || "",
  foundedYear: process.env.SITE_FOUNDED_YEAR || "",
  address: process.env.SITE_ADDRESS || "",
  serviceArea: "United States",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  socialProfiles: [
    webUrl(process.env.SITE_LINKEDIN_URL),
    webUrl(process.env.SITE_YOUTUBE_URL),
    webUrl(process.env.SITE_FACEBOOK_URL),
  ].filter((v): v is string => !!v),
  flagshipService: "Aurex Revenue Capture System",
  companyDescription,
  description: companyDescription,
  shortDescription:
    "Customer acquisition and revenue systems for established residential contractors.",
  title: "Aurex Business Labs | Revenue Systems for Residential Contractors",
  proofRecords: [roofingProof] as ProofRecord[],
  booking:
    webUrl(process.env.NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL) ||
    webUrl(process.env.NEXT_PUBLIC_GHL_AUDIT_URL) ||
    "",
  formEmbed: webUrl(process.env.NEXT_PUBLIC_GHL_FORM_EMBED_URL),
  calendarEmbed: webUrl(process.env.NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL),
  auditUrl: webUrl(process.env.NEXT_PUBLIC_GHL_AUDIT_URL),
  webinarUrl:
    webUrl(process.env.NEXT_PUBLIC_ZOOM_REGISTRATION_URL) ||
    webUrl(process.env.NEXT_PUBLIC_GHL_WEBINAR_FORM_URL),
  webinarFallback: webUrl(process.env.NEXT_PUBLIC_GHL_WEBINAR_FORM_URL),
  webinarStart: process.env.WEBINAR_START_ISO,
  webinarEnd: process.env.WEBINAR_END_ISO,
  // Retained source assets for the archived website offer.
  vsl: "/videos/aurex-revenue-system.mp4",
  vslCaptions: "/videos/aurex-revenue-system.en.vtt",
  vslPoster: "/videos/aurex-revenue-system-poster.webp",
};
export const publicRoutes = [
  "/",
  "/work",
  "/work/norton-equipment",
  "/work/triple-r-trailers",
  "/work/wood-eye-clinic",
  "/work/nettech",
  "/revenue-capture-system",
  "/results",
  "/results/roofing-revenue-system",
  "/apply",
  "/about",
  "/contact",
  "/insights",
  "/insights/how-contractors-track-marketing-from-lead-to-sold-job",
  "/insights/cost-per-lead-vs-cost-per-sold-job",
  "/insights/how-to-follow-up-on-unclosed-contractor-estimates",
  "/results/methodology",
  "/contractor-revenue-scorecard",
  "/privacy",
  "/terms",
  "/results-disclaimer",
];
