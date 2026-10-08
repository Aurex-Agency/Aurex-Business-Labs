import Image from "next/image";
import { site } from "@/lib/site-config";
import { pageMeta, organization } from "@/lib/seo";
import {
  Shell,
  PageHero,
  Section,
  FinalCTA,
  Schema,
} from "@/components/authority/shared";
import { Action } from "@/components/authority/interactions";
export const metadata = pageMeta(
  "About Aurex Business Labs | Contractor Revenue Systems",
  site.shortDescription,
  "/about",
);
export default function Page() {
  const facts = [
    ["Official name", site.brandName],
    ["Legal entity", site.legalName],
    ["Founder", site.founderName],
    ["Founded", site.foundedYear],
    ["Location", site.address],
    ["Service area", site.serviceArea],
    ["Email", site.email],
    ["Phone", site.phone],
    ["Flagship service", site.flagshipService],
  ].filter(([, value]) => value);
  return (
    <Shell>
      <Schema
        data={[
          organization,
          ...(site.founderName
            ? [
                {
                  "@type": "Person",
                  "@id": `${site.url}/about#founder`,
                  name: site.founderName,
                  ...(site.founderBio && { description: site.founderBio }),
                  worksFor: { "@id": `${site.url}/#organization` },
                },
              ]
            : []),
        ]}
      />
      <PageHero
        eyebrow="About"
        path="/about"
        title="Built Around Business Outcomes"
        description="Acquire customers. Convert more opportunities. Recover missed revenue. Make each customer worth more."
      />
      <Section title="What is Aurex Business Labs?" light>
        <p className="a-lead">
          Aurex Business Labs is a customer acquisition and revenue systems
          company serving established residential contractors across the United
          States. Its flagship service, the Aurex Revenue Capture System, helps
          contractors generate qualified demand, improve lead handling, recover
          missed opportunities, and build repeat and referral revenue.
        </p>
        <dl className="a-facts">
          {facts.map(([name, value]) => (
            <div key={name}>
              <dt>{name}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {site.founderName && site.founderBio && (
          <article className="a-reading">
            {site.founderPhoto && (
              <Image
                src={site.founderPhoto}
                alt={site.founderName}
                width={600}
                height={750}
                className="a-founder-photo"
              />
            )}
            <h3>{site.founderName}</h3>
            <p>{site.founderBio}</p>
          </article>
        )}
      </Section>
      <Section title="The Revenue Integrity Standard">
        <p className="a-lead">
          Before Aurex recommends an engagement, we calculate how many
          additional sold jobs the full investment would need to produce or
          recover.
        </p>
        <p className="a-closing">
          When the business lacks the margins, team, capacity, or data required
          to support a credible path to payback, we say so before taking the
          engagement.
        </p>
      </Section>
      <Section title="Our Operating Philosophy" light>
        <div className="a-three">
          {[
            [
              "Connect the work",
              "Acquisition, lead handling, recovery, referrals and repeat business belong in one measurable process.",
            ],
            [
              "Share the responsibility",
              "Aurex builds and improves the system. The client provides live conversations, accurate outcomes and the capacity to deliver.",
            ],
            [
              "Keep the evidence clear",
              "We distinguish verified results, influenced results and estimates. We do not turn leads into revenue on a report.",
            ],
          ].map(([h, p]) => (
            <article className="a-card" key={h}>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
        <div className="a-actions">
          <Action href="/revenue-capture-system" event="secondary_cta_click">
            Explore the Revenue Capture System
          </Action>
          <a className="a-inline" href="/results">
            See results ↗
          </a>
        </div>
      </Section>
      <FinalCTA />
    </Shell>
  );
}
