/** Digits only for https://wa.me/ */
export const WHATSAPP_PHONE_WA_ME = "94740408072";

/** Human-readable display (Sri Lanka) */
export const WHATSAPP_PHONE_DISPLAY = "+94 74 040 8072";

const DEFAULT_MESSAGE =
  "Hello Spark Collective! I'm interested in learning more about your services.";

export function getWhatsAppUrl(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE_WA_ME}?text=${encodeURIComponent(message)}`;
}
