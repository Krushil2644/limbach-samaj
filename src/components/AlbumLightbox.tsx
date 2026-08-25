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
  imageCount?: number;
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

/** The album's own count, known before any image has loaded. */
function expectedCount(album: Album): string {
  const photos = album.imageCount ?? album.imagesLength;
  return `${photos} ${photos === 1 ? "photo" : "photos"}`;
}

export function AlbumLightbox({
  selectedAlbum,
  albumImages,
  loadingImages,
  imageError,
  onClose,
}: AlbumLightboxProps) {
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
          videoPoster: image.secure_url.replace(/\.[^/.]+$/, ".jpg"),
          videoType: `video/${image.format}`,
        };
      }

      return { ...baseProps, type: "image" as const };
    });
  }, [albumImages, selectedAlbum]);

  return (
    <Dialog open={!!selectedAlbum} onOpenChange={onClose}>
      {/* Photographs read better against a dark surface, and a wider panel
          means the images are actually viewable rather than thumbnail-sized. */}
      <DialogContent className="flex max-h-[90svh] w-[calc(100%-1.5rem)] max-w-5xl flex-col overflow-hidden border-white/10 bg-[hsl(20_18%_9%)] p-0 text-[hsl(40_18%_92%)]">
        {selectedAlbum && (
          <>
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-6">
              <div className="min-w-0">
                <DialogTitle className="truncate font-heading text-lg font-bold md:text-xl">
                  {selectedAlbum.title}
                </DialogTitle>
                <p className="mt-0.5 text-sm text-[hsl(40_12%_65%)]">
                  {loadingImages
                    ? // The count is known from the album itself, so the
                      // header never reads "Loading…" with no context.
                      `Loading ${expectedCount(selectedAlbum)}…`
                    : summarise(albumImages)}
                </p>
              </div>
            </div>

            <div className="min-w-0 flex-1 overflow-y-auto p-3 md:p-5">
              {loadingImages ? (
                // A shaped placeholder at the same aspect ratio as the
                // photographs, so the panel does not jump when they arrive.
                <div
                  role="status"
                  aria-live="polite"
                  className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg bg-white/[0.04]"
                >
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                  <p className="relative text-sm text-[hsl(40_12%_60%)]">
                    Loading photographs…
                  </p>
                </div>
              ) : imageError ? (
                <div className="flex aspect-[4/3] w-full flex-col items-center justify-center rounded-lg bg-white/[0.04] text-center">
                  <p className="font-heading text-base font-bold">
                    These photos could not be loaded
                  </p>
                  <p className="mt-1.5 text-sm text-[hsl(40_12%_65%)]">
                    Please try again in a moment.
                  </p>
                </div>
              ) : albumImages.length > 0 ? (
                <Carousel
                  images={carouselImages}
                  opts={{
                    showThumbnails: albumImages.length > 1,
                    showFullscreenButton: true,
                    showPlayButton: false,
                    showNav: albumImages.length > 1,
                    autoPlay: false,
                    lazyLoad: true,
                  }}
                  className="max-h-[74vh]"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-white/[0.04]">
                  <p className="text-sm text-[hsl(40_12%_65%)]">
                    This album is empty.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
