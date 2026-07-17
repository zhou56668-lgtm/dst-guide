import { clsx } from "clsx";
import { Link } from "@/i18n/navigation";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200";

const variantStyles = {
  primary: "bg-accent text-white hover:bg-red-700 shadow-lg shadow-red-900/20",
  secondary: "bg-gold text-black hover:bg-gold-light shadow-lg shadow-amber-900/20",
  outline: "border border-border text-text-secondary hover:border-gold hover:text-gold bg-transparent",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: ButtonProps) {
  const classes = clsx(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
