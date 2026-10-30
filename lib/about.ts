import { CTA } from "./microcopy";
import type {
  CtaContent,
  MediaAsset,
  NumberedItem,
  Statement,
} from "./types";

/**
 * About page content — brand doc §4, verbatim.
 *
 * There is deliberately no team roster here. §4 defines five blocks and none of
 * them is a team section; the previous roster was invented names, two of whose
 * roles ("Exec Producer / Live", "Talent & Booking") §12 removes outright. Add
 * one back only with real names and real portraits.
 */
export const ABOUT_EYEBROW = "About Spark";

export const ABOUT_HEADLINE =
  "We believe brands should be part of culture — not interrupt it.";

export const ABOUT_BODY = [
  "Spark Collective is a creator-led social and content agency built for brands competing for attention in a world where everyone is publishing.",
  "We combine strategy, creative thinking, creators, production and performance to build work that people notice.",
  "No unnecessary layers. No endless decks. No content for the sake of content.",
  "Just good ideas, made well, put in the right places and measured against what matters.",
] as const;

export const ABOUT_PHOTO: MediaAsset = {
  id: "studio-photo",
  label: "Studio photo — 4:3",
  ratio: "4:3",
};

/** §4 — OUR APPROACH */
export const APPROACH_TITLE = "Our approach";

export const approach = [
  {
    number: "01",
    title: "Start with the audience.",
    body: [
      "Before we make anything, we figure out who we're talking to, what they care about and why they should care about your brand.",
    ],
  },
  {
    number: "02",
    title: "Find the idea.",
    body: [
      "Then we turn the objective into something worth paying attention to.",
    ],
  },
  {
    number: "03",
    title: "Make it native.",
    body: [
      "The best brand content doesn't feel like an interruption.",
      "It belongs on the platform. It speaks the language of the audience.",
    ],
  },
  {
    number: "04",
    title: "Put it in the right hands.",
    body: [
      "Creators bring trust, personality and communities that brands can't manufacture.",
      "We match brands with creators for relevance — not just follower counts.",
    ],
  },
  {
    number: "05",
    title: "Make it perform.",
    body: [
      "We learn from the data, improve the work and put more behind what works.",
    ],
  },
] as const satisfies readonly NumberedItem[];

/** §4 — OUR PRINCIPLES */
export const PRINCIPLES_TITLE = "Our principles";

export const principles = [
  {
    number: "01",
    title: "People First",
    body: [
      "Algorithms change. Platforms change.",
      "People are the constant. We create for humans first.",
    ],
  },
  {
    number: "02",
    title: "Make. Learn. Repeat.",
    body: [
      "The first version doesn't need to be perfect. It needs to exist.",
      "We move quickly, learn from the response and make the next version better.",
    ],
  },
  {
    number: "03",
    title: "Creativity Needs a Purpose",
    body: [
      "Beautiful work is nice. Effective work is better.",
      "Every idea should have a reason to exist.",
    ],
  },
  {
    number: "04",
    title: "Creators Deserve Respect",
    body: [
      "Creators aren't just distribution channels. They're creative partners.",
      "We build campaigns that give them room to do what they do best.",
    ],
  },
  {
    number: "05",
    title: "No Unnecessary Complexity",
    body: [
      "Good work shouldn't require a hundred meetings.",
      "Clear thinking. Clear communication. Fast execution.",
    ],
  },
] as const satisfies readonly NumberedItem[];

/** §4 — WHO WE WORK WITH */
export const whoWeWorkWith = {
  eyebrow: "Who we work with",
  headline: "Brands that want to matter.",
  stanzas: [
    {
      lines: [
        "We work with brands that want to grow, launch, reposition or simply become more relevant.",
      ],
    },
    {
      lines: [
        "From ambitious startups to established brands, we build the right combination of strategy, creators, content and distribution for the job.",
      ],
    },
  ],
} as const satisfies Statement;

/** §4 — ABOUT CTA */
export const aboutCta = {
  title: "Have something worth saying?",
  copy: "Let's make sure people hear it.",
  ctaLabel: CTA.talkToSpark,
  ctaHref: "/contact",
} as const satisfies CtaContent;
