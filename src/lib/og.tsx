import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };

const ROUTE_COLORS: Record<string, string> = {
  rescues: "#c8202f",
  "pet-heroes": "#1f4e9c",
  "strange-creatures": "#b3306b",
  "wild-discoveries": "#24704a",
  "lucky-finds": "#c48a12",
};

export async function ogFonts() {
  const dir = join(process.cwd(), "node_modules/@fontsource/archivo/files");
  const [w700, w900] = await Promise.all([
    readFile(join(dir, "archivo-latin-700-normal.woff")),
    readFile(join(dir, "archivo-latin-900-normal.woff")),
  ]);
  return [
    { name: "Archivo", data: w700, weight: 700 as const, style: "normal" as const },
    { name: "Archivo", data: w900, weight: 900 as const, style: "normal" as const },
  ];
}

function Chevrons() {
  const stripes = Array.from({ length: 44 }, (_, i) => i);
  return (
    <svg width="1200" height="18" viewBox="0 0 1200 18">
      <rect width="1200" height="18" fill="#ffffff" />
      {stripes.map((i) => (
        <polygon
          key={i}
          points={`${i * 30},18 ${i * 30 + 12},18 ${i * 30 + 30},0 ${i * 30 + 18},0`}
          fill={i % 2 === 0 ? "#c8202f" : "#16234a"}
        />
      ))}
    </svg>
  );
}

/** Share card: the FICTION label is always part of the picture, not just the text. */
export function OgCard({ title, route, kicker }: { title: string; route?: string; kicker?: string }) {
  const accent = (route && ROUTE_COLORS[route]) || "#c8202f";
  const size = title.length > 110 ? 50 : title.length > 80 ? 58 : 66;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#16234a", fontFamily: "Archivo" }}>
      <Chevrons />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "44px 64px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 900, color: "#ffffff", letterSpacing: -1 }}>THE PAW POST</div>
          <div style={{ display: "flex", background: "#c8202f", color: "#ffffff", fontSize: 30, fontWeight: 900, letterSpacing: 4, padding: "10px 18px 8px" }}>
            {site.label.tag}
          </div>
        </div>
        <div style={{ display: "flex", width: 120, height: 10, background: accent, marginTop: 34 }} />
        {kicker ? (
          <div style={{ display: "flex", color: "#c9d1e8", fontSize: 26, fontWeight: 700, marginTop: 18 }}>{kicker}</div>
        ) : null}
        <div style={{ display: "flex", color: "#ffffff", fontSize: size, fontWeight: 900, lineHeight: 1.05, letterSpacing: -1, marginTop: 14 }}>
          {title}
        </div>
        <div style={{ display: "flex", marginTop: "auto", color: "#ffb3b9", fontSize: 28, fontWeight: 700 }}>
          {site.label.line} Invented for entertainment.
        </div>
      </div>
      <Chevrons />
    </div>
  );
}
