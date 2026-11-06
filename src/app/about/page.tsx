import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { aboutCopy, processSteps, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Owner-operated since 1966 in Mountain View. Sterling Custom Upholstery does all work on premise for residential and commercial clients across the Bay Area.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col pb-20 lg:pb-0">
        <PageHero
          kicker="Who we are"
          title="Owner-operated since 1966"
          lede="Skilled craftsmen. All work done on premise in Mountain View."
          image={{
            src: "/images/categories/contemporary.jpg",
            alt: "Finished contemporary sofa from Sterling Custom Upholstery",
            width: 1400,
            height: 833,
            // Landmark: middle seat of the red sofa
            focalX: 0.55,
            focalY: 0.56,
            fillFrame: true,
            bleed: true,
            subject: { l: 0.12, t: 0.4, r: 0.98, b: 0.78 },
          }}
          actions={
            <Button
              render={<a href={site.phoneHref} />}
              size="lg"
              className="h-11 rounded-md bg-gold px-5 text-sm font-semibold text-ink hover:bg-gold/90 md:h-12 md:px-6"
            >
              Call {site.phone}
            </Button>
          }
        />

        <section className="site-wrap py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
              {aboutCopy.intro}
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/85 md:text-lg">
              {aboutCopy.closing}
            </p>
          </div>

          <div className="mt-14">
            <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
              Custom services
            </h2>
            <div className="mt-3 h-[2px] w-14 bg-gold" />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-gold/70 pl-4 text-sm leading-relaxed text-foreground/80 md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
              How a job moves through the shop
            </h2>
            <div className="mt-3 h-[2px] w-14 bg-gold" />
            <ol className="mt-8 grid gap-8 md:grid-cols-3">
              {processSteps.map((step, index) => (
                <li key={step.title}>
                  <p className="text-sm font-semibold text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75 md:text-base">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Button
              render={<Link href="/portfolio" />}
              size="lg"
              className="h-12 rounded-md bg-burgundy px-6 text-base font-semibold text-white hover:bg-burgundy/90"
            >
              See the portfolio
            </Button>
            <Button
              render={<Link href="/fabrics" />}
              variant="outline"
              size="lg"
              className="h-12 rounded-md border-burgundy/30 px-6 text-base font-semibold text-burgundy hover:bg-burgundy/5"
            >
              Browse fabrics
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  );
}
