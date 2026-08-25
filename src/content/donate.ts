import { siteConfig } from "@/site-config";
import { Heart, Users, GraduationCap, Home } from "lucide-react";

/**
 * Donations, not sponsorship.
 *
 * The split with /sponsorship is by what the giver receives: a sponsor is
 * named on the site or gets a banner at the venue; a donor receives nothing
 * but the work happening. Keep the two pages from restating each other —
 * they previously shared a "coming soon" notice, a "where the money goes"
 * section and the same e-transfer address.
 */
export const donateContent = {
  hero: {
    title: "Donate",
    subtitle:
      "Every gathering on this site is paid for by ticket sales, sponsorship, and donations from members.",
  },

  give: {
    title: "How to donate",
    intro:
      "Donations of any amount are welcome and appreciated. There is no minimum, and no obligation to attend anything.",
    steps: [
      {
        title: "Send an e-transfer",
        body: `Send any amount to ${siteConfig.email}.`,
      },
      {
        title: "Add a note",
        body: "In the e-transfer message, write that the payment is a donation, and include your name and phone number so it can be acknowledged and recorded.",
      },
      {
        title: "That's it",
        body: "Someone from the Samaj will confirm receipt. You do not need to fill in a form.",
      },
    ],
    onlineNotice:
      "A secure online donation page is in development. Until then, e-transfer is the way to give.",
  },

  /**
   * Only rendered when siteConfig.charityNumber is set. A Canadian
   * non-profit cannot issue official donation receipts; only a CRA-
   * registered charity can, and the registration number is the proof.
   */
  taxReceipt: {
    title: "Tax receipts",
    description:
      "Limbach Samaj of Canada is a registered charity. Donations are eligible for official receipts in accordance with CRA guidelines.",
    numberLabel: "Charity registration number",
    requestNote:
      "Include your mailing address in the e-transfer note if you would like a receipt issued.",
  },

  impactAreas: {
    title: "Where your donation goes",
    subtitle:
      "The Samaj is run by volunteers. Donations pay for the events themselves rather than for staff or offices.",
    areas: [
      {
        icon: "Heart",
        title: "Cultural events",
        description:
          "Hall rental, food, and the cost of running Navratri Garba, Mataji Havan, Diwali Snehmilan, and the summer picnic.",
      },
      {
        icon: "Users",
        title: "Community support",
        description:
          "Assistance to members during births, weddings, illness and loss, and help for families new to Canada.",
      },
      {
        icon: "GraduationCap",
        title: "Youth and seniors",
        description:
          "Activities for the next generation, and senior engagement programs run alongside our gatherings.",
      },
      {
        icon: "Home",
        title: "Heritage",
        description:
          "Worship and the festivals that carry the community's traditions forward.",
      },
    ],
  },

  sponsorshipPointer: {
    title: "Looking to sponsor instead?",
    description:
      "Sponsorship and business advertising come with named recognition at the event and on this website, at set amounts per event.",
    linkText: "See sponsorship options",
  },

  cta: {
    title: "Questions about giving?",
    description:
      "If you would like to discuss a larger gift, a donation in memory of someone, or anything else, please get in touch.",
    buttonText: "Contact us",
  },
};

export const iconMap = { Heart, Users, GraduationCap, Home } as const;
