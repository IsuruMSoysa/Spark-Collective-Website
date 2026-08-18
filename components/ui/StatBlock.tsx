import { cn } from "@/lib/cn";
import type { Stat } from "@/lib/types";

const SIZE_CLASS = {
  sm: "t-stat",
  md: "t-stat",
  lg: "t-stat-lg",
} as const;

export type StatSize = keyof typeof SIZE_CLASS;

/**
 * Big figure + mono caption, in the three colour treatments the artboards use:
 *
 *  - `unit`   value in body colour, unit in orange — the hero's "2.4B" / "38%"
 *  - `full`   value and unit both orange — the lead metric on a case study
 *  - `plain`  no accent at all — the remaining case-study metrics
 */
const ACCENT_CLASS = {
  unit: { value: "text-fg", unit: "text-orange" },
  full: { value: "text-orange", unit: "text-orange" },
  plain: { value: "text-fg", unit: "text-fg" },
} as const;

export type StatAccent = keyof typeof ACCENT_CLASS;

export function StatBlock({
  stat,
  size = "md",
  accent = "unit",
  align = "start",
  className,
}: {
  stat: Stat;
  size?: StatSize;
  accent?: StatAccent;
  align?: "start" | "center";
  className?: string;
}) {
  const tone = ACCENT_CLASS[accent];

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className={cn(SIZE_CLASS[size], tone.value)}>
        {stat.value}
        {stat.unit ? <span className={tone.unit}>{stat.unit}</span> : null}
      </div>
      <div className="t-meta mt-1.5 text-fg3">{stat.label}</div>
    </div>
  );
}

const COLUMNS_CLASS = {
  2: "grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * `divided` uses the design's own hairline technique: a 1px grid gap over a
 * line-coloured background, with each cell painting its own surface. Unlike
 * per-cell borders it stays correct at every column count and reflows without
 * leaving stray edges.
 */
export function StatRow({
  stats,
  columns = 4,
  size = "lg",
  divided = false,
  tone = "bg",
  /**
   * Case-study metrics bar: the artboard makes the lead figure entirely orange
   * and leaves the rest unaccented, rather than accenting every unit.
   */
  leadAccent = false,
  className,
}: {
  stats: readonly Stat[];
  columns?: keyof typeof COLUMNS_CLASS;
  size?: StatSize;
  divided?: boolean;
  tone?: "bg" | "bg2";
  leadAccent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid",
        COLUMNS_CLASS[columns],
        divided ? "gap-px bg-line" : "gap-8",
        className
      )}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cn(
            divided && "px-5 py-7 md:px-8",
            divided && (tone === "bg" ? "bg-bg" : "bg-bg2")
          )}
        >
          <StatBlock
            stat={stat}
            size={size}
            accent={leadAccent ? (i === 0 ? "full" : "plain") : "unit"}
          />
        </div>
      ))}
    </div>
  );
}
