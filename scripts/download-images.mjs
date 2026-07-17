/**
 * Download official DST game images from dontstarve.wiki.gg
 *
 * Usage: node scripts/download-images.mjs
 *
 * Downloads character portraits, boss images, food icons, and item icons
 * from the official DST wiki. Images are saved to public/images/ and replace
 * the current placeholder SVGs.
 */

import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import http from "node:http";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const DATA_DIR = path.join(ROOT, "lib", "game-data");

// ============================================================================
// ENTITY DEFINITIONS
// ============================================================================

const CHARACTERS = [
  { id: "wilson", nameEn: "Wilson" },
  { id: "willow", nameEn: "Willow" },
  { id: "wendy", nameEn: "Wendy" },
  { id: "wigfrid", nameEn: "Wigfrid" },
  { id: "wolfgang", nameEn: "Wolfgang" },
  { id: "wx78", nameEn: "WX-78" },
];

const BOSSES = [
  { id: "deerclops", nameEn: "Deerclops" },
  { id: "bearger", nameEn: "Bearger" },
  { id: "dragonfly", nameEn: "Dragonfly" },
  { id: "bee-queen", nameEn: "Bee Queen" },
];

// Crock pot recipes (from recipes.ts)
const RECIPES = [
  "Butter Muffin", "Dragonpie", "Honey Ham", "Meaty Stew",
  "Bacon and Eggs", "Pierogi", "Fishsticks", "Taffy",
  "Meatballs", "Ratatouille", "Fist Full of Jam", "Fruit Medley",
  "Turkey Dinner", "Honey Nuggets", "Spicy Chili", "Froggle Bunwich",
  "Stuffed Eggplant", "Flower Salad", "Guacamole",
  "Wet Goop", "Monster Lasagna",
];

// Food ingredients (from foods.ts)
const FOODS = [
  "Meat", "Monster Meat", "Morsel", "Frog Legs", "Drumstick", "Fish",
  "Carrot", "Corn", "Potato", "Tomato", "Onion", "Pumpkin", "Eggplant",
  "Red Mushroom", "Green Mushroom", "Blue Mushroom", "Kelp",
  "Cactus Flesh", "Asparagus",
  "Berries", "Dragon Fruit", "Pomegranate", "Durian", "Banana", "Watermelon",
  "Egg", "Tallbird Egg",
  "Honey", "Butter", "Electric Milk",
  "Twigs", "Ice", "Butterfly Wings", "Birchnut",
];

// Weapons (from weapons.ts)
const WEAPONS = [
  "Axe", "Pickaxe", "Spear", "Bat Bat", "Ham Bat", "Dark Sword",
  "Thulecite Club", "Morning Star", "Glass Cutter", "Tentacle Spike",
  "Battle Spear", "Darts", "Boomerang",
];

// ============================================================================
// HELPER: Convert English name to wiki filename
// ============================================================================

function toWikiFilename(nameEn, type) {
  const underscored = nameEn.replace(/ /g, "_");
  if (type === "character") {
    return `${underscored}_Original_Portrait.png`;
  }
  return `${underscored}.png`;
}

// ============================================================================
// HELPER: Convert English name to local filename
// ============================================================================

function toLocalFilename(nameEn) {
  return nameEn.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

// ============================================================================
// NETWORK HELPERS
// ============================================================================

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function apiRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: { "User-Agent": UA, Accept: "application/json" },
    };
    client
      .get(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error(`Failed to parse API response: ${data.slice(0, 200)}`));
          }
        });
      })
      .on("error", reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath);
    fs.mkdirSync(dir, { recursive: true });

    const file = fs.createWriteStream(destPath);
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: { "User-Agent": UA },
    };
    const client = url.startsWith("https") ? https : http;

    client
      .get(options, (res) => {
        // Follow redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.unlinkSync(destPath);
          downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(destPath);
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        reject(err);
      });
  });
}

// ============================================================================
// MAIN LOGIC
// ============================================================================

async function getImageUrl(wikiFilename) {
  const apiUrl = `https://dontstarve.wiki.gg/api.php?action=query&titles=File:${encodeURIComponent(
    wikiFilename
  )}&prop=imageinfo&iiprop=url&format=json`;

  try {
    const result = await apiRequest(apiUrl);
    const pages = result.query?.pages;
    if (!pages) return null;

    for (const key of Object.keys(pages)) {
      if (key === "-1") continue; // Missing page
      const page = pages[key];
      if (page.imageinfo?.[0]?.url) {
        return page.imageinfo[0].url;
      }
    }
    return null;
  } catch (err) {
    console.error(`  API error for ${wikiFilename}: ${err.message}`);
    return null;
  }
}

async function downloadImage(wikiFilename, localPath) {
  // Step 1: Get the direct URL via MediaWiki API
  const imageUrl = await getImageUrl(wikiFilename);
  if (!imageUrl) {
    return { success: false, reason: "not found on wiki" };
  }

  // Step 2: Download the image
  const destPath = path.join(PUBLIC, localPath);
  try {
    await downloadFile(imageUrl, destPath);
    return { success: true, url: imageUrl, dest: localPath };
  } catch (err) {
    return { success: false, reason: `download failed: ${err.message}` };
  }
}

async function main() {
  console.log("🎮 DST Wiki Image Downloader\n");
  console.log("=" .repeat(60));

  const results = { success: [], fail: [] };
  const tasks = [];

  // --- Characters ---
  console.log("\n📋 Characters:");
  for (const ch of CHARACTERS) {
    const wikiFilename = toWikiFilename(ch.nameEn, "character");
    const localPath = `images/characters/${ch.id}.png`;
    tasks.push(
      downloadImage(wikiFilename, localPath).then((r) => {
        const label = `${ch.nameEn} → ${localPath}`;
        if (r.success) {
          console.log(`  ✅ ${label}`);
          results.success.push({ ...r, label, entity: ch });
        } else {
          console.log(`  ❌ ${label} (${r.reason})`);
          results.fail.push({ ...r, label, entity: ch });
        }
      })
    );
  }

  // --- Bosses ---
  console.log("\n📋 Bosses:");
  for (const b of BOSSES) {
    const wikiFilename = toWikiFilename(b.nameEn, "boss");
    const localPath = `images/bosses/${b.id}.png`;
    tasks.push(
      downloadImage(wikiFilename, localPath).then((r) => {
        const label = `${b.nameEn} → ${localPath}`;
        if (r.success) {
          console.log(`  ✅ ${label}`);
          results.success.push({ ...r, label, entity: b });
        } else {
          console.log(`  ❌ ${label} (${r.reason})`);
          results.fail.push({ ...r, label, entity: b });
        }
      })
    );
  }

  // --- Recipes ---
  console.log("\n📋 Recipes:");
  for (const name of RECIPES) {
    const wikiFilename = toWikiFilename(name, "recipe");
    const localId = toLocalFilename(name);
    // Map to the actual file ID used in recipes.ts
    const idMap = {
      butter_muffin: "butter_muffin",
      dragonpie: "dragonpie",
      honey_ham: "honey_ham",
      meaty_stew: "meaty_stew",
      bacon_and_eggs: "bacon_eggs",
      pierogi: "pierogi",
      fishsticks: "fishsticks",
      taffy: "taffy",
      meatballs: "meatballs",
      ratatouille: "ratatouille",
      fist_full_of_jam: "fist_full_of_jam",
      fruit_medley: "fruit_medley",
      turkey_dinner: "turkey_dinner",
      honey_nuggets: "honey_nuggets",
      spicy_chili: "spicy_chili",
      froggle_bunwich: "froggle_bunwich",
      stuffed_eggplant: "stuffed_eggplant",
      flower_salad: "flower_salad",
      guacamole: "guacamole",
      wet_goop: "wet_goop",
      monster_lasagna: "monster_lasagna",
    };
    const fileId = idMap[localId] || localId;
    const localPath = `images/foods/${fileId}.png`;
    tasks.push(
      downloadImage(wikiFilename, localPath).then((r) => {
        const label = `${name} → ${localPath}`;
        if (r.success) {
          console.log(`  ✅ ${label}`);
          results.success.push({ ...r, label, entity: { nameEn: name, id: fileId } });
        } else {
          console.log(`  ❌ ${label} (${r.reason})`);
          results.fail.push({ ...r, label, entity: { nameEn: name, id: fileId } });
        }
      })
    );
  }

  // --- Food Ingredients ---
  console.log("\n📋 Food Ingredients:");
  for (const name of FOODS) {
    const wikiFilename = toWikiFilename(name, "food");
    const localId = toLocalFilename(name);
    // Manual overrides for specific filename mismatches
    const localIdOverrides = {
      fish: "fish_meat",
      morsel: "morsel",
      monster_meat: "monster_meat",
      frog_legs: "frog_legs",
      drumstick: "drumstick",
      tallbird_egg: "tallbird_egg",
      dragon_fruit: "dragon_fruit",
      red_mushroom: "mushroom_red",
      green_mushroom: "mushroom_green",
      blue_mushroom: "mushroom_blue",
      cactus_flesh: "cactus_flesh",
      electric_milk: "electric_milk",
      butterfly_wings: "butterfly_wings",
      twigs: "twigs",
      birchnut: "birchnut",
    };
    const fileId = localIdOverrides[localId] || localId;
    const localPath = `images/items/${fileId}.png`;
    tasks.push(
      downloadImage(wikiFilename, localPath).then((r) => {
        const label = `${name} → ${localPath}`;
        if (r.success) {
          console.log(`  ✅ ${label}`);
          results.success.push({ ...r, label, entity: { nameEn: name, id: fileId } });
        } else {
          console.log(`  ❌ ${label} (${r.reason})`);
          results.fail.push({ ...r, label, entity: { nameEn: name, id: fileId } });
        }
      })
    );
  }

  // --- Weapons ---
  console.log("\n📋 Weapons:");
  for (const name of WEAPONS) {
    const wikiFilename = toWikiFilename(name, "weapon");
    const localId = toLocalFilename(name);
    const localPath = `images/items/${localId}.png`;
    tasks.push(
      downloadImage(wikiFilename, localPath).then((r) => {
        const label = `${name} → ${localPath}`;
        if (r.success) {
          console.log(`  ✅ ${label}`);
          results.success.push({ ...r, label, entity: { nameEn: name, id: localId } });
        } else {
          console.log(`  ❌ ${label} (${r.reason})`);
          results.fail.push({ ...r, label, entity: { nameEn: name, id: localId } });
        }
      })
    );
  }

  // Wait for all downloads to complete
  await Promise.all(tasks);

  // ==========================================================================
  // SUMMARY
  // ==========================================================================
  console.log("\n" + "=".repeat(60));
  console.log("\n📊 Summary:");
  console.log(`  ✅ Success: ${results.success.length}`);
  console.log(`  ❌ Failed:  ${results.fail.length}`);

  if (results.fail.length > 0) {
    console.log("\n❌ Failed items:");
    for (const f of results.fail) {
      console.log(`  - ${f.label}: ${f.reason}`);
    }
  }

  // Write results to JSON for later processing
  const resultsPath = path.join(ROOT, "scripts", ".download-results.json");
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📝 Results saved to: ${resultsPath}`);
  console.log("\nDone! 🎉");
}

main().catch(console.error);
