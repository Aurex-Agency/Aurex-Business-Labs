import { site } from "@/lib/site-config";
import { pageMeta, organization } from "@/lib/seo";
import {
  Shell,
  PageHero,
  Section,
  List,
  FinalCTA,
  Schema,
  FAQ,
  ProofCard,
} from "@/components/authority/shared";
import { Action } from "@/components/authority/interactions";
import { StudioStory } from "@/components/studio/motion";
import { timeline } from "@/content/offer";
export const metadata = pageMeta(
  "Revenue Capture System for Contractors",
  site.companyDescription,
  "/revenue-capture-system",
);
export default function System() {
  return (
    <Shell>
      <Schema
        data={{
          "@type": "Service",
          name: site.flagshipService,
          description: site.companyDescription,
          provider: organization,
          areaServed: site.serviceArea,
        }}
      />
      <PageHero
        eyebrow="Aurex Revenue Capture System"
        path="/revenue-capture-system"
        title="From the first lead to the next sold job."
        description="A customer acquisition and revenue expansion partnership for established residential contractors."
      >
        <Action href="/apply" event="audit_cta_click">
          Request a Revenue Leakage Audit
        </Action>
      </PageHero>
      <div className="s-approach-opening">
        <p className="s-kicker">
          Acquisition is the beginning.
          <br />
          Connect what happens next.
        </p>
        <h2>
          Your next opportunity
          <br />
          <em>may already be in the pipeline.</em>
        </h2>
      </div>
      <StudioStory />
      <Section eyebrow="A working system" title="What we connect.">
        <div className="a-two">
          <List
            items={[
              "The priority homeowner offer and acquisition campaign",
              "The conversion funnel and lead-to-sale pipeline",
              "Lead response, qualification, booking and reminders",
              "Follow-up for open estimates, no-shows and dormant leads",
              "Reviews, referrals and customer reactivation",
              "Source-to-sale reporting and a shared weekly scorecard",
            ]}
          />
          <div>
            <h3>The Aurex Revenue Command Center</h3>
            <p>
              See sources, appointments, estimates, sold jobs, collected
              revenue, and recovery activity together. Tracking supports all
              four stages, so your next decision starts with the actual
              constraint.
            </p>
            <p>
              A lead is not a sale. A signed job is not collected cash. We
              reconcile the pipeline with the outcomes your team reports.
            </p>
            <a className="s-text-link" href="/results/methodology">
              How we measure results ↗
            </a>
          </div>
        </div>
      </Section>
      <Section
        eyebrow="The first 120 days"
        title="Build. Operate. Improve."
        light
      >
        <div className="r-timeline">
          {timeline.map((t) => (
            <article key={t.days}>
              <p className="s-kicker">{t.days}</p>
              <h3>{t.name}</h3>
              <p>{t.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="A partnership with your team.">
        <div className="a-two">
          <p className="a-lead">
            We build and operate the system around your customer journey. Your
            team answers calls, handles estimates, closes work, and delivers the
            service.
          </p>
          <List
            items={[
              "A profitable priority service or project",
              "Staff who can respond to and manage new opportunities",
              "Capacity to fulfill additional work",
              "Access to accurate sales outcomes and customer records",
              "An owner or general manager who can make decisions",
            ]}
          />
        </div>
      </Section>
      <Section title="Proof before promises." light>
        <ProofCard />
      </Section>
      <Section title="A few practical questions.">
        <FAQ
          items={[
            ["What does Aurex Business Labs do?", site.companyDescription],
            [
              "Is this just advertising?",
              "Acquisition is one part. Aurex also connects response, booking, recovery, repeat business, referrals and source-to-sale reporting.",
            ],
            [
              "Do we need a new website?",
              "Not necessarily. We assess the conversion assets needed for the priority service. A full website redesign is not the focus of the Revenue Capture System.",
            ],
            [
              "Will Aurex answer every call or close every homeowner?",
              "Your team owns live conversations, estimating, sales and fulfillment. Aurex supports them with workflows, scripts, visibility and follow-up systems.",
            ],
            [
              "What happens in the Revenue Leakage Audit?",
              "We map the current lead-to-sale process, identify where opportunities stall, and leave you with a scorecard and three priority actions.",
            ],
            [
              "Are results guaranteed?",
              "No. Outcomes depend on demand, the offer, response, sales, capacity and fulfillment. We distinguish verified results, influenced results and estimates.",
            ],
          ]}
        />
      </Section>
      <FinalCTA />
    </Shell>
  );
}
