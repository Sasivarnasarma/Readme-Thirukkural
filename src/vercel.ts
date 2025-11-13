import { type VercelRequest, type VercelResponse } from "@vercel/node";
import { fetchKurals } from "./fetcher/fetch-kurals.js";
import { renderSVG } from "./renderer/render-svg.js";
import { themes } from "./renderer/theme/awesome-card.js";
import type { CardType } from "./renderer/render-svg.js";

interface QueryParams {
  type: CardType;
  theme: keyof typeof themes;
  kural: number;
  lang: "english" | "tamil";
  border: string;
  kuralColor?: string;
  chapterColor?: string;
  backgroundColor?: string;
  symbolColor?: string;
}

function parseQueryParams(query: QueryParams) {
  const {
    type,
    theme,
    kural,
    lang,
    border,
    kuralColor,
    chapterColor,
    backgroundColor,
    symbolColor,
  } = query;

  const borderBool = border !== "false" && border !== "0";

  const customColors = {
    kural: kuralColor ?? "",
    chapter: chapterColor ?? "",
    background: backgroundColor ?? "",
    symbol: symbolColor ?? "",
  };

  return { type, theme, kural, lang, borderBool, customColors };
}

async function generateSVGResponse(query: QueryParams, res: VercelResponse) {
  try {
    const { type, theme, kural, lang, borderBool, customColors } = parseQueryParams(query);
    const data = await fetchKurals(lang, kural);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=60");
    res.status(200).send(renderSVG(data, type, theme, borderBool, customColors));
  } catch (error) {
    console.error("Error generating SVG:", error);
    res.status(500).json({ error: "Failed to generate SVG" });
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const queryParams = req.query as unknown as QueryParams;
  generateSVGResponse(queryParams, res);
}
