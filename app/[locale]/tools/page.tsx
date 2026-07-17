import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ToolShowcase } from "@/components/home/ToolShowcase";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guide.tools");
  return {
    title: t("pageTitle"),
    description: t("pageDesc"),
  };
}

export default async function ToolsPage() {
  const t = await getTranslations("guide.tools");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: t("pageTitle") }]} />
      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-3">
        {t("pageTitle")}
      </h1>
      <p className="text-text-secondary mb-8 max-w-2xl">
        {t("pageDesc")}
      </p>
      <ToolShowcase />
    </div>
  );
}
