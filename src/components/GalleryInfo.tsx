import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * The previous version wrapped this one sentence in a 24px-radius card with
 * a gradient overlay, a 80px icon tile, a dot-and-rule divider and a
 * decorative bottom line — an enormous amount of chrome around an invitation
 * to send in photographs.
 */
export function GalleryInfo() {
  return (
    <section className="border-t border-border py-16 md:py-20">
      <div className="container-custom">
        <div className="reveal grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <h2 className="display-md font-heading font-bold text-foreground">
              Have photos to share?
            </h2>
          </div>

          <div className="md:col-span-8 md:pt-1">
            <p className="measure text-lg leading-relaxed text-muted-foreground">
              If you took pictures at one of our gatherings, we would like to
              add them to the archive. Send them over and they will appear in
              the album for that event.
            </p>
            <Link
              to="/contact"
              className="link-underline group mt-5 inline-flex items-center gap-2 text-base font-semibold text-primary-ink"
            >
              Get in touch
              <ArrowRight className="nudge h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
