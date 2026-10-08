import { site } from "@/lib/site-config";
import { pageMeta, organization } from "@/lib/seo";
import {
  Shell,
  PageHero,
  Section,
  List,
  ProofMedia,
  ResultsDisclaimer,
  FinalCTA,
  Schema,
} from "@/components/authority/shared";
import { EventView } from "@/components/authority/interactions";
import { roofingProof as proof, publishableProof } from "@/lib/proof";
const approved = publishableProof(proof);
const title = approved
  ? `How Aurex Helped a North Mississippi Roofing Company Track $${proof.results[0].amount.toLocaleString("en-US")} in Revenue Over Four Months`
  : "A Lead-to-Revenue System for a North Mississippi Roofing Company";
export const metadata = pageMeta(
  approved
    ? "$320K Tracked Roofing Revenue Case Study"
    : "Roofing Revenue System Case Study",
  approved
    ? title
    : "Explore the roofing revenue system and the evidence required before numerical results are published.",
  "/results/roofing-revenue-system",
);
export default function Page() {
  return (
    <Shell>
      <EventView event="case_study_view" />
      <Schema
        data={{
          "@type": "Article",
          headline: title,
          author: organization,
          publisher: organization,
          mainEntityOfPage: `${site.url}/results/roofing-revenue-system`,
          ...(approved &&
            proof.publishedAt && { datePublished: proof.publishedAt }),
          ...(approved && proof.updatedAt && { dateModified: proof.updatedAt }),
        }}
      />
      {approved && proof.video && proof.testimonialUrl && (
        <Schema
          data={{
            "@type": "VideoObject",
            name: proof.video.title,
            description: proof.video.summary,
            thumbnailUrl: proof.video.thumbnail,
            uploadDate: proof.video.uploadDate,
            contentUrl: proof.testimonialUrl,
            ...(proof.video.duration && { duration: proof.video.duration }),
          }}
        />
      )}
      <PageHero
        eyebrow="Roofing case study"
        path="/results/roofing-revenue-system"
        title={title}
        description="See how Aurex built a lead-to-revenue system for a North Mississippi roofing company."
      />
      <Section title="Client Profile" light>
        <dl className="a-facts">
          <div>
            <dt>Business type</dt>
            <dd>Residential roofing company</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>North Mississippi</dd>
          </div>
          <div>
            <dt>Client identity</dt>
            <dd>Anonymized</dd>
          </div>
        </dl>
      </Section>
      {approved ? (
        <>
          <Section title="The Situation and Work">
            <div className="a-reading">
              {proof.problem && <p>{proof.problem}</p>}
              {proof.baseline && <p>{proof.baseline}</p>}
              <List items={proof.workPerformed} />
              {proof.dateRange && (
                <p>
                  {proof.dateRange.label}: {proof.dateRange.start} to{" "}
                  {proof.dateRange.end}
                </p>
              )}
            </div>
          </Section>
          <Section title="Tracked Results" light>
            {proof.results.map((r) => (
              <p className="a-lead" key={r.label}>
                ${r.amount.toLocaleString("en-US")} in {proof.resultType},{" "}
                {r.label}.
              </p>
            ))}
            <p>Attribution classification: {proof.attributionStatus}.</p>
            <p>{proof.methodologyNotes}</p>
            <ProofMedia />
          </Section>
        </>
      ) : (
        <Section title="What Can Be Shared Today">
          <div className="a-reading">
            <p>
              The exact result dates, baseline, implementation scope, source
              records and publication permissions are still being prepared for
              public review. Numerical results, screenshots, client quotes and
              testimonial videos are withheld until that review is complete.
            </p>
            <p>
              This page is not evidence of a verified financial outcome. We will
              publish the documented work and measurement context together,
              rather than ask you to infer a result from an incomplete story.
            </p>
          </div>
        </Section>
      )}
      <Section title="What a Tracked Result Does Not Prove" light>
        <p className="a-lead">
          Tracked revenue is revenue tied to a lead, opportunity or customer
          visible in the agreed tracking system. It does not establish that
          Aurex alone caused the sale.
        </p>
        <p className="a-closing">
          A sale is not profit. A contract is not collected cash. Other
          marketing, the client’s sales team, market demand and fulfillment can
          all influence the outcome.
        </p>
        <a className="a-inline" href="/results/methodology">
          How we verify and classify results ↗
        </a>
        <ResultsDisclaimer />
      </Section>
      <FinalCTA />
    </Shell>
  );
}
