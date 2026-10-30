import { Lockup } from "@/components/brand/Lockup";
import { PillLink } from "@/components/ui/Pill";
import { ARROW, CTA } from "@/lib/microcopy";
import { primaryNav } from "@/lib/nav";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Server component. Imports its own data because the root layout renders it and
 * there is no page context to pass down.
 *
 * z-50 is the top of the scale: 10 in-section overlays, 30 floating actions,
 * 40 mobile drawer, 50 header.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="mx-auto flex h-(--nav-h) w-full max-w-[1280px] items-center justify-between gap-6 px-5 md:px-10">
        <Lockup href="/" size="md" />

        {/* gap-6, not gap-7: the nav carries five items since brand doc §2 added
            Home, and gap-7 overflows into the CTA at the md breakpoint. */}
        <NavLinks
          items={primaryNav}
          className="hidden items-center gap-6 md:flex"
        />

        {/* `max-*:hidden`, not `hidden sm:inline-flex`.
            ThemeToggle and Pill both set `inline-flex` in their own base
            classes, and Tailwind emits `.inline-flex` after `.hidden`, so a
            caller-supplied `hidden` silently loses and the element shows at
            every width. A `max-*` variant is media-wrapped and therefore
            emitted later, so it reliably wins. */}
        <div className="flex items-center gap-3">
          <ThemeToggle className="max-sm:hidden" />

          {/* Brand doc §8's primary CTA — the contact page, not a mailto. */}
          <PillLink
            href="/contact"
            variant="solid"
            size="sm"
            trailing={ARROW}
            className="max-lg:hidden"
          >
            {CTA.startConversation}
          </PillLink>

          <MobileNav items={primaryNav} className="md:hidden" />
        </div>
      </div>
    </header>
  );
}
