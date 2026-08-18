import { cn } from "@/lib/cn";

/**
 * Purely decorative layers. All four are server components — every effect is a
 * CSS keyframe declared in globals.css, so none of them needs client JS, and
 * `motion-reduce:` plus the global reduced-motion block switches them off.
 *
 * Each is aria-hidden and pointer-events-none.
 */

/**
 * Sizes stay in this lookup rather than being overridden through `className`:
 * two same-specificity width/height utilities resolve by Tailwind's own ordering,
 * not by argument order in cn(), so an override would be a coin flip.
 */
const GLOW_SIZE = {
  /** 1c's mobile hero glow. */
  sm: "h-[300px] w-[420px]",
  /** 1g's contact glow. */
  md: "h-[420px] w-[520px]",
  /** 1a's hero glow. */
  lg: "h-[520px] w-[900px]",
} as const;

const GLOW_TONE = {
  orange:
    "bg-[radial-gradient(ellipse_at_center,rgb(255_90_31/0.30),transparent_65%)]",
  lime: "bg-[radial-gradient(ellipse_at_center,rgb(198_242_78/0.22),transparent_65%)]",
} as const;

export function GlowField({
  tone = "orange",
  size = "lg",
  durationSeconds = 7,
  className,
}: {
  tone?: keyof typeof GLOW_TONE;
  size?: keyof typeof GLOW_SIZE;
  durationSeconds?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      data-motion="loop"
      style={{ "--glow-duration": `${durationSeconds}s` } as React.CSSProperties}
      className={cn(
        "pointer-events-none absolute animate-glowpulse blur-[20px]",
        GLOW_SIZE[size],
        GLOW_TONE[tone],
        className
      )}
    />
  );
}

/** Vertical hairline rules over the hero. */
export function GridLines({
  gap = 106.6,
  className,
}: {
  gap?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{ "--grid-gap": `${gap}px` } as React.CSSProperties}
      className={cn(
        "gridlines pointer-events-none absolute inset-0 opacity-50",
        className
      )}
    />
  );
}

/** The vertical accent that draws itself in on the CTA band. */
export function DrawLine({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute w-0.5 origin-bottom animate-drawline",
        "bg-linear-to-b from-orange to-transparent",
        className
      )}
    />
  );
}

/**
 * Hero embers, using the design's declared-but-unused `emberdrift` keyframe.
 *
 * The offsets are a hardcoded deterministic table, never Math.random(): random
 * values in a prerendered server component produce non-reproducible builds, and
 * would cause a hydration mismatch if this ever moved inside a client boundary.
 */
const EMBERS = [
  { left: "8%", delay: "0s", duration: "4.6s", size: 3 },
  { left: "21%", delay: "1.4s", duration: "5.4s", size: 2 },
  { left: "34%", delay: "2.7s", duration: "4.1s", size: 4 },
  { left: "47%", delay: "0.8s", duration: "5.9s", size: 2 },
  { left: "58%", delay: "3.4s", duration: "4.4s", size: 3 },
  { left: "69%", delay: "1.9s", duration: "5.1s", size: 2 },
  { left: "81%", delay: "2.2s", duration: "4.8s", size: 3 },
  { left: "92%", delay: "0.4s", duration: "5.6s", size: 2 },
] as const;

export function EmberField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden motion-reduce:hidden",
        className
      )}
    >
      {EMBERS.map((ember) => (
        <span
          key={ember.left}
          data-motion="loop"
          style={
            {
              left: ember.left,
              width: ember.size,
              height: ember.size,
              animationDelay: ember.delay,
              "--ember-duration": ember.duration,
            } as React.CSSProperties
          }
          className="absolute bottom-0 animate-emberdrift rounded-full bg-orange"
        />
      ))}
    </div>
  );
}
