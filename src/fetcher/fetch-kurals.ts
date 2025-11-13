import thirukkuralData from "../../data/Thirukkural.json" with { type: "json" };

interface Chapter {
  Index: number;
  Tamil: string;
  English: string;
  Transliteration: string;
}

interface Kural {
  Index: number;
  Tamil: string[];
  English: string[];
  TamilTransliteration: string[];
  Chapter: Chapter;
}

interface ParseDataReturn {
  kural: string;
  chapter: string;
}

const parseData = (kural_data: Kural, language: string): ParseDataReturn => {
  const getKuralText = language === "english" ? kural_data.English : kural_data.Tamil;
  const getChapterText =
    language === "english" ? kural_data.Chapter.English : kural_data.Chapter.Tamil;

  const kural = `${getKuralText[0]} <span> </span> ${getKuralText[1]}`;
  const chapter = `${getChapterText} (${kural_data.Chapter.Index}:${kural_data.Index})`;

  return { kural, chapter };
};

export async function fetchKurals(
  language: "english" | "tamil" = "tamil",
  index?: number,
): Promise<ParseDataReturn> {
  try {
    const data = thirukkuralData as Kural[];

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No Thirukkural data found.");
    }

    if (!index || index < 1 || index > data.length) {
      index = Math.floor(Math.random() * data.length) + 1;
    }

    const selectedKural = data[index - 1];
    if (!selectedKural) {
      throw new Error("No Thirukkural data available.");
    }
    return parseData(selectedKural, language);
  } catch (error) {
    console.error("Error fetching Thirukkural:", error);
    throw new Error("Failed to fetch Thirukkural.");
  }
}
