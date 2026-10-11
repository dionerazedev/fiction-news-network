/** The airmail envelope edge: red, white and navy chevrons. */
export function ChevronEdge({ className }: { className?: string }) {
  return <div className={["chevron-edge", className].filter(Boolean).join(" ")} aria-hidden="true" />;
}
