import { MetadataRoute } from "next";
import { characters } from "@/lib/game-data/characters";
import { bosses } from "@/lib/game-data/bosses";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dst-guide.vercel.app";
  const now = new Date();

  const locales = ["zh", "en"];

  const staticRoutes = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/guide", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/guide/beginner", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/guide/characters", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/guide/bosses", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/guide/cooking", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/tools", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/tools/recipe", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/tools/damage", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/mods", changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const dynamicRoutes = [
    ...characters.map((c) => `/guide/characters/${c.id}`),
    ...bosses.map((b) => `/guide/bosses/${b.id}`),
    ...["first-days", "four-seasons", "sanity-management", "base-building-101", "kiting-basics"].map(
      (slug) => `/guide/beginner/${slug}`
    ),
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const prefix = `/${locale}`;

    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}${prefix}${route.path}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }

    for (const route of dynamicRoutes) {
      entries.push({
        url: `${baseUrl}${prefix}${route}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  return entries;
}
