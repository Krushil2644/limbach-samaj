import { advertisersContent, type Advertiser } from "@/content/advertisers";

/**
 * Advertiser artwork arrives in whatever shape the business supplies —
 * currently a 1.84:1 landscape alongside a 0.67:1 portrait. Each card uses a
 * fixed 4:3 frame with `object-contain`, so every card is the same height and
 * no artwork is cropped; the leftover space reads as a mat around the ad.
 */
function AdvertiserCard({ advertiser }: { advertiser: Advertiser }) {
  const frame = (
    <div className="aspect-[4/3] w-full bg-muted/40 p-4 md:p-6">
      <img
        src={advertiser.imageSrc}
        alt={advertiser.imageAlt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain"
      />
    </div>
  );

  const cardClass =
    "group relative block overflow-hidden rounded-3xl border border-border/50 bg-card shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl";

  if (advertiser.href) {
    return (
      <a
        href={advertiser.href}
        target="_blank"
        rel="noreferrer noopener"
        className={cardClass}
      >
        {frame}
      </a>
    );
  }

  return <div className={cardClass}>{frame}</div>;
}

export default function AdvertiserGrid() {
  const { title, subtitle, items } = advertisersContent;

  if (items.length === 0) return null;

  return (
    <section className="relative section-spacing overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/20 to-muted/30" />
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {title}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {items.map((advertiser) => (
            <AdvertiserCard key={advertiser.imageSrc} advertiser={advertiser} />
          ))}
        </div>
      </div>
    </section>
  );
}
