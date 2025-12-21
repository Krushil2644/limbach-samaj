import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import { Check, Building2, Info, ArrowRight } from "lucide-react";
import { sponsorshipContent, iconMap } from "@/content/sponsorship";

export default function Sponsorship() {

  return (
    <>
      <SEOHead
        title="Sponsorship"
        description="Partner with Limbach Samaj through sponsorship and support our community initiatives across Canada."
        path="/sponsorship"
      />

      <main>
        {/* Hero Section */}
        <Hero
          title={sponsorshipContent.hero.title}
          subtitle={sponsorshipContent.hero.subtitle}
          compact
        />

        {/* In Progress Notice */}
        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-muted/10 to-muted/20" />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-accent/30 p-8 md:p-12 shadow-xl overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-60" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

                <div className="relative z-10">
                  {/* Icon and Badge */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 mb-4">
                      <Info className="h-10 w-10 text-accent" />
                    </div>
                    <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase">
                      In Progress
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-center mb-6 bg-gradient-to-r from-accent via-foreground to-accent bg-clip-text text-transparent">
                    {sponsorshipContent.inProgressNotice.title}
                  </h2>

                  {/* Decorative divider */}
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                    <div className="w-2 h-2 rounded-full bg-accent/40" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
                  </div>

                  {/* Description */}
                  <div className="text-center space-y-4">
                    {sponsorshipContent.inProgressNotice.description.map((text, idx) => (
                      <p
                        key={idx}
                        className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Why Sponsor */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background with pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

          <div className="container-custom relative z-10">
            {/* Section header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                  {sponsorshipContent.whySponsor.badge}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                {sponsorshipContent.whySponsor.title}
              </h2>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                <div className="w-2 h-2 rounded-full bg-primary/60" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {sponsorshipContent.whySponsor.subtitle}
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {sponsorshipContent.whySponsor.impactAreas.map((area, idx) => {
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

        {/* Sponsorship Tiers */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background with subtle pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/20 to-muted/30" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />

          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold tracking-wide uppercase">
                  {sponsorshipContent.sponsorshipTiers.badge}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                {sponsorshipContent.sponsorshipTiers.title}
              </h2>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                <div className="w-2 h-2 rounded-full bg-secondary/60" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {sponsorshipContent.sponsorshipTiers.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {sponsorshipContent.sponsorshipTiers.tiers.map((tier, idx) => {
                const Icon = iconMap[tier.icon as keyof typeof iconMap];
                const colorMap: Record<string, string> = {
                  primary: "from-primary/10 via-primary/5",
                  secondary: "from-secondary/10 via-secondary/5",
                  accent: "from-accent/10 via-accent/5",
                };

                return (
                  <div
                    key={idx}
                    className="group relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/60 p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[tier.color]} to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`} />

                    {/* Top accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-${tier.color} via-${tier.color}/60 to-transparent rounded-t-3xl`} />

                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${tier.color}/10 border border-${tier.color}/20 text-${tier.color} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="h-8 w-8" />
                      </div>

                      <h3 className={`text-2xl md:text-3xl font-heading font-bold mb-4 text-${tier.color}`}>
                        {tier.name}
                      </h3>

                      {/* Divider */}
                      <div className="flex items-center gap-2 mb-6">
                        <div className={`h-1 w-12 bg-${tier.color}/40 rounded-full`} />
                        <div className="h-px flex-1 bg-border/40" />
                      </div>

                      <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                        {tier.description}
                      </p>

                      <div className="space-y-3">
                        {tier.features.map((feature, featureIdx) => (
                          <div key={featureIdx} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-${tier.color}/10`}>
                                <Check className={`h-3 w-3 text-${tier.color}`} />
                              </div>
                            </div>
                            <p className="text-sm text-foreground leading-relaxed">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom decorative element */}
                    <div className={`absolute bottom-6 right-6 w-20 h-20 bg-${tier.color}/5 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sponsorship Benefits */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold tracking-wide uppercase">
                  Your Benefits
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                {sponsorshipContent.benefits.title}
              </h2>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                <div className="w-2 h-2 rounded-full bg-accent/60" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {sponsorshipContent.benefits.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {sponsorshipContent.benefits.items.map((benefit, index) => (
                <div
                  key={index}
                  className="relative bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-border transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
                        <Check className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-base text-foreground leading-relaxed pt-2">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

          <div className="container-custom max-w-5xl relative z-10">
            <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 p-10 md:p-14 lg:p-16 text-center shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50 rounded-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                  <Building2 className="w-10 h-10 text-primary" />
                </div>

                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">
                  {sponsorshipContent.cta.title}
                </h2>

                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                  <div className="w-2 h-2 rounded-full bg-primary/40" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
                </div>

                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
                  {sponsorshipContent.cta.description}
                </p>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:bg-primary/90 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {sponsorshipContent.cta.buttonText}
                </a>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
