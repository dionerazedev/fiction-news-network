import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <StaticPage title="About" intro="The Paw Post publishes invented animal stories: rescues, odd habits, lucky finds and wild discoveries.">
      <p>
        Every story on {site.name} is fiction. The animals, people, towns, businesses and events are made up, and every
        picture is an illustration. We write the kind of story you want to read to the end and send to a friend, and we
        label it clearly so nobody mistakes it for news.
      </p>
      <h2>Who writes the stories</h2>
      <p>
        Stories are written with the help of AI and published under fictional house personas, such as{" "}
        {site.authors.map((a, i) => (
          <span key={a.slug}>
            {i > 0 && (i === site.authors.length - 1 ? " and " : ", ")}
            <Link href={`/author/${a.slug}`}>{a.name}</Link>
          </span>
        ))}
        . They are not real people, and we don&apos;t pretend they are.
      </p>
      <h2>How to find your way around</h2>
      <p>
        Stories are sorted into five routes:{" "}
        {site.categories.map((c, i) => (
          <span key={c.slug}>
            {i > 0 && (i === site.categories.length - 1 ? " and " : ", ")}
            <Link href={`/category/${c.slug}`}>{c.name}</Link>
          </span>
        ))}
        . Every story we have published stays in the <Link href="/archive">archive</Link>.
      </p>
      <p>
        Read how we keep fiction clearly labelled in our <Link href="/editorial-policy">editorial policy</Link>.
      </p>
    </StaticPage>
  );
}
