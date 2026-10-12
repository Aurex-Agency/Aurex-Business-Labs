import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site-config";
import { FunnelShell, TrustStrip } from "@/components/funnel/chrome";
import { VslPlayer } from "@/components/funnel/vsl-player";
import { BookingDetails } from "@/components/funnel/booking-details";

export const metadata: Metadata = {
  ...pageMeta(
    "You're booked",
    "Your strategy call with Aurex Business Labs is booked. Here is what happens next and what to bring.",
    "/call/booked",
  ),
  robots: { index: false, follow: false },
};

const prep = [
  {
    title: "Your lead numbers",
    text: "Roughly how many leads you get in a month and where most of them come from.",
  },
  {
    title: "Your average job value",
    text: "What a typical job is worth, and about how many estimates turn into signed jobs.",
  },
  {
    title: "Your biggest bottleneck",
    text: "The one spot between the first call and the signed contract you would fix first.",
  },
];

// Point the calendar's post-booking redirect here. This page fires the Meta
// Schedule event, so it is the only place a booking is counted.
export default function BookedPage() {
  return (
    <FunnelShell>
      <section className="l-call-hero is-booked" aria-labelledby="booked-title">
        <h1 id="booked-title">
          You’re booked. <em>Here’s what happens next.</em>
        </h1>
        <BookingDetails />
        {site.funnel.confirmVideo && (
          <VslPlayer
            src={site.funnel.confirmVideo}
            title="What we will cover on your call"
            caption="What we will cover on the call"
            length="90 sec"
          />
        )}
      </section>
      <section className="l-call-prep" aria-labelledby="prep-title">
        <h2 id="prep-title">Bring these three things to the call</h2>
        <ol>
          {prep.map((item, i) => (
            <li key={item.title}>
              <span className="l-call-prep-index" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="l-call-after">
          On the call we walk through where your leads are slipping and which
          phase to fix first. If it is a fit, we lay out the plan. If it is not,
          you still leave with a clear picture of where the revenue is going.
        </p>
      </section>
      <TrustStrip />
    </FunnelShell>
  );
}
