import { Users, Globe, Heart } from "lucide-react";

export const sponsorshipContent = {
  hero: {
    title: "Sponsorship",
    subtitle:
      "Support the gatherings that bring Limbach families together across Canada.",
  },

  /**
   * Every figure here appears in a published event invitation and is
   * cross-checked against src/content/events.json. Nothing on this page
   * promises a benefit the Samaj does not currently provide — an earlier
   * version advertised a quarterly newsletter, an annual report and a
   * speaking slot, none of which exist.
   */
  offers: {
    title: "What sponsorship costs",
    intro:
      "Amounts are set per event and confirmed in each invitation. These are the levels offered at our recent gatherings.",
    items: [
      {
        amount: "$151",
        name: "Business advertisement",
        description:
          "Your banner or flyer displayed at the event venue, and your advertisement shown on this website.",
        offeredAt: "Mataji Havan and Diwali Snehmilan",
      },
      {
        amount: "$351",
        name: "Platinum Sponsorship",
        description:
          "Named as a Platinum Sponsor on the Samaj website, on the page of the event you support.",
        offeredAt: "Mataji Havan, Garba and Diwali Snehmilan 2026",
      },
      {
        amount: "$101",
        name: "Grand Sponsorship",
        description: "Named as a Grand Sponsor for the event.",
        offeredAt: "Diwali Snehmilan 2026",
      },
    ],
    donatePointer: {
      text: "Giving without recognition in return?",
      linkText: "Make a donation instead",
      link: "/donate",
    },
    howTo: {
      title: "How to sponsor",
      steps: [
        "Send an e-transfer to the Samaj account, noting that the payment is for sponsorship or a business advertisement.",
        "Include your name, your phone number, and the business name if you are advertising.",
        "Message the contact listed on the event invitation to confirm, so your placement can be arranged before the event.",
      ],
    },
  },

  currentSponsors: {
    title: "Our sponsors",
    subtitle:
      "With gratitude to the members who supported our 2026 Community Picnic.",
    heading: "2026 Picnic Grand Sponsors",
    sponsors: [
      { name: "Nilkumar Sharma" },
      { name: "Sandipbhai Limbachiya" },
      { name: "Jwalantbhai Mistry" },
      { name: "Priteshkumar V Sharma" },
    ] as PicnicSponsor[],
  },

  whySponsor: {
    title: "Where the money goes",
    subtitle:
      "Sponsorship covers hall rental, food, and the cost of running events that are otherwise funded entirely by ticket sales and donations.",
    impactAreas: [
      {
        icon: "Users",
        title: "Community programs",
        description:
          "Senior engagement activities, cultural workshops, and community gatherings.",
      },
      {
        icon: "Heart",
        title: "Newcomer support",
        description:
          "Helping families new to Canada settle and find a community that shares their language and calendar.",
      },
      {
        icon: "Globe",
        title: "Cultural preservation",
        description:
          "Worship, Garba, and the festivals that carry our heritage to the next generation.",
      },
    ],
  },

  inDevelopment: {
    title: "A formal sponsorship program is being prepared",
    description:
      "We are working on year-round partnership packages beyond individual events. If you would like to discuss something tailored to your organisation, please get in touch.",
  },

  cta: {
    title: "Interested in sponsoring?",
    description:
      "Tell us which event you would like to support and we will confirm the details and the placement.",
    buttonText: "Contact us about sponsorship",
  },
};

export type PicnicSponsor = {
  name: string;
  note?: string;
};

export const iconMap = { Users, Globe, Heart } as const;
