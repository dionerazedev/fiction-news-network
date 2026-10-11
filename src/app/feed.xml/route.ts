import { site } from "@/lib/site";
import { getAllStories } from "@/lib/stories";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getAllStories()
    .map(
      (s) => `    <item>
      <title>${esc(`[${site.label.tag}] ${s.title}`)}</title>
      <link>${site.url}/story/${s.slug}</link>
      <guid isPermaLink="true">${site.url}/story/${s.slug}</guid>
      <pubDate>${new Date(s.publishedAt).toUTCString()}</pubDate>
      <category>${esc(s.category.name)}</category>
      <description>${esc(`${site.label.line} ${s.dek}`)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(site.name)} (fiction)</title>
    <link>${site.url}</link>
    <description>${esc(site.tagline)}. Every story is fiction.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
