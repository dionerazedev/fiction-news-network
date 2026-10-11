import { site } from "@/lib/site";

/** The fiction label. Rendered by templates only; stories cannot turn it off. */
export function FictionTag({ tone = "solid" }: { tone?: "solid" | "outline" }) {
  return <span className={`fiction-tag fiction-tag--${tone}`}>{site.label.tag}</span>;
}

export function FictionLine() {
  return (
    <p className="fiction-line">
      <FictionTag /> <span>{site.label.line}</span>
    </p>
  );
}
