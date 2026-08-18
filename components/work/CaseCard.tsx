import Link from "next/link";
import { cn } from "@/lib/cn";
import { hasDetail, type Case } from "@/lib/cases";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

/**
 * One card, three shapes:
 *  - featured — the large homepage card with metrics footer
 *  - compact  — the stacked homepage siblings, media split left
 *  - index    — the uniform /work grid
 *
 * Cases without a written-up `detail` render as plain, non-linked cards with no
 * "Read case" affordance, so nothing dead ever ships. See lib/cases.ts.
 */
export type CaseCardVariant = "featured" | "compact" | "index";

function MetricsFooter({ study }: { study: Case }) {
  if (study.cardMetrics.length === 0) return null;

  return (
    <div className="mt-4 flex gap-8 border-t border-line pt-4">
      {study.cardMetrics.map((metric, i) => (
        <div key={metric.label}>
          <div
            className={cn("t-stat", i === 0 ? "text-orange" : "text-fg")}
          >
            {metric.value}
            {metric.unit}
          </div>
          <div className="t-meta mt-1 text-fg3">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}

export function CaseCard({
  study,
  variant,
  preloadMedia = false,
  className,
}: {
  study: Case;
  variant: CaseCardVariant;
  preloadMedia?: boolean;
  className?: string;
}) {
  const linked = hasDetail(study);

  const shell = cn(
    "group relative flex flex-col overflow-hidden rounded-card border border-line bg-card",
    linked && "transition-colors hover:border-line2",
    variant === "compact" && "sm:flex-row",
    className
  );

  const body = (
    <>
      {variant === "compact" ? (
        <MediaPlaceholder
          ratio="4:3"
          label={study.cardMedia.label}
          src={study.cardMedia.src}
          alt={study.cardMedia.alt}
          className="shrink-0 sm:aspect-auto sm:w-2/5 sm:self-stretch"
        />
      ) : (
        <MediaPlaceholder
          ratio="16:10"
          label={study.cardMedia.label}
          src={study.cardMedia.src}
          alt={study.cardMedia.alt}
          sizes={variant === "featured" ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 40vw"}
          preload={preloadMedia}
          sweep={variant === "featured"}
        />
      )}

      <div
        className={cn(
          "flex flex-1 flex-col",
          variant === "featured" ? "p-6 md:p-7" : "p-5"
        )}
      >
        <Eyebrow tone="orange" size="eyebrow" className="mb-2.5">
          {study.category}
        </Eyebrow>

        <h3
          className={cn(
            "m-0 text-fg",
            variant === "featured" ? "t-h3" : "t-h4"
          )}
        >
          {study.headline}
        </h3>

        {variant === "featured" ? (
          <MetricsFooter study={study} />
        ) : linked ? (
          <div className="t-meta mt-3.5 text-fg3 group-hover:text-orange">
            Read case →
          </div>
        ) : null}
      </div>
    </>
  );

  if (!linked) return <div className={shell}>{body}</div>;

  return (
    <Link href={`/work/${study.slug}`} className={shell}>
      {body}
    </Link>
  );
}
