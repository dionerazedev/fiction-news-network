import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy" intro="What we collect when you read The Paw Post. Short version: very little.">
      <h2>What we collect</h2>
      <ul>
        <li>We do not ask you to create an account and we do not sell personal information.</li>
        <li>
          Our hosting provider keeps standard server logs (such as IP address, browser type and the page requested) to
          keep the site running and secure.
        </li>
        <li>If you email us, we keep your message and address only to reply and handle your request.</li>
      </ul>
      <h2>Sharing</h2>
      <p>
        Our share buttons are plain links. Nothing is sent to Facebook, X or WhatsApp unless you click one, and then their
        own privacy policies apply.
      </p>
      <h2>Analytics</h2>
      <p>
        If we add visitor analytics, we will use a privacy-friendly tool that does not use advertising cookies, and we will
        update this page first.
      </p>
      <h2>Your choices</h2>
      <p>
        You can ask us about any information we hold about you through our <Link href="/contact">contact page</Link>.
       
      </p>
      <p>Last updated October 11, 2026. Questions about {site.name}&apos;s privacy practices are welcome.</p>
    </StaticPage>
  );
}
