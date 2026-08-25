export const siteConfig = {
  appName: "Limbach Samaj of Canada",
  shortName: "Limbach Samaj",
  // Canonical origin for the live site. The apex domain 308-redirects to www,
  // so www is the canonical host. Everything that builds an absolute URL
  // (canonical tags, og:url, sitemap, JSON-LD) must use this.
  siteUrl: "https://www.limbachsamajcanada.ca",
  // Social preview image. Replace with a purpose-built 1200x630 image when
  // one is available; the logo is square and gets cropped by most platforms.
  ogImage: "/logo.png",
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
        { name: "Membership", href: "/membership", visible: false },
        { name: "Sponsorship", href: "/sponsorship", visible: true },
        { name: "Donations", href: "/donate", visible: true },
        { name: "Volunteer", href: "/volunteer", visible: false },
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
    { name: "Contact Us", href: "/contact", visible: true },
  ],
  footerGetInvolved: [
    { name: "Membership", href: "/membership", visible: false },
    { name: "Volunteer", href: "/volunteer", visible: false },
    { name: "Sponsorship", href: "/sponsorship", visible: true },
    { name: "Donate", href: "/donate", visible: true },
  ],
  email: "jaylimbach@gmail.com",
  phone: "tba",
  showFooterPhone: false,  // temporary hidden
  location: "Serving communities across Canada",
};
