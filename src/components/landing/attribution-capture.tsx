"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";

export function AttributionCapture() {
  const pathname = usePathname();
  const params = useSearchParams();
  useEffect(() => {
    captureAttribution();
  }, [pathname, params]);
  return null;
}
