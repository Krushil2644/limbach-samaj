import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Heart, ArrowRight } from "lucide-react";
import EventCard from "@/components/EventCard";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import eventsData from "@/content/events.json";
import heroImage from "@/assets/hero-community.jpg";
import { homeContent } from "@/content/home";

export default function Home() {
  // NOTE: Toggle this flag to re-enable Events on the home page.
  // When Events feature is ready, set this to true and ensure /events route is active.
  const showUpcomingEvents = false;

  const upcomingEvents = showUpcomingEvents
    ? eventsData.filter((event) => event.upcoming).slice(0, 3)
    : [];

  return (
    <>
      <SEOHead
        title="Home"
        description="Limbach Samaj represents Limbach families and community members across Canada. Join us for cultural events, community support, and meaningful connections."
        path="/"
      />

      <main>
        {/* Hero Section */}
        <Hero
          image={heroImage}
          title={homeContent.hero.title}
          subtitle={homeContent.hero.subtitle}
          primaryButton={{
            text: "Learn More",
            link: "/about",
          }}
        />


        {/* Welcome Section */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                  Welcome
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                {homeContent.welcome.title}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {homeContent.welcome.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {homeContent.features.map((feature, idx) => {
                const Icon =
                  feature.icon === "Users"
                    ? Users
                    : feature.icon === "Calendar"
                    ? Calendar
                    : Heart;

                const colorClasses = [
                  {
                    bg: "bg-primary/10",
                    text: "text-primary",
                    border: "border-primary/20",
                    hoverBorder: "group-hover:border-primary/40",
                    gradient: "from-primary/5 to-transparent",
                    glow: "group-hover:shadow-primary/10",
                  },
                  {
                    bg: "bg-secondary/10",
                    text: "text-secondary",
                    border: "border-secondary/20",
                    hoverBorder: "group-hover:border-secondary/40",
                    gradient: "from-secondary/5 to-transparent",
                    glow: "group-hover:shadow-secondary/10",
                  },
                  {
                    bg: "bg-accent/10",
                    text: "text-accent",
                    border: "border-accent/20",
                    hoverBorder: "group-hover:border-accent/40",
                    gradient: "from-accent/5 to-transparent",
                    glow: "group-hover:shadow-accent/10",
                  },
                ];

                const colors = colorClasses[idx];

                return (
                  <div
                    key={idx}
                    className={`group relative bg-card p-8 rounded-3xl border ${colors.border} ${colors.hoverBorder} transition-all duration-500 hover:shadow-2xl ${colors.glow} hover:-translate-y-2`}
                  >
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`} />

                    <div className="relative z-10 text-center">
                      {/* Icon with enhanced styling */}
                      <div className="relative inline-block mb-6">
                        {/* Glow effect */}
                        <div className={`absolute inset-0 ${colors.bg} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        {/* Icon container */}
                        <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl ${colors.bg} ${colors.text} border ${colors.border} ${colors.hoverBorder} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                          <Icon className="h-10 w-10 transition-transform duration-500 group-hover:scale-110" />
                        </div>
                      </div>

                      <h3 className={`text-xl md:text-2xl font-heading font-bold mb-4 ${colors.text} transition-all duration-300`}>
                        {feature.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                        {feature.description}
                      </p>
                    </div>

                    {/* Bottom decorative element */}
                    <div className={`absolute bottom-4 right-4 w-16 h-16 ${colors.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Upcoming Events (temporarily disabled) */}
        {/* NOTE:
            The entire Upcoming Events section is disabled via `showUpcomingEvents`.
            To re-enable:
              1) Set `showUpcomingEvents = true` above.
              2) Make sure /events route and Events page are fully ready.
        */}
        {showUpcomingEvents && (
          <section className="section-spacing bg-muted/30">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  {homeContent.upcomingEvents.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {homeContent.upcomingEvents.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>

              {upcomingEvents.length > 0 && (
                <div className="text-center mt-8">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="hover-lift"
                  >
                    <Link to="/events">
                      {homeContent.upcomingEvents.viewAllText}{" "}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="relative section-spacing overflow-hidden">
          {/* Subtle background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-card border border-border/50 rounded-3xl p-12 md:p-16 lg:p-20 text-center shadow-xl overflow-hidden">
                {/* Subtle decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="inline-block mb-6">
                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                      Get Involved
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-foreground">
                    {homeContent.cta.title}
                  </h2>

                  <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
                    {homeContent.cta.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group px-8"
                    >
                      <Link to="/contact" className="flex items-center">
                        {homeContent.cta.secondaryButton}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>

                  {/* Subtle trust indicators */}
                  <div className="mt-12 pt-8 border-t border-border/50">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-muted-foreground text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Growing Community</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span>Welcoming Environment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Regular Events</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
