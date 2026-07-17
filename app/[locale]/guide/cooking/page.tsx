import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GameImage } from "@/components/ui/GameImage";
import { recipes } from "@/lib/game-data/recipes";
import { localName } from "@/lib/i18n-utils";
import { CookingPot } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guide.cooking");
  return {
    title: t("pageTitle"),
    description: t("pageDesc"),
  };
}

export default async function CookingPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("guide.cooking");
  const tc = await getTranslations("common.cookingLabels");
  const tf = await getTranslations("footer");
  const tg = await getTranslations("guide");
  const validRecipes = recipes.filter((r) => r.category !== "failure");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: tg("title"), href: "/guide" }, { label: t("pageTitle") }]} />

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-3">
            {t("pageTitle")}
          </h1>
          <p className="text-text-secondary max-w-2xl">
            {t("pageDesc")}
          </p>
        </div>
        <Button href="/tools/recipe" variant="secondary">
          <CookingPot className="w-4 h-4 mr-1" /> {tf("recipeCalc")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {validRecipes.map((r) => (
          <Card key={r.id} className="!p-0 overflow-hidden">
            <div className="relative h-32">
              <GameImage src={r.imagePath} alt={localName(r, locale)} variant="card" className="!rounded-none !border-0 h-full" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-text-primary font-[family-name:var(--font-display)] text-sm">{localName(r, locale)}</h3>
                <Badge variant={r.category === "health" ? "red" : r.category === "hunger" ? "gold" : "purple"}>
                  {tc(r.category === "health" ? "health" : r.category === "hunger" ? "hunger" : "sanity")}
                </Badge>
              </div>
              <div className="flex gap-3 text-xs mb-2">
                <span className="text-red-400">❤️ {r.stats.health > 0 ? "+" : ""}{r.stats.health}</span>
                <span className="text-gold">🍖 {r.stats.hunger > 0 ? "+" : ""}{r.stats.hunger}</span>
                <span className="text-purple-400">💜 {r.stats.sanity > 0 ? "+" : ""}{r.stats.sanity}</span>
              </div>
              <p className="text-text-secondary text-xs">{r.notes}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
