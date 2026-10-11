// Writes the list of story slugs the proxy uses to answer unknown story URLs with a 404.
import fs from "node:fs";

const slugs = fs
  .readdirSync("content/stories")
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""))
  .sort();
fs.writeFileSync("content/story-slugs.json", JSON.stringify(slugs, null, 2) + "\n");
console.log(`Listed ${slugs.length} story slugs.`);
