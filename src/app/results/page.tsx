import { publishableProof, roofingProof } from "@/lib/proof";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site-config";
import { pageMeta } from "@/lib/seo";
import {
  Shell,
  PageHero,
  Section,
  List,
  ProofCard,
  ProofMedia,
  ResultsDisclaimer,
  FinalCTA,
  Schema,
} from "@/components/authority/shared";

export const metadata = pageMeta(
  "Contractor Marketing Results and Case Studies",
  "How Aurex measures appointments, sold jobs, recovered opportunities and collected revenue, with clear attribution standards.",
  "/results",
);
export default function Page() {
  return (
    <Shell>
      <Schema
        data={{
          "@type": "CollectionPage",
          name: "Results built on business outcomes",
          url: `${site.url}/results`,
        }}
      />
      <PageHero
        eyebrow="Results"
        path="/results"
        title={
          <>
            Results built on <em>business outcomes.</em>
          </>
        }
        description="Evidence matters most when you can see what was measured, how it was attributed, and what remains unknown."
      />
      {publishableProof(roofingProof) ? (
        <Section title="The roofing revenue system" light>
          <ProofCard />
          <ProofMedia />
        </Section>
      ) : (
        <section className="l-section is-paper l-sheet">
          <div className="l-wrap l-split" data-reveal>
            <h2>Start with the measurement standard.</h2>
            <div>
              <p className="l-lead">
                A result should come with a clear definition, a time period, and
                evidence that supports the claim. Our methodology explains what
                we measure and how we separate verified outcomes from influenced
                results.
              </p>
              <div className="l-stack-links">
                <Link className="l-text-link" href="/results/methodology">
                  Read the methodology <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="l-section">
        <div className="l-wrap" data-reveal>
          <div className="l-section-head">
            <div>
              <h2>What we measure</h2>
            </div>
            <p>
              We separate verified results, influenced results, and estimates.
              We do not present raw leads as sold-job revenue.
            </p>
          </div>
          <List
            columns
            items={[
              "New opportunity revenue",
              "Recovered opportunity revenue",
              "Repeat revenue",
              "Referral revenue",
              "Booked appointments",
              "Estimates",
              "Sold jobs",
              "Collected revenue",
              "Gross profit when reliable margin data exists",
            ]}
          />
          <div className="l-stack-links">
            <Link className="l-text-link" href="/results/methodology">
              Read the results methodology <ArrowUpRight size={16} />
            </Link>
          </div>
          <ResultsDisclaimer />
        </div>
      </section>
      <FinalCTA />
    </Shell>
  );
}
