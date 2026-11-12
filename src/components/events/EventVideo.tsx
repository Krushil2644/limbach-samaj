import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

/**
 * A vertical phone video is taller than the card it sits in, so it opens in
 * a dialog from a compact button instead of stretching the layout.
 */
export default function EventVideo({
  src,
  poster,
  title,
  className = "",
}: {
  src: string;
  poster?: string;
  title: string;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger
        className={`press inline-flex min-h-[2.75rem] items-center gap-2.5 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      >
        <Play className="h-4 w-4 shrink-0 fill-primary text-primary" aria-hidden />
        Watch the invitation video
      </DialogTrigger>
      {/* Explicit width: 45vh wide is 80vh tall at 9:16, capped to the
          screen on phones. A centred fixed box with w-auto would only get
          the half of the viewport right of centre. */}
      <DialogContent className="w-[min(calc(100vw-2rem),45vh)] max-w-none rounded-2xl border-0 bg-black p-0 [&>button]:z-10 [&>button]:rounded-full [&>button]:bg-black/60 [&>button]:p-1 [&>button]:text-white [&>button]:opacity-100">
        <DialogTitle className="sr-only">{title} invitation video</DialogTitle>
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          className="aspect-[9/16] h-auto w-full rounded-2xl"
        />
      </DialogContent>
    </Dialog>
  );
}
