import { roofingProof, publishableProof } from "@/lib/proof";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/content/articles";
import { site } from "@/lib/site-config";
import { breadcrumbs } from "@/lib/seo";
import { nav } from "@/content/navigation";
import { ContactLink, Navigation, VideoTestimonial } from "./interactions";
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
      <ReadingProgress />
    </header>
  );
}
export function Footer() {
  return (
    <footer className="l-footer">
      <div className="l-wrap">
        <div className="l-footer-main">
          <div>
            <Brand />
            <p>
              Useful thinking for the business
              <br />
              behind the good work.
            </p>
          </div>
          <nav aria-label="Footer resources">
            <span className="l-eyebrow">Keep learning</span>
            {nav.slice(0, 3).map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <Link href="/revenue-capture-system">The framework</Link>
          </nav>
          <nav aria-label="Footer company">
            <span className="l-eyebrow">Aurex Business Labs</span>
            <Link href="/about">Our point of view</Link>
            <Link href="/results/methodology">How we measure</Link>
            <Link href="/results">Results</Link>
            <Link href="/work">Selected work</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="l-footer-contact">
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
    <div className="authority lab">
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
          className="a-inline"
          href={
            approved
              ? "/results/roofing-revenue-system"
              : "/results/methodology"
          }
        >
          {approved
            ? "Explore the roofing case study"
            : "Read the evidence standard"}{" "}
          <span aria-hidden="true">↗</span>
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
