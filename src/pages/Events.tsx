import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import rawEventsData from "@/content/events.json";

type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  upcoming: boolean;
};

const eventsData: EventItem[] = Array.isArray(rawEventsData)
  ? (rawEventsData as EventItem[])
  : [];

export default function Events() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingEvents = eventsData.filter((event) => event.upcoming);
  const pastEvents = eventsData.filter((event) => !event.upcoming);

  return (
    <>
      <SEOHead
        title="Events"
        description="Discover upcoming community events and cultural celebrations hosted by Limbach Samaj across Canada. Join us for memorable gatherings and activities."
        path="/events"
      />

      <main>
        {/* Hero Section */}
        <Hero
          title="Community Events"
          subtitle="Join us for cultural celebrations, family gatherings, and community activities throughout the year."
          compact
        />

        {/* Events Tabs + Intro */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />

          <div className="container-custom relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                  Join Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                Our Events
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Limbach Samaj of Canada organizes meaningful cultural, spiritual,
                and social events throughout the year to strengthen our community
                bonds. From religious ceremonies to family gatherings and festive
                celebrations, our events create opportunities for connection,
                tradition, and shared joy.
              </p>
            </div>

            {/* Enhanced Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-center mb-12">
                <TabsList className="inline-flex h-12 items-center justify-center rounded-2xl bg-muted/50 backdrop-blur-sm p-1.5 border border-border/40 shadow-sm">
                  <TabsTrigger
                    value="upcoming"
                    className="rounded-xl px-8 py-2.5 text-sm font-semibold transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    Upcoming Events
                  </TabsTrigger>
                  <TabsTrigger
                    value="past"
                    className="rounded-xl px-8 py-2.5 text-sm font-semibold transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    Past Events
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="upcoming" className="mt-0">
                {upcomingEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} {...event} />
                    ))}
                  </div>
                ) : (
                  <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl border border-border/40 p-12 md:p-16 text-center shadow-lg">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-muted/50 mb-6">
                      <svg
                        className="w-10 h-10 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-3">
                      No Upcoming Events
                    </h3>
                    <p className="text-base text-muted-foreground max-w-md mx-auto">
                      No upcoming events at the moment. Check back soon for new
                      announcements!
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-0">
                {pastEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {pastEvents.sort((a, b) => {
                      const parseDate = (dateStr: string): Date => {
                        const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
                        const noComma = cleaned.replace(',', '');
                        const parts = noComma.split(' ');
                        if (parts.length === 3) {
                          return new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`);
                        }
                        return new Date(dateStr);
                      };
                      const dateA = parseDate(a.date);
                      const dateB = parseDate(b.date);
                      return dateB.getTime() - dateA.getTime();
                    }).map((event) => (
                      <EventCard key={event.id} {...event} />
                    ))}
                  </div>
                ) : (
                  <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl border border-border/40 p-12 md:p-16 text-center shadow-lg">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-muted/50 mb-6">
                      <svg
                        className="w-10 h-10 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-3">
                      No Past Events
                    </h3>
                    <p className="text-base text-muted-foreground max-w-md mx-auto">
                      No past events to display.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Event Info */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/20 to-muted/30" />

          <div className="container-custom max-w-5xl relative">
            <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 p-10 md:p-14 lg:p-16 text-center shadow-xl">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50 rounded-3xl" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">
                  Stay Updated
                </h2>

                {/* Divider */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                  <div className="w-2 h-2 rounded-full bg-primary/40" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
                </div>

                {/* Description */}
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Don&apos;t miss out on our upcoming events! Event details,
                    registration information, and updates are regularly posted here and
                    shared with our members.
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    For event-specific inquiries or to suggest event ideas, please
                    contact our Events Coordinator through our contact page.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact Events Coordinator
                  </a>
                </div>
              </div>

              {/* Bottom decorative element */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
          </div>
        </section>
      </main>

     <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: upcomingEvents
        .filter((e) => (e as any).startDateISO)
        .map((event, index) => ({
        "@type": "Event",
        position: index + 1,
        name: event.title,
        startDate: (event as any).startDateISO || undefined,
        endDate: (event as any).endDateISO || undefined,
        location: {
          "@type": "Place",
          name: event.location,
        },
        description: event.description,
        organizer: {
          "@type": "Organization",
          name: "Limbach Samaj",
        },
      })),
    }),
  }}
/>

    </>
  );
}
