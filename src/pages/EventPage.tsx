import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  Users,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import EventSponsors from "@/components/events/EventSponsors";
import NotFound from "@/pages/NotFound";
import { events, eventPath, formatISODate } from "@/lib/events";
import { sponsorshipContent } from "@/content/sponsorship";
import { siteConfig } from "@/site-config";

/** Strips the leading "9th October, 2026 - " so only the time remains. */
function timeOnly(date: string) {
  return date.replace(/^.*?\d{4}\s*-\s*/, "");
}

/**
 * Emphasises the things people scan for in registration instructions —
 * amounts, email addresses and phone numbers — and linkifies URLs.
 */
function renderEmphasis(text: string) {
  return text.split("\n").map((line, lineIndex, lines) => (
    <span key={lineIndex}>
      {line
        .split(
          /(\$\d[\d,]*(?:\/-)?|\bhttps?:\/\/[^\s]+|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|\b\d{3}-\d{3}-\d{4}\b)/gi,
        )
        .map((chunk, index) => {
          if (/^https?:\/\//i.test(chunk)) {
            return (
              <a
                key={index}
                href={chunk}
                target="_blank"
                rel="noreferrer"
                className="link-underline font-medium text-primary-ink"
              >
                {chunk}
              </a>
            );
          }
          if (
            /^\$\d/.test(chunk) ||
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(chunk) ||
            /^\d{3}-\d{3}-\d{4}$/.test(chunk)
          ) {
            return (
              <strong key={index} className="font-semibold text-foreground">
                {chunk}
              </strong>
            );
          }
          return <span key={index}>{chunk}</span>;
        })}
      {lineIndex < lines.length - 1 && <br />}
    </span>
  ));
}

export default function EventPage() {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug);

  if (!event) return <NotFound />;

  const venue = event.location.split(",")[0];
  const address = event.location.split(",").slice(1).join(",").trim();
  const sponsors = event.sponsors ?? [];
  const path = eventPath(event)!;
  const featuredImage = sponsors.find((s) => s.imageSrc)?.imageSrc;

  return (
    <>
      <SEOHead
        title={event.title}
        description={
          event.description ||
          `${event.title} — ${event.date}, ${event.location}.`
        }
        path={path}
      />

      <main>
        {/* Header */}
        <section className="bg-gradient-to-b from-muted/30 via-muted/10 to-background pb-10 pt-10 md:pb-14 md:pt-14">
          <div className="container-custom">
            <Link
              to="/events"
              className="link-underline group inline-flex items-center gap-2 text-sm font-semibold text-primary-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All events
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium text-primary-ink">
                {event.upcoming ? "Upcoming" : "Past event"}
              </p>
              {event.upcoming && event.status && (
                <p className="rounded-full bg-primary/12 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-ink">
                  {event.status}
                </p>
              )}
            </div>

            <h1 className="display-lg mt-3 max-w-4xl font-heading font-bold text-foreground">
              {event.title}
            </h1>

            <ul className="mt-6 flex flex-col gap-3 text-base text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-8">
              <li className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {event.startDateISO ? formatISODate(event.startDateISO) : event.date}
              </li>
              {event.startDateISO && (
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {timeOnly(event.date)}
                </li>
              )}
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {venue}
              </li>
            </ul>
          </div>
        </section>

        {/* Body + at-a-glance */}
        <section className="pb-16 md:pb-20">
          <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              {event.description && (
                <p className="measure text-lg leading-relaxed text-muted-foreground">
                  {event.description}
                </p>
              )}

              {event.schedule && event.schedule.length > 0 && (
                <div className="mt-10 border-t border-border pt-8">
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Schedule
                  </h2>
                  <dl className="mt-5">
                    {event.schedule.map((row) => (
                      <div
                        key={row.time}
                        className="flex flex-col gap-0.5 border-t border-border/70 py-3 first:border-t-0 first:pt-0 sm:flex-row sm:gap-6"
                      >
                        <dt className="font-heading text-sm font-bold tabular-nums text-foreground sm:w-48 sm:shrink-0">
                          {row.time}
                        </dt>
                        <dd className="text-base text-muted-foreground">
                          {row.activity}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {event.additionalInfo && event.additionalInfo.length > 0 && (
                <div className="mt-10 border-t border-border pt-8">
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Details and registration
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {event.additionalInfo.map((info, index) => (
                      <li
                        key={index}
                        className="border-t border-border/70 pt-3 text-base leading-relaxed text-muted-foreground first:border-t-0 first:pt-0"
                      >
                        {renderEmphasis(info)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.youtubeUrl && (
                <div className="mt-10 border-t border-border pt-8">
                  <a
                    href={event.youtubeUrl.replace("/embed/", "/watch?v=")}
                    target="_blank"
                    rel="noreferrer"
                    className="press inline-flex min-h-[2.75rem] items-center gap-2.5 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700"
                  >
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Watch the recording
                  </a>
                </div>
              )}
            </div>

            {/* At a glance — sticky on desktop so the deciding facts stay in
                view while reading the registration notes. */}
            <aside className="order-first lg:order-none lg:col-span-4">
              <div className="rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-28">
                <h2 className="font-heading text-base font-bold text-foreground">
                  At a glance
                </h2>
                <dl className="mt-5 space-y-5 text-base">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <div>
                      <dt className="text-sm text-muted-foreground">When</dt>
                      <dd className="font-semibold text-foreground">{event.date}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <div>
                      <dt className="text-sm text-muted-foreground">Where</dt>
                      <dd className="font-semibold text-foreground">{venue}</dd>
                      {address && (
                        <dd className="text-sm text-muted-foreground">{address}</dd>
                      )}
                      {event.mapUrl && (
                        <dd className="mt-1">
                          <a
                            href={event.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="link-underline text-sm font-semibold text-primary-ink"
                          >
                            Open in Maps
                          </a>
                        </dd>
                      )}
                    </div>
                  </div>
                  {event.price !== undefined && (
                    <div className="flex items-start gap-3">
                      <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <div>
                        <dt className="text-sm text-muted-foreground">Ticket</dt>
                        <dd className="font-semibold text-foreground">
                          ${event.price} {event.priceCurrency ?? "CAD"} per person
                        </dd>
                      </div>
                    </div>
                  )}
                  {event.upcoming && event.registrationDeadlineISO && (
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <div>
                        <dt className="text-sm text-muted-foreground">Registration closes</dt>
                        <dd className="font-semibold text-foreground">
                          {formatISODate(event.registrationDeadlineISO)}
                        </dd>
                      </div>
                    </div>
                  )}
                  {event.capacity && (
                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <div>
                        <dt className="text-sm text-muted-foreground">Capacity</dt>
                        <dd className="font-semibold text-foreground">
                          {event.capacity} people
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>
              </div>
            </aside>
          </div>
        </section>

        {/* Sponsors — what a paid event sponsorship actually buys */}
        {sponsors.length > 0 && (
          <section
            aria-labelledby="event-sponsors"
            className="border-t border-border py-16 md:py-20"
          >
            <div className="container-custom">
              <h2
                id="event-sponsors"
                className="display-md font-heading font-bold text-foreground"
              >
                Thank you to our sponsors
              </h2>
              <p className="measure mt-3 text-lg leading-relaxed text-muted-foreground">
                Their support keeps this gathering affordable for every family.
              </p>
              <div className="mt-8 max-w-4xl">
                <EventSponsors sponsors={sponsors} hideHeading />
              </div>
            </div>
          </section>
        )}

        {/* Become a sponsor — only while there is still an event to sponsor */}
        {event.upcoming && (
          <section
            aria-labelledby="sponsor-cta"
            className="border-t border-border bg-muted/40 py-16 md:py-20"
          >
            <div className="container-custom grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <h2
                  id="sponsor-cta"
                  className="display-md font-heading font-bold text-foreground"
                >
                  {sponsors.length > 0
                    ? "Join them as a sponsor"
                    : "Sponsor this event"}
                </h2>
                <p className="measure mt-4 text-lg leading-relaxed text-muted-foreground">
                  Put your name or your business in front of the whole Samaj —
                  at the venue on the night, and on this page.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/sponsorship"
                    className="press group inline-flex min-h-[3rem] items-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Become a sponsor
                    <ArrowRight className="nudge h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    to="/contact"
                    className="press inline-flex min-h-[3rem] items-center rounded-xl border border-border bg-background px-6 text-base font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Ask a question
                  </Link>
                </div>
              </div>

              <dl className="lg:col-span-7">
                {sponsorshipContent.offers.items.map((item) => (
                  <div
                    key={item.name}
                    className="border-t border-border py-5 first:border-t-0 first:pt-0"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                      <dt className="font-heading text-lg font-bold text-foreground">
                        {item.name}
                      </dt>
                      <span className="font-heading text-xl font-bold text-primary-ink">
                        {item.amount}
                      </span>
                    </div>
                    <dd className="mt-1 text-base leading-relaxed text-muted-foreground">
                      {item.description}
                    </dd>
                  </div>
                ))}
                <p className="border-t border-border pt-5 text-sm text-muted-foreground">
                  {sponsorshipContent.offers.intro}
                </p>
              </dl>
            </div>
          </section>
        )}
      </main>

      {event.startDateISO && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: event.title,
              startDate: event.startDateISO,
              ...(event.endDateISO ? { endDate: event.endDateISO } : {}),
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              url: `${siteConfig.siteUrl}${path}`,
              image: `${siteConfig.siteUrl}${featuredImage ?? siteConfig.ogImage}`,
              description: event.description,
              location: {
                "@type": "Place",
                name: venue,
                address: event.location,
              },
              ...(event.price !== undefined
                ? {
                    offers: {
                      "@type": "Offer",
                      price: event.price,
                      priceCurrency: event.priceCurrency ?? "CAD",
                      availability: "https://schema.org/InStock",
                      url: `${siteConfig.siteUrl}${path}`,
                    },
                  }
                : {}),
              ...(sponsors.length > 0
                ? {
                    sponsor: sponsors.map((s) => ({
                      "@type": s.business ? "Organization" : "Person",
                      name: s.business ?? s.name,
                      ...(s.href ? { url: s.href } : {}),
                    })),
                  }
                : {}),
              organizer: {
                "@type": "Organization",
                name: siteConfig.appName,
                url: siteConfig.siteUrl,
              },
            }),
          }}
        />
      )}
    </>
  );
}
