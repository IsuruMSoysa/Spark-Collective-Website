import type { NumberedItem } from "./types";

/**
 * Brand doc §5 — "HOW WE WORK", verbatim.
 *
 * This replaces the previous "first 90 days" content, which had invented week
 * windows the doc has no equivalent for.
 */
export const HOW_WE_WORK = {
  eyebrow: "How we work",
  title: "From idea to impact.",
} as const;

export const howWeWork = [
  {
    number: "01",
    title: "Discover",
    body: ["We get inside the brand, audience, category and objective."],
  },
  {
    number: "02",
    title: "Strategise",
    body: ["We define the opportunity, creative direction and success metrics."],
  },
  {
    number: "03",
    title: "Create",
    body: ["Creators, creatives and production come together to make the work."],
  },
  {
    number: "04",
    title: "Launch",
    body: [
      "We publish, distribute and put the work in front of the right audience.",
    ],
  },
  {
    number: "05",
    title: "Optimise",
    body: ["We look at what happened, learn quickly and improve."],
  },
  {
    number: "06",
    title: "Scale",
    body: ["When something works, we do more of it."],
  },
] as const satisfies readonly NumberedItem[];
