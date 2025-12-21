import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Building2, Info } from "lucide-react";
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
        <section className="section-spacing">
          <div className="container-custom">
            <Card className="max-w-3xl mx-auto border-orange-500/30 bg-orange-50/50 dark:bg-orange-950/20">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
                    <Info className="h-8 w-8" />
                  </div>
                </div>
                <h2 className="text-2xl font-heading font-bold text-center text-orange-900 dark:text-orange-100">
                  {sponsorshipContent.inProgressNotice.title}
                </h2>
              </CardHeader>
              <CardContent className="text-center">
                {sponsorshipContent.inProgressNotice.description.map((text, idx) => (
                  <p
                    key={idx}
                    className={`text-lg ${idx === 0 ? 'text-orange-800 dark:text-orange-200 mb-4' : 'text-orange-700 dark:text-orange-300'}`}
                  >
                    {text}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Sponsor */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/20 to-muted/30" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />

          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                  {sponsorshipContent.whySponsor.badge}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                {sponsorshipContent.whySponsor.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {sponsorshipContent.whySponsor.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {sponsorshipContent.whySponsor.impactAreas.map((area, idx) => {
                const Icon = iconMap[area.icon as keyof typeof iconMap];
                const colorSchemes = [
                  {
                    bg: "bg-primary/10",
                    text: "text-primary",
                    border: "border-primary/20",
                    hoverBorder: "group-hover:border-primary/40",
                  },
                  {
                    bg: "bg-secondary/10",
                    text: "text-secondary",
                    border: "border-secondary/20",
                    hoverBorder: "group-hover:border-secondary/40",
                  },
                  {
                    bg: "bg-accent/10",
                    text: "text-accent",
                    border: "border-accent/20",
                    hoverBorder: "group-hover:border-accent/40",
                  },
                ];
                const colors = colorSchemes[idx];

                return (
                  <div
                    key={idx}
                    className={`group relative bg-card p-8 rounded-3xl border ${colors.border} ${colors.hoverBorder} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                  >
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colors.bg} ${colors.text} border ${colors.border} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className={`text-xl font-heading font-bold mb-3 ${colors.text}`}>
                        {area.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sponsorship Tiers */}
        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

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
                    className="group relative bg-card rounded-3xl border border-border/60 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[tier.color]} to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`} />

                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${tier.color}/10 border border-${tier.color}/20 text-${tier.color} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="h-8 w-8" />
                      </div>

                      <h3 className={`text-2xl font-heading font-bold mb-3 text-${tier.color}`}>
                        {tier.name}
                      </h3>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {tier.description}
                      </p>

                      <div className="space-y-3">
                        {tier.features.map((feature, featureIdx) => (
                          <div key={featureIdx} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              <div className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-${tier.color}/10`}>
                                <Check className={`h-3 w-3 text-${tier.color}`} />
                              </div>
                            </div>
                            <p className="text-sm text-foreground">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sponsorship Benefits */}
        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/20 to-muted/30" />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
                {sponsorshipContent.benefits.title}
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12">
                {sponsorshipContent.benefits.subtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sponsorshipContent.benefits.items.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-5 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
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
