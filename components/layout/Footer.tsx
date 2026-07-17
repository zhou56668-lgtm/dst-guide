import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Heart } from "lucide-react";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-bg-secondary border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gold font-bold mb-3 font-[family-name:var(--font-display)]">
              {t("navTitle")}
            </h3>
            <div className="space-y-2">
              <Link href="/guide/beginner" className="block text-text-secondary hover:text-gold text-sm transition-colors">
                {t("beginner")}
              </Link>
              <Link href="/guide/characters" className="block text-text-secondary hover:text-gold text-sm transition-colors">
                {t("characters")}
              </Link>
              <Link href="/guide/bosses" className="block text-text-secondary hover:text-gold text-sm transition-colors">
                {t("boss")}
              </Link>
              <Link href="/guide/cooking" className="block text-text-secondary hover:text-gold text-sm transition-colors">
                {t("cooking")}
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-gold font-bold mb-3 font-[family-name:var(--font-display)]">
              {t("toolsTitle")}
            </h3>
            <div className="space-y-2">
              <Link href="/tools/recipe" className="block text-text-secondary hover:text-gold text-sm transition-colors">
                {t("recipeCalc")}
              </Link>
              <Link href="/tools/damage" className="block text-text-secondary hover:text-gold text-sm transition-colors">
                {t("damageCalc")}
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-gold font-bold mb-3 font-[family-name:var(--font-display)]">
              {t("aboutTitle")}
            </h3>
            <div className="space-y-2">
              <Link href="/mods" className="block text-text-secondary hover:text-gold text-sm transition-colors">
                {t("mods")}
              </Link>
              <a href="#" className="block text-text-secondary hover:text-gold text-sm transition-colors">
                {t("ads")}
              </a>
              <a href="#" className="block text-text-secondary hover:text-gold text-sm transition-colors">
                {t("contact")}
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-gold font-bold mb-3 font-[family-name:var(--font-display)]">
              {t("siteTitle")}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {t("siteDesc")}
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-accent fill-accent" /> for DST Players
          </p>
          <p className="text-text-muted text-sm">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
