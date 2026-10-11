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
      <section className="f-hero l-wrap">
        <div className="f-hero-copy">
          <p className="l-eyebrow">
            <span className="l-dot" /> A field guide for residential contractors
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
        <div className="f-hero-bottom">
          <span>THE BUSINESS BEHIND THE GOOD WORK</span>
          <a href="#explore">
            Find your next step <ArrowDown size={16} />
          </a>
          <span>AUREX FIELD GUIDE / 01</span>
        </div>
      </section>
      <StartingPoint />
      <section className="f-library">
        <div className="l-wrap">
          <div className="f-library-heading">
            <div>
              <p className="l-eyebrow">01 / The working library</p>
              <h2>
                Less guesswork.
                <br />
                <em>More getting somewhere.</em>
              </h2>
            </div>
            <div>
              <p>
                Useful on Monday morning.
                <br />
                Free tools to open, adapt, and use with your team.
              </p>
              <Link className="l-text-link" href="/resources">
                Browse the library <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <ResourceGrid />
          <div className="f-library-foot">
            <span>BUILT TO BE USED, NOT JUST READ.</span>
            <span>No sign-up. No gate. Get to work. ↗</span>
          </div>
        </div>
      </section>
      <SystemStory />
      <section className="f-perspective l-wrap">
        <div className="f-perspective-top">
          <p className="l-eyebrow">Our point of view</p>
          <span>A NOTE FROM AUREX BUSINESS LABS</span>
        </div>
        <h2>
          Look beyond
          <br />
          the <span className="f-crossout">lead count.</span>
          <br />
          <em>Follow the whole story.</em>
        </h2>
        <div className="f-perspective-bottom">
          <div className="f-margin-note">
            <span>↳</span> The handoff matters
            <br />
            as much as the hello.
          </div>
          <div>
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
      </section>
      <section className="f-notebook l-wrap">
        <div className="f-notebook-heading">
          <div>
            <p className="l-eyebrow">03 / From the notebook</p>
            <h2>Worth a closer look.</h2>
          </div>
          <Link className="l-text-link" href="/insights">
            All insights <ArrowRight size={17} />
          </Link>
        </div>
        <GuideList />
      </section>
      <LearningCTA />
    </Shell>
  );
}
