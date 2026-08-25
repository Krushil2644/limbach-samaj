import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import UpcomingEvent from "@/components/events/UpcomingEvent";
import EventDetailsDialog, {
  hasDetails,
  type EventRecord,
} from "@/components/events/EventDetailsDialog";
import rawEventsData from "@/content/events.json";
import { siteConfig } from "@/site-config";

const eventsData: EventRecord[] = Array.isArray(rawEventsData)
  ? (rawEventsData as EventRecord[])
  : [];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Prefers the exact ISO timestamp; the free-form `date` string only parses
 * for the simple "5th July, 2025" entries.
 */
function eventDate(event: EventRecord): Date {
  if (event.startDateISO) return new Date(event.startDateISO);
  const cleaned = event.date.replace(/(\d+)(st|nd|rd|th)/, "$1");
  const parts = cleaned.replace(",", "").split(" ");
  if (parts.length === 3) return new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`);
  return new Date(event.date);
}

/** The year is the group heading, so a row only needs its month. */
function monthOnly(event: EventRecord): string {
  if (event.startDateISO) {
    const m = Number(event.startDateISO.split("T")[0].split("-")[1]);
    return MONTHS[m - 1];
  }
  const date = eventDate(event);
  return Number.isNaN(date.getTime()) ? event.date : MONTHS[date.getMonth()];
}

export default function Events() {
  const [openEvent, setOpenEvent] = useState<EventRecord | null>(null);

  const upcoming = useMemo(
    () =>
      eventsData
        .filter((event) => event.upcoming)
        .sort((a, b) => eventDate(a).getTime() - eventDate(b).getTime()),
    [],
  );

  const past = useMemo(
    () =>
      [...eventsData]
        .filter((event) => !event.upcoming)
        .sort((a, b) => eventDate(b).getTime() - eventDate(a).getTime()),
    [],
  );

  /** Newest year first, preserving the sorted order within each year. */
  const pastByYear = useMemo(() => {
    const groups = new Map<number, EventRecord[]>();
    for (const event of past) {
      const year = eventDate(event).getFullYear();
      if (Number.isNaN(year)) continue;
      groups.set(year, [...(groups.get(year) ?? []), event]);
    }
    return [...groups.entries()].sort((a, b) => b[0] - a[0]);
  }, [past]);

  return (
    <>
      <SEOHead
        title="Events"
        description="Upcoming events from Limbach Samaj of Canada: Navratri Garba on October 9, 2026 and Diwali Snehmilan on November 28, 2026, both in Mississauga, Ontario."
        path="/events"
      />

      <main>
        <Hero
          title="Events"
          subtitle="Worship, Garba, picnics and Diwali — the gatherings that bring the Samaj together through the year."
          compact
        />

        {/* Upcoming */}
        <section aria-labelledby="upcoming" className="pb-16 pt-4 md:pb-20 md:pt-6">
          <div className="container-custom">
            <h2
              id="upcoming"
              className="enter display-lg font-heading font-bold text-foreground"
              style={{ "--enter-delay": 0 } as React.CSSProperties}
            >
              Upcoming
            </h2>

            {upcoming.length > 0 ? (
              <div className="mt-10 space-y-6 md:space-y-8">
                {upcoming.map((event) => (
                  <UpcomingEvent
                    key={event.id}
                    event={event}
                    onOpen={() => setOpenEvent(event)}
                  />
                ))}
              </div>
            ) : (
              <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
                Nothing is scheduled at the moment. Dates for the coming season
                are announced here and shared with members directly.
              </p>
            )}
          </div>
        </section>

        {/* Past — a record, not a card grid. Most of these carry only a
            date and a venue, so a "View details" on each would open an
            empty dialog. */}
        <section
          aria-labelledby="past"
          className="border-t border-border py-16 md:py-20"
        >
          <div className="container-custom">
            <h2
              id="past"
              className="reveal display-lg font-heading font-bold text-foreground"
            >
              Past gatherings
            </h2>
            <p className="reveal measure mt-4 text-lg leading-relaxed text-muted-foreground">
              {past.length} events since 2010. Photographs from many of them are
              in the{" "}
              <Link to="/gallery" className="link-underline font-medium text-primary-ink">
                gallery
              </Link>
              .
            </p>

            <div className="mt-10">
              {pastByYear.map(([year, items]) => (
                <section key={year} className="reveal mt-10 first:mt-0">
                  <h3 className="font-heading text-3xl font-bold text-muted-foreground/45 md:text-4xl">
                    {year}
                  </h3>
                  <ul className="mt-3">
                    {items.map((event) => (
                      <li
                        key={event.id}
                        className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-border py-4 md:grid md:grid-cols-12 md:gap-8"
                      >
                        <span className="order-2 w-full text-sm text-muted-foreground md:order-none md:col-span-2 md:w-auto">
                          {monthOnly(event)}
                        </span>
                        <span className="order-1 font-heading text-base font-bold text-foreground md:order-none md:col-span-5">
                          {event.title}
                        </span>
                        <span className="order-3 text-sm text-muted-foreground md:order-none md:col-span-4">
                          {event.location}
                        </span>
                        <span className="order-4 md:order-none md:col-span-1 md:text-right">
                          {hasDetails(event) && (
                            <button
                              type="button"
                              onClick={() => setOpenEvent(event)}
                              className="link-underline text-sm font-semibold text-primary-ink"
                            >
                              Details
                            </button>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>

        {/* Staying informed */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="container-custom">
            <div className="reveal mx-auto max-w-2xl text-center">
              <h2 className="display-md font-heading font-bold text-foreground">
                Hearing about the next one
              </h2>
              <p className="measure mx-auto mt-4 text-lg leading-relaxed text-muted-foreground">
                Event details and registration instructions are posted here and
                shared with members directly. For anything event-related, or to
                suggest an idea, get in touch.
              </p>
              <Link
                to="/contact"
                className="press group mt-8 inline-flex min-h-[3rem] items-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Contact the Samaj
                <ArrowRight className="nudge h-4 w-4" aria-hidden />
              </Link>
              <p className="mt-6 text-sm text-muted-foreground">
                Or email{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-underline font-medium text-foreground"
                >
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {openEvent && (
        <EventDetailsDialog
          event={openEvent}
          onClose={() => setOpenEvent(null)}
        />
      )}

      {/* Upcoming events as structured data. Only entries with a real
          timestamp qualify. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: upcoming
              .filter((event) => event.startDateISO)
              .map((event, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Event",
                  name: event.title,
                  startDate: event.startDateISO,
                  ...(event.endDateISO ? { endDate: event.endDateISO } : {}),
                  eventStatus: "https://schema.org/EventScheduled",
                  eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                  url: `${siteConfig.siteUrl}/events`,
                  image: `${siteConfig.siteUrl}${siteConfig.ogImage}`,
                  description: event.description,
                  location: {
                    "@type": "Place",
                    name: event.location.split(",")[0],
                    address: event.location,
                  },
                  ...(event.price !== undefined
                    ? {
                        offers: {
                          "@type": "Offer",
                          price: event.price,
                          priceCurrency: event.priceCurrency ?? "CAD",
                          availability: "https://schema.org/InStock",
                          url: `${siteConfig.siteUrl}/events`,
                          validFrom: event.startDateISO,
                        },
                      }
                    : {}),
                  organizer: {
                    "@type": "Organization",
                    name: siteConfig.appName,
                    url: siteConfig.siteUrl,
                  },
                },
              })),
          }),
        }}
      />
    </>
  );
}
