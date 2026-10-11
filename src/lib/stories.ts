import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { dayKey } from "./format";
import { getAuthor, getCategory, type Author, type Category } from "./site";

const STORIES_DIR = path.join(process.cwd(), "content", "stories");
const IMAGES_DIR = path.join(process.cwd(), "public", "images", "stories");
const IMAGE_EXTENSIONS = [".webp", ".jpg", ".png"];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string };

export type Story = {
  slug: string;
  title: string;
  dek: string;
  category: Category;
  author: Author;
  publishedAt: string;
  animal: string;
  imageAlt: string;
  /** Public path of the hero image, or null while the image is still to come. */
  imageSrc: string | null;
  blocks: Block[];
  readingMinutes: number;
  plainText: string;
};

function parseBody(body: string): Block[] {
  return body
    .trim()
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): Block => {
      if (chunk.startsWith("## ")) return { type: "h2", text: chunk.slice(3).trim() };
      if (chunk.startsWith("> ")) {
        const raw = chunk.replace(/^>\s?/gm, " ").trim();
        const [text, cite] = raw.split(/\s+—\s+/);
        return { type: "quote", text: text.trim(), cite: cite?.trim() };
      }
      return { type: "p", text: chunk.replace(/\n/g, " ") };
    });
}

function findImage(slug: string): string | null {
  for (const ext of IMAGE_EXTENSIONS) {
    if (fs.existsSync(path.join(IMAGES_DIR, slug + ext))) return `/images/stories/${slug}${ext}`;
  }
  return null;
}

function loadStory(file: string): Story {
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(STORIES_DIR, file), "utf8"));
  const category = getCategory(data.category);
  const author = getAuthor(data.author);
  if (!category) throw new Error(`Story ${slug}: unknown category "${data.category}"`);
  if (!author) throw new Error(`Story ${slug}: unknown author "${data.author}"`);
  const blocks = parseBody(content);
  const plainText = blocks.map((b) => b.text.replace(/\*/g, "")).join(" ");
  const words = plainText.split(/\s+/).length;
  return {
    slug,
    title: data.title,
    dek: data.dek,
    category,
    author,
    publishedAt: new Date(data.publishedAt).toISOString(),
    animal: data.animal,
    imageAlt: data.imageAlt,
    imageSrc: findImage(slug),
    blocks,
    readingMinutes: Math.max(1, Math.round(words / 230)),
    plainText,
  };
}

let cache: Story[] | null = null;

/** Every story, newest first. */
export function getAllStories(): Story[] {
  if (!cache) {
    cache = fs
      .readdirSync(STORIES_DIR)
      .filter((f) => f.endsWith(".md"))
      .map(loadStory)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }
  return cache;
}

export function getStory(slug: string): Story | undefined {
  return getAllStories().find((s) => s.slug === slug);
}

export function getStoriesByCategory(slug: string): Story[] {
  return getAllStories().filter((s) => s.category.slug === slug);
}

export function getStoriesByAuthor(slug: string): Story[] {
  return getAllStories().filter((s) => s.author.slug === slug);
}

/** The newest delivery: every story published on the same day as the newest story. */
export function getLatestDelivery(): Story[] {
  const all = getAllStories();
  if (all.length === 0) return [];
  const day = dayKey(all[0].publishedAt);
  return all.filter((s) => dayKey(s.publishedAt) === day);
}

/** Same category first, then the newest from elsewhere; never the story itself. */
export function getRelatedStories(story: Story, count = 3): Story[] {
  const others = getAllStories().filter((s) => s.slug !== story.slug);
  const same = others.filter((s) => s.category.slug === story.category.slug);
  const rest = others.filter((s) => s.category.slug !== story.category.slug);
  return [...same, ...rest].slice(0, count);
}

/** The next older story, then wrap to the newest, for "next story" links. */
export function getNextStory(story: Story): Story | undefined {
  const all = getAllStories();
  if (all.length < 2) return undefined;
  const i = all.findIndex((s) => s.slug === story.slug);
  return all[(i + 1) % all.length];
}

/** Stories grouped by calendar day (Eastern time), newest day first. */
export function getStoriesByDay(): { day: string; stories: Story[] }[] {
  const groups = new Map<string, Story[]>();
  for (const s of getAllStories()) {
    const key = dayKey(s.publishedAt);
    groups.set(key, [...(groups.get(key) ?? []), s]);
  }
  return [...groups.entries()].map(([day, stories]) => ({ day, stories }));
}

export function searchStories(query: string): Story[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return getAllStories()
    .map((s) => {
      const title = s.title.toLowerCase();
      const meta = `${s.dek} ${s.animal} ${s.category.name} ${s.author.name}`.toLowerCase();
      const body = s.plainText.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 5;
        if (meta.includes(t)) score += 3;
        if (body.includes(t)) score += 1;
        else if (!title.includes(t) && !meta.includes(t)) return { s, score: 0 };
      }
      return { s, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.s);
}
