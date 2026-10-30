"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitEnquiry } from "@/app/contact/actions";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillButton } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import { CONTACT_EMAIL } from "@/lib/contact";
import {
  CONTACT_FIELDS,
  GOAL_OPTIONS,
  HELP_OPTIONS,
  HONEYPOT_FIELD,
  INITIAL_CONTACT_STATE,
  TIMESTAMP_FIELD,
  type ContactFieldName,
  type ContactOption,
  type ContactState,
} from "@/lib/contact-form";
import { ARROW, CTA, FORM_ERROR, FORM_SUCCESS, LOADING } from "@/lib/microcopy";

/**
 * Brand doc §7's six-field form.
 *
 * The submit requires JavaScript: Next attaches the server-action reference
 * during hydration, so a fully JS-disabled POST to this page has nothing to
 * dispatch to. A submit made *before* hydration is queued and replayed, so the
 * only affected visitor is one with JS switched off — and for them the page's
 * contact block carries a real mailto and a real WhatsApp link.
 *
 * Chips are native checkbox/radio inputs styled with `peer-checked:` rather than
 * buttons with aria-pressed: identical visuals, with keyboard behaviour and
 * screen-reader semantics for free and no hand-rolled ARIA. They are used in
 * place of <select> because a native select's popup renders in OS colours and
 * cannot be themed against this site's light/dark tokens.
 */
const CHIP_BASE =
  "cursor-pointer select-none rounded-pill border px-4 py-2.5 font-display text-[13px] font-semibold transition-colors";

const CHIP_STATE =
  "border-line2 text-fg2 peer-hover:border-fg2 peer-checked:border-orange peer-checked:bg-orange peer-checked:text-on-orange peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange";

const CONTROL_BASE =
  "w-full rounded-card border bg-bg px-3.5 py-3 font-body text-[14px] text-fg transition-colors placeholder:text-fg3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";

const CONTROL_STATE = {
  ok: "border-line2 hover:border-fg2",
  error: "border-orange",
} as const;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="t-body-sm m-0 mt-2 text-orange">
      {message}
    </p>
  );
}

function TextField({
  name,
  state,
  multiline = false,
  required = false,
}: {
  name: Extract<ContactFieldName, "name" | "email" | "company" | "message">;
  state: ContactState;
  multiline?: boolean;
  required?: boolean;
}) {
  const field = CONTACT_FIELDS[name];
  const error = state.errors?.[name];
  const errorId = `${name}-error`;

  const shared = {
    id: name,
    name,
    required,
    placeholder: field.placeholder,
    defaultValue: state.values?.[name] ?? "",
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    className: cn(CONTROL_BASE, error ? CONTROL_STATE.error : CONTROL_STATE.ok),
  };

  return (
    <div>
      <label htmlFor={name} className="t-meta mb-2 block text-fg3">
        {field.label}
      </label>

      {multiline ? (
        <textarea {...shared} rows={5} className={cn(shared.className, "resize-y")} />
      ) : (
        <input {...shared} type={name === "email" ? "email" : "text"} />
      )}

      <FieldError id={errorId} message={error} />
    </div>
  );
}

function ChipGroup({
  name,
  options,
  state,
}: {
  name: Extract<ContactFieldName, "help" | "goal">;
  options: readonly ContactOption[];
  state: ContactState;
}) {
  const error = state.errors?.[name];
  const errorId = `${name}-error`;
  const selected = state.values?.[name];

  return (
    <fieldset
      className="m-0 border-0 p-0"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="t-meta mb-3 text-fg3">
        {CONTACT_FIELDS[name].label}
      </legend>

      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => (
          <label key={option.id} className="inline-flex">
            <input
              type="radio"
              name={name}
              value={option.id}
              defaultChecked={selected === option.id}
              className="peer sr-only"
            />
            <span className={cn(CHIP_BASE, CHIP_STATE)}>{option.label}</span>
          </label>
        ))}
      </div>

      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

/** The field order is §7's: Fields 01–06. */
const FIRST_INVALID_ORDER: readonly ContactFieldName[] = [
  "name",
  "email",
  "company",
  "help",
  "goal",
  "message",
];

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    INITIAL_CONTACT_STATE
  );

  const timestampRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Set after mount rather than during render: the contact page is statically
  // prerendered, so a Date.now() in the markup would be a hydration mismatch.
  useEffect(() => {
    if (timestampRef.current) {
      timestampRef.current.value = String(Date.now());
    }
  }, [state.status]);

  useEffect(() => {
    if (state.status === "sent") {
      successRef.current?.focus();
      return;
    }

    if (state.status === "invalid" && state.errors) {
      const first = FIRST_INVALID_ORDER.find((field) => state.errors?.[field]);
      if (!first) return;

      const control = document.querySelector<HTMLElement>(
        first === "help" || first === "goal"
          ? `input[name="${first}"]`
          : `#${first}`
      );
      control?.focus();
    }
  }, [state]);

  if (state.status === "sent") {
    return (
      <div>
        <Eyebrow tone="orange" size="wide" className="mb-4">
          {CTA.sendIt}
        </Eyebrow>

        <h2 ref={successRef} tabIndex={-1} className="t-h3 m-0 text-fg">
          {FORM_SUCCESS.title}
        </h2>

        <p className="t-body-lg mt-4 text-fg2">{FORM_SUCCESS.body}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-7">
      {/* Rendered unconditionally — a live region injected at the same moment as
          its content is unreliably announced. */}
      <div aria-live="polite" aria-atomic="true">
        {state.status === "error" ? (
          <div className="rounded-card border border-orange p-4">
            <p className="t-h5 m-0 text-fg">{FORM_ERROR.title}</p>
            <p className="t-body-sm m-0 mt-2 text-fg2">
              {FORM_ERROR.body}{" "}
              <a
                className="text-orange underline"
                href={state.fallbackHref ?? `mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" state={state} required />
        <TextField name="email" state={state} required />
      </div>

      <TextField name="company" state={state} />

      <ChipGroup name="help" options={HELP_OPTIONS} state={state} />
      <ChipGroup name="goal" options={GOAL_OPTIONS} state={state} />

      <TextField name="message" state={state} multiline required />

      {/* Anti-spam. aria-hidden as well as sr-only: sr-only alone is announced. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>Website</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <input ref={timestampRef} type="hidden" name={TIMESTAMP_FIELD} defaultValue="" />

      <div>
        <PillButton
          type="submit"
          variant="solid"
          size="lg"
          disabled={pending}
          aria-busy={pending}
          trailing={pending ? undefined : ARROW}
          className="disabled:opacity-60"
        >
          {pending ? LOADING : CTA.sendIt}
        </PillButton>
      </div>
    </form>
  );
}
