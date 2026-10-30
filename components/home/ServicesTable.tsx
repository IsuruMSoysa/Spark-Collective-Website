import Link from "next/link";
import { cn } from "@/lib/cn";
import { services } from "@/lib/services";

/**
 * Artboard 1a's numbered services table — also the body of /services.
 *
 * 1c renders the same content as a bare name + number list; that is this exact
 * component with the tagline cell hidden below `md`, not a second component.
 *
 * The fourth column used to carry a price hint. §12 forbids pricing anywhere, so
 * it is now just the trailing affordance on linked rows.
 *
 * The artboard shades row 02 only, which reads as a hover state being
 * demonstrated rather than a stripe pattern, so it is implemented as `hover:`.
 */
export function ServicesTable({
  linkRows = false,
  className,
}: {
  linkRows?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col border-t border-line", className)}>
      {services.map((service) => {
        const cells = (
          <>
            <div className="t-label text-orange">{service.number}</div>

            <div className="t-h4 text-fg">{service.name}</div>

            <p className="t-body m-0 hidden text-fg2 md:block">
              {service.tagline}
            </p>

            {linkRows ? (
              <div
                aria-hidden="true"
                className="t-meta hidden justify-self-end text-fg3 md:block"
              >
                &rarr;
              </div>
            ) : null}
          </>
        );

        const rowClass = cn(
          "grid items-center gap-4 border-b border-line px-2 py-5",
          "grid-cols-[40px_1fr] md:grid-cols-[64px_1.1fr_1.6fr_40px] md:gap-6 md:py-6",
          "transition-colors hover:bg-shade"
        );

        return linkRows ? (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className={rowClass}
          >
            {cells}
          </Link>
        ) : (
          <div key={service.slug} className={rowClass}>
            {cells}
          </div>
        );
      })}
    </div>
  );
}
