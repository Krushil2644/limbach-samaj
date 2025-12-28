interface Album {
  id: string;
  title: string;
  coverImage: string;
  imagesLength: number;
}

interface AlbumCardProps {
  album: Album;
  imageCount: number;
  onClick: () => void;
}

export function AlbumCard({ album, imageCount, onClick }: AlbumCardProps) {
  return (
    <button
      className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-md text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={onClick}
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
          {imageCount} photos
        </p>
        <div className="pt-2">
          <span className="text-sm font-medium text-primary group-hover:underline">
            View Album →
          </span>
        </div>
      </div>
    </button>
  );
}