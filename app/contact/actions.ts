"use server";

import {
  enquiryMailtoHref,
  parseContactForm,
  type ContactState,
} from "@/lib/contact-form";
import { sendEnquiry } from "@/lib/email";

/**
 * Brand doc §7's form submit.
 *
 * The (prevState, formData) signature is what useActionState requires. Server
 * actions are POST-only and Next checks Origin against Host, so there is no
 * CSRF token to add here.
 */
export async function submitEnquiry(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = parseContactForm(formData, Date.now());

  if (!parsed.ok) {
    // A bot gets the success state and no email. Telling it what tripped the
    // filter is the one thing that would make the filter worth defeating.
    if (parsed.reason === "bot") return { status: "sent" };

    return {
      status: "invalid",
      errors: parsed.errors,
      values: parsed.values,
    };
  }

  try {
    await sendEnquiry(parsed.data);
    return { status: "sent" };
  } catch (error) {
    // Logged for us, never shown: an SMTP failure message can name the host.
    console.error("Contact form send failed:", error);

    return {
      status: "error",
      values: parsed.data,
      fallbackHref: enquiryMailtoHref(parsed.data),
    };
  }
}
