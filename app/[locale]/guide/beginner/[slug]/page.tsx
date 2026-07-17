import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getGuideContent, getAllGuideSlugs } from "@/lib/guides";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { AdSlot } from "@/components/ui/AdSlot";
import type { Metadata } from "next";

interface Props { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const slugs = getAllGuideSlugs("beginner");
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["zh", "en"]) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const tc = await getTranslations("common");
  const guide = getGuideContent("beginner", slug, locale);
  if (!guide) return { title: tc("notFound") };
  return {
    title: guide.title,
    description: guide.description,
  };
}

export default async function BeginnerGuidePage({ params }: Props) {
  const { locale, slug } = await params;
  const tc = await getTranslations("common");
  const guide = getGuideContent("beginner", slug, locale);
  if (!guide) notFound();

  const diffLabel = tc(`difficulty.${guide.difficulty}`);
  const diffVariant = guide.difficulty === "beginner" ? ("green" as const) : ("gold" as const);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[
        { label: tc("guideCenter"), href: "/guide" },
        { label: tc("guideCenter"), href: "/guide/beginner" },
        { label: guide.title },
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">{guide.title}</h1>
            <Badge variant={diffVariant}>{diffLabel}</Badge>
          </div>
          <p className="text-text-secondary mb-8">{guide.description}</p>

          <div className="prose-dst">
            {guide.sections.map((section, i) => (
              <div key={i}>
                <h2>{section.heading}</h2>
                {section.content.split("\n\n").map((para, j) => (
                  <p key={j} dangerouslySetInnerHTML={{ __html: formatText(para) }} />
                ))}
              </div>
            ))}
          </div>

          <AdSlot position="in-content" />
        </div>

        <aside className="space-y-6">
          <div className="card-dst p-5 sticky top-24">
            <h3 className="font-bold text-gold font-[family-name:var(--font-display)] mb-3">{tc("tableOfContents")}</h3>
            <nav className="space-y-1">
              {guide.sections.map((s, i) => (
                <a
                  key={i}
                  href={`#${s.heading}`}
                  className="block text-sm text-text-secondary hover:text-gold transition-colors py-1"
                >
                  {s.heading}
                </a>
              ))}
            </nav>
          </div>
          <AdSlot position="sidebar" />
        </aside>
      </div>
    </div>
  );
}

function formatText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>")
    .replace(/^💡 /, "💡 <strong>")
    .replace(/^⚡ /, "⚡ <strong>");
}
