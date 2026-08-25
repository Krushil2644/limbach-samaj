import { homeContent } from "@/content/home";

/**
 * Replaces the previous three identical icon cards.
 *
 * The old version asserted "Strong Community / Regular Events / Community
 * Support" in matching rounded boxes — the template grammar the brand should
 * avoid. This states the same three things as prose, separated by hairlines,
 * and lets typography carry the hierarchy.
 */
export default function WhoWeAre() {
  const { title, description, doings } = homeContent.welcome;

  return (
    <section className="pt-16 pb-10 md:pt-24 md:pb-12 lg:pt-28 lg:pb-14">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="reveal display-lg font-heading font-bold text-foreground">
              {title}
            </h2>
            <p className="reveal measure mt-6 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="lg:col-span-7 lg:pt-2">
            <dl>
              {doings.map((item, index) => (
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
