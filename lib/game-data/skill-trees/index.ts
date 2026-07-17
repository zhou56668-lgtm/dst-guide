import { CharacterSkillTree, SkillTreeNode } from "@/types";

// ==================== Helper ====================
function n(
  id: string, name: string, nameEn: string,
  desc: string, descEn: string,
  icon: string, tier: number, position: number,
  maxLevel: number, cost: number,
  effects: { type: string; description: string; descriptionEn: string; value?: string | number }[],
  opts?: { prerequisites?: string[]; isExclusive?: boolean; exclusiveWith?: string }
): SkillTreeNode {
  return {
    id, name, nameEn, description: desc, descriptionEn: descEn,
    icon, tier, position, maxLevel, cost,
    effects: effects.map(e => ({ type: e.type, description: e.description, descriptionEn: e.descriptionEn, value: e.value })),
    ...opts,
  };
}

// ==================== WILSON ====================
const wilsonTree: CharacterSkillTree = {
  characterId: "wilson",
  totalInsightPoints: 15,
  branches: [
    {
      id: "transmutation",
      name: "炼金转换", nameEn: "Transmutation",
      icon: "⚗️",
      description: "将基础材料在不同类型之间互相转换——树枝→矿石→宝石",
      descriptionEn: "Convert basic materials between different types — twigs → ores → gems",
      nodes: [
        n("tr_basic", "基础炼金", "Basic Transmutation",
          "学会将树枝转换为燧石，或将燧石转换为树枝", "Learn to convert twigs into flint, or flint into twigs",
          "🪨", 0, 0, 1, 2,
          [{ type: "new_ability", description: "解锁基础材料转换能力", descriptionEn: "Unlock basic material transmutation" }]
        ),
        n("tr_stone", "矿石转换 I", "Ore Transmutation I",
          "将燧石转换为硝石和金块（互相转换）", "Convert between flint, nitre, and gold",
          "🪙", 1, 0, 1, 2,
          [{ type: "new_ability", description: "解锁矿石循环转换", descriptionEn: "Unlock ore cycling transmutation" }],
          { prerequisites: ["tr_basic"] }
        ),
        n("tr_gem1", "宝石转换 I", "Gem Transmutation I",
          "将红宝石和蓝宝石互相转换", "Convert between red gems and blue gems",
          "💎", 2, 0, 1, 3,
          [{ type: "new_ability", description: "解锁红蓝宝石互相转换", descriptionEn: "Unlock red/blue gem transmutation" }],
          { prerequisites: ["tr_stone"] }
        ),
        n("tr_gem2", "宝石转换 II", "Gem Transmutation II",
          "将紫宝石转换为红蓝宝石，或将红蓝宝石合成为紫宝石", "Convert purple gems to/from red and blue gems",
          "💜", 3, 0, 1, 3,
          [{ type: "new_ability", description: "解锁紫宝石与红蓝宝石的双向转换", descriptionEn: "Unlock purple gem bidirectional transmutation" }],
          { prerequisites: ["tr_gem1"] }
        ),
        n("tr_ultimate", "终极炼金", "Ultimate Alchemy",
          "将铥矿碎片转换为其他宝石，或将大量宝石合成铥矿", "Convert thulecite fragments to/from gems",
          "👑", 4, 0, 1, 5,
          [{ type: "new_ability", description: "解锁铥矿与宝石的转换——树枝换铥矿成为可能！", descriptionEn: "Unlock thulecite-to-gem transmutation — twigs to thulecite!" }],
          { prerequisites: ["tr_gem2"] }
        ),
      ],
    },
    {
      id: "beard",
      name: "胡须掌握", nameEn: "Beard Mastery",
      icon: "🧔",
      description: "增强胡须能力和保暖效果",
      descriptionEn: "Enhance beard abilities and insulation",
      nodes: [
        n("bd_growth", "快速生长", "Accelerated Growth",
          "胡须生长速度+50%", "Beard growth speed +50%",
          "⏩", 0, 0, 1, 2,
          [{ type: "stat_boost", description: "胡须生长速度+50%", descriptionEn: "Beard growth rate +50%", value: "50%" }]
        ),
        n("bd_insulation", "极致保暖", "Maximum Insulation",
          "满胡须时提供额外60点保暖", "Full beard provides +60 insulation",
          "🔥", 1, 0, 1, 3,
          [{ type: "stat_boost", description: "满胡须保暖+60（总共135→195）", descriptionEn: "Full beard insulation +60 (135→195 total)", value: "+60" }],
          { prerequisites: ["bd_growth"] }
        ),
        n("bd_silk", "丝绸胡须", "Silky Beard",
          "剃胡须时额外获得1个蜘蛛丝", "Shaving gives +1 extra silk",
          "🕸️", 1, 1, 1, 2,
          [{ type: "enhancement", description: "剃须额外获得蜘蛛丝", descriptionEn: "Extra silk from shaving", value: "+1" }],
          { prerequisites: ["bd_growth"] }
        ),
      ],
    },
    {
      id: "torch",
      name: "火炬专精", nameEn: "Torch Expertise",
      icon: "🔦",
      description: "提升火炬效率和照明能力",
      descriptionEn: "Improve torch efficiency and lighting",
      nodes: [
        n("trch_duration", "长效火炬", "Long-lasting Torch",
          "火炬燃烧时间+50%", "Torch burn time +50%",
          "🕯️", 0, 0, 1, 2,
          [{ type: "stat_boost", description: "火炬燃烧时间+50%", descriptionEn: "Torch duration +50%", value: "50%" }]
        ),
        n("trch_radius", "广域照明", "Wide Illumination",
          "火炬照明范围+30%", "Torch light radius +30%",
          "💡", 1, 0, 1, 3,
          [{ type: "stat_boost", description: "火炬照明范围+30%", descriptionEn: "Torch light radius +30%", value: "30%" }],
          { prerequisites: ["trch_duration"] }
        ),
      ],
    },
  ],
};

// ==================== WILLOW ====================
const willowTree: CharacterSkillTree = {
  characterId: "willow",
  totalInsightPoints: 15,
  branches: [
    {
      id: "pyromancy",
      name: "火焰法术", nameEn: "Pyromancy",
      icon: "🔥",
      description: "施放强大的火焰攻击法术",
      descriptionEn: "Cast powerful fire attack spells",
      nodes: [
        n("pyro_fireball", "火球术", "Fireball",
          "主动施放火球，在目标位置造成范围火焰伤害", "Cast a fireball that deals AoE fire damage at target location",
          "☄️", 0, 0, 1, 2,
          [{ type: "new_ability", description: "解锁火球术技能", descriptionEn: "Unlock Fireball ability" }]
        ),
        n("pyro_aura", "火焰光环", "Fire Aura",
          "激活火焰光环，持续灼烧周围的敌人", "Activate a fire aura that continuously burns nearby enemies",
          "💫", 1, 0, 1, 3,
          [{ type: "new_ability", description: "解锁火焰光环——每秒对周围造成伤害", descriptionEn: "Unlock Fire Aura — DPS to nearby enemies" }],
          { prerequisites: ["pyro_fireball"] }
        ),
        n("pyro_inferno", "炼狱", "Inferno",
          "大幅度强化火球和火焰光环的伤害和范围", "Greatly increase fireball and fire aura damage and radius",
          "🌋", 2, 0, 1, 4,
          [{ type: "enhancement", description: "火焰伤害+50%", descriptionEn: "Fire damage +50%", value: "50%" }],
          { prerequisites: ["pyro_aura"] }
        ),
      ],
    },
    {
      id: "bernie",
      name: "伯尼强化", nameEn: "Bernie Enhancement",
      icon: "🧸",
      description: "强化伯尼熊的战斗能力",
      descriptionEn: "Enhance Bernie's combat abilities",
      nodes: [
        n("bern_lunar", "月亮伯尼", "Lunar Bernie",
          "伯尼可以进化为月亮伯尼——获得远程攻击能力和更高伤害", "Bernie evolves to Lunar Bernie — gains ranged attacks and higher damage",
          "🌙", 0, 0, 1, 3,
          [{ type: "new_ability", description: "伯尼可进化为月亮伯尼形态", descriptionEn: "Bernie can evolve to Lunar Bernie form" }],
          { isExclusive: true, exclusiveWith: "bern_shadow" }
        ),
        n("bern_shadow", "暗影伯尼", "Shadow Bernie",
          "伯尼可以进化为暗影伯尼——获得恐惧光环和AOE暗影伤害", "Bernie evolves to Shadow Bernie — gains fear aura and AoE shadow damage",
          "🌑", 0, 0, 1, 3,
          [{ type: "new_ability", description: "伯尼可进化为暗影伯尼形态", descriptionEn: "Bernie can evolve to Shadow Bernie form" }],
          { isExclusive: true, exclusiveWith: "bern_lunar" }
        ),
        n("bern_durability", "伯尼的韧性", "Bernie's Resilience",
          "伯尼生命值+50%，回血速度更快", "Bernie HP +50%, regenerates faster",
          "🛡️", 1, 0, 1, 2,
          [{ type: "stat_boost", description: "伯尼血量+50%", descriptionEn: "Bernie HP +50%", value: "50%" }]
        ),
      ],
    },
    {
      id: "lighter",
      name: "打火机精通", nameEn: "Lighter Mastery",
      icon: "🔧",
      description: "提升打火机的功能",
      descriptionEn: "Enhance lighter functionality",
      nodes: [
        n("light_cook", "便携厨房", "Portable Kitchen",
          "可以使用打火机烹饪食物（不需要营火）", "Cook food using the lighter (no campfire needed)",
          "🍳", 0, 0, 1, 2,
          [{ type: "new_ability", description: "打火机可以烹饪食物", descriptionEn: "Lighter can cook food" }]
        ),
        n("light_absorb", "火焰吸收", "Flame Absorption",
          "打火机可以吸收周围的火焰来恢复耐久", "Lighter absorbs nearby fires to restore durability",
          "♻️", 1, 0, 1, 2,
          [{ type: "new_ability", description: "打火机可吸收火焰恢复耐久", descriptionEn: "Lighter absorbs fire for durability" }],
          { prerequisites: ["light_cook"] }
        ),
      ],
    },
  ],
};

// ==================== WOLFGANG ====================
const wolfgangTree: CharacterSkillTree = {
  characterId: "wolfgang",
  totalInsightPoints: 15,
  branches: [
    {
      id: "might",
      name: "力量训练", nameEn: "Might Training",
      icon: "💪",
      description: "提升力量形态的各项能力",
      descriptionEn: "Enhance mighty form abilities",
      nodes: [
        n("mgt_dumbbell", "投掷哑铃", "Dumbbell Throw",
          "可以将哑铃投掷出去造成范围伤害", "Throw dumbbells to deal AoE damage",
          "🏋️", 0, 0, 1, 2,
          [{ type: "new_ability", description: "解锁哑铃投掷——远程AOE攻击", descriptionEn: "Unlock dumbbell throw — ranged AoE attack" }]
        ),
        n("mgt_crit", "致命一击", "Critical Strike",
          "满饱食时有10%概率打出额外50%伤害", "10% chance to deal +50% bonus damage at full hunger",
          "💥", 1, 0, 1, 3,
          [{ type: "enhancement", description: "暴击率10%，暴击伤害+50%", descriptionEn: "10% crit chance, +50% crit damage", value: "10%" }],
          { prerequisites: ["mgt_dumbbell"] }
        ),
        n("mgt_work", "大力出奇迹", "Work Miracle",
          "力量形态下采矿/伐木/锤击效率再+50%", "Mining/chopping/hammering efficiency +50% in mighty form",
          "⛏️", 1, 1, 1, 3,
          [{ type: "enhancement", description: "工作效率+50%（与基础加成叠加）", descriptionEn: "Work efficiency +50% (stacks with base bonus)", value: "50%" }],
          { prerequisites: ["mgt_dumbbell"] }
        ),
        n("mgt_speed", "冲锋", "Charge",
          "力量形态下移速+10%", "Movement speed +10% in mighty form",
          "💨", 2, 0, 1, 4,
          [{ type: "stat_boost", description: "移速+10%", descriptionEn: "Movement speed +10%", value: "10%" }],
          { prerequisites: ["mgt_crit"] }
        ),
      ],
    },
    {
      id: "gym",
      name: "健身大师", nameEn: "Gym Master",
      icon: "🏛️",
      description: "提升健身效率和团队增益",
      descriptionEn: "Improve gym efficiency and team buffs",
      nodes: [
        n("gym_coach", "教练", "Coach",
          "在健身房锻炼时，周围队友也获得力量值加成", "When working out at gym, nearby teammates also gain mightiness",
          "📢", 0, 0, 1, 2,
          [{ type: "new_ability", description: "团队力量值共享", descriptionEn: "Team mightiness sharing" }]
        ),
        n("gym_efficiency", "高效锻炼", "Efficient Workout",
          "在健身房锻炼效率+100%", "Gym workout efficiency +100%",
          "⚡", 1, 0, 1, 2,
          [{ type: "stat_boost", description: "健身效率翻倍", descriptionEn: "Double workout efficiency", value: "100%" }],
          { prerequisites: ["gym_coach"] }
        ),
      ],
    },
  ],
};

// ==================== WOODIE ====================
const woodieTree: CharacterSkillTree = {
  characterId: "woodie",
  totalInsightPoints: 15,
  branches: [
    {
      id: "werebeaver",
      name: "海狸形态", nameEn: "Werebeaver Mastery",
      icon: "🦫",
      description: "强化海狸形态的采集能力",
      descriptionEn: "Enhance werebeaver gathering abilities",
      nodes: [
        n("beav_speed", "急速啃咬", "Speed Gnaw",
          "海狸形态下砍树/采矿/挖掘速度+50%", "Chopping/mining/digging speed +50% in werebeaver form",
          "⚡", 0, 0, 1, 2,
          [{ type: "stat_boost", description: "海狸采集速度+50%", descriptionEn: "Werebeaver gathering speed +50%", value: "50%" }]
        ),
        n("beav_night", "夜行性", "Nocturnal",
          "海狸形态下获得夜视能力", "Gain night vision in werebeaver form",
          "👁️", 1, 0, 1, 3,
          [{ type: "new_ability", description: "海狸形态夜视", descriptionEn: "Werebeaver night vision" }],
          { prerequisites: ["beav_speed"] }
        ),
        n("beav_dig", "掘地大师", "Master Digger",
          "海狸可以挖掘树桩和特殊物品（无需铲子）", "Werebeaver can dig stumps and special items (no shovel needed)",
          "🕳️", 2, 0, 1, 4,
          [{ type: "new_ability", description: "海狸不需要铲子即可挖掘", descriptionEn: "Werebeaver digs without shovel" }],
          { prerequisites: ["beav_night"] }
        ),
      ],
    },
    {
      id: "weremoose",
      name: "驼鹿形态", nameEn: "Weremoose Mastery",
      icon: "🫎",
      description: "强化驼鹿形态的战斗能力",
      descriptionEn: "Enhance weremoose combat abilities",
      nodes: [
        n("moose_charge", "强力冲锋", "Powerful Charge",
          "驼鹿冲锋伤害+100%并可击退敌人", "Weremoose charge damage +100% and knocks back enemies",
          "💢", 0, 0, 1, 2,
          [{ type: "enhancement", description: "冲锋伤害翻倍+击退效果", descriptionEn: "Charge damage doubled + knockback", value: "100%" }]
        ),
        n("moose_armor", "厚皮", "Thick Hide",
          "驼鹿形态下获得额外30%伤害减免", "Weremoose form gains +30% damage resistance",
          "🛡️", 1, 0, 1, 3,
          [{ type: "stat_boost", description: "驼鹿伤害减免+30%", descriptionEn: "Weremoose damage reduction +30%", value: "30%" }],
          { prerequisites: ["moose_charge"] }
        ),
        n("moose_aoe", "地震", "Earthquake",
          "驼鹿跳砸范围+100%，伤害+50%", "Weremoose slam radius +100%, damage +50%",
          "💥", 2, 0, 1, 4,
          [{ type: "enhancement", description: "跳砸范围加倍+伤害提升", descriptionEn: "Slam radius doubled + damage up", value: "100%" }],
          { prerequisites: ["moose_armor"] }
        ),
      ],
    },
    {
      id: "weregoose",
      name: "大鹅形态", nameEn: "Weregoose Mastery",
      icon: "🪿",
      description: "强化大鹅形态的探索能力",
      descriptionEn: "Enhance weregoose exploration abilities",
      nodes: [
        n("goose_speed", "飞毛腿", "Speedster",
          "大鹅形态移速+20%", "Weregoose movement speed +20%",
          "💨", 0, 0, 1, 2,
          [{ type: "stat_boost", description: "大鹅移速+20%", descriptionEn: "Weregoose speed +20%", value: "20%" }]
        ),
        n("goose_water", "长途跋涉", "Long Haul",
          "大鹅可以在水上行走更长时间（耐力消耗减半）", "Weregoose water walking stamina drain halved",
          "🌊", 1, 0, 1, 3,
          [{ type: "stat_boost", description: "水上行走时间翻倍", descriptionEn: "Double water walking duration", value: "100%" }],
          { prerequisites: ["goose_speed"] }
        ),
      ],
    },
  ],
};

// ==================== WORMWOOD ====================
const wormwoodTree: CharacterSkillTree = {
  characterId: "wormwood",
  totalInsightPoints: 15,
  branches: [
    {
      id: "bloom",
      name: "开花之道", nameEn: "Blooming Path",
      icon: "🌻",
      description: "强化开花状态和光合作用能力",
      descriptionEn: "Enhance blooming state and photosynthesis",
      nodes: [
        n("blm_heal", "繁盛生长", "Lush Growth",
          "开花状态下的自动回血速度翻倍", "Passive HP regen doubled during blooming",
          "💚", 0, 0, 1, 2,
          [{ type: "stat_boost", description: "开花回血速度+100%", descriptionEn: "Blooming regen rate +100%", value: "100%" }]
        ),
        n("blm_aura", "生长光环", "Growth Aura",
          "开花状态下自动施肥周围农作物", "Automatically fertilize nearby crops during blooming",
          "✨", 1, 0, 1, 3,
          [{ type: "new_ability", description: "开花时自动施肥周围植物", descriptionEn: "Auto-fertilize nearby plants when blooming" }],
          { prerequisites: ["blm_heal"] }
        ),
        n("blm_perma", "四季花开", "Everbloom",
          "开花状态持续时间+100%", "Blooming duration +100%",
          "🌸", 2, 0, 1, 4,
          [{ type: "stat_boost", description: "开花持续时间翻倍", descriptionEn: "Blooming duration doubled", value: "100%" }],
          { prerequisites: ["blm_aura"] }
        ),
      ],
    },
    {
      id: "crafting",
      name: "植物制作", nameEn: "Plant Crafting",
      icon: "🌿",
      description: "解锁更多植物相关的制作配方",
      descriptionEn: "Unlock more plant-related crafting recipes",
      nodes: [
        n("crft_trap", "荆棘陷阱", "Bramble Trap",
          "制作荆棘陷阱——踩到的敌人受到穿刺伤害", "Craft bramble traps — deal piercing damage to enemies that step on them",
          "🌵", 0, 0, 1, 2,
          [{ type: "unlock_recipe", description: "解锁荆棘陷阱制作", descriptionEn: "Unlock bramble trap recipe" }]
        ),
        n("crft_spore", "孢子炸弹", "Spore Bomb",
          "制作孢子炸弹——投掷后在目标区域释放孢子云", "Craft spore bombs — release spore cloud at target area",
          "💣", 1, 0, 1, 3,
          [{ type: "unlock_recipe", description: "解锁孢子炸弹制作", descriptionEn: "Unlock spore bomb recipe" }],
          { prerequisites: ["crft_trap"] }
        ),
        n("crft_living", "活木制作", "Living Log Crafting",
          "可以直接制作活木（消耗生命值）", "Craft living logs directly (costs HP)",
          "🪵", 1, 1, 1, 3,
          [{ type: "unlock_recipe", description: "解锁活木制作配方", descriptionEn: "Unlock living log crafting" }],
          { prerequisites: ["crft_trap"] }
        ),
      ],
    },
    {
      id: "farming",
      name: "耕种大师", nameEn: "Farming Master",
      icon: "🌾",
      description: "提升耕种效率",
      descriptionEn: "Improve farming efficiency",
      nodes: [
        n("farm_seed", "种子专家", "Seed Expert",
          "徒手播种时作物初始生长阶段+1", "Crops start at +1 growth stage when planted barehanded",
          "🌱", 0, 0, 1, 2,
          [{ type: "enhancement", description: "徒手播种直接进入下一生长阶段", descriptionEn: "Barehanded planting skips first growth stage" }]
        ),
        n("farm_weed", "杂草免疫", "Weed Immunity",
          "徒手种植的作物永远不会长杂草", "Crops planted barehanded never grow weeds",
          "🍀", 1, 0, 1, 2,
          [{ type: "enhancement", description: "徒手种植无杂草", descriptionEn: "No weeds from barehanded planting" }],
          { prerequisites: ["farm_seed"] }
        ),
      ],
    },
  ],
};

// ==================== WIGFRID ====================
const wigfridTree: CharacterSkillTree = {
  characterId: "wigfrid",
  totalInsightPoints: 15,
  branches: [
    {
      id: "songs",
      name: "战斗之歌", nameEn: "Battle Songs",
      icon: "🎵",
      description: "解锁和强化各种战斗之歌",
      descriptionEn: "Unlock and enhance battle songs",
      nodes: [
        n("song_heal", "回血之歌", "Heartrending Ballad",
          "吟唱回血之歌：团队每秒回复少量生命值", "Sing healing ballad: team regens HP per second",
          "❤️", 0, 0, 1, 2,
          [{ type: "new_ability", description: "解锁回血之歌", descriptionEn: "Unlock healing ballad" }]
        ),
        n("song_durability", "耐久之歌", "Weaponized Warble",
          "吟唱耐久之歌：团队武器耐久消耗减半", "Sing durability song: team weapon durability loss halved",
          "🔧", 0, 1, 1, 2,
          [{ type: "new_ability", description: "解锁武器耐久之歌", descriptionEn: "Unlock durability ballad" }]
        ),
        n("song_fire", "防火之歌", "Fireproof Falsetto",
          "吟唱防火之歌：团队获得火焰免疫", "Sing fireproof song: team gains fire immunity",
          "🔥", 1, 0, 1, 3,
          [{ type: "new_ability", description: "解锁防火之歌", descriptionEn: "Unlock fireproof ballad" }],
          { prerequisites: ["song_heal"] }
        ),
        n("song_sanity", "理智之歌", "Bel Canto of Courage",
          "吟唱理智之歌：团队理智持续回复+减少理智损失", "Sing sanity song: team sanity regen + reduced sanity loss",
          "💜", 1, 1, 1, 3,
          [{ type: "new_ability", description: "解锁理智之歌", descriptionEn: "Unlock sanity ballad" }],
          { prerequisites: ["song_durability"] }
        ),
        n("song_master", "指挥家", "Maestro",
          "可以同时吟唱两首战斗之歌（效果叠加）", "Can sing two battle songs simultaneously (effects stack)",
          "🎼", 2, 0, 1, 5,
          [{ type: "new_ability", description: "同时吟唱两首战斗之歌", descriptionEn: "Sing two battle songs at once" }],
          { prerequisites: ["song_fire", "song_sanity"] }
        ),
      ],
    },
    {
      id: "combat",
      name: "战斗精通", nameEn: "Combat Mastery",
      icon: "⚔️",
      description: "强化战斗能力和伤害输出",
      descriptionEn: "Enhance combat abilities and damage output",
      nodes: [
        n("cmbt_spear", "战斗长矛强化", "Battle Spear Enhancement",
          "战斗长矛伤害+10，耐久+50", "Battle spear damage +10, durability +50",
          "🗡️", 0, 0, 1, 3,
          [{ type: "enhancement", description: "专属武器强化", descriptionEn: "Signature weapon enhanced", value: "+10 dmg" }]
        ),
        n("cmbt_lifesteal", "吸血强化", "Enhanced Lifesteal",
          "攻击回血效果+50%", "Life steal from attacks +50%",
          "🩸", 1, 0, 1, 3,
          [{ type: "enhancement", description: "攻击回血+50%", descriptionEn: "Attack life steal +50%", value: "50%" }],
          { prerequisites: ["cmbt_spear"] }
        ),
        n("cmbt_rage", "战斗怒火", "Battle Fury",
          "连续攻击同一目标时伤害逐渐提升（最多+30%）", "Consecutive hits on same target increase damage (up to +30%)",
          "💢", 2, 0, 1, 4,
          [{ type: "enhancement", description: "连续攻击伤害递增至+30%", descriptionEn: "Ramping damage up to +30%", value: "30%" }],
          { prerequisites: ["cmbt_lifesteal"] }
        ),
      ],
    },
  ],
};

// ==================== WINONA ====================
const winonaTree: CharacterSkillTree = {
  characterId: "winona",
  totalInsightPoints: 15,
  branches: [
    {
      id: "catapults",
      name: "投石机工程", nameEn: "Catapult Engineering",
      icon: "🏗️",
      description: "建造和升级自动防御投石机",
      descriptionEn: "Build and upgrade automated defense catapults",
      nodes: [
        n("cat_basic", "投石机", "Catapult",
          "建造投石机——自动攻击范围内的敌人", "Build catapults — auto-attack enemies in range",
          "🎯", 0, 0, 1, 2,
          [{ type: "unlock_recipe", description: "解锁投石机制作", descriptionEn: "Unlock catapult recipe" }]
        ),
        n("cat_fire", "火焰弹", "Incendiary Rounds",
          "投石机可发射火焰弹——造成持续火焰伤害", "Catapults fire incendiary rounds — deal fire DoT",
          "🔥", 1, 0, 1, 3,
          [{ type: "enhancement", description: "解锁火焰弹升级", descriptionEn: "Unlock fire rounds upgrade" }],
          { prerequisites: ["cat_basic"] }
        ),
        n("cat_ice", "冰冻弹", "Frost Rounds",
          "投石机可发射冰冻弹——减速并冰冻目标", "Catapults fire frost rounds — slow and freeze targets",
          "❄️", 1, 1, 1, 3,
          [{ type: "enhancement", description: "解锁冰冻弹升级", descriptionEn: "Unlock frost rounds upgrade" }],
          { prerequisites: ["cat_basic"] }
        ),
        n("cat_range", "射程升级", "Range Upgrade",
          "投石机射程+50%，攻击速度+30%", "Catapult range +50%, attack speed +30%",
          "📏", 2, 0, 1, 4,
          [{ type: "enhancement", description: "射程+50%，攻速+30%", descriptionEn: "Range +50%, speed +30%", value: "+50%" }],
          { prerequisites: ["cat_fire"] }
        ),
      ],
    },
    {
      id: "generator",
      name: "电力网络", nameEn: "Power Grid",
      icon: "⚡",
      description: "建造和管理电力网络",
      descriptionEn: "Build and manage power networks",
      nodes: [
        n("gen_efficiency", "高效发电", "Efficient Generation",
          "发电机燃料效率+100%", "Generator fuel efficiency +100%",
          "🔋", 0, 0, 1, 2,
          [{ type: "stat_boost", description: "发电机效率翻倍", descriptionEn: "Generator efficiency doubled", value: "100%" }]
        ),
        n("gen_charge", "充电站", "Charging Station",
          "发电机可以为队友的电子设备充电（如WX-78过载）", "Generator can charge teammates' electronic devices",
          "🔌", 1, 0, 1, 2,
          [{ type: "new_ability", description: "发电机可为队友充电", descriptionEn: "Generator can charge teammates" }],
          { prerequisites: ["gen_efficiency"] }
        ),
      ],
    },
    {
      id: "trusty_tape",
      name: "胶带大师", nameEn: "Tape Master",
      icon: "📎",
      description: "提升胶带修复能力",
      descriptionEn: "Enhance tape repair abilities",
      nodes: [
        n("tape_durability", "强力胶带", "Strong Tape",
          "胶带修复的耐久度+50%（修复更多耐久）", "Tape repairs +50% more durability",
          "🩹", 0, 0, 1, 2,
          [{ type: "enhancement", description: "胶带修复效果+50%", descriptionEn: "Tape repair effect +50%", value: "50%" }]
        ),
        n("tape_armor", "装甲胶带", "Armor Tape",
          "胶带可以用来修补护甲", "Tape can repair armor",
          "🛡️", 1, 0, 1, 3,
          [{ type: "new_ability", description: "胶带可修复护甲", descriptionEn: "Tape can repair armor" }],
          { prerequisites: ["tape_durability"] }
        ),
      ],
    },
  ],
};

// ==================== WURT ====================
const wurtTree: CharacterSkillTree = {
  characterId: "wurt",
  totalInsightPoints: 15,
  branches: [
    {
      id: "merm_king",
      name: "鱼人王国", nameEn: "Merm Kingdom",
      icon: "👑",
      description: "建立和发展鱼人王国，强化鱼人随从",
      descriptionEn: "Establish and develop merm kingdom, strengthen merm followers",
      nodes: [
        n("merm_house", "鱼人房建造", "Merm House Building",
          "可以建造鱼人房（不需要资源点）", "Craft merm houses anywhere (no resource node needed)",
          "🏠", 0, 0, 1, 2,
          [{ type: "unlock_recipe", description: "解锁鱼人房制作", descriptionEn: "Unlock merm house recipe" }]
        ),
        n("merm_king_up", "鱼人王升级", "King Upgrade",
          "鱼人王提供更强的力量和生命值光环", "Merm king provides stronger might and HP auras",
          "👑", 1, 0, 1, 3,
          [{ type: "enhancement", description: "鱼人王光环效果+50%", descriptionEn: "Merm king aura effect +50%", value: "50%" }],
          { prerequisites: ["merm_house"] }
        ),
        n("merm_army", "鱼人大军", "Merm Army",
          "鱼人随从上限+5，鱼人战斗属性+30%", "Merm follower cap +5, merm combat stats +30%",
          "⚔️", 2, 0, 1, 4,
          [{ type: "enhancement", description: "鱼人随从+5，属性+30%", descriptionEn: "Followers +5, stats +30%", value: "+5" }],
          { prerequisites: ["merm_king_up"] }
        ),
      ],
    },
    {
      id: "amphibian",
      name: "两栖优势", nameEn: "Amphibian Advantage",
      icon: "🐸",
      description: "强化水中能力和生存能力",
      descriptionEn: "Enhance aquatic abilities and survival",
      nodes: [
        n("amp_speed", "水生适应", "Aquatic Adaptation",
          "在水中移速+15%", "Movement speed +15% in water",
          "🌊", 0, 0, 1, 2,
          [{ type: "stat_boost", description: "水中移速+15%", descriptionEn: "Water speed +15%", value: "15%" }]
        ),
        n("amp_rain", "雨水亲和", "Rain Affinity",
          "雨水不再降低理智，反而每秒回复理智", "Rain no longer drains sanity — instead regens sanity",
          "🌧️", 1, 0, 1, 2,
          [{ type: "enhancement", description: "雨中回理智而不是减理智", descriptionEn: "Rain regens sanity instead of draining" }],
          { prerequisites: ["amp_speed"] }
        ),
      ],
    },
    {
      id: "mosquito",
      name: "蚊虫掌控", nameEn: "Mosquito Control",
      icon: "🦟",
      description: "控制沼泽生物为你而战",
      descriptionEn: "Control swamp creatures to fight for you",
      nodes: [
        n("mosq_bomb", "蚊子炸弹", "Mosquito Bomb",
          "制作蚊子炸弹——释放一群蚊子攻击敌人", "Craft mosquito bombs — release mosquito swarms to attack",
          "💣", 0, 0, 1, 2,
          [{ type: "unlock_recipe", description: "解锁蚊子炸弹制作", descriptionEn: "Unlock mosquito bomb recipe" }]
        ),
      ],
    },
  ],
};

// ==================== WALTER ====================
const walterTree: CharacterSkillTree = {
  characterId: "walter",
  totalInsightPoints: 15,
  branches: [
    {
      id: "slingshot",
      name: "弹弓大师", nameEn: "Slingshot Mastery",
      icon: "🏹",
      description: "解锁更多弹丸类型和弹弓强化",
      descriptionEn: "Unlock more ammo types and slingshot enhancements",
      nodes: [
        n("ammo_gold", "黄金弹丸", "Gold Rounds",
          "制作黄金弹丸：高伤害+破甲效果", "Craft gold rounds: high damage + armor piercing",
          "✨", 0, 0, 1, 2,
          [{ type: "unlock_recipe", description: "解锁黄金弹丸制作", descriptionEn: "Unlock gold round recipe" }]
        ),
        n("ammo_freeze", "冰冻弹丸", "Freeze Rounds",
          "制作冰冻弹丸：减速并冰冻目标", "Craft freeze rounds: slow and freeze targets",
          "❄️", 0, 1, 1, 2,
          [{ type: "unlock_recipe", description: "解锁冰冻弹丸制作", descriptionEn: "Unlock freeze round recipe" }]
        ),
        n("ammo_slow", "减速弹丸", "Slow Rounds",
          "制作减速弹丸：大幅降低目标移速", "Craft slow rounds: greatly reduce target movement speed",
          "🐌", 1, 0, 1, 3,
          [{ type: "unlock_recipe", description: "解锁减速弹丸制作", descriptionEn: "Unlock slow round recipe" }],
          { prerequisites: ["ammo_gold"] }
        ),
        n("ammo_cursed", "诅咒弹丸", "Cursed Rounds",
          "制作诅咒弹丸：额外暗影伤害+减防", "Craft cursed rounds: bonus shadow damage + defense reduction",
          "👁️", 1, 1, 1, 3,
          [{ type: "unlock_recipe", description: "解锁诅咒弹丸制作", descriptionEn: "Unlock cursed round recipe" }],
          { prerequisites: ["ammo_freeze"] }
        ),
        n("sling_damage", "精准射击", "Precision Shot",
          "弹弓伤害+30%", "Slingshot damage +30%",
          "🎯", 2, 0, 1, 4,
          [{ type: "stat_boost", description: "弹弓伤害+30%", descriptionEn: "Slingshot damage +30%", value: "30%" }],
          { prerequisites: ["ammo_slow"] }
        ),
      ],
    },
    {
      id: "woby",
      name: "沃比训练", nameEn: "Woby Training",
      icon: "🐶",
      description: "训练沃比获得更强能力",
      descriptionEn: "Train Woby for stronger abilities",
      nodes: [
        n("woby_big", "沃比变大", "Big Woby",
          "沃比可以变身为大沃比——可骑行且携带更多物品", "Woby can transform to Big Woby — rideable + more storage",
          "📦", 0, 0, 1, 2,
          [{ type: "new_ability", description: "解锁大沃比形态（骑行+存储）", descriptionEn: "Unlock Big Woby form (ride + storage)" }]
        ),
        n("woby_brave", "勇敢的沃比", "Brave Woby",
          "沃比不再被怪物吓跑，甚至会帮忙战斗", "Woby no longer runs from monsters, helps in combat",
          "💪", 1, 0, 1, 3,
          [{ type: "enhancement", description: "沃比不再害怕怪物并参与战斗", descriptionEn: "Woby fights instead of fleeing" }],
          { prerequisites: ["woby_big"] }
        ),
        n("woby_speed", "极速沃比", "Speed Woby",
          "大沃比骑行速度+30%", "Big Woby riding speed +30%",
          "💨", 2, 0, 1, 3,
          [{ type: "stat_boost", description: "骑行速度+30%", descriptionEn: "Riding speed +30%", value: "30%" }],
          { prerequisites: ["woby_brave"] }
        ),
      ],
    },
    {
      id: "campfire",
      name: "营火故事", nameEn: "Campfire Stories",
      icon: "🏕️",
      description: "提升讲故事的效果",
      descriptionEn: "Enhance storytelling effects",
      nodes: [
        n("story_buff", "鼓舞人心的故事", "Inspiring Stories",
          "讲故事回复理智的效果+50%", "Storytelling sanity regen +50%",
          "📖", 0, 0, 1, 2,
          [{ type: "enhancement", description: "故事理智回复+50%", descriptionEn: "Story sanity regen +50%", value: "50%" }]
        ),
        n("story_combat", "战斗故事", "Battle Stories",
          "讲故事同时给队友提供短暂的伤害加成", "Storytelling also gives teammates a brief damage buff",
          "⚔️", 1, 0, 1, 3,
          [{ type: "new_ability", description: "故事提供战斗增益", descriptionEn: "Stories provide combat buff" }],
          { prerequisites: ["story_buff"] }
        ),
      ],
    },
  ],
};

// ==================== EXPORT ====================
export const allSkillTrees: Record<string, CharacterSkillTree> = {
  wilson: wilsonTree,
  willow: willowTree,
  wolfgang: wolfgangTree,
  woodie: woodieTree,
  wormwood: wormwoodTree,
  wigfrid: wigfridTree,
  winona: winonaTree,
  wurt: wurtTree,
  walter: walterTree,
};

export function getSkillTree(characterId: string): CharacterSkillTree | undefined {
  return allSkillTrees[characterId];
}
