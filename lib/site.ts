/**
 * Site-wide constants.
 *
 * `url` drives `metadataBase`, canonical URLs and the sitemap. Override per
 * environment with NEXT_PUBLIC_SITE_URL.
 */
export const SITE = {
  name: "Spark Collective",
  // TODO-CONFIRM: set NEXT_PUBLIC_SITE_URL to https://sparkcollective.lk in the
  // deployment environment. Until then canonicals point at the Vercel preview.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://spark-collective-website.vercel.app",
  /** Brand doc §1, primary tagline. Also the homepage H1. */
  tagline: "We make brands impossible to ignore.",
  /** Brand doc §1, short company description. Also the §11 meta description. */
  description:
    "Spark Collective is a creator-led social and content agency helping brands win attention through strategy, creators, content and performance.",
  /** Brand doc §1, supporting statement. Shorter than `description`. */
  supportingStatement:
    "Creator-led social, content and campaigns built for brands that want to matter.",
  locale: "en",
} as const;

/** localStorage key for the light/dark choice. Shared by the pre-paint script. */
export const THEME_STORAGE_KEY = "sc-theme";

/** Meta theme-color per theme, kept in sync with --bg in globals.css. */
export const THEME_COLORS = {
  dark: "#0B0B0C",
  light: "#F4F1EC",
} as const;
