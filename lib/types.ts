/** Shared primitives for the content layer. */

import type { Route } from "next";

/**
 * A headline figure. `unit` renders in the accent colour, which is what gives
 * the artboards their "2.4B" / "38%" / "4.1×" treatment.
 */
export type Stat = {
  value: string;
  unit?: string;
  label: string;
};

/**
 * Aspect ratios used by the artboards. Note the design labels a 9:13 box
 * "9:16" — the layout ratio and the label copy are independent, so never
 * derive one from the other.
 */
export type MediaRatio =
  | "1:1"
  | "3:4"
  | "4:3"
  | "4:5"
  | "9:13"
  | "9:16"
  | "16:5"
  | "16:10";

/**
 * A media slot. While `src` is absent the placeholder renders the hatch fill
 * plus `label`; adding `src`/`alt` swaps in real imagery with no layout change,
 * because the ratio box is fixed either way.
 */
export type MediaAsset = {
  id: string;
  label: string;
  ratio: MediaRatio;
  src?: string;
  alt?: string;
};

/**
 * One numbered item. The brand doc leans on this shape repeatedly at different
 * counts — Services "How we work" (6), About's approach and principles (5 each),
 * home's "Why Spark" (4), the Work page's reporting framework (5) — so it is
 * shared rather than redeclared per module. `body` lines render as separate
 * short paragraphs, which is how the doc writes them.
 */
export type NumberedItem = {
  number: string;
  title: string;
  body?: readonly string[];
};

/**
 * One block of copy inside a statement section. The brand doc writes these as
 * short stacked lines separated by blank lines, so a stanza is a group of lines
 * rendered together, with space between groups.
 */
export type StatementStanza = {
  lines: readonly string[];
  /**
   * Renders the lines as a large wrapping row rather than a paragraph stack —
   * for the doc's punch lists ("Awareness. Engagement. Traffic. Leads. Sales.")
   * which read as a headline, not as prose.
   */
  display?: boolean;
};

/**
 * A headline plus stacked copy, with no media and no figures. The doc leans on
 * this shape for five sections across the home and about pages.
 */
export type Statement = {
  eyebrow?: string;
  headline: string;
  stanzas: readonly StatementStanza[];
};

/** A closing call-to-action band. Four of these across the site. */
export type CtaContent = {
  eyebrow?: string;
  title: string;
  copy?: string;
  ctaLabel: string;
  ctaHref: Route;
};
