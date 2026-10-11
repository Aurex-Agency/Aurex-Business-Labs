import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { work } from "@/content/work";
import { pageMeta } from "@/lib/seo";
import {
  Shell,
  PageHero,
  Section,
  FinalCTA,
} from "@/components/authority/shared";
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
        title={p.name}
        description={p.summary}
      >
        <div className="s-project-facts">
          <span>{p.category}</span>
          {p.focus.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      </PageHero>
      <section
        className="s-work-detail"
        aria-label={`${p.name} design presentation`}
        style={{ background: p.accent }}
      >
        <Image
          src={p.image}
          width={1440}
          height={1000}
          alt={`${p.name} website screenshot`}
          priority
          sizes="(max-width: 800px) 100vw, 1200px"
        />
      </section>
      <Section title="A closer look.">
        <div className="s-project-summary">
          <p className="s-kicker">The digital experience</p>
          <div>
            <p>{p.detail}</p>
            {p.url && (
              <a
                className="s-text-link"
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit the website <span aria-hidden="true">↗</span>
              </a>
            )}
            <p className="a-small" style={{ marginTop: 24 }}>
              Portfolio images represent a captured design. Live websites may
              change over time.
            </p>
          </div>
        </div>
      </Section>
      <Section eyebrow="Keep exploring" title={next.name}>
        <Link className="s-text-link" href={`/work/${next.slug}`}>
          Next project <span aria-hidden="true">↗</span>
        </Link>
      </Section>
      <FinalCTA />
    </Shell>
  );
}
