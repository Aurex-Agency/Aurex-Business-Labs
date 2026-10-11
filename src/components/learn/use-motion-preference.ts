"use client";
import { useSyncExternalStore } from "react";
const query = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function snapshot() {
  return window.matchMedia(query).matches;
}
function serverSnapshot() {
  return true;
}
// Start with a complete still frame and respond to preference changes after hydration.
export function useMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
