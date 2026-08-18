import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { reels } from "@/lib/home";

/**
 * Artboard 1a's 5-up reel strip, with 1c's horizontal scroller below `md`.
 *
 * Server component: the highlight treatment is a gradient, not an interaction.
 * The mobile scroller is `overflow-x-auto` + scroll snap — CSS only.
 */
export function ReelStrip() {
  return (
    <section aria-label="Showreel" className="border-y border-line">
      {/* Mobile: horizontal snap scroller (1c) */}
      <div className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 py-5 md:hidden">
        {reels.map((reel) => (
          <div key={reel.id} className="w-[132px] shrink-0 snap-start">
            <MediaPlaceholder
              ratio="9:16"
              label={reel.highlight ?? reel.label}
              hatch="sm"
              className="rounded-card"
            >
              {reel.highlight ? (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-orange/25 to-transparent"
                />
              ) : null}
            </MediaPlaceholder>
          </div>
        ))}
      </div>

      {/* Desktop: flush 5-up grid, hairlines via 1px gaps (1a) */}
      <div className="hidden gap-px bg-line md:grid md:grid-cols-5">
        {reels.map((reel) => (
          <MediaPlaceholder
            key={reel.id}
            ratio="9:13"
            label={reel.highlight ?? reel.label}
            hatch="sm"
          >
            {reel.highlight ? (
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-orange/25 to-transparent"
              />
            ) : null}
          </MediaPlaceholder>
        ))}
      </div>
    </section>
  );
}
