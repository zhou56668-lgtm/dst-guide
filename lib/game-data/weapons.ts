import { Weapon } from "@/types";

export const weapons: Weapon[] = [
  {
    id: "axe", name: "斧头", nameEn: "Axe", baseDamage: 27.2,
    durability: 100, damageType: "physical",
    imagePath: "/images/items/axe.png",
  },
  {
    id: "pickaxe", name: "镐子", nameEn: "Pickaxe", baseDamage: 27.2,
    durability: 132, damageType: "physical",
    imagePath: "/images/items/pickaxe.png",
  },
  {
    id: "spear", name: "长矛", nameEn: "Spear", baseDamage: 34,
    durability: 150, damageType: "physical",
    imagePath: "/images/items/spear.png",
  },
  {
    id: "bat_bat", name: "蝙蝠棒", nameEn: "Bat Bat", baseDamage: 42.5,
    durability: 75, damageType: "physical",
    specialEffects: ["每次攻击吸收6.8生命值"],
    imagePath: "/images/items/bat_bat.png",
  },
  {
    id: "ham_bat", name: "火腿棒", nameEn: "Ham Bat", baseDamage: 59.5,
    durability: "Infinite (10 days spoil)" as any, damageType: "physical",
    specialEffects: ["伤害随新鲜度递减（10天后为29.75）"],
    imagePath: "/images/items/ham_bat.png",
  },
  {
    id: "dark_sword", name: "暗影剑", nameEn: "Dark Sword", baseDamage: 68,
    durability: 100, damageType: "physical",
    specialEffects: ["每次攻击-20理智"],
    imagePath: "/images/items/dark_sword.png",
  },
  {
    id: "thulecite_club", name: "铥矿棒", nameEn: "Thulecite Club", baseDamage: 59.5,
    durability: 150, damageType: "physical",
    specialEffects: ["10%概率召唤暗影触手", "移速+10%"],
    imagePath: "/images/items/thulecite_club.png",
  },
  {
    id: "morning_star", name: "晨星", nameEn: "Morning Star", baseDamage: 43.35,
    durability: "1 minute (6 uses)" as any, damageType: "physical",
    specialEffects: ["潮湿目标伤害翻倍(72.25)", "发出光照"],
    imagePath: "/images/items/morning_star.png",
  },
  {
    id: "glass_cutter", name: "玻璃刀", nameEn: "Glass Cutter", baseDamage: 68,
    durability: 75, damageType: "physical",
    specialEffects: ["对暗影怪物伤害加倍"],
    imagePath: "/images/items/glass_cutter.png",
  },
  {
    id: "tentacle_spike", name: "触手刺", nameEn: "Tentacle Spike", baseDamage: 51,
    durability: 100, damageType: "physical",
    imagePath: "/images/items/tentacle_spike.png",
  },
  {
    id: "battle_spear", name: "战斗长矛", nameEn: "Battle Spear", baseDamage: 42.5,
    durability: 200, damageType: "physical",
    specialEffects: ["仅Wigfrid可制作"],
    characterModifiers: { "wigfrid": 1.0 },
    imagePath: "/images/items/battle_spear.png",
  },
  {
    id: "darts", name: "吹箭", nameEn: "Darts", baseDamage: 100,
    durability: 1, damageType: "physical",
    specialEffects: ["远程攻击消耗型武器"],
    imagePath: "/images/items/darts.png",
  },
  {
    id: "boomerang", name: "回旋镖", nameEn: "Boomerang", baseDamage: 27.2,
    durability: 10, damageType: "physical",
    specialEffects: ["远程攻击", "回程时可能打中自己"],
    imagePath: "/images/items/boomerang.png",
  },
];
