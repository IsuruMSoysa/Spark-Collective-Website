import { CONTACT_EMAIL, mailto } from "./contact";

/**
 * Brand doc §7 — the contact form's schema.
 *
 * This module is imported by BOTH the client component and the server action,
 * so it must stay pure: no secrets, no Node APIs, no transport. Delivery lives
 * in lib/email.ts, which only the action imports.
 */
export type ContactOption = {
  id: string;
  label: string;
};

/** §7 Field 04 — "What can we help with?" */
export const HELP_OPTIONS = [
  { id: "social-media", label: "Social Media" },
  { id: "creator-campaigns", label: "Creator Campaigns" },
  { id: "content-production", label: "Content Production" },
  { id: "paid-media", label: "Paid Media" },
  { id: "creative-strategy", label: "Creative Strategy" },
  { id: "ugc-creator-content", label: "UGC & Creator Content" },
  { id: "something-else", label: "Something else" },
] as const satisfies readonly ContactOption[];

/** §7 Field 05 — "What are you looking to achieve?" */
export const GOAL_OPTIONS = [
  { id: "build-awareness", label: "Build awareness" },
  { id: "launch-something", label: "Launch something" },
  { id: "grow-social", label: "Grow social" },
  { id: "work-with-creators", label: "Work with creators" },
  { id: "create-content", label: "Create content" },
  { id: "drive-sales", label: "Drive sales" },
  { id: "not-sure-yet", label: "Not sure yet" },
] as const satisfies readonly ContactOption[];

export type HelpId = (typeof HELP_OPTIONS)[number]["id"];
export type GoalId = (typeof GOAL_OPTIONS)[number]["id"];

/**
 * Labels and placeholders verbatim from §7. Placeholders are supplementary —
 * every field also carries a real visible <label>.
 */
export const CONTACT_FIELDS = {
  name: { label: "Name", placeholder: "Your name" },
  email: { label: "Email", placeholder: "Your email address" },
  company: { label: "Company", placeholder: "Company / Brand" },
  help: { label: "What can we help with?", placeholder: "" },
  goal: { label: "What are you looking to achieve?", placeholder: "" },
  message: {
    label: "Tell us about your project",
    placeholder:
      "Tell us what you're working on, what you want to achieve and anything else we should know.",
  },
} as const;

export type ContactFieldName = keyof typeof CONTACT_FIELDS;

/** Non-field inputs. Both are anti-spam; see parseContactForm. */
export const HONEYPOT_FIELD = "website";
export const TIMESTAMP_FIELD = "renderedAt";

/** A bot that fills the honeypot is answered with success, never with an error. */
export const MIN_SUBMIT_MS = 3000;

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  help: HelpId;
  goal: GoalId;
  message: string;
};

export type ContactStatus = "idle" | "invalid" | "sent" | "error";

export type ContactState = {
  status: ContactStatus;
  errors?: Partial<Record<ContactFieldName, string>>;
  /**
   * Echoed back so a validation round-trip refills the form from the returned
   * state rather than from client state. Never populated on "sent".
   */
  values?: Partial<Record<ContactFieldName, string>>;
  /** On "error": a prefilled mailto so the visitor is never stranded. */
  fallbackHref?: string;
};

export const INITIAL_CONTACT_STATE: ContactState = { status: "idle" };

/** Abuse floor, not a UX constraint. Server actions already cap the body at 1MB. */
const MAX_LENGTH = {
  name: 120,
  email: 254,
  company: 160,
  message: 4000,
} as const;

const HELP_IDS: ReadonlySet<string> = new Set(HELP_OPTIONS.map((o) => o.id));
const GOAL_IDS: ReadonlySet<string> = new Set(GOAL_OPTIONS.map((o) => o.id));

export function isHelpId(value: string): value is HelpId {
  return HELP_IDS.has(value);
}

export function isGoalId(value: string): value is GoalId {
  return GOAL_IDS.has(value);
}

export function labelFor(
  options: readonly ContactOption[],
  id: string
): string {
  return options.find((option) => option.id === id)?.label ?? id;
}

/**
 * Deliberately loose. `type="email"` catches typos in the browser, and strict
 * RFC-shaped regexes reject addresses that genuinely deliver — a false negative
 * here costs a lead, a false positive costs nothing.
 */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Subject lines are headers; a bare CR or LF in one is never wanted. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function read(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export type ParseResult =
  | { ok: true; data: Enquiry }
  /** A bot: honeypot filled, or submitted implausibly fast. */
  | { ok: false; reason: "bot" }
  | {
      ok: false;
      reason: "invalid";
      errors: Partial<Record<ContactFieldName, string>>;
      values: Partial<Record<ContactFieldName, string>>;
    };

export function parseContactForm(
  formData: FormData,
  now: number
): ParseResult {
  if (read(formData, HONEYPOT_FIELD) !== "") return { ok: false, reason: "bot" };

  // Absent or unparseable passes rather than failing closed: the field is
  // written by an effect after mount, and a legitimate submit must never be
  // rejected just because that value is missing.
  const renderedAt = Number(read(formData, TIMESTAMP_FIELD));
  if (
    Number.isFinite(renderedAt) &&
    renderedAt > 0 &&
    now - renderedAt < MIN_SUBMIT_MS
  ) {
    return { ok: false, reason: "bot" };
  }

  const values = {
    name: singleLine(read(formData, "name")),
    email: singleLine(read(formData, "email")),
    company: singleLine(read(formData, "company")),
    help: read(formData, "help"),
    goal: read(formData, "goal"),
    message: read(formData, "message"),
  };

  const errors: Partial<Record<ContactFieldName, string>> = {};

  if (!values.name) errors.name = "Tell us your name.";
  else if (values.name.length > MAX_LENGTH.name) {
    errors.name = "That's longer than we can store.";
  }

  if (!values.email) errors.email = "We need an email to reply to.";
  else if (values.email.length > MAX_LENGTH.email || !looksLikeEmail(values.email)) {
    errors.email = "That doesn't look like an email address.";
  }

  if (values.company.length > MAX_LENGTH.company) {
    errors.company = "That's longer than we can store.";
  }

  if (!isHelpId(values.help)) errors.help = "Pick one so we know who to loop in.";
  if (!isGoalId(values.goal)) errors.goal = "Pick the closest one.";

  if (!values.message) errors.message = "A sentence or two is plenty.";
  else if (values.message.length > MAX_LENGTH.message) {
    errors.message = "That's longer than we can store — send us the short version.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, reason: "invalid", errors, values };
  }

  return { ok: true, data: values as Enquiry };
}

/**
 * The escape hatch shown with the error state: the visitor's answers, already
 * written into their mail client, so a failed send never costs them the typing.
 */
export function enquiryMailtoHref(
  values: Partial<Record<ContactFieldName, string>>
): string {
  const lines = [
    `Name: ${values.name ?? ""}`,
    `Company: ${values.company ?? ""}`,
    values.help ? `Looking for: ${labelFor(HELP_OPTIONS, values.help)}` : "",
    values.goal ? `Goal: ${labelFor(GOAL_OPTIONS, values.goal)}` : "",
    "",
    values.message ?? "",
  ].filter((line) => line !== "");

  const subject = values.company
    ? `Enquiry — ${values.company}`
    : "Enquiry via sparkcollective.lk";

  return mailto(CONTACT_EMAIL, subject, lines.join("\n"));
}
