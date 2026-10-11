import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <StaticPage title="Contact" intro="Questions, corrections or concerns about a story.">
      {site.contactEmail ? (
        <p>
          Email us at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. We read every message.
        </p>
      ) : (
        <p>
          Our contact inbox is being set up and will be listed here before the site launches publicly.
        </p>
      )}
      <h2>Before you write</h2>
      <ul>
        <li>Every story on {site.name} is fiction, so we can&apos;t put you in touch with the people or animals in it.</li>
        <li>
          If you think a story could be mistaken for real news, tell us which one. Our{" "}
          <Link href="/editorial-policy">editorial policy</Link> explains how we handle it.
        </li>
      </ul>
    </StaticPage>
  );
}
