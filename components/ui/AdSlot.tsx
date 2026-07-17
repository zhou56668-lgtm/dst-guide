import { clsx } from "clsx";

interface AdSlotProps {
  position?: "sidebar" | "banner" | "in-content";
  className?: string;
}

export function AdSlot({ position = "banner", className }: AdSlotProps) {
  return (
    <div
      className={clsx(
        "ad-placeholder",
        position === "sidebar" && "min-h-[250px] w-full max-w-[300px]",
        position === "banner" && "w-full min-h-[90px]",
        position === "in-content" && "w-full min-h-[90px]",
        className
      )}
    >
      <span>广告位 — Google AdSense</span>
    </div>
  );
}
