import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { siteConfig } from "@/site-config";
import { Check, Users, Calendar, Heart, Info } from "lucide-react";

export default function Membership() {
  const benefits = [
    "Access to all community events and cultural celebrations",
    "Networking opportunities with Limbach families across Canada",
    "Regular updates on community news and initiatives",
    "Opportunities to volunteer and contribute to the community",
    "Access to community resources and assistance programs",
  ];

  return (
    <>
      <SEOHead
        title="Membership"
        description="Join Limbach Samaj and become part of a vibrant community of Limbach families across Canada. Membership benefits include event access, networking, and community support."
        path="/membership"
      />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Membership
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Join our growing community and connect with Limbach families
              across Canada
            </p>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="section-spacing">
          <div className="container-custom">
            <Card className="max-w-3xl mx-auto border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                    <Info className="h-8 w-8" />
                  </div>
                </div>
                <h2 className="text-2xl font-heading font-bold text-center">
                  Online Membership Sign-Up Coming Soon
                </h2>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  We're currently developing an online membership registration
                  system to make joining Limbach Samaj easier than ever.
                </p>
                <p className="text-muted-foreground">
                  In the meantime, if you're interested in becoming a member,
                  please contact us directly through our contact page or reach
                  out to any committee member.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Membership Benefits */}
        <section className="section-spacing bg-muted/30">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
              Membership Benefits
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              As a member of Limbach Samaj, you'll enjoy numerous benefits and
              opportunities to connect with your community
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Join */}
        <section className="section-spacing">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
              Why Join Limbach Samaj?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">
                  Build Connections
                </h3>
                <p className="text-muted-foreground">
                  Connect with Limbach families from across Canada, build
                  lasting friendships, and expand your support network.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-4">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">
                  Cultural Engagement
                </h3>
                <p className="text-muted-foreground">
                  Participate in cultural celebrations, traditional events, and
                  activities that keep our heritage alive for future
                  generations.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">
                  Community Support
                </h3>
                <p className="text-muted-foreground">
                  Be part of a caring community that supports members during
                  important life events, celebrations, and times of need.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section-spacing bg-muted/30">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Questions About Membership?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're here to help! If you have questions about membership,
              benefits, or how to join, please don't hesitate to reach out to
              us.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
