import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.canonical, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
