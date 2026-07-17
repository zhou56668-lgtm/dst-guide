import { FoodItem } from "@/types";

export const foods: FoodItem[] = [
  // ===== MEAT =====
  {
    id: "meat", name: "大肉", nameEn: "Meat", category: "meat",
    tags: { meat: 1.0 }, perishTime: 6, stackSize: 20,
    imagePath: "/images/items/meat.png",
  },
  {
    id: "monster_meat", name: "怪物肉", nameEn: "Monster Meat", category: "meat",
    tags: { meat: 1.0, monster: 1.0 }, perishTime: 6, stackSize: 20,
    imagePath: "/images/items/monster_meat.png",
  },
  {
    id: "morsel", name: "小肉", nameEn: "Morsel", category: "meat",
    tags: { meat: 0.5 }, perishTime: 6, stackSize: 40,
    imagePath: "/images/items/morsel.png",
  },
  {
    id: "frog_legs", name: "蛙腿", nameEn: "Frog Legs", category: "meat",
    tags: { meat: 0.5 }, perishTime: 6, stackSize: 40,
    imagePath: "/images/items/frog_legs.png",
  },
  {
    id: "drumstick", name: "鸡腿", nameEn: "Drumstick", category: "meat",
    tags: { meat: 0.5 }, perishTime: 6, stackSize: 40,
    imagePath: "/images/items/drumstick.png",
  },
  {
    id: "fish_meat", name: "鱼肉", nameEn: "Fish", category: "fish",
    tags: { fish: 1.0, meat: 0.5 }, perishTime: 3, stackSize: 40,
    imagePath: "/images/items/fish.png",
  },
  // ===== VEGETABLE =====
  {
    id: "carrot", name: "胡萝卜", nameEn: "Carrot", category: "vegetable",
    tags: { vegetable: 1.0 }, perishTime: 10, stackSize: 40,
    imagePath: "/images/items/carrot.png",
  },
  {
    id: "corn", name: "玉米", nameEn: "Corn", category: "vegetable",
    tags: { vegetable: 1.0 }, perishTime: 10, stackSize: 40,
    imagePath: "/images/items/corn.png",
  },
  {
    id: "potato", name: "土豆", nameEn: "Potato", category: "vegetable",
    tags: { vegetable: 1.0 }, perishTime: 10, stackSize: 40,
    imagePath: "/images/items/potato.png",
  },
  {
    id: "tomato", name: "番茄", nameEn: "Tomato", category: "vegetable",
    tags: { vegetable: 1.0 }, perishTime: 6, stackSize: 40,
    imagePath: "/images/items/tomato.png",
  },
  {
    id: "onion", name: "洋葱", nameEn: "Onion", category: "vegetable",
    tags: { vegetable: 1.0 }, perishTime: 10, stackSize: 40,
    imagePath: "/images/items/onion.png",
  },
  {
    id: "pumpkin", name: "南瓜", nameEn: "Pumpkin", category: "vegetable",
    tags: { vegetable: 1.0 }, perishTime: 10, stackSize: 40,
    imagePath: "/images/items/pumpkin.png",
  },
  {
    id: "eggplant", name: "茄子", nameEn: "Eggplant", category: "vegetable",
    tags: { vegetable: 1.0 }, perishTime: 10, stackSize: 40,
    imagePath: "/images/items/eggplant.png",
  },
  {
    id: "mushroom_red", name: "红蘑菇", nameEn: "Red Mushroom", category: "vegetable",
    tags: { vegetable: 0.5 }, perishTime: 10, stackSize: 40,
    imagePath: "/images/items/mushroom_red.png",
  },
  {
    id: "mushroom_green", name: "绿蘑菇", nameEn: "Green Mushroom", category: "vegetable",
    tags: { vegetable: 0.5 }, perishTime: 10, stackSize: 40,
    imagePath: "/images/items/mushroom_green.png",
  },
  {
    id: "mushroom_blue", name: "蓝蘑菇", nameEn: "Blue Mushroom", category: "vegetable",
    tags: { vegetable: 0.5 }, perishTime: 10, stackSize: 40,
    imagePath: "/images/items/mushroom_blue.png",
  },
  {
    id: "kelp", name: "海带", nameEn: "Kelp", category: "vegetable",
    tags: { vegetable: 1.0 }, perishTime: 10, stackSize: 40,
    imagePath: "/images/items/kelp.png",
  },
  {
    id: "cactus_flesh", name: "仙人掌肉", nameEn: "Cactus Flesh", category: "vegetable",
    tags: { vegetable: 1.0 }, perishTime: 10, stackSize: 40,
    imagePath: "/images/items/cactus_flesh.png",
  },
  {
    id: "asparagus", name: "芦笋", nameEn: "Asparagus", category: "vegetable",
    tags: { vegetable: 1.0 }, perishTime: 6, stackSize: 40,
    imagePath: "/images/items/asparagus.png",
  },
  // ===== FRUIT =====
  {
    id: "berries", name: "浆果", nameEn: "Berries", category: "fruit",
    tags: { fruit: 0.5 }, perishTime: 6, stackSize: 40,
    imagePath: "/images/items/berries.png",
  },
  {
    id: "dragon_fruit", name: "火龙果", nameEn: "Dragon Fruit", category: "fruit",
    tags: { fruit: 1.0 }, perishTime: 6, stackSize: 40,
    imagePath: "/images/items/dragon_fruit.png",
  },
  {
    id: "pomegranate", name: "石榴", nameEn: "Pomegranate", category: "fruit",
    tags: { fruit: 1.0 }, perishTime: 6, stackSize: 40,
    imagePath: "/images/items/pomegranate.png",
  },
  {
    id: "durian", name: "榴莲", nameEn: "Durian", category: "fruit",
    tags: { fruit: 1.0, monster: 1.0 }, perishTime: 6, stackSize: 40,
    imagePath: "/images/items/durian.png",
  },
  {
    id: "banana", name: "香蕉", nameEn: "Banana", category: "fruit",
    tags: { fruit: 1.0 }, perishTime: 6, stackSize: 40,
    imagePath: "/images/items/banana.png",
  },
  {
    id: "watermelon", name: "西瓜", nameEn: "Watermelon", category: "fruit",
    tags: { fruit: 1.0 }, perishTime: 6, stackSize: 40,
    imagePath: "/images/items/watermelon.png",
  },
  // ===== EGG =====
  {
    id: "egg", name: "鸡蛋", nameEn: "Egg", category: "egg",
    tags: { egg: 1.0 }, perishTime: 10, stackSize: 40,
    imagePath: "/images/items/egg.png",
  },
  {
    id: "tallbird_egg", name: "高脚鸟蛋", nameEn: "Tallbird Egg", category: "egg",
    tags: { egg: 4.0 }, perishTime: "Never" as any, stackSize: "Does not stack" as any,
    imagePath: "/images/items/tallbird_egg.png",
  },
  // ===== SWEETENER =====
  {
    id: "honey", name: "蜂蜜", nameEn: "Honey", category: "sweetener",
    tags: { sweetener: 1.0 }, perishTime: 40, stackSize: 40,
    imagePath: "/images/items/honey.png",
  },
  // ===== DAIRY =====
  {
    id: "butter", name: "黄油", nameEn: "Butter", category: "dairy",
    tags: { dairy: 1.0 }, perishTime: 40, stackSize: 40,
    imagePath: "/images/items/butter.png",
  },
  {
    id: "electric_milk", name: "电羊奶", nameEn: "Electric Milk", category: "dairy",
    tags: { dairy: 1.0 }, perishTime: 3, stackSize: 40,
    imagePath: "/images/items/electric_milk.png",
  },
  // ===== INEDIBLE / FILLER =====
  {
    id: "twigs", name: "树枝", nameEn: "Twigs", category: "inedible",
    tags: { inedible: 1.0 }, perishTime: "Never" as any, stackSize: 40,
    imagePath: "/images/items/twigs.png",
  },
  {
    id: "ice", name: "冰块", nameEn: "Ice", category: "filler",
    tags: { filler: 1.0 }, perishTime: 3, stackSize: 40,
    imagePath: "/images/items/ice.png",
  },
  {
    id: "butterfly_wings", name: "蝴蝶翅膀", nameEn: "Butterfly Wings", category: "filler",
    tags: {}, perishTime: 6, stackSize: 40,
    imagePath: "/images/items/butterfly_wings.png",
  },
  {
    id: "birchnut", name: "白桦坚果", nameEn: "Birchnut", category: "filler",
    tags: {}, perishTime: 20, stackSize: 40,
    imagePath: "/images/items/birchnut.png",
  },
];
