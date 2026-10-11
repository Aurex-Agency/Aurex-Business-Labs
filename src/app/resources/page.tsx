import { Shell, PageHero } from "@/components/authority/shared";
import { ResourceGrid } from "@/components/learn/shared";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
export const metadata = pageMeta(
  "Free Contractor Resources",
  "Practical worksheets, follow-up templates, and checklists for residential contractors. Free to use, with no registration required.",
  "/resources",
);
export default function ResourcesPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="The working library"
        path="/resources"
        title="Good ideas. Ready to use."
        description="Practical tools for the work between the inquiry and the sold job. Open, adapt, and use them with your team."
      />
      <section className="l-wrap l-library">
        <div className="l-library-meta">
          <span>3 resources / Built for residential contractors</span>
          <span>No sign-up required</span>
        </div>
        <ResourceGrid />
        <div className="l-library-note">
          <p>New to the framework?</p>
          <Link className="l-text-link" href="/start-here">
            Find your starting point ↗
          </Link>
        </div>
      </section>
    </Shell>
  );
}
