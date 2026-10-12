// Shared by the /call application on the client and the lead route on the
// server, so routing decisions and CRM tags always agree.

export const funnelTrades = [
  "Roofing",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Windows and doors",
  "Siding and gutters",
  "Foundation repair",
  "Waterproofing",
  "Restoration",
  "Remodeling",
  "Other",
] as const;

export const funnelRevenue = [
  "Under $500K",
  "$500K to $1M",
  "$1M to $3M",
  "$3M to $5M",
  "$5M to $10M",
  "$10M+",
] as const;

export const funnelLeadVolume = [
  "Fewer than 10",
  "10 to 25",
  "25 to 50",
  "50 to 100",
  "100+",
] as const;

export const funnelLeadSources = [
  "Word of mouth and referrals",
  "Google search",
  "Facebook or Instagram",
  "Paid ads",
  "HomeAdvisor, Angi or similar platforms",
  "Repeat customers",
  "Other",
] as const;

// Each answer maps to the phase the sales call should open on.
export const funnelBottlenecks = [
  "Not enough leads coming in",
  "Leads come in but we don’t respond fast enough",
  "We book appointments but too many no-show",
  "Estimates go out but too few close",
  "Customers buy once and never come back",
  "We don’t know our numbers well enough to know what’s broken",
] as const;

export const bottleneckPhase: Record<FunnelBottleneck, string> = {
  "Not enough leads coming in": "Capture",
  "Leads come in but we don’t respond fast enough": "Capture",
  "We book appointments but too many no-show": "Convert",
  "Estimates go out but too few close": "Recover",
  "Customers buy once and never come back": "Compound",
  "We don’t know our numbers well enough to know what’s broken": "Capture",
};

export const funnelStaff = [
  "Yes, full-time staff",
  "Yes, part-time staff",
  "No, it’s just me and the crew",
] as const;

export const funnelJobValue = [
  "Under $1,000",
  "$1,000 to $5,000",
  "$5,000 to $15,000",
  "$15,000 to $30,000",
  "$30,000+",
] as const;

export const funnelCaseStudy = [
  "Yes, tell me more",
  "Maybe, I’d want details",
  "No, I’d prefer standard pricing",
] as const;

export type FunnelBottleneck = (typeof funnelBottlenecks)[number];
export type FunnelRoute = "qualified" | "borderline" | "unqualified";

export const routeTags: Record<FunnelRoute | "partial", string> = {
  qualified: "qualified-lead",
  borderline: "borderline-lead",
  unqualified: "unqualified-lead",
  partial: "partial-application",
};

type Answers = {
  annualRevenue?: string;
  staff?: string;
  jobValue?: string;
};

// Returns the route once the answers decide it, otherwise undefined.
// Revenue under $500K exits right after the revenue question. Everyone else is
// routed after the staff and job value questions:
//   unqualified: no staff and an average job under $5K
//   borderline:  $500K to $1M, or $1M+ with no staff
//   qualified:   $1M+ with office, dispatch or admin staff
export function routeApplication(a: Answers): FunnelRoute | undefined {
  if (!a.annualRevenue) return undefined;
  if (a.annualRevenue === funnelRevenue[0]) return "unqualified";
  if (!a.staff || !a.jobValue) return undefined;
  const hasStaff = a.staff !== funnelStaff[2];
  const largerJobs = funnelJobValue.indexOf(a.jobValue as never) >= 2;
  if (!hasStaff && !largerJobs) return "unqualified";
  if (a.annualRevenue === funnelRevenue[1] || !hasStaff) return "borderline";
  return "qualified";
}

// Turns a Vimeo or Wistia share link into an embeddable player URL. Other
// hosts are refused so a bare YouTube embed cannot slip in.
export function videoEmbedUrl(value: string | undefined) {
  if (!value) return undefined;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return undefined;
  }
  if (url.protocol !== "https:") return undefined;
  const parts = url.pathname.split("/").filter(Boolean);
  if (url.hostname === "player.vimeo.com" && parts[0] === "video") {
    const embed = new URL(`https://player.vimeo.com/video/${parts[1]}`);
    const hash = url.searchParams.get("h");
    if (hash) embed.searchParams.set("h", hash);
    return vimeo(embed);
  }
  if (/(^|\.)vimeo\.com$/.test(url.hostname)) {
    const id = parts.find((p) => /^\d+$/.test(p));
    if (!id) return undefined;
    const embed = new URL(`https://player.vimeo.com/video/${id}`);
    const hash = parts[parts.indexOf(id) + 1];
    if (hash && /^[a-z0-9]+$/i.test(hash)) embed.searchParams.set("h", hash);
    return vimeo(embed);
  }
  if (/(^|\.)(wistia\.com|wistia\.net|wi\.st)$/.test(url.hostname)) {
    const id = parts[parts.length - 1];
    if (!id || !/^[a-z0-9]+$/i.test(id)) return undefined;
    const embed = new URL(`https://fast.wistia.net/embed/iframe/${id}`);
    embed.searchParams.set("autoPlay", "true");
    embed.searchParams.set("playerColor", "19bce5");
    return embed.href;
  }
  return undefined;
}

function vimeo(embed: URL) {
  embed.searchParams.set("autoplay", "1");
  embed.searchParams.set("dnt", "1");
  embed.searchParams.set("title", "0");
  embed.searchParams.set("byline", "0");
  embed.searchParams.set("portrait", "0");
  embed.searchParams.set("color", "19bce5");
  return embed.href;
}

export function isCalendly(url: string) {
  try {
    return /(^|\.)calendly\.com$/.test(new URL(url).hostname);
  } catch {
    return false;
  }
}

export const funnelPath = "/call";
export const bookedPath = "/call/booked";
