import Link from "next/link";
import type { Story } from "@/lib/stories";
import { clockTime, shortDate } from "@/lib/format";
import { FictionTag } from "./FictionTag";
import { Postmark } from "./Postmark";
import { RouteStamp } from "./RouteStamp";
import { StoryImage } from "./StoryImage";

const href = (s: Story) => `/story/${s.slug}`;

function Meta({ story, withTime = false }: { story: Story; withTime?: boolean }) {
  return (
    <p className="card-meta">
      <FictionTag tone="outline" />
      <RouteStamp category={story.category} />
      <time dateTime={story.publishedAt}>
        {withTime ? clockTime(story.publishedAt) + " ET" : shortDate(story.publishedAt)}
      </time>
    </p>
  );
}

/** The day's lead story: big picture, heavy headline, postmark. */
export function LeadStory({ story }: { story: Story }) {
  return (
    <article className="lead-story" data-route={story.category.slug}>
      <Link href={href(story)} className="lead-story__image" tabIndex={-1} aria-hidden="true">
        <StoryImage story={story} sizes="(min-width: 1024px) 64vw, 100vw" priority />
      </Link>
      <div className="lead-story__text">
        <Meta story={story} />
        <h2 className="lead-story__title">
          <Link href={href(story)}>{story.title}</Link>
        </h2>
        <p className="lead-story__dek">{story.dek}</p>
        <div className="lead-story__foot">
          <p className="byline">
            By <Link href={`/author/${story.author.slug}`}>{story.author.name}</Link>
            <span aria-hidden="true"> · </span>
            {story.readingMinutes} min read
          </p>
          <Postmark iso={story.publishedAt} size={64} />
        </div>
      </div>
    </article>
  );
}

/** Compact row: small picture beside the headline. */
export function StoryRow({ story, withTime = false }: { story: Story; withTime?: boolean }) {
  return (
    <article className="story-row" data-route={story.category.slug}>
      <Link href={href(story)} className="story-row__image" tabIndex={-1} aria-hidden="true">
        <StoryImage story={story} sizes="(min-width: 1024px) 140px, 112px" />
      </Link>
      <div className="story-row__text">
        <Meta story={story} withTime={withTime} />
        <h3 className="story-row__title">
          <Link href={href(story)}>{story.title}</Link>
        </h3>
      </div>
    </article>
  );
}

/** Picture-first tile used in route sections and listings. */
export function StoryTile({ story, size = "md" }: { story: Story; size?: "lg" | "md" }) {
  return (
    <article className={`story-tile story-tile--${size}`} data-route={story.category.slug}>
      <Link href={href(story)} className="story-tile__image" tabIndex={-1} aria-hidden="true">
        <StoryImage
          story={story}
          sizes={size === "lg" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
        />
      </Link>
      <Meta story={story} />
      <h3 className="story-tile__title">
        <Link href={href(story)}>{story.title}</Link>
      </h3>
      {size === "lg" && <p className="story-tile__dek">{story.dek}</p>}
    </article>
  );
}
