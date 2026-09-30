import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin, Ticket } from "lucide-react";
import eventsData from "@/content/events.json";
import { homeContent } from "@/content/home";

type EventRecord = {
  id: string;
  title: string;
  date: string;
  startDateISO?: string;
  slug?: string;
  location: string;
  price?: number;
  priceCurrency?: string;
  upcoming: boolean;
};

/** The soonest upcoming event that carries a real timestamp. */
function nextEvent(): EventRecord | null {
  const dated = (eventsData as EventRecord[])
    .filter((event) => event.upcoming && event.startDateISO)
    .sort((a, b) => a.startDateISO!.localeCompare(b.startDateISO!));
  return dated[0] ?? null;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Formats from the ISO string's own date parts rather than through the
 * local timezone, so a 6pm Toronto event never renders as the previous day
 * for a visitor in another region.
 */
function dateParts(iso: string) {
  const [datePart] = iso.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  return { day, month: MONTHS[month - 1], year };
}

export default function NextGathering() {
  const event = nextEvent();
  const { label, emptyTitle, emptyBody, action } = homeContent.nextGathering;

  if (!event) {
    return (
      <section className="pb-16 md:pb-24 lg:pb-28">
        <div className="container-custom">
          <div className="reveal mx-auto max-w-2xl text-center">
            <h2 className="display-md font-heading font-bold">{emptyTitle}</h2>
            <p className="measure mx-auto mt-4 text-lg text-muted-foreground">
              {emptyBody}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const { day, month, year } = dateParts(event.startDateISO!);
  const venue = event.location.split(",")[0];

  return (
    <section aria-labelledby="next-gathering" className="pb-16 md:pb-24 lg:pb-28">
      <div className="container-custom">
        <div className="reveal relative overflow-hidden rounded-2xl border border-border bg-card">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_0%_0%,hsl(var(--primary)/0.07),transparent_58%)]"
          />

          <div className="relative grid gap-8 p-7 md:grid-cols-12 md:items-center md:gap-10 md:p-10 lg:p-12">
            {/* Date block — the single largest piece of information. */}
            <div className="md:col-span-3">
              <p className="text-base font-semibold text-primary-ink">{label}</p>
              <p className="mt-3 font-heading text-6xl font-bold leading-none text-foreground lg:text-7xl">
                {day}
              </p>
              <p className="mt-1 font-heading text-xl font-semibold text-foreground">
                {month}
              </p>
              <p className="text-base text-muted-foreground">{year}</p>
            </div>

            <div className="md:col-span-9">
              <h2
                id="next-gathering"
                className="display-md font-heading font-bold text-foreground"
              >
                {event.title}
              </h2>

              <ul className="mt-5 flex flex-col gap-3 text-base text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
                <li className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {event.date.replace(/^\d+\w*\s\w+,\s\d{4}\s-\s/, "")}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {venue}
                </li>
                {event.price !== undefined && (
                  <li className="flex items-center gap-2">
                    <Ticket className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    ${event.price} {event.priceCurrency ?? "CAD"} per person
                  </li>
                )}
              </ul>

              <Link
                to={event.slug ? `/events/${event.slug}` : "/events"}
                className="press group mt-7 inline-flex min-h-[3rem] items-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {action}
                <ArrowRight
                  className="nudge h-4 w-4"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
