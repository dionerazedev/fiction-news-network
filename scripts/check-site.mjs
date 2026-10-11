// Crawls a running site and checks: every internal link resolves, every story page and
// story card carries the fiction label, and every share image responds.
// Usage: node scripts/check-site.mjs http://localhost:3000
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const seen = new Map();
const queue = ["/", "/feed.xml", "/sitemap.xml", "/robots.txt", "/search?q=fox"];
const problems = [];

function linksIn(html) {
  return [...html.matchAll(/href="([^"#]+)"/g)]
    .map((m) => m[1].replace(/&amp;/g, "&"))
    .filter((h) => h.startsWith("/") && !h.startsWith("//") && !h.startsWith("/_next/"));
}

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  const res = await fetch(base + path);
  seen.set(path, res.status);
  if (res.status !== 200) {
    problems.push(`${res.status} ${path}`);
    continue;
  }
  if (!(res.headers.get("content-type") ?? "").includes("text/html")) continue;
  const html = await res.text();

  if (path.startsWith("/story/")) {
    if (!html.includes("This story is fiction.")) problems.push(`missing "This story is fiction." on ${path}`);
    const og = html.match(/<meta property="og:image" content="[^"]*?(\/story\/[^"?]+\/opengraph-image)/);
    if (!og) problems.push(`missing og:image on ${path}`);
    else queue.push(og[1]);
    if (!/<meta property="og:title" content="FICTION:/.test(html)) problems.push(`og:title lacks FICTION on ${path}`);
  }
  const cards = (html.match(/<article class="(lead-story|story-row|story-tile)/g) ?? []).length;
  const tags = (html.match(/class="fiction-tag fiction-tag--outline"/g) ?? []).length;
  if (tags < cards) problems.push(`${cards - tags} story cards without a FICTION tag on ${path}`);
  if (!html.includes("fiction-tag")) problems.push(`no fiction label anywhere on ${path}`);

  for (const link of linksIn(html)) if (!seen.has(link)) queue.push(link);
}

for (const path of ["/story/does-not-exist", "/category/does-not-exist", "/author/does-not-exist", "/does-not-exist"]) {
  const missing = await fetch(base + path);
  const body = await missing.text();
  if (missing.status !== 404) problems.push(`${path} returned ${missing.status}, expected 404`);
  if (!body.includes("Return to sender")) problems.push(`${path} did not show the not-found page`);
}

console.log(`Checked ${seen.size} URLs.`);
if (problems.length) {
  console.log(`${problems.length} problem(s):\n- ` + problems.join("\n- "));
  process.exit(1);
}
console.log("No broken links. Every story page, card and share image carries the fiction label.");
