import { useEffect, useRef } from "react";
import { CalendarDays, Clock, MapPin, Ticket, Users, X } from "lucide-react";

export type EventRecord = {
  id: string;
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
  upcoming: boolean;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Formats from the ISO parts, not through the local timezone. */
function formatDeadline(iso: string) {
  const [y, m, d] = iso.split("T")[0].split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** True when there is anything worth opening a dialog for. */
export function hasDetails(event: EventRecord) {
  return Boolean(
    event.description || event.additionalInfo?.length || event.schedule?.length,
  );
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

export default function EventDetailsDialog({
  event,
  onClose,
}: {
  event: EventRecord;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusable()[0]?.focus();

    // Without a trap, Tab walks straight out of the dialog into the page
    // behind it, which is still visible and still scrollable.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const venue = event.location.split(",")[0];

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center overflow-y-auto bg-background/80 p-4 pt-20 backdrop-blur-sm sm:pt-24"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-dialog-title"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="enter relative my-auto w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="press absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/90 text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="sr-only">Close</span>
          <X className="h-4 w-4" aria-hidden />
        </button>

        <div className="p-6 md:p-9">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-primary-ink">
              {event.upcoming ? "Upcoming" : "Past event"}
            </p>
            {event.status && (
              <p className="rounded-full bg-primary/12 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-ink">
                {event.status}
              </p>
            )}
          </div>

          <h2
            id="event-dialog-title"
            className="display-md mt-2 pr-12 font-heading font-bold text-foreground"
          >
            {event.title}
          </h2>

          <ul className="mt-5 flex flex-col gap-3 text-base text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              {event.date}
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              {event.mapUrl ? (
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-foreground"
                >
                  {event.location}
                </a>
              ) : (
                event.location
              )}
            </li>
            {event.price !== undefined && (
              <li className="flex items-start gap-2.5">
                <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                ${event.price} {event.priceCurrency ?? "CAD"} per person
              </li>
            )}
          </ul>

          {(event.registrationDeadlineISO || event.capacity) && (
            <dl className="mt-6 flex flex-col gap-4 rounded-xl bg-muted/60 p-4 sm:flex-row sm:gap-8 sm:px-5">
              {event.registrationDeadlineISO && (
                <div className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="text-sm text-muted-foreground">Registration closes</dt>
                    <dd className="font-heading text-base font-bold text-foreground">
                      {formatDeadline(event.registrationDeadlineISO)}
                    </dd>
                  </div>
                </div>
              )}
              {event.capacity && (
                <div className="flex items-start gap-2.5">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="text-sm text-muted-foreground">Capacity</dt>
                    <dd className="font-heading text-base font-bold text-foreground">
                      {event.capacity} people
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          )}

          {event.description && (
            <p className="measure mt-6 border-t border-border pt-6 text-base leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          )}

          {event.schedule && event.schedule.length > 0 && (
            <div className="mt-6 border-t border-border pt-6">
              <h3 className="font-heading text-base font-bold text-foreground">
                Schedule
              </h3>
              {/* Genuinely tabular — it was previously one paragraph of
                  line-broken text. */}
              <dl className="mt-4">
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
            <div className="mt-6 border-t border-border pt-6">
              <h3 className="font-heading text-base font-bold text-foreground">
                Details and registration
              </h3>
              <ul className="mt-4 space-y-3">
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
            <div className="mt-6 border-t border-border pt-6">
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

          <p className="sr-only">Venue: {venue}</p>
        </div>
      </div>
    </div>
  );
}
