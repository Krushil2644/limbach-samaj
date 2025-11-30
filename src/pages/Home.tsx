import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Heart, ArrowRight } from "lucide-react";
import EventCard from "@/components/EventCard";
import SEOHead from "@/components/SEOHead";
import eventsData from "@/content/events.json";
import heroImage from "@/assets/hero-community.jpg";
import { homeContent } from "@/content/home";
import { siteConfig } from '@/site-config';

export default function Home() {
  console.log(heroImage);
  // NOTE: Toggle this flag to re-enable Events on the home page.
  // When Events feature is ready, set this to true and ensure /events route is active.
  const showUpcomingEvents = false;
  const membershipVisible = siteConfig.navLinks.membership.visible;

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
                {/* Hero Section */}
        <section
          className="relative h-[600px] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay so white text is readable */}
          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 container-custom text-center text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">
              {homeContent.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {homeContent.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Events CTA is still hidden for now */}
              {false && (
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link to="/events">
                    View Events <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>


        {/* Welcome Section */}
        <section className="section-spacing">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                {homeContent.welcome.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {homeContent.welcome.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {homeContent.features.map((feature, idx) => {
                const Icon =
                  feature.icon === "Users"
                    ? Users
                    : feature.icon === "Calendar"
                    ? Calendar
                    : Heart;

                const colorClass =
                  idx === 0
                    ? "bg-primary/10 text-primary"
                    : idx === 1
                    ? "bg-secondary/10 text-secondary"
                    : "bg-accent/10 text-accent";

                return (
                  <div key={idx} className="text-center p-6 hover-lift">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colorClass} mb-4 transition-transform`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
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
        <section className="section-spacing">
          <div className="container-custom">
            <div className="bg-gradient-primary  rounded-2xl p-12 md:p-16 text-center hover-lift">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                {homeContent.cta.title}
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
                {homeContent.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 hover-lift"
                >
                  <Link to="/contact">{homeContent.cta.secondaryButton}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
