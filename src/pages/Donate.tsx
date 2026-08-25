import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import { donateContent, iconMap } from "@/content/donate";
import { siteConfig } from "@/site-config";

export default function Donate() {
  const { hero, give, taxReceipt, noTaxReceipt, impactAreas, sponsorshipPointer, cta } =
    donateContent;

  // Never advertise receipts without the registration number backing it.
  const showTaxReceipt = Boolean(siteConfig.charityNumber);

  return (
    <>
      <SEOHead
        title="Donate"
        description="Support Limbach Samaj of Canada. Your donations help fund cultural events, youth programs, and community support initiatives across Canada."
        path="/donate"
      />

      <main>
        <Hero title={hero.title} subtitle={hero.subtitle} compact />

        {/* How to give */}
        <section aria-labelledby="give" className="pb-16 pt-4 md:pb-20 md:pt-6">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2
                  id="give"
                  className="enter display-lg font-heading font-bold text-foreground"
                  style={{ "--enter-delay": 0 } as React.CSSProperties}
                >
                  {give.title}
                </h2>
                <p
                  className="enter measure mt-5 text-lg leading-relaxed text-muted-foreground"
                  style={{ "--enter-delay": 1 } as React.CSSProperties}
                >
                  {give.intro}
                </p>

                <p
                  className="enter mt-7 flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  style={{ "--enter-delay": 2 } as React.CSSProperties}
                >
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {give.onlineNotice}
                </p>
              </div>

              <div className="lg:col-span-7 lg:pt-2">
                <ol>
                  {give.steps.map((step, index) => (
                    <li
                      key={step.title}
                      className="enter border-t border-border py-7 first:border-t-0 first:pt-0 md:grid md:grid-cols-12 md:gap-8"
                      style={{ "--enter-delay": 2 + index } as React.CSSProperties}
                    >
                      <h3 className="flex items-baseline gap-3 font-heading text-xl font-bold text-foreground md:col-span-4">
                        <span
                          aria-hidden
                          className="font-heading text-base font-bold text-primary-ink"
                        >
                          {index + 1}
                        </span>
                        {step.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-muted-foreground md:col-span-8 md:mt-0 md:text-lg">
                        {step.title === "Send an e-transfer" ? (
                          <>
                            Send any amount to{" "}
                            <a
                              href={`mailto:${siteConfig.email}`}
                              className="link-underline break-words font-medium text-foreground"
                            >
                              {siteConfig.email}
                            </a>
                            .
                          </>
                        ) : (
                          step.body
                        )}
                      </p>
                    </li>
                  ))}
                </ol>

                {!showTaxReceipt && (
                  <div className="enter mt-8 rounded-2xl border border-border bg-muted/40 p-6">
                    <h3 className="font-heading text-base font-bold text-foreground">
                      {noTaxReceipt.title}
                    </h3>
                    <p className="measure mt-2 text-base leading-relaxed text-muted-foreground">
                      {noTaxReceipt.description}
                    </p>
                  </div>
                )}

                {showTaxReceipt && (
                  <div className="enter mt-8 rounded-2xl border border-border bg-muted/40 p-6">
                    <h3 className="font-heading text-base font-bold text-foreground">
                      {taxReceipt.title}
                    </h3>
                    <p className="measure mt-2 text-base leading-relaxed text-muted-foreground">
                      {taxReceipt.description}
                    </p>
                    <dl className="mt-4 text-sm">
                      <dt className="text-muted-foreground">
                        {taxReceipt.numberLabel}
                      </dt>
                      <dd className="mt-0.5 font-medium text-foreground">
                        {siteConfig.charityNumber}
                      </dd>
                    </dl>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {taxReceipt.requestNote}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Where it goes */}
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
                  {impactAreas.title}
                </h2>
                <p className="reveal measure mt-5 text-lg leading-relaxed text-muted-foreground">
                  {impactAreas.subtitle}
                </p>
              </div>

              <div className="lg:col-span-7 lg:pt-2">
                <dl>
                  {impactAreas.areas.map((area) => {
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

        {/* Closing: sponsorship pointer + contact */}
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

              <div className="measure mx-auto mt-10 border-t border-border pt-6">
                <p className="text-base leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {sponsorshipPointer.title}
                  </span>{" "}
                  {sponsorshipPointer.description}
                </p>
                <Link
                  to="/sponsorship"
                  className="link-underline group mt-3 inline-flex items-center gap-2 text-base font-semibold text-primary-ink"
                >
                  {sponsorshipPointer.linkText}
                  <ArrowRight className="nudge h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
