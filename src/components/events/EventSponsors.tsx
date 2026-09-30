export type EventSponsor = {
  name: string;
  /** e.g. "Platinum Sponsor", "Grand Sponsor". */
  tier?: string;
  business?: string;
  /** Sponsor's banner, under public/. Name-only sponsors render as text. */
  imageSrc?: string;
  href?: string;
};

/**
 * Sponsors with a banner get the banner, linked; everyone else is listed by
 * name. Paid event sponsorship promises a place on the website, so this sits
 * on the event itself rather than at the end of the registration notes.
 */
export default function EventSponsors({
  sponsors,
  hideHeading = false,
}: {
  sponsors: EventSponsor[];
  hideHeading?: boolean;
}) {
  const featured = sponsors.filter((s) => s.imageSrc);
  const named = sponsors.filter((s) => !s.imageSrc);

  return (
    <div>
      {!hideHeading && (
        <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {sponsors.length === 1 ? "Event sponsor" : "Event sponsors"}
        </h3>
      )}

      {featured.length > 0 && (
        <ul className={`grid gap-4 ${featured.length > 1 ? "sm:grid-cols-2" : "max-w-xl"}`}>
          {featured.map((sponsor) => {
            const body = (
              <>
                <img
                  src={sponsor.imageSrc}
                  alt={`${sponsor.name}${sponsor.business ? `, ${sponsor.business}` : ""}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-lg border border-border object-contain"
                />
                <p className="mt-2.5 font-heading text-base font-bold text-foreground">
                  {sponsor.name}
                  {sponsor.business && (
                    <span className="font-normal text-muted-foreground"> · {sponsor.business}</span>
                  )}
                </p>
                {sponsor.tier && (
                  <p className="text-sm font-semibold text-primary-ink">{sponsor.tier}</p>
                )}
              </>
            );
            return (
              <li key={sponsor.name}>
                {sponsor.href ? (
                  <a
                    href={sponsor.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="lift block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {body}
                  </a>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ul>
      )}

      {named.length > 0 && (
        <ul className={`grid gap-x-6 gap-y-2 sm:grid-cols-2 ${featured.length > 0 ? "mt-6" : ""}`}>
          {named.map((sponsor) => (
            <li key={sponsor.name} className="font-heading text-base font-semibold text-foreground">
              {sponsor.name}
              {sponsor.tier && (
                <span className="block text-sm font-normal text-muted-foreground">{sponsor.tier}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
