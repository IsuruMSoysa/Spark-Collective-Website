import {
  WHATSAPP_PHONE_DISPLAY,
  WHATSAPP_PHONE_WA_ME,
  getWhatsAppUrl,
} from "./whatsapp";

export { WHATSAPP_PHONE_DISPLAY, WHATSAPP_PHONE_WA_ME, getWhatsAppUrl };

/**
 * TODO-CONFIRM: sparkcollective.co is the mockup's domain, not the live one.
 * Every email pill across all five pages derives from this single constant, so
 * switching to the real domain is a one-line change.
 */
export const EMAIL_DOMAIN = "sparkcollective.co";

export const NEW_BUSINESS_EMAIL = `hello@${EMAIL_DOMAIN}`;
export const BOOKINGS_EMAIL = `bookings@${EMAIL_DOMAIN}`;
export const PRESS_EMAIL = `press@${EMAIL_DOMAIN}`;
export const CAREERS_EMAIL = `careers@${EMAIL_DOMAIN}`;

export type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

/**
 * Artboard 1g listed four rows: NEW BUSINESS, TALENT & BOOKINGS, PRESS and
 * STUDIOS. The STUDIOS row is deliberately dropped — its Austin and London
 * addresses and its +1 (555) phone number are invented, and shipping fake
 * postal addresses and phone numbers on a live commercial site is a trust
 * problem rather than a cosmetic one.
 *
 * WhatsApp leads the list instead: it is the one channel that is real and
 * already working.
 */
export const contactChannels: readonly ContactChannel[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: WHATSAPP_PHONE_DISPLAY,
    href: getWhatsAppUrl(),
    external: true,
  },
  {
    id: "new-business",
    label: "New business",
    value: NEW_BUSINESS_EMAIL,
    href: `mailto:${NEW_BUSINESS_EMAIL}`,
  },
  {
    id: "bookings",
    label: "Talent & bookings",
    value: BOOKINGS_EMAIL,
    href: `mailto:${BOOKINGS_EMAIL}`,
  },
  {
    id: "press",
    label: "Press",
    value: PRESS_EMAIL,
    href: `mailto:${PRESS_EMAIL}`,
  },
];

/**
 * Builds a mailto: URL.
 *
 * Three things this deliberately does not do:
 *  - No URLSearchParams: it encodes spaces as '+', which several mail clients
 *    render literally in the body. encodeURIComponent yields %20.
 *  - Newlines are normalised to CRLF before encoding; bare %0A is mishandled by
 *    some Outlook versions, %0D%0A is universally safe.
 *  - Callers should keep the result under ~1900 chars; older Windows handlers
 *    truncate at 2048.
 */
export function mailto(to: string, subject?: string, body?: string): string {
  const params: string[] = [];

  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) {
    params.push(
      `body=${encodeURIComponent(body.replace(/\r?\n/g, "\r\n"))}`
    );
  }

  return `mailto:${to}${params.length ? `?${params.join("&")}` : ""}`;
}

/** Contact page copy, verbatim from artboard 1g. */
export const CONTACT_COPY = {
  eyebrow: "Contact",
  headline: "Skip the form. Just email us.",
  blurb:
    "Tell us what you're launching, roughly when, and roughly what you can spend. That's a good enough brief to start.",
  builderEyebrow: "Prefer a head start?",
  builderTitle:
    "Build your brief in 30 seconds — we'll turn it into an email.",
  previewLabel: "Your email, pre-written",
  previewEmpty:
    "Pick what you need above and this turns into an email you can send.",
  openLabel: "Open in my email app",
  copyLabel: "Copy text",
  note: "No CRM, no auto-responder. It opens your mail client with the draft ready.",
} as const;

/**
 * Artboard 1d's closing band. The mockup paired the email button with a
 * "Download rate card" button; there is no rate card asset, so that second
 * action is dropped rather than shipped as a dead link. Re-add it here once a
 * real PDF exists in /public.
 */
export const DECK_BAND_TITLE = "Want the full deck?";
