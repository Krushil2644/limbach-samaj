import { aboutContent } from "@/content/about";

/**
 * The motto, set as an inscription rather than a slogan.
 *
 * An earlier pass centred it as large display type on a full-bleed dark
 * band, which is marketing grammar — it announced the words instead of
 * holding them. This treats the panel the way a museum wall label treats an
 * artefact: the label on the left says what the thing is, the inscription
 * sits on the right at reading scale, and the translation is offered
 * quietly underneath. Nothing here is sized to persuade.
 */
export default function MottoBand() {
  const { sanskrit, devanagari, translation } = aboutContent.motto;

  return (
    <section
      aria-labelledby="motto-label"
      className="border-y border-border bg-muted/45"
    >
      <div className="container-custom">
        <div className="grid gap-6 py-14 md:grid-cols-12 md:gap-10 md:py-16">
          {/* Wall label */}
          <p
            id="motto-label"
            className="reveal-fade text-sm font-medium text-muted-foreground md:col-span-3"
          >
            The Samaj&rsquo;s motto
          </p>

          <div className="reveal-fade md:col-span-9">
            <figure>
              <blockquote>
                {/* The Devanagari is the artefact; everything else annotates it. */}
                <p
                  lang="sa"
                  className="font-heading text-[1.75rem] font-semibold leading-snug text-foreground md:text-[2.125rem]"
                >
                  {devanagari}
                </p>
                <p className="mt-2 font-heading text-lg font-medium text-primary-ink md:text-xl">
                  {sanskrit}
                </p>
              </blockquote>

              <figcaption className="measure mt-5 border-t border-border pt-5 text-base leading-relaxed text-muted-foreground">
                &ldquo;{translation}&rdquo;
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
