import { site } from "@/lib/site-config";
import { pageMeta } from "@/lib/seo";
import { Shell, PageHero, List } from "@/components/authority/shared";
import { DeferredEmbed } from "@/components/authority/interactions";
import { ApplicationForm } from "@/components/authority/application-form";
export const metadata = pageMeta(
  "Request a Revenue Leakage Audit",
  "Map your contractor lead-to-sale process, calculate a break-even job target, and identify three priority improvements.",
  "/apply",
);
export default function Apply() {
  return (
    <Shell>
      <PageHero
        eyebrow="Request an audit"
        path="/apply"
        title="Find Where Revenue Is Leaking Between the First Lead and the Next Sale"
        description="In one working session, we map your current process, calculate what the growth investment would need to produce, and identify the three improvements most worth addressing first."
      />
      <section className="a-section a-light">
        <div className="a-wrap a-apply-layout">
          <aside>
            <p className="a-label">Your working session</p>
            <h2>Leave With a Clear Next Step</h2>
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
            <div className="a-investment-note">
              <h3>The paid engagement</h3>
              <p>
                Paid implementation is $17,000 over 120 days: $8,000 for
                implementation followed by three monthly payments of $3,000.
                Advertising and specified third-party costs are separate.
              </p>
            </div>
          </aside>
          <div>
            {site.formEmbed ? (
              <>
                <p>
                  Complete the secure application below. The form provider
                  manages submission and confirmation.
                </p>
                <DeferredEmbed
                  url={site.formEmbed}
                  title="audit application"
                  event="application_start"
                />
              </>
            ) : (
              <ApplicationForm
                calendarUrl={site.auditUrl}
                calendarEmbed={site.calendarEmbed}
              />
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}
