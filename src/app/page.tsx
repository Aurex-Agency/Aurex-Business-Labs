import { pageMeta, organization } from "@/lib/seo";
import { roofingProof, publishableProof } from "@/lib/proof";
import Link from "next/link";
import { site } from "@/lib/site-config";

import { Action } from "@/components/authority/interactions";
import {
  Shell,
  Section,
  Process,
  Phases,
  ProofCard,
  ProofMedia,
  Fit,
  Timeline,
  Pricing,
  FAQ,
  FinalCTA,
  Schema,
} from "@/components/authority/shared";
export const metadata = pageMeta(site.title, site.shortDescription, "/");
export default function Home() {
  return (
    <Shell>
      <Schema
        data={[
          organization,
          {
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
            url: site.url,
            name: site.brandName,
            publisher: { "@id": `${site.url}/#organization` },
          },
        ]}
      />
      <section className="a-home-hero">
        <div className="a-wrap">
          <div className="a-hero-top">
            <p className="a-label">For established residential contractors</p>
            <span className="a-edition">THE AUREX REVENUE CAPTURE SYSTEM</span>
          </div>
          <h1>
            Turn More Marketing Spend Into <em>Booked Jobs,</em> Recovered
            Revenue, and Repeat Business
          </h1>
          <div className="a-hero-bottom">
            <p className="a-deck">
              Aurex Business Labs builds the system between the first click and
              the sold job, then helps turn completed jobs into repeat work and
              referrals.
            </p>
            <div className="a-actions">
              <Action href="/apply">Request a Revenue Leakage Audit</Action>
              <Action
                secondary
                href="/results/roofing-revenue-system"
                event="secondary_cta_click"
              >
                See the Roofing Case Study
              </Action>
            </div>
          </div>
          <Process />
          <p className="a-qualification">
            Built for established roofing, HVAC, plumbing, electrical,
            remodeling, window, restoration, and other higher-value residential
            service companies.
          </p>
          {publishableProof(roofingProof) && (
            <p>
              ${roofingProof.results[0].amount.toLocaleString("en-US")} in
              tracked revenue over four months for a North Mississippi roofing
              company.
            </p>
          )}
        </div>
      </section>
      <Section
        eyebrow="The gap after the click"
        title="More Leads Will Not Fix Revenue That Leaks After the Click"
        light
      >
        <div className="a-three">
          {[
            [
              "Leads Go Cold",
              "Calls get missed. Web inquiries sit unanswered. Nobody owns the next step.",
            ],
            [
              "Estimates Go Quiet",
              "Homeowners receive a quote, delay the decision, and disappear without consistent follow-up.",
            ],
            [
              "Customers Buy Once",
              "The job gets completed, but no review, referral, repeat-service, or reactivation system follows.",
            ],
          ].map(([h, p], i) => (
            <article className="a-card" key={h}>
              <span className="a-number">0{i + 1}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
        <p className="a-closing">
          You already paid to create many of these opportunities. Aurex helps
          you capture more of their value.
        </p>
      </Section>
      <Section
        eyebrow="Capture → Convert → Recover → Compound"
        title="One Revenue System. Four Jobs."
      >
        <Phases />
        <p className="a-closing">
          Tracking supports every phase so the owner can see what is producing
          appointments, sales, recovered opportunities, and customer value.
        </p>
        <a className="a-inline" href="/revenue-capture-system">
          Explore the full system ↗
        </a>
      </Section>
      <Section
        eyebrow="Evidence, with context"
        title="Proof Before Promises"
        light
      >
        <ProofCard />
        <ProofMedia />
      </Section>
      <Section
        eyebrow="Economics before engagement"
        title="Built for Contractors With the Economics and Capacity to Grow"
      >
        <Fit />
      </Section>
      <Section
        eyebrow="Build. Operate. Improve."
        title="What Happens During the First 120 Days"
        light
      >
        <Timeline />
      </Section>
      <Section
        eyebrow="Clear scope. Clear investment."
        title="The Initial Engagement"
      >
        <Pricing />
      </Section>
      <Section
        eyebrow="About Aurex Business Labs"
        title="Built Around Business Outcomes, Not Agency Reports"
        light
      >
        <div className="a-two">
          <p className="a-lead">
            Aurex Business Labs was built to solve the gap between marketing
            activity and business revenue.
          </p>
          <div>
            <p>
              We help established residential contractors connect acquisition,
              lead handling, opportunity recovery, referrals, and repeat
              business into one measurable system.
            </p>
            <a className="a-inline" href="/about">
              About Aurex Business Labs ↗
            </a>
          </div>
        </div>
      </Section>
      <Section
        eyebrow="Every Thursday / 11:00 a.m. Central"
        title="Contractor Revenue Scorecard Live"
      >
        <div className="a-two">
          <p className="a-lead">
            Know what happens between the lead and the sold job.
          </p>
          <div>
            <p>
              Every Thursday at 11:00 a.m. Central, Aurex teaches contractor
              owners how to track marketing from the first lead to the sold job,
              identify the real constraint, and ask better questions of their
              marketing providers.
            </p>
            <div className="a-actions">
              <Action
                href="/contractor-revenue-scorecard"
                event="webinar_register_click"
              >
                Register for Thursday
              </Action>
              <Link className="a-inline" href="/insights">
                Browse Contractor Insights ↗
              </Link>
            </div>
          </div>
        </div>
      </Section>
      <Section eyebrow="Before we work together" title="Straight Answers" light>
        <FAQ />
      </Section>
      <FinalCTA />
    </Shell>
  );
}
