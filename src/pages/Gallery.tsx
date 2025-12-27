import { useMemo, useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Carousel } from "@/components/ui/carousel";
import galleryData from "@/content/gallery.json";
import { cloudinaryClient, type CloudinaryImage } from "@/lib/cloudinary";

export default function Gallery() {
  type Album = (typeof galleryData)[number];
  const albums: Album[] = useMemo(() => galleryData, []);

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedAlbumImages, setSelectedAlbumImages] = useState<CloudinaryImage[] | null>(null);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    if (selectedAlbum) {
      setLoadingImages(true);
      const fetchImages = async () => {
        try {
          const images = await cloudinaryClient.fetchImagesByDirectory(`Limbach-Samaj-Assets/${selectedAlbum.id}`);
          setSelectedAlbumImages(images);
        } catch (error) {
          console.error('Failed to fetch images:', error);
          setSelectedAlbumImages([]);
        } finally {
          setLoadingImages(false);
        }
      };
      fetchImages();
    } else {
      setSelectedAlbumImages(null);
      setLoadingImages(false);
    }
  }, [selectedAlbum]);

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
                      {album.images.length} photos
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
        <DialogContent className="sm:max-w-5xl w-[calc(100%-1rem)] sm:w-auto max-h-[90vh] p-4 sm:p-6 overflow-hidden bg-background">
          {selectedAlbum && (
            <div className="space-y-4">
              <div>
                <DialogTitle className="text-2xl font-heading font-bold">
                  {selectedAlbum.title}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {loadingImages ? 'Loading photos...' : `${selectedAlbumImages?.length || 0} photos`}
                </p>
              </div>

              {loadingImages ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading images...</p>
                  </div>
                </div>
              ) : selectedAlbumImages && selectedAlbumImages.length > 0 ? (
                <Carousel
                  images={selectedAlbumImages.map(image => ({
                    original: image.secure_url,
                    thumbnail: image.secure_url,
                    originalAlt: selectedAlbum.title,
                    thumbnailAlt: selectedAlbum.title,
                    description: image.public_id,
                  }))}
                  opts={{
                    showThumbnails: false,
                    showFullscreenButton: false,
                    showPlayButton: true,
                    showNav: true,
                    autoPlay: true,
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
