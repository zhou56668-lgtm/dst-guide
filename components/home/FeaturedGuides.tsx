import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, Users, Skull, CookingPot } from "lucide-react";

export async function FeaturedGuides() {
  const t = await getTranslations("home.featured");

  const featured = [
    {
      title: t("beginner1Title"),
      description: t("beginner1Desc"),
      href: "/guide/beginner/first-days",
      icon: BookOpen,
      category: "新手入门",
      categoryVariant: "green" as const,
    },
    {
      title: t("beginner2Title"),
      description: t("beginner2Desc"),
      href: "/guide/beginner/four-seasons",
      icon: BookOpen,
      category: "新手入门",
      categoryVariant: "green" as const,
    },
    {
      title: t("charactersTitle"),
      description: t("charactersDesc"),
      href: "/guide/characters",
      icon: Users,
      category: "角色攻略",
      categoryVariant: "gold" as const,
    },
    {
      title: t("bossesTitle"),
      description: t("bossesDesc"),
      href: "/guide/bosses",
      icon: Skull,
      category: "Boss攻略",
      categoryVariant: "red" as const,
    },
    {
      title: t("cookingTitle"),
      description: t("cookingDesc"),
      href: "/guide/cooking",
      icon: CookingPot,
      category: "食谱配方",
      categoryVariant: "purple" as const,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-3">
          {t("title")}
        </h2>
        <p className="text-text-secondary max-w-lg mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((item) => (
          <Card key={item.href} href={item.href}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-bg-tertiary flex-shrink-0">
                <item.icon className="w-6 h-6 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={item.categoryVariant}>{item.category}</Badge>
                </div>
                <h3 className="font-semibold text-text-primary text-lg mb-2 font-[family-name:var(--font-display)]">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
