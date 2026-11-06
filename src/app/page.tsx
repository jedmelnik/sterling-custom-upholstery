import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { processSteps, serviceCategories, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex flex-1 flex-col pb-20 lg:pb-0">
        <PageHero
          size="home"
          kicker={`Mountain View · Est. ${site.established}`}
          title={
            <>
              Sterling Custom
              <br />
              Upholstery
            </>
          }
          lede="Fine craftsmanship for sofas, chairs, antiques, and commercial seating - with free consultation, pickup, and delivery."
          ledeOnMobile
          // Landmark: center of the red sofa seat cushion
          image={{
            src: "/images/categories/contemporary.jpg",
            alt: "Contemporary sofa with light patterned upholstery",
            width: 1400,
            height: 833,
            focalX: 0.55,
            focalY: 0.58,
            fillFrame: true,
            bleed: true,
            // Sofa body only - skip excess studio white above/below
            subject: { l: 0.1, t: 0.34, r: 0.98, b: 0.86 },
          }}
          actions={
            <>
              <Button
                render={<a href={site.phoneHref} />}
                size="lg"
                className="h-11 rounded-md bg-gold px-5 text-sm font-semibold text-ink shadow-none transition-transform hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.99] md:h-12 md:px-6 md:text-base"
              >
                Call {site.phone}
              </Button>
              <Button
                render={<Link href="/contact" />}
                variant="outline"
                size="lg"
                className="hidden h-11 rounded-md border-white/40 bg-transparent px-5 text-sm font-semibold text-white hover:bg-white/10 hover:text-white lg:inline-flex md:h-12 md:px-6 md:text-base"
              >
                Request an estimate
              </Button>
            </>
          }
        />

        <section className="site-wrap py-14 md:py-20">
          <div className="max-w-3xl animate-rise">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy/60">
              Bay Area craftsmanship
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl">
              Restore the pieces you love
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/80 md:text-lg">
              Sterling Custom Upholstery has been satisfying customers throughout
              the Bay Area with fine, quality custom upholstery for decades. We
              pride ourselves on craftsmanship and attention to detail - whether
              you are sprucing up an old sofa or undertaking a complete interior
              project.
            </p>
            <p className="mt-4 hidden text-base leading-relaxed text-foreground/80 md:block md:text-lg">
              No job is too big or too small. We can upholster an entire home of
              furniture or simply refresh that treasured piece with new cushion
              fill. Commercial projects for offices, hotels, and restaurants are
              welcome too.
            </p>
          </div>
        </section>

        <section className="border-y border-border/70 bg-card/60 py-14 md:py-20">
          <div className="site-wrap">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy/60">
                What we do
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl">
                Residential and commercial work
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">
                Contemporary, classic, and commercial seating - rebuilt in our
                Mountain View shop.
              </p>
            </div>

            {/* Mobile: single entry; desktop: three open rows */}
            <div className="mt-8 md:hidden">
              <Link
                href="/portfolio"
                className="group relative block overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/categories/classic.jpg"
                    alt="Classic upholstered seating"
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: "55% 45%" }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-2xl text-white">
                    View our portfolio
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    Before-and-after work from the shop
                  </p>
                </div>
              </Link>
            </div>

            <div className="mt-10 hidden gap-8 md:grid md:grid-cols-3">
              {serviceCategories.map((category) => (
                <Link
                  key={category.slug}
                  href="/portfolio"
                  className="group block animate-rise"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src={category.image}
                      alt={category.imageAlt}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-2xl tracking-tight text-ink">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {category.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="site-wrap py-14 md:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy/60">
              Our process
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl">
              From consultation to delivery
            </h2>
          </div>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <li key={step.title} className="animate-rise">
                <p className="text-sm font-semibold text-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75 md:text-base">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-border/70 bg-burgundy py-14 text-white md:py-16">
          <div className="site-wrap flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl tracking-tight md:text-4xl">
                Visit the showroom
              </h2>
              <p className="mt-3 text-base text-white/75">
                {site.address.full}
                <br />
                {site.hoursSummary} · Closed weekends
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                render={<a href={site.phoneHref} />}
                size="lg"
                className="h-12 rounded-md bg-gold px-6 text-base font-semibold text-ink hover:bg-gold/90"
              >
                Call {site.phone}
              </Button>
              <Button
                render={<Link href="/contact" />}
                variant="outline"
                size="lg"
                className="h-12 rounded-md border-white/35 bg-transparent px-6 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                Contact us
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
