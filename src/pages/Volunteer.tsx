import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import { ArrowRight } from "lucide-react";
import { volunteerContent, iconMap } from "@/content/volunteer";

export default function Volunteer() {
  return (
    <>
      <SEOHead
        title="Volunteer"
        description="Join our volunteer team and make a difference in the Limbach Samaj community. Discover volunteer opportunities and start giving back today."
        path="/volunteer"
      />

      <main>
        {/* Hero Section */}
        <Hero
          title={volunteerContent.hero.title}
          subtitle={volunteerContent.hero.subtitle}
          compact
        />

        {/* Introduction */}
        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

          <div className="container-custom relative z-10 max-w-4xl text-center">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                {volunteerContent.intro.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              {volunteerContent.intro.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {volunteerContent.intro.subtitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {volunteerContent.intro.description}
            </p>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/20 to-muted/30" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />

          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold tracking-wide uppercase">
                  {volunteerContent.opportunities.badge}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                {volunteerContent.opportunities.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {volunteerContent.opportunities.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {volunteerContent.opportunities.roles.map((role, idx) => {
                const Icon = iconMap[role.icon as keyof typeof iconMap];
                const colorSchemes = [
                  { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
                  { bg: "bg-secondary/10", text: "text-secondary", border: "border-secondary/20" },
                  { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20" },
                  { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
                  { bg: "bg-secondary/10", text: "text-secondary", border: "border-secondary/20" },
                  { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20" },
                ];
                const colors = colorSchemes[idx];

                return (
                  <div
                    key={idx}
                    className="group relative bg-card p-8 rounded-3xl border border-border/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colors.bg} ${colors.text} border ${colors.border} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className={`text-xl font-heading font-bold mb-3 ${colors.text}`}>
                        {role.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {role.description}
                      </p>
                      <div className={`inline-block px-3 py-1 rounded-full ${colors.bg} ${colors.text} text-sm font-medium`}>
                        {role.commitment}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold tracking-wide uppercase">
                  {volunteerContent.benefits.badge}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                {volunteerContent.benefits.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {volunteerContent.benefits.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {volunteerContent.benefits.items.map((benefit, idx) => (
                <div
                  key={idx}
                  className="relative bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold mb-2 text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/20 to-muted/30" />

          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                  {volunteerContent.process.badge}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                {volunteerContent.process.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {volunteerContent.process.subtitle}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {volunteerContent.process.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="relative text-center"
                  >
                    {/* Connector line (hidden on mobile, shown on md+) */}
                    {idx < volunteerContent.process.steps.length - 1 && (
                      <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/40 to-transparent" />
                    )}

                    <div className="relative">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-4 border-primary/20 text-primary mb-6 relative z-10">
                        <span className="text-3xl font-bold font-heading">{step.number}</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold mb-3 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

          <div className="container-custom max-w-5xl relative z-10">
            <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 p-10 md:p-14 lg:p-16 text-center shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50 rounded-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>

                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">
                  {volunteerContent.cta.title}
                </h2>

                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                  <div className="w-2 h-2 rounded-full bg-primary/40" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
                </div>

                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
                  {volunteerContent.cta.description}
                </p>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:bg-primary/90 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {volunteerContent.cta.buttonText}
                  <ArrowRight className="h-5 w-5" />
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
