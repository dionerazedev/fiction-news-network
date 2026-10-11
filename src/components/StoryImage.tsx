import Image from "next/image";
import type { Story } from "@/lib/stories";
import { site } from "@/lib/site";

type Props = { story: Story; sizes: string; priority?: boolean; caption?: boolean; className?: string };

/**
 * The story's hero image with its AI-illustration caption. Until an image exists,
 * an honest temporary panel in the story's route colour stands in for it.
 */
export function StoryImage({ story, sizes, priority, caption = false, className }: Props) {
  const frame = ["story-image", className].filter(Boolean).join(" ");
  if (story.imageSrc) {
    return (
      <figure className={frame} data-route={story.category.slug}>
        <div className="story-image__frame">
          <Image src={story.imageSrc} alt={story.imageAlt} fill sizes={sizes} priority={priority} />
        </div>
        {caption && <figcaption>{site.label.imageCaption}</figcaption>}
      </figure>
    );
  }
  return (
    <figure className={frame} data-route={story.category.slug}>
      <div className="story-image__frame story-image__temp" role="img" aria-label={story.imageAlt}>
        <span className="story-image__animal" aria-hidden="true">
          {story.animal}
        </span>
        <span className="story-image__note" aria-hidden="true">
          Illustration coming soon
        </span>
      </div>
      {caption && <figcaption>Temporary panel: the AI illustration for this story is not made yet.</figcaption>}
    </figure>
  );
}
