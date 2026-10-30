/**
 * The six disciplines — brand doc §3 ("WHAT WE DO"), verbatim.
 *
 * No pricing fields of any kind: §12 forbids package prices, starting prices,
 * monthly rates, per-post rates, creator rates, production rates and retainer
 * rates anywhere on the site. Every engagement routes to a conversation.
 *
 * The doc's prose uses a hyphen where the site's typography uses an em dash;
 * dashes are normalised here for consistency with the rest of the content layer.
 */
export type Service = {
  slug: string;
  /** Display only — '01'…'06'. */
  number: string;
  name: string;
  /** The doc's punch line. Services table cell + the detail page H1. */
  tagline: string;
  /** Body copy. Service 04 is the only one the doc gives two paragraphs. */
  description: readonly string[];
  /** 'Services include:' for most, 'Content includes:' for 03. */
  includesLabel: string;
  includes: readonly string[];
};

export const services = [
  {
    slug: "social-media",
    number: "01",
    name: "Social Media",
    tagline: "Don't just maintain your social presence. Build it.",
    description: [
      "We create and manage social channels that feel alive — from strategy and content planning to publishing, community and optimisation.",
    ],
    includesLabel: "Services include:",
    includes: [
      "Social Strategy",
      "Content Planning",
      "Creative Direction",
      "Platform Management",
      "Copywriting",
      "Publishing",
      "Community Management",
      "Social Listening",
      "Reporting & Optimisation",
    ],
  },
  {
    slug: "creator-campaigns",
    number: "02",
    name: "Creator Campaigns",
    tagline: "The right creator can change the way people see your brand.",
    description: [
      "We build creator campaigns from strategy to execution — finding the right voices, managing partnerships and turning creator influence into measurable brand impact.",
    ],
    includesLabel: "Services include:",
    includes: [
      "Creator Strategy",
      "Creator Discovery & Casting",
      "Campaign Concepts",
      "Creator Briefing",
      "Negotiation & Coordination",
      "Content Approvals",
      "Campaign Management",
      "Paid Amplification",
      "Performance Tracking",
      "Reporting",
    ],
  },
  {
    slug: "content-production",
    number: "03",
    name: "Content Production",
    tagline: "Make content people actually want to watch.",
    description: [
      "Our production approach is built around the realities of social — fast, flexible, platform-native and designed to create more from every opportunity.",
    ],
    includesLabel: "Content includes:",
    includes: [
      "Short-form Video",
      "Reels",
      "TikToks",
      "YouTube Content",
      "Product Content",
      "Brand Films",
      "Photography",
      "UGC",
      "Creator Content",
      "Motion Graphics",
      "Social Campaign Assets",
    ],
  },
  {
    slug: "paid-media",
    number: "04",
    name: "Paid Media & Performance",
    tagline: "Great content deserves distribution.",
    description: [
      "We combine creative and media so your strongest ideas don't disappear after the first post.",
      "We test creative, audiences, formats and messaging to find what moves the numbers.",
    ],
    includesLabel: "Services include:",
    includes: [
      "Paid Social",
      "Campaign Planning",
      "Audience Strategy",
      "Creative Testing",
      "Retargeting",
      "Conversion Campaigns",
      "Performance Optimisation",
      "Reporting & Insights",
    ],
  },
  {
    slug: "creative-strategy",
    number: "05",
    name: "Creative Strategy",
    tagline: "Start with the idea.",
    description: [
      "We turn business objectives into creative territories and campaigns that give people a reason to care.",
    ],
    includesLabel: "Services include:",
    includes: [
      "Brand Campaigns",
      "Social Campaigns",
      "Creative Concepts",
      "Campaign Strategy",
      "Content Strategy",
      "Creative Direction",
      "Platform Strategy",
      "Campaign Architecture",
    ],
  },
  {
    slug: "ugc-creator-content",
    number: "06",
    name: "UGC & Creator Content",
    tagline: "More content. More voices. More ways to connect.",
    description: [
      "We build scalable creator content systems for brands that need a steady stream of authentic, platform-native creative.",
    ],
    includesLabel: "Services include:",
    includes: [
      "UGC Strategy",
      "Creator Sourcing",
      "Content Briefs",
      "Product Seeding",
      "UGC Production",
      "Content Licensing",
      "Paid Usage",
      "Creative Testing",
      "Ongoing Creator Programs",
    ],
  },
] as const satisfies readonly Service[];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Brand doc §5's hero. */
export const SERVICES_PAGE = {
  eyebrow: "What we do",
  title: "Strategy, creators, content and performance.",
  blurb: "One team. One connected system.",
} as const;

/** Brand doc §3's section header for the services table. */
export const WHAT_WE_DO = {
  eyebrow: "What we do",
  title: "Everything your brand needs to win attention.",
  intro:
    "Strategy, creators, content and performance — connected under one roof.",
} as const;

/**
 * Marquee strip on the homepage. Derived from `services` so the two can never
 * drift; two names are too long for the strip and are shortened explicitly.
 */
const MARQUEE_LABEL_OVERRIDES: Record<string, string> = {
  "paid-media": "Paid Media",
  "ugc-creator-content": "UGC & Creators",
};

export const marqueeItems: readonly string[] = services.map(
  (s) => MARQUEE_LABEL_OVERRIDES[s.slug] ?? s.name
);
