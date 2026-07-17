"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CharacterSkillTree, SkillTreeBranch, SkillTreeNode } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Star, Lock, ArrowRight, AlertCircle } from "lucide-react";

interface SkillTreeViewProps {
  skillTree: CharacterSkillTree;
}

export function SkillTreeView({ skillTree }: SkillTreeViewProps) {
  const t = useTranslations("common.skillTree");
  const locale = useLocale();
  const [activeBranch, setActiveBranch] = useState(skillTree.branches[0]?.id ?? "");

  const branch = skillTree.branches.find((b) => b.id === activeBranch) ?? skillTree.branches[0];

  return (
    <div className="card-dst p-5">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-gold" />
        <h3 className="text-lg font-bold text-gold font-[family-name:var(--font-display)]">
          {t("title")}
        </h3>
        <Badge variant="gold">
          {t("insightPoints", { points: skillTree.totalInsightPoints })}
        </Badge>
      </div>

      {/* Branch tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {skillTree.branches.map((b) => (
          <button
            key={b.id}
            onClick={() => setActiveBranch(b.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
              activeBranch === b.id
                ? "bg-gold/20 text-gold border border-gold/30"
                : "bg-bg-tertiary text-text-secondary border border-border hover:border-gold/30"
            }`}
          >
            <span>{b.icon}</span>
            <span>{locale === "en" ? b.nameEn : b.name}</span>
          </button>
        ))}
      </div>

      {/* Active branch description */}
      {branch && (
        <div>
          <p className="text-sm text-text-secondary mb-4">
            {locale === "en" ? branch.descriptionEn : branch.description}
          </p>

          {/* Skill tree nodes rendered as tiers */}
          <div className="space-y-4">
            {renderBranchNodes(branch, locale)}
          </div>
        </div>
      )}
    </div>
  );
}

function renderBranchNodes(branch: SkillTreeBranch, locale: string) {
  // Group nodes by tier
  const tiers = new Map<number, SkillTreeNode[]>();
  for (const node of branch.nodes) {
    const tierNodes = tiers.get(node.tier) || [];
    tierNodes.push(node);
    tiers.set(node.tier, tierNodes);
  }

  const maxTier = Math.max(...Array.from(tiers.keys()));

  return Array.from(tiers.entries())
    .sort(([a], [b]) => a - b)
    .map(([tier, nodes]) => (
      <div key={tier}>
        {tier > 0 && (
          <div className="flex justify-center py-2">
            <ArrowRight className="w-4 h-4 text-text-muted rotate-90" />
          </div>
        )}
        <div className={`grid grid-cols-1 ${nodes.length > 1 ? "md:grid-cols-2" : ""} gap-2`}>
          {nodes.map((node) => (
            <SkillNode key={node.id} node={node} locale={locale} />
          ))}
        </div>
      </div>
    ));
}

function SkillNode({ node, locale }: { node: SkillTreeNode; locale: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`relative p-3 rounded-lg border cursor-pointer transition-all ${
        expanded
          ? "border-gold/50 bg-bg-hover"
          : "border-border bg-bg-tertiary hover:border-gold/30"
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg flex-shrink-0">{node.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-bold text-text-primary">
              {locale === "en" ? node.nameEn : node.name}
            </span>
            {node.isExclusive && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red/20 text-red-400 border border-red-800/30 flex items-center gap-0.5">
                <AlertCircle className="w-2.5 h-2.5" />
                {locale === "en" ? "Exclusive" : "互斥"}
              </span>
            )}
            {node.maxLevel > 1 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-secondary text-text-muted border border-border">
                {locale === "en" ? "Max Lv." : "最高"} {node.maxLevel}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-text-muted">
            <span className="flex items-center gap-0.5">
              <Star className="w-3 h-3" />
              {node.cost} {locale === "en" ? "pts" : "点"}
            </span>
            {node.prerequisites && node.prerequisites.length > 0 && (
              <span className="flex items-center gap-0.5">
                <Lock className="w-3 h-3" />
                {locale === "en" ? "Req. prior" : "需前置"}
              </span>
            )}
          </div>
        </div>
        <span className="text-[10px] text-text-muted flex-shrink-0 mt-1">
          {expanded ? "▲" : "▼"}
        </span>
      </div>

      {expanded && (
        <div className="mt-2 ml-7 space-y-1.5">
          <p className="text-xs text-text-secondary">
            {locale === "en" ? node.descriptionEn : node.description}
          </p>
          {node.effects.map((effect, i) => (
            <div
              key={i}
              className="text-xs px-2 py-1 rounded bg-bg-secondary border border-border"
            >
              <span className="text-text-muted">
                {locale === "en" ? effect.descriptionEn : effect.description}
              </span>
              {effect.value && (
                <span className="text-gold ml-1 font-medium">
                  {effect.value}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
