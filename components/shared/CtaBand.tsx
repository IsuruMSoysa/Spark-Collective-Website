import { Band } from "@/components/ui/Band";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillLink } from "@/components/ui/Pill";
import { DrawLine } from "@/components/ui/decor";
import { ARROW } from "@/lib/microcopy";
import type { CtaContent } from "@/lib/types";

/**
 * The closing band, with the self-drawing vertical accent.
 *
 * Prop-driven because the brand doc specifies four of these — home §3, about §4,
 * work §6 — each with its own headline and button label, all pointing at the
 * contact page rather than at a mailto.
 */
export function CtaBand({ content }: { content: CtaContent }) {
  return (
    <Band tone="bg2" bordered="top" pad="lg" className="relative overflow-hidden">
      <DrawLine className="bottom-[-60px] left-1/2 h-[260px] -translate-x-1/2" />

      <div className="relative flex flex-col items-center text-center">
        {content.eyebrow ? (
          <Eyebrow size="wide" className="mb-5">
            {content.eyebrow}
          </Eyebrow>
        ) : null}

        <h2 className="t-h2 m-0 max-w-[20ch] text-fg">{content.title}</h2>

        {content.copy ? (
          <p className="t-lead mt-4 max-w-[46ch] text-fg2">{content.copy}</p>
        ) : null}

        <PillLink
          href={content.ctaHref}
          variant="solid"
          size="lg"
          trailing={ARROW}
          className="mt-8"
        >
          {content.ctaLabel}
        </PillLink>
      </div>
    </Band>
  );
}
