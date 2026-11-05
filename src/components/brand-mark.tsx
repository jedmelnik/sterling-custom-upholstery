import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Light text for dark heroes; ink for solid headers/footers. */
  tone?: "light" | "dark" | "gold";
  showEstablished?: boolean;
  href?: string;
  onClick?: () => void;
};

/**
 * Original brand is a text lockup (Pinyon Script + established line),
 * not a separate logo file. Keep that mark rather than inventing one.
 */
export function BrandMark({
  className,
  tone = "dark",
  showEstablished = true,
  href = "/",
  onClick,
}: Props) {
  const nameColor =
    tone === "light"
      ? "text-white"
      : tone === "gold"
        ? "text-gold"
        : "text-burgundy";
  const estColor =
    tone === "light"
      ? "text-white/70"
      : tone === "gold"
        ? "text-gold/80"
        : "text-ink/55";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn("group flex flex-col leading-none", className)}
    >
      <span
        className={cn(
          "font-script text-[1.55rem] tracking-wide transition-opacity group-hover:opacity-90 sm:text-[1.75rem] md:text-[1.95rem]",
          nameColor,
        )}
      >
        {site.name}
      </span>
      {showEstablished ? (
        <span
          className={cn(
            "mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em]",
            estColor,
          )}
        >
          Established {site.established}
        </span>
      ) : null}
    </Link>
  );
}
