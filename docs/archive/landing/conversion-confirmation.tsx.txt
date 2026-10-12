"use client";
import { useEffect, useState } from "react";
import { confirmedConversion } from "@/lib/analytics";
export function ConversionConfirmation() {
  const [development, setDevelopment] = useState(false);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("aurex-confirmed-lead");
      if (!raw) return;
      const lead = JSON.parse(raw);
      sessionStorage.removeItem("aurex-confirmed-lead");
      if (
        typeof lead.receipt === "string" &&
        Date.now() - lead.time < 30 * 60 * 1000
      ) {
        if (lead.development) {
          requestAnimationFrame(() => setDevelopment(true));
          return;
        }
        confirmedConversion(lead.receipt);
      }
    } catch {}
  }, []);
  return development ? (
    <p className="booking-fallback">
      Development preview: this request was simulated locally and was not
      delivered.
    </p>
  ) : null;
}
