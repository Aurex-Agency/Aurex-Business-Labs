import { pageMeta } from "@/lib/seo";
import {
  Shell,
  PageHero,
  FinalCTA,
  Schema,
} from "@/components/authority/shared";
import { WorkGrid } from "@/components/studio/motion";
import { site } from "@/lib/site-config";
export const metadata = pageMeta(
  "Selected Work",
  "A closer look at websites and digital experiences from Aurex Business Labs. Individual businesses, distinctive design.",
  "/work",
);
export default function Work() {
  return (
    <Shell>
      <Schema
        data={{
          "@type": "CollectionPage",
          name: "Selected Work",
          url: `${site.url}/work`,
        }}
      />
      <PageHero
        eyebrow="Selected work"
        path="/work"
        title="Every business has its own character."
        description="The work should show it. A selection of digital experiences shaped around the people, products, and decisions behind each business."
      />
      <section className="s-work-section" aria-label="Selected projects">
        <WorkGrid />
      </section>
      <FinalCTA />
    </Shell>
  );
}
