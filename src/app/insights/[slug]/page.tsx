import { ResourceArt } from "@/components/learn/graphics";
import { resources } from "@/content/resources";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
import { TableOfContents } from "@/components/learn/toc";
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
  const metadata = pageMeta(a.title, a.summary, `/insights/${a.slug}`);
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article" as const,
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  const resource = resources.find((r) => r.article === a.slug) || resources[0];
  return (
    <Shell>
      <Schema
        data={{
          "@type": "BlogPosting",
          "@id": `${site.url}/insights/${a.slug}#article`,
          url: `${site.url}/insights/${a.slug}`,
          inLanguage: "en-US",
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
        eyebrow="Contractor insights"
        path={`/insights/${a.slug}`}
        crumbs={[
          { name: "Insights", path: "/insights" },
          { name: a.title, path: `/insights/${a.slug}` },
        ]}
        title={a.title}
        description={a.summary}
        aside={
          <figure className="l-art-frame l-article-art">
            <ResourceArt kind={resource.visual} animate />
            <figcaption>Field notes / {a.category}</figcaption>
          </figure>
        }
      >
        <AuthorBlock publishedAt={a.publishedAt} updatedAt={a.updatedAt} />
      </PageHero>
      <article className="l-section is-paper l-sheet">
        <div className="l-wrap l-article-layout">
          <aside>
            <TableOfContents
              title="In this guide"
              label="Article contents"
              items={a.sections.map((s, i) => ({
                id: `section-${i}`,
                text: s.heading,
              }))}
            />
          </aside>
          <div className="l-prose">
            {a.sections.map((s, i) => (
              <section key={s.heading} id={`section-${i}`}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.list && <List items={s.list} />}
              </section>
            ))}
            <p className="l-continue">
              Continue with the{" "}
              <Link className="l-inline" href="/revenue-capture-system">
                Aurex Revenue Capture System
              </Link>{" "}
              or read our{" "}
              <Link className="l-inline" href="/results/methodology">
                results methodology
              </Link>
              .
            </p>
            <div className="l-related-resource">
              <p className="l-eyebrow">Put it into practice</p>
              <h2>{resource.title}</h2>
              <p>{resource.description}</p>
              <Link
                className="l-button is-dark"
                href={`/resources/${resource.slug}`}
              >
                Open the free resource <ArrowUpRight size={16} />
              </Link>
            </div>
            <section className="l-related-guides">
              <h2>Related guides</h2>
              <ul>
                {articles
                  .filter((b) => b.slug !== a.slug)
                  .map((b) => (
                    <li key={b.slug}>
                      <Link href={`/insights/${b.slug}`}>
                        <span>{b.title}</span>
                        <ArrowUpRight size={17} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
      <FinalCTA />
    </Shell>
  );
}
