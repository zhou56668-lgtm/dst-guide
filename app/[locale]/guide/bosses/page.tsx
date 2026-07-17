import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { GameImage } from "@/components/ui/GameImage";
import { bosses } from "@/lib/game-data/bosses";
import { localName } from "@/lib/i18n-utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

const seasonKeys: Record<string, "autumn" | "winter" | "spring" | "summer" | "any"> = {
  autumn: "autumn",
  winter: "winter",
  spring: "spring",
  summer: "summer",
  any: "any",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guide.bosses");
  return {
    title: t("pageTitle"),
    description: t("pageDesc"),
  };
}

export default async function BossesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("guide.bosses");
  const tc = await getTranslations("common");
  const tg = await getTranslations("guide");

  // Season labels in Chinese (data is Chinese-only for now)
  const seasonLabels: Record<string, string> = {
    autumn: "秋季", winter: "冬季", spring: "春季", summer: "夏季", any: "任意",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: tg("title"), href: "/guide" }, { label: t("pageTitle") }]} />
      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-3">
        {t("pageTitle")}
      </h1>
      <p className="text-text-secondary mb-8 max-w-2xl">
        {t("pageDesc")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bosses.map((b) => (
          <Card key={b.id} href={`/guide/bosses/${b.id}`} className="overflow-hidden !p-0">
            <div className="relative h-40">
              <GameImage
                src={b.imagePath}
                alt={localName(b, locale)}
                variant="banner"
                className="!rounded-none !border-0 h-full"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Badge variant="default">{seasonLabels[b.season]}</Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-bold font-[family-name:var(--font-display)]">{localName(b, locale)}</h2>
                <span className="text-xs text-text-muted">{locale === "en" ? b.name : b.nameEn}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-red-400 font-bold">{b.health.toLocaleString()}</div>
                  <div className="text-xs text-text-muted">{tc("stats.health")}</div>
                </div>
                <div>
                  <div className="text-gold font-bold">{b.damage}</div>
                  <div className="text-xs text-text-muted">{tc("labels.damage")}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {b.drops.slice(0, 3).map((d, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded bg-bg-tertiary text-text-secondary border border-border">
                    {d.itemName}
                  </span>
                ))}
              </div>
              <p className="text-text-secondary text-sm line-clamp-2">{b.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
