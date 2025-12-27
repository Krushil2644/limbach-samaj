import { siteConfig } from '@/site-config';
import { Heart, Users, GraduationCap, Home } from "lucide-react";

export const donateContent = {
  hero: {
    title: "Support Our Community",
    subtitle: "Your generosity helps us preserve our heritage and support our community",
  },

  comingSoonNotice: {
    title: "Online Donation System Coming Soon",
    description: [
      "We're currently developing a secure online donation platform to make supporting our community easier and more convenient.",
      "In the meantime, if you'd like to make a donation, please contact us directly through our contact page or reach out to any committee member. We can provide you with details for bank transfers or other donation methods.",
      `To donate via E-transfer: ${siteConfig.email}`,
    ],
    showTaxReceitpInfo: false,
    taxReceiptInfo: {
      title: "Tax Receipts Available",
      description: "Limbach Samaj Canada is a registered charitable organization. All donations are eligible for tax receipts in accordance with CRA guidelines.",
    },
  },

  intro: {
    badge: "Make a Difference",
    title: "Why Your Support Matters",
    subtitle: "Your donations help us build a stronger, more connected community",
    description: "Every contribution, big or small, makes a real difference in the lives of our community members. Your support enables us to organize cultural events, support newcomers, preserve our heritage, and provide assistance to those in need.",
  },

  impactAreas: {
    badge: "Our Impact",
    title: "Where Your Donation Goes",
    subtitle: "Your contributions support vital programs and initiatives that strengthen our community",
    areas: [
      {
        icon: "Heart",
        title: "Cultural Events",
        description: "Fund traditional celebrations, festivals, and gatherings that keep our heritage alive",
      },
      {
        icon: "GraduationCap",
        title: "Youth Programs",
        description: "Support educational initiatives and activities for the next generation",
      },
      {
        icon: "Users",
        title: "Community Support",
        description: "Provide assistance to members in need and support newcomer settlement",
      },
      {
        icon: "Home",
        title: "Heritage Preservation",
        description: "Maintain our cultural traditions and pass them on to future generations",
      },
    ],
  },

  whySupport: {
    badge: "Your Impact",
    title: "Why Support Limbach Samaj?",
    subtitle: "Your donations create lasting change in our community",
    reasons: [
      {
        title: "Direct Community Impact",
        description: "100% of donations go directly to community programs and initiatives",
      },
      {
        title: "Cultural Preservation",
        description: "Help preserve our rich cultural heritage for future generations",
      },
      {
        title: "Support Those in Need",
        description: "Provide assistance to community members during important life events",
      },
      {
        title: "Build Connections",
        description: "Fund events and programs that bring our community together",
      },
      {
        title: "Transparent Operations",
        description: "Clear reporting on how donations are used to benefit the community",
      },
      {
        title: "Tax Benefits",
        description: "Receive official tax receipts for your charitable contributions",
      },
    ],
  },

  cta: {
    title: "Ready to Make a Difference?",
    description: "Your support helps us continue our mission of building a strong, connected community. Contact us today to learn more about donation options and how your contribution can make an impact.",
    buttonText: "Contact Us to Donate",
  },
};

// Icon map to convert string names to actual icon components
export const iconMap = {
  Heart,
  Users,
  GraduationCap,
  Home,
} as const;
