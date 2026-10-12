"use client";
import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { metaStandard, track } from "@/lib/analytics";

type Details = { start?: string; host?: string; name?: string };

// Shows the booked time when the calendar passes it in the redirect (Calendly
// sends event_start_time and assigned_to), and fires the Schedule event once.
// If the calendar redirected inside its own frame, move to the full page first.
export function BookingDetails() {
  const [details, setDetails] = useState<Details>();

  useEffect(() => {
    if (window.top && window.top !== window.self) {
      window.top.location.href = window.location.href;
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("event_start_time") || params.get("start_time");
    const date = raw ? new Date(raw) : undefined;
    // Reading the address and session flag only exists in the browser.
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
      host: params.get("assigned_to")?.slice(0, 80) || undefined,
      name: params.get("invitee_first_name")?.slice(0, 40) || undefined,
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
