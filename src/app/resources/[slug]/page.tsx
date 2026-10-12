import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { resources } from "@/content/resources";
import { Shell, Breadcrumbs, Schema } from "@/components/authority/shared";
import { ResourceArt } from "@/components/learn/graphics";
import {
  CopyScript,
  DownloadResource,
  PrintResource,
  Scorecard,
  Checklist,
} from "@/components/learn/tools";
import { ResourceGrid } from "@/components/learn/shared";
import { TableOfContents } from "@/components/learn/toc";
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
  const contents = [
    ...r.steps.map((s, i) => ({ id: `step-${i}`, text: s.title })),
    ...(r.visual === "scorecard"
      ? [{ id: "scorecard", text: "Use the scorecard" }]
      : []),
  ];
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
      <section className="l-page-hero">
        <div className="l-wrap">
          <Breadcrumbs
            items={[
              { name: "Free resources", path: "/resources" },
              { name: r.title, path: `/resources/${r.slug}` },
            ]}
          />
          <div className="l-page-hero-split l-resource-hero">
            <div>
              <p className="l-eyebrow">
                <span className="l-dot" aria-hidden="true" />
                {r.format}
              </p>
              <h1>{r.title}</h1>
              <p className="l-lead">{r.description}</p>
              <div className="l-hero-extra">
                <div className="l-actions">
                  <DownloadResource
                    href={r.download}
                    label={r.downloadLabel}
                    slug={r.slug}
                  />
                  <PrintResource />
                </div>
                <p className="l-small l-free-note">
                  Free to use. No registration required.
                </p>
              </div>
            </div>
            <div className="l-hero-extra">
              <div className="l-art-frame">
                <ResourceArt kind={r.visual} animate />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="l-wrap l-resource-body">
        <aside>
          <TableOfContents
            title="In this resource"
            label="Resource contents"
            items={contents}
          >
            <Link className="l-text-link" href={`/insights/${r.article}`}>
              Read the related guide <ArrowUpRight size={16} />
            </Link>
          </TableOfContents>
        </aside>
        <article className="l-reading">
          {r.visual === "checklist" ? (
            <>
              <h2 className="l-reading-title">
                Review the handoffs with your team.
              </h2>
              <Checklist items={r.steps} />
            </>
          ) : (
            r.steps.map((s, i) => (
              <section id={`step-${i}`} key={s.title} data-reveal>
                <p className="l-step-label">Step 0{i + 1}</p>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
                {"script" in s && s.script && (
                  <blockquote className="l-script">
                    <div className="l-script-head">
                      <span className="l-eyebrow">
                        Example message to adapt
                      </span>
                      <CopyScript text={s.script} />
                    </div>
                    <p>{s.script}</p>
                  </blockquote>
                )}
              </section>
            ))
          )}
          {r.visual === "recover" && (
            <p className="l-resource-note">
              Adapt these examples to the homeowner’s request and agreed contact
              preferences. This is an illustrative sequence, not a fixed contact
              schedule. Honor requests to stop.
            </p>
          )}
          {r.visual === "scorecard" && <Scorecard />}
          <Link
            className="l-text-link l-fit-link"
            href="/revenue-capture-system"
          >
            See how this fits the Revenue Capture System{" "}
            <ArrowUpRight size={16} />
          </Link>
        </article>
      </div>
      <section className="l-section l-keep-exploring">
        <div className="l-wrap">
          <div className="l-section-head" data-reveal>
            <div>
              <p className="l-eyebrow">Keep exploring</p>
              <h2>
                Another <em>useful next step.</em>
              </h2>
            </div>
          </div>
          <ResourceGrid
            items={resources.filter((v) => v.slug !== r.slug)}
            layout="pair"
          />
        </div>
      </section>
    </Shell>
  );
}
