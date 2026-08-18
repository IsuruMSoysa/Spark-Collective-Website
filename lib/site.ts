/**
 * Site-wide constants.
 *
 * `url` drives `metadataBase`, canonical URLs and the sitemap. Override per
 * environment with NEXT_PUBLIC_SITE_URL.
 */
export const SITE = {
  name: "Spark Collective",
  // TODO-CONFIRM: the design mockup uses sparkcollective.co, which is not yet
  // the live domain. Falls back to the current Vercel deployment.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://spark-collective-website.vercel.app",
  tagline: "We don't post. We ignite culture.",
  description:
    "Full-service social, content and live entertainment for brands that refuse to be background noise.",
  locale: "en",
} as const;

/** localStorage key for the light/dark choice. Shared by the pre-paint script. */
export const THEME_STORAGE_KEY = "sc-theme";

/** Meta theme-color per theme, kept in sync with --bg in globals.css. */
export const THEME_COLORS = {
  dark: "#0B0B0C",
  light: "#F4F1EC",
} as const;
