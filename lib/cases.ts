import type { MediaAsset, Stat } from "./types";

/**
 * Case studies.
 *
 * Artboard 1a's "Receipts" grid names three; artboard 1e fully writes only the
 * beverage launch. `detail` is therefore optional and the other two are NOT
 * authored: fabricating client results ("480K followers", "4.1× ROAS") for a
 * real agency is a trust and disclosure problem, not a content gap to paper
 * over. Cases without `detail` render as non-linked cards, so nothing dead
 * ships — see getCaseNeighbors / detailedCases below.
 *
 * TODO-CONFIRM: every figure here is mockup content.
 */
export type CaseMetaRow = {
  label: string;
  value: string;
};

export type CaseQuote = {
  quote: string;
  attribution: string;
};

export type CaseDetail = {
  eyebrow: string;
  hero: MediaAsset;
  /** The four-column metrics bar. */
  metrics: readonly Stat[];
  meta: readonly CaseMetaRow[];
  lead: string;
  body: readonly string[];
  assets: readonly MediaAsset[];
  quote: CaseQuote;
};

export type Case = {
  slug: string;
  client: string;
  category: string;
  year: string;
  headline: string;
  cardMedia: MediaAsset;
  /** Shown on the featured homepage card. */
  cardMetrics: readonly Stat[];
  detail?: CaseDetail;
};

export const cases = [
  {
    slug: "beverage-national-launch",
    client: "Confidential RTD brand",
    category: "Beverage / National launch",
    year: "2026",
    headline: "From zero to 480K followers in one summer",
    cardMedia: {
      id: "beverage-card",
      label: "Campaign hero — 16:10",
      ratio: "16:10",
    },
    cardMetrics: [
      { value: "480K", label: "New followers" },
      { value: "6.2%", label: "Engagement" },
      { value: "4.1×", label: "ROAS" },
    ],
    detail: {
      eyebrow: "Case study / Beverage / 2026",
      hero: {
        id: "beverage-hero",
        label: "Case hero image — 16:5",
        ratio: "16:5",
      },
      metrics: [
        { value: "480", unit: "K", label: "New followers" },
        { value: "31", unit: "M", label: "Organic impressions" },
        { value: "6.2", unit: "%", label: "Avg engagement rate" },
        { value: "4.1", unit: "×", label: "Blended ROAS" },
      ],
      meta: [
        { label: "Client", value: "Confidential RTD brand" },
        { label: "Services", value: "Social · Creators · Paid · Live" },
        { label: "Timeline", value: "May – September 2026" },
        { label: "Team", value: "7 people" },
      ],
      lead: "A regional drinks brand with no social presence wanted national shelf demand before their retail listing went live. We had fourteen weeks.",
      body: [
        "We built the channel from scratch around a single format — a 20-second, one-take taste reaction shot in-situ at bars, beaches and festivals. Forty-two creators, a two-week shoot sprint, then a paid layer that put the best-performing organic cuts behind spend within 48 hours of posting.",
        "The live layer mattered as much as the feed: three weekend activations produced the footage that fed the next four weeks of content, so production cost per asset fell by 61% across the campaign.",
      ],
      assets: [
        { id: "beverage-a1", label: "Asset 01 — 4:5", ratio: "4:5" },
        { id: "beverage-a2", label: "Asset 02 — 4:5", ratio: "4:5" },
        { id: "beverage-a3", label: "Asset 03 — 4:5", ratio: "4:5" },
        { id: "beverage-a4", label: "Asset 04 — 4:5", ratio: "4:5" },
      ],
      quote: {
        quote:
          "We walked into the retail meeting with a waitlist instead of a pitch deck. That's what Spark did for us.",
        attribution: "VP Marketing · RTD beverage brand",
      },
    },
  },
  {
    slug: "festival-live",
    client: "Festival client",
    category: "Festival / Live",
    year: "2026",
    headline: "Three stages, 22 creators, 31M impressions",
    cardMedia: { id: "festival-card", label: "Festival — 4:3", ratio: "4:3" },
    cardMetrics: [],
    // No `detail`: awaiting real write-up and results from the client.
  },
  {
    slug: "fintech-always-on",
    client: "Consumer fintech",
    category: "Fintech / Always-on",
    year: "2026",
    headline: "Cutting CPA 44% with creator-led paid",
    cardMedia: { id: "fintech-card", label: "Fintech — 4:3", ratio: "4:3" },
    cardMetrics: [],
    // No `detail`: awaiting real write-up and results from the client.
  },
] as const satisfies readonly Case[];

export type CaseSlug = (typeof cases)[number]["slug"];

/**
 * Widened view of `cases`. `as const satisfies` keeps literal types — which is
 * what makes CaseSlug useful — but that means the members without a `detail`
 * key have no such property to read. Everything below works off this instead.
 */
const allCases: readonly Case[] = cases;

/** Only these get a /work/[slug] page and a clickable card. */
export const detailedCases: readonly Case[] = allCases.filter(
  (c) => c.detail !== undefined
);

export const detailedCaseSlugs: readonly string[] = detailedCases.map(
  (c) => c.slug
);

export function getCaseBySlug(slug: string): Case | undefined {
  return allCases.find((c) => c.slug === slug);
}

export function hasDetail(
  c: Case
): c is Case & { detail: NonNullable<Case["detail"]> } {
  return c.detail !== undefined;
}

/**
 * Prev/next for the case footer, wrapping around so the nav is never
 * half-empty. Walks only the cases that actually have pages, and returns
 * nothing when there is just one — a self-referential prev/next is worse than
 * an absent one.
 */
export function getCaseNeighbors(slug: string): {
  prev?: Case;
  next?: Case;
} {
  const list = detailedCases;
  if (list.length < 2) return {};

  const i = list.findIndex((c) => c.slug === slug);
  if (i === -1) return {};

  return {
    prev: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
}
