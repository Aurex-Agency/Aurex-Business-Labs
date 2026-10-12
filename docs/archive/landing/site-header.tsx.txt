"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/content/revenue-website";
export function Brand() {
  return (
    <a
      href="/revenue-website"
      className="brand"
      aria-label="AUREX BUSINESS LABS home"
    >
      <Image
        src="/brand/aurex-mark.png"
        alt=""
        width={50}
        height={50}
        priority
      />
      <span>
        AUREX <small>BUSINESS LABS</small>
      </span>
    </a>
  );
}
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#review">
          Get My Free Review <ArrowUpRight size={15} />
        </a>
        <button
          ref={button}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        className="mobile-menu"
        hidden={!open}
      >
        {navigation.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
            <ArrowUpRight size={18} />
          </a>
        ))}
        <a href="#review" className="button" onClick={() => setOpen(false)}>
          Get My Free Review <ArrowUpRight size={18} />
        </a>
      </nav>
    </header>
  );
}
