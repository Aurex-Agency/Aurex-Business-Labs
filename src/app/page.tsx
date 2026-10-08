import Link from "next/link";
import { site } from "@/lib/site-config";
import { organization, pageMeta } from "@/lib/seo";
import { Shell, Schema, FinalCTA } from "@/components/authority/shared";
import { KineticHero, WorkGrid, StudioStory } from "@/components/studio/motion";
import { articles } from "@/content/articles";
export const metadata = pageMeta(
  "Aurex Business Labs | Strategy, Websites & Connected Systems",
  site.shortDescription,
  "/",
);
export default function Home() {
  return (
    <Shell>
      <Schema
        data={[
          organization,
          {
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
            url: site.url,
            name: site.brandName,
            publisher: { "@id": `${site.url}/#organization` },
          },
        ]}
      />
      <KineticHero />
      <section className="s-intro">
        <p className="s-kicker">
          A considered approach.
          <br />A distinctive outcome.
        </p>
        <div>
          <h2>
            You’ve built something worth knowing.
            <br />
            <em>Let’s make it impossible to overlook.</em>
          </h2>
          <p>
            We look beyond a single page or a first impression. Aurex Business
            Labs brings the message, the experience, and the systems behind your
            business into focus.
          </p>
        </div>
      </section>
      <section className="s-work-section" id="selected-work">
        <div className="s-section-heading">
          <div>
            <p className="s-kicker">Real businesses. Individual character.</p>
            <h2>
              Selected <em>work.</em>
              <sup>(04)</sup>
            </h2>
          </div>
          <Link className="s-text-link" href="/work">
            The full collection <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <WorkGrid />
      </section>
      <StudioStory />
      <section className="s-about-band">
        <span className="s-kicker">The way we work</span>
        <h2>
          Small details.
          <br />
          <em>Serious intent.</em>
        </h2>
        <div>
          <p>
            The best work feels right because someone thought it through. The
            words. The rhythm. The way a page responds. The next step that feels
            obvious.
          </p>
          <p>
            That’s the standard we bring to every part of your digital presence.
          </p>
          <Link className="s-text-link" href="/about">
            Meet Aurex Business Labs <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="s-journal">
        <div className="s-section-heading">
          <div>
            <p className="s-kicker">Notes from the work</p>
            <h2>
              A little <em>perspective.</em>
            </h2>
          </div>
          <Link className="s-text-link" href="/insights">
            All insights ↗
          </Link>
        </div>
        {articles.slice(0, 3).map((a, i) => (
          <Link
            className="s-journal-row"
            key={a.slug}
            href={`/insights/${a.slug}`}
          >
            <span className="s-journal-index">0{i + 1}</span>
            <span className="s-journal-category">{a.category}</span>
            <h3>{a.title}</h3>
            <span className="s-journal-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        ))}
      </section>
      <FinalCTA />
    </Shell>
  );
}
