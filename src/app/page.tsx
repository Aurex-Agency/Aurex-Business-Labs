import Link from "next/link";
import { site } from "@/lib/site-config";
import { organization, pageMeta } from "@/lib/seo";
import {
  Shell,
  Schema,
  FinalCTA,
  Section,
  ProofCard,
  ProofMedia,
  List,
} from "@/components/authority/shared";
import { KineticHero, StudioStory } from "@/components/studio/motion";
import { articles } from "@/content/articles";
export const metadata = pageMeta(
  "Aurex Business Labs | Revenue Systems for Residential Contractors",
  site.shortDescription,
  "/",
);
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
      <KineticHero />
      <section className="s-intro">
        <p className="s-kicker">
          You earned the opportunity.
          <br />
          Don’t lose the next step.
        </p>
        <div>
          <h2>
            More leads won’t fix
            <br />
            <em>what happens after the click.</em>
          </h2>
          <p>
            Calls get missed. Estimates go quiet. Customers buy once. Aurex
            Business Labs connects acquisition, lead handling, recovery, and
            customer expansion so more of those opportunities have a clear path
            forward.
          </p>
        </div>
      </section>
      <StudioStory />
      <Section
        eyebrow="Proof before promises"
        title="Follow the work. Follow the evidence."
      >
        <ProofCard />
        <ProofMedia />
      </Section>
      <section className="s-about-band">
        <span className="s-kicker">
          Built for established residential contractors
        </span>
        <h2>
          Ready for
          <br />
          <em>the next job.</em>
        </h2>
        <div>
          <p>
            Roofing. HVAC. Plumbing. Electrical. Remodeling. Windows.
            Restoration. Higher-value residential services with the people and
            capacity to grow.
          </p>
          <p>
            You bring the service expertise and a team that can respond. We
            connect the campaigns, follow-up, recovery, and reporting around
            them.
          </p>
          <Link className="s-text-link" href="/revenue-capture-system">
            See how the system works ↗
          </Link>
        </div>
      </section>
      <Section
        eyebrow="The right working relationship"
        title="Built around business outcomes."
      >
        <div className="a-two">
          <p className="a-lead">
            Aurex helps established contractors turn more marketing spend into
            booked appointments and sold jobs, recover opportunities that did
            not close, and generate more repeat and referral revenue.
          </p>
          <List
            items={[
              "A profitable priority service and capacity for more work",
              "Office, dispatch, estimating or sales staff to handle opportunities",
              "An owner or general manager involved in the process",
              "Willingness to track appointments, estimates, sales and revenue",
            ]}
          />
        </div>
      </Section>
      <section className="s-journal">
        <div className="s-section-heading">
          <div>
            <p className="s-kicker">For the contractor owner</p>
            <h2>
              A clearer <em>scorecard.</em>
            </h2>
          </div>
          <Link className="s-text-link" href="/contractor-revenue-scorecard">
            Contractor Revenue Scorecard Live ↗
          </Link>
        </div>
        {articles.map((a, i) => (
          <Link
            className="s-journal-row"
            key={a.slug}
            href={`/insights/${a.slug}`}
          >
            <span className="s-journal-index">0{i + 1}</span>
            <span className="s-journal-category">{a.category}</span>
            <h3>{a.title}</h3>
            <span className="s-journal-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        ))}
      </section>
      <FinalCTA />
    </Shell>
  );
}
