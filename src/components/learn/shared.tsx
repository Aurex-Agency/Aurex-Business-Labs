import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { ResourceArt } from "./graphics";
import { resources, type Resource } from "@/content/resources";
import { articles } from "@/content/articles";
export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link className="l-resource-card" href={`/resources/${resource.slug}`}>
      <ResourceArt kind={resource.visual} animate />
      <div className="l-resource-copy">
        <span className="l-eyebrow">{resource.format}</span>
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        <span className="l-card-link">
          Open resource <ArrowUpRight size={17} />
        </span>
      </div>
    </Link>
  );
}
export function ResourceGrid() {
  return (
    <div className="l-resource-grid f-resource-spread">
      {resources.map((r) => (
        <ResourceCard key={r.slug} resource={r} />
      ))}
    </div>
  );
}
export function LearningCTA() {
  return (
    <section className="l-next l-wrap">
      <div>
        <p className="l-eyebrow">A useful next step</p>
        <h2>Take an idea into your business.</h2>
        <p>Start with a worksheet, a checklist, or a better question.</p>
      </div>
      <Link className="l-button" href="/resources">
        Find your next useful tool <ArrowRight size={17} />
      </Link>
    </section>
  );
}
export function GuideList() {
  return (
    <div className="l-guide-list f-guide-spread">
      {articles.map((a, i) => (
        <Link href={`/insights/${a.slug}`} key={a.slug}>
          <span className="l-guide-number">0{i + 1}</span>
          {i === 0 && (
            <div className="f-guide-art" aria-hidden="true">
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
              <small>A framework for asking better questions ↗</small>
            </div>
          )}
          <div>
            <span className="l-eyebrow">{a.category}</span>
            <h3>{a.title}</h3>
            <p>{a.summary}</p>
          </div>
          <ArrowUpRight size={22} />
        </Link>
      ))}
    </div>
  );
}
