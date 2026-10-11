import Link from "next/link";
import { Search } from "lucide-react";
import { site } from "@/lib/site";
import { getAllStories } from "@/lib/stories";
import { editionDate } from "@/lib/format";
import { ChevronEdge } from "./ChevronEdge";
import { FictionTag } from "./FictionTag";

export function Masthead({ current }: { current?: string }) {
  const newest = getAllStories()[0];
  return (
    <header className="masthead">
      <ChevronEdge />
      <div className="masthead__band">
        <div className="masthead__inner">
          <p className="masthead__edition">
            {newest ? <>Delivered {editionDate(newest.publishedAt)}</> : null}
          </p>
          <Link href="/" className="masthead__wordmark" aria-label={`${site.name} home`}>
            The Paw Post
          </Link>
          <p className="masthead__notice">
            <FictionTag /> Every story here is invented. <Link href="/editorial-policy">How we work</Link>
          </p>
        </div>
      </div>
      <nav className="routes" aria-label="Sections">
        <ul className="routes__list">
          <li>
            <Link href="/" aria-current={current === "home" ? "page" : undefined}>
              Latest
            </Link>
          </li>
          {site.categories.map((c) => (
            <li key={c.slug} data-route={c.slug}>
              <Link href={`/category/${c.slug}`} aria-current={current === c.slug ? "page" : undefined}>
                {c.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/archive" aria-current={current === "archive" ? "page" : undefined}>
              Archive
            </Link>
          </li>
          <li className="routes__search">
            <Link href="/search" aria-current={current === "search" ? "page" : undefined}>
              <Search size={16} aria-hidden="true" />
              <span>Search</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
