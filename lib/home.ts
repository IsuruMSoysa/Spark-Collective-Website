import type { MediaAsset, Stat } from "./types";

/**
 * Homepage content, verbatim from artboard 1a (mobile variants from 1c).
 *
 * TODO-CONFIRM: every figure in `homeStats` and `mobileTickerItems` is mockup
 * content — 2.4B views, 140+ brands, 38% lift, 900 creators.
 */
export type HeroStatus = {
  label: string;
  tone: "lime" | "orange";
};

export const heroStatus: HeroStatus = {
  label: "Taking Q4 partners",
  tone: "lime",
};

export const heroEyebrow = "Social · Content · Live";

export const heroBlurb =
  "Full-service social, content and live entertainment for brands that refuse to be background noise.";

/** `unit` renders in the accent colour — the "2.4B" / "38%" treatment. */
export const homeStats = [
  { value: "2.4", unit: "B", label: "Views driven" },
  { value: "140", unit: "+", label: "Brands served" },
  { value: "38", unit: "%", label: "Avg lift / 90 days" },
] as const satisfies readonly Stat[];

/**
 * The 5-up reel strip. `highlight` replaces the label and adds the gradient
 * overlay treatment on the third tile.
 */
export type Reel = MediaAsset & {
  highlight?: string;
};

export const reels: readonly Reel[] = [
  { id: "reel-01", label: "Reel 01 — 9:16", ratio: "9:13" },
  { id: "reel-02", label: "Reel 02 — 9:16", ratio: "9:13" },
  {
    id: "reel-03",
    label: "Reel 03 — 9:16",
    ratio: "9:13",
    highlight: "Reel 03 — 12.4M views",
  },
  { id: "reel-04", label: "Reel 04 — 9:16", ratio: "9:13" },
  { id: "reel-05", label: "Reel 05 — 9:16", ratio: "9:13" },
];

export const servicesSection = {
  title: "What we run for you",
  meta: "Six disciplines / one team",
} as const;

export const workSection = {
  title: "Receipts",
  linkLabel: "All case studies",
} as const;

export const ctaBand = {
  eyebrow: "One email. No forms. No funnel.",
  title: "Let's make something loud",
  reassurance: "We reply within one working day. Really.",
} as const;

/** Artboard 1c's tighter mobile ticker. */
export const mobileTickerItems: readonly string[] = [
  "2.4B views",
  "140+ brands",
  "900 creators",
];
