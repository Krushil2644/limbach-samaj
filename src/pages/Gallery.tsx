import { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import galleryData from "@/content/gallery.json";
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '@/site-config';

export default function Gallery() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!siteConfig.navLinks.membership.visible) {
      navigate('/');
    }
  }, [navigate]);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryData.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-muted"
                  onClick={() => setSelectedImage(item.imageUrl)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-white/80 text-sm capitalize">{item.category}</p>
                    </div>
                  </div>
                </div>
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
              Have photos from our community events that you'd like to share? We'd love to feature
              them in our gallery!
            </p>
            <p className="text-muted-foreground">
              Please contact us through our contact page to submit photos from Limbach Samaj events
              and celebrations.
            </p>
          </div>
        </section>
      </main>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full p-0 overflow-hidden bg-black/95">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50"
          >
            <X className="h-6 w-6 text-white" />
            <span className="sr-only">Close</span>
          </button>
          {selectedImage && (
            <div className="flex items-center justify-center p-4">
              <img
                src={selectedImage}
                alt="Gallery image"
                className="max-h-[90vh] w-auto object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
