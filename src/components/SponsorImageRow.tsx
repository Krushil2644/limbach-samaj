export type SponsorItem = {
  imageSrc: string;
  imageAlt: string;
  title?: string;
  description?: string;
  memoryLine?: string;
  honoreeName?: string;
  donorName?: string;
  donationPrefix?: string;
  donationAmount?: string;
  sponsoredByLabel?: string;
  sponsorsLine?: string;
  variant?: "memorial" | "default";
};

type SponsorImageRowProps = {
  items: SponsorItem[];
  className?: string;
};

export default function SponsorImageRow({ items, className = "" }: SponsorImageRowProps) {
  return (
    <div className={`space-y-6 ${className}`.trim()}>
      {items.map((item, index) => (
        <div key={`${item.imageSrc}-${index}`} className="relative">
          {item.variant === "memorial" ? (
            <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-brand/20" />
          ) : null}
        <div
          className={`flex flex-col md:flex-row items-center gap-6 rounded-3xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8 shadow-lg ${item.variant === "memorial" ? "bg-gradient-to-br from-brand/5 via-card/80 to-card/80" : ""}`}
        >
          <div className="w-full md:w-56 lg:w-64 shrink-0">
            <img
              src={item.imageSrc}
              alt={item.imageAlt}
              className="w-full rounded-2xl border border-border/40 object-cover"
            />
          </div>
          <div className="text-center md:text-left space-y-2">
            {item.memoryLine ? (
              <p className="text-sm md:text-base uppercase tracking-wide text-muted-foreground/80">
                {item.memoryLine}
              </p>
            ) : null}
            {item.honoreeName ? (
              <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                {item.honoreeName}
              </p>
            ) : null}
            {item.variant === "memorial" ? (
              <div className="mx-auto md:mx-0 h-px w-24 bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
            ) : null}
            {item.donorName ? (
              <p className="text-lg md:text-xl font-heading font-bold text-foreground">
                {item.donorName}
              </p>
            ) : null}
            {item.sponsorsLine ? (
              <p className="text-base md:text-lg text-foreground">
                <span className="font-semibold">{item.sponsorsLine}</span>
              </p>
            ) : null}
            {item.donationAmount ? (
              <p className="text-base md:text-lg text-foreground">
                {item.donationPrefix ? `${item.donationPrefix} ` : ""}
                <span className="font-semibold text-brand">{item.donationAmount}</span>
              </p>
            ) : null}
            {item.title ? (
              <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                {item.title}
              </h3>
            ) : null}
            {item.description ? (
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            ) : null}
          </div>
        </div>
        </div>
      ))}
    </div>
  );
}
