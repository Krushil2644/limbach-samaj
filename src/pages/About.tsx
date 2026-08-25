import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import DirectorCard from "@/components/DirectorCard";
import { aboutContent } from "@/content/about";
import { siteConfig } from "@/site-config";

export default function About() {
  const { hero, motto, about, whatWeDo, mission, vision, values, directors } =
    aboutContent;

  return (
    <>
      <SEOHead
        title="About Us"
        description="Limbach Samaj of Canada — our mission, vision, values, board of directors, and community initiatives."
        path="/about"
      />

      <main>
        <Hero title={hero.title} subtitle={hero.subtitle} compact />

        {/* Who we are, with the motto as the principle behind it */}
        <section aria-labelledby="who" className="pb-16 pt-4 md:pb-20 md:pt-6">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2
                  id="who"
                  className="enter display-lg font-heading font-bold text-foreground"
                  style={{ "--enter-delay": 0 } as React.CSSProperties}
                >
                  {about.title}
                </h2>

                <div
                  className="enter mt-7 border-t border-border pt-6"
                  style={{ "--enter-delay": 1 } as React.CSSProperties}
                >
                  {/* Explicit line-height: leading-none clips the shirorekha. */}
                  <p
                    lang="sa"
                    className="font-heading text-2xl font-semibold leading-[1.45] text-foreground"
                  >
                    {motto.devanagari}
                  </p>
                  <p className="mt-1 font-heading text-base font-medium text-primary-ink">
                    {motto.sanskrit}
                  </p>
                  <p className="measure-tight mt-3 text-base leading-relaxed text-muted-foreground">
                    &ldquo;{motto.translation}&rdquo;
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 lg:pt-2">
                {about.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="enter measure mb-5 text-lg leading-relaxed text-muted-foreground last:mb-0"
                    style={{ "--enter-delay": 1 + index } as React.CSSProperties}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What we do */}
        <section
          aria-labelledby="what-we-do"
          className="border-t border-border py-16 md:py-20"
        >
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2
                  id="what-we-do"
                  className="reveal display-lg font-heading font-bold text-foreground"
                >
                  {whatWeDo.title}
                </h2>
              </div>

              <div className="lg:col-span-8 lg:pt-2">
                <dl>
                  {whatWeDo.items.map((item) => (
                    <div
                      key={item.title}
                      className="reveal border-t border-border py-7 first:border-t-0 first:pt-0"
                    >
                      <dt className="font-heading text-xl font-bold text-foreground md:text-2xl">
                        {item.title}
                      </dt>
                      <dd className="measure mt-2.5 text-base leading-relaxed text-muted-foreground md:text-lg">
                        {item.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and vision, side by side — they are a pair */}
        <section
          aria-label="Mission and vision"
          className="border-t border-border py-16 md:py-20"
        >
          <div className="container-custom">
            <div className="grid gap-10 md:grid-cols-2 md:gap-14">
              {[mission, vision].map((block) => (
                <div key={block.title} className="reveal">
                  <h2 className="display-md font-heading font-bold text-foreground">
                    {block.title}
                  </h2>
                  {block.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section
          aria-labelledby="values"
          className="border-t border-border py-16 md:py-20"
        >
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2
                  id="values"
                  className="reveal display-lg font-heading font-bold text-foreground"
                >
                  Our values
                </h2>
              </div>

              <div className="lg:col-span-8 lg:pt-2">
                <dl className="grid gap-x-10 sm:grid-cols-2">
                  {values.map((value) => (
                    <div
                      key={value.title}
                      className="reveal border-t border-border py-6"
                    >
                      <dt className="font-heading text-lg font-bold text-foreground">
                        {value.title}
                      </dt>
                      <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                        {value.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Board of directors — real people, with the incorporation on record */}
        <section
          aria-labelledby="directors"
          className="border-t border-border py-16 md:py-20"
        >
          <div className="container-custom">
            <h2
              id="directors"
              className="reveal display-lg font-heading font-bold text-foreground"
            >
              {directors.title}
            </h2>
            <p className="reveal measure mt-4 text-lg leading-relaxed text-muted-foreground">
              {directors.subtitle}
            </p>

            <dl className="reveal mt-7 flex flex-col gap-x-10 gap-y-3 border-t border-border pt-6 text-sm sm:flex-row">
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Incorporated</dt>
                <dd className="font-medium text-foreground">
                  {directors.incorporatedDate}
                </dd>
              </div>
              {siteConfig.corporationNumber && (
                <div className="flex gap-2">
                  <dt className="text-muted-foreground">
                    Ontario Corporation No.
                  </dt>
                  <dd className="font-medium tabular-nums text-foreground">
                    {siteConfig.corporationNumber}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6 lg:gap-x-5">
              {directors.members.map((member) => (
                <DirectorCard key={member.name} {...member} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
