import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { advertisersContent, type Advertiser } from "@/content/advertisers";

/**
 * Advertiser artwork arrives in whatever shape the business supplies —
 * currently a 1.84:1 landscape alongside a 0.67:1 portrait. Each card uses a
 * fixed 4:3 frame with `object-contain`, so every card is the same height and
 * no artwork is cropped; the leftover space reads as a mat around the ad.
 */
function AdvertiserCard({ advertiser }: { advertiser: Advertiser }) {
  const frame = (
    <div className="aspect-[4/3] w-full bg-muted/50 p-5 md:p-7">
      <img
        src={advertiser.imageSrc}
        alt={advertiser.imageAlt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain"
      />
    </div>
  );

  const content = (
    <>
      {frame}
      {advertiser.label && (
        <p className="border-t border-border px-5 py-3 text-sm font-semibold text-foreground">
          {advertiser.label}
        </p>
      )}
    </>
  );

  const cardClass =
    "reveal lift group relative block overflow-hidden rounded-2xl border border-border bg-card hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  if (advertiser.href) {
    return (
      <a
        href={advertiser.href}
        target="_blank"
        rel="noreferrer noopener"
        className={cardClass}
      >
        {content}
      </a>
    );
  }

  return <div className={cardClass}>{content}</div>;
}

export default function AdvertiserGrid() {
  const { title, subtitle, cta, items } = advertisersContent;

  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="advertisers-heading"
      className="border-t border-border pt-16 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28"
    >
      <div className="container-custom">
        {/* Left-aligned header with the action opposite, matching the gallery
            section rather than the old centred block on a decorative band. */}
        <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="advertisers-heading"
              className="display-lg font-heading font-bold text-foreground"
            >
              {title}
            </h2>
            <p className="measure mt-4 text-lg leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          </div>

          <Link
            to={cta.link}
            className="link-underline group inline-flex shrink-0 items-center gap-2 self-start text-base font-semibold text-primary-ink md:self-auto"
          >
            {cta.text}
            <ArrowRight
              className="nudge h-4 w-4"
              aria-hidden
            />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-12 md:gap-6">
          {items.map((advertiser) => (
            <AdvertiserCard key={advertiser.imageSrc} advertiser={advertiser} />
          ))}
        </div>
      </div>
    </section>
  );
}
