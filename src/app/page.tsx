import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { site } from "@/lib/site-config";
import { organization, pageMeta } from "@/lib/seo";
import { Shell, Schema } from "@/components/authority/shared";
import { JourneyGraphic, ResourceArt } from "@/components/learn/graphics";
import { ResourceGrid, GuideList } from "@/components/learn/shared";
import { stages } from "@/content/resources";
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
      <section className="l-home-hero l-wrap">
        <p className="l-eyebrow">
          <span className="l-dot" /> A field guide for residential contractors
        </p>
        <h1>
          Good work deserves
          <br />
          <span>a better system.</span>
        </h1>
        <p className="l-hero-deck">
          Understand what happens between the first inquiry and the next booked
          job. Practical tools and ideas for a stronger business.
        </p>
        <div className="l-actions">
          <Link className="l-button" href="/resources">
            Explore free resources <ArrowUpRight size={17} />
          </Link>
          <Link className="l-text-link" href="/start-here">
            Start here <ArrowRight size={17} />
          </Link>
        </div>
        <JourneyGraphic />
        <div className="l-hero-foot">
          <span>Built around the way contractors work.</span>
          <a href="#explore" aria-label="Explore contractor resources">
            <ArrowDown size={16} />
          </a>
          <span>Learn it. Use it. Make it yours.</span>
        </div>
      </section>
      <section id="explore" className="l-section l-wrap">
        <div className="l-section-head">
          <div>
            <p className="l-eyebrow">01 / Find your starting point</p>
            <h2>
              What needs a<br />
              <span>closer look?</span>
            </h2>
          </div>
          <p>
            You don’t have to fix everything at once.
            <br />
            Start with the part of the customer journey
            <br className="l-desktop-break" /> that needs your attention.
          </p>
        </div>
        <div className="l-pathways">
          {stages.map((s, i) => (
            <Link href={`/start-here#${s.name.toLowerCase()}`} key={s.name}>
              <span className="l-path-number">0{i + 1}</span>
              <h3>
                {
                  [
                    "The right inquiries",
                    "The first response",
                    "The open estimates",
                    "The next opportunity",
                  ][i]
                }
              </h3>
              <span>
                {s.name} <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="l-section l-resource-section">
        <div className="l-wrap">
          <div className="l-section-head">
            <div>
              <p className="l-eyebrow">02 / The working library</p>
              <h2>
                Useful on
                <br />
                <span>Monday morning.</span>
              </h2>
            </div>
            <div>
              <p>
                Open a resource. Put it to work.
                <br />
                Everything here is free to use.
              </p>
              <Link className="l-text-link" href="/resources">
                Browse the library <ArrowRight size={17} />
              </Link>
            </div>
          </div>
          <ResourceGrid />
        </div>
      </section>
      <section className="l-section l-wrap l-feature">
        <div className="l-feature-copy">
          <p className="l-eyebrow">A closer look / Recover</p>
          <h2>
            An estimate isn’t
            <br />
            the end of the
            <br />
            <span>conversation.</span>
          </h2>
          <p>
            Sometimes the next step is a question that hasn’t been answered.
            Learn to follow up with context, clarify the scope, and respect the
            homeowner’s timing.
          </p>
          <Link
            className="l-text-link"
            href="/insights/how-to-follow-up-on-unclosed-contractor-estimates"
          >
            Read the follow-up guide <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="l-feature-art">
          <ResourceArt kind="recover" animate />
          <span className="l-art-caption">
            An illustrative follow-up. A human conversation.
          </span>
        </div>
      </section>
      <section className="l-section l-method-section">
        <div className="l-wrap">
          <div className="l-section-head">
            <div>
              <p className="l-eyebrow">03 / The bigger picture</p>
              <h2>
                One connected system.
                <br />
                <span>Four places to improve.</span>
              </h2>
            </div>
            <div>
              <p>
                The Aurex Revenue Capture System gives every part of the
                customer journey a purpose.
              </p>
              <Link className="l-text-link" href="/revenue-capture-system">
                Explore the framework <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
          <div className="l-method-grid">
            {stages.map((s, i) => (
              <article key={s.name}>
                <span className="l-method-index">0{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <Link className="l-text-link" href={`/resources/${s.resource}`}>
                  Put it into practice <ArrowUpRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="l-section l-wrap l-perspective">
        <div className="l-perspective-mark">
          <Image src="/brand/aurex-mark.png" alt="" width={75} height={75} />
          <span>
            AUREX
            <br />
            BUSINESS LABS
          </span>
        </div>
        <div>
          <p className="l-eyebrow">Our point of view</p>
          <h2>
            Better questions.
            <br />
            <span>Better decisions.</span>
          </h2>
          <p>
            Which inquiries turned into conversations? Which estimates need
            attention? What happened after the work was done?
          </p>
          <p>
            We built this library around the questions that connect marketing to
            the day-to-day work of running a contracting business. Clear
            definitions. Useful processes. Evidence you can follow.
          </p>
          <Link className="l-text-link" href="/about">
            Get to know Aurex <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="l-section l-wrap">
        <div className="l-section-head">
          <div>
            <p className="l-eyebrow">04 / From the notebook</p>
            <h2>
              A little more
              <br />
              <span>understanding.</span>
            </h2>
          </div>
          <Link className="l-text-link" href="/insights">
            All insights <ArrowRight size={17} />
          </Link>
        </div>
        <GuideList />
      </section>
    </Shell>
  );
}
