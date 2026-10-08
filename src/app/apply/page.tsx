import { site } from "@/lib/site-config";
import { pageMeta } from "@/lib/seo";
import { Shell, PageHero, List } from "@/components/authority/shared";
import { ApplicationForm } from "@/components/authority/application-form";
export const metadata = pageMeta(
  "Request a Revenue Leakage Audit",
  "Map your contractor lead-to-sale process, find missed opportunities and identify three priority improvements.",
  "/apply",
);
export default function Apply() {
  return (
    <Shell>
      <PageHero
        eyebrow="Revenue Leakage Audit"
        path="/apply"
        title="Where is the next job getting lost?"
        description="Map your current lead-to-sale process, find where opportunities stall, and identify the three improvements most worth addressing first."
      />
      <section
        className="s-contact-layout"
        aria-label="Revenue Leakage Audit application"
      >
        <aside className="s-contact-aside">
          <h2>
            A clearer picture.
            <br />
            <em>A practical next step.</em>
          </h2>
          <List
            items={[
              "Revenue Leak Scorecard",
              "Lead-to-sale process map",
              "Break-Even Job Target",
              "Three-Action Priority Plan",
              "Aurex Fit Assessment",
            ]}
          />
          <p>
            Complimentary diagnostic. No obligation to hire Aurex. No account
            passwords required. You keep the findings.
          </p>
        </aside>
        <ApplicationForm
          calendarUrl={site.auditUrl}
          calendarEmbed={site.calendarEmbed}
        />
      </section>
    </Shell>
  );
}
