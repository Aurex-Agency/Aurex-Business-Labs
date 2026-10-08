import { roofingProof, publishableProof } from "@/lib/proof";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/content/articles";
import { site } from "@/lib/site-config";
import { breadcrumbs } from "@/lib/seo";
import { nav } from "@/content/navigation";
import {
  Action,
  ContactLink,
  Navigation,
  VideoTestimonial,
} from "./interactions";
import { ScrollProgress } from "@/components/studio/motion";
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
      <div className="a-header-inner">
        <Brand />
        <Navigation />
      </div>
      <ScrollProgress />
    </header>
  );
}
export function Footer() {
  return (
    <footer className="s-footer">
      <div className="s-footer-top">
        <Brand />
        <p>
          Customer acquisition.
          <br />
          Lead-to-sale systems.
          <br />
          Recovered and repeat revenue.
        </p>
        <nav aria-label="Footer navigation">
          {[...nav, ["Contact", "/contact"]].map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="s-footer-contact">
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
            <a href={url} key={url}>
              {new URL(url).hostname.replace("www.", "")}
            </a>
          ))}
        </div>
      </div>
      <div className="s-footer-word" aria-hidden="true">
        AUREX<span>↗</span>
      </div>
      <div className="s-footer-bottom">
        <p>© {new Date().getFullYear()} Aurex Business Labs</p>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/results-disclaimer">Results disclaimer</Link>
        </nav>
        <a href="#main">Back to top ↑</a>
      </div>
    </footer>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="authority studio">
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
        {items.map((item, i) => (
          <span key={item.path}>
            <span aria-hidden="true">/</span>
            {i === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.path}>{item.name}</Link>
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
      <div className="s-page-description">
        <span aria-hidden="true">↘</span>
        <p className="a-deck">{description}</p>
      </div>
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
        {title && <h2>{title}</h2>}
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
export function ResultsDisclaimer() {
  return (
    <p className="a-disclaimer">
      Past performance does not guarantee future results.{" "}
      <Link className="a-inline" href="/results-disclaimer">
        Read the results disclaimer
      </Link>
      .
    </p>
  );
}
export function FAQ({
  items,
}: {
  items: readonly (readonly [string, string])[];
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
    <section className="s-contact-band">
      <div>
        <p className="s-kicker">Where are opportunities going cold?</p>
        <p className="s-contact-note">
          Find the gaps from first lead to sold job.
          <br />
          Request a Revenue Leakage Audit.
        </p>
      </div>
      <Action href="/apply" event="audit_cta_click">
        Find the gaps.
      </Action>
    </section>
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
