import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { site } from "@/lib/site-config";
import { organization, pageMeta } from "@/lib/seo";
import { Shell, Schema } from "@/components/authority/shared";
import {
  FieldIllustration,
  StartingPoint,
  SystemStory,
} from "@/components/learn/field-guide";
import {
  ResourceGrid,
  GuideList,
  LearningCTA,
} from "@/components/learn/shared";
export const metadata = pageMeta(
  "Aurex Business Labs | A Field Guide to Contractor Growth",
  "Free guides, practical tools, and customer acquisition systems for residential contractors. Understand the journey from first inquiry to the next booked job.",
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
      <section className="f-hero">
        <div className="l-wrap f-hero-grid">
          <div className="f-hero-copy">
            <p className="l-eyebrow">
              <span className="l-dot" aria-hidden="true" /> A field guide for
              residential contractors
            </p>
            <h1>
              Good work deserves <em>a better system.</em>
            </h1>
            <p className="f-hero-deck">
              You know your trade. Get to know the journey around it, from the
              first inquiry to the next booked job.
            </p>
            <div className="l-actions">
              <Link className="l-button" href="/resources">
                Explore free resources <ArrowUpRight size={18} />
              </Link>
              <Link className="l-text-link" href="/start-here">
                Start here <ArrowRight size={17} />
              </Link>
            </div>
            <p className="f-hero-note">
              Practical tools. Useful ideas. Yours to put to work.
            </p>
          </div>
          <FieldIllustration />
        </div>
        <div className="l-wrap f-hero-bottom">
          <span>The business behind the good work</span>
          <a href="#explore">
            Find your next step
            <span className="f-scroll-cue" aria-hidden="true">
              <ArrowDown size={15} />
            </span>
          </a>
          <span>Aurex field guide / 01</span>
        </div>
      </section>
      <StartingPoint />
      <section className="f-library is-paper">
        <div className="l-wrap">
          <div className="l-section-head" data-reveal>
            <div>
              <p className="l-eyebrow">01 / The working library</p>
              <h2>
                Less guesswork. <em>More getting somewhere.</em>
              </h2>
            </div>
            <div>
              <p>
                Useful on Monday morning. Free tools to open, adapt, and use
                with your team.
              </p>
              <Link className="l-text-link" href="/resources">
                Browse the library <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <ResourceGrid />
          <div className="f-library-foot">
            <span>Built to be used, not just read.</span>
            <span>No sign-up. No gate. Get to work.</span>
          </div>
        </div>
      </section>
      <SystemStory />
      <section className="f-perspective">
        <div className="l-wrap">
          <div className="f-perspective-top" data-reveal="fade">
            <p className="l-eyebrow">Our point of view</p>
            <span>A note from Aurex Business Labs</span>
          </div>
          <h2 data-reveal>
            Look beyond
            <br />
            the <span className="f-crossout">lead count.</span>
            <br />
            <em>Follow the whole story.</em>
          </h2>
          <div className="f-perspective-bottom" data-stagger>
            <div className="f-margin-note">
              <span aria-hidden="true">↳</span>
              <p>
                The handoff matters
                <br />
                as much as the hello.
              </p>
            </div>
            <div className="f-perspective-copy">
              <p>
                Which inquiries became conversations? Which estimates need
                attention? What happened after the work was done?
              </p>
              <p>
                We connect marketing to the day-to-day work of running a
                contracting business. Clear definitions. Useful processes.
                Evidence you can follow.
              </p>
              <Link className="l-text-link" href="/about">
                Get to know Aurex <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="f-notebook">
        <div className="l-wrap">
          <div className="l-section-head" data-reveal>
            <div>
              <p className="l-eyebrow">03 / From the notebook</p>
              <h2>
                Worth a <em>closer look.</em>
              </h2>
            </div>
            <div>
              <Link className="l-text-link" href="/insights">
                All insights <ArrowRight size={17} />
              </Link>
            </div>
          </div>
          <GuideList />
        </div>
      </section>
      <LearningCTA />
    </Shell>
  );
}
