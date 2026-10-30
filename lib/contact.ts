import {
  WHATSAPP_PHONE_DISPLAY,
  WHATSAPP_PHONE_WA_ME,
  getWhatsAppUrl,
} from "./whatsapp";
import { CTA } from "./microcopy";

export { WHATSAPP_PHONE_DISPLAY, WHATSAPP_PHONE_WA_ME, getWhatsAppUrl };

/**
 * The live domain. Every email address on the site derives from this single
 * constant, so a domain change stays a one-line edit.
 */
export const EMAIL_DOMAIN = "sparkcollective.lk";

/**
 * Brand doc §7 and §9 list exactly one address, used for both new business and
 * general enquiries. There is deliberately no bookings@, press@ or careers@:
 * §12 removes talent booking entirely, and shipping addresses nobody monitors
 * is worse than not listing them.
 */
export const CONTACT_EMAIL = `hello@${EMAIL_DOMAIN}`;

export type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

/**
 * Brand doc §7's contact details: New Business, General Enquiries and WhatsApp.
 * The first two share one address — that is what the doc specifies, and it says
 * something true about how small the team is.
 */
export const contactChannels: readonly ContactChannel[] = [
  {
    id: "new-business",
    label: "New business",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    id: "general",
    label: "General enquiries",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: CTA.chatWithUs,
    href: getWhatsAppUrl(),
    external: true,
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
    params.push(`body=${encodeURIComponent(body.replace(/\r?\n/g, "\r\n"))}`);
  }

  return `mailto:${to}${params.length ? `?${params.join("&")}` : ""}`;
}

/** Contact page copy — brand doc §7. */
export const CONTACT_COPY = {
  eyebrow: "Let's talk",
  headline: "Have a brand that needs attention?",
  body: [
    "Tell us what you're working on.",
    "You don't need a perfect brief.",
    "Tell us what you're trying to achieve, when you want to do it and anything else you think we should know.",
    "We'll take it from there.",
  ],
  formEyebrow: "Tell us about it",
} as const;

/** Brand doc §7's closing band. */
export const CONTACT_CLOSING = {
  title: "No complicated forms.",
  body: ["No sales maze.", "Just a conversation."],
} as const;
