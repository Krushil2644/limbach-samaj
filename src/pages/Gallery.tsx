import { useMemo, useState, useEffect, useRef } from "react";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import galleryData from "@/content/gallery.json";
import { Carousel } from "@/components/ui/carousel";

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  created_at: string;
}

interface CachedAlbumData {
  images: CloudinaryImage[];
  timestamp: number;
  error?: string;
}

export default function Gallery() {
  type Album = (typeof galleryData)[number];
  const albums: Album[] = useMemo(() => galleryData, []);

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [albumImages, setAlbumImages] = useState<CloudinaryImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // Cache for album images to avoid refetching
  const imageCache = useRef<Map<string, CachedAlbumData>>(new Map());
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    if (selectedAlbum) {
      fetchAlbumImages(selectedAlbum.id);
    } else {
      setAlbumImages([]);
      setImageError(null);
    }
  }, [selectedAlbum]);

  const fetchAlbumImages = async (albumId: string) => {
    // Check cache first
    const cached = imageCache.current.get(albumId);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      setAlbumImages(cached.images);
      setImageError(cached.error || null);
      setLoadingImages(false);
      return;
    }

    setLoadingImages(true);
    setImageError(null);

    try {
      const response = await fetch(`/api/gallery/${albumId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch images');
      }

      const images = data.images && Array.isArray(data.images) ? data.images : [];

      // Cache the result
      imageCache.current.set(albumId, {
        images,
        timestamp: now
      });

      setAlbumImages(images);
    } catch (error) {
      console.error('Error fetching album images:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load images';

      // Cache the error as well
      imageCache.current.set(albumId, {
        images: [],
        timestamp: now,
        error: errorMessage
      });

      setImageError(errorMessage);
      setAlbumImages([]);
    } finally {
      setLoadingImages(false);
    }
  };

  // Debug: Log cache statistics
  useEffect(() => {
    const logCacheStats = () => {
      const stats = {
        totalCached: imageCache.current.size,
        albums: Array.from(imageCache.current.keys())
      };
    };

    // Log stats on mount and when cache changes
    logCacheStats();
  }, []);

  // Memoize the carousel images to prevent unnecessary re-renders
  const carouselImages = useMemo(() => {
    if (!selectedAlbum || albumImages.length === 0) return [];

    return albumImages.map(image => ({
      original: image.secure_url,
      thumbnail: image.secure_url,
      originalAlt: selectedAlbum.title,
      thumbnailAlt: selectedAlbum.title,
      description: image.public_id,
    }));
  }, [albumImages, selectedAlbum]);

  return (
    <>
      <SEOHead
        title="Gallery"
        description="Browse photos from Limbach Samaj events, cultural celebrations, and community gatherings across Canada."
        path="/gallery"
      />

      <main>
        {/* Hero Section */}
        <Hero
          title="Photo Gallery"
          subtitle="Moments and memories from our community events and celebrations."
          compact
        />

        {/* Gallery Grid */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />

          <div className="container-custom relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                  Our Memories
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                Photo Albums
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Explore our collection of cherished moments from community events,
                cultural celebrations, and gatherings that bring us together.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {albums.map((album) => (
                <button
                  key={album.id}
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-md text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                      {album.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {album.imagesLength} photos
                    </p>
                    <div className="pt-2">
                      <span className="text-sm font-medium text-primary group-hover:underline">
                        View Album →
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="relative section-spacing overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/20 to-muted/30" />

          <div className="container-custom max-w-5xl relative">
            <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 p-10 md:p-14 lg:p-16 text-center shadow-xl">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50 rounded-3xl" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">
                  Share Your Photos
                </h2>

                {/* Divider */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                  <div className="w-2 h-2 rounded-full bg-primary/40" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
                </div>

                {/* Description */}
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Have photos from our community events that you&apos;d like to share?
                    We&apos;d love to feature them in our gallery!
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Please contact us through our contact page to submit photos from
                    Limbach Samaj events and celebrations.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact Us
                  </a>
                </div>
              </div>

              {/* Bottom decorative element */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedAlbum} onOpenChange={() => setSelectedAlbum(null)}>
        <DialogContent className="sm:max-w-5xl w-[calc(100%-1rem)] sm:w-auto max-h-[80vh] p-4 sm:p-6 overflow-hidden bg-background">
          {selectedAlbum && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-heading font-bold">
                    {selectedAlbum.title}
                  </DialogTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  {loadingImages ? 'Loading photos...' : `${albumImages.length} photos`}
                </p>
              </div>

              {loadingImages ? (
                <div className="flex items-center justify-center h-64 w-[50vw]">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading images...</p>
                  </div>
                </div>
              ) : imageError ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="text-red-500 mb-4">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground">{imageError}</p>
                  </div>
                </div>
              ) : albumImages.length > 0 ? (
                <Carousel
                  images={carouselImages}
                  opts={{
                    showThumbnails: false,
                    showFullscreenButton: false,
                    showPlayButton: false,
                    showNav: true,
                    autoPlay: false,
                    lazyLoad: true,
                  }}
                  className="max-h-[80vh]"
                />
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">No images found in this album.</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
