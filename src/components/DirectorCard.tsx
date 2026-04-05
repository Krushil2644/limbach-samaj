interface DirectorCardProps {
  name: string;
  initials: string;
  location: string;
  phone: string;
  colorIndex: number;
  image?: string;
}

const colorSchemes = [
  {
    avatar: "bg-primary/15 text-primary",
    ring: "ring-primary/25",
    badge: "bg-primary/10 text-primary border-primary/20",
    accent: "bg-primary",
    hoverBorder: "group-hover:border-primary/40",
    glowBg: "bg-primary/8",
    gradient: "from-primary/8 via-primary/4 to-transparent",
    topLine: "from-primary via-primary/60 to-transparent",
    dot: "bg-primary/60",
  },
  {
    avatar: "bg-secondary/15 text-secondary",
    ring: "ring-secondary/25",
    badge: "bg-secondary/10 text-secondary border-secondary/20",
    accent: "bg-secondary",
    hoverBorder: "group-hover:border-secondary/40",
    glowBg: "bg-secondary/8",
    gradient: "from-secondary/8 via-secondary/4 to-transparent",
    topLine: "from-secondary via-secondary/60 to-transparent",
    dot: "bg-secondary/60",
  },
  {
    avatar: "bg-accent/15 text-accent",
    ring: "ring-accent/25",
    badge: "bg-accent/10 text-accent border-accent/20",
    accent: "bg-accent",
    hoverBorder: "group-hover:border-accent/40",
    glowBg: "bg-accent/8",
    gradient: "from-accent/8 via-accent/4 to-transparent",
    topLine: "from-accent via-accent/60 to-transparent",
    dot: "bg-accent/60",
  },
];

export default function DirectorCard({ name, initials, location, phone, colorIndex, image }: DirectorCardProps) {
  const scheme = colorSchemes[colorIndex % colorSchemes.length];

  return (
    <div
      className={`group relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/60 ${scheme.hoverBorder} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden`}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${scheme.topLine} rounded-t-3xl`} />

      {/* Hover gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${scheme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

      {/* Bottom-right glow blob */}
      <div className={`absolute -bottom-6 -right-6 w-28 h-28 ${scheme.glowBg} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10 p-8 flex flex-col items-center text-center">
        {/* Avatar ring + circle */}
        <div className={`relative mb-6 rounded-full ring-2 ${scheme.ring} ring-offset-2 ring-offset-card transition-all duration-300 group-hover:ring-4`}>
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-20 h-20 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className={`w-20 h-20 rounded-full ${scheme.avatar} flex items-center justify-center`}>
              <span className="text-2xl font-heading font-bold tracking-wide">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Founding Director badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border mb-4 ${scheme.badge}`}>
          Founding Director
        </span>

        {/* Name */}
        <h3 className="text-lg font-heading font-bold text-foreground leading-snug mb-3 group-hover:text-foreground transition-colors duration-300">
          {name}
        </h3>

        {/* Divider */}
        <div className="flex items-center gap-2 w-full mb-3 justify-center">
          <div className={`h-px w-8 ${scheme.dot} rounded-full opacity-50`} />
          <div className={`w-1.5 h-1.5 rounded-full ${scheme.dot}`} />
          <div className={`h-px w-8 ${scheme.dot} rounded-full opacity-50`} />
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300 mb-2">
          <svg
            className="w-3.5 h-3.5 shrink-0 opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{location}</span>
        </div>

        {/* Phone */}
        <a
          href={`tel:${phone.replace(/-/g, "")}`}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <svg
            className="w-3.5 h-3.5 shrink-0 opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>{phone}</span>
        </a>
      </div>
    </div>
  );
}
