"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ArrowUpRight, X } from "lucide-react";
import { track } from "@/lib/analytics";

export function BookingCalendar({ url }: { url: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);
  const open = useCallback(() => {
    setLoaded(true);
    if (!dialog.current?.open) dialog.current?.showModal();
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#book") return;
    const frame = requestAnimationFrame(open);
    return () => cancelAnimationFrame(frame);
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="button"
        onClick={() => {
          track("calendar_click", { item: "open_calendar" });
          open();
        }}
      >
        Choose My Review Time
        <ArrowUpRight size={19} />
      </button>
      <p className="booking-direct-link">
        Prefer a separate tab?{" "}
        <a href={url} target="_blank" rel="noopener noreferrer">
          Open the booking calendar
        </a>
        .
      </p>
      <dialog
        ref={dialog}
        className="booking-dialog"
        aria-labelledby="booking-title"
        aria-describedby="booking-description"
        onClose={() => trigger.current?.focus({ preventScroll: true })}
      >
        <div className="booking-dialog-header">
          <div>
            <span className="eyebrow">YOUR REQUEST IS IN / NEXT STEP</span>
            <h2 id="booking-title">Choose your review time.</h2>
            <p id="booking-description">
              Pick a time below to book your free Website Revenue Review.
            </p>
          </div>
          <button
            type="button"
            className="booking-close"
            aria-label="Close booking calendar"
            onClick={() => dialog.current?.close()}
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        {loaded && (
          <>
            <div className="booking-embed">
              <iframe
                src={url}
                title="Book your free Website Revenue Review"
                allow="payment"
                scrolling="no"
                id="qUq69dSX0qUknYNhFJOY_1790013400436"
              />
            </div>
            <Script
              src="https://link.msgsndr.com/js/form_embed.js"
              strategy="afterInteractive"
            />
          </>
        )}
        <p className="booking-dialog-fallback">
          Calendar not loading?{" "}
          <a href={url} target="_blank" rel="noopener noreferrer">
            Open it in a new tab <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </p>
      </dialog>
    </>
  );
}
