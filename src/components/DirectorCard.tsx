import { MapPin, Phone } from "lucide-react";

interface DirectorCardProps {
  name: string;
  initials: string;
  location: string;
  phone: string;
  image?: string;
}

/**
 * A director, presented plainly.
 *
 * The previous version wrapped each person in a 32px-radius card with a
 * gradient overlay, a blurred glow, a coloured border that changed on
 * hover, and a scale transform — decoration heavier than the person it
 * framed. The photograph is the content here.
 */
export default function DirectorCard({
  name,
  initials,
  location,
  phone,
  image,
}: DirectorCardProps) {
  return (
    <div className="reveal group">
      <div className="aspect-[4/5] overflow-hidden rounded-xl border border-border bg-muted">
        {image ? (
          <img
            src={image}
            alt={`${name}, founding director of Limbach Samaj of Canada`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform [transition-duration:600ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span
              aria-hidden
              className="font-heading text-3xl font-bold text-muted-foreground"
            >
              {initials}
            </span>
          </div>
        )}
      </div>

      <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
        {name}
      </h3>

      <p className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        {location}
      </p>

      <p className="mt-1 flex items-center gap-2 text-sm">
        <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        <a
          href={`tel:${phone.replace(/-/g, "")}`}
          className="link-underline text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          {phone}
        </a>
      </p>
    </div>
  );
}
