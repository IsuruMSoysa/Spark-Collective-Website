import type {
  CtaContent,
  MediaAsset,
  NumberedItem,
  Stat,
  Statement,
} from "./types";
import { CTA } from "./microcopy";

/**
 * Homepage content — brand doc §3, verbatim.
 *
 * TODO-CONFIRM: `homeStats` uses the doc's own suggested starting figures. Both
 * §3 ("Replace these with verified figures if the actual numbers differ") and
 * §12 ("Use only verified numbers") ask for these to be confirmed before launch.
 */
export const heroEyebrow = "Creator-led social & content";

export const heroBlurb =
  "Spark Collective builds social presence, creator campaigns and content that get people to stop, watch, share and remember.";

/** `unit` renders in the accent colour — the "10+" / "10M+" treatment. */
export const homeStats = [
  { value: "10", unit: "+", label: "Brands Worked With" },
  { value: "30", unit: "+", label: "Creator Collaborations" },
  { value: "50", unit: "+", label: "Campaigns & Projects" },
  { value: "10", unit: "M+", label: "Campaign Views" },
] as const satisfies readonly Stat[];

/**
 * The 5-up reel strip. `highlight` is available to feature one tile with a
 * gradient treatment once there is a real hero reel to feature; it is unused
 * while every slot is still a placeholder.
 */
export type Reel = MediaAsset & {
  highlight?: string;
};

export const reels: readonly Reel[] = [
  { id: "reel-01", label: "Reel 01 — 9:16", ratio: "9:13" },
  { id: "reel-02", label: "Reel 02 — 9:16", ratio: "9:13" },
  { id: "reel-03", label: "Reel 03 — 9:16", ratio: "9:13" },
  { id: "reel-04", label: "Reel 04 — 9:16", ratio: "9:13" },
  { id: "reel-05", label: "Reel 05 — 9:16", ratio: "9:13" },
];

/** §3 — THE PROBLEM */
export const problemSection = {
  headline: "Your audience isn't waiting for another ad.",
  stanzas: [
    { lines: ["They're scrolling."] },
    {
      lines: [
        "They're watching creators.",
        "They're sharing things with their friends.",
        "They're discovering brands through people they trust.",
      ],
    },
    { lines: ["So we build brands for that reality."] },
    {
      lines: [
        "Not around what brands want to say.",
        "Around what people actually want to watch.",
      ],
    },
  ],
} as const satisfies Statement;

/** §3 — CREATOR ADVANTAGE */
export const creatorAdvantage = {
  headline: "Creators aren't media space. They're the media.",
  stanzas: [
    {
      lines: [
        "The right creator can make a brand feel native to a community in a way traditional advertising can't.",
      ],
    },
    {
      lines: [
        "We work across creators, formats and platforms to find the people who can make your brand matter to the audience you're trying to reach.",
      ],
    },
  ],
} as const satisfies Statement;

/** The process line under Creator Advantage. */
export const creatorFlow: readonly string[] = [
  "Strategy",
  "Casting",
  "Briefing",
  "Production",
  "Publishing",
  "Amplification",
  "Reporting",
];

/** §3 — CONTENT SECTION */
export const contentSection = {
  headline: "Built for the feed. Not the boardroom.",
  stanzas: [
    {
      lines: [
        "We don't make content just because the calendar says it's time to post.",
      ],
    },
    { lines: ["We create content with a job to do."] },
    {
      display: true,
      lines: [
        "Stop the scroll.",
        "Build desire.",
        "Start conversations.",
        "Drive action.",
      ],
    },
    {
      lines: [
        "Short-form video, social campaigns, photography, motion, UGC and everything in between.",
      ],
    },
  ],
} as const satisfies Statement;

/** §3 — PERFORMANCE SECTION */
export const performanceSection = {
  headline: "Attention is great. Results are better.",
  stanzas: [
    { lines: ["Every campaign starts with a goal."] },
    {
      display: true,
      lines: ["Awareness.", "Engagement.", "Traffic.", "Leads.", "Sales."],
    },
    {
      lines: [
        "We create, distribute and optimise around the outcome — not vanity metrics.",
      ],
    },
  ],
} as const satisfies Statement;

/** §3 — WHY SPARK */
export const whySpark = {
  headline: "Small enough to care. Serious enough to deliver.",
  stanzas: [
    { lines: ["We don't believe great work comes from adding more layers."] },
    {
      lines: [
        "It comes from the right people, moving quickly, understanding the brief and caring about the result.",
      ],
    },
  ],
} as const satisfies Statement;

export const whySparkPoints = [
  { number: "01", title: "Strategy with creativity." },
  { number: "02", title: "Creators with purpose." },
  { number: "03", title: "Content with a job." },
  { number: "04", title: "Performance with accountability." },
] as const satisfies readonly NumberedItem[];

/** §3 — HOME FINAL CTA */
export const homeCta = {
  title: "Got a brand that deserves more attention?",
  copy: "Let's make something people actually want to watch.",
  ctaLabel: CTA.startConversation,
  ctaHref: "/contact",
} as const satisfies CtaContent;
