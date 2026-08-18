import { PillAnchor } from "@/components/ui/Pill";
import { NEW_BUSINESS_EMAIL, getWhatsAppUrl } from "@/lib/contact";

/**
 * Artboard 1c's sticky bottom bar. The mockup paired "Email us" with "Reel";
 * WhatsApp replaces the reel link — a persistent tap-to-chat on the one channel
 * that definitely works beats a scroll-to-anchor.
 *
 * Homepage only (per the artboard), and hidden at `md` and up where
 * WhatsAppFloat takes over, so the two are never both on screen.
 *
 * z-30, below the mobile drawer (40) and header (50).
 */
export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-line bg-bg px-5 py-3 md:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <PillAnchor
        href={`mailto:${NEW_BUSINESS_EMAIL}`}
        variant="solid"
        size="md"
        className="flex-1"
      >
        Email us
      </PillAnchor>

      <PillAnchor
        href={getWhatsAppUrl()}
        external
        variant="outline"
        size="md"
        className="shrink-0"
      >
        WhatsApp
      </PillAnchor>
    </div>
  );
}
