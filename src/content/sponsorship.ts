import { Users, Calendar, Award, Globe, Heart } from "lucide-react";
import type { SponsorItem } from "@/components/SponsorImageRow";

export const sponsorshipContent = {
  hero: {
    title: "Partnership Opportunities",
    subtitle:
      "Support our community and make a meaningful impact through sponsorship",
  },

  inProgressNotice: {
    title: "Sponsorship Program In Development",
    description: [
      "We're currently finalizing our sponsorship packages and partnership opportunities to ensure we can offer meaningful value to our sponsors.",
      "If you're interested in sponsoring Limbach Samaj and supporting our community, please reach out to us through our contact page. We'd love to discuss custom sponsorship opportunities that align with your organization's goals.",
    ],
  },

  whySponsor: {
    badge: "Make an Impact",
    title: "Why Sponsor Limbach Samaj?",
    subtitle:
      "Your sponsorship helps us create meaningful programs and support our growing community",
    impactAreas: [
      {
        icon: "Users",
        title: "Community Programs",
        description:
          "Support senior engagement activities, cultural workshops, and community gatherings",
      },
      {
        icon: "Heart",
        title: "Newcomer Support",
        description:
          "Help new immigrants settle and integrate into Canadian life with confidence",
      },
      {
        icon: "Globe",
        title: "Cultural Preservation",
        description:
          "Preserve our heritage through events, education, and intergenerational connections",
      },
    ],
  },

  sponsorshipTiers: {
    badge: "Sponsorship Levels",
    title: "Partnership Tiers",
    subtitle:
      "Choose a sponsorship level that aligns with your organization's goals",
    tiers: [
      {
        name: "Community Partner",
        icon: "Users",
        color: "primary",
        description: "Support our day-to-day community activities and programs",
        features: [
          "Logo on website sponsors page",
          "Social media recognition",
          "Acknowledgment in quarterly newsletter",
        ],
      },
      {
        name: "Event Sponsor",
        icon: "Calendar",
        color: "secondary",
        description: "Partner with us for specific events and celebrations",
        features: [
          "All Community Partner benefits",
          "Logo on event promotional materials",
          "Recognition at sponsored event",
          "Event photo opportunities",
        ],
      },
      {
        name: "Platinum Sponsor",
        icon: "Award",
        color: "accent",
        description: "Become a premier supporter of our community",
        features: [
          "All Event Sponsor benefits",
          "Prominent logo placement on website",
          "Speaking opportunity at annual event",
          "Featured in annual report",
          "Direct engagement with community leadership",
        ],
      },
    ],
  },

  benefits: {
    title: "Sponsorship Benefits",
    subtitle: "All sponsors enjoy these valuable benefits",
    items: [
      "Logo placement on our website and event materials",
      "Recognition at community events and celebrations",
      "Social media mentions and acknowledgments",
      "Networking opportunities with community leaders",
      "Opportunity to support meaningful community initiatives",
    ],
  },

  cta: {
    title: "Interested in Sponsoring?",
    description:
      "We'd love to discuss custom sponsorship opportunities that align with your organization's goals and values. Get in touch with us today!",
    buttonText: "Contact Us About Sponsorship",
  },

  eventSponsorships: {
    badge: "Event Sponsorship",
    title: "Mataji Havan Sponsorships",
    subtitle: "Honoring our community supporters for the Mataji Havan event.",
    tabs: {
      eventSponsorship: {
        label: "Event Sponsorship",
        items: [
          {
            imageSrc:
              "/images/sponsors/ea608793-d7eb-4473-8c09-649d31bd724a.JPG",
            imageAlt: "In loving memory of Smitaben Parekh",
            memoryLine: "In the loving memory of",
            honoreeName: "Smitaben Parekh",
            sponsorsLine:
              "Nailesh Parekh | Harsh Parekh | Purva Parekh (Hamilton)",
            variant: "memorial",
          },
          {
            imageSrc:
              "/images/sponsors/000016dc-00c0-4eb5-bf5b-54610e607a08.JPG",
            imageAlt: "With The Divine Blessings Of Mataji",
            memoryLine: "With The Divine Blessings of Mataji",
            honoreeName: "Rashmikaben Vijaybhai Parekh",
            sponsorsLine: "Family",
            variant: "memorial",
          },
        ] as SponsorItem[],
      },
      eventSponsors: {
        label: "Event sponsors",
        note: "Other Havan sponsors will appear here.",
      },
    },
  },
};

// Icon map to convert string names to actual icon components
export const iconMap = {
  Users,
  Calendar,
  Award,
  Globe,
  Heart,
} as const;
