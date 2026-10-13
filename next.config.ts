import type { NextConfig } from "next";
// The funnel may embed a Vimeo or Wistia player and a Calendly or white-label
// GHL calendar, so their origins are allowed as frames.
const origin = (value: string | undefined) => {
  try {
    const url = new URL(value || "");
    return url.protocol === "https:" ? url.origin : "";
  } catch {
    return "";
  }
};
const frameSources = [
  // A calendar can redirect its own frame to /call/booked after a booking.
  "'self'",
  "https://*.leadconnectorhq.com",
  "https://*.gohighlevel.com",
  "https://*.msgsndr.com",
  "https://*.zoom.us",
  "https://www.googletagmanager.com",
  "https://player.vimeo.com",
  "https://fast.wistia.net",
  "https://fast.wistia.com",
  "https://calendly.com",
  origin(process.env.FUNNEL_CALENDAR_URL),
  origin(process.env.NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL),
];
const csp = (frameAncestors: string) =>
  `default-src 'self'; script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://connect.facebook.net https://link.msgsndr.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.google.com https://*.googletagmanager.com https://*.googleadservices.com https://*.doubleclick.net https://www.facebook.com https://backend.leadconnectorhq.com https://link.msgsndr.com; frame-src ${[...new Set(frameSources.filter(Boolean))].join(" ")}; media-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors ${frameAncestors}`;
const config: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  async redirects() {
    // Config redirects preserve campaign parameters before the landing page loads.
    return [
      {
        source: "/approach",
        destination: "/revenue-capture-system",
        statusCode: 301,
      },
      {
        source: "/revenue-website",
        destination: "/revenue-capture-system",
        statusCode: 301,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        statusCode: 301,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        statusCode: 301,
      },
      {
        source: "/revenue-website/thank-you",
        destination: "/apply",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp("'none'"),
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // A calendar may redirect to the booked page inside its own frame. The
        // page then moves itself to the top window, so allow framing by us.
        source: "/call/booked",
        headers: [
          { key: "Content-Security-Policy", value: csp("'self'") },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};
export default config;
