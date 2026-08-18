import Link from "next/link";
import { cn } from "@/lib/cn";
import { HexMark } from "./HexMark";

/**
 * "SPARK / COLLECTIVE" as live text, not public/4.png.
 *
 * The wordmark has to invert on the orange hiring band and recolour in light
 * mode, which a fixed-colour raster cannot do. 4.png stays useful for an OG
 * image; 2.png is the mark inside the hexagon.
 */
const SIZE = {
  sm: { mark: 20, spark: "text-[13px]", sub: "text-[7px]" },
  md: { mark: 26, spark: "text-[15px]", sub: "text-[7.5px]" },
  lg: { mark: 30, spark: "text-[20px]", sub: "text-[8px]" },
} as const;

export type LockupSize = keyof typeof SIZE;

export function Lockup({
  variant = "stacked",
  size = "md",
  href,
  withMark = true,
  tone = "default",
  className,
}: {
  /** stacked = SPARK over COLLECTIVE (nav, footer); inline = one line. */
  variant?: "stacked" | "inline";
  size?: LockupSize;
  href?: "/" | false;
  withMark?: boolean;
  /** `onOrange` inverts for the full-bleed orange band. */
  tone?: "default" | "onOrange";
  className?: string;
}) {
  const s = SIZE[size];
  const isOnOrange = tone === "onOrange";

  const inner = (
    <span className={cn("flex items-center gap-[11px]", className)}>
      {withMark ? (
        <HexMark size={s.mark} tone={isOnOrange ? "onOrange" : "orange"} />
      ) : null}

      {variant === "stacked" ? (
        <span className="flex flex-col gap-px">
          <span
            className={cn(
              "font-display font-black uppercase leading-none tracking-[0.06em]",
              s.spark,
              isOnOrange ? "text-on-orange" : "text-fg"
            )}
          >
            Spark
          </span>
          <span
            className={cn(
              "font-mono font-bold uppercase leading-none tracking-mega",
              s.sub,
              isOnOrange ? "text-on-orange/80" : "text-orange"
            )}
          >
            Collective
          </span>
        </span>
      ) : (
        <span
          className={cn(
            "font-display font-black uppercase leading-none tracking-[0.06em]",
            s.spark,
            isOnOrange ? "text-on-orange" : "text-fg"
          )}
        >
          Spark Collective
        </span>
      )}
    </span>
  );

  if (href === false || href === undefined) return inner;

  return (
    <Link href={href} aria-label="Spark Collective — home" className="shrink-0">
      {inner}
    </Link>
  );
}
