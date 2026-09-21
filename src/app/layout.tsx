import { Suspense } from "react";
import { AttributionCapture } from "@/components/landing/attribution-capture";
import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { site } from "@/lib/site-config";
import { AnalyticsScripts } from "@/components/landing/analytics-scripts";
import { MotionProvider } from "@/components/landing/motion-provider";
import "./globals.css";
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Aurex Business Labs" },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Aurex Business Labs. Turn your website into a sales system.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
};
export const viewport: Viewport = { themeColor: "#070c13" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <Suspense fallback={null}>
          <AttributionCapture />
        </Suspense>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
