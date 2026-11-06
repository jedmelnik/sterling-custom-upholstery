import type { ReactNode } from "react";
import { FocalBanner } from "@/components/focal-banner";

export type HeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Landmark in the source file (0-1). The banner pins this point. */
  focalX: number;
  focalY: number;
  subject?: { l: number; t: number; r: number; b: number };
  fillFrame?: boolean;
  bleed?: boolean;
  /**
   * Keep subject silhouette inside Jed's subject-safe region (desktop+).
   * `true` = text-lockup vertical band; `"nav-banner"` = nav bottom → banner bottom.
   */
  fitSubjectToSafeRegion?: boolean | "nav-banner";
};

type Props = {
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  image: HeroImage;
  size?: "home" | "page";
  ledeOnMobile?: boolean;
};

/** Brand fill beyond the capped media plane (website-banners). */
export const HERO_FILL = "#3d1212";

/**
 * Shared banner stage height — home is the source of truth.
 * Breakpoints match home's content-driven heights (413 / 480 / 518) so every
 * PageHero renders the same stage height at the same viewport.
 */
export const HERO_STAGE_CLASS =
  "site-wrap relative flex items-end " +
  "min-h-[25.8125rem] md:min-h-[30rem] lg:min-h-[32.375rem] " +
  "pb-9 pt-24 md:pb-12 md:pt-28";

/**
 * Shared banner frame - website-banners skill:
 * - Shared HERO_STAGE_CLASS keeps home + interiors the same height
 * - Left-justified type → gradient from the left; fades before the subject
 * - Photo + gradient on a centered media plane max 1600px; brand fill beyond
 */
export function PageHero({
  kicker,
  title,
  lede,
  actions,
  image,
  size = "page",
  ledeOnMobile = false,
}: Props) {
  const home = size === "home";

  return (
    <section
      className="relative isolate overflow-hidden text-white"
      style={{ backgroundColor: HERO_FILL }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-[1600px] -translate-x-1/2 overflow-hidden"
      >
        <FocalBanner
          src={image.src}
          width={image.width}
          height={image.height}
          focalX={image.focalX}
          focalY={image.focalY}
          subject={image.subject}
          fillFrame={image.fillFrame}
          fitSubjectToSafeRegion={image.fitSubjectToSafeRegion}
          edgeColor={HERO_FILL}
        />
        <div
          className={`absolute inset-0 hidden bg-gradient-to-r lg:block ${
            image.bleed && (home || image.fitSubjectToSafeRegion)
              ? // Hold dark under wide lockups so text-safe extrema stay readable
                // against the studio plate (home + safe-region interiors).
                "from-[#3d1212] from-0% via-[#3d1212]/94 via-[36%] to-transparent to-[58%]"
              : image.bleed
                ? "from-[#3d1212] from-0% via-[#3d1212]/88 via-[28%] to-transparent to-[50%]"
                : "from-[#3d1212] from-0% via-[#3d1212]/90 via-[24%] to-transparent to-[48%]"
          }`}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[#3d1212]/55 lg:hidden"
          aria-hidden
        />
        {/* Soft top wash so white nav stays readable over light studio photos */}
        <div
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#3d1212]/70 via-[#3d1212]/35 to-transparent"
          aria-hidden
        />
      </div>

      <div className={HERO_STAGE_CLASS}>
        <div
          data-hero-lockup
          className={`animate-rise w-full ${
            home ? "max-w-xl xl:max-w-2xl" : "max-w-md lg:max-w-lg xl:max-w-xl"
          }`}
        >
          {kicker ? (
            <p
              data-hero-box="text"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/65 md:text-xs"
            >
              {kicker}
            </p>
          ) : null}
          <h1
            data-hero-box="text"
            className={`mt-2 font-display tracking-tight text-white ${
              home
                ? "text-balance text-[clamp(2.35rem,6.5vw,4.25rem)] leading-[1.05]"
                : "text-[clamp(1.85rem,4.2vw,2.75rem)] leading-[1.12]"
            }`}
          >
            {title}
          </h1>
          <div
            data-hero-box="rule"
            className={`h-[3px] w-20 bg-gold md:w-24 ${home ? "mt-3" : "mt-2.5"}`}
          />
          {lede ? (
            <p
              data-hero-box="text"
              className={`text-white/80 ${
                home
                  ? "mt-4 max-w-md text-pretty text-base leading-relaxed md:text-lg"
                  : "mt-3 max-w-lg text-[1.02rem] leading-snug"
              } ${ledeOnMobile ? "block" : "hidden md:block"}`}
            >
              {lede}
            </p>
          ) : null}
          <span className="sr-only">{image.alt}</span>
          {actions ? (
            <div
              data-hero-actions
              className={`flex flex-wrap items-center gap-3 ${home ? "mt-6" : "mt-4"}`}
            >
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
