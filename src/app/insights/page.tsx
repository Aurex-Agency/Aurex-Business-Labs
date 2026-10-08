import { pageMeta } from "@/lib/seo";
import {
  ArticleCard,
  Shell,
  PageHero,
  Section,
  FinalCTA,
} from "@/components/authority/shared";

import { articles } from "@/content/articles";
export const metadata = pageMeta(
  "Contractor Sales and Marketing Insights",
  "Practical guides to lead-to-sale tracking, acquisition economics, estimate follow-up and contractor revenue systems.",
  "/insights",
);
export default function Page() {
  return (
    <Shell>
      <PageHero
        eyebrow="Insights"
        path="/insights"
        title="Better Questions. Clearer Numbers. Better Decisions."
        description="Practical guides for contractor owners connecting marketing activity to business outcomes."
      />
      <Section title="The Essential Guides" light>
        <div className="a-three">
          {articles.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
        <a className="a-inline" href="/rss.xml">
          Subscribe via RSS ↗
        </a>
      </Section>
      <FinalCTA />
    </Shell>
  );
}
