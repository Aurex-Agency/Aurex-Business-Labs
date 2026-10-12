import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site-config";
import { FunnelShell, TrustStrip } from "@/components/funnel/chrome";
import { VslPlayer } from "@/components/funnel/vsl-player";
import { FunnelApplication } from "@/components/funnel/application";

// Paid traffic lands here directly. Kept out of search so it never competes
// with the educational pages, and left out of the sitemap.
export const metadata: Metadata = {
  ...pageMeta(
    "Stop losing revenue from leads that disappear",
    "For established residential contractors: capture every lead, convert more appointments, recover lost opportunities and turn customers into repeat and referral revenue.",
    "/call",
  ),
  robots: { index: false, follow: false },
};

export default function CallPage() {
  return (
    <FunnelShell>
      <section className="l-call-hero" aria-labelledby="call-title">
        <h1 id="call-title">
          Stop losing revenue from leads that <em>disappear</em>
        </h1>
        <p className="l-call-sub">
          We help established residential contractors capture every lead,
          convert more appointments, recover lost opportunities, and turn every
          customer into repeat and referral revenue.
        </p>
        <VslPlayer
          src={site.funnel.video}
          poster={site.funnel.poster}
          title="Where contractor revenue leaks, and how to stop it"
          caption="Where your leads go between the phone call and the signed contract"
          length="6 min"
          priority
        />
      </section>
      <section
        className="l-call-apply"
        id="apply"
        aria-label="Strategy call application"
      >
        <FunnelApplication
          calendar={site.funnel.calendar}
          contactEmail={site.email || undefined}
        />
      </section>
      <TrustStrip />
    </FunnelShell>
  );
}
