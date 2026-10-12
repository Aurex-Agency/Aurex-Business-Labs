"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

let hasNavigated = false;

// Plays a short entrance on client-side navigations only. The first page load
// renders untouched so it matches the server HTML and the headline paints at
// once. Keyed by path so the wrapper remounts on each route change.
function Sweep({ children }: { children: React.ReactNode }) {
  const [enter] = useState(() => hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);
  return (
    <div className="l-route" data-enter={enter ? "" : undefined}>
      {children}
    </div>
  );
}

export function RouteSweep({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return <Sweep key={path}>{children}</Sweep>;
}
