import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "red" | "green" | "purple";
  className?: string;
}

const variants = {
  default: "bg-bg-tertiary text-text-secondary border-border",
  gold: "bg-[rgba(201,164,75,0.15)] text-gold border-gold/30",
  red: "bg-[rgba(196,69,54,0.15)] text-red-400 border-red-800/30",
  green: "bg-[rgba(74,124,79,0.15)] text-green-400 border-green-800/30",
  purple: "bg-[rgba(107,79,160,0.15)] text-purple-400 border-purple-800/30",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
