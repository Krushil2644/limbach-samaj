import * as React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = {
  slideToIndex: (index: number) => void;
  getCurrentIndex: () => number;
  play: () => void;
  pause: () => void;
};

type CarouselOptions = {
  showThumbnails?: boolean;
  showFullscreenButton?: boolean;
  showPlayButton?: boolean;
  showNav?: boolean;
  autoPlay?: boolean;
  slideDuration?: number;
  slideInterval?: number;
  startIndex?: number;
  showBullets?: boolean;
  showIndex?: boolean;
  lazyLoad?: boolean;
};

type CarouselProps = {
  opts?: CarouselOptions;
  images?: Array<{
    original: string;
    thumbnail?: string;
    originalAlt?: string;
    thumbnailAlt?: string;
    description?: string;
  }>;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  api: CarouselApi | null;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, images, className, children, ...props }, ref) => {
    const galleryRef = React.useRef<ImageGallery>(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [totalItems, setTotalItems] = React.useState(0);

    const api: CarouselApi = {
      slideToIndex: (index: number) => {
        galleryRef.current?.slideToIndex(index);
      },
      getCurrentIndex: () => currentIndex,
      play: () => {
        galleryRef.current?.play();
      },
      pause: () => {
        galleryRef.current?.pause();
      },
    };

    const scrollPrev = React.useCallback(() => {
      galleryRef.current?.slideToIndex(Math.max(0, currentIndex - 1));
    }, [currentIndex]);

    const scrollNext = React.useCallback(() => {
      galleryRef.current?.slideToIndex(Math.min(totalItems - 1, currentIndex + 1));
    }, [currentIndex, totalItems]);

    const canScrollPrev = currentIndex > 0;
    const canScrollNext = currentIndex < totalItems - 1;

    React.useEffect(() => {
      if (setApi) {
        setApi(api);
      }
    }, [setApi, api]);

    const handleSlide = (currentIndex: number) => {
      setCurrentIndex(currentIndex);
    };

    const handleImageLoad = () => {
      if (images) {
        setTotalItems(images.length);
      }
    };

    // If images are provided, use react-image-gallery directly
    if (images && images.length > 0) {
      const galleryImages = images.map(img => ({
        original: img.original,
        thumbnail: img.thumbnail || img.original,
        originalAlt: img.originalAlt || '',
        thumbnailAlt: img.thumbnailAlt || '',
      }));

      return (
        <div ref={ref} className={cn("relative", className)} {...props}>
          <ImageGallery
            ref={galleryRef}
            items={galleryImages}
            onSlide={handleSlide}
            onImageLoad={handleImageLoad}
            showThumbnails={opts?.showThumbnails ?? true}
            showFullscreenButton={opts?.showFullscreenButton ?? true}
            showPlayButton={opts?.showPlayButton ?? false}
            showNav={opts?.showNav ?? true}
            autoPlay={opts?.autoPlay ?? false}
            slideDuration={opts?.slideDuration ?? 450}
            slideInterval={opts?.slideInterval ?? 3000}
            startIndex={opts?.startIndex ?? 0}
            showBullets={opts?.showBullets ?? false}
            showIndex={opts?.showIndex ?? false}
            lazyLoad={opts?.lazyLoad ?? false}
            renderLeftNav={(onClick, disabled) => (
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={onClick}
                disabled={disabled}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            renderRightNav={(onClick, disabled) => (
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={onClick}
                disabled={disabled}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          />
        </div>
      );
    }

    // Fallback to context provider for backward compatibility
    return (
      <CarouselContext.Provider
        value={{
          api,
          opts,
          images,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex", className)}
        {...props}
      />
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          "-left-12 top-1/2 -translate-y-1/2",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          "-right-12 top-1/2 -translate-y-1/2",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
