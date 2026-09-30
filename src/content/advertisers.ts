export type Advertiser = {
  /** Path under public/images/advertisements/. */
  imageSrc: string;
  /** Describes the business — this is the only text a screen reader gets. */
  imageAlt: string;
  /**
   * Optional link to the business. Cards without one render as plain images,
   * so URLs can be added here later without touching the component.
   */
  href?: string;
  /** Optional visible caption under the artwork, e.g. a sponsorship tier. */
  label?: string;
};

export const advertisersContent = {
  title: "Our valued advertisers",
  subtitle:
    "Local businesses, run by members, whose support helps pay for the gatherings on this page.",
  /** Business advertising is a published tier on the sponsorship page. */
  cta: {
    text: "Advertise with the Samaj",
    link: "/sponsorship",
  },
  items: [
    {
      imageSrc: "/images/advertisements/Ad3.jpg",
      imageAlt:
        "Aakash Nayi, Associate Financial Advisor, McNaughton Agency Inc, Co-operators – investments, insurance and advice. 647-866-2954",
      href: "https://local.cooperators.ca/mcnaughton-agency-en/our-team",
      label: "Platinum Sponsor · Garba & Diwali Snehmilan 2026",
    },
    {
      imageSrc: "/images/advertisements/Ad1.jpg",
      imageAlt: "Hitendra (Happy) Parekh – Financial & Connectivity Partner",
    },
    {
      imageSrc: "/images/advertisements/Ad2.jpg",
      imageAlt: "Billyard Insurance Group Acton – Nilkumar Sharma",
    },
  ] satisfies Advertiser[],
};
