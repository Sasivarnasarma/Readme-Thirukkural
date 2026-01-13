import { fetchKurals } from "./fetcher/fetch-kurals.js";
import { renderSVG } from "./renderer/render-svg.js";
import { parseQueryParams } from "./common/utils.js";
import type { QueryParams } from "./common/types.js";

async function generateSVGResponse(query: Partial<QueryParams>): Promise<Response> {
    try {
        const { type, theme, kural, lang, borderBool, customColors } = parseQueryParams(query);
        const data = await fetchKurals(lang, kural);

        return new Response(renderSVG(data, type, theme, borderBool, customColors), {
            status: 200,
            headers: {
                "Content-Type": "image/svg+xml",
                "Cache-Control": "public, max-age=60",
            },
        });
    } catch (error) {
        console.error("Error generating SVG:", error);
        return new Response(JSON.stringify({ error: "Failed to generate SVG" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export default {
    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url);

        if (url.pathname === "/") {
            return Response.redirect("https://github.com/Sasivarnasarma/Readme-Thirukkural", 302);
        }

        if (url.pathname === "/api") {
            const queryParams = Object.fromEntries(url.searchParams) as any;
            return generateSVGResponse(queryParams);
        }

        return new Response("Not Found", { status: 404 });
    },
};
