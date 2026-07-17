import Image from "next/image";
import { clsx } from "clsx";

interface GameImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  variant?: "portrait" | "card" | "icon" | "banner";
}

const variantSizes = {
  portrait: { w: 400, h: 400 },
  card: { w: 300, h: 200 },
  icon: { w: 64, h: 64 },
  banner: { w: 800, h: 400 },
};

export function GameImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  variant = "portrait",
}: GameImageProps) {
  const w = width || variantSizes[variant].w;
  const h = height || variantSizes[variant].h;

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-lg bg-bg-tertiary border border-border",
        className
      )}
      style={{ aspectRatio: `${w}/${h}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-2"
        sizes={variant === "icon" ? "64px" : variant === "card" ? "300px" : "(max-width: 768px) 100vw, 400px"}
        priority={priority}
      />
    </div>
  );
}
