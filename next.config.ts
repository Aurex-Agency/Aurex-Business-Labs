import type { NextConfig } from "next";
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
            value: `default-src 'self'; script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://connect.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.google.com https://*.googletagmanager.com https://*.googleadservices.com https://*.doubleclick.net https://www.facebook.com; frame-src https://*.leadconnectorhq.com https://*.gohighlevel.com https://*.msgsndr.com https://*.zoom.us https://www.googletagmanager.com; media-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`,
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
    ];
  },
};
export default config;
