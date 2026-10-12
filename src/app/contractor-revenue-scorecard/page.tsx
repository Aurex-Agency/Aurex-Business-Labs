import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Shell, PageHero } from "@/components/authority/shared";
import { ResourceArt } from "@/components/learn/graphics";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta(
  "Contractor Revenue Scorecard",
  "Learn to follow the same group of inquiries from first contact to sold job. Open the free scorecard and downloadable worksheet.",
  "/contractor-revenue-scorecard",
);
export default function Page() {
  return (
    <Shell>
      <PageHero
        eyebrow="Contractor Revenue Scorecard"
        path="/contractor-revenue-scorecard"
        title={
          <>
            Know which question <em>to ask next.</em>
          </>
        }
        description="Connect inquiries, conversations, appointments, estimates, and sold jobs. Use a simple scorecard to make your next team conversation more useful."
      />
      <section className="l-section is-paper l-sheet">
        <div className="l-wrap l-split l-split-center">
          <div className="l-art-frame" data-reveal="scale">
            <ResourceArt kind="scorecard" animate />
          </div>
          <div data-reveal>
            <h2>
              Your scorecard. <em>Ready when you are.</em>
            </h2>
            <p className="l-lead l-gap">
              Use the interactive tool to calculate handoff rates, or download
              the blank worksheet to review with your team. No registration is
              needed.
            </p>
            <div className="l-actions l-gap">
              <Link
                className="l-button is-dark"
                href="/resources/contractor-revenue-scorecard"
              >
                Open the free scorecard <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
