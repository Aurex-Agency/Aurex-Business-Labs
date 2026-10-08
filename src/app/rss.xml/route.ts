import { articles } from "@/content/articles";
import { site } from "@/lib/site-config";
const xml = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
export function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(site.brandName)} Insights</title><link>${site.url}/insights</link><description>${xml(site.shortDescription)}</description>${articles.map((a) => `<item><title>${xml(a.title)}</title><link>${site.url}/insights/${a.slug}</link><guid>${site.url}/insights/${a.slug}</guid><description>${xml(a.summary)}</description><pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate></item>`).join("")}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}
