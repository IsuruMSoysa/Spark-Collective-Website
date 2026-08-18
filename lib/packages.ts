/**
 * Package tiers for the /services/[slug] "PACKAGES" panel (artboard 1d).
 *
 * The design only prices Social Management. Rather than invent dollar figures
 * for the other five disciplines — a business decision, and a liability to
 * guess — services without authored packages fall back to
 * `buildDefaultTiers()`, which keeps the same three-card shell and tier names
 * but states only what is actually known.
 */
export type PackageTier = {
  id: string;
  name: string;
  /** Display string: '$6K', 'Scoped', 'Custom'. Never a number. */
  price: string;
  /** Small print under the price: '/ month', "Let's talk". */
  cadence: string;
  summary: string;
  /** Orange border treatment. */
  featured?: boolean;
  badge?: string;
};

/** Verbatim from artboard 1d. */
export const socialManagementPackages = [
  {
    id: "signal",
    name: "Signal",
    price: "$6K",
    cadence: "/ month",
    summary: "2 channels · 16 posts · 1 shoot day",
  },
  {
    id: "surge",
    name: "Surge",
    price: "$11K",
    cadence: "/ month",
    summary: "4 channels · 24 posts · 2 shoot days · paid",
    featured: true,
    badge: "Most picked",
  },
  {
    id: "wildfire",
    name: "Wildfire",
    price: "Custom",
    cadence: "Let's talk",
    summary: "Full stack · creators · events · embedded team",
  },
] as const satisfies readonly PackageTier[];

/** Verbatim from artboard 1d. */
export const PACKAGES_NOTE =
  "Three-month minimum. No lock-in after that — if it isn't working, you shouldn't be paying for it.";

/**
 * Structural fallback for services the design never priced. Tier 1 shows the
 * real starting figure when the design states one, otherwise "Scoped".
 * No invented numbers.
 */
export function buildDefaultTiers(input: {
  priceFrom?: string;
  cadence?: string;
}): readonly PackageTier[] {
  return [
    {
      id: "signal",
      name: "Signal",
      price: input.priceFrom ?? "Scoped",
      cadence: input.priceFrom ? (input.cadence ?? "/ month") : "Per brief",
      summary: "A single focused workstream, scoped to one objective.",
    },
    {
      id: "surge",
      name: "Surge",
      price: "Scoped",
      cadence: "Per brief",
      summary: "Multi-channel delivery with a named team and a reporting line.",
    },
    {
      id: "wildfire",
      name: "Wildfire",
      price: "Custom",
      cadence: "Let's talk",
      summary: "Full stack · creators · events · embedded team",
      featured: true,
      badge: "Most flexible",
    },
  ];
}
