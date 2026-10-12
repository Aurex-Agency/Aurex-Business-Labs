"use client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

// Contents for long resources and guides. The section being read is marked
// with aria-current, and phones get a compact disclosure instead of a list.
export function TableOfContents({
  title,
  label,
  items,
  children,
}: {
  title: string;
  label: string;
  items: { id: string; text: string }[];
  children?: React.ReactNode;
}) {
  const [active, setActive] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => !!node);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);
  const index = Math.max(
    0,
    items.findIndex((item) => item.id === active),
  );
  const links = items.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      aria-current={item.id === active ? "location" : undefined}
      onClick={() => setOpen(false)}
    >
      {item.text}
    </a>
  ));
  return (
    <>
      <div className="l-toc">
        <p className="l-eyebrow is-muted">{title}</p>
        <nav
          aria-label={label}
          style={
            { "--progress": (index + 1) / items.length } as React.CSSProperties
          }
        >
          {links}
        </nav>
        {children}
      </div>
      <details
        className="l-toc-mobile"
        open={open}
        onToggle={(e) => setOpen(e.currentTarget.open)}
      >
        <summary>
          <span>
            <span className="l-eyebrow is-muted">{title}</span>
            <strong>{items[index]?.text}</strong>
          </span>
          <ChevronDown size={18} aria-hidden="true" />
        </summary>
        <nav aria-label={label}>{links}</nav>
        {children}
      </details>
    </>
  );
}
