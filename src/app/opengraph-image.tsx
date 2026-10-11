import { ImageResponse } from "next/og";
import { OgCard, ogFonts, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "The Paw Post: invented animal stories, all fiction";

export default async function Image() {
  return new ImageResponse(<OgCard title={`${site.tagline}.`} />, { ...ogSize, fonts: await ogFonts() });
}
