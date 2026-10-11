import type { ReactNode } from "react";
import type { Block } from "@/lib/stories";

/** Renders *emphasis* and **strong** without injecting HTML. */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const token = m[0];
    out.push(
      token.startsWith("**") ? (
        <strong key={m.index}>{token.slice(2, -2)}</strong>
      ) : (
        <em key={m.index}>{token.slice(1, -1)}</em>
      ),
    );
    last = m.index + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function StoryBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="story-body">
      {blocks.map((b, i) => {
        if (b.type === "h2") return <h2 key={i}>{inline(b.text)}</h2>;
        if (b.type === "quote")
          return (
            <blockquote key={i}>
              <p>{inline(b.text)}</p>
              {b.cite && <footer>{b.cite}</footer>}
            </blockquote>
          );
        return <p key={i}>{inline(b.text)}</p>;
      })}
    </div>
  );
}
