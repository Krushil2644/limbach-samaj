import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AdvertiserGrid from "@/components/AdvertiserGrid";
import HomeHero from "@/components/home/HomeHero";
import WhoWeAre from "@/components/home/WhoWeAre";
import NextGathering from "@/components/home/NextGathering";
import CommunityStrip from "@/components/home/CommunityStrip";
import { homeContent } from "@/content/home";

export default function Home() {
  const { cta } = homeContent;

  return (
    <>
      <SEOHead
        title="Home"
        description="Limbach Samaj of Canada brings Limbach families together across Canada for Navratri Garba, Mataji Havan, Diwali Snehmilan, and community gatherings."
        path="/"
      />

      <main>
        <HomeHero />
        <WhoWeAre />
        <NextGathering />
        <CommunityStrip />
        <AdvertiserGrid />

        {/* Closing invitation */}
        <section className="section-spacing">
          <div className="container-custom">
            <div className="reveal mx-auto max-w-3xl text-center">
              <h2 className="display-lg font-heading font-bold text-foreground">
                {cta.title}
              </h2>
              <p className="measure mx-auto mt-5 text-lg leading-relaxed text-muted-foreground">
                {cta.description}
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/events"
                  className="lift press group inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {cta.primaryButton}
                  <ArrowRight
                    className="nudge h-4 w-4"
                    aria-hidden
                  />
                </Link>
                <Link
                  to="/contact"
                  className="press inline-flex min-h-[3rem] items-center justify-center rounded-xl border border-border px-6 text-base font-semibold text-foreground transition-colors duration-300 hover:border-foreground/30 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {cta.secondaryButton}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
