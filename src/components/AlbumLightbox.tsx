import { useMemo } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Carousel } from "@/components/ui/carousel";

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  display_url?: string;
  thumbnail_url?: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  created_at: string;
  resource_type: string;
}

interface Album {
  id: string;
  title: string;
  coverImage: string;
  imagesLength: number;
}

interface AlbumLightboxProps {
  selectedAlbum: Album | null;
  albumImages: CloudinaryImage[];
  loadingImages: boolean;
  imageError: string | null;
  onClose: () => void;
}

/** "41 photos · 1 video", matching the album card's label. */
function summarise(items: { resource_type?: string }[]): string {
  const videos = items.filter((item) => item.resource_type === "video").length;
  const photos = items.length - videos;
  const photoLabel = `${photos} ${photos === 1 ? "photo" : "photos"}`;
  if (videos === 0) return photoLabel;
  return `${photoLabel} · ${videos} ${videos === 1 ? "video" : "videos"}`;
}

export function AlbumLightbox({
  selectedAlbum,
  albumImages,
  loadingImages,
  imageError,
  onClose,
}: AlbumLightboxProps) {
  // Memoize the carousel images to prevent unnecessary re-renders
  const carouselImages = useMemo(() => {
    if (!selectedAlbum || albumImages.length === 0) return [];

    return albumImages.map((image) => {
      const isVideo = image.resource_type === "video";
      const baseProps = {
        // Fall back to the original if the API predates these fields.
        original: image.display_url ?? image.secure_url,
        thumbnail: image.thumbnail_url ?? image.secure_url,
        originalAlt: selectedAlbum.title,
        thumbnailAlt: selectedAlbum.title,
        description: image.public_id,
      };

      if (isVideo) {
        return {
          ...baseProps,
          type: "video" as const,
          videoSrc: image.secure_url,
          videoPoster: image.secure_url.replace(/\.[^/.]+$/, ".jpg"), // Use JPG thumbnail as poster
          videoType: `video/${image.format}`,
        };
      }

      return {
        ...baseProps,
        type: "image" as const,
      };
    });
  }, [albumImages, selectedAlbum]);

  return (
    <Dialog open={!!selectedAlbum} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-1rem)] sm:w-auto max-w-3xl p-4 sm:p-6 overflow-hidden bg-background">
        {selectedAlbum && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-heading font-bold">
                  {selectedAlbum.title}
                </DialogTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                {loadingImages ? "Loading…" : summarise(albumImages)}
              </p>
            </div>

            {loadingImages ? (
            <div className="w-full flex items-center justify-center">
              <div className="w-[min(92vw,520px)] aspect-[4/3] rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
                <p className="text-sm text-muted-foreground">Loading images...</p>
              </div>
            </div>
            
            ) : imageError ? (
              <div className="flex h-56 items-center justify-center">
                <div className="text-center">
                  <p className="font-heading text-base font-bold text-foreground">
                    These photos could not be loaded
                  </p>
                  <p className="measure-tight mt-1.5 text-sm text-muted-foreground">
                    Please try again in a moment.
                  </p>
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
                <p className="text-muted-foreground">
                  No images found in this album.
                </p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
