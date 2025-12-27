import { Users, Calendar, Award, Globe, Heart } from "lucide-react";

export const sponsorshipContent = {
  hero: {
    title: "Partnership Opportunities",
    subtitle: "Support our community and make a meaningful impact through sponsorship",
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
    subtitle: "Your sponsorship helps us create meaningful programs and support our growing community",
    impactAreas: [
      {
        icon: "Users",
        title: "Community Programs",
        description: "Support senior engagement activities, cultural workshops, and community gatherings",
      },
      {
        icon: "Heart",
        title: "Newcomer Support",
        description: "Help new immigrants settle and integrate into Canadian life with confidence",
      },
      {
        icon: "Globe",
        title: "Cultural Preservation",
        description: "Preserve our heritage through events, education, and intergenerational connections",
      },
    ],
  },

  sponsorshipTiers: {
    badge: "Sponsorship Levels",
    title: "Partnership Tiers",
    subtitle: "Choose a sponsorship level that aligns with your organization's goals",
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
    description: "We'd love to discuss custom sponsorship opportunities that align with your organization's goals and values. Get in touch with us today!",
    buttonText: "Contact Us About Sponsorship",
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
