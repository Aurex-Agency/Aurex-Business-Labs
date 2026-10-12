"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { nav } from "@/content/navigation";
import { resources } from "@/content/resources";

// The header condenses once the page moves and steps aside while reading down.
export function HeaderFrame({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      header.toggleAttribute("data-scrolled", y > 8);
      if (Math.abs(y - last) < 8) return;
      const hide =
        y > last &&
        y > window.innerHeight * 0.7 &&
        !header.contains(document.activeElement);
      header.toggleAttribute("data-hidden", hide);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <header
      ref={ref}
      className="l-header"
      onFocusCapture={() => ref.current?.removeAttribute("data-hidden")}
    >
      {children}
    </header>
  );
}

export function Navigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const current = (href: string) =>
    path === href ? "page" : path.startsWith(`${href}/`) ? "true" : undefined;
  function close() {
    dialog.current?.close();
    setOpen(false);
    button.current?.focus();
  }
  function point(link: HTMLElement | null) {
    const marker = indicator.current;
    if (!marker) return;
    if (!link) {
      marker.style.opacity = "0";
      return;
    }
    if (marker.style.opacity !== "1") {
      marker.style.transition = "none";
      marker.style.width = `${link.offsetWidth}px`;
      marker.style.transform = `translateX(${link.offsetLeft}px)`;
      void marker.offsetWidth;
      marker.style.transition = "";
    }
    marker.style.width = `${link.offsetWidth}px`;
    marker.style.transform = `translateX(${link.offsetLeft}px)`;
    marker.style.opacity = "1";
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
      <nav className="l-nav" aria-label="Main navigation">
        <div className="l-nav-links" onMouseLeave={() => point(null)}>
          <span
            className="l-nav-indicator"
            ref={indicator}
            aria-hidden="true"
          />
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={current(href)}
              onMouseEnter={(e) => point(e.currentTarget)}
              onFocus={(e) => point(e.currentTarget)}
              onBlur={() => point(null)}
            >
              {label}
            </Link>
          ))}
        </div>
        <Link
          className="l-nav-cta"
          href="/apply"
          onClick={() => track("audit_cta_click", { location: "navigation" })}
        >
          Work with Aurex <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </nav>
      <button
        className="l-menu-button"
        ref={button}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        Menu
        <span className="l-menu-icon" aria-hidden="true">
          <i />
          <i />
        </span>
      </button>
      <dialog
        ref={dialog}
        id="site-menu"
        className="l-menu"
        aria-label="Site menu"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={() => setOpen(false)}
      >
        <div className="l-menu-inner">
          <div className="l-menu-top">
            <Link
              className="l-brand"
              href="/"
              onClick={close}
              aria-label="Aurex Business Labs home"
            >
              <Image
                src="/brand/aurex-mark.png"
                alt=""
                width={44}
                height={44}
              />
              <span className="l-brand-word">
                AUREX <small>BUSINESS LABS</small>
              </span>
            </Link>
            <button className="l-menu-close" onClick={close}>
              Close<span className="sr-only"> menu</span>
              <X aria-hidden="true" />
            </button>
          </div>
          <nav className="l-menu-nav" aria-label="Mobile navigation">
            {nav.map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                aria-current={current(href)}
              >
                <span>0{index + 1}</span>
                {label}
                <ArrowUpRight size={22} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <div className="l-menu-resources">
            <p className="l-eyebrow is-muted">Free resources</p>
            {resources.map((r) => (
              <Link key={r.slug} href={`/resources/${r.slug}`} onClick={close}>
                {r.title}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            ))}
          </div>
          <div className="l-menu-foot">
            <Link
              className="l-button is-block"
              href="/apply"
              onClick={() => {
                track("audit_cta_click", { location: "mobile_menu" });
                close();
              }}
            >
              Work with Aurex <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <p>Capture. Convert. Recover. Compound.</p>
          </div>
        </div>
      </dialog>
    </>
  );
}

// A compact thumb-reach bar on phones. It stays out of the way on form pages
// and near the footer, and is removed from the tab order while hidden.
export function QuickBar() {
  const path = usePathname();
  const [show, setShow] = useState(false);
  const skip = path === "/apply" || path === "/contact";
  useEffect(() => {
    if (skip) return;
    let footerInView = false;
    const update = () =>
      setShow(window.scrollY > window.innerHeight * 0.75 && !footerInView);
    const footer = document.querySelector(".l-footer");
    const observer = new IntersectionObserver(([entry]) => {
      footerInView = entry.isIntersecting;
      update();
    });
    if (footer) observer.observe(footer);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [skip]);
  if (skip) return null;
  const learning = path.startsWith("/resources");
  return (
    <nav
      className="l-quickbar"
      aria-label="Quick actions"
      data-show={show ? "" : undefined}
      inert={!show}
    >
      <Link className="l-button" href={learning ? "/start-here" : "/resources"}>
        {learning ? "Start here" : "Free resources"}
        <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
      <Link
        className="l-quickbar-link"
        href="/apply"
        onClick={() => track("audit_cta_click", { location: "quick_bar" })}
      >
        Work with Aurex
      </Link>
    </nav>
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
      className={secondary ? "l-button is-ghost" : "l-button"}
      onClick={() => track(event, { location: window.location.pathname })}
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
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
    <div className="l-embed">
      <button
        className="l-button"
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
          className="l-inline"
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
    <figure className="l-card">
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
        <button className="l-button" onClick={() => setOpen(true)}>
          Load testimonial video
        </button>
      )}
      {transcript && (
        <details>
          <summary>Read transcript</summary>
          <p>{transcript}</p>
        </details>
      )}
      <a className="l-inline" href={url}>
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
