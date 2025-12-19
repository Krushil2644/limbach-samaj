import { useMemo, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import galleryData from "@/content/gallery.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Gallery() {
  type Album = (typeof galleryData)[number];
  const albums: Album[] = useMemo(() => galleryData, []);

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  return (
    <>
      <SEOHead
        title="Gallery"
        description="Browse photos from Limbach Samaj events, cultural celebrations, and community gatherings across Canada."
        path="/gallery"
      />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Photo Gallery
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Moments and memories from our community events and celebrations
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="section-spacing">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {albums.map((album) => (
                <button
                  key={album.id}
                  className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-sm text-left transition hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-lg font-heading font-semibold text-foreground">
                      {album.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {album.images.length} photos
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="section-spacing bg-muted/30">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Share Your Photos
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Have photos from our community events that you'd like to share?
              We'd love to feature them in our gallery!
            </p>
            <p className="text-muted-foreground">
              Please contact us through our contact page to submit photos from
              Limbach Samaj events and celebrations.
            </p>
          </div>
        </section>
      </main>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedAlbum} onOpenChange={() => setSelectedAlbum(null)}>
        <DialogContent className="sm:max-w-5xl w-[calc(100%-1rem)] sm:w-auto max-h-[90vh] p-4 sm:p-6 overflow-hidden bg-background">
          {selectedAlbum && (
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-heading font-bold">
                  {selectedAlbum.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedAlbum.images.length} photos
                </p>
              </div>

              <Carousel className="relative">
                <CarouselContent>
                  {selectedAlbum.images.map((image, idx) => (
                    <CarouselItem key={`${selectedAlbum.id}-${idx}`}>
                      <div className="flex items-center justify-center">
                        <img
                          src={image.url}
                          alt={image.caption ?? selectedAlbum.title}
                          className="max-h-[60vh] sm:max-h-[70vh] max-w-full w-auto object-contain rounded-lg"
                          loading="lazy"
                        />
                      </div>
                      {image.caption && (
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                          {image.caption}
                        </p>
                      )}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
