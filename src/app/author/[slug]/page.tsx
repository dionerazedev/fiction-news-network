import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { StoryRow } from "@/components/StoryCards";
import { FictionTag } from "@/components/FictionTag";
import { getAuthor, site } from "@/lib/site";
import { getStoriesByAuthor } from "@/lib/stories";

export function generateStaticParams() {
  return site.authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/author/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return { title: `${author.name} (fictional persona)`, description: author.bio, alternates: { canonical: `/author/${author.slug}` } };
}

export default async function AuthorPage({ params }: PageProps<"/author/[slug]">) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  const stories = getStoriesByAuthor(author.slug);

  return (
    <>
      <Masthead />
      <main id="main">
        <div className="wrap">
          <header className="page-head">
            <p className="fiction-line">
              <FictionTag /> Fictional persona
            </p>
            <h1 className="page-title">{author.name}</h1>
            <p className="page-intro">{author.bio}</p>
          </header>
          <div className="listing">
            <h2 className="section-title">
              {stories.length} {stories.length === 1 ? "story" : "stories"} on the {author.role} desk
            </h2>
            <div className="listing__grid">
              {stories.map((s) => (
                <StoryRow key={s.slug} story={s} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
