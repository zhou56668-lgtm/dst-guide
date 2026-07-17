import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CookingPot, Sword, ArrowRight } from "lucide-react";

export async function ToolShowcase() {
  const t = await getTranslations("home.toolShowcase");

  return (
    <section className="bg-bg-secondary/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-3">
            {t("title")}
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Recipe Calculator */}
          <Card className="!p-0 overflow-hidden group">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-bg-tertiary group-hover:bg-gold/10 transition-colors">
                  <CookingPot className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-[family-name:var(--font-display)]">
                    {t("recipe.title")}
                  </h3>
                  <p className="text-text-muted text-sm">{t("recipe.subtitle")}</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {t("recipe.desc")}
              </p>
              <Button href="/tools/recipe" variant="outline" size="sm">
                {t("recipe.cta")} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Card>

          {/* Damage Calculator */}
          <Card className="!p-0 overflow-hidden group">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-bg-tertiary group-hover:bg-red-500/10 transition-colors">
                  <Sword className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-[family-name:var(--font-display)]">
                    {t("damage.title")}
                  </h3>
                  <p className="text-text-muted text-sm">{t("damage.subtitle")}</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {t("damage.desc")}
              </p>
              <Button href="/tools/damage" variant="outline" size="sm">
                {t("damage.cta")} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
