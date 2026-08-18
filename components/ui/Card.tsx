import { cn } from "@/lib/cn";

const TONE_CLASS = {
  card: "bg-card",
  card2: "bg-card2",
  bg: "bg-bg",
  bg2: "bg-bg2",
  none: "",
} as const;

const PAD_CLASS = {
  none: "",
  sm: "p-5",
  md: "p-6",
  lg: "p-6 md:p-7",
} as const;

const RADIUS_CLASS = {
  card: "rounded-card",
  panel: "rounded-panel",
  none: "",
} as const;

export function Card({
  tone = "card",
  pad = "md",
  radius = "card",
  bordered = true,
  accent = false,
  className,
  children,
}: {
  tone?: keyof typeof TONE_CLASS;
  pad?: keyof typeof PAD_CLASS;
  radius?: keyof typeof RADIUS_CLASS;
  bordered?: boolean;
  /** Orange border — the featured package tier. */
  accent?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    // `relative` without `overflow-hidden` on purpose: the "Most picked" badge
    // is pinned onto the top border and an overflow-hidden ancestor clips it.
    <div
      className={cn(
        "relative",
        TONE_CLASS[tone],
        PAD_CLASS[pad],
        RADIUS_CLASS[radius],
        bordered && "border",
        bordered && (accent ? "border-orange" : "border-line"),
        className
      )}
    >
      {children}
    </div>
  );
}
