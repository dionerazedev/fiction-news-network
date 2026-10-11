import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { FictionLine, FictionTag } from "@/components/FictionTag";
import { Postmark } from "@/components/Postmark";
import { RouteStamp } from "@/components/RouteStamp";
import { ShareBar } from "@/components/ShareBar";
import { StoryBody } from "@/components/StoryBody";
import { StoryImage } from "@/components/StoryImage";
import { StoryTile } from "@/components/StoryCards";
import { longDate, clockTime } from "@/lib/format";
import { site } from "@/lib/site";
import { getAllStories, getNextStory, getRelatedStories, getStory } from "@/lib/stories";

export function generateStaticParams() {
  return getAllStories().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/story/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  const title = `${site.label.tag}: ${story.title}`;
  const description = `${site.label.line} ${story.dek}`;
  return {
    title: story.title,
    description,
    alternates: { canonical: `/story/${story.slug}` },
    authors: [{ name: `${story.author.name} (fictional persona)` }],
    openGraph: { type: "article", title, description, publishedTime: story.publishedAt, section: story.category.name },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function StoryPage({ params }: PageProps<"/story/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();
  const related = getRelatedStories(story);
  const next = getNextStory(story);
  const url = `${site.url}/story/${story.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SatiricalArticle",
    headline: story.title,
    description: story.dek,
    datePublished: story.publishedAt,
    genre: "Fiction",
    articleSection: story.category.name,
    author: { "@type": "Person", name: `${story.author.name} (fictional persona)` },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: url,
  };

  return (
    <>
      <Masthead current={story.category.slug} />
      <main id="main">
        <article className="story wrap" data-route={story.category.slug}>
          <header className="story__head">
            <div className="story__route">
              <RouteStamp category={story.category} />
              <FictionLine />
            </div>
            <h1 className="story__title">{story.title}</h1>
            <p className="story__dek">{story.dek}</p>
            <div className="story__byline">
              <p className="byline">
                By <Link href={`/author/${story.author.slug}`}>{story.author.name}</Link> (fictional persona)
                <br />
                <time dateTime={story.publishedAt}>
                  {longDate(story.publishedAt)} at {clockTime(story.publishedAt)} ET
                </time>
                <span aria-hidden="true"> · </span>
                {story.readingMinutes} min read
              </p>
              <Postmark iso={story.publishedAt} size={70} />
            </div>
            <ShareBar url={url} title={story.title} />
          </header>

          <StoryImage story={story} sizes="(min-width: 1100px) 1100px, 100vw" priority caption className="story__hero" />

          <div className="story__column">
            <StoryBody blocks={story.blocks} />

            <div className="story__end">
              <FictionTag />
              <p className="byline">
                This story, its people and its places are invented. <Link href="/editorial-policy">Read our editorial policy.</Link>
              </p>
            </div>

            <div style={{ marginTop: 20 }}>
              <ShareBar url={url} title={story.title} />
            </div>

            <aside className="author-box" aria-label="About the author">
              <p className="author-box__name">
                <Link href={`/author/${story.author.slug}`}>{story.author.name}</Link>
              </p>
              <p>{story.author.bio}</p>
            </aside>

            {next && (
              <Link href={`/story/${next.slug}`} className="next-story" data-route={next.category.slug}>
                <span className="next-story__label">
                  Next story <ArrowRight size={14} aria-hidden="true" />
                </span>
                <span className="next-story__title">{next.title}</span>
              </Link>
            )}
          </div>

          {related.length > 0 && (
            <section className="related" aria-labelledby="related-title">
              <h2 id="related-title" className="section-title">
                More from The Paw Post
              </h2>
              <div className="related__grid">
                {related.map((s) => (
                  <StoryTile key={s.slug} story={s} />
                ))}
              </div>
            </section>
          )}
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </main>
      <SiteFooter />
    </>
  );
}
