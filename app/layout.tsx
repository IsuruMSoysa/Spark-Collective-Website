import type { Metadata, Viewport } from "next";
import { Archivo, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { WhatsAppFloat } from "@/components/chrome/WhatsAppFloat";
import { SITE, THEME_COLORS, THEME_STORAGE_KEY } from "@/lib/site";
import "./globals.css";

/**
 * All three families are variable on Google Fonts. `weight` is omitted
 * deliberately — that is what selects the variable file and yields the full
 * wght range in one download. Passing a range like '400 900' throws
 * `Unknown weight` at build (ranges are a next/font/local feature), and
 * `axes` must not be passed either: it selects axes IN ADDITION to wght, and
 * the validator rejects 'wght' itself. Omitting it also leaves Archivo's
 * wdth 62–125 axis undownloaded, which the design does not use.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Social, content and live entertainment`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: "/",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  // No `icons.apple` override: it previously pointed at public/2.png, which is a
  // 4000x4000 / 3.4 MB PNG — an unacceptable apple-touch-icon. app/favicon.ico
  // is picked up automatically by the file convention. To restore a proper touch
  // icon, add a 180x180 app/apple-icon.png (see Open items).
};

/**
 * A single unconditional theme-color, patched by ThemeToggle. Media-scoped
 * pairs would track the OS rather than the user's explicit choice.
 */
export const viewport: Viewport = {
  themeColor: THEME_COLORS.dark,
};

/**
 * Runs during HTML parse, before any content paints, so there is no flash of
 * the wrong palette. Note the test is for `light` positively, which makes
 * no-preference resolve to dark — the correct polarity for a dark-first brand.
 *
 * Must be a raw inline script: next/script's beforeInteractive is for `src`
 * scripts and explicitly does not block hydration.
 */
const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});var t=(s==="light"||s==="dark")?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?${JSON.stringify(
  THEME_COLORS.light
)}:${JSON.stringify(
  THEME_COLORS.dark
)});}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // The script below stamps data-theme before React hydrates, producing an
      // attribute the server render does not contain. suppressHydrationWarning
      // applies one level deep only — exactly the scope needed — and does not
      // disable hydration.
      suppressHydrationWarning
      // Next 16 no longer forces scroll-behavior:auto during client
      // navigations. Without this, every route change animates a smooth scroll
      // instead of jumping to the top.
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      {/* No overflow-x-hidden here: it makes the scroll container <html> and
          breaks the sticky site header. globals.css uses overflow-x: clip. */}
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
