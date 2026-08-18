import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

const TITLE_CLASS = {
  h1: "t-h1",
  h2: "t-h2",
  h3: "t-h3",
} as const;

/**
 * The recurring "big uppercase heading + right-aligned mono meta" pattern.
 * `as` is separate from the visual size so heading order stays valid per page.
 */
export function SectionHeader({
  eyebrow,
  title,
  meta,
  trailing,
  as: Tag = "h2",
  look,
  align = "split",
  id,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  meta?: React.ReactNode;
  /** Right-hand slot for a link, when `meta` is not enough. */
  trailing?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  look?: keyof typeof TITLE_CLASS;
  align?: "split" | "center";
  id?: string;
  className?: string;
}) {
  const titleClass = TITLE_CLASS[look ?? Tag];

  return (
    <div
      id={id}
      className={cn(
        "flex gap-5",
        align === "center"
          ? "flex-col items-center text-center"
          : "flex-col md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        {eyebrow ? <Eyebrow size="wide">{eyebrow}</Eyebrow> : null}
        <Tag className={cn(titleClass, "m-0")}>{title}</Tag>
      </div>

      {meta ? (
        <Eyebrow size="label" className="shrink-0 md:pb-1.5">
          {meta}
        </Eyebrow>
      ) : null}
      {trailing ? <div className="shrink-0 md:pb-1">{trailing}</div> : null}
    </div>
  );
}
