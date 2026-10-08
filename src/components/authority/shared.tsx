import type { Article } from "@/content/articles";
import { nav } from "@/content/navigation";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { publishableProof, roofingProof } from "@/lib/proof";
import { breadcrumbs } from "@/lib/seo";
import { phases, timeline, goodFit, poorFit } from "@/content/offer";
import { faqs } from "@/content/faq";
import {
  Action,
  ContactLink,
  EventView,
  Navigation,
  VideoTestimonial,
} from "./interactions";
export function Schema({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": Array.isArray(data) ? data : [data],
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function Brand() {
  return (
    <Link className="a-brand" href="/" aria-label="Aurex Business Labs home">
      <Image src="/brand/aurex-mark.png" alt="" width={44} height={44} />
      <span>
        AUREX <small>BUSINESS LABS</small>
      </span>
    </Link>
  );
}
export function Header() {
  return (
    <header className="a-header">
      <div className="a-wrap a-header-inner">
        <Brand />
        <Navigation />
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="a-footer">
      <div className="a-wrap">
        <div className="a-footer-grid">
          <div>
            <Brand />
            <p>{site.shortDescription}</p>
            <span className="a-label">
              CAPTURE / CONVERT / RECOVER / COMPOUND
            </span>
          </div>
          <nav aria-label="Footer navigation">
            {[
              ...nav,
              ["Apply", "/apply"],
              [
                "Contractor Revenue Scorecard Live",
                "/contractor-revenue-scorecard",
              ],
            ].map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div>
            {site.email && (
              <ContactLink href={`mailto:${site.email}`} event="email_click">
                {site.email}
              </ContactLink>
            )}
            {site.phone && (
              <ContactLink href={`tel:${site.phone}`} event="phone_click">
                {site.phone}
              </ContactLink>
            )}
            {site.socialProfiles.map((url) => (
              <a key={url} href={url} rel="noopener noreferrer">
                {new URL(url).hostname.replace("www.", "")}
              </a>
            ))}
          </div>
        </div>
        <div className="a-footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.brandName}
          </p>
          <nav aria-label="Legal">
            {[
              ["Privacy", "/privacy"],
              ["Terms", "/terms"],
              ["Results disclaimer", "/results-disclaimer"],
            ].map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="authority">
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <>
      <nav className="a-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        {items.map((i, n) => (
          <span key={i.path}>
            <span aria-hidden="true">/</span>
            {n === items.length - 1 ? (
              <span aria-current="page">{i.name}</span>
            ) : (
              <Link href={i.path}>{i.name}</Link>
            )}
          </span>
        ))}
      </nav>
      <Schema data={breadcrumbs(items)} />
    </>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  path,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  path: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="a-wrap a-page-hero">
      <Breadcrumbs items={[{ name: eyebrow, path }]} />
      <p className="a-label">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="a-deck">{description}</p>
      {children}
    </section>
  );
}
export function Section({
  eyebrow,
  title,
  children,
  light = false,
  id,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  light?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`a-section${light ? " a-light" : ""}`}>
      <div className="a-wrap">
        {eyebrow && <p className="a-label">{eyebrow}</p>}
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}
export function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="a-list">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}
export function Process() {
  return (
    <ol className="a-process" aria-label="Customer journey">
      {[
        "Attention",
        "Inquiry",
        "Appointment",
        "Estimate",
        "Sale",
        "Review",
        "Referral",
        "Repeat",
      ].map((s, i) => (
        <li key={s}>
          <span>{String(i + 1).padStart(2, "0")}</span>
          {s}
        </li>
      ))}
    </ol>
  );
}
export function Phases() {
  return (
    <div className="a-four">
      {phases.map((phase, i) => (
        <article key={phase.name} className="a-phase">
          <span className="a-number">0{i + 1}</span>
          <h3>{phase.name}</h3>
          <p>{phase.text}</p>
        </article>
      ))}
    </div>
  );
}
export function Timeline() {
  return (
    <ol className="a-timeline">
      {timeline.map((t) => (
        <li key={t.name}>
          <span className="a-label">{t.days}</span>
          <h3>{t.name}</h3>
          <p>{t.text}</p>
        </li>
      ))}
    </ol>
  );
}
export function Fit() {
  return (
    <div className="a-two">
      <article className="a-card">
        <h3>A strong fit</h3>
        <List items={goodFit} />
      </article>
      <article className="a-card">
        <h3>When we are not the right partner</h3>
        <List items={poorFit} />
      </article>
    </div>
  );
}
const dollars = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
export function Pricing() {
  return (
    <div className="a-pricing">
      <EventView event="pricing_view" />
      <div>
        <p className="a-price">
          {dollars(site.pricing.total)}
          <span>over {site.pricing.durationDays} days</span>
        </p>
        <p>
          {dollars(site.pricing.implementation)} for implementation, followed by
          three monthly payments of {dollars(site.pricing.monthly)} on days{" "}
          {site.pricing.paymentDays.join(", ")}.
        </p>
        <Action href="/apply">Request a Revenue Leakage Audit</Action>
      </div>
      <div>
        <List
          items={[
            "Advertising spend is separate.",
            "Specified third-party software and usage costs are separate.",
            "Base scope covers one location, one priority offer, one primary acquisition platform, one primary funnel, and one GHL pipeline.",
            `Continued Aurex Growth Operations begin at ${dollars(site.pricing.monthly)} per month after the initial engagement under the applicable renewal agreement.`,
          ]}
        />
      </div>
    </div>
  );
}
export function ResultsDisclaimer() {
  return (
    <p className="a-disclaimer">
      Results vary. Past performance does not guarantee future results. Tracked
      revenue does not establish sole causation.{" "}
      <Link className="a-inline" href="/results-disclaimer">
        Read the results disclaimer
      </Link>
      .
    </p>
  );
}
export function ProofCard() {
  const approved = publishableProof(roofingProof);
  return (
    <article className="a-proof">
      <div>
        <p className="a-label">Roofing / North Mississippi</p>
        <h3>
          {approved
            ? `$${roofingProof.results[0].amount.toLocaleString("en-US")} in ${roofingProof.resultType}`
            : "A clearer path from lead to revenue"}
        </h3>
        <p>
          {approved
            ? roofingProof.results[0].label
            : "See how Aurex built a lead-to-revenue system for a North Mississippi roofing company."}
        </p>
        {approved && (
          <>
            <p>{roofingProof.problem}</p>
            <List items={roofingProof.workPerformed} />
            <p>
              {roofingProof.dateRange?.label} · Attribution:{" "}
              {roofingProof.attributionStatus}
            </p>
          </>
        )}
        <Link className="a-inline" href="/results/roofing-revenue-system">
          Explore the roofing case study <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="a-proof-note">
        <span className="a-label">Our evidence standard</span>
        <p>
          We separate verified results, influenced results, and estimates. We do
          not present raw leads as sold-job revenue.
        </p>
        <Link className="a-inline" href="/results/methodology">
          How we measure results ↗
        </Link>
      </div>
    </article>
  );
}
export function ProofMedia() {
  return (
    <>
      {site.proofRecords.filter(publishableProof).flatMap((p) =>
        p.screenshots.slice(0, 2).map((s) => (
          <figure className="a-card" key={s.src}>
            <Image
              src={s.src}
              alt={s.alt}
              width={1200}
              height={750}
              className="a-responsive"
            />
            <figcaption>{s.caption}</figcaption>
          </figure>
        )),
      )}
      {site.proofRecords
        .filter((p) => publishableProof(p) && p.testimonialUrl && p.video)
        .slice(0, 3)
        .map((p) => (
          <VideoTestimonial
            key={p.id}
            url={p.testimonialUrl!}
            title={p.video!.title}
            summary={p.video!.summary}
            poster={p.video!.thumbnail}
            transcript={p.video!.transcript}
          />
        ))}
    </>
  );
}
export function FAQ({
  items = faqs,
}: {
  items?: readonly (readonly [string, string])[];
}) {
  return (
    <>
      <div className="a-faq">
        {items.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
      <Schema
        data={{
          "@type": "FAQPage",
          mainEntity: items.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }}
      />
    </>
  );
}
export function FinalCTA() {
  return (
    <Section
      eyebrow="Your next step"
      title="Find the Revenue Your Current Process Is Leaving Behind"
    >
      <div className="a-final">
        <p>
          Request a Revenue Leakage Audit to map your current process, calculate
          what the investment would need to produce, and identify the three
          improvements most worth fixing first.
        </p>
        <Action href="/apply">Request My Revenue Leakage Audit</Action>
        {site.capacityLimit > 0 && (
          <p className="a-small">
            Aurex accepts no more than {site.capacityLimit} new implementation
            starts per month.
          </p>
        )}
      </div>
    </Section>
  );
}
export function AuthorBlock({
  publishedAt,
  updatedAt,
}: {
  publishedAt: string;
  updatedAt: string;
}) {
  return (
    <div className="a-byline">
      <Link href="/about">By {site.brandName}</Link>
      <span>
        Published <time dateTime={publishedAt}>{publishedAt}</time>
      </span>
      <span>
        Updated <time dateTime={updatedAt}>{updatedAt}</time>
      </span>
    </div>
  );
}

export function ArticleCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  return (
    <article className="a-card a-article-card">
      <p className="a-label">
        0{index + 1} / {article.category}
      </p>
      <h3>
        <Link href={`/insights/${article.slug}`}>{article.title}</Link>
      </h3>
      <p>{article.summary}</p>
      <p className="a-small">
        {article.publishedAt} · {site.brandName}
      </p>
      <Link className="a-inline" href={`/insights/${article.slug}`}>
        Read the guide ↗
      </Link>
    </article>
  );
}
