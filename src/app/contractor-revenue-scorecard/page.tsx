import Link from "next/link";
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
        title="Know which question to ask next."
        description="Connect inquiries, conversations, appointments, estimates, and sold jobs. Use a simple scorecard to make your next team conversation more useful."
      />
      <section className="l-wrap l-section l-feature">
        <ResourceArt kind="scorecard" />
        <div>
          <h2>
            Your scorecard.
            <br />
            Ready when you are.
          </h2>
          <p style={{ marginTop: 24 }}>
            Use the interactive tool to calculate handoff rates, or download the
            blank worksheet to review with your team. No registration is needed.
          </p>
          <Link
            className="l-button"
            style={{ marginTop: 25 }}
            href="/resources/contractor-revenue-scorecard"
          >
            Open the free scorecard ↗
          </Link>
        </div>
      </section>
    </Shell>
  );
}
