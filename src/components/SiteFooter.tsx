import Link from "next/link";
import { site } from "@/lib/site";
import { ChevronEdge } from "./ChevronEdge";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link href="/" className="site-footer__wordmark">
            The Paw Post
          </Link>
          <p>
            {site.tagline}. Every story, person and place on this site is fiction, and every picture is an
            illustration. Nothing here is news.
          </p>
        </div>
        <nav aria-label="Sections" className="site-footer__col">
          <h2>Routes</h2>
          <ul>
            {site.categories.map((c) => (
              <li key={c.slug} data-route={c.slug}>
                <Link href={`/category/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="About The Paw Post" className="site-footer__col">
          <h2>The Paw Post</h2>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/editorial-policy">Editorial policy</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/archive">Archive</Link></li>
            <li><a href="/feed.xml">RSS feed</a></li>
          </ul>
        </nav>
      </div>
      <p className="site-footer__legal">© 2026 The Paw Post. Fiction for entertainment.</p>
      <ChevronEdge />
    </footer>
  );
}
