// Batch SVG image generator for DST Guide
// Run: node scripts/generate-images.mjs

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "public", "images");

function svg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none">
${body}
</svg>`;
}

function svgHeader(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none">\n`;
}

function svgFooter() {
  return `</svg>\n`;
}

function write(path, content) {
  const full = join(root, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  console.log("Created:", path);
}

// ===== BOSSES =====
const bosses = [
  { id: "deerclops", name: "巨鹿", emoji: "🦌❄️", season: "冬季", hp: "4,000", dmg: "75", color: "#6b4fa0" },
  { id: "bearger", name: "熊獾", emoji: "🐻💥", season: "秋季", hp: "6,000", dmg: "100", color: "#d4a844" },
  { id: "dragonfly", name: "龙蝇", emoji: "🐉🔥", season: "夏季", hp: "27,500", dmg: "75", color: "#c44536" },
  { id: "bee-queen", name: "蜂后", emoji: "🐝👑", season: "任意", hp: "22,500", dmg: "60", color: "#d4a844" },
];

bosses.forEach((b) => {
  write(`bosses/${b.id}.svg`, svg(800, 400, `
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${b.color}22"/>
      <stop offset="100%" stop-color="#1a1210"/>
    </linearGradient>
  </defs>
  <rect width="800" height="400" rx="8" fill="url(#bg)" stroke="${b.color}" stroke-width="1" opacity="0.4"/>
  <text x="400" y="160" text-anchor="middle" font-size="120">${b.emoji}</text>
  <text x="400" y="240" text-anchor="middle" font-size="36" fill="#e8dcc8" font-family="serif" font-weight="bold">${b.name}</text>
  <text x="400" y="280" text-anchor="middle" font-size="16" fill="#a89880" font-family="sans-serif">季节：${b.season} | HP：${b.hp} | 伤害：${b.dmg}</text>
  <circle cx="200" cy="340" r="4" fill="${b.color}" opacity="0.6"/>
  <circle cx="400" cy="340" r="4" fill="${b.color}" opacity="0.6"/>
  <circle cx="600" cy="340" r="4" fill="${b.color}" opacity="0.6"/>
`));
});

// ===== FOOD RECIPES =====
const recipes = [
  { id: "butter_muffin", name: "奶油松饼", cat: "health", emoji: "🧁", color: "#c44536" },
  { id: "dragonpie", name: "火龙果派", cat: "health", emoji: "🥧🐉", color: "#c44536" },
  { id: "honey_ham", name: "蜜汁火腿", cat: "health", emoji: "🍖🍯", color: "#c44536" },
  { id: "meaty_stew", name: "大肉汤", cat: "hunger", emoji: "🥘", color: "#d4a844" },
  { id: "bacon_eggs", name: "培根炒蛋", cat: "health", emoji: "🥓🍳", color: "#c44536" },
  { id: "pierogi", name: "波兰饺子", cat: "health", emoji: "🥟", color: "#c44536" },
  { id: "fishsticks", name: "鱼排", cat: "health", emoji: "🐟", color: "#c44536" },
  { id: "taffy", name: "太妃糖", cat: "sanity", emoji: "🍬", color: "#6b4fa0" },
  { id: "meatballs", name: "肉丸", cat: "hunger", emoji: "🧆", color: "#d4a844" },
  { id: "ratatouille", name: "蔬菜杂烩", cat: "health", emoji: "🥗", color: "#4a7c4f" },
  { id: "fist_full_of_jam", name: "果酱", cat: "health", emoji: "🍓", color: "#c44536" },
  { id: "fruit_medley", name: "水果拼盘", cat: "health", emoji: "🍇🍊", color: "#c44536" },
  { id: "turkey_dinner", name: "火鸡大餐", cat: "health", emoji: "🦃", color: "#c44536" },
  { id: "honey_nuggets", name: "蜂蜜肉块", cat: "health", emoji: "🍯🥩", color: "#c44536" },
  { id: "spicy_chili", name: "辣味炖菜", cat: "health", emoji: "🌶️", color: "#c44536" },
  { id: "froggle_bunwich", name: "蛙腿三明治", cat: "health", emoji: "🐸🥪", color: "#4a7c4f" },
  { id: "stuffed_eggplant", name: "酿茄子", cat: "health", emoji: "🍆", color: "#6b4fa0" },
  { id: "flower_salad", name: "花式沙拉", cat: "health", emoji: "🌵🥗", color: "#4a7c4f" },
  { id: "guacamole", name: "鼹鼠沙拉", cat: "health", emoji: "🥑", color: "#4a7c4f" },
  { id: "wet_goop", name: "湿漉漉的垃圾", cat: "failure", emoji: "💀💧", color: "#6b5e4f" },
  { id: "monster_lasagna", name: "怪物千层面", cat: "failure", emoji: "👹🍝", color: "#8b3a3a" },
];

recipes.forEach((r) => {
  write(`foods/${r.id}.svg`, svg(300, 200, `
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${r.color}18"/>
      <stop offset="100%" stop-color="#231d19"/>
    </linearGradient>
  </defs>
  <rect width="300" height="200" rx="8" fill="url(#bg)" stroke="${r.color}" stroke-width="1" opacity="0.3"/>
  <text x="150" y="90" text-anchor="middle" font-size="60">${r.emoji}</text>
  <text x="150" y="140" text-anchor="middle" font-size="20" fill="#e8dcc8" font-family="serif" font-weight="bold">${r.name}</text>
  <text x="150" y="170" text-anchor="middle" font-size="12" fill="#a89880">${r.cat === "health" ? "回血" : r.cat === "hunger" ? "饱食" : r.cat === "sanity" ? "理智" : "失败"}</text>
`));
});

// ===== FOOD INGREDIENTS =====
const ingredients = [
  // meat
  { id: "meat", name: "大肉", cat: "meat", emoji: "🥩", color: "#c44536" },
  { id: "monster_meat", name: "怪物肉", cat: "monster", emoji: "👹🥩", color: "#8b3a3a" },
  { id: "morsel", name: "小肉", cat: "meat", emoji: "🍗", color: "#c44536" },
  { id: "frog_legs", name: "蛙腿", cat: "meat", emoji: "🐸🦵", color: "#c44536" },
  { id: "drumstick", name: "鸡腿", cat: "meat", emoji: "🍗", color: "#c44536" },
  { id: "fish_meat", name: "鱼肉", cat: "fish", emoji: "🐟", color: "#4a7c4f" },
  // vegetable
  { id: "carrot", name: "胡萝卜", cat: "vegetable", emoji: "🥕", color: "#d4a844" },
  { id: "corn", name: "玉米", cat: "vegetable", emoji: "🌽", color: "#d4a844" },
  { id: "potato", name: "土豆", cat: "vegetable", emoji: "🥔", color: "#d4a844" },
  { id: "tomato", name: "番茄", cat: "vegetable", emoji: "🍅", color: "#d4a844" },
  { id: "onion", name: "洋葱", cat: "vegetable", emoji: "🧅", color: "#d4a844" },
  { id: "pumpkin", name: "南瓜", cat: "vegetable", emoji: "🎃", color: "#d4a844" },
  { id: "eggplant", name: "茄子", cat: "vegetable", emoji: "🍆", color: "#d4a844" },
  { id: "mushroom_red", name: "红蘑菇", cat: "vegetable", emoji: "🍄🔴", color: "#c44536" },
  { id: "mushroom_green", name: "绿蘑菇", cat: "vegetable", emoji: "🍄🟢", color: "#4a7c4f" },
  { id: "mushroom_blue", name: "蓝蘑菇", cat: "vegetable", emoji: "🍄🔵", color: "#6b4fa0" },
  { id: "kelp", name: "海带", cat: "vegetable", emoji: "🌿", color: "#4a7c4f" },
  { id: "cactus_flesh", name: "仙人掌肉", cat: "vegetable", emoji: "🌵", color: "#4a7c4f" },
  { id: "asparagus", name: "芦笋", cat: "vegetable", emoji: "🌱", color: "#4a7c4f" },
  // fruit
  { id: "berries", name: "浆果", cat: "fruit", emoji: "🫐", color: "#6b4fa0" },
  { id: "dragon_fruit", name: "火龙果", cat: "fruit", emoji: "🐉🍑", color: "#c44536" },
  { id: "pomegranate", name: "石榴", cat: "fruit", emoji: "🍎", color: "#c44536" },
  { id: "durian", name: "榴莲", cat: "fruit", emoji: "🫒", color: "#d4a844" },
  { id: "banana", name: "香蕉", cat: "fruit", emoji: "🍌", color: "#d4a844" },
  { id: "watermelon", name: "西瓜", cat: "fruit", emoji: "🍉", color: "#4a7c4f" },
  // egg
  { id: "egg", name: "鸡蛋", cat: "egg", emoji: "🥚", color: "#d4a844" },
  { id: "tallbird_egg", name: "高脚鸟蛋", cat: "egg", emoji: "🥚👀", color: "#c44536" },
  // sweetener
  { id: "honey", name: "蜂蜜", cat: "sweetener", emoji: "🍯", color: "#d4a844" },
  // dairy
  { id: "butter", name: "黄油", cat: "dairy", emoji: "🧈", color: "#d4a844" },
  { id: "electric_milk", name: "电羊奶", cat: "dairy", emoji: "⚡🥛", color: "#6b4fa0" },
  // filler/inedible
  { id: "twigs", name: "树枝", cat: "inedible", emoji: "🪵", color: "#6b5e4f" },
  { id: "ice", name: "冰块", cat: "filler", emoji: "🧊", color: "#6b4fa0" },
  { id: "butterfly_wings", name: "蝴蝶翅膀", cat: "filler", emoji: "🦋", color: "#6b4fa0" },
  { id: "birchnut", name: "白桦坚果", cat: "filler", emoji: "🥜", color: "#d4a844" },
];

ingredients.forEach((item) => {
  write(`items/${item.id}.svg`, svg(200, 200, `
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.color}22"/>
      <stop offset="100%" stop-color="#231d19"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="8" fill="url(#bg)" stroke="${item.color}" stroke-width="1" opacity="0.3"/>
  <text x="100" y="85" text-anchor="middle" font-size="50">${item.emoji}</text>
  <text x="100" y="130" text-anchor="middle" font-size="18" fill="#e8dcc8" font-weight="bold">${item.name}</text>
  <text x="100" y="160" text-anchor="middle" font-size="12" fill="#a89880">${item.cat}</text>
`));
});

// ===== WEAPONS =====
const weapons = [
  { id: "axe", name: "斧头", emoji: "🪓", dmg: "27.2", color: "#6b5e4f" },
  { id: "pickaxe", name: "镐子", emoji: "⛏️", dmg: "27.2", color: "#6b5e4f" },
  { id: "spear", name: "长矛", emoji: "🔱", dmg: "34", color: "#c44536" },
  { id: "bat_bat", name: "蝙蝠棒", emoji: "🦇🏏", dmg: "42.5", color: "#6b4fa0" },
  { id: "ham_bat", name: "火腿棒", emoji: "🍖🏏", dmg: "59.5", color: "#d4a844" },
  { id: "dark_sword", name: "暗影剑", emoji: "🗡️🌑", dmg: "68", color: "#6b4fa0" },
  { id: "thulecite_club", name: "铥矿棒", emoji: "🟢🏏", dmg: "59.5", color: "#4a7c4f" },
  { id: "morning_star", name: "晨星", emoji: "⭐🔨", dmg: "43.35", color: "#d4a844" },
  { id: "glass_cutter", name: "玻璃刀", emoji: "🔪✨", dmg: "68", color: "#4a7c4f" },
  { id: "tentacle_spike", name: "触手刺", emoji: "🦑🔱", dmg: "51", color: "#6b4fa0" },
  { id: "battle_spear", name: "战斗长矛", emoji: "⚔️", dmg: "42.5", color: "#c44536" },
  { id: "darts", name: "吹箭", emoji: "🎯", dmg: "100", color: "#4a7c4f" },
  { id: "boomerang", name: "回旋镖", emoji: "🪃", dmg: "27.2", color: "#d4a844" },
];

weapons.forEach((w) => {
  write(`items/${w.id}.svg`, svg(200, 200, `
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${w.color}22"/>
      <stop offset="100%" stop-color="#231d19"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="8" fill="url(#bg)" stroke="${w.color}" stroke-width="1" opacity="0.3"/>
  <text x="100" y="80" text-anchor="middle" font-size="50">${w.emoji}</text>
  <text x="100" y="125" text-anchor="middle" font-size="18" fill="#e8dcc8" font-weight="bold">${w.name}</text>
  <text x="100" y="155" text-anchor="middle" font-size="14" fill="#a89880">伤害：${w.dmg}</text>
`));
});

// ===== OG Image =====
write(`og/default.svg`, svg(1200, 630, `
  <rect width="1200" height="630" fill="#1a1210"/>
  <rect x="40" y="40" width="1120" height="550" rx="16" fill="none" stroke="#c9a44b" stroke-width="2" opacity="0.3"/>
  <text x="600" y="240" text-anchor="middle" font-size="80" fill="#c9a44b" font-family="serif" font-weight="bold">饥荒联机版攻略站</text>
  <text x="600" y="320" text-anchor="middle" font-size="36" fill="#a89880" font-family="sans-serif">DST中文玩家社区 — 生存·探索·征服</text>
  <circle cx="200" cy="400" r="6" fill="#c9a44b" opacity="0.5"/>
  <circle cx="600" cy="400" r="6" fill="#c9a44b" opacity="0.5"/>
  <circle cx="1000" cy="400" r="6" fill="#c9a44b" opacity="0.5"/>
  <text x="600" y="500" text-anchor="middle" font-size="24" fill="#6b5e4f">新手入门 · 角色攻略 · Boss打法 · 食谱配方 · 实用工具</text>
`));

// ===== Favicon SVG =====
write(`../favicon.svg`, svg(32, 32, `
  <rect width="32" height="32" rx="6" fill="#1a1210"/>
  <text x="16" y="22" text-anchor="middle" font-size="20">🔥</text>
`));

console.log("\n✅ All images generated!");
console.log(`Total: ${bosses.length} bosses, ${recipes.length} recipes, ${ingredients.length} ingredients, ${weapons.length} weapons`);
