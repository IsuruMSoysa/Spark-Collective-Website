/** Shared primitives for the content layer. */

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
