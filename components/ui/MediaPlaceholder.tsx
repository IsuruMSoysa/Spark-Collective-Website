import Image from "next/image";
import { cn } from "@/lib/cn";
import type { MediaRatio } from "@/lib/types";

/**
 * Static lookup, never an interpolated `aspect-[${ratio}]` — Tailwind v4's
 * scanner cannot see interpolated classes and purges them, which breaks only in
 * production.
 */
const RATIO_CLASS: Record<MediaRatio, string> = {
  "1:1": "aspect-square",
  "3:4": "aspect-[3/4]",
  "4:3": "aspect-[4/3]",
  "4:5": "aspect-[4/5]",
  "9:13": "aspect-[9/13]",
  "9:16": "aspect-[9/16]",
  "16:5": "aspect-[16/5]",
  "16:10": "aspect-[16/10]",
};

const HATCH_SIZE = {
  sm: "[--hatch-size:8px]",
  md: "[--hatch-size:10px]",
  lg: "[--hatch-size:12px]",
} as const;

const TONE_CLASS = {
  card: "bg-card",
  card2: "bg-card2",
} as const;

/**
 * Where the mono placeholder label sits. `topRight` is what the artboards use
 * whenever content is overlaid on the media (the case-study hero), so the label
 * does not end up behind the headline.
 */
const LABEL_POSITION_CLASS = {
  bottomLeft: "bottom-3.5 left-3.5",
  topRight: "right-3.5 top-3.5 md:right-10 md:top-10",
} as const;

/**
 * Every media box in all seven artboards. While `src` is absent it renders the
 * diagonal hatch plus the artboard's mono label; adding `src`/`alt`/`sizes`
 * swaps in real imagery with zero layout shift, because the ratio box is fixed
 * either way and the hatch simply becomes the loading backdrop.
 */
export function MediaPlaceholder({
  ratio,
  label,
  src,
  alt,
  sizes,
  preload,
  hatch = "md",
  tone = "card",
  labelPosition = "bottomLeft",
  sweep = false,
  fade = false,
  className,
  children,
}: {
  ratio: MediaRatio;
  /** Verbatim artboard label. Not derived from `ratio` — the design labels a 9:13 box "9:16". */
  label: string;
  src?: string;
  alt?: string;
  sizes?: string;
  /** Next 16: `preload`, not the deprecated `priority`. */
  preload?: boolean;
  hatch?: keyof typeof HATCH_SIZE;
  tone?: keyof typeof TONE_CLASS;
  labelPosition?: keyof typeof LABEL_POSITION_CLASS;
  /** The animated diagonal shine on the featured case card. */
  sweep?: boolean;
  /** Bottom-up gradient so overlaid text stays legible. */
  fade?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        RATIO_CLASS[ratio],
        HATCH_SIZE[hatch],
        TONE_CLASS[tone],
        "hatch",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      ) : (
        <span
          className={cn(
            "t-meta absolute text-fg3",
            LABEL_POSITION_CLASS[labelPosition]
          )}
        >
          {label}
        </span>
      )}

      {sweep ? (
        <div
          aria-hidden="true"
          data-motion="loop"
          className="pointer-events-none absolute inset-y-0 w-16 animate-sweep bg-linear-to-r from-transparent via-white/6 to-transparent motion-reduce:hidden"
        />
      ) : null}

      {fade ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent"
        />
      ) : null}

      {children}
    </div>
  );
}
