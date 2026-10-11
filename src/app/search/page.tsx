import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { StoryRow } from "@/components/StoryCards";
import { searchStories } from "@/lib/stories";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every story on The Paw Post.",
  robots: { index: false },
};

async function Results({ searchParams }: { searchParams: PageProps<"/search">["searchParams"] }) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw ?? "").trim().slice(0, 100);
  const results = q ? searchStories(q) : [];
  return (
    <>
      <form className="search-form" action="/search" role="search">
        <label htmlFor="q" className="sr-only">
          Search stories
        </label>
        <input id="q" name="q" type="search" defaultValue={q} placeholder="Try parrot, lottery or snow" autoComplete="off" />
        <button type="submit">Search</button>
      </form>
      {q && (
        <p className="search-status" aria-live="polite" style={{ marginTop: 16 }}>
          {results.length === 0
            ? `No stories match “${q}”.`
            : `${results.length} ${results.length === 1 ? "story matches" : "stories match"} “${q}”.`}
        </p>
      )}
      {q && results.length === 0 && (
        <p className="empty">
          Try a different animal or place, or browse the <Link href="/archive">archive</Link>.
        </p>
      )}
      {results.length > 0 && (
        <div className="listing__grid" style={{ marginTop: 24 }}>
          {results.map((s) => (
            <StoryRow key={s.slug} story={s} />
          ))}
        </div>
      )}
    </>
  );
}

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <>
      <Masthead current="search" />
      <main id="main">
        <div className="wrap" style={{ paddingBottom: 56 }}>
          <header className="page-head">
            <h1 className="page-title" style={{ color: "var(--navy)" }}>
              Search
            </h1>
          </header>
          <Suspense
            fallback={
              <form className="search-form" action="/search" role="search">
                <label htmlFor="q" className="sr-only">
                  Search stories
                </label>
                <input id="q" name="q" type="search" placeholder="Try parrot, lottery or snow" />
                <button type="submit">Search</button>
              </form>
            }
          >
            <Results searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
