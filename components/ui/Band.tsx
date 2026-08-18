import { cn } from "@/lib/cn";
import { Container, type ContainerSize } from "./Container";

/**
 * A full-bleed horizontal section. Every variant resolves through a static
 * lookup — never an interpolated class string, which Tailwind v4's scanner
 * cannot see and would purge in production.
 */
const TONE_CLASS = {
  bg: "bg-bg text-fg",
  bg2: "bg-bg2 text-fg",
  card: "bg-card text-fg",
  card2: "bg-card2 text-fg",
  orange: "bg-orange text-on-orange",
} as const;

const PAD_CLASS = {
  none: "",
  sm: "py-9 md:py-11",
  md: "py-12 md:py-[60px]",
  lg: "py-16 md:py-24",
} as const;

const BORDER_CLASS = {
  none: "",
  top: "border-t border-line",
  bottom: "border-b border-line",
  both: "border-y border-line",
} as const;

export type BandTone = keyof typeof TONE_CLASS;
export type BandPad = keyof typeof PAD_CLASS;
export type BandBorder = keyof typeof BORDER_CLASS;

export function Band({
  tone = "bg",
  pad = "md",
  bordered = "none",
  inner = "contained",
  size,
  as: Tag = "section",
  id,
  className,
  children,
}: {
  tone?: BandTone;
  pad?: BandPad;
  bordered?: BandBorder;
  inner?: "contained" | "bleed";
  size?: ContainerSize;
  as?: "section" | "div" | "footer" | "header";
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        TONE_CLASS[tone],
        PAD_CLASS[pad],
        BORDER_CLASS[bordered],
        className
      )}
    >
      {inner === "contained" ? (
        <Container size={size}>{children}</Container>
      ) : (
        children
      )}
    </Tag>
  );
}
