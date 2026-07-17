import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("mods");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ModsPage() {
  const t = await getTranslations("mods");

  const mods = [
    { name: "Combined Status", nameCn: "状态显示强化", description: "在屏幕上显示详细的数值信息：体温、季节时钟、月相、三维数值等。必备Mod第一名。", category: "界面优化", steamId: "376333686", priority: "essential" as const },
    { name: "Geometric Placement", nameCn: "几何种植", description: "显示网格辅助线，让你精确放置建筑和植物。强迫症玩家必备。", category: "建筑辅助", steamId: "351325790", priority: "essential" as const },
    { name: "Global Positions", nameCn: "全球定位", description: "在大地图上显示队友位置，并且可以共享地图探索进度。多人联机必装。", category: "多人协作", steamId: "378160973", priority: "recommended" as const },
    { name: "Health Info", nameCn: "血量显示", description: "显示生物的具体生命值，不用再猜怪物还剩多少血。", category: "界面优化", steamId: "375859599", priority: "essential" as const },
    { name: "Minimap HUD", nameCn: "小地图HUD", description: "在屏幕角落显示一个小地图，不用频繁打开大地图。", category: "界面优化", steamId: "758532836", priority: "recommended" as const },
    { name: "Craft Pot", nameCn: "智能烹饪锅", description: "站在烹饪锅旁边时，显示你可能做出的食物。类似本站的食谱计算器功能。", category: "功能增强", steamId: "727774324", priority: "recommended" as const },
    { name: "Wormhole Marks", nameCn: "虫洞标记", description: "自动标记虫洞的颜色对，让你知道每个虫洞通向哪里。", category: "地图辅助", steamId: "362175979", priority: "recommended" as const },
    { name: "Show Me", nameCn: "信息显示", description: "按住Alt键显示各种物品的详细信息，包括食物属性、燃料值、食谱配方等。", category: "信息查询", steamId: "666356465", priority: "essential" as const },
  ];

  const essential = mods.filter((m) => m.priority === "essential");
  const recommended = mods.filter((m) => m.priority === "recommended");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: t("title") }]} />
      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-3">
        {t("title")}
      </h1>
      <p className="text-text-secondary mb-8 max-w-2xl">
        {t("subtitle")}
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gold font-[family-name:var(--font-display)] mb-4">{t("essential")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {essential.map((m) => (
            <Card key={m.steamId}>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold">{m.nameCn}</h3>
                <Badge variant="red">{t("badgeEssential")}</Badge>
                <Badge>{m.category}</Badge>
              </div>
              <p className="text-text-secondary text-sm mb-2">{m.description}</p>
              <p className="text-xs text-text-muted">
                {m.name} · Steam ID: {m.steamId}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gold font-[family-name:var(--font-display)] mb-4">{t("recommended")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommended.map((m) => (
            <Card key={m.steamId}>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold">{m.nameCn}</h3>
                <Badge variant="gold">{t("badgeRecommended")}</Badge>
                <Badge>{m.category}</Badge>
              </div>
              <p className="text-text-secondary text-sm mb-2">{m.description}</p>
              <p className="text-xs text-text-muted">
                {m.name} · Steam ID: {m.steamId}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
