import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { fabricCollections, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fabrics",
  description:
    "Browse fabric collections at Sterling Custom Upholstery - microfibers, suedes, tapestries, leather alternatives, and more. Take samples home.",
};

export default function FabricsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col pb-20 lg:pb-0">
        <PageHero
          kicker="Fabrics"
          title="Find the right cloth"
          lede="Review samples in the showroom and take them home to decide."
          image={{
            src: "/images/fabrics/Traditional-Textures-and-Classic-Tapestries.jpg",
            alt: "Traditional texture and tapestry fabric samples",
            width: 415,
            height: 480,
            focalX: 0.5,
            focalY: 0.45,
            fillFrame: true,
            bleed: true,
            subject: { l: 0.05, t: 0.1, r: 0.95, b: 0.9 },
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
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy/60">
              Collections
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl">
              Fabrics for every project
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">
              From durable microfibers to classic tapestries, we help you choose
              materials that fit the room, the wear, and the look you want.
            </p>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {fabricCollections.map((fabric) => (
              <article key={fabric.title}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
                  <Image
                    src={fabric.image}
                    alt={fabric.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl tracking-tight text-ink">
                  {fabric.title}
                </h3>
              </article>
            ))}
          </div>

          <div className="mt-14 max-w-2xl rounded-md border border-border/80 bg-card/70 p-6 md:p-8">
            <h2 className="font-display text-2xl tracking-tight text-ink">
              Visit with samples
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/75">
              Bring a photo of your piece to an in-store consultation. We will
              walk through options together, and you can take fabric samples home
              before you decide.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                render={<Link href="/contact" />}
                size="lg"
                className="h-11 rounded-md bg-burgundy px-5 text-sm font-semibold text-white hover:bg-burgundy/90"
              >
                Book a consultation
              </Button>
              <Button
                render={<a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" />}
                variant="outline"
                size="lg"
                className="h-11 rounded-md border-burgundy/30 px-5 text-sm font-semibold text-burgundy hover:bg-burgundy/5"
              >
                Get directions
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  );
}
