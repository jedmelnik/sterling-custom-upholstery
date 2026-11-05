import type { Metadata } from "next";
import { Fraunces, Pinyon_Script, Source_Sans_3 } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
});

const script = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Mountain View Custom Upholstery`,
    template: `%s | ${site.shortName}`,
  },
  description:
    "Sterling Custom Upholstery has served the Bay Area since 1966 with fine residential and commercial reupholstery, fabric selection, free pickup and delivery. Call (650) 961-8700.",
  openGraph: {
    title: site.name,
    description:
      "Owner-operated custom upholstery in Mountain View since 1966 - residential and commercial, with free consultation, pickup, and delivery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${script.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-body">{children}</body>
    </html>
  );
}
