import { cn } from "@/lib/cn";

/**
 * Server component — the scroll is a CSS keyframe, no JS involved.
 *
 * Two deliberate differences from the artboard:
 *  - The track is `width: max-content` with two identical groups animating to
 *    -50%, rather than the mockup's `width: 200%`. With 200% each half is 50%
 *    of an arbitrary parent width, so the loop only seams cleanly by luck;
 *    max-content makes the seam exact at every viewport.
 *  - The duplicate group is aria-hidden, so the list is not announced twice.
 *
 * WCAG 2.2.2 requires a pause mechanism for motion running over 5s; globals.css
 * pauses the track on hover, focus-within and [data-paused="true"].
 *
 * A trailing separator after every item (as in the design) is what keeps the
 * seam between the two groups visually even.
 */
const TONE_CLASS = {
  orange: "bg-orange text-on-orange",
  fg: "bg-fg text-bg",
  bg2: "bg-bg2 text-fg",
} as const;

const PAD_CLASS = {
  sm: "py-2.5",
  md: "py-3.5",
} as const;

const GROUP_CLASS = {
  sm: "gap-6 text-[11px]",
  md: "gap-9 text-[13px]",
} as const;

/** Space between an item and the separator that trails it. */
const SEP_GAP = {
  sm: "ml-6",
  md: "ml-9",
} as const;

export type MarqueeSize = keyof typeof PAD_CLASS;

export function Marquee({
  items,
  separator = "◆",
  durationSeconds = 26,
  tone = "orange",
  size = "md",
  className,
}: {
  items: readonly string[];
  separator?: string;
  durationSeconds?: number;
  tone?: keyof typeof TONE_CLASS;
  size?: MarqueeSize;
  className?: string;
}) {
  const group = (
    <div
      className={cn(
        "marquee__group font-display font-extrabold uppercase tracking-label",
        GROUP_CLASS[size]
      )}
    >
      {items.map((item) => (
        <span key={item} className="flex items-center whitespace-nowrap">
          {item}
          <span aria-hidden="true" className={cn("opacity-70", SEP_GAP[size])}>
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn("marquee", TONE_CLASS[tone], PAD_CLASS[size], className)}
      // Continuous value as a custom property; an interpolated Tailwind class
      // would be purged by the v4 scanner.
      style={
        { "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties
      }
    >
      <div className="marquee__track">
        {group}
        {group}
      </div>
    </div>
  );
}
