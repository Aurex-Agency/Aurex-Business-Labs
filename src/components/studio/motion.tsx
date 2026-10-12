"use client";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { work, type Project } from "@/content/work";
import { useMotionPreference } from "@/components/learn/use-motion-preference";

// Each screenshot drifts gently against the scroll inside its color field.
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduce = useMotionPreference();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  return (
    <article ref={ref} className="l-project">
      <Link href={`/work/${project.slug}`} className="l-project-link">
        <div
          className="l-project-media"
          data-tilt
          style={{ "--accent-tone": project.accent } as React.CSSProperties}
        >
          <span className="l-project-id">0{index + 1} / Selected work</span>
          <m.div className="l-project-canvas" style={{ y: reduce ? 0 : y }}>
            <Image
              src={project.image}
              alt={`${project.name} website design`}
              width={1440}
              height={1000}
              sizes="(max-width: 760px) 100vw, 50vw"
              priority={index === 0}
            />
          </m.div>
          <span className="l-project-view" aria-hidden="true">
            Explore project <ArrowUpRight size={15} />
          </span>
        </div>
        <div className="l-project-info">
          <h3>{project.name}</h3>
          <span>{project.category}</span>
        </div>
        <p>{project.summary}</p>
      </Link>
    </article>
  );
}
export function WorkGrid({ limit = 4 }: { limit?: number }) {
  return (
    <div className="l-work-grid">
      {work.slice(0, limit).map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
