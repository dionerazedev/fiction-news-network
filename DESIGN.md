---
name: The Paw Post
description: Invented animal stories worth sharing, styled as a modern viral-news site with a clear fiction label.
colors:
  navy: "#16234a"
  navy-deep: "#0e1733"
  red: "#c8202f"
  red-deep: "#a3141f"
  ground: "#ffffff"
  ground-alt: "#eef1f7"
  ink: "#151a2c"
  ink-soft: "#454c63"
  rule: "#d5dae6"
  route-rescues: "#c8202f"
  route-rescues-ink: "#a3141f"
  route-pet-heroes: "#1f4e9c"
  route-pet-heroes-ink: "#1a4385"
  route-strange-creatures: "#b3306b"
  route-strange-creatures-ink: "#9a2759"
  route-wild-discoveries: "#24704a"
  route-wild-discoveries-ink: "#1d5e3d"
  route-lucky-finds: "#c48a12"
  route-lucky-finds-ink: "#7d5500"
typography:
  wordmark:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 9vw, 5.25rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 75"
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 5.2vw, 3.6rem)"
    fontWeight: 850
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 87.5"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 4.6vw, 3.1rem)"
    fontWeight: 850
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "25px"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.65
  dek:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(19px, 2.2vw, 22px)"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  tag: "2px"
  control: "4px"
spacing:
  gutter-mobile: "16px"
  gutter-desktop: "32px"
  max: "1240px"
  measure: "40rem"
components:
  fiction-tag:
    backgroundColor: "{colors.red}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "4px 6px 3px"
  fiction-tag-outline:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.red-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "4px 6px 3px"
  masthead:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.ground}"
  footer:
    backgroundColor: "{colors.navy-deep}"
    textColor: "{colors.ground}"
  button-share:
    backgroundColor: "{colors.ground-alt}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
  search-input:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
---

# Design System: The Paw Post

## Overview

**Creative North Star: "Airmail"** (provisional: the direction card is still waiting on the owner's pick)

The Paw Post reads like a bold, mobile-first viral-news site that arrives as mail. Each day's batch is a "delivery". Categories are "routes", each with its own stamp colour. The site has one airmail chevron edge at the very top and bottom of every page, and a postmark that carries the story's real publish time. The palette is navy and red on white. Headlines are condensed and heavy, and the reading text is a calm serif at a comfortable measure.

The fiction label is part of the brand, not a disclaimer bolted on. A red FICTION tag sits in the masthead, on every card and at the top and end of every story. Every share image says "This story is fiction."

**Key Characteristics:**
- Navy and red, white ground, and one colour per route
- Condensed, heavy Archivo for headlines and a Source Serif 4 reading column
- Chevron edges only at the masthead top and the footer bottom
- Big images first, with headlines that fill the width on mobile
- The fiction label appears on every surface where a story appears

## Colors

The palette is a postal navy and an airmail red, with five route colours that tint each category's sections.

- **Navy (#16234a) and Navy Deep (#0e1733):** masthead, footer, headline ink.
- **Red (#c8202f) and Red Deep (#a3141f):** the FICTION tag, the active nav underline and the chevron. Red Deep is used for small red text so it passes contrast.
- **Ground (#ffffff) and Ground Alt (#eef1f7):** page and alternating route sections.
- **Ink (#151a2c), Ink Soft (#454c63) and Rule (#d5dae6):** body text, deks and meta, and hairlines.
- **Route colours:** each category sets `--route` (fills, stamps, temporary panels) and `--route-ink` (text on white) through `[data-route]`. Lucky Finds gold uses a dark ink (#7d5500) for text and navy text on its panels, because white on gold fails contrast.

## Typography

**Display Font:** Archivo (variable width), with Helvetica Neue and Arial as fallbacks
**Body Font:** Source Serif 4, with Georgia as a fallback

Headlines use Archivo at weights 800 to 900, narrowed with the width axis (75% for the wordmark, about 87.5% for story titles) and with tight negative tracking and `text-wrap: balance`. Route names and page titles are uppercase. Story text is Source Serif 4 at 19px with 1.65 line height, held to a 40rem measure (about 65 to 75 characters). The first paragraph opens with a condensed drop cap in the route ink colour. Pull quotes switch back to Archivo in the route ink. Only the FICTION tag and footer column headings use spaced uppercase.

## Layout

The page width is capped at 1240px, with a 16px gutter on mobile and 32px from tablet up. The home page leads with one big story and a side rail called "Also in today's delivery". Below that come five route sections, alternating white and Ground Alt, with the big tile switching sides from one section to the next (the `--flip` modifier), then an "Earlier deliveries" river. On a story page, a full-bleed image on mobile sits above a single centred reading column, followed by an author box, next story and related tiles. Nothing scrolls sideways at 390px.

## Elevation & Depth

The design is flat. Depth comes from tonal sections (white against Ground Alt) and the navy masthead and footer, not from shadows. The only inset shadow is the outline FICTION tag's 1.5px ring.

## Shapes

Corners are nearly square: 2px on tags and 4px on buttons and inputs, and images have no rounding. The recurring forms are the diagonal airmail chevron, the square route stamp (a 10px colour square beside the route name) and the circular postmark with text on a path.

## Components

- **FICTION tag:** a solid red version in the masthead and story header, and an outline version in card meta. It is never hidden or shrunk below 11px.
- **Story cards:** LeadStory, StoryRow and StoryTile. Each has its image, then a meta line (FICTION tag, route stamp, date), then the headline, then the dek on larger sizes.
- **Story image:** an AI illustration with the caption "AI-generated illustration". Until images exist, a temporary panel in the route colour shows the animal name with the note "Illustration coming soon".
- **Postmark:** an SVG circle with the delivery date and time on curved text.
- **Share bar:** Facebook, X, WhatsApp and Copy link, using brand icons on Ground Alt buttons.
- **Masthead:** chevron edge, edition date, wordmark, fiction notice with a "How we work" link, then the route nav with colour underlines and search.

## Do's and Don'ts

- **Do** keep the FICTION tag on every card, story and share image, and keep "This story is fiction." on every story page.
- **Do** use route ink, not the route fill, for coloured text on white.
- **Do** keep reading text at or under the 40rem measure.
- **Don't** add an eyebrow or kicker label above headings. The meta line goes below the image instead.
- **Don't** use gradient text, side-stripe borders or purple "AI" palettes.
- **Don't** repeat the chevron inside the page. It belongs only at the masthead and footer edges.
- **Don't** present personas as real reporters. Bylines say "(fictional persona)".
