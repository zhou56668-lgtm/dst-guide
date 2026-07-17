import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { characters } from "@/lib/game-data/characters";
import { getSkillTree } from "@/lib/game-data/skill-trees";
import { localName } from "@/lib/i18n-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AdSlot } from "@/components/ui/AdSlot";
import { GameImage } from "@/components/ui/GameImage";
import { SkillTreeView } from "@/components/ui/SkillTreeView";
import { Sword } from "lucide-react";
import type { Metadata } from "next";

interface Props { params: Promise<{ locale: string; slug: string }> }

const diffVariants: Record<string, "green" | "gold" | "red"> = {
  beginner: "green",
  intermediate: "gold",
  advanced: "red",
  challenge: "red",
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["zh", "en"]) {
    for (const c of characters) {
      params.push({ locale, slug: c.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const tc = await getTranslations("common");
  const c = characters.find((ch) => ch.id === slug);
  if (!c) return { title: tc("characterNotFound") };
  return {
    title: `${localName(c, locale)} - ${c.tagline}`,
    description: `${localName(c, locale)} (${c.nameEn}) ${c.description.substring(0, 120)}`,
  };
}

export default async function CharacterPage({ params }: Props) {
  const { locale, slug } = await params;
  const tc = await getTranslations("common");
  const tg = await getTranslations("guide.characters");
  const t = await getTranslations("common.characterProfile");
  const c = characters.find((ch) => ch.id === slug);
  if (!c) notFound();

  const diffKey = c.difficulty;
  const diffVariant = diffVariants[diffKey] || "green";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[
        { label: tc("guideCenter"), href: "/guide" },
        { label: tg("pageTitle"), href: "/guide/characters" },
        { label: localName(c, locale) },
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <GameImage src={c.imagePath} alt={localName(c, locale)} variant="portrait" className="max-w-xs mx-auto mb-6" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">{localName(c, locale)}</h1>
                <Badge variant={diffVariant}>{tc(`difficulty.${diffKey}`)}</Badge>
              </div>
              <p className="text-text-muted text-sm">{locale === "en" ? c.name : c.nameEn} — {c.tagline}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="card-dst p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{c.stats.health}</div>
              <div className="text-xs text-text-muted mt-1">{tc("stats.health")}</div>
            </div>
            <div className="card-dst p-4 text-center">
              <div className="text-2xl font-bold text-gold">{c.stats.hunger}</div>
              <div className="text-xs text-text-muted mt-1">{tc("stats.hunger")}</div>
            </div>
            <div className="card-dst p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{c.stats.sanity}</div>
              <div className="text-xs text-text-muted mt-1">{tc("stats.sanity")}</div>
            </div>
          </div>

          <div className="prose-dst mb-8">
            <h2>{t("intro")}</h2>
            <p>{c.description}</p>

            <h2>{t("abilities")}</h2>
            <div className="space-y-3">
              {c.perks.map((perk, i) => (
                <div key={i} className="card-dst p-4">
                  <h3 className="font-bold text-text-primary mb-1">{perk.name}</h3>
                  <p className="text-text-secondary text-sm">{perk.description}</p>
                </div>
              ))}
            </div>

            <h2>{t("quirks")}</h2>
            {c.quirks.length > 0 ? (
              <ul>
                {c.quirks.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            ) : (
              <p>{tc("noLimitations")}</p>
            )}

            <h2>{t("tips")}</h2>
            <ol>
              {c.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ol>

            {/* Skill Tree */}
            {getSkillTree(c.id) && (
              <SkillTreeView skillTree={getSkillTree(c.id)!} />
            )}

            <h2>{t("baseStats")}</h2>
            <table>
              <tbody>
                <tr><td>{tc("labels.unlock")}</td><td>{c.unlockMethod}</td></tr>
                <tr><td>{tc("labels.damageModifier")}</td><td>x{c.damageModifier}</td></tr>
                <tr><td>{tc("labels.bestFor")}</td><td>{c.bestFor.join("、")}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="card-dst p-5 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-text-primary">{t("calcDamage", { name: localName(c, locale) })}</h3>
                <p className="text-text-secondary text-sm">{t("calcDamageDesc")}</p>
              </div>
              <Button href="/tools/damage" variant="secondary" size="sm">
                <Sword className="w-4 h-4 mr-1" /> {tc("stats.health")}
              </Button>
            </div>
          </div>

          <AdSlot position="banner" />
        </div>

        <aside className="space-y-6">
          <div className="card-dst p-5">
            <h3 className="font-bold text-gold font-[family-name:var(--font-display)] mb-3">{t("charInfo")}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">{tc("difficulty.beginner")}</span>
                <Badge variant={diffVariant}>{tc(`difficulty.${diffKey}`)}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">{tc("labels.unlock")}</span>
                <span className="text-text-secondary">{c.unlockMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">{tc("labels.damageModifier")}</span>
                <span className="text-text-secondary">x{c.damageModifier}</span>
              </div>
            </div>
          </div>
          <AdSlot position="sidebar" />
        </aside>
      </div>
    </div>
  );
}
