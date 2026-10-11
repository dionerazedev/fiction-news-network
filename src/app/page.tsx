import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadStory, StoryRow, StoryTile } from "@/components/StoryCards";
import { site } from "@/lib/site";
import { getAllStories, getLatestDelivery, getStoriesByCategory } from "@/lib/stories";

export default function HomePage() {
  const delivery = getLatestDelivery();
  const [lead, ...alsoToday] = delivery;
  const shown = new Set(delivery.map((s) => s.slug));

  const sections = site.categories
    .map((category) => {
      const stories = getStoriesByCategory(category.slug).filter((s) => !shown.has(s.slug)).slice(0, 3);
      stories.forEach((s) => shown.add(s.slug));
      return { category, stories };
    })
    .filter((s) => s.stories.length > 0);

  const river = getAllStories().filter((s) => !shown.has(s.slug));

  return (
    <>
      <Masthead current="home" />
      <main id="main">
        {lead && (
          <section className="today" aria-labelledby="today-title">
            <div className="wrap today__grid">
              <h1 id="today-title" className="sr-only">
                Today&apos;s delivery
              </h1>
              <LeadStory story={lead} />
              {alsoToday.length > 0 && (
                <aside className="today__aside" aria-labelledby="also-title">
                  <h2 id="also-title" className="today__aside-title">
                    Also in today&apos;s delivery
                  </h2>
                  <div className="today__list">
                    {alsoToday.map((s) => (
                      <StoryRow key={s.slug} story={s} withTime />
                    ))}
                  </div>
                </aside>
              )}
            </div>
          </section>
        )}

        {sections.map(({ category, stories }, i) => {
          const [first, ...rest] = stories;
          return (
            <section
              key={category.slug}
              className={`route-section${i % 2 ? " route-section--flip" : ""}`}
              data-route={category.slug}
              aria-labelledby={`route-${category.slug}`}
            >
              <div className="wrap">
                <div className="route-section__head">
                  <h2 id={`route-${category.slug}`} className="route-section__name">
                    {category.name}
                  </h2>
                  <p className="route-section__blurb">{category.blurb}</p>
                  <Link href={`/category/${category.slug}`} className="route-section__all">
                    All {category.name} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                <div className="route-section__grid">
                  <StoryTile story={first} size="lg" />
                  {rest.length > 0 && (
                    <div className="route-section__rows">
                      {rest.map((s) => (
                        <StoryRow key={s.slug} story={s} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}

        {river.length > 0 && (
          <section className="river" aria-labelledby="river-title">
            <div className="wrap">
              <h2 id="river-title" className="section-title">
                Earlier deliveries
              </h2>
              <div className="river__list">
                {river.map((s) => (
                  <StoryRow key={s.slug} story={s} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
