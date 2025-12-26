import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import { Check, Info, ArrowRight } from "lucide-react";
import { donateContent, iconMap } from "@/content/donate";

export default function Donate() {
  return (
    <>
      <SEOHead
        title="Donate"
        description="Support Limbach Samaj's mission to serve our community across Canada. Your donations help fund cultural events, youth programs, and community support initiatives."
        path="/donate"
      />

      <main>
        {/* Hero Section */}
        <Hero
          title={donateContent.hero.title}
          subtitle={donateContent.hero.subtitle}
          compact
        />

        {/* Coming Soon Notice */}
        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-muted/10 to-muted/20" />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-primary/30 p-8 md:p-12 shadow-xl overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-60" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="relative z-10">
                  {/* Icon and Badge */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                      <Info className="h-10 w-10 text-primary" />
                    </div>
                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
                      Coming Soon
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-center mb-6 bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent">
                    {donateContent.comingSoonNotice.title}
                  </h2>

                  {/* Decorative divider */}
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                    <div className="w-2 h-2 rounded-full bg-primary/40" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
                  </div>

                  {/* Description */}
                  <div className="text-center space-y-4 mb-8">
                    {donateContent.comingSoonNotice.description.map((text, idx) => (
                      <p
                        key={idx}
                        className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                      >
                        {text}
                      </p>
                    ))}
                  </div>

                  {/* Tax Receipt Info Card */}
                  {donateContent.comingSoonNotice.showTaxReceitpInfo && (
                    <div className="relative bg-muted/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 max-w-2xl mx-auto">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-heading font-bold mb-2 text-foreground">
                            {donateContent.comingSoonNotice.taxReceiptInfo.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {donateContent.comingSoonNotice.taxReceiptInfo.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

          <div className="container-custom relative z-10 max-w-4xl text-center">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                {donateContent.intro.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              {donateContent.intro.title}
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
              <div className="w-2 h-2 rounded-full bg-primary/60" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              {donateContent.intro.subtitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {donateContent.intro.description}
            </p>
          </div>
        </section>

        {/* Impact Areas */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background with subtle pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/20 to-muted/30" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />

          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold tracking-wide uppercase">
                  {donateContent.impactAreas.badge}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                {donateContent.impactAreas.title}
              </h2>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                <div className="w-2 h-2 rounded-full bg-secondary/60" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {donateContent.impactAreas.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {donateContent.impactAreas.areas.map((area, idx) => {
                const Icon = iconMap[area.icon as keyof typeof iconMap];
                const colorSchemes = [
                  {
                    badge: "bg-primary/10 text-primary border-primary/20",
                    accent: "bg-primary/40",
                    hover: "group-hover:border-primary/30",
                    glow: "group-hover:shadow-primary/10",
                  },
                  {
                    badge: "bg-secondary/10 text-secondary border-secondary/20",
                    accent: "bg-secondary/40",
                    hover: "group-hover:border-secondary/30",
                    glow: "group-hover:shadow-secondary/10",
                  },
                  {
                    badge: "bg-accent/10 text-accent border-accent/20",
                    accent: "bg-accent/40",
                    hover: "group-hover:border-accent/30",
                    glow: "group-hover:shadow-accent/10",
                  },
                  {
                    badge: "bg-primary/10 text-primary border-primary/20",
                    accent: "bg-primary/40",
                    hover: "group-hover:border-primary/30",
                    glow: "group-hover:shadow-primary/10",
                  },
                ];

                const scheme = colorSchemes[idx];

                return (
                  <div
                    key={idx}
                    className={`group relative bg-card/80 backdrop-blur-sm p-8 rounded-3xl border border-border/60 ${scheme.hover} transition-all duration-500 hover:shadow-2xl ${scheme.glow} hover:-translate-y-2`}
                  >
                    {/* Top decorative line */}
                    <div className={`absolute top-0 left-8 right-8 h-1 ${scheme.accent} rounded-b-full transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500`} />

                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${scheme.badge} border mb-4 transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 text-foreground transition-colors duration-300 group-hover:text-foreground">
                        {area.title}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                        {area.description}
                      </p>
                    </div>

                    {/* Bottom right decorative element */}
                    <div className={`absolute bottom-6 right-6 w-16 h-16 ${scheme.accent} opacity-5 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Support */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold tracking-wide uppercase">
                  {donateContent.whySupport.badge}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                {donateContent.whySupport.title}
              </h2>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                <div className="w-2 h-2 rounded-full bg-accent/60" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {donateContent.whySupport.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {donateContent.whySupport.reasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="relative bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-border transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
                        <Check className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold mb-2 text-foreground">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

          <div className="container-custom max-w-5xl relative z-10">
            <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-primary/30 p-10 md:p-14 lg:p-16 text-center shadow-xl overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-60" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-6 transition-transform duration-300 hover:scale-110">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>

                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent">
                  {donateContent.cta.title}
                </h2>

                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                  <div className="w-2 h-2 rounded-full bg-primary/40" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
                </div>

                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
                  {donateContent.cta.description}
                </p>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:bg-primary/90 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {donateContent.cta.buttonText}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
