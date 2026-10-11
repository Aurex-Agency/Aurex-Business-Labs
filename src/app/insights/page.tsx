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
        title="A little more understanding."
        description="Practical thinking for contractor owners. Clear definitions, useful examples, and questions worth taking back to your team."
      />
      <section className="l-wrap l-library">
        <GuideList />
        <a className="l-text-link" href="/rss.xml">
          Follow new guides via RSS ↗
        </a>
      </section>
      <LearningCTA />
    </Shell>
  );
}
