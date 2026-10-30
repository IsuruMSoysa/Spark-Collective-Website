import { Band } from "@/components/ui/Band";
import { PillLink } from "@/components/ui/Pill";
import { ARROW, CTA } from "@/lib/microcopy";

/**
 * Brand doc §5's closing band. Two halves rather than one centred column —
 * "Need one service? / We'll do that." beside "Need the whole system? / We'll do
 * that too." — so it does not fit the shared CtaBand.
 *
 * The hairline split is the same 1px-gap-over-line-colour technique used by the
 * numbered grids and the stat row, so this introduces no new visual language.
 */
const HALVES = [
  { question: "Need one service?", answer: "We'll do that." },
  { question: "Need the whole system?", answer: "We'll do that too." },
] as const;

export function ServicesCta() {
  return (
    <Band tone="bg2" bordered="top" pad="lg">
      <div className="grid gap-px bg-line md:grid-cols-2">
        {HALVES.map((half) => (
          <div key={half.question} className="bg-bg2 p-7 md:p-9">
            <h2 className="t-h3 m-0 text-fg">{half.question}</h2>
            <p className="t-lead mt-3 text-fg2">{half.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <PillLink href="/contact" variant="solid" size="lg" trailing={ARROW}>
          {CTA.letsTalk}
        </PillLink>
      </div>
    </Band>
  );
}
