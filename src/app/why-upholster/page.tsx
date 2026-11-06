import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { site, whyUpholster } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why Upholster",
  description:
    "Why reupholster instead of replace? Sterling Custom Upholstery explains the value in a solid frame, skilled hand work, and greener furniture choices.",
};

export default function WhyUpholsterPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col pb-20 lg:pb-0">
        <PageHero
          kicker="Why upholster"
          title={
            <>
              Keep the frame.
              <br />
              Renew the rest.
            </>
          }
          lede="A solid hardwood frame is often worth more than buying new."
          image={{
            src: "/images/heroes/hero-classic.jpg",
            alt: "Classic floral sofa in a white photography studio",
            width: 1536,
            height: 1024,
            // Landmark: floral sofa seat; subject = full silhouette.
            // Why-only: subject-safe = nav bottom → banner bottom.
            focalX: 0.5,
            focalY: 0.53,
            fillFrame: true,
            bleed: true,
            fitSubjectToSafeRegion: "nav-banner",
            subject: { l: 0.27, t: 0.34, r: 0.73, b: 0.73 },
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
          <p className="max-w-3xl text-base leading-relaxed text-foreground/85 md:text-lg">
            {whyUpholster.intro}
          </p>

          <div className="mt-12 grid gap-10 md:gap-14">
            {whyUpholster.sections.map((section) => (
              <article key={section.title} className="max-w-3xl">
                <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-3 h-[2px] w-14 bg-gold" />
                <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">
                  {section.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Button
              render={<Link href="/contact" />}
              size="lg"
              className="h-12 rounded-md bg-burgundy px-6 text-base font-semibold text-white hover:bg-burgundy/90"
            >
              Get an estimate
            </Button>
            <Button
              render={<Link href="/about" />}
              variant="outline"
              size="lg"
              className="h-12 rounded-md border-burgundy/30 px-6 text-base font-semibold text-burgundy hover:bg-burgundy/5"
            >
              Meet the shop
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  );
}
