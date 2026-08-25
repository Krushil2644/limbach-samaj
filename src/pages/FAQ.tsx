import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import { ArrowRight } from "lucide-react";
import { faqContent, faqGroups } from "@/content/faq";
import { siteConfig } from "@/site-config";

export default function FAQ() {
  // Presentation is grouped; the schema stays a flat list of all questions.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqContent.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions"
        description="Answers about Limbach Samaj of Canada events, ticket prices, registration, deadlines, sponsorship, and donations."
        path="/faq"
      />

      <main>
        <Hero
          title="Frequently asked questions"
          subtitle="Events, tickets, registration, and how to support the Samaj."
          compact
        />

        <section className="pb-20 pt-4 md:pb-28 md:pt-6">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Aside. Sticky on desktop so the way out stays reachable
                  while reading a long list. */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p
                    className="enter measure-tight text-lg leading-relaxed text-muted-foreground"
                    style={{ "--enter-delay": 0 } as React.CSSProperties}
                  >
                    Most questions about our gatherings are answered here. If
                    yours isn&rsquo;t, we&rsquo;re happy to help directly.
                  </p>

                  <div
                    className="enter mt-8 border-t border-border pt-7"
                    style={{ "--enter-delay": 1 } as React.CSSProperties}
                  >
                    <h2 className="font-heading text-base font-bold text-foreground">
                      Still have a question?
                    </h2>
                    <p className="measure-tight mt-2 text-base leading-relaxed text-muted-foreground">
                      Email us and someone from the Samaj will get back to you.
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="link-underline mt-4 inline-block break-words text-base font-semibold text-primary-ink"
                    >
                      {siteConfig.email}
                    </a>
                  </div>

                  <div
                    className="enter mt-8 border-t border-border pt-7"
                    style={{ "--enter-delay": 2 } as React.CSSProperties}
                  >
                    <h2 className="font-heading text-base font-bold text-foreground">
                      Ready to attend?
                    </h2>
                    <p className="measure-tight mt-2 text-base leading-relaxed text-muted-foreground">
                      Dates, venues and registration steps for every upcoming
                      gathering.
                    </p>
                    <Link
                      to="/events"
                      className="link-underline group mt-4 inline-flex items-center gap-2 text-base font-semibold text-primary-ink"
                    >
                      See upcoming events
                      <ArrowRight className="nudge h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Questions, grouped by topic. Hairline separators rather than
                  a card per question — ten identical rounded boxes with an
                  icon on each is template grammar, not hierarchy. */}
              <div className="lg:col-span-8">
                {faqGroups.map((group, groupIndex) => {
                  const items = faqContent.filter(
                    (item) => item.group === group,
                  );
                  if (items.length === 0) return null;

                  return (
                    <section
                      key={group}
                      className={groupIndex > 0 ? "mt-14" : ""}
                      aria-labelledby={`faq-${groupIndex}`}
                    >
                      <h2
                        id={`faq-${groupIndex}`}
                        // The first group is above the fold on most screens,
                        // where a scroll-linked reveal would never fire.
                        className={`font-heading text-sm font-bold uppercase tracking-wider text-primary-ink ${
                          groupIndex === 0 ? "enter" : "reveal"
                        }`}
                        style={
                          groupIndex === 0
                            ? ({ "--enter-delay": 1 } as React.CSSProperties)
                            : undefined
                        }
                      >
                        {group}
                      </h2>

                      <dl className="mt-5">
                        {items.map((item, index) => (
                          <div
                            key={item.question}
                            className={`border-t border-border py-7 first:border-t-0 first:pt-0 ${
                              groupIndex === 0 ? "enter" : "reveal"
                            }`}
                            style={
                              groupIndex === 0
                                ? ({
                                    "--enter-delay": 2 + index,
                                  } as React.CSSProperties)
                                : undefined
                            }
                          >
                            <dt className="font-heading text-lg font-bold text-foreground md:text-xl">
                              {item.question}
                            </dt>
                            <dd className="measure mt-2.5 text-base leading-relaxed text-muted-foreground md:text-lg">
                              {item.answer}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FAQPage structured data. dangerouslySetInnerHTML because React
          HTML-escapes <script> children, which produces invalid JSON-LD
          once the page is prerendered. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
