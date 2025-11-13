import { renderTheme, themes } from "./theme/awesome-card.js";
import { renderHorizontal } from "./type/horizontal-card.js";
import { renderVertical } from "./type/vertical-card.js";

export type CardType = "vertical" | "horizontal";

export interface CustomColors {
  kural?: string;
  chapter?: string;
  background?: string;
  symbol?: string;
}

export const renderSVG = (
  { kural, chapter }: { kural: string; chapter: string },
  type: CardType = "horizontal",
  theme: keyof typeof themes,
  border: boolean,
  customColors?: CustomColors
) => {
  const color = renderTheme(theme, customColors);

  const renderCard = type === "vertical" ? renderVertical : renderHorizontal;

  return renderCard({ kural, chapter, color, border });
};
