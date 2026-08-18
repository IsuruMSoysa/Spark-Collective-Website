import type { MediaAsset } from "./types";

/**
 * About page content, verbatim from artboard 1f.
 *
 * TODO-CONFIRM: the founding year, headcount and company history below are
 * mockup copy. The artboard also captioned the team grid "Austin · London ·
 * Remote"; that line is omitted rather than shipped, since those locations are
 * invented (see lib/contact.ts for the same reasoning applied to addresses).
 */
export type Principle = {
  number: string;
  title: string;
  description: string;
};

/** Keep beside the headline below so the written-out number can't drift. */
export const TEAM_SIZE = 22;

export const ABOUT_EYEBROW = "About";

export const ABOUT_HEADLINE = "Twenty-two people who'd rather make than meet";

export const ABOUT_BODY = [
  "Spark Collective started in 2019 as three freelancers sharing a rented edit suite and a stubborn belief: brands don't need more decks, they need more output. Seven years later we're a full studio — strategists, editors, producers and bookers under one roof, still allergic to slow.",
] as const;

export const ABOUT_PHOTO: MediaAsset = {
  id: "studio-photo",
  label: "Studio photo — 4:3",
  ratio: "4:3",
};

export const principles = [
  {
    number: "01",
    title: "Make it, then measure it",
    description:
      "We'd rather ship ten cuts and learn than debate one for a month.",
  },
  {
    number: "02",
    title: "No junior bait-and-switch",
    description:
      "The people in the pitch are the people on your account. Always.",
  },
  {
    number: "03",
    title: "Loud, never careless",
    description:
      "Attention is easy to buy badly. We go big with a plan behind it.",
  },
] as const satisfies readonly Principle[];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: MediaAsset;
};

/**
 * Annotated rather than `as const satisfies`: nothing derives a literal union
 * from this list, and the literal form would drop the optional `src`/`alt` keys
 * from each photo's type until real imagery is added.
 */
export const team: readonly TeamMember[] = [
  {
    id: "maya-okonkwo",
    name: "Maya Okonkwo",
    role: "Founder / Strategy",
    photo: { id: "team-maya", label: "Portrait — 3:4", ratio: "3:4" },
  },
  {
    id: "deniz-aydin",
    name: "Deniz Aydın",
    role: "Creative Director",
    photo: { id: "team-deniz", label: "Portrait — 3:4", ratio: "3:4" },
  },
  {
    id: "priya-raman",
    name: "Priya Raman",
    role: "Head of Paid",
    photo: { id: "team-priya", label: "Portrait — 3:4", ratio: "3:4" },
  },
  {
    id: "luis-ferreira",
    name: "Luis Ferreira",
    role: "Exec Producer / Live",
    photo: { id: "team-luis", label: "Portrait — 3:4", ratio: "3:4" },
  },
  {
    id: "tess-ngata",
    name: "Tess Ngata",
    role: "Talent & Booking",
    photo: { id: "team-tess", label: "Portrait — 3:4", ratio: "3:4" },
  },
];

export const HIRING_HEADLINE = "We're hiring editors and producers";
