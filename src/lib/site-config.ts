function webUrl(value: string | undefined) {
  try {
    const url = new URL(value || "");
    return ["https:", "http:"].includes(url.protocol)
      ? url.href.replace(/\/$/, "")
      : undefined;
  } catch {
    return undefined;
  }
}
function mediaUrl(value: string | undefined) {
  if (value?.startsWith("/") && !value.startsWith("//")) return value;
  return webUrl(value);
}
export const site = {
  name: "Aurex Business Labs",
  url:
    webUrl(process.env.NEXT_PUBLIC_SITE_URL) || "https://aurexbusinesslab.com",
  canonical: "https://aurexbusinesslab.com/revenue-website",
  vsl:
    mediaUrl(process.env.NEXT_PUBLIC_VSL_URL) ||
    "/videos/aurex-revenue-system.mp4",
  vslCaptions:
    mediaUrl(process.env.NEXT_PUBLIC_VSL_CAPTIONS_URL) ||
    "/videos/aurex-revenue-system.en.vtt",
  vslPoster:
    mediaUrl(process.env.NEXT_PUBLIC_VSL_POSTER_URL) ||
    "/videos/aurex-revenue-system-poster.webp",
  booking:
    webUrl(process.env.NEXT_PUBLIC_BOOKING_URL) ||
    "https://api.leadconnectorhq.com/widget/booking/qUq69dSX0qUknYNhFJOY",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  title: "North Mississippi Web Design | Aurex Business Labs",
  description:
    "Aurex Business Labs builds custom lead-generating websites for North Mississippi businesses, including messaging, conversion tracking, CRM setup, and fast lead follow-up.",
};
