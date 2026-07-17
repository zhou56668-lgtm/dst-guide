import { getTranslations } from "next-intl/server";
import { DamageCalculator } from "@/components/tools/DamageCalculator";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { AdSlot } from "@/components/ui/AdSlot";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tools.damage");
  return {
    title: t("title"),
    description: t("desc"),
  };
}

export default async function DamageCalculatorPage() {
  const t = await getTranslations("tools.damage");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: t("title") }]} />
      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-3">
        {t("title")}
      </h1>
      <p className="text-text-secondary mb-8">
        {t("desc")}
      </p>
      <DamageCalculator />
      <div className="mt-8">
        <AdSlot position="banner" />
      </div>
    </div>
  );
}
