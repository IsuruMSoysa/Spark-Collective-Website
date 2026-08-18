"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/lib/nav";

/**
 * Client only because the artboards highlight the current section (Work on 1e,
 * Services on 1d, About on 1f), which needs the pathname. Everything else in
 * the header chrome stays on the server.
 */
export function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({
  items,
  className,
  onNavigate,
  size = "sm",
}: {
  items: readonly NavItem[];
  className?: string;
  onNavigate?: () => void;
  size?: "sm" | "lg";
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={className}>
      {items.map((item) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "font-body font-medium transition-colors",
              size === "sm" ? "text-[13px]" : "text-[17px]",
              active ? "text-orange" : "text-fg2 hover:text-fg"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
