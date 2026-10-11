import type { ReactNode } from "react";
import { Masthead } from "./Masthead";
import { SiteFooter } from "./SiteFooter";

export function StaticPage({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <>
      <Masthead />
      <main id="main">
        <div className="wrap">
          <header className="page-head">
            <h1 className="page-title" style={{ color: "var(--navy)" }}>
              {title}
            </h1>
            {intro && <p className="page-intro">{intro}</p>}
          </header>
          <div className="prose">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
