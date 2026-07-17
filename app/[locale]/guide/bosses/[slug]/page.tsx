import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { bosses } from "@/lib/game-data/bosses";
import { localName } from "@/lib/i18n-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { AdSlot } from "@/components/ui/AdSlot";
import { GameImage } from "@/components/ui/GameImage";
import type { Metadata } from "next";

interface Props { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["zh", "en"]) {
    for (const b of bosses) {
      params.push({ locale, slug: b.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const tc = await getTranslations("common");
  const b = bosses.find((boss) => boss.id === slug);
  if (!b) return { title: tc("bossNotFound") };
  return {
    title: `${localName(b, locale)} - DST Boss Guide`,
    description: `${localName(b, locale)} (${b.nameEn}) ${b.description.substring(0, 120)}`,
  };
}

// Season labels (Chinese data)
const seasonLabels: Record<string, string> = {
  autumn: "秋季", winter: "冬季", spring: "春季", summer: "夏季", any: "任意季节",
};

export default async function BossPage({ params }: Props) {
  const { locale, slug } = await params;
  const tc = await getTranslations("common");
  const tg = await getTranslations("guide.bosses");
  const t = await getTranslations("common.bossProfile");
  const b = bosses.find((boss) => boss.id === slug);
  if (!b) notFound();

  const seasonText = seasonLabels[b.season] || b.season;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[
        { label: tc("guideCenter"), href: "/guide" },
        { label: tg("pageTitle"), href: "/guide/bosses" },
        { label: localName(b, locale) },
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <GameImage src={b.imagePath} alt={localName(b, locale)} variant="banner" className="w-full h-48" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">{localName(b, locale)}</h1>
            <Badge variant="default">{seasonText}</Badge>
          </div>
          <p className="text-text-muted text-sm mb-6">{locale === "en" ? b.name : b.nameEn}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <div className="card-dst p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{b.health.toLocaleString()}{b.healthNote && <span className="text-xs text-text-muted">*</span>}</div>
              <div className="text-xs text-text-muted mt-1">{tc("stats.health")}</div>
            </div>
            <div className="card-dst p-4 text-center">
              <div className="text-2xl font-bold text-gold">{b.damage}</div>
              <div className="text-xs text-text-muted mt-1">{tc("labels.damage")}</div>
            </div>
            <div className="card-dst p-4 text-center">
              <div className="text-2xl font-bold text-text-primary">{b.minPlayersRecommended}</div>
              <div className="text-xs text-text-muted mt-1">{tc("labels.playersRecommended")}</div>
            </div>
          </div>

          <div className="prose-dst">
            <h2>{t("intro")}</h2>
            <p>{b.description}</p>

            <h2>{t("spawn")}</h2>
            <p>{b.spawnConditions}</p>

            <h2>{t("attackPattern")}</h2>
            <ul>
              {b.attackPattern.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>

            <h2>{t("kiting")}</h2>
            <p><strong>{t("kitingRhythm")}</strong>{b.kitingPattern}</p>

            <h2>{t("drops")}</h2>
            <table>
              <thead>
                <tr><th>{tc("labels.item")}</th><th>{tc("labels.quantity")}</th><th>{tc("labels.probability")}</th></tr>
              </thead>
              <tbody>
                {b.drops.map((d, i) => (
                  <tr key={i}>
                    <td>{d.itemName}</td>
                    <td>{d.quantity}</td>
                    <td>{tc(`labels.${d.dropRate}`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>{t("strategy")}</h2>
            <p>{b.strategy}</p>

            <h2>{t("keyInfo")}</h2>
            <table>
              <tbody>
                <tr><td>{tc("labels.season")}</td><td>{seasonText}</td></tr>
                <tr><td>{tc("labels.location")}</td><td>{b.location}</td></tr>
                <tr><td>{tc("labels.playersRecommended")}</td><td>{b.minPlayersRecommended}{tc("labels.playersRecommended")}</td></tr>
              </tbody>
            </table>
          </div>

          <AdSlot position="banner" />
        </div>

        <aside className="space-y-6">
          <div className="card-dst p-5">
            <h3 className="font-bold text-gold font-[family-name:var(--font-display)] mb-3">{t("quickRef")}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">{tc("stats.health")}</span>
                <span className="text-red-400">{b.health.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">{tc("labels.damage")}</span>
                <span className="text-gold">{b.damage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">{tc("labels.season")}</span>
                <Badge variant="default">{seasonText}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">{t("kiting")}</span>
                <span className="text-text-secondary">{b.kitingPattern}</span>
              </div>
            </div>
          </div>
          <AdSlot position="sidebar" />
        </aside>
      </div>
    </div>
  );
}
