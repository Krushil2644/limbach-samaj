import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  image?: string;
  title: string;
  subtitle: string;
  compact?: boolean;
  primaryButton?: {
    text: string;
    link: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
}

export default function Hero({
  image,
  title,
  subtitle,
  compact = false,
  primaryButton,
  secondaryButton,
}: HeroProps) {
  // Compact version for inner pages - no image, minimal design
  if (compact) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-muted/10 to-background py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-foreground">
              {title}
            </h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
            </div>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Full version for home page with image
  return (
    <section className="relative overflow-hidden">
      {/* Full-width Hero Image */}
      {image && (
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* More subtle gradient at bottom for visual flow */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/40 to-transparent" />
        </div>
      )}

      {/* Text Content Below Image - Premium Design */}
      <div className="relative -mt-16 pb-20">
        <div className="container-custom">
          <div className="relative max-w-5xl mx-auto">
            {/* Main content card with enhanced design */}
            <div className="relative bg-card/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/5 to-secondary/5" />

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />

              {/* Content */}
              <div className="relative z-10 px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
                <div className="text-center">
                  {/* Title with refined typography */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-5 text-foreground leading-tight tracking-tight">
                    {title}
                  </h1>

                  {/* Decorative divider */}
                  <div className="flex items-center justify-center gap-3 mb-5">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
                    <div className="w-2 h-2 rounded-full bg-primary/40" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
                  </div>

                  {/* Subtitle with balanced typography */}
                  <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
                    {subtitle}
                  </p>

                  {/* Buttons with premium styling */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {primaryButton && (
                      <Button
                        asChild
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group px-8"
                      >
                        <Link to={primaryButton.link} className="flex items-center">
                          {primaryButton.text}
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    )}

                    {secondaryButton && (
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 px-8"
                      >
                        <Link to={secondaryButton.link}>{secondaryButton.text}</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom decorative accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>

            {/* Subtle shadow element below card */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-primary/5 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
