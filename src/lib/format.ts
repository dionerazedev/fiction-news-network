const TZ = "America/New_York";

function parts(iso: string, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...opts }).format(new Date(iso));
}

/** "October 11, 2026" */
export function longDate(iso: string) {
  return parts(iso, { month: "long", day: "numeric", year: "numeric" });
}

/** "Sunday, October 11, 2026" */
export function editionDate(iso: string) {
  return parts(iso, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

/** "Oct 11, 2026" */
export function shortDate(iso: string) {
  return parts(iso, { month: "short", day: "numeric", year: "numeric" });
}

/** "8:15 AM" */
export function clockTime(iso: string) {
  return parts(iso, { hour: "numeric", minute: "2-digit" });
}

/** "OCT 11" and "2026" for the postmark. */
export function postmarkParts(iso: string) {
  return {
    day: parts(iso, { month: "short", day: "numeric" }).toUpperCase(),
    year: parts(iso, { year: "numeric" }),
    time: clockTime(iso),
  };
}

/** Calendar day key in Eastern time, e.g. "2026-10-11". */
export function dayKey(iso: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date(iso));
}
