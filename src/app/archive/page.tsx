import type { Metadata } from "next";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { StoryRow } from "@/components/StoryCards";
import { editionDate } from "@/lib/format";
import { getAllStories, getStoriesByDay } from "@/lib/stories";

export const metadata: Metadata = {
  title: "Archive",
  description: "Every story The Paw Post has delivered, newest first. All stories are fiction.",
  alternates: { canonical: "/archive" },
};

export default function ArchivePage() {
  const days = getStoriesByDay();
  const total = getAllStories().length;
  return (
    <>
      <Masthead current="archive" />
      <main id="main">
        <div className="wrap">
          <header className="page-head">
            <h1 className="page-title" style={{ color: "var(--navy)" }}>
              Archive
            </h1>
            <p className="page-intro">
              All {total} stories, grouped by the day they were delivered. Nothing is removed; older stories stay here.
            </p>
          </header>
          <div style={{ paddingBottom: 56 }}>
            {days.map(({ day, stories }) => (
              <section key={day} className="archive-day" aria-labelledby={`day-${day}`}>
                <div>
                  <h2 id={`day-${day}`} className="archive-day__date">
                    {editionDate(stories[0].publishedAt)}
                  </h2>
                  <p className="archive-day__count">
                    {stories.length} {stories.length === 1 ? "story" : "stories"}
                  </p>
                </div>
                <div className="archive-day__list">
                  {stories.map((s) => (
                    <StoryRow key={s.slug} story={s} withTime />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
