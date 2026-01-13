import type { CardType } from "../renderer/render-svg.js";
import type { themes } from "../renderer/theme/awesome-card.js";

export interface CustomColors {
    kural?: string;
    chapter?: string;
    background?: string;
    symbol?: string;
}

export interface QueryParams {
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

export interface ParsedParams {
    type: CardType;
    theme: keyof typeof themes;
    kural: number;
    lang: "english" | "tamil";
    borderBool: boolean;
    customColors: CustomColors;
}
