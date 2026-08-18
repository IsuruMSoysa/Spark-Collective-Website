import { first90Days, PROCESS_TITLE, type ProcessStep } from "@/lib/process";

/**
 * Artboard 1d's four-step "first 90 days" grid.
 *
 * Agency-wide rather than service-specific, so every /services/[slug] page shows
 * it — including the five services whose deliverables the design never detailed.
 *
 * Hairlines come from a 1px grid gap over a line-coloured background, which is
 * the technique the artboard uses and stays correct as the grid reflows.
 */
export function ProcessGrid({
  steps = first90Days,
  title = PROCESS_TITLE,
}: {
  steps?: readonly ProcessStep[];
  title?: string;
}) {
  return (
    <div>
      <h2 className="t-h2 m-0 mb-8 text-fg">{title}</h2>

      <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.number} className="bg-bg p-6">
            <div className="t-stat text-orange">{step.number}</div>
            <div className="t-h4 mt-3.5 text-fg">{step.title}</div>
            <p className="t-body m-0 mt-2 text-fg2">{step.description}</p>
            <div className="t-meta mt-3.5 text-fg3">{step.window}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
