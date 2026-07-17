"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { characters } from "@/lib/game-data/characters";
import { weapons } from "@/lib/game-data/weapons";
import { bosses } from "@/lib/game-data/bosses";
import { calculateDamage } from "@/lib/engine";
import { localName } from "@/lib/i18n-utils";
import { Sword, Target, User, Shield } from "lucide-react";

export function DamageCalculator() {
  const t = useTranslations("tools.damage");
  const locale = useLocale();
  const [characterId, setCharacterId] = useState<string>("");
  const [weaponId, setWeaponId] = useState<string>("spear");
  const [targetBossId, setTargetBossId] = useState<string>("deerclops");
  const [customHp, setCustomHp] = useState<number>(1000);
  const [useCustomHp, setUseCustomHp] = useState(false);
  const [foodBuff, setFoodBuff] = useState(0);
  const [armorPieces, setArmorPieces] = useState(0);

  const character = characters.find((c) => c.id === characterId) || null;
  const weapon = weapons.find((w) => w.id === weaponId) || null;
  const targetBoss = bosses.find((b) => b.id === targetBossId) || null;

  const targetHealth = useCustomHp ? customHp : (targetBoss?.health || 0);

  const result = useMemo(() => {
    let absorption = 0;
    if (armorPieces >= 1) absorption = 0.8;
    if (armorPieces >= 2) absorption = 0.96;
    return calculateDamage(character, weapon, targetHealth, foodBuff, absorption);
  }, [character, weapon, targetHealth, foodBuff, armorPieces]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Character */}
        <div className="card-dst p-5">
          <h3 className="text-gold font-bold mb-3 flex items-center gap-2 text-sm font-[family-name:var(--font-display)]">
            <User className="w-4 h-4" /> {t("selectCharacter")}
          </h3>
          <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
            <button
              onClick={() => setCharacterId("")}
              className={`p-2 rounded text-xs text-center transition-colors ${
                !characterId
                  ? "bg-gold/20 text-gold border border-gold/40"
                  : "bg-bg-tertiary text-text-secondary border border-border hover:border-gold/30"
              }`}
            >
              {t("default")}
            </button>
            {characters.map((c) => (
              <button
                key={c.id}
                onClick={() => setCharacterId(c.id)}
                className={`p-2 rounded text-xs text-center transition-colors ${
                  characterId === c.id
                    ? "bg-gold/20 text-gold border border-gold/40"
                    : "bg-bg-tertiary text-text-secondary border border-border hover:border-gold/30"
                }`}
              >
                <div className="font-medium">{localName(c, locale)}</div>
                <div className="text-[10px] text-text-muted">x{c.damageModifier}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Weapon */}
        <div className="card-dst p-5">
          <h3 className="text-gold font-bold mb-3 flex items-center gap-2 text-sm font-[family-name:var(--font-display)]">
            <Sword className="w-4 h-4" /> {t("selectWeapon")}
          </h3>
          <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
            {weapons.map((w) => (
              <button
                key={w.id}
                onClick={() => setWeaponId(w.id)}
                className={`p-2 rounded text-xs text-left transition-colors ${
                  weaponId === w.id
                    ? "bg-red-500/10 text-red-400 border border-red-800/30"
                    : "bg-bg-tertiary text-text-secondary border border-border hover:border-gold/30"
                }`}
              >
                <div className="font-medium">{localName(w, locale)}</div>
                <div className="text-[10px] text-text-muted">{t("damagePerHit")}: {w.baseDamage}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Target */}
        <div className="card-dst p-5">
          <h3 className="text-gold font-bold mb-3 flex items-center gap-2 text-sm font-[family-name:var(--font-display)]">
            <Target className="w-4 h-4" /> {t("selectTarget")}
          </h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {bosses.map((b) => (
              <button
                key={b.id}
                onClick={() => { setTargetBossId(b.id); setUseCustomHp(false); }}
                className={`w-full p-2 rounded text-xs text-left transition-colors ${
                  targetBossId === b.id && !useCustomHp
                    ? "bg-purple-500/10 text-purple-400 border border-purple-800/30"
                    : "bg-bg-tertiary text-text-secondary border border-border hover:border-gold/30"
                }`}
              >
                <div className="font-medium">{localName(b, locale)}</div>
                <div className="text-[10px] text-text-muted">{t("damagePerHit")}: {b.health.toLocaleString()}</div>
              </button>
            ))}
            <button
              onClick={() => setUseCustomHp(true)}
              className={`w-full p-2 rounded text-xs text-left transition-colors ${
                useCustomHp
                  ? "bg-purple-500/10 text-purple-400 border border-purple-800/30"
                  : "bg-bg-tertiary text-text-secondary border border-border"
              }`}
            >
              {t("customHp")}
            </button>
            {useCustomHp && (
              <input
                type="number"
                value={customHp}
                onChange={(e) => setCustomHp(Number(e.target.value) || 0)}
                className="w-full px-3 py-1.5 bg-bg-tertiary border border-border rounded text-sm text-text-primary"
                placeholder={t("inputHp")}
              />
            )}
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="card-dst p-5">
        <h3 className="text-gold font-bold mb-3 flex items-center gap-2 text-sm font-[family-name:var(--font-display)]">
          <Shield className="w-4 h-4" /> {t("combatOptions")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-text-muted block mb-1">{t("foodBuff")}</label>
            <select
              value={foodBuff}
              onChange={(e) => setFoodBuff(Number(e.target.value))}
              className="w-full px-3 py-2 bg-bg-tertiary border border-border rounded text-sm text-text-primary"
            >
              <option value={0}>{t("noBuff")}</option>
              <option value={0.2}>{t("spicyBuff")}</option>
              <option value={0.5}>{t("pepperBuff")}</option>
              <option value={0.6}>{t("spicyPepper")}</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-text-muted block mb-1">{t("armorCount")}</label>
            <select
              value={armorPieces}
              onChange={(e) => setArmorPieces(Number(e.target.value))}
              className="w-full px-3 py-2 bg-bg-tertiary border border-border rounded text-sm text-text-primary"
            >
              <option value={0}>{t("noArmor")}</option>
              <option value={1}>{t("armor1")}</option>
              <option value={2}>{t("armor2")}</option>
            </select>
          </div>
          <div className="flex items-end">
            <div className="text-sm text-text-muted">
              {character ? (
                <>{t("character")}: <span className="text-gold">{localName(character, locale)}</span> (x{character.damageModifier})</>
              ) : (
                `${t("character")}: ${t("default")} (x1.0)`
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="card-dst p-6 !border-gold/30">
        <h3 className="text-gold font-bold mb-4 font-[family-name:var(--font-display)]">{t("result")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">{result.damagePerHit}</div>
            <div className="text-xs text-text-muted mt-1">{t("damagePerHit")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold">{result.hitsToKill}</div>
            <div className="text-xs text-text-muted mt-1">
              {t("hitsToKill")}
              {targetBoss && !useCustomHp && <> ({t("target")}: {localName(targetBoss, locale)})</>}
              {useCustomHp && <> ({t("target")}: {customHp} HP)</>}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-text-primary">
              {result.hitsToKill > 0 ? Math.ceil(result.hitsToKill * 0.5) : 0}
            </div>
            <div className="text-xs text-text-muted mt-1">{t("estimatedSeconds")}</div>
          </div>
        </div>

        <details className="mt-4">
          <summary className="text-sm text-text-muted cursor-pointer hover:text-gold transition-colors">
            {t("viewDetails")}
          </summary>
          <div className="mt-3 p-4 bg-bg-tertiary rounded-lg">
            <pre className="text-xs text-text-secondary font-mono whitespace-pre-wrap">
              {result.breakdown.join("\n")}
            </pre>
          </div>
        </details>
      </div>
    </div>
  );
}
