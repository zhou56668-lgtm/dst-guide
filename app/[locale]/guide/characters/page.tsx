import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { GameImage } from "@/components/ui/GameImage";
import { characters } from "@/lib/game-data/characters";
import { localName } from "@/lib/i18n-utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

const diffVariants: Record<string, "green" | "gold" | "red"> = {
  beginner: "green",
  intermediate: "gold",
  advanced: "red",
  challenge: "red",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guide.characters");
  return {
    title: t("pageTitle"),
    description: t("pageDesc"),
  };
}

export default async function CharactersPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("guide.characters");
  const tc = await getTranslations("common");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: tc("guideCenter"), href: "/guide" }, { label: t("pageTitle") }]} />
      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-3">
        {t("pageTitle")}
      </h1>
      <p className="text-text-secondary mb-8 max-w-2xl">
        {t("pageDesc")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((c) => {
          const diffKey = c.difficulty;
          const diffVariant = diffVariants[diffKey] || "green";
          return (
            <Card key={c.id} href={`/guide/characters/${c.id}`} className="overflow-hidden !p-0">
              <div className="relative h-48">
                <GameImage
                  src={c.imagePath}
                  alt={localName(c, locale)}
                  variant="portrait"
                  className="!rounded-none !border-0 h-full"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={diffVariant}>{tc(`difficulty.${diffKey}`)}</Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold font-[family-name:var(--font-display)]">{localName(c, locale)}</h2>
                  <span className="text-xs text-text-muted">{locale === "en" ? c.name : c.nameEn}</span>
                </div>
                <p className="text-xs text-text-muted mb-2">{c.tagline}</p>
                <div className="flex gap-4 mb-2">
                  <StatBadge label={tc("stats.health")} value={c.stats.health} color="text-red-400" />
                  <StatBadge label={tc("stats.hunger")} value={c.stats.hunger} color="text-gold" />
                  <StatBadge label={tc("stats.sanity")} value={c.stats.sanity} color="text-purple-400" />
                </div>
                <p className="text-text-secondary text-sm line-clamp-2">{c.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function StatBadge({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <span className="text-xs text-text-muted">
      <span className={color}>{value}</span> {label}
    </span>
  );
}
