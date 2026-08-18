import {
  buildDefaultTiers,
  socialManagementPackages,
  type PackageTier,
} from "./packages";

/**
 * The six disciplines. Table rows (number / name / description / priceHint) are
 * verbatim from artboard 1a. Artboard 1d only details Social Management.
 *
 * AUTHORED — not from artboard: `headline`, `blurb` and `deliverables` for
 * services 02–06. These are descriptive capability statements, deliberately
 * free of figures or claims. Review with the client before launch.
 */
export type Deliverable = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  /** Display only — '01'…'06'. */
  number: string;
  name: string;
  /** Homepage table row + services index. */
  description: string;
  /** Display string from the artboard: 'From $6K/mo', 'Per campaign'. */
  priceHint: string;
  /** Structured starting figure, only where the design states one. */
  priceFrom?: string;
  cadence?: string;
  /** Detail page H1. */
  headline: string;
  /** Detail page header, right column. */
  blurb: string;
  deliverables: readonly Deliverable[];
  packages?: readonly PackageTier[];
};

export const services = [
  {
    slug: "social-management",
    number: "01",
    name: "Social Management",
    description:
      "Always-on channel strategy, calendars, community and reporting — run by humans who know your category.",
    priceHint: "From $6K/mo",
    priceFrom: "$6K",
    cadence: "/ month",
    headline: "An always-on engine, not a posting schedule",
    blurb:
      "Strategy, production, community and reporting under one retainer — with a named team you can actually call.",
    deliverables: [
      {
        title: "16–24 native posts",
        description:
          "Vertical video, carousels and stills built per platform — never cross-posted.",
      },
      {
        title: "Community management",
        description: "Replies, DMs and escalation inside four working hours.",
      },
      {
        title: "One production day",
        description: "A studio or on-site shoot that banks a month of assets.",
      },
      {
        title: "Monthly performance review",
        description:
          "A live 45-minute read-out with what we're changing next.",
      },
    ],
    packages: socialManagementPackages,
  },
  {
    slug: "paid-performance",
    number: "02",
    name: "Paid & Performance",
    description:
      "Meta, TikTok, YouTube and programmatic buying with creative testing built into the media plan.",
    priceHint: "From $8K/mo",
    priceFrom: "$8K",
    cadence: "/ month",
    headline: "Media that earns its budget back",
    blurb:
      "One budget, bought across every platform that matters, with creative testing treated as part of the media plan rather than an afterthought.",
    deliverables: [
      {
        title: "Full-funnel media buying",
        description:
          "Meta, TikTok, YouTube and programmatic planned and bought as a single budget.",
      },
      {
        title: "Creative testing in the plan",
        description:
          "New hooks and cuts shipped weekly and judged on spend efficiency, not opinion.",
      },
      {
        title: "Tracking hygiene",
        description:
          "Pixel, conversions API and UTM discipline so the numbers survive scrutiny.",
      },
      {
        title: "Weekly pacing report",
        description: "Spend, cost per acquisition, and where budget moves next.",
      },
    ],
  },
  {
    slug: "creator-campaigns",
    number: "03",
    name: "Creator Campaigns",
    description:
      "Casting, negotiation, briefing and whitelisting across a vetted roster of 900+ creators.",
    priceHint: "Per campaign",
    headline: "The right creators, properly managed",
    blurb:
      "Casting matched on audience rather than follower count, then contracted, briefed and amplified without you chasing anyone.",
    deliverables: [
      {
        title: "Casting from a vetted roster",
        description:
          "Shortlists drawn from 900+ creators, matched on audience rather than follower count.",
      },
      {
        title: "Negotiation and contracting",
        description:
          "Rates, usage, exclusivity and deliverables handled end to end.",
      },
      {
        title: "Briefs creators actually use",
        description:
          "One page, written for the platform rather than for the brand deck.",
      },
      {
        title: "Whitelisting and amplification",
        description:
          "The strongest organic cuts put behind spend with the creator's handle attached.",
      },
    ],
  },
  {
    slug: "content-studio",
    number: "04",
    name: "Content Studio",
    description:
      "In-house shoots, edit and motion. Monthly drops of vertical video built for the feed, not the boardroom.",
    priceHint: "Day rates",
    headline: "A month of assets in a single day",
    blurb:
      "Repeatable vertical formats, shot fast and cut for the platform they'll actually be watched on.",
    deliverables: [
      {
        title: "Monthly production day",
        description:
          "A studio or on-site shoot that banks a month of vertical assets.",
      },
      {
        title: "Edit and motion",
        description:
          "Platform-native cuts, captions and graphics — never one edit resized five ways.",
      },
      {
        title: "Format development",
        description:
          "Repeatable series built to be shot quickly and watched to the end.",
      },
      {
        title: "Library and handover",
        description: "Everything delivered organised, licensed and yours to keep.",
      },
    ],
  },
  {
    slug: "live-experiential",
    number: "05",
    name: "Live & Experiential",
    description:
      "Launches, activations and tours — production, staging, run-of-show and the content team that covers it.",
    priceHint: "Project",
    headline: "Moments people film and post",
    blurb:
      "Production, staging and run-of-show handled by a named producer, with a content team on site turning the day into a month of footage.",
    deliverables: [
      {
        title: "Production and staging",
        description:
          "Site, build, power, sound and vision managed by a named producer.",
      },
      {
        title: "Run-of-show and crew",
        description: "Schedules, stage management and the people to hold them.",
      },
      {
        title: "On-site content team",
        description:
          "A shooter and editor capturing the event as it happens, cut same day.",
      },
      {
        title: "Permits and suppliers",
        description:
          "Licensing, insurance and vendor wrangling handled before you ask.",
      },
    ],
  },
  {
    slug: "talent-booking",
    number: "06",
    name: "Talent & Booking",
    description:
      "DJs, hosts, artists and speakers — booked, contracted and managed end to end for your event.",
    priceHint: "Roster",
    headline: "Booked, papered, and on stage on time",
    blurb:
      "Talent matched to the room and the budget, then advanced and managed from first offer to final settlement.",
    deliverables: [
      {
        title: "Roster access",
        description:
          "DJs, hosts, artists and speakers matched to the room and the budget.",
      },
      {
        title: "Offers and contracting",
        description:
          "Fees, riders, travel and cancellation terms negotiated and papered.",
      },
      {
        title: "Advance and logistics",
        description:
          "Flights, hotels, ground, tech spec and day sheets confirmed ahead of time.",
      },
      {
        title: "On-the-day management",
        description: "A booker on site or on call from soundcheck to settlement.",
      },
    ],
  },
] as const satisfies readonly Service[];

export type ServiceSlug = (typeof services)[number]["slug"];

export const serviceSlugs: readonly string[] = services.map((s) => s.slug);

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicePackages(service: Service): readonly PackageTier[] {
  return service.packages ?? buildDefaultTiers(service);
}

/**
 * Marquee strip on the homepage. Derived from `services` so the two can never
 * drift; the artboard's strip says "Live Events" and "Paid Performance" where
 * the table says "Live & Experiential" and "Paid & Performance", so the two
 * shortened labels are overridden explicitly.
 */
const MARQUEE_LABEL_OVERRIDES: Record<string, string> = {
  "paid-performance": "Paid Performance",
  "live-experiential": "Live Events",
};

export const marqueeItems: readonly string[] = services.map(
  (s) => MARQUEE_LABEL_OVERRIDES[s.slug] ?? s.name
);
