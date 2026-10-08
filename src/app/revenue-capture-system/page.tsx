import { site } from "@/lib/site-config";
import { pageMeta, organization } from "@/lib/seo";
import {
  Shell,
  PageHero,
  Section,
  List,
  Phases,
  Timeline,
  Pricing,
  Fit,
  FAQ,
  ProofCard,
  ProofMedia,
  ResultsDisclaimer,
  FinalCTA,
  Schema,
} from "@/components/authority/shared";
import { Action } from "@/components/authority/interactions";
import {
  implementation,
  operations,
  excluded,
  responsibilities,
  launchChecks,
} from "@/content/offer";
export const metadata = pageMeta(
  "Revenue Capture System for Contractors",
  "Aurex helps established residential contractors generate qualified opportunities, improve booking, recover missed revenue, and build repeat and referral systems.",
  "/revenue-capture-system",
);
export default function Page() {
  return (
    <Shell>
      <Schema
        data={{
          "@type": "Service",
          name: site.flagshipService,
          description:
            "A 120-Day Customer Acquisition and Revenue Expansion Partnership for Established Residential Contractors",
          provider: organization,
          areaServed: site.serviceArea,
          offers: {
            "@type": "Offer",
            price: site.pricing.total,
            priceCurrency: "USD",
            url: `${site.url}/revenue-capture-system`,
            description:
              "120-day engagement. Advertising and specified third-party costs are separate.",
          },
        }}
      />
      <PageHero
        eyebrow="Revenue Capture System"
        path="/revenue-capture-system"
        title="Connect the Lead to the Appointment. The Job to the Next Opportunity."
        description="A 120-Day Customer Acquisition and Revenue Expansion Partnership for Established Residential Contractors"
      >
        <Action href="/apply">Request a Revenue Leakage Audit</Action>
      </PageHero>
      <Section
        title="What does the Aurex Revenue Capture System include?"
        light
      >
        <div className="a-reading">
          <p>
            The Aurex Revenue Capture System is a 120-day customer acquisition
            and revenue-expansion partnership for established residential
            contractors. During the initial implementation, Aurex maps your
            lead-to-sale economics, strengthens one priority consumer offer,
            builds one primary conversion funnel, prepares one acquisition
            channel, installs rapid-response and booking workflows, creates one
            high-value opportunity-recovery system, and connects source-to-sale
            reporting. During the following 90 days, Aurex operates and improves
            the campaign, creative, funnel, lead handling, booking process,
            recovery system, and reporting. Aurex also installs a referral
            foundation and one Customer Expansion Campaign designed to generate
            the highest-value repeat-service, reactivation, referral, or
            cross-sell opportunity appropriate for your business. The investment
            is $8,000 for implementation followed by three monthly payments of
            $3,000. Advertising and specified third-party costs are separate.
          </p>
        </div>
      </Section>
      <Section title="Built for Contractors Ready to Grow">
        <Fit />
      </Section>
      <Section
        eyebrow="The problem"
        title="Most Agencies Stop at the Lead"
        light
      >
        <p className="a-lead">
          Aurex connects the lead to the appointment, the appointment to the
          sold job, and the customer to the next purchase or referral.
        </p>
        <p className="a-closing">
          Aurex helps established residential contractors turn more marketing
          spend into booked appointments and sold jobs, recover opportunities
          that did not close, and generate more repeat and referral revenue from
          the customers they already earned.
        </p>
      </Section>
      <Section title="One Revenue System. Four Jobs.">
        <Phases />
      </Section>
      <Section
        eyebrow="Tracking supports every phase"
        title="The Aurex Revenue Command Center"
        light
      >
        <p className="a-lead">
          A shared view of sources, appointments, estimates, sales, collected
          revenue, and recovery and customer-expansion activity.
        </p>
        <p className="a-closing">
          We reconcile pipeline records with client-reported outcomes. A lead is
          not a sale. A booked job is not collected revenue. The weekly
          scorecard identifies the next constraint to fix.
        </p>
        <a className="a-inline" href="/results/methodology">
          Read our attribution methodology ↗
        </a>
      </Section>
      <Section
        eyebrow="The agreed base scope"
        title="Exact Implementation Deliverables"
      >
        <div className="a-columns">
          <List items={implementation} />
        </div>
      </Section>
      <Section title="Monthly Growth Operations" light>
        <div className="a-columns">
          <List items={operations} />
        </div>
      </Section>
      <Section title="A Working Partnership">
        <div className="a-two">
          <article>
            <h3>Client responsibilities</h3>
            <List items={responsibilities} />
          </article>
          <article>
            <h3>What is not included</h3>
            <List items={excluded} />
          </article>
        </div>
      </Section>
      <Section title="Your First 120 Days" light>
        <Timeline />
      </Section>
      <Section title="Proof Before Promises">
        <ProofCard />
        <ProofMedia />
        <ResultsDisclaimer />
      </Section>
      <Section
        eyebrow="Delivery assurance"
        title="45-Day Core Launch and Tracking Assurance"
        light
      >
        <div className="a-reading">
          <p>
            Once the Ready Date begins, Aurex will have the agreed core funnel,
            campaign, GHL pipeline, lead-response workflows, booking process,
            primary recovery workflow, and source-to-pipeline reporting live and
            tested within 45 calendar days.
          </p>
          <p>
            If Aurex misses that deadline for reasons within Aurex’s control,
            the client receives a full credit for the first $3,000 management
            payment, and management billing pauses until the agreed core system
            is live.
          </p>
          <p>
            Client-caused delays, platform reviews, account restrictions,
            third-party outages, and material scope changes adjust or pause the
            timeline.
          </p>
          <h3>What starts the Ready Date?</h3>
          <p>
            The Ready Date is confirmed in writing after the agreed scope,
            required access, initial payment, necessary assets and approvals,
            advertising budget, and client lead-handling owner are in place. The
            signed agreement records the prerequisites and any timeline
            adjustments.
          </p>
          <h3>What does live and tested mean?</h3>
          <List items={launchChecks} />
          <p>
            This is a delivery assurance. It does not guarantee leads,
            appointments, sales, revenue, profit or ROI.
          </p>
        </div>
      </Section>
      <Section title="The Initial Engagement">
        <Pricing />
      </Section>
      <Section title="Questions About the Partnership" light>
        <FAQ />
      </Section>
      <FinalCTA />
    </Shell>
  );
}
