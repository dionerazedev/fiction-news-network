import { ImageResponse } from "next/og";
import { OgCard, ogFonts, ogSize } from "@/lib/og";
import { getAllStories, getStory } from "@/lib/stories";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "FICTION: a story from The Paw Post";

export function generateStaticParams() {
  return getAllStories().map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStory(slug);
  return new ImageResponse(
    <OgCard title={story?.title ?? "The Paw Post"} route={story?.category.slug} kicker={story?.category.name} />,
    { ...ogSize, fonts: await ogFonts() },
  );
}
