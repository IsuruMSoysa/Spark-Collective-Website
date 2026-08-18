import { Band } from "@/components/ui/Band";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillAnchor } from "@/components/ui/Pill";
import { DrawLine } from "@/components/ui/decor";
import { NEW_BUSINESS_EMAIL } from "@/lib/contact";
import { ctaBand } from "@/lib/home";

/** Artboard 1a's closing band, with the self-drawing vertical accent. */
export function CtaBand() {
  return (
    <Band tone="bg2" bordered="top" pad="lg" className="relative overflow-hidden">
      <DrawLine className="bottom-[-60px] left-1/2 h-[260px] -translate-x-1/2" />

      <div className="relative flex flex-col items-center text-center">
        <Eyebrow size="wide" className="mb-5">
          {ctaBand.eyebrow}
        </Eyebrow>

        <h2 className="t-h2 m-0 max-w-[16ch] text-fg">{ctaBand.title}</h2>

        <PillAnchor
          href={`mailto:${NEW_BUSINESS_EMAIL}`}
          variant="solid"
          size="lg"
          className="mt-7 max-w-full"
        >
          <span className="truncate">{NEW_BUSINESS_EMAIL}</span>
        </PillAnchor>

        <p className="t-body-sm mt-4 text-fg2">{ctaBand.reassurance}</p>
      </div>
    </Band>
  );
}
