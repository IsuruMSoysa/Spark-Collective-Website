import { getWhatsAppUrl, mailto } from "./contact";

/**
 * Pure derivation for the contact page's brief builder (artboard 1g).
 *
 * One function is the single source of truth for the on-screen preview, the
 * mailto: payload, the WhatsApp payload and the clipboard text — they cannot
 * drift because they are literally the same string. No "use client" here: this
 * module must stay importable from anywhere.
 */
export type BriefTiming = "asap" | "next-quarter" | "exploring";
export type BriefBudget = "under-6k" | "6k-15k" | "15k-plus";

export type BriefOption<T extends string> = {
  id: T;
  label: string;
};

/** Chip labels verbatim from artboard 1g; ids match lib/services.ts slugs. */
export const BRIEF_SERVICE_OPTIONS = [
  { id: "social-management", label: "Social management" },
  { id: "paid-performance", label: "Paid media" },
  { id: "creator-campaigns", label: "Creators" },
  { id: "content-studio", label: "Content production" },
  { id: "live-experiential", label: "Live event" },
  { id: "talent-booking", label: "Talent booking" },
] as const satisfies readonly BriefOption<string>[];

export const BRIEF_TIMING_OPTIONS = [
  { id: "asap", label: "ASAP" },
  { id: "next-quarter", label: "Next quarter" },
  { id: "exploring", label: "Just exploring" },
] as const satisfies readonly BriefOption<BriefTiming>[];

export const BRIEF_BUDGET_OPTIONS = [
  { id: "under-6k", label: "Under $6K" },
  { id: "6k-15k", label: "$6K – $15K" },
  { id: "15k-plus", label: "$15K+" },
] as const satisfies readonly BriefOption<BriefBudget>[];

/** Sentence fragments, distinct from the button labels above. */
const TIMING_PHRASE: Record<BriefTiming, string> = {
  asap: "as soon as possible",
  "next-quarter": "next quarter",
  exploring: "sometime later — we're still exploring",
};

const TIMING_SUBJECT: Record<BriefTiming, string> = {
  asap: "ASAP",
  "next-quarter": "next quarter",
  exploring: "exploring",
};

const BUDGET_PHRASE: Record<BriefBudget, string> = {
  "under-6k": "under $6K/month",
  "6k-15k": "$6–15K/month",
  "15k-plus": "$15K+/month",
};

export type BriefState = {
  /** Service option ids, in click order. */
  services: readonly string[];
  timing: BriefTiming | null;
  budget: BriefBudget | null;
};

export const EMPTY_BRIEF: BriefState = {
  services: [],
  timing: null,
  budget: null,
};

export type BriefDraft = {
  to: string;
  subject: string;
  body: string;
  /** True when nothing has been selected — the preview shows guidance instead. */
  isEmpty: boolean;
};

function labelFor(id: string): string | undefined {
  return BRIEF_SERVICE_OPTIONS.find((o) => o.id === id)?.label;
}

/** "a", "a and b", "a, b and c" */
function andList(items: readonly string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function composeBrief(
  state: BriefState,
  opts: { to: string }
): BriefDraft {
  const labels = state.services
    .map(labelFor)
    .filter((l): l is string => Boolean(l));

  const isEmpty =
    labels.length === 0 && state.timing === null && state.budget === null;

  // Subject: "Social management + creators — next quarter"
  const subjectServices = labels.length
    ? labels
        .map((l, i) => (i === 0 ? l : l.toLowerCase()))
        .join(" + ")
    : "New project enquiry";

  const subject = state.timing
    ? `${subjectServices} — ${TIMING_SUBJECT[state.timing]}`
    : subjectServices;

  const needs = labels.length
    ? andList(labels.map((l) => l.toLowerCase()))
    : "a few things we're still narrowing down";

  const timingClause = state.timing
    ? ` starting ${TIMING_PHRASE[state.timing]}`
    : "";

  const budgetClause = state.budget
    ? `, budget around ${BUDGET_PHRASE[state.budget]}`
    : "";

  const body = [
    `Hi Spark — we're looking at ${needs}${timingClause}${budgetClause}.`,
    "",
    "Here's what we're launching:",
    "[replace this line with two or three sentences about your brand and the moment you're building toward]",
    "",
    "Thanks,",
  ].join("\n");

  return { to: opts.to, subject, body, isEmpty };
}

export function briefMailtoHref(draft: BriefDraft): string {
  return mailto(draft.to, draft.subject, draft.body);
}

export function briefWhatsAppHref(draft: BriefDraft): string {
  return getWhatsAppUrl(`${draft.subject}\n\n${draft.body}`);
}

export function briefClipboardText(draft: BriefDraft): string {
  return `To: ${draft.to}\nSubject: ${draft.subject}\n\n${draft.body}`;
}
