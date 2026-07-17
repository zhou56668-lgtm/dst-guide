// TypeScript type definitions for Don't Starve Together game data

export interface Character {
  id: string;
  name: string;
  nameEn: string;
  tagline: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "challenge";
  isDlc: boolean;
  unlockMethod: string;
  stats: {
    health: number;
    hunger: number;
    sanity: number;
  };
  damageModifier: number;
  perks: Perk[];
  quirks: string[];
  bestFor: string[];
  imagePath: string;
  description: string;
  tips: string[];
}

export interface Perk {
  name: string;
  description: string;
  icon: string;
}

export interface Boss {
  id: string;
  name: string;
  nameEn: string;
  season: "autumn" | "winter" | "spring" | "summer" | "any";
  location: string;
  health: number;
  healthNote?: string;
  damage: number;
  attackPattern: string[];
  drops: Drop[];
  spawnConditions: string;
  kitingPattern: string;
  minPlayersRecommended: number;
  imagePath: string;
  description: string;
  strategy: string;
}

export interface Drop {
  itemName: string;
  quantity: string;
  dropRate: "always" | "common" | "rare";
}

export interface FoodItem {
  id: string;
  name: string;
  nameEn: string;
  category: FoodCategory;
  tags: Partial<FoodTags>;
  perishTime: number;
  stackSize: number;
  imagePath: string;
}

export type FoodCategory =
  | "meat"
  | "vegetable"
  | "fruit"
  | "egg"
  | "fish"
  | "sweetener"
  | "dairy"
  | "inedible"
  | "monster"
  | "filler";

export interface FoodTags {
  meat: number;
  vegetable: number;
  fruit: number;
  egg: number;
  fish: number;
  sweetener: number;
  dairy: number;
  monster: number;
  inedible: number;
  filler: number;
}

export interface CrockPotRecipe {
  id: string;
  name: string;
  nameEn: string;
  category: "hunger" | "health" | "sanity" | "utility" | "failure";
  stats: {
    health: number;
    hunger: number;
    sanity: number;
  };
  cookTime: number;
  priority: number;
  weight: number;
  requirements: RecipeRequirements;
  notes: string;
  imagePath: string;
  minMeat?: number;
  maxMeat?: number;
  minFruit?: number;
  minVegetable?: number;
  requiresTags?: string[];
  forbidsTags?: string[];
  requiresSpecific?: string[];
  forbidsSpecific?: string[];
}

export interface RecipeRequirements {
  mustHave?: string[];
  mustNotHave?: string[];
  minTags?: Partial<FoodTags>;
  maxTags?: Partial<FoodTags>;
  forbiddenTags?: (keyof FoodTags)[];
  exactTag?: Partial<FoodTags>;
  maxMonsterMeat?: number;
}

export interface Weapon {
  id: string;
  name: string;
  nameEn: string;
  baseDamage: number;
  durability: number;
  damageType: "physical" | "planar";
  specialEffects?: string[];
  characterModifiers?: Record<string, number>;
  imagePath: string;
}

export interface Armor {
  id: string;
  name: string;
  absorption: number;
  durability: number;
  planarDefense?: number;
  imagePath: string;
}

export interface GuideFrontmatter {
  title: string;
  description: string;
  category: string;
  date: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  image?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  order?: number;
}

export interface GuideMeta {
  slug: string;
  frontmatter: GuideFrontmatter;
  content: string;
}

// ==================== SKILL TREE ====================

export interface SkillTreeNode {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string; // emoji icon for the skill node
  tier: number; // 0-based tier within the branch (0 = root/unlock)
  position: number; // position within the tier (for layout)
  maxLevel: number; // typically 1, some nodes have multiple levels
  cost: number; // insight points cost per level
  effects: SkillEffect[];
  prerequisites?: string[]; // IDs of nodes that must be unlocked first (within same branch)
  isExclusive?: boolean; // mutually exclusive with another node at same position
  exclusiveWith?: string; // ID of the mutually exclusive node
}

export interface SkillEffect {
  type: string; // "stat_boost", "new_ability", "enhancement", "unlock_recipe"
  description: string;
  descriptionEn: string;
  value?: string | number;
}

export interface SkillTreeBranch {
  id: string;
  name: string;
  nameEn: string;
  icon: string; // emoji icon
  description: string;
  descriptionEn: string;
  nodes: SkillTreeNode[];
}

export interface CharacterSkillTree {
  characterId: string;
  totalInsightPoints: number; // typically 15
  branches: SkillTreeBranch[];
}

export interface DamageResult {
  damagePerHit: number;
  hitsToKill: number;
  dps?: number;
  breakdown: string[];
}

export interface CrockPotResult {
  recipe: CrockPotRecipe | null;
  alternatives: { recipe: CrockPotRecipe; probability: number }[];
  allMatches: CrockPotRecipe[];
  totalTags: Partial<FoodTags>;
}
