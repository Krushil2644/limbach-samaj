import SEOHead from "@/components/SEOHead";
import TeamCard from "@/components/TeamCard";
import teamData from "@/content/team.json";
import aboutImage from "@/assets/about-unity.jpg";
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
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={aboutImage}
              alt="Community unity"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 hero-overlay" />
          </div>

          <div className="relative z-10 container-custom text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
              {aboutContent.hero.title}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              {aboutContent.hero.subtitle}
            </p>
          </div>
        </section>

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
        <section className="section-spacing bg-muted/30">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {aboutContent.values.map((value, idx) => (
                <div
                  key={idx}
                  className="bg-card p-8 rounded-lg border border-border hover-lift"
                >
                  <h3
                    className={`text-xl font-heading font-semibold mb-4 ${value.colorClass}`}
                  >
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Committee */}
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
      </main>
    </>
  );
}
