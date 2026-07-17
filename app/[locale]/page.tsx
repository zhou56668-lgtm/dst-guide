import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedGuides } from "@/components/home/FeaturedGuides";
import { ToolShowcase } from "@/components/home/ToolShowcase";
import { AdSlot } from "@/components/ui/AdSlot";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedGuides />
      <ToolShowcase />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AdSlot position="banner" />
      </div>
    </div>
  );
}
