import { CTA } from "./microcopy";
import type { CtaContent, NumberedItem } from "./types";

/**
 * Work page content — brand doc §6.
 *
 * §6 supplies a case-study *structure* but no case studies, and both §6 ("Display
 * verified campaign metrics") and §12 ("Use only verified numbers") rule out
 * filling it with invented results. So the page carries the structure itself:
 * the standard a Spark write-up has to meet. Add real cases here — client,
 * challenge, idea, execution, verified metrics — and this section becomes the
 * index above them.
 */
export const WORK_PAGE = {
  eyebrow: "Selected work",
  title: "We don't collect awards.",
  subtitle: "We collect results.",
  blurb: "Write-ups are in progress. This is the standard every one has to meet.",
} as const;

export const REPORTING_TITLE = "How we report on the work";

/** §6's case study structure, with the doc's own explanations. */
export const reportingFramework = [
  {
    number: "01",
    title: "The Challenge",
    body: ["What was the brand trying to achieve?"],
  },
  {
    number: "02",
    title: "The Idea",
    body: ["What was the creative insight or campaign idea?"],
  },
  {
    number: "03",
    title: "The Execution",
    body: [
      "How did Spark bring it to life?",
      "Creators. Content. Social. Paid media.",
    ],
  },
  {
    number: "04",
    title: "The Result",
    body: [
      "Verified campaign metrics only.",
      "Reach, views and impressions. Engagement and engagement rate. Conversions, leads and sales. ROAS, CPA and growth.",
    ],
  },
  {
    number: "05",
    title: "What Made It Work",
    body: ["The strategic reason behind the result, in short."],
  },
] as const satisfies readonly NumberedItem[];

/** §6 — WORK CTA */
export const workCta = {
  title: "Your brand could be next.",
  copy: "Let's build something worth putting here.",
  ctaLabel: CTA.startAProject,
  ctaHref: "/contact",
} as const satisfies CtaContent;
