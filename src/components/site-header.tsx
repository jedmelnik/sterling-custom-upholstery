"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  variant?: "overlay" | "solid";
};

/**
 * Fixed site nav: transparent over the hero at the top, then a solid bar
 * on scroll. Mobile uses a hamburger dropdown for the primary links.
 */
export function SiteHeader({ variant = "overlay" }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const forceSolid = variant === "solid";
  const solid = forceSolid || scrolled || menuOpen;

  useEffect(() => {
    if (forceSolid) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceSolid]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ease-out",
        solid
          ? "border-b border-border/70 bg-[#f7f1ea]/95 shadow-[0_8px_24px_rgba(61,18,18,0.08)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="site-wrap flex items-center justify-between gap-3 py-3 md:gap-4 md:py-3.5">
        <BrandMark
          tone={solid ? "dark" : "light"}
          onClick={() => setMenuOpen(false)}
          className="min-w-0"
        />

        <div className="flex items-center gap-2 sm:gap-3">
          <nav
            className="hidden items-center gap-1 lg:flex xl:gap-2"
            aria-label="Primary"
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-md px-2 py-1.5 text-[0.8rem] font-medium transition-colors xl:px-2.5 xl:text-sm",
                  solid
                    ? "text-ink/80 hover:text-ink"
                    : "text-white/85 hover:text-white",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <Button
            render={<a href={site.phoneHref} />}
            size="sm"
            className={cn(
              "hidden h-9 rounded-md px-3 text-sm font-semibold sm:inline-flex",
              solid
                ? "bg-burgundy text-white hover:bg-burgundy/90"
                : "bg-gold text-ink hover:bg-gold/90",
            )}
          >
            {site.phone}
          </Button>

          <button
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-md lg:hidden",
              solid
                ? "text-ink hover:bg-muted"
                : "text-white hover:bg-white/10",
            )}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id={menuId}
          className="border-t border-border/60 bg-[#f7f1ea] lg:hidden"
        >
          <nav
            className="site-wrap flex flex-col gap-1 py-4"
            aria-label="Mobile"
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-muted"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              className="mt-2 rounded-md bg-burgundy px-3 py-3 text-center text-base font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              Call {site.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
