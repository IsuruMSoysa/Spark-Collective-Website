"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/lib/nav";
import { PillAnchor } from "@/components/ui/Pill";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Artboard 1c shows a two-line hamburger but no open state, so the drawer's
 * appearance is derived from the token system rather than ported.
 *
 * The panel stays mounted and animates via data-state + a CSS transition
 * (pointer-events-none while closed) rather than mounting/unmounting — that is
 * what let framer-motion be removed entirely, so reduced-motion is handled
 * purely in CSS.
 */
export function MobileNav({
  items,
  email,
  className,
}: {
  items: readonly NavItem[];
  email: string;
  className?: string;
}) {
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  /**
   * Open state is *derived* from the pathname rather than synchronised to it:
   * opening records the route it was opened on, so any navigation — including
   * browser back/forward — closes the drawer for free. Syncing this with an
   * effect that calls setState would cascade renders (and trips
   * react-hooks/set-state-in-effect).
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn !== null && openedOn === pathname;

  const setOpen = (next: boolean) => setOpenedOn(next ? pathname : null);

  // Escape to close, and lock background scroll while open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // setOpenedOn directly, not the setOpen helper: the setter from useState
        // is stable, so the effect needs no extra dependency.
        setOpenedOn(null);
        buttonRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={className}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="relative z-50 flex size-10 flex-col items-center justify-center gap-[5px]"
      >
        <span
          className={cn(
            "block h-0.5 w-5 bg-fg transition-transform duration-200",
            open && "translate-y-[3.5px] rotate-45"
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-5 bg-fg transition-transform duration-200",
            open && "-translate-y-[3.5px] -rotate-45"
          )}
        />
      </button>

      {/* Backdrop and panel sit at z-40 — below the header (z-50) so the
          hamburger stays clickable, above the mobile action bar (z-30). */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        data-state={open ? "open" : "closed"}
        className={cn(
          "fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <div
        id={panelId}
        data-state={open ? "open" : "closed"}
        className={cn(
          "fixed inset-x-0 top-(--nav-h) z-40 border-b border-line bg-bg px-5 pb-8 pt-6",
          "transition-[opacity,transform] duration-200",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <NavLinks
          items={items}
          size="lg"
          onNavigate={() => setOpen(false)}
          className="flex flex-col gap-5"
        />

        <PillAnchor
          href={`mailto:${email}`}
          variant="solid"
          size="md"
          className="mt-7 w-full"
          onClick={() => setOpen(false)}
        >
          Email the team
        </PillAnchor>

        {/* The header hides the toggle below `sm`, so the drawer carries it —
            otherwise phone users have no way to reach the light theme at all. */}
        <div className="mt-6 border-t border-line pt-6">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
