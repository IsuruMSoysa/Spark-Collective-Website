import { Band } from "@/components/ui/Band";
import { PillAnchor } from "@/components/ui/Pill";
import { DECK_BAND_TITLE, NEW_BUSINESS_EMAIL } from "@/lib/contact";

/**
 * Artboard 1d's closing band.
 *
 * The mockup paired the email button with "Download rate card"; there is no rate
 * card asset, so that action is omitted rather than shipped as a dead button.
 * See DECK_BAND_TITLE in lib/contact.ts.
 */
export function DeckBand({ title = DECK_BAND_TITLE }: { title?: string }) {
  return (
    <Band tone="bg2" pad="md" bordered="top">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <h2 className="t-h3 m-0 text-fg">{title}</h2>

        <PillAnchor
          href={`mailto:${NEW_BUSINESS_EMAIL}`}
          variant="solid"
          className="max-w-full"
        >
          <span className="truncate">{NEW_BUSINESS_EMAIL}</span>
        </PillAnchor>
      </div>
    </Band>
  );
}
