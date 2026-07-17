import { CrockPotRecipe, CrockPotResult, FoodItem, FoodTags, Weapon, Character } from "@/types";

/**
 * Simulate Crock Pot cooking with 4-ingredient slots.
 * Implements DST's actual cooking algorithm: tag accumulation, requirement checking, priority sorting.
 */
export function computeRecipes(
  slots: (FoodItem | null)[],
  allRecipes: CrockPotRecipe[]
): CrockPotResult {
  const ingredients = slots.filter((s): s is FoodItem => s !== null);
  if (ingredients.length === 0) {
    return { recipe: null, alternatives: [], allMatches: [], totalTags: {} };
  }

  // Sum all food tags
  const totalTags = sumFoodTags(ingredients);

  // Filter matching recipes
  const matches: CrockPotRecipe[] = [];
  for (const recipe of allRecipes) {
    if (recipeMatches(recipe, ingredients, totalTags)) {
      matches.push(recipe);
    }
  }

  if (matches.length === 0) {
    // Wet Goop as fallback
    const wetGoop = allRecipes.find((r) => r.id === "wet_goop") || null;
    return {
      recipe: wetGoop,
      alternatives: wetGoop ? [{ recipe: wetGoop, probability: 1 }] : [],
      allMatches: [],
      totalTags,
    };
  }

  // Sort by priority descending
  matches.sort((a, b) => b.priority - a.priority);

  // Take top-priority items
  const topPriority = matches[0].priority;
  const topMatches = matches.filter((r) => r.priority === topPriority);

  // Calculate weighted probabilities
  const totalWeight = topMatches.reduce((s, r) => s + r.weight, 0);
  const alternatives = topMatches.map((r) => ({
    recipe: r,
    probability: totalWeight > 0 ? r.weight / totalWeight : 1 / topMatches.length,
  }));

  return {
    recipe: topMatches[0],
    alternatives,
    allMatches: matches,
    totalTags,
  };
}

function sumFoodTags(ingredients: FoodItem[]): Partial<FoodTags> {
  const tags: Partial<FoodTags> = {};
  for (const item of ingredients) {
    for (const [key, value] of Object.entries(item.tags)) {
      if (value !== undefined && typeof value === "number") {
        tags[key as keyof FoodTags] = (tags[key as keyof FoodTags] || 0) + value;
      }
    }
  }
  return tags;
}

function recipeMatches(
  recipe: CrockPotRecipe,
  ingredients: FoodItem[],
  tags: Partial<FoodTags>
): boolean {
  const req = recipe.requirements;
  const ingredientIds = ingredients.map((i) => i.id);

  // Check mustHave
  if (req.mustHave) {
    for (const required of req.mustHave) {
      if (!ingredientIds.includes(required)) return false;
    }
  }
  // Check mustNotHave
  if (req.mustNotHave) {
    for (const forbidden of req.mustNotHave) {
      if (ingredientIds.includes(forbidden)) return false;
    }
  }
  // Check requiresSpecific
  if (recipe.requiresSpecific) {
    for (const required of recipe.requiresSpecific) {
      if (!ingredientIds.includes(required)) return false;
    }
  }
  // Check forbidsSpecific
  if (recipe.forbidsSpecific) {
    for (const forbidden of recipe.forbidsSpecific) {
      if (ingredientIds.includes(forbidden)) return false;
    }
  }
  // Check minTags
  if (req.minTags) {
    for (const [key, minVal] of Object.entries(req.minTags)) {
      const current = tags[key as keyof FoodTags] || 0;
      if (current < minVal!) return false;
    }
  }
  // Check maxTags
  if (req.maxTags) {
    for (const [key, maxVal] of Object.entries(req.maxTags)) {
      const current = tags[key as keyof FoodTags] || 0;
      if (current > maxVal!) return false;
    }
  }
  // Check forbiddenTags
  if (req.forbiddenTags) {
    for (const tag of req.forbiddenTags) {
      if ((tags[tag] || 0) > 0) return false;
    }
  }
  // Check maxMonsterMeat
  if (req.maxMonsterMeat !== undefined) {
    const monsterCount = ingredients.filter((i) => i.id === "monster_meat" || (i.tags.monster || 0) >= 1).length;
    if (monsterCount > req.maxMonsterMeat) return false;
  }
  // Check requiresTags (from simplified interface)
  if (recipe.requiresTags) {
    for (const tag of recipe.requiresTags) {
      if ((tags[tag as keyof FoodTags] || 0) === 0) return false;
    }
  }
  // Check forbidsTags (from simplified interface)
  if (recipe.forbidsTags) {
    for (const tag of recipe.forbidsTags) {
      if ((tags[tag as keyof FoodTags] || 0) > 0) return false;
    }
  }
  // Check merged fields from simplified interface
  if (recipe.minMeat !== undefined) {
    const meatVal = (tags.meat || 0) + (tags.fish || 0);
    if (meatVal < recipe.minMeat) return false;
  }
  if (recipe.maxMeat !== undefined) {
    const meatVal = (tags.meat || 0) + (tags.fish || 0);
    if (meatVal > recipe.maxMeat) return false;
  }
  if (recipe.minFruit !== undefined && (tags.fruit || 0) < recipe.minFruit) return false;
  if (recipe.minVegetable !== undefined && (tags.vegetable || 0) < recipe.minVegetable) return false;

  return true;
}

/**
 * Damage calculator engine
 */
export function calculateDamage(
  character: Character | null,
  weapon: Weapon | null,
  targetHealth: number,
  foodBuff: number = 0,
  armorAbsorption: number = 0
): { damagePerHit: number; hitsToKill: number; breakdown: string[] } {
  const breakout: string[] = [];

  if (!weapon) {
    return { damagePerHit: 0, hitsToKill: 0, breakdown: ["请选择武器"] };
  }

  let damage = weapon.baseDamage;
  breakout.push(`基础伤害: ${damage}`);

  if (character) {
    const mod = character.damageModifier;
    if (mod !== 1.0) {
      damage *= mod;
      breakout.push(`角色修正 (${character.name}): x${mod} = ${damage.toFixed(1)}`);
    }
  }

  if (weapon.characterModifiers && character) {
    const charMod = weapon.characterModifiers[character.id];
    if (charMod && charMod !== 1.0) {
      damage *= charMod;
      breakout.push(`专属武器修正: x${charMod} = ${damage.toFixed(1)}`);
    }
  }

  if (foodBuff > 0) {
    damage *= (1 + foodBuff);
    breakout.push(`食物加成: +${(foodBuff * 100).toFixed(0)}% = ${damage.toFixed(1)}`);
  }

  const rawDamage = damage;

  if (armorAbsorption > 0) {
    damage *= (1 - armorAbsorption);
    breakout.push(`护甲减免 (${(armorAbsorption * 100).toFixed(0)}%): ${rawDamage.toFixed(1)} → ${damage.toFixed(1)}`);
  }

  const hitsToKill = targetHealth > 0 ? Math.ceil(targetHealth / damage) : 0;
  breakout.push(`目标生命: ${targetHealth}, 需要 ${hitsToKill} 次攻击`);

  return {
    damagePerHit: Math.round(damage * 10) / 10,
    hitsToKill,
    breakdown: breakout,
  };
}
