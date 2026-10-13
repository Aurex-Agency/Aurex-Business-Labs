"use client";
import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { metaStandard, track } from "@/lib/analytics";
import { keptParams } from "@/lib/funnel";

type Details = { start?: string; host?: string; name?: string };
type Kept = Partial<Record<(typeof keptParams)[number], string>>;

declare global {
  interface Window {
    __aurexBooking?: Kept;
  }
}

// Shows the booked time when the calendar passes it (Calendly sends
// event_start_time and assigned_to) and fires the Schedule event once.
export function BookingDetails() {
  const [details, setDetails] = useState<Details>();

  useEffect(() => {
    if (window.top && window.top !== window.self) return;
    const kept = window.__aurexBooking ?? {};
    const raw = kept.event_start_time || kept.start_time;
    const date = raw ? new Date(raw) : undefined;
    // The booking details and session flag only exist in the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDetails({
      start:
        date && !Number.isNaN(date.valueOf())
          ? new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              timeZoneName: "short",
            }).format(date)
          : undefined,
      host: kept.assigned_to,
      name: kept.invitee_first_name?.slice(0, 40),
    });
    try {
      if (sessionStorage.getItem("aurex-call-booked")) return;
      sessionStorage.setItem("aurex-call-booked", "1");
    } catch {
      /* Storage may be blocked. Fire once for this page view. */
    }
    metaStandard("Schedule");
    track("calendar_booked", { form: "call" });
  }, []);

  return (
    <div className="l-call-booking">
      <span className="l-icon-badge" aria-hidden="true">
        <CalendarCheck size={20} />
      </span>
      <div>
        <p className="l-eyebrow">Your call</p>
        {details?.start ? (
          <p className="l-call-booking-time">
            {details.start}
            {details.host && <span> with {details.host}</span>}
          </p>
        ) : (
          <p className="l-call-booking-time">Booked and on the calendar</p>
        )}
        <p className="l-small">
          {details?.name ? `${details.name}, the` : "The"} calendar invite and
          confirmation are on their way to your email. If you need to change the
          time, use the link in that email.
        </p>
      </div>
    </div>
  );
}
