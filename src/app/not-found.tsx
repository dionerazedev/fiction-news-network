import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <Masthead />
      <main id="main">
        <div className="wrap">
          <header className="page-head">
            <h1 className="page-title" style={{ color: "var(--navy)" }}>
              Return to sender
            </h1>
            <p className="page-intro">We couldn&apos;t find that page. It may have moved, or the link may be wrong.</p>
          </header>
          <p className="empty">
            Go to the <Link href="/">latest stories</Link>, <Link href="/search">search</Link>, or browse the{" "}
            <Link href="/archive">archive</Link>.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
