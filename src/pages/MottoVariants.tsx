import { MapPin } from "lucide-react";
import { aboutContent } from "@/content/about";
import { homeContent } from "@/content/home";
import SEOHead from "@/components/SEOHead";

/**
 * TEMPORARY comparison page for choosing a motto treatment.
 * Delete this file, its route, and the unused variants once one is picked.
 */

const { sanskrit, devanagari, translation } = aboutContent.motto;

/* ── A ── A mark under the name, inside the hero ─────────────────────── */
function VariantA() {
  return (
    <div className="container-custom py-14">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="flex items-center gap-2 text-sm font-medium text-primary-ink">
            <MapPin className="h-4 w-4 text-primary" aria-hidden />
            Brampton, Ontario
          </p>

          <h1 className="display-xl mt-5 font-heading font-bold text-foreground">
            Limbach Samaj of Canada
          </h1>

          {/* The motto as part of the identity block */}
          <div className="mt-6 border-t border-border/80 pt-5">
            <p lang="sa" className="font-heading text-xl font-semibold text-foreground">
              {devanagari}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-medium text-primary-ink">{sanskrit}</span>
              <span className="mx-2 text-border">·</span>
              in service, always
            </p>
          </div>

          <p className="measure mt-7 text-lg leading-relaxed text-muted-foreground">
            {homeContent.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex min-h-[3rem] items-center rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground">
              Upcoming gatherings
            </span>
            <span className="inline-flex min-h-[3rem] items-center rounded-xl border border-border px-6 text-base font-semibold">
              About the Samaj
            </span>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="aspect-[3/2] w-full rounded-2xl border border-border/60 bg-muted" />
        </div>
      </div>
    </div>
  );
}

/* ── B ── Inscribed, architectural ───────────────────────────────────── */
function VariantB() {
  return (
    <section className="relative overflow-hidden bg-[hsl(20_26%_12%)] py-24">
      <div className="container-custom relative text-center">
        {/* Large, low-contrast: surface rather than message. */}
        <p
          lang="sa"
          aria-hidden
          className="font-heading font-bold leading-[1.35] text-[hsl(35_65%_86%)]/[0.22] [font-size:clamp(2.5rem,8vw,6rem)]"
        >
          {devanagari}
        </p>

        <div className="mt-8">
          <p className="font-heading text-2xl font-semibold text-[hsl(40_20%_96%)] md:text-3xl">
            {sanskrit}
          </p>
          <p className="measure mx-auto mt-3 text-base text-[hsl(40_14%_74%)] md:text-lg">
            {translation}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── C ── The principle the work follows ─────────────────────────────── */
function VariantC() {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p lang="sa" className="font-heading text-3xl font-semibold leading-snug text-foreground">
              {devanagari}
            </p>
            <p className="mt-2 font-heading text-lg font-medium text-primary-ink">
              {sanskrit}
            </p>
            <p className="measure mt-4 text-base leading-relaxed text-muted-foreground">
              &ldquo;{translation}&rdquo;
            </p>
          </div>

          <div className="lg:col-span-7 lg:pt-1">
            <dl>
              {homeContent.welcome.doings.map((item) => (
                <div
                  key={item.title}
                  className="border-t border-border py-7 first:border-t-0 first:pt-0 md:grid md:grid-cols-12 md:gap-8"
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

/* ── D ── A seal at the foot of every page ───────────────────────────── */
function VariantD() {
  return (
    <footer className="bg-[hsl(20_26%_12%)] text-[hsl(40_18%_88%)]">
      <div className="container-custom py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-heading text-lg font-bold text-[hsl(12_80%_62%)]">
              Limbach Samaj of Canada
            </p>
            <p className="mt-3 text-sm text-[hsl(40_12%_66%)]">
              Representing Limbach families and community members across Canada.
            </p>
          </div>
          {["Quick Links", "Get Involved", "Get in Touch"].map((heading) => (
            <div key={heading}>
              <p className="font-heading text-sm font-bold">{heading}</p>
              <p className="mt-3 text-sm text-[hsl(40_12%_60%)]">…</p>
            </div>
          ))}
        </div>

        {/* The seal */}
        <div className="mt-12 border-t border-white/10 pt-10 text-center">
          <p lang="sa" className="font-heading text-2xl font-semibold text-[hsl(35_85%_72%)]">
            {devanagari}
          </p>
          <p className="mt-1.5 font-heading text-sm font-medium tracking-wide text-[hsl(40_16%_78%)]">
            {sanskrit}
          </p>
          <p className="mt-6 text-xs text-[hsl(40_10%_55%)]">
            © 2026 Limbach Samaj of Canada. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const VARIANTS = [
  { key: "A", label: "A · A mark under the name (in the hero)", node: <VariantA /> },
  { key: "B", label: "B · Inscribed, architectural", node: <VariantB /> },
  { key: "C", label: "C · The principle the work follows", node: <VariantC /> },
  { key: "D", label: "D · A seal in the footer", node: <VariantD /> },
];

export default function MottoVariants() {
  return (
    <>
      <SEOHead title="Motto variants" description="Internal comparison." path="/motto-variants" noindex />
      <main className="py-10">
        {VARIANTS.map((variant) => (
          <section key={variant.key} className="mb-4">
            <div className="container-custom">
              <p
                id={`variant-${variant.key}`}
                className="mb-4 font-heading text-sm font-bold uppercase tracking-widest text-primary-ink"
              >
                {variant.label}
              </p>
            </div>
            <div className="border-y-2 border-dashed border-primary/30">{variant.node}</div>
          </section>
        ))}
      </main>
    </>
  );
}
