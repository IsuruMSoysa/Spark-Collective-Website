"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { CopyButton } from "@/components/ui/CopyButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillAnchor } from "@/components/ui/Pill";
import {
  BRIEF_BUDGET_OPTIONS,
  BRIEF_SERVICE_OPTIONS,
  BRIEF_TIMING_OPTIONS,
  EMPTY_BRIEF,
  briefClipboardText,
  briefMailtoHref,
  briefWhatsAppHref,
  composeBrief,
  type BriefBudget,
  type BriefState,
  type BriefTiming,
} from "@/lib/brief";
import { CONTACT_COPY } from "@/lib/contact";

/**
 * The only genuinely stateful component in the design (artboard 1g).
 *
 * All four outputs — the on-screen preview, the mailto:, the WhatsApp message
 * and the clipboard text — derive from one call to composeBrief, so they cannot
 * drift from each other.
 *
 * Chips are native checkbox/radio inputs styled with `peer-checked:` rather than
 * buttons with aria-pressed: identical visuals, with keyboard behaviour and
 * screen-reader semantics for free and no hand-rolled ARIA.
 */
const CHIP_BASE =
  "cursor-pointer select-none rounded-pill border px-4 py-2.5 font-display text-[13px] font-semibold transition-colors";

const CHIP_STATE =
  "border-line2 text-fg2 peer-hover:border-fg2 peer-checked:border-orange peer-checked:bg-orange peer-checked:text-on-orange peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange";

const ROW_BASE =
  "cursor-pointer select-none rounded-card border px-3.5 py-3 font-display text-[13px] font-semibold transition-colors";

const ROW_STATE =
  "border-line2 text-fg2 peer-hover:border-fg2 peer-checked:border-orange peer-checked:bg-shade peer-checked:text-fg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange";

export function BriefBuilder({ to }: { to: string }) {
  const [state, setState] = useState<BriefState>(EMPTY_BRIEF);
  const [copyFailed, setCopyFailed] = useState(false);

  const draft = useMemo(() => composeBrief(state, { to }), [state, to]);

  function toggleService(id: string) {
    setState((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  }

  return (
    <div>
      <Eyebrow size="wide" className="mb-2">
        {CONTACT_COPY.builderEyebrow}
      </Eyebrow>
      <h2 className="t-h4 m-0 mb-7 text-fg">{CONTACT_COPY.builderTitle}</h2>

      <fieldset className="m-0 border-0 p-0">
        <legend className="t-meta mb-3 text-fg3">I need help with</legend>

        <div className="flex flex-wrap gap-2.5">
          {BRIEF_SERVICE_OPTIONS.map((option) => (
            <label key={option.id} className="inline-flex">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={state.services.includes(option.id)}
                onChange={() => toggleService(option.id)}
              />
              <span className={cn(CHIP_BASE, CHIP_STATE)}>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <fieldset className="m-0 border-0 p-0">
          <legend className="t-meta mb-3 text-fg3">Timing</legend>
          <div className="flex flex-col gap-2">
            {BRIEF_TIMING_OPTIONS.map((option) => (
              <label key={option.id} className="flex">
                <input
                  type="radio"
                  name="brief-timing"
                  className="peer sr-only"
                  checked={state.timing === option.id}
                  onChange={() =>
                    setState((prev) => ({
                      ...prev,
                      timing: option.id as BriefTiming,
                    }))
                  }
                />
                <span className={cn(ROW_BASE, ROW_STATE, "w-full")}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="m-0 border-0 p-0">
          <legend className="t-meta mb-3 text-fg3">Monthly budget</legend>
          <div className="flex flex-col gap-2">
            {BRIEF_BUDGET_OPTIONS.map((option) => (
              <label key={option.id} className="flex">
                <input
                  type="radio"
                  name="brief-budget"
                  className="peer sr-only"
                  checked={state.budget === option.id}
                  onChange={() =>
                    setState((prev) => ({
                      ...prev,
                      budget: option.id as BriefBudget,
                    }))
                  }
                />
                <span className={cn(ROW_BASE, ROW_STATE, "w-full")}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Renders the same strings that get encoded, so the preview can never
          disagree with what the mail client receives. */}
      <div className="mt-7 rounded-card border border-dashed border-line2 bg-card p-5">
        <Eyebrow size="meta" className="mb-2.5">
          {CONTACT_COPY.previewLabel}
        </Eyebrow>

        {draft.isEmpty ? (
          <p className="t-body-sm m-0 text-fg3">{CONTACT_COPY.previewEmpty}</p>
        ) : (
          <div
            className={cn(
              "t-body-sm whitespace-pre-line text-fg2",
              copyFailed && "select-all"
            )}
          >
            {`To: ${draft.to}\nSubject: ${draft.subject}\n\n${draft.body}`}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <PillAnchor href={briefMailtoHref(draft)} variant="solid" shape="card">
          {CONTACT_COPY.openLabel}
        </PillAnchor>

        <CopyButton
          text={briefClipboardText(draft)}
          label={CONTACT_COPY.copyLabel}
          shape="card"
          onFailure={() => setCopyFailed(true)}
        />

        <PillAnchor
          href={briefWhatsAppHref(draft)}
          external
          variant="outline"
          shape="card"
        >
          Send on WhatsApp
        </PillAnchor>
      </div>

      <p className="t-body-sm m-0 mt-4 text-fg3">{CONTACT_COPY.note}</p>
    </div>
  );
}
