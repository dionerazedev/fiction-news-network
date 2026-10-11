import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllStories } from "@/lib/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const stories = getAllStories();
  const newest = stories[0]?.publishedAt;
  const pages = ["", "/archive", "/about", "/editorial-policy", "/contact", "/privacy"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: newest,
  }));
  return [
    ...pages,
    ...site.categories.map((c) => ({ url: `${site.url}/category/${c.slug}`, lastModified: newest })),
    ...site.authors.map((a) => ({ url: `${site.url}/author/${a.slug}` })),
    ...stories.map((s) => ({ url: `${site.url}/story/${s.slug}`, lastModified: s.publishedAt })),
  ];
}
