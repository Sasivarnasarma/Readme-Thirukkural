import { type VercelRequest, type VercelResponse } from "@vercel/node";
import { fetchKurals } from "./fetcher/fetch-kurals.js";
import { renderSVG } from "./renderer/render-svg.js";
import { parseQueryParams } from "./common/utils.js";
import type { QueryParams } from "./common/types.js";

async function generateSVGResponse(query: Partial<QueryParams>, res: VercelResponse) {
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
