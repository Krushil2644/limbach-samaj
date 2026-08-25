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
};

export const advertisersContent = {
  badge: "Community Supporters",
  title: "Our Valued Advertisers",
  subtitle: "Proudly supporting local businesses that serve our community.",
  items: [
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
