import type { Route } from "next";
import { CAREERS_EMAIL, NEW_BUSINESS_EMAIL, getWhatsAppUrl } from "./contact";

export type NavItem = {
  href: Route;
  label: string;
};

/**
 * Artboard 1a's nav read Work / Services / Studio / About / Journal.
 *
 * `Studio` and `Journal` have no artboards, so they are dropped rather than
 * shipped as dead links, and `Contact` is added — artboard 1g exists but the
 * nav never listed it. With `typedRoutes: true` a link to a nonexistent route
 * fails type-check, which is exactly the guardrail we want here; do not add
 * placeholder routes to satisfy it.
 */
export const primaryNav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const satisfies readonly NavItem[];

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  heading: string;
  items: readonly FooterLink[];
};

/**
 * The artboard's CONTACT column carried a +1 (555) phone number and an
 * "Austin · London" line. Both are invented; they are replaced by the real
 * WhatsApp channel. See lib/contact.ts.
 */
export const footerColumns: readonly FooterColumn[] = [
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/about#team" },
      { label: "Careers", href: `mailto:${CAREERS_EMAIL}`, external: true },
    ],
  },
  {
    heading: "Services",
    items: [
      { label: "Social", href: "/services/social-management" },
      { label: "Paid", href: "/services/paid-performance" },
      { label: "Creators", href: "/services/creator-campaigns" },
      { label: "Events", href: "/services/live-experiential" },
    ],
  },
  {
    heading: "Contact",
    items: [
      {
        label: NEW_BUSINESS_EMAIL,
        href: `mailto:${NEW_BUSINESS_EMAIL}`,
        external: true,
      },
      { label: "WhatsApp", href: getWhatsAppUrl(), external: true },
      { label: "Work", href: "/work" },
    ],
  },
];

/** Verbatim from artboard 1a's footer. */
export const FOOTER_BLURB =
  "Social, content and live entertainment. Built for brands with something to say.";
