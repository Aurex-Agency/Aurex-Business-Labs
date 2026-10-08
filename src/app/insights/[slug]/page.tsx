import { notFound } from "next/navigation";
import Link from "next/link";
import { articles } from "@/content/articles";
import { site } from "@/lib/site-config";
import { pageMeta, organization } from "@/lib/seo";
import {
  Shell,
  PageHero,
  AuthorBlock,
  List,
  FinalCTA,
  Schema,
} from "@/components/authority/shared";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) return {};
  return pageMeta(a.title, a.summary, `/insights/${a.slug}`);
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <Shell>
      <Schema
        data={{
          "@type": "BlogPosting",
          headline: a.title,
          description: a.summary,
          datePublished: a.publishedAt,
          dateModified: a.updatedAt,
          author: organization,
          publisher: organization,
          mainEntityOfPage: `${site.url}/insights/${a.slug}`,
          image: `${site.url}/opengraph-image`,
        }}
      />
      <PageHero
        eyebrow="Contractor Insights"
        path={`/insights/${a.slug}`}
        title={a.title}
        description={a.summary}
      >
        <AuthorBlock publishedAt={a.publishedAt} updatedAt={a.updatedAt} />
      </PageHero>
      <article className="a-section a-light">
        <div className="a-wrap a-article-layout">
          <aside>
            <p className="a-label">In this guide</p>
            <nav aria-label="Article contents">
              {a.sections.map((s, i) => (
                <a key={s.heading} href={`#section-${i}`}>
                  {s.heading}
                </a>
              ))}
            </nav>
          </aside>
          <div className="a-reading">
            {a.sections.map((s, i) => (
              <section key={s.heading} id={`section-${i}`}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.list && <List items={s.list} />}
              </section>
            ))}
            <p>
              Continue with the{" "}
              <Link className="a-inline" href="/approach">
                Aurex Business Labs approach
              </Link>{" "}
              or read our{" "}
              <Link className="a-inline" href="/results/methodology">
                results methodology
              </Link>
              .
            </p>
            <h2>Related guides</h2>
            <ul>
              {articles
                .filter((b) => b.slug !== a.slug)
                .map((b) => (
                  <li key={b.slug}>
                    <Link className="a-inline" href={`/insights/${b.slug}`}>
                      {b.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </article>
      <FinalCTA />
    </Shell>
  );
}
