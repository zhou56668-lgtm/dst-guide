"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, X, Search } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_ITEMS = [
    { href: "/guide", key: "guide" },
    { href: "/guide/characters", key: "characters" },
    { href: "/guide/bosses", key: "boss" },
    { href: "/guide/cooking", key: "cooking" },
    { href: "/tools", key: "tools" },
    { href: "/mods", key: "mods" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🔥</span>
            <span className="text-xl font-bold text-gold font-[family-name:var(--font-display)] group-hover:text-gold-light transition-colors">
              {t("siteName")}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-text-secondary hover:text-gold hover:bg-bg-hover rounded-lg transition-colors text-sm font-medium"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Search + Language + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-text-secondary hover:text-gold transition-colors rounded-lg hover:bg-bg-hover">
              <Search className="w-5 h-5" />
            </button>
            <LanguageSwitcher />
            <button
              className="md:hidden p-2 text-text-secondary hover:text-gold transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-bg-primary animate-[fade-in_0.2s_ease-out]">
          <nav className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-text-secondary hover:text-gold hover:bg-bg-hover rounded-lg transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
