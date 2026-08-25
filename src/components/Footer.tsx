import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { siteConfig } from "@/site-config";

type FooterLink = { name: string; href: string; visible: boolean };

function LinkColumn({ heading, links }: { heading: string; links: FooterLink[] }) {
  const visible = links.filter((link) => link.visible);
  if (visible.length === 0) return null;

  return (
    <div>
      <h3 className="font-heading text-sm font-bold text-foreground">{heading}</h3>
      <ul className="mt-4 space-y-3">
        {visible.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="link-underline text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const social = siteConfig.footeLinks;

  return (
    <footer className="border-t border-border bg-muted/35">
      <div className="container-custom py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Identity */}
          <div className="lg:col-span-4">
            <h2 className="font-heading text-lg font-bold text-foreground">
              {siteConfig.appName}
            </h2>
            <p className="measure-tight mt-3 text-sm leading-relaxed text-muted-foreground">
              Representing Limbach families and community members across
              Canada, fostering cultural heritage and community connections.
            </p>

            {siteConfig.showFooterSocialLinks && (
              <div className="mt-6 flex gap-2">
                {[
                  { key: "facebook", Icon: Facebook, config: social.facebook },
                  { key: "twitter", Icon: Twitter, config: social.twitter },
                  { key: "instagram", Icon: Instagram, config: social.instagram },
                ]
                  .filter(({ config }) => config.visible)
                  .map(({ key, Icon, config }) => (
                    <a
                      key={key}
                      href={config.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted-foreground press transition-colors duration-200 hover:border-foreground/25 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden />
                      <span className="sr-only">{key}</span>
                    </a>
                  ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <LinkColumn heading="Explore" links={siteConfig.footerQuickLinks} />
          </div>

          <div className="lg:col-span-2">
            <LinkColumn heading="Get involved" links={siteConfig.footerGetInvolved} />
          </div>

          {/* Contact — plain rows. The previous version nested each item in a
              card with an icon chip, which is heavier than the content. */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-bold text-foreground">
              Get in touch
            </h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="link-underline break-words font-medium text-foreground"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Location</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {siteConfig.location}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {siteConfig.appName}
          </p>
          <p className="text-sm text-muted-foreground">
            Registered Canadian not-for-profit
          </p>
        </div>
      </div>
    </footer>
  );
}
