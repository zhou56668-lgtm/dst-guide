import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guide.beginner");
  return {
    title: t("pageTitle"),
    description: t("pageDesc"),
  };
}

export default async function BeginnerGuidePage() {
  const t = await getTranslations("guide.beginner");
  const tc = await getTranslations("common");
  const tg = await getTranslations("guide");

  const guides = [
    { slug: "first-days", difficulty: "beginner" as const },
    { slug: "four-seasons", difficulty: "beginner" as const },
    { slug: "sanity-management", difficulty: "beginner" as const },
    { slug: "base-building-101", difficulty: "intermediate" as const },
    { slug: "kiting-basics", difficulty: "intermediate" as const },
  ];

  // Display names map (same structure but locale-aware)
  const guideNames: Record<string, { title: string; description: string }> = {
    "first-days": {
      title: "前10天生存指南",
      description: "从第一天到第十天的完整生存路线图：采集资源、制作工具、建立临时基地、准备过冬。适合完全没玩过饥荒的新手。",
    },
    "four-seasons": {
      title: "四季生存完全攻略",
      description: "秋、冬、春、夏季的应对策略：保暖/降温装备、各季Boss应对、季节性资源获取。",
    },
    "sanity-management": {
      title: "理智值管理指南",
      description: "理智值的机制、提升和降低理智的方法、理智过低时的应对策略。",
    },
    "base-building-101": {
      title: "建家入门指南",
      description: "选址技巧、基地布局规划、核心建筑优先级、防火防巨鹿设计。",
    },
    "kiting-basics": {
      title: "战斗基础：走位教学",
      description: "饥荒战斗核心机制——走位打法（kiting）的基础教学。学会打2走1、打3走1等基本节奏。",
    },
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
        {guides.map((g) => {
          const info = guideNames[g.slug];
          return (
            <Card key={g.slug} href={`/guide/beginner/${g.slug}`}>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant={g.difficulty === "beginner" ? "green" : "gold"}>
                  {tc(`difficulty.${g.difficulty}`)}
                </Badge>
              </div>
              <h2 className="text-lg font-bold font-[family-name:var(--font-display)] mb-2">{info.title}</h2>
              <p className="text-text-secondary text-sm leading-relaxed">{info.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
