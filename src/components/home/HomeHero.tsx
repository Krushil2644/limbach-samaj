import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { homeContent } from "@/content/home";
import heroImage from "@/assets/hero-community.jpg";

/**
 * Asymmetric hero: type column and a framed photographic panel.
 *
 * The devotional photograph is presented whole rather than used as a
 * full-bleed backdrop — the previous treatment cropped through the murti and
 * buried it under a dark scrim and a floating card.
 */
export default function HomeHero() {
  const { title, subtitle, location, primaryAction, secondaryAction } =
    homeContent.hero;

  return (
    <section className="relative overflow-hidden">
      {/* Warm ground that fades into the page, anchored top-right behind
          the photograph. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_78%_18%,hsl(var(--primary)/0.10),transparent_60%)]"
      />

      <div className="container-custom relative">
        <div className="grid items-center gap-10 py-14 md:gap-14 md:py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          {/* Type column */}
          <div className="lg:col-span-6">
            <p
              className="enter flex items-center gap-2 text-sm font-medium text-primary-ink"
              style={{ "--enter-delay": 0 } as React.CSSProperties}
            >
              <MapPin className="h-4 w-4 text-primary" aria-hidden />
              {location}
            </p>

            <h1
              className="enter display-xl mt-5 font-heading font-bold text-foreground"
              style={{ "--enter-delay": 1 } as React.CSSProperties}
            >
              {title}
            </h1>

            <p
              className="enter measure mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl"
              style={{ "--enter-delay": 2 } as React.CSSProperties}
            >
              {subtitle}
            </p>

            <div
              className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ "--enter-delay": 3 } as React.CSSProperties}
            >
              <Link
                to={primaryAction.link}
                className="lift group inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {primaryAction.text}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>

              <Link
                to={secondaryAction.link}
                className="inline-flex min-h-[3rem] items-center justify-center rounded-xl border border-border px-6 text-base font-semibold text-foreground transition-colors duration-300 hover:border-foreground/30 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {secondaryAction.text}
              </Link>
            </div>
          </div>

          {/* Photographic panel */}
          <div className="lg:col-span-6">
            <figure
              className="enter relative"
              style={{ "--enter-delay": 2 } as React.CSSProperties}
            >
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-[0_18px_50px_-24px_hsl(20_40%_20%/0.45)]">
                <img
                  src={heroImage}
                  alt="Maa Limbach enshrined and garlanded with marigold and rose for the Samaj's Navratri celebration"
                  width={967}
                  height={644}
                  fetchPriority="high"
                  decoding="async"
                  className="hero-settle aspect-[3/2] w-full object-cover object-center"
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
