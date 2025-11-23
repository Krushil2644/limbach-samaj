import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import EventCard from "@/components/EventCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import eventsData from "@/content/events.json";
import bgHero from "@/assets/hero-community.jpg";

export default function Events() {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const upcomingEvents = eventsData.filter(event => event.upcoming);
  const pastEvents = eventsData.filter(event => !event.upcoming);

  return (
    <>
      <SEOHead
        title="Events"
        description="Discover upcoming community events and cultural celebrations hosted by Limbach Samaaj across Canada. Join us for memorable gatherings and activities."
        path="/events"
      />

      <main>
        {/* Hero Section */}
<section className="relative h-[400px] md:h-[480px] flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0">
    <img
      src={bgHero}
      alt="Hero Background"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-black/60" />
  </div>

  <div className="relative z-10 text-center text-white px-4">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold">
      PAGE TITLE HERE
    </h1>
    <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto opacity-90">
      Your subtitle or short description here
    </p>
  </div>
</section>
{/* Events Tabs */}
        <section className="section-spacing">
          {/* Brief Intro Content */}
<section className="py-8">
  <div className="container-custom max-w-3xl text-center">
    <p className="text-lg text-muted-foreground leading-relaxed">
      Limbach Samaj of Canada organizes meaningful cultural, spiritual, and social events
      throughout the year to strengthen our community bonds. From religious ceremonies to
      family gatherings and festive celebrations, our events create opportunities for
      connection, tradition, and shared joy.
    </p>
  </div>
</section>

          <div className="container-custom">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-0">
                {upcomingEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} {...event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      No upcoming events at the moment. Check back soon for new announcements!
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-0">
                {pastEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} {...event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      No past events to display.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Event Info */}
        <section className="section-spacing bg-muted/30">
          <div className="container-custom max-w-4xl text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Don't miss out on our upcoming events! Event details, registration information, and updates 
              are regularly posted here and shared with our members.
            </p>
            <p className="text-muted-foreground">
              For event-specific inquiries or to suggest event ideas, please contact our Events Coordinator 
              through our contact page.
            </p>
          </div>
        </section>
      </main>

      {/* Structured Data for Events */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": upcomingEvents.map((event, index) => ({
            "@type": "Event",
            "position": index + 1,
            "name": event.title,
            "startDate": event.date,
            "location": {
              "@type": "Place",
              "name": event.location
            },
            "description": event.description,
            "organizer": {
              "@type": "Organization",
              "name": "Limbach Samaaj"
            }
          }))
        })}
      </script>
    </>
  );
}
