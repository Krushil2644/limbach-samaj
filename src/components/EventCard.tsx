import { useState, useEffect } from "react";
import { Calendar, MapPin, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  additionalInfo?: string[];
  imageUrl: string;
  upcoming: boolean;
}

function safeFormatDate(dateString: string) {
  const parsed = new Date(dateString);

  // If the date is invalid → return the original string (e.g. "To be announced")
  if (isNaN(parsed.getTime())) {
    return dateString;
  }

  // If valid → format normally
  return format(parsed, "MMMM dd, yyyy");
}

export default function EventCard({
  title,
  date,
  location,
  description,
  additionalInfo,
  imageUrl,
  upcoming,
}: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedDate = safeFormatDate(date);
  const plainDescription = description
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\s*\n\s*/g, " ");

  const renderEmphasis = (text: string) =>
    text.split("\n").map((line, lineIndex) => (
      <span key={lineIndex}>
        {line
          .split(
            /(\$\d[\d,]*(?:\/-)?|\bhttps?:\/\/[^\s]+|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|\b\d{3}-\d{3}-\d{4}\b)/gi,
          )
          .map((chunk, index) =>
            /^\$\d/.test(chunk) ||
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(chunk) ||
            /^\d{3}-\d{3}-\d{4}$/.test(chunk) ? (
              <strong key={index} className="font-semibold text-foreground">
                {chunk}
              </strong>
            ) : /^https?:\/\//i.test(chunk) ? (
              <a
                key={index}
                href={chunk}
                className="underline underline-offset-2 text-primary"
                target="_blank"
                rel="noreferrer"
              >
                {chunk}
              </a>
            ) : (
              <span key={index}>{chunk}</span>
            ),
          )}
        {lineIndex < text.split("\n").length - 1 && <br />}
      </span>
    ));

  // Use responsive placeholder image if imageUrl is empty or not provided
  // Mobile: 640x360, Tablet: 768x432, Desktop: 1200x675
  const getPlaceholderImage = (size: "mobile" | "tablet" | "desktop") => {
    const sizes = {
      mobile: "640x360",
      tablet: "768x432",
      desktop: "1200x675",
    };
    return `https://placehold.co/${sizes[size]}/e2e8f0/64748b?text=Event+Image`;
  };

  const displayImageUrl = imageUrl || getPlaceholderImage("desktop");

  // Prevent body scroll when modal is open
  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Event Card */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-card rounded-2xl border border-border/50 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      >
        {/* Image */}
        {/* Badge */}
        <div className="absolute top-3 right-3">
          <Badge
            variant={upcoming ? "default" : "secondary"}
            className="backdrop-blur-sm shadow-md"
          >
            {upcoming ? "Upcoming" : "Past Event"}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-5 mt-2 space-y-3">
          {/* Title */}
          <h3 className="text-lg font-heading font-bold mt-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Date and Location */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {plainDescription}
          </p>

          {/* View Details Link */}
          <div className="pt-2">
            <span className="text-sm font-medium text-primary group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 pt-20 sm:pt-24 bg-background/80 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-card rounded-2xl sm:rounded-3xl border border-border shadow-2xl w-[92vw] max-w-2xl max-h-[85svh] sm:max-h-[80svh] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 p-2 rounded-full bg-background/90 backdrop-blur-sm border border-border hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <div className="max-h-[85svh] sm:max-h-[80svh] overflow-y-auto">
              <div className="absolute top-5 sm:top-5 left-4 sm:left-6">
                <Badge
                  variant={upcoming ? "default" : "secondary"}
                  className="backdrop-blur-sm shadow-lg text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
                >
                  {upcoming ? "Upcoming Event" : "Past Event"}
                </Badge>
              </div>
              {/* Modal Content */}
              <div className="p-4 mt-10 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground mb-3 sm:mb-4 pr-8">
                    {title}
                  </h2>
                  <div className="h-1 w-12 sm:w-16 bg-primary rounded-full" />
                </div>

                {/* Event Details */}
                <div className="grid gap-3 sm:gap-4">
                  {/* Date */}
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-1">
                        Date & Time
                      </p>
                      <p className="text-sm sm:text-base font-medium text-foreground">
                        {formattedDate}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-1">
                        Location
                      </p>
                      <p className="text-sm sm:text-base font-medium text-foreground">
                        {location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-foreground mb-2 sm:mb-3">
                    About This Event
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Additional Info for upcoming events */}
                {upcoming && (
                  <>
                    <div className="border-t border-border" />
                    <div className="bg-primary/5 border border-primary/20 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-[10px] uppercase tracking-wide text-primary font-semibold">
                            Additional Information
                          </span>
                        </div>
                        <div className="mt-2">
                          {additionalInfo && additionalInfo.length > 0 ? (
                            <ul className="list-disc pl-4 space-y-1">
                          {additionalInfo.map((info, index) => (
                            <li key={index}>
                              {index === 0 ? (
                                <strong className="font-semibold text-foreground">
                                  {renderEmphasis(info)}
                                </strong>
                              ) : (
                                renderEmphasis(info)
                              )}
                            </li>
                          ))}
                        </ul>
                          ) : (
                            <span>
                              Registration details and additional information
                              will be shared with members closer to the event
                              date. Please contact us for more details.
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Close button at bottom */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-sm sm:text-base font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
