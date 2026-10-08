import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Brand } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { BookingCalendar } from "@/components/landing/booking-calendar";
import { ConversionConfirmation } from "@/components/landing/conversion-confirmation";
import { site } from "@/lib/site-config";
export const metadata: Metadata = {
  title: "Review request received",
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.url}/revenue-website/thank-you` },
};
export default function ThankYou() {
  return (
    <>
      <header className="secondary-header">
        <div className="container">
          <Brand />
          <a className="text-link" href="/revenue-website">
            <ArrowLeft size={15} />
            Back to the system
          </a>
        </div>
      </header>
      <main id="main" className="container">
        <div className="thank-you-layout">
          <span className="eyebrow">THE NEXT CONVERSATION STARTS HERE</span>
          <h1>
            Your review
            <br />
            request <em>is in.</em>
          </h1>
          <p>
            Choose a time for your free Website Revenue Review. We will look at
            your website and the information you shared before the call.
          </p>
          <ConversionConfirmation />
          <BookingCalendar url={site.booking} />
          <ol className="thank-you-steps">
            {[
              "Choose an available time in the booking calendar.",
              "Complete your booking to receive your appointment confirmation.",
              "Aurex reviews your website and business information before the call.",
              "You leave with a clearer understanding of what should be fixed and what should happen next.",
            ].map((text, i) => (
              <li key={text}>
                <span>0{i + 1}</span>
                {text}
              </li>
            ))}
          </ol>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
