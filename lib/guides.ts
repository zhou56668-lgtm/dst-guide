import fs from "fs";
import path from "path";

export interface GuideContent {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  sections: { heading: string; content: string }[];
}

export function getGuideContent(
  category: string,
  slug: string,
  locale: string
): GuideContent | null {
  // Try locale-specific file first, fall back to zh
  for (const loc of [locale, "zh"]) {
    const filePath = path.join(
      process.cwd(),
      "content",
      loc,
      category,
      `${slug}.json`
    );
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(raw) as GuideContent;
      }
    } catch {
      // continue to fallback
    }
  }
  return null;
}

export function getAllGuideSlugs(category: string): string[] {
  const dir = path.join(process.cwd(), "content", "zh", category);
  try {
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));
  } catch {
    return [];
  }
}
