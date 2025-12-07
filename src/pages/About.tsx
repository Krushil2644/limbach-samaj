import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import TeamCard from "@/components/TeamCard";
import teamData from "@/content/team.json";
import heroImage from "@/assets/hero-community.jpg";
import { aboutContent } from "@/content/about";


export default function About() {
  return (
    <>
      <SEOHead
        title="About Us"
        description="Limbach Samaj of Canada — About our mission, vision, values, and community initiatives."
        path="/about"
      />

      <main>
        {/* Hero Section */}
        <Hero
          image={heroImage}
          title="About Us"
          subtitle="Limbach Samaj of Canada is a community-driven, non-profit organization supporting individuals and families from the Hindu community of Gujarat who have made Canada their home."
        />

        {/* About / Who We Are */}
        <section className="section-spacing">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              {aboutContent.about.title}
            </h2>
            <div className="space-y-4">
              {aboutContent.about.paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="section-spacing bg-muted/30">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-10">
              {aboutContent.whatWeDo.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aboutContent.whatWeDo.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-card p-8 rounded-lg border border-border hover-lift"
                >
                  <h3 className="text-xl font-heading font-semibold mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-spacing">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">
                  {aboutContent.mission.title}
                </h2>
                {aboutContent.mission.paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-lg text-muted-foreground mb-4 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">
                  {aboutContent.vision.title}
                </h2>
                {aboutContent.vision.paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-lg text-muted-foreground mb-4 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background with subtle pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/20 to-muted/30" />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />

          <div className="container-custom relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                  What Drives Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Our Core Values
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The principles that guide our community and shape our actions every day
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {aboutContent.values.map((value, idx) => {
                const gradients = [
                  "from-primary/10 via-primary/5 to-transparent",
                  "from-secondary/10 via-secondary/5 to-transparent",
                  "from-accent/10 via-accent/5 to-transparent",
                  "from-primary/10 via-primary/5 to-transparent",
                  "from-secondary/10 via-secondary/5 to-transparent",
                ];

                return (
                  <div
                    key={idx}
                    className={`group relative bg-card/80 backdrop-blur-sm p-8 rounded-3xl border border-border/60 hover:border-border transition-all duration-500 hover:shadow-2xl hover:shadow-${value.colorClass.split('-')[1]}/5 hover:-translate-y-2`}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx]} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`} />

                    {/* Top accent line */}
                    <div className={`absolute top-0 left-8 right-8 h-1 ${value.colorClass.replace('text-', 'bg-')} rounded-b-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                    <div className="relative z-10">
                      {/* Number badge with glow effect */}
                      <div className="relative mb-6">
                        <div className={`absolute inset-0 ${value.colorClass.replace('text-', 'bg-')}/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-2xl ${value.colorClass.replace('text-', 'bg-')}/10 border border-${value.colorClass.split('-')[1]}/20 group-hover:border-${value.colorClass.split('-')[1]}/40 transition-all duration-500 group-hover:scale-110`}>
                          <span className={`text-2xl font-bold ${value.colorClass} transition-transform duration-500 group-hover:scale-110`}>
                            {idx + 1}
                          </span>
                        </div>
                      </div>

                      <h3 className={`text-2xl md:text-3xl font-heading font-bold mb-4 ${value.colorClass} transition-colors duration-300`}>
                        {value.title}
                      </h3>

                      <p className="text-base text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                        {value.description}
                      </p>
                    </div>

                    {/* Bottom right decorative element */}
                    <div className={`absolute bottom-4 right-4 w-20 h-20 ${value.colorClass.replace('text-', 'bg-')}/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
                );
              })}
            </div>

            {/* Bottom decorative line */}
            <div className="mt-20 flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            </div>
          </div>
        </section>

        {/* Committee */}
        {false &&
          <section className="section-spacing bg-muted/30">
            <div className="container-custom">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
                {aboutContent.committee.title}
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                {aboutContent.committee.subtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamData.map((member) => (
                  <TeamCard key={member.id} {...member} />
                ))}
              </div>
            </div>
          </section>
        }
      </main>
    </>
  );
}
