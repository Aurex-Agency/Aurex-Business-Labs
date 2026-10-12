import { ArrowUpRight } from "lucide-react";
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
        title={
          <>
            Good ideas. <em>Ready to use.</em>
          </>
        }
        description="Practical tools for the work between the inquiry and the sold job. Open, adapt, and use them with your team."
      />
      <section className="l-section is-paper l-sheet">
        <div className="l-wrap">
          <div className="l-library-meta" data-reveal="fade">
            <span>3 resources / Built for residential contractors</span>
            <span>No sign-up required</span>
          </div>
          <ResourceGrid />
          <div className="l-library-note" data-reveal>
            <p>New to the framework?</p>
            <Link className="l-text-link" href="/start-here">
              Find your starting point <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
