"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { siFacebook, siWhatsapp, siX } from "simple-icons";

function Brand({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
      <path d={path} />
    </svg>
  );
}

type Props = { url: string; title: string };

/** Share links for the networks readers use most, plus copy-link. */
export function ShareBar({ url, title }: Props) {
  const [copied, setCopied] = useState(false);
  const text = `${title} (fiction)`;
  const links = [
    { name: "Facebook", icon: siFacebook.path, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: "X", icon: siX.path, href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` },
    { name: "WhatsApp", icon: siWhatsapp.path, href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <div className="share-bar" role="group" aria-label="Share this story">
      <span className="share-bar__label">Share</span>
      {links.map((l) => (
        <a key={l.name} className="share-bar__btn" href={l.href} target="_blank" rel="noopener noreferrer">
          <Brand path={l.icon} />
          <span>{l.name}</span>
        </a>
      ))}
      <button type="button" className="share-bar__btn" onClick={copy} aria-live="polite">
        {copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
        <span>{copied ? "Link copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
