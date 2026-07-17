"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { foods } from "@/lib/game-data/foods";
import { recipes } from "@/lib/game-data/recipes";
import { computeRecipes } from "@/lib/engine";
import { localName } from "@/lib/i18n-utils";
import { FoodItem, FoodCategory } from "@/types";
import { X, Search, Trash2, CookingPot, Star } from "lucide-react";

const CATEGORIES: { key: FoodCategory | "all"; tKey: string }[] = [
  { key: "all", tKey: "all" },
  { key: "meat", tKey: "meat" },
  { key: "vegetable", tKey: "vegetable" },
  { key: "fruit", tKey: "fruit" },
  { key: "egg", tKey: "egg" },
  { key: "fish", tKey: "fish" },
  { key: "sweetener", tKey: "sweetener" },
  { key: "dairy", tKey: "dairy" },
  { key: "filler", tKey: "filler" },
];

export function RecipeCalculator() {
  const t = useTranslations("tools.recipe");
  const locale = useLocale();
  const [slots, setSlots] = useState<(FoodItem | null)[]>([null, null, null, null]);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FoodCategory | "all">("all");

  const filteredFoods = useMemo(() => {
    return foods.filter((f) => {
      const matchCat = category === "all" || f.category === category;
      const matchSearch =
        !search ||
        f.name.includes(search) ||
        f.nameEn.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const result = useMemo(() => {
    return computeRecipes(slots, recipes);
  }, [slots]);

  const handleSelectFood = (food: FoodItem) => {
    if (activeSlot !== null) {
      const newSlots = [...slots];
      newSlots[activeSlot] = food;
      setSlots(newSlots);
      setActiveSlot(null);
    }
  };

  const handleRemoveFood = (index: number) => {
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
  };

  const handleClear = () => {
    setSlots([null, null, null, null]);
    setActiveSlot(null);
  };

  return (
    <div className="tool-layout">
      {/* Left - Ingredients */}
      <div>
        <h2 className="text-xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
          <CookingPot className="w-6 h-6 text-gold" />
          {t("title")}
        </h2>

        {/* 4 slots */}
        <div className="flex gap-3 mb-6">
          {slots.map((food, i) => (
            <div
              key={i}
              className={`ingredient-slot ${food ? "filled" : ""} ${activeSlot === i ? "active" : ""}`}
              onClick={() => setActiveSlot(activeSlot === i ? null : i)}
            >
              {food ? (
                <>
                  <span className="text-2xl">{getFoodEmoji(food.category)}</span>
                  <span className="text-xs text-text-secondary mt-1 truncate max-w-[70px]">{localName(food, locale)}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemoveFood(i); }}
                    className="absolute -top-1 -right-1 p-0.5 bg-bg-primary rounded-full border border-border"
                  >
                    <X className="w-3 h-3 text-text-muted" />
                  </button>
                </>
              ) : (
                <span className="text-2xl text-text-muted">+</span>
              )}
            </div>
          ))}
        </div>

        {activeSlot !== null && (
          <div className="mb-4 bg-bg-secondary rounded-lg p-4 border border-border animate-[fade-in_0.2s_ease-out]">
            <p className="text-sm text-gold mb-3">{t("forSlot", { slot: activeSlot + 1 })}</p>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder={t("search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-bg-tertiary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    category === cat.key
                      ? "bg-gold/20 text-gold border border-gold/30"
                      : "bg-bg-tertiary text-text-secondary border border-border hover:border-gold/30"
                  }`}
                >
                  {t(cat.tKey)}
                </button>
              ))}
            </div>

            {/* Food list */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
              {filteredFoods.map((food) => (
                <button
                  key={food.id}
                  onClick={() => handleSelectFood(food)}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg bg-bg-tertiary hover:bg-bg-hover border border-border hover:border-gold/50 transition-all text-center"
                >
                  <span className="text-xl">{getFoodEmoji(food.category)}</span>
                  <span className="text-xs text-text-secondary leading-tight">{localName(food, locale)}</span>
                  <span className="text-[10px] text-text-muted">{getTagSummary(food)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-accent transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          {t("clear")}
        </button>
      </div>

      {/* Right - Results */}
      <div>
        <h2 className="text-xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
          <Star className="w-6 h-6 text-gold" />
          {t("results")}
        </h2>

        {slots.every((s) => s === null) ? (
          <div className="card-dst p-8 text-center text-text-muted">
            <CookingPot className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{t("emptyHint")}</p>
            <p className="text-sm mt-1">{t("emptyHint2")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Primary result */}
            {result.recipe && (
              <div className="card-dst p-5 border-gold/30 !border-gold/30">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{getFoodEmoji(result.recipe.category)}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gold font-[family-name:var(--font-display)]">
                      {localName(result.recipe, locale)}
                    </h3>
                    <p className="text-xs text-text-muted">{locale === "en" ? result.recipe.name : result.recipe.nameEn}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <span className="text-xs px-2 py-0.5 rounded bg-green/20 text-green-400 border border-green-800/30">
                      {result.alternatives.length === 1 ? t("certain") : t("highestPriority")}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <StatDisplay label={t("health")} value={result.recipe.stats.health} type="health" />
                  <StatDisplay label={t("hunger")} value={result.recipe.stats.hunger} type="hunger" />
                  <StatDisplay label={t("sanity")} value={result.recipe.stats.sanity} type="sanity" />
                </div>

                <p className="text-sm text-text-secondary">{result.recipe.notes}</p>
              </div>
            )}

            {/* Alternatives */}
            {result.alternatives.length > 1 && (
              <div>
                <p className="text-sm text-text-muted mb-2">
                  {t("alternatives", { count: result.alternatives.length })}
                </p>
                <div className="space-y-2">
                  {result.alternatives.map((alt, i) => (
                    <div key={i} className="card-dst p-3 flex items-center gap-3">
                      <span className="text-lg">🍲</span>
                      <div className="flex-1">
                        <span className="font-medium text-text-primary text-sm">{localName(alt.recipe, locale)}</span>
                        <span className="text-xs text-text-muted ml-2">{locale === "en" ? alt.recipe.name : alt.recipe.nameEn}</span>
                      </div>
                      <span className="text-xs text-gold font-medium">
                        {(alt.probability * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatDisplay({ label, value, type }: { label: string; value: number; type: string }) {
  const colors: Record<string, string> = {
    health: "stat-bar-health",
    hunger: "stat-bar-hunger",
    sanity: "stat-bar-sanity",
  };
  const maxVal = type === "hunger" ? 150 : type === "sanity" ? 50 : 60;
  const pct = Math.min(Math.abs(value) / maxVal * 100, 100);

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-text-muted">{label}</span>
        <span className={value >= 0 ? "text-text-secondary" : "text-red-400"}>
          {value > 0 ? "+" : ""}{value}
        </span>
      </div>
      <div className="stat-bar">
        <div className={`stat-bar-fill ${colors[type] || colors.hunger}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function getFoodEmoji(cat: string): string {
  const map: Record<string, string> = {
    meat: "🥩", vegetable: "🥕", fruit: "🍎", egg: "🥚",
    fish: "🐟", sweetener: "🍯", dairy: "🧈", monster: "👹",
    inedible: "🪵", filler: "🧊", hunger: "🍖", health: "❤️",
    sanity: "💜", utility: "🍲", failure: "💀",
  };
  return map[cat] || "🍲";
}

function getTagSummary(food: FoodItem): string {
  const tags = food.tags;
  const parts: string[] = [];
  if (tags.meat) parts.push(`肉${tags.meat}`);
  if (tags.vegetable) parts.push(`蔬${tags.vegetable}`);
  if (tags.fruit) parts.push(`果${tags.fruit}`);
  if (tags.egg) parts.push(`蛋${tags.egg}`);
  if (tags.monster) parts.push("怪物");
  if (tags.inedible) parts.push("不可食");
  if (tags.sweetener) parts.push("甜");
  if (tags.dairy) parts.push("乳");
  if (tags.filler) parts.push("填充");
  return parts.join(",") || "无标签";
}
