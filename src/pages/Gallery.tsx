import { useMemo, useState, useEffect, useRef } from "react";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import { AlbumGrid } from "@/components/AlbumGrid";
import { GalleryInfo } from "@/components/GalleryInfo";
import { AlbumLightbox } from "@/components/AlbumLightbox";
import galleryData from "@/content/gallery.json";

interface Album {
  id: string;
  title: string;
  coverImage: string;
  imagesLength: number;
}

interface RemoteAlbum {
  id: string;
  title: string;
  coverImage: string | null;
  imagesLength: number;
  updatedAt: string | null;
}

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  created_at: string;
  resource_type: string;
}

interface CachedAlbumData {
  images: CloudinaryImage[];
  timestamp: number;
  error?: string;
}

/**
 * Albums are discovered from Cloudinary at runtime, so uploading a new folder
 * (e.g. picnic-2026) publishes an album with no code change. gallery.json is
 * only a title override and an offline fallback.
 */
function mergeWithOverrides(remote: RemoteAlbum[]): Album[] {
  const overrides = new Map(galleryData.map((album) => [album.id, album]));

  return remote.map((album) => {
    const override = overrides.get(album.id);
    return {
      id: album.id,
      // A hand-written title always wins over the folder-name guess.
      title: override?.title ?? album.title,
      // Prefer Cloudinary's resized cover; fall back to the committed image.
      coverImage: album.coverImage ?? override?.coverImage ?? "",
      imagesLength: album.imagesLength,
    };
  });
}

export default function Gallery() {
  const fallbackAlbums: Album[] = useMemo(() => galleryData, []);
  const [albums, setAlbums] = useState<Album[]>(fallbackAlbums);

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [albumImages, setAlbumImages] = useState<CloudinaryImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const [loadingAlbums, setLoadingAlbums] = useState(true);

  // Cache for album images to avoid refetching
  const imageCache = useRef<Map<string, CachedAlbumData>>(new Map());
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Discover albums from Cloudinary on mount.
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        if (Array.isArray(data.albums) && data.albums.length > 0) {
          setAlbums(mergeWithOverrides(data.albums));
        }
      } catch (error) {
        // Keep the committed album list rather than showing an empty gallery.
        console.error('Error fetching albums:', error);
      } finally {
        setLoadingAlbums(false);
      }
    };

    fetchAlbums();
  }, []);

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

  return (
    <>
      <SEOHead
        title="Gallery"
        description="Browse photos from Limbach Samaj of Canada events, cultural celebrations, and community gatherings across Canada."
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
            <AlbumGrid
              albums={albums}
              onSelectAlbum={setSelectedAlbum}
              loading={loadingAlbums}
            />
          </div>
        </section>

        {/* Info Section */}
        <GalleryInfo />
      </main>

      {/* Lightbox Dialog */}
      <AlbumLightbox
        selectedAlbum={selectedAlbum}
        albumImages={albumImages}
        loadingImages={loadingImages}
        imageError={imageError}
        onClose={() => setSelectedAlbum(null)}
      />
    </>
  );
}
