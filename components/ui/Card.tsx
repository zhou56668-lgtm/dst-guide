import { Link } from "@/i18n/navigation";
import { clsx } from "clsx";

interface CardProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function Card({ href, className, children }: CardProps) {
  const classes = clsx("card-dst p-6 block", className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
