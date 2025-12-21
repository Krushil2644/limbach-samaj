import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from '@/site-config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-background via-muted/20 to-muted/30 border-t border-border/50 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container-custom relative z-10 py-12 md:py-14">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-10">
          {/* About Section */}
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-heading font-bold mb-2.5 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {siteConfig.appName}
              </h3>
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/40 rounded-full mb-3" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Representing Limbach families and community members across Canada, fostering cultural heritage and community connections.
              </p>
            </div>

            {/* Social Links with enhanced styling */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                Connect With Us
              </p>
              <div className="flex gap-3">
                {siteConfig.footeLinks.facebook.visible && (
                  <a
                    href={siteConfig.footeLinks.facebook.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center h-10 w-10 rounded-xl bg-card/80 backdrop-blur-sm border border-border/60 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                  >
                    <Facebook className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="sr-only">Facebook</span>
                  </a>
                )}
                {siteConfig.footeLinks.twitter.visible && (
                  <a
                    href={siteConfig.footeLinks.twitter.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center h-10 w-10 rounded-xl bg-card/80 backdrop-blur-sm border border-border/60 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                  >
                    <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="sr-only">Twitter</span>
                  </a>
                )}
                {siteConfig.footeLinks.instagram.visible && (
                  <a
                    href={siteConfig.footeLinks.instagram.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center h-10 w-10 rounded-xl bg-card/80 backdrop-blur-sm border border-border/60 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                  >
                    <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="sr-only">Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-heading font-bold mb-1 text-foreground">Quick Links</h3>
            <div className="h-0.5 w-8 bg-primary/60 rounded-full mb-4" />
            <ul className="space-y-2.5">
              {siteConfig.footerQuickLinks
                .filter((link) => link.visible)
                .map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="group inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                    >
                      <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3 mr-0 group-hover:mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-base font-heading font-bold mb-1 text-foreground">Get Involved</h3>
            <div className="h-0.5 w-8 bg-primary/60 rounded-full mb-4" />
            <ul className="space-y-2.5">
              {siteConfig.footerGetInvolved
                .filter((link) => link.visible)
                .map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="group inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                    >
                      <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3 mr-0 group-hover:mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact Section with enhanced cards */}
          <div>
            <h3 className="text-base font-heading font-bold mb-1 text-foreground">Get In Touch</h3>
            <div className="h-0.5 w-8 bg-primary/60 rounded-full mb-4" />
            <ul className="space-y-2.5">
              <li className="group relative bg-card/40 backdrop-blur-sm rounded-xl border border-border/40 p-3 hover:border-primary/20 hover:bg-card/60 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-muted-foreground mb-0.5">Email</p>
                    <p className="text-sm text-foreground break-words">{siteConfig.email}</p>
                  </div>
                </div>
              </li>

              <li className="group relative bg-card/40 backdrop-blur-sm rounded-xl border border-border/40 p-3 hover:border-secondary/20 hover:bg-card/60 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-muted-foreground mb-0.5">Phone</p>
                    <p className="text-sm text-foreground">{siteConfig.phone}</p>
                  </div>
                </div>
              </li>

              <li className="group relative bg-card/40 backdrop-blur-sm rounded-xl border border-border/40 p-3 hover:border-accent/20 hover:bg-card/60 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-4 w-4 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-muted-foreground mb-0.5">Location</p>
                    <p className="text-sm text-foreground">{siteConfig.location}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with decorative elements */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center">
            <div className="flex items-center gap-3 bg-background px-4">
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="w-2 h-2 rounded-full bg-primary/60" />
              <div className="w-2 h-2 rounded-full bg-primary/40" />
            </div>
          </div>
        </div>

        {/* Copyright Section - Enhanced */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {siteConfig.appName}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/70">
            Connecting communities, celebrating heritage.
          </p>
        </div>
      </div>
    </footer>
  );
}
