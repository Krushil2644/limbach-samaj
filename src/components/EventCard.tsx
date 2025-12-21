import { useState, useEffect } from "react";
import { Calendar, MapPin, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
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
  imageUrl,
  upcoming,
}: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedDate = safeFormatDate(date);

  // Use responsive placeholder image if imageUrl is empty or not provided
  // Mobile: 640x360, Tablet: 768x432, Desktop: 1200x675
  const getPlaceholderImage = (size: 'mobile' | 'tablet' | 'desktop') => {
    const sizes = {
      mobile: '640x360',
      tablet: '768x432',
      desktop: '1200x675'
    };
    return `https://placehold.co/${sizes[size]}/e2e8f0/64748b?text=Event+Image`;
  };

  const displayImageUrl = imageUrl || getPlaceholderImage('desktop');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
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
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={displayImageUrl}
            srcSet={imageUrl ? undefined : `${getPlaceholderImage('mobile')} 640w, ${getPlaceholderImage('tablet')} 768w, ${getPlaceholderImage('desktop')} 1200w`}
            sizes={imageUrl ? undefined : "(max-width: 640px) 640px, (max-width: 768px) 768px, 1200px"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

          {/* Badge */}
          <div className="absolute top-3 right-3">
            <Badge
              variant={upcoming ? "default" : "secondary"}
              className="backdrop-blur-sm shadow-md"
            >
              {upcoming ? "Upcoming" : "Past Event"}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
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
            {description}
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 pt-20 sm:pt-24 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-card rounded-2xl sm:rounded-3xl border border-border shadow-2xl w-full max-w-2xl max-h-[85vh] sm:max-h-[80vh] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 p-2 rounded-full bg-background/90 backdrop-blur-sm border border-border hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <div className="max-h-[85vh] sm:max-h-[80vh] overflow-y-auto">
              {/* Modal Image */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={displayImageUrl}
                  srcSet={imageUrl ? undefined : `${getPlaceholderImage('mobile')} 640w, ${getPlaceholderImage('tablet')} 768w, ${getPlaceholderImage('desktop')} 1200w`}
                  sizes={imageUrl ? undefined : "(max-width: 640px) 640px, (max-width: 768px) 768px, 1200px"}
                  alt={title}
                  className="w-full h-full object-cover block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                {/* Badge on image */}
                <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6">
                  <Badge
                    variant={upcoming ? "default" : "secondary"}
                    className="backdrop-blur-sm shadow-lg text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
                  >
                    {upcoming ? "Upcoming Event" : "Past Event"}
                  </Badge>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
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
                    <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-1">Date & Time</p>
                    <p className="text-sm sm:text-base font-medium text-foreground">{formattedDate}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-1">Location</p>
                    <p className="text-sm sm:text-base font-medium text-foreground">{location}</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Description */}
              <div>
                <h3 className="text-base sm:text-lg font-heading font-bold text-foreground mb-2 sm:mb-3">About This Event</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Additional Info for upcoming events */}
              {upcoming && (
                <>
                  <div className="border-t border-border" />
                  <div className="bg-primary/5 border border-primary/20 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Registration details and additional information will be shared with members closer to the event date. Please contact us for more details.</span>
                    </p>
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
