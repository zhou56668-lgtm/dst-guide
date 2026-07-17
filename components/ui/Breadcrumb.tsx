import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export async function Breadcrumb({ items }: { items: Crumb[] }) {
  const t = await getTranslations("common");

  return (
    <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-6 flex-wrap">
      <Link href="/" className="hover:text-gold transition-colors">
        {t("home")}
      </Link>

      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-gold transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-text-primary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
