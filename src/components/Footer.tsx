import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from '@/site-config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">{siteConfig.appName}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Representing Limbach families and community members across Canada, fostering cultural heritage and community connections.
            </p>
            <div className="flex space-x-4">
              {siteConfig.footeLinks.facebook.visible && <a href={siteConfig.footeLinks.facebook.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>}
              {siteConfig.footeLinks.twitter.visible && <a href={siteConfig.footeLinks.twitter.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>}
              {siteConfig.footeLinks.instagram.visible && <a href={siteConfig.footeLinks.instagram.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              {siteConfig.navLinks.events.visible && <li>
                <Link to="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>}
              {siteConfig.navLinks.membership.visible && <li>
                <Link to="/membership" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Membership
                </Link>
              </li>}
              {siteConfig.navLinks.gallery.visible && <li>
                <Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {siteConfig.navLinks.news.visible && <li>
                <Link to="/news" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  News & Updates
                </Link>
              </li>}
              {siteConfig.navLinks.donate.visible && <li>
                <Link to="/donate" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Donate
                </Link>
              </li>}
              {siteConfig.navLinks.contact.visible && <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{siteConfig.email}</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{siteConfig.phone}</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{siteConfig.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} {siteConfig.appName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
