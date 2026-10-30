import { Band, type BandBorder, type BandTone } from "@/components/ui/Band";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import type { Statement } from "@/lib/types";

/**
 * A headline plus stacked copy — the shape the brand doc uses for The Problem,
 * Creator Advantage, Content, Performance, Why Spark and "Who we work with".
 *
 * `display` stanzas render as a large wrapping row rather than a paragraph
 * stack, which is what the doc's punch lists want ("Awareness. Engagement.
 * Traffic. Leads. Sales."). Both treatments resolve through a static lookup —
 * never an interpolated class string, which Tailwind v4's scanner cannot see.
 */
const STANZA_CLASS = {
  prose: "t-lead max-w-[62ch] text-fg2",
  display: "t-h3 text-fg",
} as const;

export function StatementBand({
  statement,
  tone = "bg",
  bordered = "top",
  size = "narrow",
  footer,
  id,
}: {
  statement: Statement;
  tone?: BandTone;
  bordered?: BandBorder;
  size?: "narrow" | "default";
  /** The process line under Creator Advantage, the four points under Why Spark. */
  footer?: React.ReactNode;
  id?: string;
}) {
  return (
    <Band tone={tone} bordered={bordered} pad="lg" size={size} id={id}>
      {statement.eyebrow ? (
        <Eyebrow tone="orange" size="wide" className="mb-4.5">
          {statement.eyebrow}
        </Eyebrow>
      ) : null}

      <h2 className="t-h2 m-0 max-w-[24ch] text-fg">{statement.headline}</h2>

      <div className="mt-8 flex flex-col gap-6">
        {statement.stanzas.map((stanza) => (
          <div
            key={stanza.lines[0]}
            className={
              stanza.display
                ? "flex flex-wrap gap-x-5 gap-y-1"
                : "flex flex-col gap-1"
            }
          >
            {stanza.lines.map((line) => (
              <p
                key={line}
                className={cn(
                  "m-0",
                  stanza.display ? STANZA_CLASS.display : STANZA_CLASS.prose
                )}
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      {footer ? <div className="mt-11">{footer}</div> : null}
    </Band>
  );
}
