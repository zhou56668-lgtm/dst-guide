import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BookOpen, Users, Skull, CookingPot, Wrench, Puzzle } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guide");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function GuidePage() {
  const t = await getTranslations("guide");

  const sections = [
    { href: "/guide/beginner", icon: BookOpen, color: "text-green-400", key: "beginner" as const },
    { href: "/guide/characters", icon: Users, color: "text-gold", key: "characters" as const },
    { href: "/guide/bosses", icon: Skull, color: "text-red-400", key: "bosses" as const },
    { href: "/guide/cooking", icon: CookingPot, color: "text-purple-400", key: "cooking" as const },
    { href: "/tools", icon: Wrench, color: "text-blue-400", key: "tools" as const },
    { href: "/mods", icon: Puzzle, color: "text-cyan-400", key: "mods" as const },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: t("title") }]} />
      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-3">
        {t("title")}
      </h1>
      <p className="text-text-secondary mb-8 max-w-2xl">
        {t("subtitle")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((s) => (
          <Card key={s.href} href={s.href}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg bg-bg-tertiary ${s.color}`}>
                <s.icon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-[family-name:var(--font-display)] mb-1">
                  {t(`${s.key}.title`)}
                </h2>
                <p className="text-text-secondary text-sm">{t(`${s.key}.desc`)}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
