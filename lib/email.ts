import nodemailer from "nodemailer";
import { CONTACT_EMAIL, EMAIL_DOMAIN } from "./contact";
import {
  CONTACT_FIELDS,
  GOAL_OPTIONS,
  HELP_OPTIONS,
  labelFor,
  type Enquiry,
} from "./contact-form";

/**
 * Server-only. Imported by app/contact/actions.ts and nothing else, so the SMTP
 * credentials never come near a module the client bundle can reach.
 *
 * nodemailer is listed in `serverExternalPackages` (next.config.ts) — it is not
 * on Next's auto-opt-out list and relies on Node built-ins that should be
 * required natively rather than bundled into the Server Components graph.
 */
type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  to: string;
  from: string;
};

/**
 * Read at call time, never at module scope: a top-level read would run during
 * `next build`, where none of these exist, and a throw there would fail the
 * build. Missing config is a request-time condition, not a build-time one.
 */
function readSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);
  if (!Number.isFinite(port) || port <= 0) return null;

  return {
    host,
    port,
    // Implicit TLS on 465, STARTTLS everywhere else. SMTP_SECURE overrides.
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465,
    user,
    pass,
    to: process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL,
    from: process.env.CONTACT_FROM_EMAIL ?? user,
  };
}

/**
 * Plain text only — no HTML body. Nothing the visitor typed is ever interpolated
 * into markup, so there is no escaping to get wrong.
 */
export function composeEnquiryEmail(enquiry: Enquiry): {
  subject: string;
  text: string;
} {
  const who = enquiry.company || enquiry.name;

  const text = [
    `${CONTACT_FIELDS.name.label}: ${enquiry.name}`,
    `${CONTACT_FIELDS.email.label}: ${enquiry.email}`,
    `${CONTACT_FIELDS.company.label}: ${enquiry.company || "—"}`,
    "",
    `${CONTACT_FIELDS.help.label} ${labelFor(HELP_OPTIONS, enquiry.help)}`,
    `${CONTACT_FIELDS.goal.label} ${labelFor(GOAL_OPTIONS, enquiry.goal)}`,
    "",
    `${CONTACT_FIELDS.message.label}:`,
    enquiry.message,
    "",
    "—",
    `Sent from the contact form on ${EMAIL_DOMAIN}`,
  ].join("\n");

  return { subject: `New enquiry — ${who}`, text };
}

/**
 * Throws on missing configuration or any transport failure. The caller turns
 * that into the spec's error state; it must never surface a raw SMTP message to
 * the visitor.
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  const config = readSmtpConfig();
  if (!config) {
    throw new Error("SMTP is not configured (SMTP_HOST/SMTP_USER/SMTP_PASS).");
  }

  // Created per invocation: a serverless instance has no long-lived pool to
  // reuse, and the timeouts turn a hung handshake into a fast error state
  // rather than a button that spins until the platform kills the request.
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const { subject, text } = composeEnquiryEmail(enquiry);

  try {
    await transport.sendMail({
      from: `Spark Collective Website <${config.from}>`,
      to: config.to,
      // The highest-value line here: Reply in the inbox goes to the prospect.
      replyTo: `${enquiry.name} <${enquiry.email}>`,
      subject,
      text,
    });
  } finally {
    transport.close();
  }
}
