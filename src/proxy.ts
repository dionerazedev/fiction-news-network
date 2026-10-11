import { NextResponse, type NextRequest } from "next/server";
import site from "../content/site.json";
import storySlugs from "../content/story-slugs.json";

// Unknown slugs on streamed pages would otherwise answer 200 with the not-found UI.
// Checking here, before the page renders, lets them return a real 404.
const known: Record<string, Set<string>> = {
  story: new Set(storySlugs),
  category: new Set(site.categories.map((c) => c.slug)),
  author: new Set(site.authors.map((a) => a.slug)),
};

export const config = {
  matcher: ["/story/:slug*", "/category/:slug*", "/author/:slug*"],
};

export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  if (slug && !known[section]?.has(slug)) {
    return NextResponse.rewrite(new URL("/not-found-page", request.url), { status: 404 });
  }
}
