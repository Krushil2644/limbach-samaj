import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import { HelpCircle, Mail } from "lucide-react";
import { faqContent } from "@/content/faq";
import { siteConfig } from "@/site-config";

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqContent.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
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
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our events, registration, and how to get involved."
          compact
        />

        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto space-y-6">
              {faqContent.map((item) => (
                <article
                  key={item.question}
                  className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-8 shadow-md"
                >
                  <h2 className="text-lg md:text-xl font-heading font-bold text-foreground mb-3 flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span>{item.question}</span>
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed md:pl-8">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>

            {/* Still have questions */}
            <div className="max-w-3xl mx-auto mt-12">
              <div className="relative bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                <h2 className="text-xl md:text-2xl font-heading font-bold mb-3">
                  Still have a question?
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mb-6">
                  We&apos;re happy to help. Reach out and someone from the Samaj
                  will get back to you.
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Mail className="h-5 w-5" />
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FAQPage structured data. Uses dangerouslySetInnerHTML because React
          HTML-escapes <script> children, which produces invalid JSON-LD once
          the page is prerendered. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
