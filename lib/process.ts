/**
 * The "How the first 90 days go" grid from artboard 1d.
 *
 * This is agency-wide, not service-specific, so every /services/[slug] page
 * renders the same four steps — including the five services whose deliverables
 * and packages the design never detailed.
 */
export type ProcessStep = {
  number: string;
  title: string;
  window: string;
  description: string;
};

export const first90Days = [
  {
    number: "01",
    title: "Immersion",
    window: "Week 1–2",
    description: "Two weeks inside your brand, category and audience data.",
  },
  {
    number: "02",
    title: "Blueprint",
    window: "Week 3",
    description:
      "Channel plan, content pillars and the metrics we'll be judged on.",
  },
  {
    number: "03",
    title: "Ignition",
    window: "Week 4–6",
    description: "First shoot, first drops, first paid tests live in market.",
  },
  {
    number: "04",
    title: "Compound",
    window: "Week 7–12",
    description: "Double down on winners, cut the rest, scale spend.",
  },
] as const satisfies readonly ProcessStep[];

export const PROCESS_TITLE = "How the first 90 days go";
