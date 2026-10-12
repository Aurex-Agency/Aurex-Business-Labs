import { Rss } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { Shell, PageHero } from "@/components/authority/shared";
import { GuideList, LearningCTA } from "@/components/learn/shared";
export const metadata = pageMeta(
  "Contractor Sales and Marketing Insights",
  "Practical guides to lead-to-sale tracking, acquisition economics, estimate follow-up and contractor revenue systems.",
  "/insights",
);
export default function Page() {
  return (
    <Shell>
      <PageHero
        eyebrow="From the notebook"
        path="/insights"
        title={
          <>
            A little more <em>understanding.</em>
          </>
        }
        description="Practical thinking for contractor owners. Clear definitions, useful examples, and questions worth taking back to your team."
      />
      <section className="l-section l-insights">
        <div className="l-wrap">
          <GuideList />
          <a className="l-text-link l-rss" href="/rss.xml">
            <Rss size={16} /> Follow new guides via RSS ↗
          </a>
        </div>
      </section>
      <LearningCTA />
    </Shell>
  );
}
