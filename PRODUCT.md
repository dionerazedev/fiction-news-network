# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript), chosen in the approved plan (`/mnt/project-files/plan/implementation-plan.md`). This first build serves one site from static sample content; the multi-site AI publishing engine (Postgres, background jobs, admin dashboard) follows in a later phase. Preview target: Vercel on the client's account.

## Users

US English-speaking general readers who arrive mostly on phones from social shares (Facebook, X, WhatsApp) looking for a short, emotionally satisfying animal story they can finish in a few minutes and pass on. Secondary: the site owner (client), who will later manage 10 such sites from one dashboard.

## Product Purpose

The Paw Post is site 1 of a planned network of 10 news-style websites that publish original, clearly labelled fictional stories, produced later by an automated AI pipeline. This site covers animals: rescues, unusual animals, pets doing remarkable things, wild discoveries, and lucky finds. Success: readers finish stories, share them, and come back; every page works; nobody mistakes a story for real news.

## Positioning

A modern viral-news reading experience for invented animal stories that are honest about being fiction. Every story, card and share preview says so in code-rendered labels, so the site can chase viral reach without deceiving readers.

## Operating Context

- New stories arrive in batches (10 per batch, every 24h or 12h) once the engine exists; the homepage must always surface the newest batch and push older stories to categories and archives.
- Each story has: headline, dek, category, fictional author persona, publish date/time, reading time, hero image (AI-generated, captioned as such), body, related stories.
- Readers share from article pages; social previews must carry the fiction label.

## Capabilities and Constraints

- Pages: homepage (featured + latest), article pages with permanent URLs, category pages, search, archives, author (persona) pages, About, Contact, Privacy, Editorial Policy; RSS, sitemap.
- Label wording (confirmed): a "FICTION" tag plus "This story is fiction." under the headline, on every story, card and share preview. Labels are rendered by templates, never by story text, and cannot be turned off per story.
- No dummy links, broken pages, fake engagement counters (views, likes), fake testimonials or fabricated newsroom credentials. "Trending"-style lists only when backed by real data; until analytics exist use editor's picks.
- No real living people, real companies or real tragedies in stories. Nothing is deleted; old stories move to archives with real publish dates.
- Must look and work like a professional news publication; strong mobile experience.
- Undecided: contact inbox address; final domain.

## Brand Commitments

- Name: The Paw Post (confirmed by client).
- Visual style direction confirmed by client: modern viral-news (bold headlines, big photos, mobile-first), not a classic broadsheet or local-TV look.
- Reference sites (studied for technique only, never copied): see `/mnt/project-files/plan/reference-site-review.md`.

## Evidence on Hand

- No real readership data, testimonials, press or analytics. Do not fabricate any.
- Sample stories and images in this build are synthetic and labelled as fiction / AI illustration.

## Product Principles

1. Honest fiction: the label travels with the story everywhere it appears.
2. The story is the product: fast, readable, finishable on a phone.
3. Everything clickable works; nothing is decoration pretending to be a feature.
4. Built to scale to 10 sites from one codebase: brand lives in tokens and content, not forks.

## Accessibility & Inclusion

WCAG 2.2 AA target: contrast, alt text on every image, keyboard navigation, readable line length.
