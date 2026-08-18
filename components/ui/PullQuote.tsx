import { cn } from "@/lib/cn";

export function PullQuote({
  quote,
  attribution,
  align = "center",
  className,
}: {
  quote: string;
  attribution: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "m-0 flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      <blockquote
        className={cn("t-lead m-0 text-fg", align === "center" && "max-w-[860px]")}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="t-body-sm mt-5 text-fg2">{attribution}</figcaption>
    </figure>
  );
}
