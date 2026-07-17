import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowRight, BookOpen, Wrench } from "lucide-react";

export async function HeroBanner() {
  const t = await getTranslations("home.hero");
  const ts = await getTranslations("home.stats");

  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-tertiary/30 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bg-tertiary border border-border text-sm text-gold mb-6 animate-[fade-in_0.5s_ease-out]">
            <span className="w-2 h-2 rounded-full bg-gold animate-[pulse-glow_2s_infinite]" />
            {t("tagline")}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] text-text-primary leading-tight mb-6 animate-[slide-up_0.5s_ease-out]">
            {t("title1")}
            <span className="text-gold block">{t("title2")}</span>
          </h1>

          <p className="text-lg text-text-secondary max-w-xl mb-8 animate-[slide-up_0.5s_ease-out_0.1s]">
            {t("description")}
          </p>

          <div className="flex flex-wrap gap-4 animate-[slide-up_0.5s_ease-out_0.2s]">
            <Button href="/guide/beginner" variant="primary" size="lg">
              <BookOpen className="w-5 h-5 mr-2" />
              {t("cta1")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button href="/tools" variant="secondary" size="lg">
              <Wrench className="w-5 h-5 mr-2" />
              {t("cta2")}
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-border animate-[fade-in_0.5s_ease-out_0.4s]">
            <div>
              <div className="text-2xl font-bold text-gold">18+</div>
              <div className="text-sm text-text-muted">{ts("characters")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold">50+</div>
              <div className="text-sm text-text-muted">{ts("recipes")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold">15+</div>
              <div className="text-sm text-text-muted">{ts("bosses")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold">2</div>
              <div className="text-sm text-text-muted">{ts("tools")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
