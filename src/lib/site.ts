export const site = {
  name: "Sterling Custom Upholstery",
  shortName: "Sterling Upholstery",
  legalName: "Sterling Custom Upholstery Co.",
  tagline: "Fine custom upholstery since 1966",
  established: 1966,
  copyrightYear: 2026,
  phone: "(650) 961-8700",
  phoneHref: "tel:+16509618700",
  email: "sterlingupholstery@att.net",
  emailHref: "mailto:sterlingupholstery@att.net",
  address: {
    street: "1243 W El Camino Real",
    city: "Mountain View",
    state: "CA",
    zip: "94040",
    full: "1243 W El Camino Real, Mountain View, CA 94040",
  },
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=1243+W+El+Camino+Real,+Mountain+View,+CA+94040",
  mapsEmbed:
    "https://www.google.com/maps?q=1243+W+El+Camino+Real,+Mountain+View,+CA+94040&output=embed",
  serviceArea: "Mountain View and the San Francisco Bay Area",
  sourceUrl: "https://www.sterlingcustomupholstery.com/",
  hours: [
    { day: "Monday", time: "9:30am-5:30pm" },
    { day: "Tuesday", time: "9:30am-5:30pm" },
    { day: "Wednesday", time: "9:30am-5:30pm" },
    { day: "Thursday", time: "9:30am-5:30pm" },
    { day: "Friday", time: "9:30am-5:30pm" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "Closed" },
  ],
  hoursSummary: "Mon-Fri 9:30am-5:30pm",
  yelpUrl:
    "https://www.yelp.com/biz/sterling-custom-upholstery-company-mountain-view",
  yelpRating: "4.1",
  yelpCount: "117",
  bbbUrl:
    "https://www.bbb.org/sanjose/business-reviews/upholsterers/sterling-custom-upholstery-in-mountain-view-ca-198350",
  angiUrl:
    "https://www.angieslist.com/companylist/us/ca/mountain-view/sterling-custom-upholstery-reviews-157407.aspx",
} as const;

export const navLinks = [
  { label: "Why Upholster", href: "/why-upholster" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Fabrics", href: "/fabrics" },
  { label: "Contact", href: "/contact" },
] as const;

export type SocialNetwork = "facebook" | "pinterest" | "yelp";

export const socialLinks: {
  network: SocialNetwork;
  href: string;
  label: string;
}[] = [
  {
    network: "facebook",
    href: "https://www.facebook.com/pages/Sterling-Custom-Upholstery/126277430905588",
    label: "Facebook",
  },
  {
    network: "pinterest",
    href: "https://www.pinterest.com/sterlingupholst/",
    label: "Pinterest",
  },
  {
    network: "yelp",
    href: site.yelpUrl,
    label: "Yelp",
  },
];

export const serviceCategories = [
  {
    slug: "contemporary",
    title: "Contemporary",
    summary:
      "Clean lines and modern silhouettes refreshed with fabrics that suit today's rooms.",
    image: "/images/categories/contemporary.jpg",
    imageAlt: "Contemporary sofa with light patterned upholstery",
    width: 1400,
    height: 833,
  },
  {
    slug: "classic",
    title: "Classic",
    summary:
      "Traditional frames restored with careful detailing, new padding, and lasting materials.",
    image: "/images/categories/classic.jpg",
    imageAlt: "Classic wingback chairs and sofa in a formal living room",
    width: 1200,
    height: 798,
  },
  {
    slug: "commercial",
    title: "Commercial",
    summary:
      "Durable upholstery for offices, hotels, restaurants, and other high-traffic spaces.",
    image: "/images/categories/commercial.jpg",
    imageAlt: "Upholstered commercial bar stools in a dining setting",
    width: 700,
    height: 525,
  },
] as const;

export const services = [
  "Fine custom upholstery for furniture of every size - from ottomans to large sectionals",
  "Restoration of upholstered antiques",
  "Commercial upholstery for offices, hotels, and restaurants",
  "Dining chairs, desk chairs, and bar stools",
  "Chair cushions and pads",
  "Outdoor furniture, cushions, and Fibertex",
  "Custom cushions, window seats, and kitchen nooks",
  "Throw pillows of all styles",
  "Custom cushion fill, feather fill, feather packages, and polyester fills",
] as const;

export const processSteps = [
  {
    title: "In-store consultation",
    body: "Meet with us to discuss your needs and review fabric samples. Take samples home to decide what works best in your space.",
  },
  {
    title: "Pickup and rebuild",
    body: "We strip the old fabric, filling, and padding, then repair or replace springs as needed before reupholstering.",
  },
  {
    title: "Delivery",
    body: "When the work is complete, we can deliver the finished piece to your home or business.",
  },
] as const;

export const fabricCollections = [
  {
    title: "Durable Microfibers",
    image: "/images/fabrics/Durable-Microfibers.jpg",
    alt: "Swatches of durable microfiber fabrics",
  },
  {
    title: "Leather Alternatives and Recycled Leathers",
    image: "/images/fabrics/Leather-Alternatives-and-Recycled-Leathers.jpg",
    alt: "Leather alternative and recycled leather fabric samples",
  },
  {
    title: "Micro Suedes and Textures",
    image: "/images/fabrics/Micro-Suedes-and-Textures.jpg",
    alt: "Micro suede and textured fabric samples",
  },
  {
    title: "Traditional Textures and Classic Tapestries",
    image: "/images/fabrics/Traditional-Textures-and-Classic-Tapestries.jpg",
    alt: "Traditional texture and tapestry fabric samples",
  },
  {
    title: "Whimsical Patterns",
    image: "/images/fabrics/Whimsical-Patterns.jpg",
    alt: "Whimsical patterned fabric samples",
  },
] as const;

/** Before/after pairs from the live portfolio slideshow. */
export const portfolioPairs = [
  { id: 1, before: "/images/portfolio/before1.jpg", after: "/images/portfolio/after1.jpg", label: "Living room seating" },
  { id: 3, before: "/images/portfolio/before3.jpg", after: "/images/portfolio/after3.jpg", label: "Armchair refresh" },
  { id: 4, before: "/images/portfolio/before4.jpg", after: "/images/portfolio/after4.jpg", label: "Sofa transformation" },
  { id: 5, before: "/images/portfolio/before5.jpg", after: "/images/portfolio/after5.jpg", label: "Classic recline" },
  { id: 7, before: "/images/portfolio/before7.jpg", after: "/images/portfolio/after7.jpg", label: "Dining chairs" },
  { id: 8, before: "/images/portfolio/before8.jpg", after: "/images/portfolio/after8.jpg", label: "Ottoman and seating" },
  { id: 9, before: "/images/portfolio/before9.jpg", after: "/images/portfolio/after9.jpg", label: "Bench and accents" },
  { id: 10, before: "/images/portfolio/before10.jpg", after: "/images/portfolio/after10.jpg", label: "Sectional seating" },
  { id: 11, before: "/images/portfolio/before11.jpg", after: "/images/portfolio/after11.jpg", label: "Wingback chairs" },
  { id: 12, before: "/images/portfolio/before12.jpg", after: "/images/portfolio/after12.jpg", label: "Lounge chairs" },
  { id: 14, before: "/images/portfolio/before14.jpg", after: "/images/portfolio/after14.jpg", label: "Occasional chairs" },
  { id: 15, before: "/images/portfolio/before15.jpg", after: "/images/portfolio/after15.jpg", label: "Sofa and loveseat" },
  { id: 16, before: "/images/portfolio/before16.jpg", after: "/images/portfolio/after16.jpg", label: "Family room seating" },
  { id: 17, before: "/images/portfolio/before17.jpg", after: "/images/portfolio/after17.jpg", label: "Custom cushions" },
  { id: 18, before: "/images/portfolio/before18.jpg", after: "/images/portfolio/after18.jpg", label: "Formal seating" },
  { id: 19, before: "/images/portfolio/before19.jpg", after: "/images/portfolio/after19.jpg", label: "Antique restoration" },
  { id: 20, before: "/images/portfolio/before20.jpg", after: "/images/portfolio/after20.jpg", label: "Headboard and seating" },
  { id: 21, before: "/images/portfolio/before21.jpg", after: "/images/portfolio/after21.jpg", label: "Commercial seating" },
  { id: 22, before: "/images/portfolio/before22.jpg", after: "/images/portfolio/after22.jpg", label: "Statement sofa" },
] as const;

export const whyUpholster = {
  intro:
    "If your old sofa looks as though it is on its last leg, do not be too quick to throw it out. Resourceful homeowners are discovering that many old pieces have a value you cannot buy today - and they are restoring those pieces through upholstery. For dollars and cents, it can be one of today's best buys.",
  sections: [
    {
      title: "The value is in the frame",
      body: "If your old sofa or chair has a good frame, it is well worth upholstering. A frame is the essential element in the structure, and if it is solid, there is no point buying a new one. A good frame is made of hardwood such as oak or maple - strong, lasting, and heavy. That is what your upholsterer can check out.",
    },
    {
      title: "The art of upholstery",
      body: "Building on your old frame - where you save the most - the upholsterer re-ties the springs, puts in new webbing, new padding, and new filling, and totally recreates the piece. This is hand work involving a high order of skill. What you get back is furniture in the class of a custom-made piece.",
    },
    {
      title: "Upholstery recycles",
      body: "Reduce, reuse, and redecorate. Furniture upholstery qualifies for LEED points. Leadership in Energy and Environmental Design is an internationally recognized green building certification system.",
    },
  ],
} as const;

export const aboutCopy = {
  intro:
    "Located in Mountain View, California, Sterling Custom Upholstery has been owner-operated since 1966. Working with a crew of skilled craftsmen, we ensure the quality of each piece that leaves the shop. All of the work is done on premise - nothing is farmed out. There is no job that is too big or too small, featuring both residential and commercial custom upholstery. We are state licensed and owner operated.",
  closing:
    "From your favorite sofa, chair, and ottoman to everything in between, we are here to meet your custom upholstery needs.",
} as const;
