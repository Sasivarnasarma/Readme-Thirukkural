import express, { type Express, type Request, type Response } from "express";
import { fetchKurals } from "./fetcher/fetch-kurals.js";
import { renderSVG } from "./renderer/render-svg.js";
import { parseQueryParams } from "./common/utils.js";
import type { QueryParams } from "./common/types.js";

const app: Express = express();
app.use(express.json());

async function generateSVGResponse(query: Partial<QueryParams>, res: Response) {
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

app.get("/", (_req, res) => res.redirect("https://github.com/Sasivarnasarma/Readme-Thirukkural"));

app.get("/api", (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
  generateSVGResponse(req.query, res);
});

const PORT = Number(process.env.PORT) || 3000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Server shutting down...");
  server.close(() => {
    console.log("Closed all connections. Exiting...");
    process.exit(0);
  });
});
