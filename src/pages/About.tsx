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
        <section className="relative section-spacing overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />

          <div className="container-custom max-w-5xl relative z-10">
            <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl border border-border/40 p-8 md:p-12 lg:p-16 shadow-lg">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/20 rounded-br-3xl" />

              {/* Content */}
              <div className="relative">
                {/* Section badge */}
                <div className="inline-block mb-6">
                  <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                    Our Story
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-8 text-foreground">
                  {aboutContent.about.title}
                </h2>

                {/* Decorative divider */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-1 w-16 bg-gradient-to-r from-primary to-primary/40 rounded-full" />
                  <div className="w-2 h-2 rounded-full bg-primary/60" />
                  <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
                </div>

                {/* Paragraphs with enhanced styling */}
                <div className="space-y-6">
                  {aboutContent.about.paragraphs.map((para, idx) => (
                    <div key={idx} className="relative pl-6">
                      {/* Side accent line */}
                      <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent rounded-full" />

                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {para}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom decorative element */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background with pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/20 to-muted/30" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />

          <div className="container-custom relative z-10">
            {/* Section header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold tracking-wide uppercase">
                  Our Impact
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                {aboutContent.whatWeDo.title}
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                <div className="w-2 h-2 rounded-full bg-secondary/60" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {aboutContent.whatWeDo.items.map((item, idx) => {
                const colorSchemes = [
                  {
                    badge: "bg-primary/10 text-primary border-primary/20",
                    accent: "bg-primary/40",
                    hover: "group-hover:border-primary/30",
                    glow: "group-hover:shadow-primary/10",
                  },
                  {
                    badge: "bg-secondary/10 text-secondary border-secondary/20",
                    accent: "bg-secondary/40",
                    hover: "group-hover:border-secondary/30",
                    glow: "group-hover:shadow-secondary/10",
                  },
                  {
                    badge: "bg-accent/10 text-accent border-accent/20",
                    accent: "bg-accent/40",
                    hover: "group-hover:border-accent/30",
                    glow: "group-hover:shadow-accent/10",
                  },
                ];

                const scheme = colorSchemes[idx];

                return (
                  <div
                    key={idx}
                    className={`group relative bg-card/80 backdrop-blur-sm p-8 rounded-3xl border border-border/60 ${scheme.hover} transition-all duration-500 hover:shadow-2xl ${scheme.glow} hover:-translate-y-2`}
                  >
                    {/* Top decorative line */}
                    <div className={`absolute top-0 left-8 right-8 h-1 ${scheme.accent} rounded-b-full transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500`} />

                    {/* Number badge */}
                    <div className="mb-6">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${scheme.badge} border font-bold text-lg transition-all duration-300 group-hover:scale-110`}>
                        {idx + 1}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 text-foreground transition-colors duration-300 group-hover:text-foreground">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                      {item.description}
                    </p>

                    {/* Bottom right decorative element */}
                    <div className={`absolute bottom-6 right-6 w-16 h-16 ${scheme.accent} opacity-5 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

          <div className="container-custom relative z-10">
            {/* Section header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold tracking-wide uppercase">
                  Our Direction
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                Mission & Vision
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Guiding principles that drive our community forward
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Mission Card */}
              <div className="group relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/60 p-8 md:p-10 lg:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary/60 to-transparent rounded-t-3xl" />

                <div className="relative z-10">
                  {/* Icon badge */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 transition-transform duration-300 group-hover:scale-110">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-foreground">
                    {aboutContent.mission.title}
                  </h2>

                  {/* Divider */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-1 w-12 bg-primary/40 rounded-full" />
                    <div className="h-px flex-1 bg-border/40" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    {aboutContent.mission.paragraphs.map((para, idx) => (
                      <p
                        key={idx}
                        className="text-base md:text-lg text-muted-foreground leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Bottom decorative element */}
                <div className="absolute bottom-6 right-6 w-20 h-20 bg-primary/5 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Vision Card */}
              <div className="group relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/60 p-8 md:p-10 lg:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-secondary/3 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary via-secondary/60 to-transparent rounded-t-3xl" />

                <div className="relative z-10">
                  {/* Icon badge */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 mb-6 transition-transform duration-300 group-hover:scale-110">
                    <svg
                      className="w-8 h-8 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-foreground">
                    {aboutContent.vision.title}
                  </h2>

                  {/* Divider */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-1 w-12 bg-secondary/40 rounded-full" />
                    <div className="h-px flex-1 bg-border/40" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    {aboutContent.vision.paragraphs.map((para, idx) => (
                      <p
                        key={idx}
                        className="text-base md:text-lg text-muted-foreground leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Bottom decorative element */}
                <div className="absolute bottom-6 right-6 w-20 h-20 bg-secondary/5 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
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
