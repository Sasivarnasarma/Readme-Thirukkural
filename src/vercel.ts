import { type VercelRequest, type VercelResponse } from "@vercel/node";
import { generateSVG } from "./common/utils.js";
import type { QueryParams } from "./common/types.js";

async function generateSVGResponse(query: Partial<QueryParams>, res: VercelResponse) {
  try {
    const svg = await generateSVG(query);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=60");
    res.status(200).send(svg);
  } catch (error) {
    console.error("Error generating SVG:", error);
    res.status(500).json({ error: "Failed to generate SVG" });
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const queryParams = req.query as unknown as Partial<QueryParams>;
  generateSVGResponse(queryParams, res);
}
