import { publishableProof, roofingProof } from "@/lib/proof";
import Link from "next/link";
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
          name: "Results Built on Business Outcomes",
          url: `${site.url}/results`,
        }}
      />
      <PageHero
        eyebrow="Results"
        path="/results"
        title="Results Built on Business Outcomes"
        description="Evidence matters most when you can see what was measured, how it was attributed, and what remains unknown."
      />
      {publishableProof(roofingProof) ? (
        <Section title="The Roofing Revenue System" light>
          <ProofCard />
          <ProofMedia />
        </Section>
      ) : (
        <Section title="Start with the measurement standard." light>
          <p className="a-lead">
            A result should come with a clear definition, a time period, and
            evidence that supports the claim. Our methodology explains what we
            measure and how we separate verified outcomes from influenced
            results.
          </p>
          <Link className="l-text-link" href="/results/methodology">
            Read the methodology ↗
          </Link>
        </Section>
      )}
      <Section title="What We Measure">
        <div className="a-columns">
          <List
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
        </div>
        <p>
          We separate verified results, influenced results, and estimates. We do
          not present raw leads as sold-job revenue.
        </p>
        <a className="a-inline" href="/results/methodology">
          Read the results methodology ↗
        </a>
        <ResultsDisclaimer />
      </Section>
      <FinalCTA />
    </Shell>
  );
}
