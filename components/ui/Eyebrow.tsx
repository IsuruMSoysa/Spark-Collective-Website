import { cn } from "@/lib/cn";

const TONE_CLASS = {
  fg3: "text-fg3",
  fg2: "text-fg2",
  orange: "text-orange",
  onOrange: "text-on-orange/80",
} as const;

const SIZE_CLASS = {
  eyebrow: "t-eyebrow",
  wide: "t-eyebrow-wide",
  label: "t-label",
  meta: "t-meta",
} as const;

const DOT_CLASS = {
  lime: "bg-lime",
  orange: "bg-orange",
} as const;

export type EyebrowTone = keyof typeof TONE_CLASS;
export type EyebrowSize = keyof typeof SIZE_CLASS;

export function Eyebrow({
  tone = "fg3",
  size = "eyebrow",
  dot,
  as: Tag = "div",
  className,
  children,
}: {
  tone?: EyebrowTone;
  size?: EyebrowSize;
  /** The status dot on the hero's "Taking Q4 partners" pill. */
  dot?: keyof typeof DOT_CLASS;
  as?: "div" | "p" | "span";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        SIZE_CLASS[size],
        TONE_CLASS[tone],
        dot && "inline-flex items-center gap-2.5",
        className
      )}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className={cn("size-1.5 shrink-0 rounded-full", DOT_CLASS[dot])}
        />
      ) : null}
      {children}
    </Tag>
  );
}
