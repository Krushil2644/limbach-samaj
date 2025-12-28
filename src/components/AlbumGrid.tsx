import { AlbumCard } from "./AlbumCard";

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
}

export function AlbumGrid({ albums, albumCounts, onSelectAlbum }: AlbumGridProps) {
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