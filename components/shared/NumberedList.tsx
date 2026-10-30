import { cn } from "@/lib/cn";
import type { NumberedItem } from "@/lib/types";

/**
 * The site's numbered-item pattern, at the counts the brand doc actually uses:
 * "How we work" (6), About's approach and principles (5 each), "Why Spark" (4),
 * the Work page's reporting framework (5).
 *
 * Two layouts, because the count decides which one works:
 *
 *  - `grid` uses the design's hairline technique (1px gaps over a line-coloured
 *    background, each cell painting its own surface). Only safe when the item
 *    count divides evenly into the column count — an empty trailing cell paints
 *    solid --line and reads as a bug.
 *  - `rows` is full-width hairline-separated rows, which is the right answer for
 *    5 items and for items carrying more than one line of copy.
 *
 * Every variant resolves through a static lookup, never an interpolated class.
 */
const COLUMNS_CLASS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

const SURFACE_CLASS = {
  bg: "bg-bg",
  bg2: "bg-bg2",
} as const;

export type NumberedListColumns = keyof typeof COLUMNS_CLASS;
export type NumberedListSurface = keyof typeof SURFACE_CLASS;

export function NumberedList({
  items,
  layout = "rows",
  columns = 3,
  surface = "bg",
  className,
}: {
  items: readonly NumberedItem[];
  layout?: "grid" | "rows";
  columns?: NumberedListColumns;
  /** Must match the surrounding Band's tone, or the hairline cells show through. */
  surface?: NumberedListSurface;
  className?: string;
}) {
  if (layout === "grid") {
    return (
      <ol
        className={cn(
          "m-0 grid list-none gap-px bg-line p-0",
          COLUMNS_CLASS[columns],
          className
        )}
      >
        {items.map((item) => (
          <li key={item.number} className={cn("p-7 md:p-9", SURFACE_CLASS[surface])}>
            <div className="t-stat text-orange">{item.number}</div>
            <h3 className="t-h4 m-0 mt-3 text-fg">{item.title}</h3>

            {item.body?.map((line) => (
              <p key={line} className="t-body m-0 mt-3 text-fg2">
                {line}
              </p>
            ))}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn("m-0 flex list-none flex-col border-t border-line p-0", className)}>
      {items.map((item) => (
        <li
          key={item.number}
          className="grid gap-2 border-b border-line py-7 md:grid-cols-[100px_1fr] md:gap-8 md:py-9"
        >
          <div className="t-stat text-orange">{item.number}</div>

          <div>
            <h3 className="t-h4 m-0 text-fg">{item.title}</h3>

            {item.body?.map((line) => (
              <p key={line} className="t-body-lg m-0 mt-3 max-w-[62ch] text-fg2">
                {line}
              </p>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
