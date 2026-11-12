import { useEffect, useState } from "react";
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
  /** Self-hosted clip (H.264 MP4 in /public) shown inline with a poster frame. */
  videoSrc?: string;
  videoPoster?: string;
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

/**
 * An event is over once its end time passes (start + 1 day when there is no
 * end time), or when `upcoming` is false. `now` is null during the build-time
 * prerender, where only the `upcoming` flag counts.
 */
export function isPast(event: EventRecord, now: number | null): boolean {
  if (!event.upcoming) return true;
  if (now === null) return false;
  const end = event.endDateISO
    ? new Date(event.endDateISO).getTime()
    : event.startDateISO
      ? new Date(event.startDateISO).getTime() + 24 * 60 * 60 * 1000
      : Infinity;
  return end < now;
}

/**
 * The pages are prerendered at build time, so today's date is only known in
 * the browser. Null on the first render keeps hydration matching the HTML.
 */
export function useNow(): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);
  return now;
}

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
