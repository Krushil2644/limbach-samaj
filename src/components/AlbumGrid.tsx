import { AlbumCard } from "./AlbumCard";
import { Skeleton } from "./ui/skeleton";

interface Album {
  id: string;
  title: string;
  coverImage: string;
  imagesLength: number;
  imageCount?: number;
}

interface AlbumGridProps {
  albums: Album[];
  onSelectAlbum: (album: Album) => void;
  loading?: boolean;
}

function AlbumSkeleton({ featured }: { featured?: boolean }) {
  return (
    <Skeleton
      className={`w-full rounded-xl ${featured ? "aspect-[4/3]" : "aspect-[3/2]"}`}
    />
  );
}

/**
 * The first two albums lead at double width; the rest follow in threes.
 * A uniform grid of identical tiles flattens an archive where some albums
 * hold ninety photographs and others hold two.
 */
export function AlbumGrid({ albums, onSelectAlbum, loading = false }: AlbumGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-6">
        {[0, 1].map((i) => (
          <div key={i} className="lg:col-span-3">
            <AlbumSkeleton featured />
          </div>
        ))}
        {[2, 3, 4].map((i) => (
          <div key={i} className="lg:col-span-2">
            <AlbumSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-6">
      {albums.map((album, index) => {
        const featured = index < 2;
        return (
          <div
            key={album.id}
            className={featured ? "lg:col-span-3" : "lg:col-span-2"}
          >
            <AlbumCard
              album={album}
              featured={featured}
              onClick={() => onSelectAlbum(album)}
            />
          </div>
        );
      })}
    </div>
  );
}
