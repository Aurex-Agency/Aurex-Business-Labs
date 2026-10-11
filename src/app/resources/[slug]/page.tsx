import { notFound } from "next/navigation";
import Link from "next/link";
import { resources } from "@/content/resources";
import { Shell, Breadcrumbs, Schema } from "@/components/authority/shared";
import { ResourceArt } from "@/components/learn/graphics";
import {
  DownloadResource,
  PrintResource,
  Scorecard,
  Checklist,
} from "@/components/learn/tools";
import { ResourceCard } from "@/components/learn/shared";
import { pageMeta, organization } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = resources.find((r) => r.slug === slug);
  return r ? pageMeta(r.title, r.description, `/resources/${slug}`) : {};
}
export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = resources.find((r) => r.slug === slug);
  if (!r) notFound();
  return (
    <Shell>
      <Schema
        data={{
          "@type": "LearningResource",
          name: r.title,
          description: r.description,
          isAccessibleForFree: true,
          learningResourceType: r.format,
          author: organization,
        }}
      />
      <div className="l-wrap">
        <Breadcrumbs
          items={[
            { name: "Free resources", path: "/resources" },
            { name: r.title, path: `/resources/${r.slug}` },
          ]}
        />
        <header className="l-resource-hero">
          <div>
            <p className="l-eyebrow">{r.format}</p>
            <h1>{r.title}</h1>
            <p>{r.description}</p>
            <div className="l-actions">
              <DownloadResource
                href={r.download}
                label={r.downloadLabel}
                slug={r.slug}
              />
              <PrintResource />
            </div>
            <p className="l-small">Free to use. No registration required.</p>
          </div>
          <ResourceArt kind={r.visual} />
        </header>
        <div className="l-resource-body">
          <aside>
            <p className="l-eyebrow">In this resource</p>
            <nav aria-label="Resource contents">
              {r.steps.map((s, i) => (
                <a key={s.title} href={`#step-${i}`}>
                  {s.title}
                </a>
              ))}
              {r.visual === "scorecard" && (
                <a href="#scorecard">Use the scorecard</a>
              )}
            </nav>
            <Link className="l-text-link" href={`/insights/${r.article}`}>
              Read the related guide ↗
            </Link>
          </aside>
          <article className="l-reading">
            {r.visual === "checklist" ? (
              <>
                <h2>Review the handoffs with your team.</h2>
                <Checklist items={r.steps} />
              </>
            ) : (
              r.steps.map((s, i) => (
                <section id={`step-${i}`} key={s.title}>
                  <p className="l-eyebrow">Step 0{i + 1}</p>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                  {"script" in s && s.script && (
                    <blockquote>
                      <span className="l-eyebrow">
                        Example message to adapt
                      </span>
                      <p>{s.script}</p>
                    </blockquote>
                  )}
                </section>
              ))
            )}
            {r.visual === "recover" && (
              <p className="l-resource-note">
                Adapt these examples to the homeowner’s request and agreed
                contact preferences. This is an illustrative sequence, not a
                fixed contact schedule. Honor requests to stop.
              </p>
            )}
            {r.visual === "scorecard" && <Scorecard />}
            <Link className="l-text-link" href="/revenue-capture-system">
              See how this fits the Revenue Capture System ↗
            </Link>
          </article>
        </div>
        <section className="l-section">
          <p className="l-eyebrow">Keep exploring</p>
          <h2>Another useful next step.</h2>
          <div className="l-resource-grid l-two-cards">
            {resources
              .filter((v) => v.slug !== r.slug)
              .map((v) => (
                <ResourceCard key={v.slug} resource={v} />
              ))}
          </div>
        </section>
      </div>
    </Shell>
  );
}
