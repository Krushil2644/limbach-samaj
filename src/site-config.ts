export const siteConfig = {
  appName: "Limbach Samaj",
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
        { name: "Volunteer", href: "/volunteer", visible: true },
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
  email: "jaylimbach@gmail.com",
  phone: "tba",
  location: "Serving communities across Canada",
};
