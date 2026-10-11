import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadStory, StoryRow } from "@/components/StoryCards";
import { getCategory, site } from "@/lib/site";
import { getStoriesByCategory } from "@/lib/stories";

export function generateStaticParams() {
  return site.categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `${category.blurb} Fiction from ${site.name}.`,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const [lead, ...rest] = getStoriesByCategory(category.slug);

  return (
    <>
      <Masthead current={category.slug} />
      <main id="main" data-route={category.slug}>
        <div className="wrap">
          <header className="page-head page-head--route">
            <h1 className="page-title">{category.name}</h1>
            <p className="page-intro">{category.blurb}</p>
          </header>
          {lead ? (
            <div className="listing">
              <div className="listing__lead">
                <LeadStory story={lead} />
              </div>
              {rest.length > 0 && (
                <div className="listing__grid">
                  {rest.map((s) => (
                    <StoryRow key={s.slug} story={s} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="empty">No stories on this route yet. New stories arrive with every delivery.</p>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
