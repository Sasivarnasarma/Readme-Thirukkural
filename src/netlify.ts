import type { Context } from "@netlify/functions";
import { generateSVG } from "./common/utils.js";
import type { QueryParams } from "./common/types.js";

async function generateSVGResponse(query: Partial<QueryParams>): Promise<Response> {
    try {
        const svg = await generateSVG(query);

        return new Response(svg, {
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

export default async (request: Request, _context: Context): Promise<Response> => {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams) as Partial<QueryParams>;
    return generateSVGResponse(queryParams);
};
