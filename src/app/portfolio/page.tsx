import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { portfolioPairs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Before-and-after custom upholstery from Sterling Custom Upholstery in Mountain View - sofas, chairs, antiques, and commercial seating.",
};

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col pb-20 lg:pb-0">
        <PageHero
          kicker="Our portfolio"
          title="Before and after"
          lede="Real pieces rebuilt in our Mountain View shop."
          image={{
            src: "/images/portfolio/after22.jpg",
            alt: "Statement sofa after custom upholstery",
            width: 765,
            height: 400,
            // Landmark: tapestry pillows on the finished sofa
            focalX: 0.5,
            focalY: 0.45,
            fillFrame: true,
            bleed: true,
            // Pillows band - short enough for ≥70% ultrawide cover
            subject: { l: 0.04, t: 0.18, r: 0.96, b: 0.66 },
          }}
          actions={
            <Button
              render={<Link href="/contact" />}
              size="lg"
              className="h-11 rounded-md bg-gold px-5 text-sm font-semibold text-ink hover:bg-gold/90 md:h-12 md:px-6"
            >
              Start your project
            </Button>
          }
        />

        <section className="site-wrap py-14 md:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy/60">
              Shop results
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl">
              Transformations from the workroom
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">
              A selection of before-and-after projects from our portfolio. Call{" "}
              {site.phone} to talk through your own piece.
            </p>
          </div>

          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioPairs.map((pair) => (
              <figure key={pair.id} className="group">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
                    <Image
                      src={pair.before}
                      alt={`${pair.label} before upholstery`}
                      fill
                      sizes="(min-width: 1024px) 15vw, (min-width: 640px) 22vw, 45vw"
                      className="object-cover"
                    />
                    <span className="absolute left-2 top-2 rounded bg-ink/75 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
                      Before
                    </span>
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
                    <Image
                      src={pair.after}
                      alt={`${pair.label} after upholstery`}
                      fill
                      sizes="(min-width: 1024px) 15vw, (min-width: 640px) 22vw, 45vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-2 top-2 rounded bg-burgundy/85 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
                      After
                    </span>
                  </div>
                </div>
                <figcaption className="mt-3 text-sm font-medium text-ink">
                  {pair.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  );
}
