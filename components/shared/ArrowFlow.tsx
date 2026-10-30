import { cn } from "@/lib/cn";

/**
 * Brand doc §3's creator process line:
 * Strategy → Casting → Briefing → Production → Publishing → Amplification → Reporting
 *
 * An <ol> may only contain <li>, so each connector sits inside its step's item
 * and carries aria-hidden — a screen reader reads seven steps, not "Strategy
 * right-arrow". Wrapping is left to flex-wrap: at 375px this becomes three or
 * four short rows without any breakpoint handling.
 */
export function ArrowFlow({
  steps,
  className,
}: {
  steps: readonly string[];
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "m-0 flex list-none flex-wrap items-center gap-x-3 gap-y-2 p-0",
        className
      )}
    >
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-3">
          <span className="t-h5 text-fg">{step}</span>

          {i < steps.length - 1 ? (
            <span aria-hidden="true" className="t-h5 text-orange">
              &rarr;
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
