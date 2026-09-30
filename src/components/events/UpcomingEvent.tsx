import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Ticket, Users } from "lucide-react";
import { eventPath, type EventRecord } from "@/lib/events";
import EventSponsors from "./EventSponsors";

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Reads the date parts straight out of the ISO string rather than through
 * the local timezone, so a 6pm Toronto event never renders as the previous
 * day for a visitor elsewhere.
 */
function parts(iso: string) {
  const [y, m, d] = iso.split("T")[0].split("-").map(Number);
  return { day: d, monthShort: MONTHS_SHORT[m - 1], monthLong: MONTHS_LONG[m - 1], year: y };
}

/** Strips the leading "9th October, 2026 - " so only the time remains. */
function timeOnly(date: string) {
  return date.replace(/^.*?\d{4}\s*-\s*/, "");
}

/**
 * An upcoming event is an invitation, not a row in a timetable.
 *
 * A filled date block in the brand colour carries the weight that
 * photography would otherwise do, and the deadline and capacity — the two
 * facts that actually make someone act — sit on the surface instead of
 * inside the dialog.
 */
export default function UpcomingEvent({
  event,
}: {
  event: EventRecord;
}) {
  const path = eventPath(event);
  const date = event.startDateISO ? parts(event.startDateISO) : null;
  const deadline = event.registrationDeadlineISO
    ? parts(event.registrationDeadlineISO)
    : null;
  const venue = event.location.split(",")[0];
  const address = event.location.split(",").slice(1).join(",").trim();

  return (
    <article className="reveal overflow-hidden rounded-2xl border border-border bg-card">
      <div className="grid md:grid-cols-12">
        {/* Date block — the brand colour doing the work an image would */}
        <div className="flex items-center gap-5 bg-primary px-6 py-6 text-primary-foreground md:col-span-3 md:flex-col md:items-start md:justify-center md:gap-0 md:px-8 md:py-10">
          {date ? (
            <>
              <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] opacity-90">
                {date.monthShort}
              </p>
              <p className="font-heading text-6xl font-bold leading-none lg:text-7xl">
                {date.day}
              </p>
              <p className="font-heading text-base font-semibold opacity-90 md:mt-1.5">
                {date.year}
              </p>
            </>
          ) : (
            <p className="font-heading text-lg font-semibold">{event.date}</p>
          )}
        </div>

        <div className="p-6 md:col-span-9 md:p-9">
          <h3 className="display-md font-heading font-bold text-foreground">
            {event.title}
          </h3>

          <ul className="mt-4 flex flex-col gap-2.5 text-base text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-7">
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              {timeOnly(event.date)}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              {event.mapUrl ? (
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline"
                >
                  {venue}
                </a>
              ) : (
                venue
              )}
            </li>
            {event.price !== undefined && (
              <li className="flex items-center gap-2">
                <Ticket className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                ${event.price} {event.priceCurrency ?? "CAD"} per person
              </li>
            )}
          </ul>

          {address && (
            <p className="mt-1.5 text-sm text-muted-foreground sm:pl-6">
              {address}
            </p>
          )}

          {event.description && (
            <p className="measure mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {event.description}
            </p>
          )}

          {/* The deciding facts, previously buried in the dialog */}
          {(deadline || event.capacity) && (
            <dl className="mt-6 flex flex-col gap-4 rounded-xl bg-muted/60 p-4 sm:flex-row sm:gap-8 sm:px-5">
              {deadline && (
                <div className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="text-sm text-muted-foreground">
                      Registration closes
                    </dt>
                    <dd className="font-heading text-base font-bold text-foreground">
                      {deadline.monthLong} {deadline.day}, {deadline.year}
                    </dd>
                  </div>
                </div>
              )}
              {event.capacity && (
                <div className="flex items-start gap-2.5">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="text-sm text-muted-foreground">
                      Capacity
                    </dt>
                    <dd className="font-heading text-base font-bold text-foreground">
                      {event.capacity} people
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          )}

          {path && (
            <Link
              to={path}
              className="press group mt-6 inline-flex min-h-[3rem] items-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Details and registration
              <ArrowRight className="nudge h-4 w-4" aria-hidden />
            </Link>
          )}

          {event.sponsors && event.sponsors.length > 0 && (
            <div className="mt-8 border-t border-border pt-6">
              <EventSponsors sponsors={event.sponsors} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
