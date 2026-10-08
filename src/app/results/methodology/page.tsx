import { pageMeta } from "@/lib/seo";
import {
  Shell,
  PageHero,
  Section,
  List,
  ResultsDisclaimer,
  FinalCTA,
} from "@/components/authority/shared";

export const metadata = pageMeta(
  "Results and Attribution Methodology",
  "Definitions and evidence standards for tracked revenue, collected revenue, verified results and influenced opportunities.",
  "/results/methodology",
);
export default function Page() {
  return (
    <Shell>
      <PageHero
        eyebrow="Results methodology"
        path="/results/methodology"
        title="Every Result Needs a Definition"
        description="A useful result states its source, date window, business context, measurement method and limitations."
      />
      <Section title="The Terms We Use" light>
        <div className="a-two">
          <article className="a-card">
            <h3>Tracked revenue</h3>
            <p>
              Revenue tied to a lead, opportunity, or customer visible in the
              agreed tracking system.
            </p>
          </article>
          <article className="a-card">
            <h3>Collected revenue</h3>
            <p>Money the client confirms it received.</p>
          </article>
          <article className="a-card">
            <h3>Verified result</h3>
            <p>
              Source, opportunity stage, sale, and revenue can be reconciled
              using the agreed records.
            </p>
          </article>
          <article className="a-card">
            <h3>Influenced result</h3>
            <p>
              An Aurex campaign or workflow touched the opportunity, but
              causation cannot be fully isolated.
            </p>
          </article>
          <article className="a-card">
            <h3>Estimated gross profit</h3>
            <p>
              Collected revenue multiplied by a client-supplied or documented
              gross-margin estimate.
            </p>
          </article>
          <article className="a-card">
            <h3>Unverified result</h3>
            <p>
              A result reported without enough source, sale, or revenue
              documentation to verify.
            </p>
          </article>
        </div>
      </Section>
      <Section title="How a Result Becomes Publishable">
        <div className="a-reading">
          <p>
            We reconcile the source record, opportunity history, sale record and
            revenue amount. We identify the date window, baseline where
            available, cancellations and refunds, and whether revenue is
            contracted or collected. Estimates use a documented margin
            assumption.
          </p>
          <p>
            We retain the original acquisition source and label recovery, repeat
            and referral activity separately. One job is counted once in
            combined revenue. A touched opportunity is classified as influenced
            when causation cannot be isolated.
          </p>
          <p>
            Client permission and verification are separate requirements. Both
            must be satisfied before a financial proof record or client media
            appears publicly. Supporting images are redacted to remove customer
            personal information.
          </p>
          <List
            items={[
              "Leads are not revenue.",
              "Booked appointments are not sold jobs.",
              "Tracked revenue does not always prove sole causation.",
              "Results vary.",
              "Past performance does not guarantee future results.",
            ]}
          />
          <ResultsDisclaimer />
        </div>
      </Section>
      <FinalCTA />
    </Shell>
  );
}
