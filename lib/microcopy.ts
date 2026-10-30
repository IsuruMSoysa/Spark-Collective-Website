/**
 * Brand doc §10 — global microcopy.
 *
 * These strings are shared across pages, so they live here rather than in the
 * per-page content modules. "Start a conversation" alone appears in the header,
 * the hero, the home CTA band and the mobile action bar.
 *
 * Button labels are stored WITHOUT the trailing arrow. The arrow is decorative
 * and belongs in Pill's `trailing` slot, which wraps it in aria-hidden so it is
 * not announced as part of the label.
 */
export const CTA = {
  startConversation: "Start a conversation",
  seeOurWork: "See our work",
  exploreServices: "Explore services",
  viewAllWork: "View all work",
  talkToSpark: "Talk to Spark",
  letsTalk: "Let's talk",
  startAProject: "Start a project",
  chatWithUs: "Chat with us",
  sendIt: "Send it",
} as const;

/** The decorative trailing glyph. Pass to Pill's `trailing` prop. */
export const ARROW = "→";

/** Submit button label while the action is pending. */
export const LOADING = "Loading...";

export const FORM_SUCCESS = {
  // The doc writes "Thanks - we've got it." with a hyphen; the rest of the site
  // uses an em dash, so this is normalised for typographic consistency.
  title: "Thanks — we've got it.",
  body: "We'll be in touch soon.",
} as const;

/**
 * `body` is deliberately cut before the address so the consumer can render the
 * email as a real mailto link rather than as inert text in a sentence.
 */
export const FORM_ERROR = {
  title: "Something went wrong.",
  body: "Please try again or email us directly at",
} as const;

export const NOT_FOUND = {
  title: "Looks like you took a wrong turn.",
  body: "The page you're looking for doesn't exist.",
  cta: "Back to Spark",
} as const;
