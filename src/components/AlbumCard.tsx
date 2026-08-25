interface Album {
  id: string;
  title: string;
  coverImage: string;
  imagesLength: number;
  imageCount?: number;
}

interface AlbumCardProps {
  album: Album;
  /** Larger tiles lead the grid; the rest are secondary. */
  featured?: boolean;
  onClick: () => void;
}

/** "41 photos", "41 photos · 1 video", "1 photo". */
export function albumCount(album: Album): string {
  const photos = album.imageCount ?? album.imagesLength;
  const videos = Math.max(0, album.imagesLength - photos);
  const photoLabel = `${photos} ${photos === 1 ? "photo" : "photos"}`;
  if (videos === 0) return photoLabel;
  return `${photoLabel} · ${videos} ${videos === 1 ? "video" : "videos"}`;
}

export function AlbumCard({ album, featured = false, onClick }: AlbumCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="reveal lift group relative block w-full overflow-hidden rounded-xl border border-border bg-muted text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className={featured ? "aspect-[4/3]" : "aspect-[3/2]"}>
        <img
          src={album.coverImage}
          alt={`Photographs from ${album.title}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]"
        />
      </div>

      {/* Caption sits on the image — the photograph is the content, not a
          card wrapper around it. */}
      <div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-14 md:p-5 md:pt-16"
        aria-hidden={false}
      >
        <p
          className={`font-heading font-bold text-white ${
            featured ? "text-xl md:text-2xl" : "text-base md:text-lg"
          }`}
        >
          {album.title}
        </p>
        <p className="mt-0.5 text-sm text-white/75">{albumCount(album)}</p>
      </div>
    </button>
  );
}
