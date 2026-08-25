import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";
import { siteConfig } from "@/site-config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export type NavItemChildrens =
  | "Membership"
  | "Sponsorship"
  | "Donations"
  | "Volunteer";

export type NavItem =
  (typeof siteConfig.navLinks)[keyof typeof siteConfig.navLinks] & {
    children?: { name: NavItemChildrens; href: string; visible: boolean }[];
  };

const navigation = siteConfig.navLinks as Record<string, NavItem>;

function visibleItems() {
  return Object.values(navigation)
    .filter((item) => {
      if (!item.visible) return false;
      if (item.children?.length) {
        return item.children.some((child) => child.visible);
      }
      return true;
    })
    .sort((a, b) => a.ordinal - b.ordinal);
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const items = visibleItems();

  // Close on navigation — the old menu stayed open behind the new page.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Escape closes; body scroll is locked while the panel is open.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-[var(--z-header)] w-full border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <nav
        className="container-custom flex h-[4.25rem] items-center justify-between gap-4"
        aria-label="Main"
      >
        {/* Wordmark. Solid colour — the previous gradient-clipped text was
            decorative and hurt legibility at small sizes. */}
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <img
            src={logo}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-border transition-[box-shadow] duration-200 [transition-timing-function:var(--ease-out)] group-hover:ring-primary/45"
          />
          <span className="hidden truncate font-heading text-[1.0625rem] font-bold leading-tight text-foreground sm:block lg:text-lg">
            {siteConfig.shortName}
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {items.map((item) =>
            item.children?.length ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="inline-flex h-10 items-center gap-1 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-muted data-[state=open]:text-foreground">
                  {item.name}
                  <ChevronDown
                    className="h-4 w-4 transition-transform duration-300 [[data-state=open]>&]:rotate-180"
                    aria-hidden
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-44">
                  {item.children
                    .filter((child) => child.visible)
                    .map((child) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link to={child.href}>{child.name}</Link>
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  // The active page is marked by an underline as well as
                  // colour — colour alone is not an accessible signal.
                  "relative inline-flex h-10 items-center rounded-lg px-3 text-sm font-medium transition-colors duration-200 after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-primary after:transition-transform after:duration-200 after:[transition-timing-function:var(--ease-out)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive(item.href)
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground after:scale-x-0 hover:after:scale-x-100",
                )}
              >
                {item.name}
              </Link>
            ),
          )}

          <div className="ml-2 border-l border-border pl-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground press transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="sr-only">
              {mobileMenuOpen ? "Close menu" : "Open menu"}
            </span>
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background lg:hidden"
        >
          <div className="container-custom py-3">
            {items.map((item, index) => (
              <div
                key={item.name}
                className="enter-quick"
                style={{ "--enter-delay": index } as React.CSSProperties}
              >
                <Link
                  to={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-[3rem] items-center rounded-lg px-3 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.name}
                </Link>

                {item.children
                  ?.filter((child) => child.visible)
                  .map((child) => (
                    <Link
                      key={child.name}
                      to={child.href}
                      className="flex min-h-[2.75rem] items-center rounded-lg pl-7 pr-3 text-[0.9375rem] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {child.name}
                    </Link>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
