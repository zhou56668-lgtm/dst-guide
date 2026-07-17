"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");

  const switchTo = locale === "zh" ? "en" : "zh";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: switchTo })}
      className="flex items-center gap-1 px-3 py-1.5 text-sm text-text-secondary hover:text-gold hover:bg-bg-hover rounded-lg transition-colors"
      title={t("switchTo")}
    >
      <Globe className="w-4 h-4" />
      <span>{t("switchTo")}</span>
    </button>
  );
}
