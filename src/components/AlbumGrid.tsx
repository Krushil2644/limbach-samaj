import galleryData from "@/content/gallery.json";
import { AlbumCard } from "./AlbumCard";
import { Skeleton } from "./ui/skeleton";

interface Album {
  id: string;
  title: string;
  coverImage: string;
  imagesLength: number;
}

interface AlbumGridProps {
  albums: Album[];
  albumCounts: Record<string, number>;
  onSelectAlbum: (album: Album) => void;
  loading?: boolean;
}

function AlbumCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-md text-left">
      <div className="aspect-video overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-5">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export function AlbumGrid({ albums, albumCounts, onSelectAlbum, loading = false }: AlbumGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: galleryData.length }).map((_, index) => (
          <AlbumCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          imageCount={albumCounts[album.id] ?? album.imagesLength}
          onClick={() => onSelectAlbum(album)}
        />
      ))}
    </div>
  );
}