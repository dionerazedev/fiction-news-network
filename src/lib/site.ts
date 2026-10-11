import siteData from "../../content/site.json";

export type Category = { slug: string; name: string; blurb: string };
export type Author = { slug: string; name: string; role: string; bio: string };

export const site = siteData as {
  name: string;
  tagline: string;
  url: string;
  contactEmail: string;
  label: { tag: string; line: string; imageCaption: string };
  categories: Category[];
  authors: Author[];
};

export function getCategory(slug: string): Category | undefined {
  return site.categories.find((c) => c.slug === slug);
}

export function getAuthor(slug: string): Author | undefined {
  return site.authors.find((a) => a.slug === slug);
}
