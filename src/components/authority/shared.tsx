import { roofingProof, publishableProof } from "@/lib/proof";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/content/articles";
import { site } from "@/lib/site-config";
import { breadcrumbs } from "@/lib/seo";
import { nav } from "@/content/navigation";
import {
  ContactLink,
  HeaderFrame,
  Navigation,
  QuickBar,
  VideoTestimonial,
} from "./interactions";
import { LearningCTA } from "@/components/learn/shared";
import { ReadingProgress } from "@/components/learn/reading-progress";
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
    <Link className="l-brand" href="/" aria-label="Aurex Business Labs home">
      <Image
        src="/brand/aurex-mark.png"
        alt=""
        width={44}
        height={44}
        priority
      />
      <span className="l-brand-word">
        AUREX <small>BUSINESS LABS</small>
      </span>
    </Link>
  );
}
export function Header() {
  return (
    <HeaderFrame>
      <div className="l-header-inner l-wrap-wide">
        <Brand />
        <Navigation />
      </div>
      <ReadingProgress />
    </HeaderFrame>
  );
}
export function Footer() {
  return (
    <footer className="l-footer">
      <div className="l-wrap">
        <div className="l-footer-main">
          <div className="l-footer-brand">
            <Brand />
            <p>
              Useful thinking for the business <em>behind the good work.</em>
            </p>
          </div>
          <nav className="l-footer-col" aria-label="Footer resources">
            <span className="l-eyebrow">Keep learning</span>
            {nav.slice(0, 3).map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <Link href="/revenue-capture-system">The framework</Link>
          </nav>
          <nav className="l-footer-col" aria-label="Footer company">
            <span className="l-eyebrow">Aurex Business Labs</span>
            <Link href="/about">Our point of view</Link>
            <Link href="/results/methodology">How we measure</Link>
            <Link href="/results">Results</Link>
            <Link href="/work">Selected work</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="l-footer-col">
            <span className="l-eyebrow">Connect</span>
            <Link href="/apply">Work with Aurex ↗</Link>
            {site.email && (
              <ContactLink href={`mailto:${site.email}`} event="email_click">
                {site.email}
              </ContactLink>
            )}
            {site.socialProfiles.map((url) => (
              <a key={url} href={url}>
                {new URL(url).hostname.replace("www.", "")}
              </a>
            ))}
          </div>
        </div>
        <div className="l-footer-bottom">
          <p>© {new Date().getFullYear()} Aurex Business Labs</p>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/results-disclaimer">Results disclaimer</Link>
          </nav>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="l-site">
      <Header />
      <main id="main">
        <ViewTransition>{children}</ViewTransition>
      </main>
      <Footer />
      <QuickBar />
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
      <nav className="l-breadcrumbs" aria-label="Breadcrumb">
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
  crumbs,
  aside,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  path: string;
  crumbs?: { name: string; path: string }[];
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const copy = (
    <div>
      <p className="l-eyebrow">
        <span className="l-dot" aria-hidden="true" />
        {eyebrow}
      </p>
      <h1>{title}</h1>
      <p className="l-lead">{description}</p>
      {children && <div className="l-hero-extra">{children}</div>}
    </div>
  );
  return (
    <section className="l-page-hero">
      <div className="l-wrap">
        <Breadcrumbs items={crumbs ?? [{ name: eyebrow, path }]} />
        {aside ? (
          <div className="l-page-hero-split">
            {copy}
            <div className="l-hero-extra">{aside}</div>
          </div>
        ) : (
          copy
        )}
      </div>
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
    <section id={id} className={`l-section${light ? " is-paper l-sheet" : ""}`}>
      <div className="l-wrap" data-reveal>
        {eyebrow && <p className="l-eyebrow">{eyebrow}</p>}
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  );
}
export function List({
  items,
  columns = false,
}: {
  items: readonly string[];
  columns?: boolean;
}) {
  return (
    <ul className={`l-checklist${columns ? " is-columns" : ""}`}>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}
export function ResultsDisclaimer() {
  return (
    <p className="l-disclaimer">
      Past performance does not guarantee future results.{" "}
      <Link className="l-inline" href="/results-disclaimer">
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
      <div className="l-faq">
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
  return <LearningCTA />;
}
export function AuthorBlock({
  publishedAt,
  updatedAt,
}: {
  publishedAt: string;
  updatedAt: string;
}) {
  return (
    <div className="l-byline">
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
    <article className="l-card">
      <p className="l-eyebrow">
        0{index + 1} / {article.category}
      </p>
      <h3>
        <Link href={`/insights/${article.slug}`}>{article.title}</Link>
      </h3>
      <p>{article.summary}</p>
      <p className="l-small">
        {article.publishedAt} · {site.brandName}
      </p>
      <Link className="l-text-link" href={`/insights/${article.slug}`}>
        Read the guide <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}

export function ProofCard() {
  const approved = publishableProof(roofingProof);
  return (
    <article className="l-proof">
      <div>
        <p className="l-eyebrow">Roofing / North Mississippi</p>
        <h3>
          {approved
            ? `$${roofingProof.results[0].amount.toLocaleString("en-US")} in ${roofingProof.resultType}`
            : "A clearer path from lead to revenue"}
        </h3>
        <p>
          {approved
            ? roofingProof.results[0].label
            : "Our case study is awaiting verification and publication permission. Read our methodology to understand the evidence we require."}
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
        <Link
          className="l-text-link"
          href={
            approved
              ? "/results/roofing-revenue-system"
              : "/results/methodology"
          }
        >
          {approved
            ? "Explore the roofing case study"
            : "Read the evidence standard"}{" "}
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="l-proof-note">
        <span className="l-eyebrow">Our evidence standard</span>
        <p>
          We separate verified results, influenced results, and estimates. We do
          not present raw leads as sold-job revenue.
        </p>
        <Link className="l-text-link" href="/results/methodology">
          How we measure results <ArrowUpRight size={16} />
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
          <figure className="l-card l-figure" key={s.src}>
            <Image src={s.src} alt={s.alt} width={1200} height={750} />
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
