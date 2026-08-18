import Image from "next/image";
import { cn } from "@/lib/cn";

/** The design's hexagon mark — pure CSS clip-path, no raster required. */
const HEX_CLIP = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";

export function HexMark({
  size = 26,
  image = false,
  preload = false,
  tone = "orange",
  className,
}: {
  /** Width in px; the design's hexagon is slightly taller than wide. */
  size?: number;
  /** Clip the real logo bitmap inside the hexagon instead of a flat fill. */
  image?: boolean;
  /** Next 16: `preload`, not the deprecated `priority`. */
  preload?: boolean;
  tone?: "orange" | "fg" | "onOrange";
  className?: string;
}) {
  const toneClass =
    tone === "orange" ? "bg-orange" : tone === "fg" ? "bg-fg" : "bg-on-orange";

  return (
    <span
      aria-hidden="true"
      style={{
        clipPath: HEX_CLIP,
        width: size,
        height: Math.round(size * 1.115),
      }}
      className={cn(
        "relative block shrink-0",
        !image && toneClass,
        image && "bg-orange",
        className
      )}
    >
      {image ? (
        <Image
          src="/2.png"
          alt=""
          fill
          // The source is a 4000x4000 PNG; a tight `sizes` keeps the optimizer
          // from serving anything near it. See the plan's note on committing a
          // 256px mark.
          sizes="48px"
          preload={preload}
          className="object-cover"
        />
      ) : null}
    </span>
  );
}
