import rawEventsData from "@/content/events.json";
import type { EventSponsor } from "@/components/events/EventSponsors";

export type EventRecord = {
  id: string;
  /** Gives the event its own page at /events/:slug. */
  slug?: string;
  title: string;
  date: string;
  startDateISO?: string;
  endDateISO?: string;
  location: string;
  mapUrl?: string;
  description: string;
  additionalInfo?: string[];
  youtubeUrl?: string;
  price?: number;
  priceCurrency?: string;
  registrationDeadlineISO?: string;
  capacity?: number;
  status?: string;
  schedule?: { time: string; activity: string }[];
  sponsors?: EventSponsor[];
  upcoming: boolean;
};

export const events: EventRecord[] = Array.isArray(rawEventsData)
  ? (rawEventsData as EventRecord[])
  : [];

export const eventPath = (event: EventRecord) =>
  event.slug ? `/events/${event.slug}` : null;

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Reads the date parts straight out of the ISO string rather than through
 * the local timezone, so a 6pm Toronto event never renders as the previous
 * day for a visitor elsewhere.
 */
export function isoParts(iso: string) {
  const [y, m, d] = iso.split("T")[0].split("-").map(Number);
  return { day: d, month: MONTHS[m - 1], year: y };
}

export function formatISODate(iso: string) {
  const { day, month, year } = isoParts(iso);
  return `${month} ${day}, ${year}`;
}
