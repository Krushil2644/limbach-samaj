import { Users, Calendar, Heart, HandHeart, UserPlus, Sparkles } from "lucide-react";

export const volunteerContent = {
  hero: {
    title: "Volunteer With Us",
    subtitle: "Make a difference in our community by sharing your time, skills, and passion",
  },

  intro: {
    badge: "Get Involved",
    title: "Why Volunteer?",
    subtitle: "Join our dedicated team of volunteers making a real impact in the community",
    description: "Volunteering with Limbach Samaj is more than just giving your time—it's about building connections, preserving our culture, and supporting fellow community members. Whether you have a few hours a month or want to take on a leadership role, there's a place for you in our volunteer family.",
  },

  opportunities: {
    badge: "Ways to Help",
    title: "Volunteer Opportunities",
    subtitle: "Find the perfect way to contribute based on your interests and availability",
    roles: [
      {
        icon: "Calendar",
        title: "Event Coordination",
        description: "Help plan and execute community events, cultural celebrations, and gatherings",
        commitment: "Flexible",
      },
      {
        icon: "Users",
        title: "Senior Support",
        description: "Assist with senior engagement programs, activities, and wellness initiatives",
        commitment: "Weekly",
      },
      {
        icon: "UserPlus",
        title: "Newcomer Assistance",
        description: "Guide and support new immigrants as they settle into Canadian life",
        commitment: "Monthly",
      },
      {
        icon: "Heart",
        title: "Community Outreach",
        description: "Connect with community members, share information, and build relationships",
        commitment: "Flexible",
      },
      {
        icon: "HandHeart",
        title: "Fundraising Support",
        description: "Help with fundraising initiatives and donor relations",
        commitment: "Project-based",
      },
      {
        icon: "Sparkles",
        title: "Cultural Programs",
        description: "Lead workshops, teach traditions, and preserve our cultural heritage",
        commitment: "Monthly",
      },
    ],
  },

  benefits: {
    badge: "What You Gain",
    title: "Volunteer Benefits",
    subtitle: "Volunteering enriches your life while helping others",
    items: [
      {
        title: "Build Connections",
        description: "Meet like-minded people and expand your social network within the community",
      },
      {
        title: "Develop Skills",
        description: "Gain valuable experience in leadership, organization, and community service",
      },
      {
        title: "Make an Impact",
        description: "See the direct positive effect of your contributions on community members",
      },
      {
        title: "Cultural Engagement",
        description: "Stay connected to your roots while preserving traditions for future generations",
      },
      {
        title: "Personal Growth",
        description: "Build confidence, find purpose, and experience the joy of giving back",
      },
      {
        title: "Recognition",
        description: "Receive appreciation and recognition for your valuable contributions",
      },
    ],
  },

  process: {
    badge: "How to Start",
    title: "Getting Started",
    subtitle: "Begin your volunteer journey in three simple steps",
    steps: [
      {
        number: "1",
        title: "Express Interest",
        description: "Contact us to learn more about current volunteer opportunities and how you can help",
      },
      {
        number: "2",
        title: "Find Your Fit",
        description: "We'll work with you to match your skills, interests, and availability with the right role",
      },
      {
        number: "3",
        title: "Start Contributing",
        description: "Begin making a difference in our community with guidance and support from our team",
      },
    ],
  },

  cta: {
    title: "Ready to Make a Difference?",
    description: "We'd love to have you join our volunteer team! Whether you have a little time or a lot, your contribution matters. Get in touch with us today to learn more about volunteer opportunities.",
    buttonText: "Contact Us to Volunteer",
  },
};

// Icon map to convert string names to actual icon components
export const iconMap = {
  Users,
  Calendar,
  Heart,
  HandHeart,
  UserPlus,
  Sparkles,
} as const;
