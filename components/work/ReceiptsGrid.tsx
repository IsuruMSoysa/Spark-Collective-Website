import { cn } from "@/lib/cn";
import type { Case } from "@/lib/cases";
import { CaseCard } from "./CaseCard";

/**
 * Artboard 1a's asymmetric "Receipts" grid: one large featured card beside a
 * stack of smaller ones, at 1.35fr / 1fr.
 *
 * Destructuring rather than indexing means 1, 2 or 3+ cases all render sanely.
 */
export function ReceiptsGrid({
  cases,
  className,
}: {
  cases: readonly Case[];
  className?: string;
}) {
  const [featured, ...rest] = cases;
  if (!featured) return null;

  return (
    <div
      className={cn(
        "grid gap-5 lg:grid-cols-[1.35fr_1fr]",
        className
      )}
    >
      <CaseCard study={featured} variant="featured" />

      {rest.length > 0 ? (
        <div className="flex flex-col gap-5">
          {rest.map((study) => (
            <CaseCard
              key={study.slug}
              study={study}
              variant="compact"
              className="flex-1"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
