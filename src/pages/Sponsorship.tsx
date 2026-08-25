import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import AdvertiserGrid from "@/components/AdvertiserGrid";
import { sponsorshipContent, iconMap } from "@/content/sponsorship";

export default function Sponsorship() {
  const { hero, offers, currentSponsors, whySponsor, inDevelopment, cta } =
    sponsorshipContent;
  const { donatePointer } = offers;

  return (
    <>
      <SEOHead
        title="Sponsorship"
        description="Partner with Limbach Samaj of Canada through sponsorship and support our community initiatives across Canada."
        path="/sponsorship"
      />

      <main>
        <Hero title={hero.title} subtitle={hero.subtitle} compact />

        {/* What it costs, and how to do it */}
        <section aria-labelledby="offers" className="pb-16 pt-4 md:pb-20 md:pt-6">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2
                  id="offers"
                  className="enter display-lg font-heading font-bold text-foreground"
                  style={{ "--enter-delay": 0 } as React.CSSProperties}
                >
                  {offers.title}
                </h2>
                <p
                  className="enter measure mt-5 text-lg leading-relaxed text-muted-foreground"
                  style={{ "--enter-delay": 1 } as React.CSSProperties}
                >
                  {offers.intro}
                </p>

                <div
                  className="enter mt-9 rounded-2xl border border-border bg-muted/40 p-6"
                  style={{ "--enter-delay": 2 } as React.CSSProperties}
                >
                  <h3 className="font-heading text-base font-bold text-foreground">
                    {offers.howTo.title}
                  </h3>
                  <ol className="mt-4 space-y-3">
                    {offers.howTo.steps.map((step, index) => (
                      <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span
                          aria-hidden
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-[0.6875rem] font-bold text-primary-ink"
                        >
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Amounts as a table-like list — the figure is the thing
                  people are scanning for. */}
              <div className="lg:col-span-7 lg:pt-2">
                <dl>
                  {offers.items.map((item, index) => (
                    <div
                      key={item.name}
                      className="enter border-t border-border py-7 first:border-t-0 first:pt-0"
                      style={{ "--enter-delay": 2 + index } as React.CSSProperties}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <dt className="font-heading text-xl font-bold text-foreground">
                          {item.name}
                        </dt>
                        <span className="font-heading text-2xl font-bold text-primary-ink">
                          {item.amount}
                        </span>
                      </div>
                      <dd className="measure mt-2 text-base leading-relaxed text-muted-foreground md:text-lg">
                        {item.description}
                      </dd>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Offered at: {item.offeredAt}
                      </p>
                    </div>
                  ))}
                </dl>

                <p className="enter mt-7 border-t border-border pt-6 text-base text-muted-foreground">
                  {donatePointer.text}{" "}
                  <Link
                    to={donatePointer.link}
                    className="link-underline font-semibold text-primary-ink"
                  >
                    {donatePointer.linkText}
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Real, named sponsors */}
        <section
          aria-labelledby="sponsors"
          className="border-t border-border py-16 md:py-20"
        >
          <div className="container-custom">
            <h2
              id="sponsors"
              className="reveal display-lg font-heading font-bold text-foreground"
            >
              {currentSponsors.title}
            </h2>
            <p className="reveal measure mt-4 text-lg leading-relaxed text-muted-foreground">
              {currentSponsors.subtitle}
            </p>

            <h3 className="reveal mt-10 font-heading text-base font-bold text-foreground">
              {currentSponsors.heading}
            </h3>
            <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {currentSponsors.sponsors.map((sponsor) => (
                <li
                  key={sponsor.name}
                  className="reveal border-t border-border pt-4 font-heading text-lg font-semibold text-foreground"
                >
                  {sponsor.name}
                  {sponsor.note && (
                    <span className="mt-1 block text-sm font-normal text-muted-foreground">
                      {sponsor.note}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Advertisers already on the site — the $151 tier, made concrete */}
        <AdvertiserGrid />

        {/* Where the money goes */}
        <section
          aria-labelledby="impact"
          className="border-t border-border py-16 md:py-20"
        >
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2
                  id="impact"
                  className="reveal display-lg font-heading font-bold text-foreground"
                >
                  {whySponsor.title}
                </h2>
                <p className="reveal measure mt-5 text-lg leading-relaxed text-muted-foreground">
                  {whySponsor.subtitle}
                </p>
              </div>

              <div className="lg:col-span-7 lg:pt-2">
                <dl>
                  {whySponsor.impactAreas.map((area) => {
                    const Icon = iconMap[area.icon as keyof typeof iconMap];
                    return (
                      <div
                        key={area.title}
                        className="reveal border-t border-border py-7 first:border-t-0 first:pt-0 md:grid md:grid-cols-12 md:gap-8"
                      >
                        <dt className="flex items-center gap-2.5 font-heading text-xl font-bold text-foreground md:col-span-4">
                          {Icon && (
                            <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                          )}
                          {area.title}
                        </dt>
                        <dd className="mt-2 text-base leading-relaxed text-muted-foreground md:col-span-8 md:mt-0 md:text-lg">
                          {area.description}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="container-custom">
            <div className="reveal mx-auto max-w-2xl text-center">
              <h2 className="display-md font-heading font-bold text-foreground">
                {cta.title}
              </h2>
              <p className="measure mx-auto mt-4 text-lg leading-relaxed text-muted-foreground">
                {cta.description}
              </p>
              <Link
                to="/contact"
                className="press group mt-8 inline-flex min-h-[3rem] items-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {cta.buttonText}
                <ArrowRight className="nudge h-4 w-4" aria-hidden />
              </Link>

              <p className="measure mx-auto mt-10 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {inDevelopment.title}.
                </span>{" "}
                {inDevelopment.description}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
