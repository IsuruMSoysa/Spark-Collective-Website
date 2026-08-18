import Link from "next/link";
import { cn } from "@/lib/cn";
import { services } from "@/lib/services";

/**
 * Looks like a tab widget, is six links.
 *
 * This is the component most likely to be mistakenly made a client component:
 * "active" comes from the route segment (`await params` in the page), not from
 * useState or usePathname, so it needs no client JS at all. Each tab is a real
 * navigable URL, which is the whole reason /services/[slug] beats client tabs.
 *
 * Scrolls horizontally on narrow viewports rather than wrapping — the artboard's
 * single row is part of the look.
 */
export function ServiceTabs({ activeSlug }: { activeSlug: string }) {
  return (
    <nav
      aria-label="Services"
      className="overflow-x-auto border-b border-line"
    >
      <div className="mx-auto flex w-full max-w-[1280px] px-5 md:px-10">
        {services.map((service) => {
          const active = service.slug === activeSlug;

          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "shrink-0 whitespace-nowrap border-b-2 px-5 py-4 font-display text-[13px] font-bold transition-colors",
                active
                  ? "border-orange text-fg"
                  : "border-transparent text-fg2 hover:text-fg"
              )}
            >
              {service.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
