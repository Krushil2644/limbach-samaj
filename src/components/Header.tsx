import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";
import { siteConfig } from '@/site-config';

const navigation = siteConfig.navLinks;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container-custom flex h-16 items-center justify-between" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="group flex items-center gap-3 transition-all duration-300">
            {/* Logo with enhanced styling */}
            <div className="relative">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-center justify-center h-11 w-11 rounded-full border-2 border-primary/30 bg-card/80 backdrop-blur-sm shadow-lg group-hover:border-primary/50 group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden">
                <img
                  src={logo}
                  alt="Limbach Samaj logo"
                  className="h-8 w-8 object-cover rounded-full"
                />
              </div>
            </div>

            {/* Brand name with gradient */}
            <div className="hidden sm:flex flex-col">
              <span className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary transition-all duration-300">
                {siteConfig.appName}
              </span>
              <span className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase">
                Community
              </span>
            </div>
          </Link>
        </div>

        <div className="flex lg:hidden gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            className="ml-2 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
          {Object.values(navigation)
            .filter(item => item.visible)
            .sort((a, b) => a.ordinal - b.ordinal)
            .map(item => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {Object.values(navigation)
              .filter(item => item.visible)
              .sort((a, b) => a.ordinal - b.ordinal)
              .map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}
