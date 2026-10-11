# The Paw Post

Site 1 of the fiction news network: invented animal stories with a modern viral-news look. Every story, person and place is fiction, and every page, card and share image says so.

This is the site only. Stories are Markdown files in `content/stories/`; the AI writing and image engine comes later.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
npm run check -- http://localhost:3000   # checks links, fiction labels and 404s on a running site
```

Requires Node 20 or newer.

## Where things live

- `content/site.json`: site name, fiction label wording, categories and the fictional author personas
- `content/stories/*.md`: one story per file (title, dek, category, author, publishedAt, animal, imageAlt)
- `public/images/stories/{slug}.webp|jpg|png`: story illustrations. A story without one shows a temporary colour panel.
- `src/app/`: pages (home, story, category, author, archive, search, about, editorial policy, contact, privacy), share images, RSS, sitemap
- `src/proxy.ts`: returns a real 404 for unknown story, category and author links
- `DESIGN.md` and `PRODUCT.md`: the design system and product rules

## Before going public

- `robots.ts` blocks all crawlers and the layout sets `noindex` while this is a preview. Remove both at launch.
- Set the real domain in `content/site.json` (`url`) and a contact address (`contactEmail`).
