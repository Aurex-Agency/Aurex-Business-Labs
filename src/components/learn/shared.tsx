import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { ResourceArt } from "./graphics";
import { resources, type Resource } from "@/content/resources";
import { articles } from "@/content/articles";
export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      className="l-resource-card"
      href={`/resources/${resource.slug}`}
      data-tilt
    >
      <div className="l-resource-media">
        <ResourceArt kind={resource.visual} animate />
      </div>
      <div className="l-resource-copy">
        <span className="l-eyebrow">{resource.format}</span>
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        <span className="l-card-link">
          Open resource
          <span className="l-card-arrow" aria-hidden="true">
            <ArrowUpRight size={16} />
          </span>
        </span>
      </div>
    </Link>
  );
}
export function ResourceGrid({
  items = resources,
  layout = "feature",
}: {
  items?: readonly Resource[];
  layout?: "feature" | "pair";
}) {
  return (
    <div className={`l-resource-grid is-${layout}`} data-stagger>
      {items.map((r) => (
        <ResourceCard key={r.slug} resource={r} />
      ))}
    </div>
  );
}
export function LearningCTA() {
  return (
    <section className="l-cta-section">
      <div className="l-wrap">
        <div className="l-cta" data-reveal="scale">
          <span className="l-cta-glow" aria-hidden="true" />
          <svg
            className="l-cta-mark"
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M24 96 96 24M40 24h56v56"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <p className="l-eyebrow">A useful next step</p>
            <h2>
              Take an idea <em>into your business.</em>
            </h2>
            <p>Start with a worksheet, a checklist, or a better question.</p>
          </div>
          <div className="l-cta-actions">
            <Link className="l-button is-dark" href="/resources">
              Find your next useful tool <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export function GuideList() {
  return (
    <div className="l-guides" data-stagger>
      {articles.map((a, i) => (
        <Link
          href={`/insights/${a.slug}`}
          key={a.slug}
          className={`l-guide${i === 0 ? " is-featured" : ""}`}
        >
          {i === 0 ? (
            <div className="l-guide-art" aria-hidden="true">
              <span>FOLLOW THE HANDOFFS</span>
              <div>
                {["Inquiry", "Conversation", "Estimate", "Sold job"].map(
                  (label, index) => (
                    <div key={label}>
                      <i style={{ width: `${100 - index * 18}%` }} />
                      <span>{label}</span>
                    </div>
                  ),
                )}
              </div>
              <small>A framework for asking better questions</small>
            </div>
          ) : (
            <span className="l-guide-number">0{i + 1}</span>
          )}
          <div className="l-guide-body">
            <span className="l-eyebrow">{a.category}</span>
            <h3>{a.title}</h3>
            <p>{a.summary}</p>
          </div>
          <span className="l-guide-arrow" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      ))}
    </div>
  );
}
