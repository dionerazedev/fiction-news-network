import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Preview build: nothing is indexed until the client approves a public launch.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }], sitemap: `${site.url}/sitemap.xml` };
}
