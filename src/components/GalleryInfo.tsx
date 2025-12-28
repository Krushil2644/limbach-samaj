export function GalleryInfo() {
  return (
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
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">
              Share Your Photos
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
                Have photos from our community events that you&apos;d like to share?
                We&apos;d love to feature them in our gallery!
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Please contact us through our contact page to submit photos from
                Limbach Samaj events and celebrations.
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
                Contact Us
              </a>
            </div>
          </div>

          {/* Bottom decorative element */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}