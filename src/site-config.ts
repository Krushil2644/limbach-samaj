export const siteConfig = {
  appName: "Limbach Samaj of Canada",
  // One entity name everywhere. AI search engines build their entity graph
  // from consistent naming; "Limbach Samaj"/"Samaaj"/"Canada" variants split it.
  shortName: "Limbach Samaj of Canada",
  alternateName: "Limbach Samaj",
  // Canonical origin for the live site. The apex domain 308-redirects to www,
  // so www is the canonical host. Everything that builds an absolute URL
  // (canonical tags, og:url, sitemap, JSON-LD) must use this.
  siteUrl: "https://www.limbachsamajcanada.ca",
  // Purpose-built 1200x630 social preview (see scripts/build-og-image.mjs).
  ogImage: "/og-image.png",
  navLinks: {
    home: {
      ordinal: 0,
      name: "Home",
      href: "/",
      visible: true,
    },
    about: {
      ordinal: 1,
      name: "About Us",
      href: "/about",
      visible: true,
    },
    events: {
      ordinal: 2,
      name: "Events",
      href: "/events",
      visible: true,
    },
    donate: {
      ordinal: 4,
      name: "Donate",
      href: "/donate",
      visible: false,
    },
    gallery: {
      ordinal: 5,
      name: "Gallery",
      href: "/gallery",
      visible: true,
    },
    news: {
      ordinal: 6,
      name: "News",
      href: "/news",
      visible: false,
    },
    faq: {
      ordinal: 6.5,
      name: "FAQ",
      href: "/faq",
      visible: true,
    },
    contact: {
      ordinal: 7,
      name: "Contact Us",
      href: "/contact",
      visible: true,
    },
    getInvolved: {
      ordinal: 8,
      name: "Get Involved",
      href: "#",
      visible: true,
      children: [
        {
          name: "Membership",
          href: "/membership",
          visible: false,
          description: "Join the Samaj",
        },
        {
          name: "Sponsorship",
          href: "/sponsorship",
          visible: true,
          description: "Sponsor an event or advertise your business",
        },
        {
          name: "Donations",
          href: "/donate",
          visible: true,
          description: "Give any amount by e-transfer",
        },
        {
          name: "Volunteer",
          href: "/volunteer",
          visible: false,
          description: "Help run our gatherings",
        },
      ],
    },
  },
  footeLinks: {
    facebook: {
      visible: true,
      link: "http://facebook.com/#",
    },
    twitter: {
      visible: true,
      link: "https://twitter.com",
    },
    instagram: {
      visible: true,
      link: "https://instagram.com",
    },
  },
  showFooterSocialLinks: false,  //temporary hidden social links
  footerQuickLinks: [
    { name: "About Us", href: "/about", visible: true },
    { name: "Events", href: "/events", visible: true },
    { name: "Gallery", href: "/gallery", visible: true },
    { name: "FAQ", href: "/faq", visible: true },
    { name: "Contact Us", href: "/contact", visible: true },
  ],
  footerGetInvolved: [
    { name: "Membership", href: "/membership", visible: false },
    { name: "Volunteer", href: "/volunteer", visible: false },
    { name: "Sponsorship", href: "/sponsorship", visible: true },
    { name: "Donate", href: "/donate", visible: true },
  ],
  email: "support@limbachsamajcanada.ca",
  /**
   * Ontario Corporation Number, from the Ontario Business Registry. Proves
   * the Samaj is an incorporated non-profit corporation. It does NOT permit
   * issuing official donation receipts — that requires separate charity
   * registration with the CRA.
   */
  corporationNumber: "1001424948",
  /**
   * CRA charity registration number, format "123456789RR0001": a 9-digit
   * business number, then RR, then a 4-digit reference. Only this permits
   * issuing official donation receipts, so the donate page's tax-receipt
   * section stays hidden until it is set. An Ontario Corporation Number is
   * not a substitute and must not be put here.
   */
  charityNumber: "",
  location: "Brampton, ON, Canada",
  // Structured-data address. City-level only — the Samaj has no
  // public street address.
  address: {
    addressLocality: "Brampton",
    addressRegion: "ON",
    addressCountry: "CA",
  },
};
