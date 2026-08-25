import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import galleryData from "@/content/gallery.json";
import { homeContent } from "@/content/home";

type Frame = { id: string; title: string; src: string };

type RemoteAlbum = {
  id: string;
  title: string;
  coverImage: string | null;
  imagesLength: number;
};

/**
 * Photographs from real gatherings — the emotional case for the community,
 * which the previous home page made in words only.
 *
 * The committed covers in gallery.json render into the prerendered HTML so
 * the section is never empty, then Cloudinary's resized covers replace them
 * once the album list loads. Any album added to Cloudinary appears here with
 * no code change.
 */
export default function CommunityStrip() {
  const fallback = useMemo<Frame[]>(
    () =>
      galleryData
        .filter((album) => album.coverImage)
        .slice(0, 5)
        .map((album) => ({
          id: album.id,
          title: album.title,
          src: album.coverImage,
        })),
    [],
  );

  const [frames, setFrames] = useState<Frame[]>(fallback);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/gallery")
      .then((response) => response.json())
      .then((data) => {
        if (cancelled || !Array.isArray(data.albums)) return;
        const remote = (data.albums as RemoteAlbum[])
          .filter((album) => album.coverImage)
          .slice(0, 5)
          .map((album) => ({
            id: album.id,
            title:
              galleryData.find((entry) => entry.id === album.id)?.title ??
              album.title,
            src: album.coverImage as string,
          }));
        if (remote.length > 0) setFrames(remote);
      })
      .catch(() => {
        /* Keep the committed covers. */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (frames.length === 0) return null;

  const { title, description, action } = homeContent.community;

  return (
    <section aria-labelledby="community-heading" className="section-spacing">
      <div className="container-custom">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="community-heading"
              className="display-lg font-heading font-bold text-foreground"
            >
              {title}
            </h2>
            <p className="measure mt-4 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <Link
            to="/gallery"
            className="link-underline group inline-flex shrink-0 items-center gap-2 self-start text-base font-semibold text-primary-ink md:self-auto"
          >
            {action}
            <ArrowRight
              className="nudge h-4 w-4"
              aria-hidden
            />
          </Link>
        </div>

        {/* Deliberately uneven: the lead photograph is given weight rather
            than flattening every album into an identical tile. */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-4">
          {frames.map((frame, index) => (
            <Link
              key={frame.id}
              to="/gallery"
              className={`reveal lift group relative overflow-hidden rounded-xl border border-border/60 bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                index === 0
                  ? "col-span-2 row-span-2 aspect-square md:aspect-auto"
                  : "aspect-[4/3]"
              }`}
            >
              <img
                src={frame.src}
                alt={`Photographs from ${frame.title}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform [transition-duration:400ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-3 pt-10 md:p-4 md:pt-12"
              >
                <span className="font-heading text-sm font-semibold text-white md:text-base">
                  {frame.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
