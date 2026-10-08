import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.brandName,
    short_name: site.brandName,
    start_url: "/",
    display: "browser",
    background_color: "#070C13",
    theme_color: "#070C13",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
