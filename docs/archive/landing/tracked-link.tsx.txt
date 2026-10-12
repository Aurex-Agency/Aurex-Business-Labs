"use client";
import type { ComponentProps } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
export function TrackedLink({
  event,
  detail,
  ...props
}: ComponentProps<"a"> & { event: AnalyticsEvent; detail?: string }) {
  return (
    <a
      {...props}
      onClick={() => track(event, detail ? { item: detail } : undefined)}
    />
  );
}
