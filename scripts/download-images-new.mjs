/**
 * Download NEW DST game images for expanded content
 *
 * Usage: node scripts/download-images-new.mjs
 *
 * Downloads images for newly added characters, bosses, and recipes
 * that were not in the original download.
 */

import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import http from "node:http";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public", "images");

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// ==================== NETWORK HELPERS ====================
function apiRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: { "User-Agent": UA, Accept: "application/json" },
    };
    client.get(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error(`Failed to parse: ${data.slice(0, 200)}`)); }
      });
    }).on("error", reject);
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
    client.get(options, (res) => {
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
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

async function getImageUrl(wikiFilename) {
  const apiUrl = `https://dontstarve.wiki.gg/api.php?action=query&titles=File:${encodeURIComponent(wikiFilename)}&prop=imageinfo&iiprop=url&format=json`;
  const data = await apiRequest(apiUrl);
  const pages = data.query?.pages ?? {};
  for (const page of Object.values(pages)) {
    if (page.imageinfo?.[0]?.url) return page.imageinfo[0].url;
  }
  return null;
}

async function downloadImage(wikiFilename, destPath) {
  if (fs.existsSync(destPath)) {
    console.log(`  ✅ Already exists: ${path.basename(destPath)}`);
    return true;
  }
  try {
    const url = await getImageUrl(wikiFilename);
    if (!url) {
      console.log(`  ❌ Not found on wiki: ${wikiFilename}`);
      return false;
    }
    await downloadFile(url, destPath);
    console.log(`  ✅ Downloaded: ${path.basename(destPath)}`);
    return true;
  } catch (err) {
    console.log(`  ❌ Failed: ${wikiFilename} — ${err.message}`);
    return false;
  }
}

// ==================== ENTITY DEFINITIONS ====================

// New characters (11)
const NEW_CHARACTERS = [
  { id: "wickerbottom", wikiFile: "Wickerbottom_Original_Portrait.png" },
  { id: "wes", wikiFile: "Wes_Original_Portrait.png" },
  { id: "maxwell", wikiFile: "Maxwell_Original_Portrait.png" },
  { id: "woodie", wikiFile: "Woodie_Original_Portrait.png" },
  { id: "webber", wikiFile: "Webber_Original_Portrait.png" },
  { id: "winona", wikiFile: "Winona_Original_Portrait.png" },
  { id: "wormwood", wikiFile: "Wormwood_Original_Portrait.png" },
  { id: "wortox", wikiFile: "Wortox_Original_Portrait.png" },
  { id: "wurt", wikiFile: "Wurt_Original_Portrait.png" },
  { id: "walter", wikiFile: "Walter_Original_Portrait.png" },
  { id: "wanda", wikiFile: "Wanda_Original_Portrait.png" },
];

// New bosses (13)
const NEW_BOSSES = [
  { id: "moose-goose", wikiFile: "Moose_Goose.png" },
  { id: "antlion", wikiFile: "Antlion.png" },
  { id: "ancient-guardian", wikiFile: "Ancient_Guardian.png" },
  { id: "toadstool", wikiFile: "Toadstool.png" },
  { id: "ancient-fuelweaver", wikiFile: "Ancient_Fuelweaver.png" },
  { id: "nightmare-werepig", wikiFile: "Nightmare_Werepig.png" },
  { id: "klaus", wikiFile: "Klaus.png" },
  { id: "malbatross", wikiFile: "Malbatross.png" },
  { id: "crab-king", wikiFile: "Crab_King.png" },
  { id: "eye-of-terror", wikiFile: "Eye_of_Terror.png" },
  { id: "twins-of-terror", wikiFile: "Twins_of_Terror.png" },
  { id: "celestial-champion", wikiFile: "Celestial_Champion.png" },
  { id: "shadow-pieces", wikiFile: "Shadow_Pieces.png" },
];

// New recipes/food images (matched by id as the filename)
const NEW_RECIPES = [
  "trail_mix", "surf_n_turf", "jellybeans", "kabobs", "pumpkin_cookies",
  "ice_cream", "melonsicle", "banana_pop", "vegetable_stinger", "jelly_salad",
  "waffles", "mandrake_soup", "creamy_potato_puree", "asparagus_soup",
  "fancy_spiralled_tubers", "salsa_fresca", "lobster_bisque", "lobster_dinner",
  "seafood_gumbo", "moqueca", "fish_cordon_bleu", "ceviche", "california_roll",
  "unagi", "figatoni", "fig_stuffed_trunk", "figgy_frogwich", "figkabob",
  "volt_goat_jelly", "volt_goat_chaud_froid", "bone_bouillon",
  "hot_dragon_chili_salad", "glow_berry_mousse", "tall_scotch_eggs",
  "breakfast_skillet", "plain_omelette",
  "barnacle_nigiri", "barnacle_linguini", "barnacle_pita",
  "grim_galette", "beefy_greens",
];

// Map recipe IDs to wiki filenames (special cases for names with special chars)
const RECIPE_WIKI_NAMES = {
  trail_mix: "Trail_Mix.png",
  surf_n_turf: "Surf_n_Turf.png",
  jellybeans: "Jellybeans.png",
  kabobs: "Kabobs.png",
  pumpkin_cookies: "Pumpkin_Cookies.png",
  ice_cream: "Ice_Cream.png",
  melonsicle: "Melonsicle.png",
  banana_pop: "Banana_Pop.png",
  vegetable_stinger: "Vegetable_Stinger.png",
  jelly_salad: "Jelly_Salad.png",
  waffles: "Waffles.png",
  mandrake_soup: "Mandrake_Soup.png",
  creamy_potato_puree: "Creamy_Potato_Puree.png",
  asparagus_soup: "Asparagus_Soup.png",
  fancy_spiralled_tubers: "Fancy_Spiralled_Tubers.png",
  salsa_fresca: "Salsa_Fresca.png",
  lobster_bisque: "Lobster_Bisque.png",
  lobster_dinner: "Lobster_Dinner.png",
  seafood_gumbo: "Seafood_Gumbo.png",
  moqueca: "Moqueca.png",
  fish_cordon_bleu: "Fish_Cordon_Bleu.png",
  ceviche: "Ceviche.png",
  california_roll: "California_Roll.png",
  unagi: "Unagi.png",
  figatoni: "Figatoni.png",
  fig_stuffed_trunk: "Fig-Stuffed_Trunk.png",
  figgy_frogwich: "Figgy_Frogwich.png",
  figkabob: "Figkabob.png",
  volt_goat_jelly: "Volt_Goat_Jelly.png",
  volt_goat_chaud_froid: "Volt_Goat_Chaud-Froid.png",
  bone_bouillon: "Bone_Bouillon.png",
  hot_dragon_chili_salad: "Hot_Dragon_Chili_Salad.png",
  glow_berry_mousse: "Glow_Berry_Mousse.png",
  tall_scotch_eggs: "Tall_Scotch_Eggs.png",
  breakfast_skillet: "Breakfast_Skillet.png",
  plain_omelette: "Plain_Omelette.png",
  barnacle_nigiri: "Barnacle_Nigiri.png",
  barnacle_linguini: "Barnacle_Linguini.png",
  barnacle_pita: "Barnacle_Pita.png",
  grim_galette: "Grim_Galette.png",
  beefy_greens: "Beefy_Greens.png",
};

// ==================== MAIN ====================
async function main() {
  console.log("🎨 Downloading NEW DST images...\n");

  // --- Characters ---
  console.log("📋 NEW CHARACTERS (11):");
  for (const ch of NEW_CHARACTERS) {
    await downloadImage(ch.wikiFile, path.join(PUBLIC, "characters", `${ch.id}.png`));
  }

  // --- Bosses ---
  console.log("\n📋 NEW BOSSES (13):");
  for (const b of NEW_BOSSES) {
    await downloadImage(b.wikiFile, path.join(PUBLIC, "bosses", `${b.id}.png`));
  }

  // --- Foods/Recipes ---
  console.log(`\n📋 NEW RECIPES/FOODS (${NEW_RECIPES.length}):`);
  for (const recipeId of NEW_RECIPES) {
    const wikiName = RECIPE_WIKI_NAMES[recipeId] || `${recipeId.replace(/_/g, "_")}.png`;
    await downloadImage(wikiName, path.join(PUBLIC, "foods", `${recipeId}.png`));
  }

  console.log("\n✅ Done!");
}

main().catch(console.error);
