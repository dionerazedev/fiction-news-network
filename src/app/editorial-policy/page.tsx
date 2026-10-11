import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Editorial policy", alternates: { canonical: "/editorial-policy" } };

export default function EditorialPolicyPage() {
  return (
    <StaticPage title="Editorial policy" intro="What The Paw Post is, what it is not, and the rules every story follows.">
      <h2>Everything here is fiction</h2>
      <p>
        {site.name} publishes invented stories for entertainment. None of them describe real events. Every story page,
        every story card and every link preview shared on social media carries a <strong>{site.label.tag}</strong> label,
        and every story says “{site.label.line}” under its headline. These labels are part of our site templates and
        cannot be removed from a story.
      </p>
      <h2>No real people, companies or tragedies</h2>
      <ul>
        <li>Characters, towns and businesses are invented. We do not write about real, living people or real companies.</li>
        <li>We do not base stories on real disasters, crimes or tragedies.</li>
        <li>We do not give medical, legal or financial advice. A story about a lucky find is a story, not a tip.</li>
      </ul>
      <h2>How stories are made</h2>
      <p>
        Stories are drafted with AI tools, checked against our rules and against earlier stories so plots are not
        repeated, and published under fictional house personas. Pictures are AI-generated illustrations and are captioned
        that way.
      </p>
      <h2>What we never fake</h2>
      <ul>
        <li>No made-up view counts, likes or “trending” numbers.</li>
        <li>No testimonials, awards or newsroom credentials.</li>
        <li>Publish dates and times are real. We never re-date old stories to make them look new.</li>
      </ul>
      <h2>Corrections and concerns</h2>
      <p>
        If a story looks like it could be mistaken for real news, or seems to describe a real person, please{" "}
        <Link href="/contact">contact us</Link> and we will review it.
      </p>
    </StaticPage>
  );
}
