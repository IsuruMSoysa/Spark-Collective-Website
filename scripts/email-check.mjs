import nodemailer from "nodemailer";

/**
 * Checks the contact-form SMTP setup outside of Next.
 *
 *   npm run email:verify   log in only, sends nothing
 *   npm run email:test     send one test email to CONTACT_TO_EMAIL
 *
 * Mirrors readSmtpConfig() in lib/email.ts — same variables, same defaults,
 * same timeouts. Keep the two in sync; that file is TypeScript with
 * extensionless imports, so plain Node can't import it here.
 */

const mode = process.argv[2];
if (mode !== "verify" && mode !== "send") {
  console.error("Usage: node --env-file=.env scripts/email-check.mjs <verify|send>");
  process.exit(2);
}

const host = process.env.SMTP_HOST;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

if (!host || !user || !pass) {
  console.error("Missing SMTP_HOST, SMTP_USER or SMTP_PASS.");
  process.exit(1);
}

const port = Number(process.env.SMTP_PORT ?? 587);
const secure = process.env.SMTP_SECURE
  ? process.env.SMTP_SECURE === "true"
  : port === 465;
const from = process.env.CONTACT_FROM_EMAIL ?? user;
const to = process.env.CONTACT_TO_EMAIL ?? "hello@sparkcollective.lk";

const transport = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
});

try {
  if (mode === "verify") {
    await transport.verify();
    console.log(`SMTP login OK (${user} @ ${host}:${port}).`);
  } else {
    const info = await transport.sendMail({
      from: `Spark Collective Website <${from}>`,
      to,
      subject: "[Test] Contact form email",
      text: `Test message from scripts/email-check.mjs.\n\nFrom: ${from}\nTo: ${to}\nSent: ${new Date().toISOString()}`,
    });
    console.log(`Sent ${info.messageId} from ${from} to ${to}.`);
  }
} catch (error) {
  console.error(`SMTP ${mode} failed:`, error.message);
  if (error.code === "EAUTH") {
    console.error(
      "Hint: iCloud needs the primary @icloud.com address as SMTP_USER and an " +
        "app-specific password from that same Apple ID."
    );
  }
  process.exitCode = 1;
} finally {
  transport.close();
}
