import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Users, Calendar, Award, Info } from "lucide-react";

export default function Donate() {
  const impactAreas = [
    {
      icon: Calendar,
      title: "Cultural Events",
      description:
        "Support our annual festivals, celebrations, and community gatherings that bring families together.",
    },
    {
      icon: Users,
      title: "Youth Programs",
      description:
        "Fund educational workshops, leadership programs, and activities for the next generation.",
    },
    {
      icon: Heart,
      title: "Community Support",
      description:
        "Help families in need during difficult times and support community assistance programs.",
    },
    {
      icon: Award,
      title: "Heritage Preservation",
      description:
        "Maintain our cultural traditions, documentation, and educational resources for future generations.",
    },
  ];

  return (
    <>
      <SEOHead
        title="Donate"
        description="Support Limbach Samaj's mission to serve our community across Canada. Your donations help fund cultural events, youth programs, and community support initiatives."
        path="/donate"
      />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Support Our Community
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Your generosity helps us serve Limbach families across Canada
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
                  Online Donation System Coming Soon
                </h2>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  We're currently setting up a secure online donation system to
                  make supporting our community easier and more convenient.
                </p>
                <p className="text-muted-foreground mb-6">
                  In the meantime, if you'd like to make a donation, please
                  contact us directly for alternative donation methods.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Tax Receipts</p>
                  <p className="text-sm text-muted-foreground">
                    As a registered Canadian not-for-profit organization, we can
                    provide receipts for donations. However, please note that
                    donations are not currently eligible for CRA tax exemption.
                    Tax exemption eligibility will be available in the
                    future—stay tuned for updates!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Impact Areas */}
        <section className="section-spacing bg-muted/30">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
              Your Impact
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Donations to Limbach Samaj support various programs and
              initiatives that benefit our community across Canada
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {impactAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                            <Icon className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-heading font-semibold mb-2">
                            {area.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {area.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Support */}
        <section className="section-spacing">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-8">
              Why Your Support Matters
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-4">
                Limbach Samaj relies on the generosity of community members and
                supporters to fulfill our mission of serving Limbach families
                across Canada. Your donations directly fund the programs,
                events, and services that strengthen our community.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                As a not-for-profit organization, we operate with transparency
                and accountability. Every dollar donated goes toward supporting
                our community initiatives, cultural preservation efforts, and
                member services.
              </p>
              <p className="text-lg text-muted-foreground">
                Whether you contribute financially, volunteer your time, or
                participate in our events, every form of support makes a
                meaningful difference in building and maintaining our vibrant
                community.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section-spacing bg-muted/30">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Questions About Donating?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              If you have questions about donations, tax receipts, or other ways
              to support our community, we're happy to help.
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
