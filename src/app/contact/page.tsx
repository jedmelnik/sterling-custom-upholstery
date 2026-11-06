import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sterling Custom Upholstery in Mountain View for an estimate. Call (650) 961-8700. Showroom at 1243 W El Camino Real. Mon-Fri 9:30am-5:30pm.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col pb-20 lg:pb-0">
        <PageHero
          kicker="Get started"
          title="Request an estimate"
          lede="Call today or send a photo of your piece."
          image={{
            src: "/images/heroes/hero-commercial.jpg",
            alt: "Colorful upholstered rolling stools in a white photography studio",
            width: 1536,
            height: 1024,
            // Landmark: center of the stool cluster
            focalX: 0.5,
            focalY: 0.52,
            fillFrame: true,
            bleed: true,
            fitSubjectToSafeRegion: true,
            subject: { l: 0.27, t: 0.37, r: 0.74, b: 0.71 },
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
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                Showroom
              </h2>
              <address className="mt-4 not-italic text-base leading-relaxed text-foreground/85">
                {site.name}
                <br />
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </address>
              <p className="mt-4">
                <a
                  href={site.phoneHref}
                  className="text-lg font-semibold text-burgundy hover:underline"
                >
                  {site.phone}
                </a>
              </p>
              <p className="mt-2">
                <a
                  href={site.emailHref}
                  className="text-base text-burgundy hover:underline"
                >
                  {site.email}
                </a>
              </p>
              <p className="mt-4 text-sm text-foreground/70">
                Hours: {site.hoursSummary}
                <br />
                Closed Saturday and Sunday
              </p>
              <p className="mt-3 text-sm text-foreground/70">
                Serving clients throughout {site.serviceArea}.
              </p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-burgundy hover:underline"
              >
                Get directions on Google Maps
              </a>

              <div className="mt-8 overflow-hidden rounded-md border border-border bg-muted">
                <iframe
                  title="Map to Sterling Custom Upholstery"
                  src={site.mapsEmbed}
                  className="h-64 w-full border-0 md:h-72"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <ul className="mt-8 hidden space-y-1 text-sm text-foreground/70 md:block">
                {site.hours.map((row) => (
                  <li
                    key={row.day}
                    className="flex justify-between gap-6 border-b border-border/50 py-2"
                  >
                    <span>{row.day}</span>
                    <span className="font-medium text-ink">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                Send a message
              </h2>
              <p className="mt-3 text-base text-foreground/75">
                A picture is worth a thousand words. Send a photo of your
                furniture and briefly describe how you want it to look - we will
                follow up with suggestions and an estimate.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  );
}
