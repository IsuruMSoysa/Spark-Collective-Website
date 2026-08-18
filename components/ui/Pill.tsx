import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/cn";

/**
 * Pill ships as three components rather than one polymorphic one:
 *
 *  - a single `href | onClick` union defeats typedRoutes narrowing, and
 *  - mailto: / wa.me / tel: hrefs must NOT go through next/link, which would
 *    try to route and prefetch them.
 *
 * `pillClasses` is exported so one-off elements can share the styling without
 * wrapping in a component.
 *
 * NOTE for callers hiding a pill responsively: pass `max-md:hidden` (or another
 * `max-*` variant), NOT `hidden md:inline-flex`. These base classes already set
 * `inline-flex`, and Tailwind emits `.inline-flex` after `.hidden`, so a plain
 * `hidden` loses the cascade and the pill stays visible at every width.
 */
const VARIANT_CLASS = {
  solid: "bg-orange text-on-orange hover:bg-orange2",
  outline: "border border-line2 text-fg hover:border-fg2",
  inverted: "bg-on-orange text-orange hover:opacity-90",
  ghost: "text-fg2 hover:text-fg",
} as const;

const SIZE_CLASS = {
  sm: "px-[18px] py-2.5 text-[12.5px]",
  md: "px-[26px] py-4 text-[14px]",
  lg: "px-[34px] py-5 text-[17px]",
} as const;

const SHAPE_CLASS = {
  pill: "rounded-pill",
  card: "rounded-card",
} as const;

export type PillVariant = keyof typeof VARIANT_CLASS;
export type PillSize = keyof typeof SIZE_CLASS;
export type PillShape = keyof typeof SHAPE_CLASS;

export function pillClasses(
  variant: PillVariant = "solid",
  size: PillSize = "md",
  shape: PillShape = "pill"
): string {
  return cn(
    "inline-flex items-center justify-center gap-2.5 font-display font-extrabold leading-none",
    "transition-colors duration-150",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    SHAPE_CLASS[shape]
  );
}

type PillBase = {
  variant?: PillVariant;
  size?: PillSize;
  shape?: PillShape;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

function Inner({
  leading,
  trailing,
  children,
}: Pick<PillBase, "leading" | "trailing" | "children">) {
  return (
    <>
      {leading}
      <span>{children}</span>
      {trailing ? <span aria-hidden="true">{trailing}</span> : null}
    </>
  );
}

/** Internal navigation. The generic is the documented way to wrap next/link. */
export function PillLink<T extends string>({
  href,
  variant,
  size,
  shape,
  leading,
  trailing,
  className,
  children,
}: PillBase & { href: Route<T> | URL }) {
  return (
    <Link
      href={href}
      className={cn(pillClasses(variant, size, shape), className)}
    >
      <Inner leading={leading} trailing={trailing}>
        {children}
      </Inner>
    </Link>
  );
}

/** mailto: / wa.me / tel: and anything else off-app. */
export function PillAnchor({
  href,
  external,
  variant,
  size,
  shape,
  leading,
  trailing,
  className,
  children,
  ...rest
}: PillBase &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> & {
    href: string;
    external?: boolean;
  }) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      className={cn(pillClasses(variant, size, shape), className)}
      {...rest}
    >
      <Inner leading={leading} trailing={trailing}>
        {children}
      </Inner>
    </a>
  );
}

export function PillButton({
  variant,
  size,
  shape,
  leading,
  trailing,
  className,
  children,
  ...rest
}: PillBase & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(pillClasses(variant, size, shape), className)}
      {...rest}
    >
      <Inner leading={leading} trailing={trailing}>
        {children}
      </Inner>
    </button>
  );
}
