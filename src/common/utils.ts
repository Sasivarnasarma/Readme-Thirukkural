import { themes } from "../renderer/theme/awesome-card.js";
import { fetchKurals } from "../fetcher/fetch-kurals.js";
import { renderSVG } from "../renderer/render-svg.js";
import type { CardType } from "../renderer/render-svg.js";
import type { ParsedParams, QueryParams } from "./types.js";

export function parseQueryParams(query: Partial<QueryParams>): ParsedParams {
    const {
        type = "horizontal",
        theme = "default",
        kural = 0,
        lang = "tamil",
        border = "true",
        kuralColor,
        chapterColor,
        backgroundColor,
        symbolColor,
    } = query;

    const validatedType = (["horizontal", "vertical"] as const).includes(type as CardType)
        ? (type as CardType)
        : "horizontal";

    const validatedTheme = Object.keys(themes).includes(theme as string)
        ? (theme as keyof typeof themes)
        : "default";

    const validatedLang = (["english", "tamil"] as const).includes(lang as "english" | "tamil")
        ? (lang as "english" | "tamil")
        : "tamil";

    const borderBool = border !== "false" && border !== "0";

    const customColors = {
        kural: kuralColor ?? "",
        chapter: chapterColor ?? "",
        background: backgroundColor ?? "",
        symbol: symbolColor ?? "",
    };

    return {
        type: validatedType,
        theme: validatedTheme,
        kural: Number(kural),
        lang: validatedLang,
        borderBool,
        customColors,
    };
}

export async function generateSVG(query: Partial<QueryParams>): Promise<string> {
    const { type, theme, kural, lang, borderBool, customColors } = parseQueryParams(query);
    const data = await fetchKurals(lang, kural);
    return renderSVG(data, type, theme, borderBool, customColors);
}
