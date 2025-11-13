import themesData from "../../../data/themes.json" with { type: "json" };

export interface Theme {
  kural: string;
  chapter: string;
  background: string;
  symbol: string;
}

export interface CustomColors {
  kural?: string;
  chapter?: string;
  background?: string;
  symbol?: string;
}

export const themes: Record<string, Theme> = themesData;

export const renderTheme = (
  theme: keyof typeof themes = getRandomTheme(),
  customColors?: CustomColors
): Theme => {
  const baseTheme = themes[theme] || themes[getRandomTheme()];

  if (!baseTheme) {
    throw new Error(`Theme '${theme}' or random theme could not be found.`);
  }

  return {
    kural: customColors?.kural || baseTheme.kural,
    chapter: customColors?.chapter || baseTheme.chapter,
    background: customColors?.background || baseTheme.background,
    symbol: customColors?.symbol || baseTheme.symbol,
  };
};

function getRandomTheme(): keyof typeof themes {
  const themeKeys = Object.keys(themes) as (keyof typeof themes)[];
  if (themeKeys.length === 0) {
    return "light";
  } else {
    return themeKeys[Math.floor(Math.random() * themeKeys.length)]!;
  }
}

export const getThemeStyles = (color: Theme, border: boolean): string => {
  const borderColor = border ? `3px solid #${color.symbol}` : "1px solid rgba(0, 0, 0, 0.2)";

  return `
    .container {
      background-color: #${color.background};
      border: ${borderColor};
    }
    .container h3 {
      color: #${color.kural};
    }
    .container h3::before, .container h3::after {
      color: #${color.symbol};
    }
    .container p {
      color: #${color.chapter};
    }
  `;
};
