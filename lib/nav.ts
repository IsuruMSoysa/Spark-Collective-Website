import type { Route } from "next";
import { CONTACT_EMAIL, getWhatsAppUrl } from "./contact";

export type NavItem = {
  href: Route;
  label: string;
};

/**
 * Brand doc §2 / §8 — five items, Home first.
 *
 * With `typedRoutes: true` a link to a nonexistent route fails type-check, which
 * is exactly the guardrail we want here; do not add placeholder routes to
 * satisfy it.
 */
export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
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
 * Brand doc §9. The doc lists the pages in a different order to the nav (Work
 * first), which is kept — a footer is a directory, not a journey.
 */
export const footerColumns: readonly FooterColumn[] = [
  {
    heading: "Site",
    items: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Contact",
    items: [
      {
        label: CONTACT_EMAIL,
        href: `mailto:${CONTACT_EMAIL}`,
        external: true,
      },
      { label: "WhatsApp", href: getWhatsAppUrl(), external: true },
    ],
  },
];

export type SocialLink = {
  label: string;
  href: string;
};

/**
 * Brand doc §9 lists Instagram, TikTok and LinkedIn but gives no URLs.
 *
 * TODO-CONFIRM: add the real profile URLs here, e.g.
 *   { label: "Instagram", href: "https://instagram.com/…" },
 *   { label: "TikTok",    href: "https://tiktok.com/@…"  },
 *   { label: "LinkedIn",  href: "https://linkedin.com/company/…" },
 *
 * Left empty deliberately — SiteFooter renders nothing for an empty list, which
 * is better than shipping three links that go nowhere.
 */
export const socialLinks: readonly SocialLink[] = [];
