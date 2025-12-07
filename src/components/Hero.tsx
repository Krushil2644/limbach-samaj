import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  image: string;
  title: string;
  subtitle: string;
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
  primaryButton,
  secondaryButton,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Full-width Hero Image */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* More subtle gradient at bottom for visual flow */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/40 to-transparent" />
      </div>

      {/* Text Content Below Image - Less aggressive overlap */}
      <div className="relative -mt-12 pb-16">
        <div className="w-full bg-background/95 backdrop-blur-sm shadow-sm">
          <div className="container-custom py-12 md:py-16 lg:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-6 text-foreground">
                {title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 text-muted-foreground leading-relaxed">
                {subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {primaryButton && (
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground group"
                  >
                    <Link to={primaryButton.link}>
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
                    className="hover-lift"
                  >
                    <Link to={secondaryButton.link}>{secondaryButton.text}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
