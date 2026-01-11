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
    kuralColor: string | undefined;
    chapterColor: string | undefined;
    backgroundColor: string | undefined;
    symbolColor: string | undefined;
}

function parseQueryParams(url: URL): QueryParams {
    const params = url.searchParams;
    return {
        type: (params.get("type") as CardType) || "horizontal",
        theme: (params.get("theme") as keyof typeof themes) || "default",
        kural: Number(params.get("kural")) || 0,
        lang: (params.get("lang") as "english" | "tamil") || "tamil",
        border: params.get("border") ?? "true",
        kuralColor: params.get("kuralColor") ?? undefined,
        chapterColor: params.get("chapterColor") ?? undefined,
        backgroundColor: params.get("backgroundColor") ?? undefined,
        symbolColor: params.get("symbolColor") ?? undefined,
    };
}

function parseParams(query: QueryParams) {
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

async function generateSVGResponse(query: QueryParams): Promise<Response> {
    try {
        const { type, theme, kural, lang, borderBool, customColors } = parseParams(query);
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
            const queryParams = parseQueryParams(url);
            return generateSVGResponse(queryParams);
        }

        return new Response("Not Found", { status: 404 });
    },
};
