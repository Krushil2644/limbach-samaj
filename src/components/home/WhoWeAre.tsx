import { homeContent } from "@/content/home";
import { aboutContent } from "@/content/about";

/**
 * The motto set as the principle, with the work that follows from it
 * alongside.
 *
 * Two earlier passes gave the motto a band of its own: centred display type
 * read as a slogan, a wall label read as a catalogue entry. Both failed for
 * the same reason — a motto asserted on its own is just a claim. Here it
 * leads, and "We gather / We welcome / We look after each other" sit beside
 * it as the evidence, so the words are grounded by what they produce.
 *
 * This also replaces the previous three identical icon cards.
 */
export default function WhoWeAre() {
  const { description, doings } = homeContent.welcome;
  const { motto } = aboutContent;

  return (
    <section
      aria-labelledby="motto-heading"
      className="pt-16 pb-10 md:pt-24 md:pb-12 lg:pt-28 lg:pb-14"
    >
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            {/* Devanagari first — it is the original, not a translation.
                Explicit line-height: `leading-none` clips the shirorekha. */}
            <p
              lang="sa"
              className="reveal font-heading text-3xl font-semibold leading-[1.45] text-foreground md:text-[2.125rem]"
            >
              {motto.devanagari}
            </p>

            <h2
              id="motto-heading"
              className="reveal mt-2 font-heading text-xl font-bold text-primary-ink md:text-2xl"
            >
              {motto.sanskrit}
            </h2>

            <p className="reveal measure mt-4 text-lg leading-relaxed text-foreground">
              &ldquo;{motto.translation}&rdquo;
            </p>

            <p className="reveal measure mt-7 border-t border-border pt-6 text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="lg:col-span-7 lg:pt-2">
            <dl>
              {doings.map((item) => (
                <div
                  key={item.title}
                  className="reveal border-t border-border py-7 first:border-t-0 first:pt-0 md:grid md:grid-cols-12 md:gap-8"
                >
                  <dt className="font-heading text-xl font-bold text-foreground md:col-span-4">
                    {item.title}
                  </dt>
                  <dd className="mt-2 text-base leading-relaxed text-muted-foreground md:col-span-8 md:mt-0 md:text-lg">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
