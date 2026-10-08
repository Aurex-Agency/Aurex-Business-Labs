"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { nav } from "@/content/navigation";
export function Navigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  function close() {
    dialog.current?.close();
    setOpen(false);
    button.current?.focus();
  }
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);
  return (
    <>
      <nav className="a-desktop" aria-label="Main navigation">
        {nav.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={path === href ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
        <Action href="/apply" event="audit_cta_click">
          Request an audit
        </Action>
      </nav>
      <button
        className="a-menu"
        ref={button}
        aria-expanded={open}
        aria-controls="studio-menu"
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        Menu <span aria-hidden="true">+</span>
      </button>
      <dialog
        ref={dialog}
        id="studio-menu"
        className="s-menu-dialog"
        aria-label="Site menu"
        onCancel={close}
        onClose={() => setOpen(false)}
      >
        <div className="s-menu-top">
          <span>AUREX BUSINESS LABS</span>
          <button onClick={close} aria-label="Close menu">
            Close ×
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {[...nav, ["Request an audit", "/apply"]].map(
            ([label, href], index) => (
              <Link key={href} href={href} onClick={close}>
                <span>0{index + 1}</span>
                {label}
                <span aria-hidden="true">↗</span>
              </Link>
            ),
          )}
        </nav>
        <p>Capture. Convert. Recover. Compound.</p>
      </dialog>
    </>
  );
}
export function Action({
  href,
  children,
  secondary = false,
  event = "contact_cta_click",
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
  event?: AnalyticsEvent;
}) {
  return (
    <Link
      href={href}
      className={secondary ? "a-button a-secondary" : "a-button"}
      onClick={() => track(event, { location: window.location.pathname })}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
export function EventView({ event }: { event: AnalyticsEvent }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track(event, { location: window.location.pathname });
          observer.disconnect();
        }
      },
      { threshold: 1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [event]);
  return <span ref={ref} aria-hidden="true" />;
}
export function DeferredEmbed({
  url,
  title,
  event = "calendar_open",
}: {
  url: string;
  title: string;
  event?: AnalyticsEvent;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="a-embed">
      <button
        className="a-button"
        onClick={() => {
          setOpen(true);
          track(event);
        }}
        disabled={open}
      >
        {open ? `${title} opened` : `Open ${title}`}
      </button>
      <p>
        <a
          className="a-inline"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(event)}
        >
          Open {title} in a new tab
        </a>
      </p>
      {open && (
        <iframe
          src={url}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
}
export function VideoTestimonial({
  url,
  title,
  summary,
  poster,
  transcript,
}: {
  url: string;
  title: string;
  summary: string;
  poster: string;
  transcript?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <figure className="a-card">
      <h3>{title}</h3>
      <p>{summary}</p>
      {open ? (
        <video
          controls
          playsInline
          preload="metadata"
          poster={poster}
          onPlay={() => track("testimonial_play")}
          aria-label={title}
        >
          <source src={url} />
        </video>
      ) : (
        <button className="a-button" onClick={() => setOpen(true)}>
          Load testimonial video
        </button>
      )}
      {transcript && (
        <details>
          <summary>Read transcript</summary>
          <p>{transcript}</p>
        </details>
      )}
      <a className="a-inline" href={url}>
        Open video
      </a>
    </figure>
  );
}
export function ContactLink({
  href,
  children,
  event,
}: {
  href: string;
  children: React.ReactNode;
  event: AnalyticsEvent;
}) {
  return (
    <a href={href} onClick={() => track(event)}>
      {children}
    </a>
  );
}
