import { postmarkParts } from "@/lib/format";

type Props = { iso: string; size?: number; className?: string };

/** Circular postmark that carries a story's real publish date and time. */
export function Postmark({ iso, size = 112, className }: Props) {
  const { day, year, time } = postmarkParts(iso);
  const id = `pm-${iso.replace(/[^0-9]/g, "")}`;
  return (
    <svg
      className={["postmark", className].filter(Boolean).join(" ")}
      width={size * 1.9}
      height={size}
      viewBox="0 0 190 100"
      role="img"
      aria-label={`Published ${day} ${year} at ${time} Eastern`}
    >
      <defs>
        <path id={`${id}-top`} d="M 14 50 A 36 36 0 0 1 86 50" />
        <path id={`${id}-bot`} d="M 9 50 A 41 41 0 0 0 91 50" />
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="50" cy="50" r="31" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text className="postmark__ring" fontSize="9.5" letterSpacing="1.6">
        <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
          THE PAW POST
        </textPath>
      </text>
      <text className="postmark__ring" fontSize="9" letterSpacing="1.4">
        <textPath href={`#${id}-bot`} startOffset="50%" textAnchor="middle">
          {`${time} ET`}
        </textPath>
      </text>
      <text x="50" y="49" textAnchor="middle" className="postmark__day" fontSize="15">
        {day}
      </text>
      <text x="50" y="64" textAnchor="middle" className="postmark__year" fontSize="11">
        {year}
      </text>
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M 102 34 q 10 -6 20 0 t 20 0 t 20 0 t 20 0" />
        <path d="M 104 50 q 10 -6 20 0 t 20 0 t 20 0 t 20 0" />
        <path d="M 102 66 q 10 -6 20 0 t 20 0 t 20 0 t 20 0" />
      </g>
    </svg>
  );
}
