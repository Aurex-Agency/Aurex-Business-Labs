import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { site } from "@/lib/site-config";
import { TableOfContents } from "@/components/learn/toc";
import { Shell, PageHero } from "./shared";

export type LegalSection = {
  id: string;
  title: string;
  body: React.ReactNode;
};

// The legal entity name when configured, otherwise the brand.
export const companyName = site.legalName || site.brandName;

// Shared layout for the privacy policy and terms of service: a plain summary,
// a contents list that tracks the reader, numbered sections and a contact card.
export function LegalPage({
  title,
  accent,
  path,
  description,
  updated,
  summary,
  sections,
  related,
}: {
  title: string;
  accent: string;
  path: string;
  description: string;
  updated: string;
  summary: { title: string; text: string }[];
  sections: LegalSection[];
  related: { label: string; href: string }[];
}) {
  return (
    <Shell>
      <PageHero
        eyebrow="Legal"
        path={path}
        crumbs={[{ name: title, path }]}
        title={
          <>
            {title.replace(accent, "").trim()} <em>{accent}</em>
          </>
        }
        description={description}
      >
        <p className="l-legal-updated">
          Last updated{" "}
          <time dateTime={new Date(updated).toISOString().slice(0, 10)}>
            {updated}
          </time>
        </p>
      </PageHero>
      <section className="l-legal-summary" aria-labelledby="summary-title">
        <div className="l-wrap">
          <h2 id="summary-title" className="l-eyebrow">
            The short version
          </h2>
          <div className="l-grid-3" data-stagger>
            {summary.map((item, i) => (
              <article className="l-card" key={item.title} data-tilt>
                <span className="l-index">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className="l-small l-legal-note">
            The summary is for convenience. The full text below is what applies.
          </p>
        </div>
      </section>
      <article className="l-section is-paper l-sheet">
        <div className="l-wrap l-article-layout">
          <aside>
            <TableOfContents
              title="Contents"
              label={`${title} contents`}
              items={sections.map((s, i) => ({
                id: s.id,
                text: `${i + 1}. ${s.title}`,
              }))}
            />
          </aside>
          <div className="l-prose l-legal">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id}>
                <h2>
                  <span className="l-legal-number">{i + 1}.</span> {s.title}
                </h2>
                {s.body}
              </section>
            ))}
            <ContactCard />
            <nav className="l-legal-related" aria-label="Related policies">
              {related.map((r) => (
                <Link key={r.href} href={r.href}>
                  {r.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </article>
    </Shell>
  );
}

// Contact details come from site configuration. Anything not configured is
// left out, and the contact form is always available.
export function ContactCard() {
  return (
    <div className="l-legal-contact">
      <p className="l-eyebrow">Questions or requests</p>
      <h3>{companyName}</h3>
      <ul>
        {site.email && (
          <li>
            <Mail size={17} aria-hidden="true" />
            <a className="l-inline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
        )}
        {site.phone && (
          <li>
            <Phone size={17} aria-hidden="true" />
            <a className="l-inline" href={`tel:${site.phone}`}>
              {site.phone}
            </a>
          </li>
        )}
        {site.address && (
          <li>
            <MapPin size={17} aria-hidden="true" />
            <span>{site.address}</span>
          </li>
        )}
        <li>
          <MessageSquare size={17} aria-hidden="true" />
          <Link className="l-inline" href="/contact">
            Send a message through our contact form
          </Link>
        </li>
      </ul>
    </div>
  );
}

// The preferred way to reach us, written into sentences.
export function contactMethod() {
  return site.email ? (
    <>
      email{" "}
      <a className="l-inline" href={`mailto:${site.email}`}>
        {site.email}
      </a>{" "}
      or use our{" "}
      <Link className="l-inline" href="/contact">
        contact form
      </Link>
    </>
  ) : (
    <>
      use our{" "}
      <Link className="l-inline" href="/contact">
        contact form
      </Link>
    </>
  );
}
