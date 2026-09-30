/**
 * FAQ content. Every answer here must be verifiable against events.json,
 * site-config, or the Samaj's published invitations — these are emitted as
 * FAQPage structured data, so anything inaccurate is published as fact.
 *
 * Answers are kept to roughly 40-60 words: long enough to stand alone as a
 * direct answer, short enough for a featured snippet or voice result.
 */
export type FaqGroup =
  | "About the Samaj"
  | "Events and tickets"
  | "Registering"
  | "Supporting the Samaj";

/** Display order of the groups on the page. */
export const faqGroups: FaqGroup[] = [
  "About the Samaj",
  "Events and tickets",
  "Registering",
  "Supporting the Samaj",
];

export type FaqItem = {
  question: string;
  answer: string;
  /** Presentational grouping only — the FAQPage schema stays a flat list. */
  group: FaqGroup;
};

export const faqContent: FaqItem[] = [
  {
    question: "What is Limbach Samaj of Canada?",
    group: "About the Samaj",
    answer:
      "Limbach Samaj of Canada is a community organization that brings Limbach families together across Canada. It hosts cultural and religious gatherings through the year — Navratri Garba, Mataji Havan, Diwali Snehmilan, and summer picnics — and supports members through community programs. Its motto is Aharnish Sevamahe: eternally in service of mankind at every moment.",
  },
  {
    question: "When and where is the next Garba?",
    group: "Events and tickets",
    answer:
      "The 3rd Maa Limbach Garba takes place on Friday, October 9, 2026, from 6:00 PM to 10:00 PM at Vic Johnston Community Centre, 335 Church St, Mississauga, ON L5M 1N1. The evening begins with Aarti and Pooja at 6:15 PM, followed by a food break and Raas Garba and Timli until 10:00 PM.",
  },
  {
    question: "When and where is Diwali Snehmilan 2026?",
    group: "Events and tickets",
    answer:
      "Diwali Snehmilan 2026 is on Saturday, November 28, 2026, from 5:30 PM onwards at Marigold Banquet Hall, 6835 Professional Ct, Mississauga, ON L4V 1X6. The evening includes Garba, dance, entertainment, appetizers, and dinner.",
  },
  {
    question: "How much do event tickets cost?",
    group: "Events and tickets",
    answer:
      "Garba 2026 is $15 per person for ages 6 and above, and children 5 and under attend free. Diwali Snehmilan 2026 is $21 per person for adults and children aged 6 and older. Ticket prices are set per event and announced with each invitation.",
  },
  {
    question: "How do I register for an event?",
    group: "Registering",
    answer:
      "Send an e-transfer to jaylimbach@gmail.com. In the e-transfer notes, include your name, phone number, and the number of people the payment covers. After sending payment, send a WhatsApp message to the event contact confirming how many people are attending, counting ages 6 and above and children 5 and under separately.",
  },
  {
    question: "Who do I contact to confirm my registration?",
    group: "Registering",
    answer:
      "For Garba 2026, WhatsApp Ravibhai Parekh at 647-835-7377. For Diwali Snehmilan 2026, WhatsApp Yogeshbhai Parekh at 416-841-9176. Include your payment information, your name and phone number, and your headcount so seating and food can be arranged.",
  },
  {
    question: "Is there a registration deadline?",
    group: "Registering",
    answer:
      "Yes, and both events also have a capacity limit. Garba 2026 closes on September 30, 2026 or once 130 people have registered, whichever comes first. Diwali Snehmilan 2026 closes on Saturday, November 14, 2026 or once the hall reaches its 200-person capacity. Registering early is recommended.",
  },
  {
    question: "Can I sponsor an event or advertise my business?",
    group: "Supporting the Samaj",
    answer:
      "Yes. For Diwali Snehmilan 2026, Grand Sponsorship is $101 and a business advertisement at the event venue and on the Samaj website is $151. Platinum Sponsorship amounts are set per event and listed in each invitation. Send an e-transfer to jaylimbach@gmail.com noting that it is for sponsorship.",
  },
  {
    question: "How can I donate to Limbach Samaj of Canada?",
    group: "Supporting the Samaj",
    answer:
      "Donations of any amount are welcome and appreciated. Send an e-transfer to jaylimbach@gmail.com with a note indicating the payment is a donation, along with your name and phone number. An online donation system is currently in development.",
  },
  {
    question: "How do I get in touch with Limbach Samaj of Canada?",
    group: "About the Samaj",
    answer:
      "Email support@limbachsamajcanada.ca, or use the contact form on the website's contact page. The Samaj is based in Brampton, Ontario and holds its events across the Greater Toronto Area, most often in Mississauga.",
  },
];
