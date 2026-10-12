import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { work } from "@/content/work";
import { pageMeta } from "@/lib/seo";
import { Shell, PageHero, FinalCTA } from "@/components/authority/shared";
import { EventView } from "@/components/authority/interactions";
export function generateStaticParams() {
  return work.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = work.find((p) => p.slug === slug);
  return p ? pageMeta(p.name, p.summary, `/work/${p.slug}`) : {};
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = work.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const p = work[index];
  const next = work[(index + 1) % work.length];
  return (
    <Shell>
      <EventView event="project_view" />
      <PageHero
        eyebrow="Selected work"
        path={`/work/${p.slug}`}
        crumbs={[
          { name: "Selected work", path: "/work" },
          { name: p.name, path: `/work/${p.slug}` },
        ]}
        title={p.name}
        description={p.summary}
      >
        <div className="l-chips">
          <span>{p.category}</span>
          {p.focus.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      </PageHero>
      <section
        className="l-showcase"
        aria-label={`${p.name} design presentation`}
        style={{ "--accent-tone": p.accent } as React.CSSProperties}
      >
        <div className="l-wrap-wide">
          <div className="l-showcase-frame" data-reveal="scale">
            <Image
              src={p.image}
              width={1440}
              height={1000}
              alt={`${p.name} website screenshot`}
              priority
              sizes="(max-width: 800px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>
      <section className="l-section">
        <div className="l-wrap l-split" data-reveal>
          <div>
            <p className="l-eyebrow">The digital experience</p>
            <h2>
              A closer <em>look.</em>
            </h2>
          </div>
          <div>
            <p>{p.detail}</p>
            {p.url && (
              <div className="l-stack-links">
                <a
                  className="l-text-link"
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit the website <ArrowUpRight size={16} />
                </a>
              </div>
            )}
            <p className="l-small l-note">
              Portfolio images represent a captured design. Live websites may
              change over time.
            </p>
          </div>
        </div>
      </section>
      <section className="l-section l-next-project-section">
        <div className="l-wrap">
          <Link
            className="l-next-project"
            data-tilt
            href={`/work/${next.slug}`}
            style={{ "--accent-tone": next.accent } as React.CSSProperties}
            data-reveal
          >
            <span className="l-eyebrow is-muted">Keep exploring</span>
            <span className="l-next-project-name">{next.name}</span>
            <span className="l-next-project-cta">
              Next project
              <span className="l-card-arrow" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </span>
          </Link>
        </div>
      </section>
      <FinalCTA />
    </Shell>
  );
}
