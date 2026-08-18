"use client";

import { useEffect } from "react";
import { cn } from "@/lib/cn";
import { THEME_COLORS, THEME_STORAGE_KEY } from "@/lib/site";

type Theme = "dark" | "light";

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[next]);
}

/**
 * Holds no theme state. The current theme lives in a data-attribute on <html>
 * (stamped by the pre-paint script in the root layout) and both labels are
 * rendered as real text with CSS choosing which is visible — see .theme-label
 * in globals.css. That keeps the server and client markup identical, so there
 * is nothing to mismatch and no flicker after mount.
 */
export function ThemeToggle({ className }: { className?: string }) {
  // Follow the OS live, but only while the user has made no explicit choice.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");

    const onChange = () => {
      try {
        if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      } catch {
        // localStorage can throw in hardened privacy modes; fall through.
      }
      applyTheme(query.matches ? "light" : "dark");
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next: Theme =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";

    applyTheme(next);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Choice simply won't persist; the toggle still works for this session.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "t-label inline-flex items-center gap-2 rounded-pill border border-line px-3 py-2",
        "text-fg2 transition-colors hover:border-line2 hover:text-fg",
        className
      )}
    >
      <span aria-hidden="true" className="size-2 rounded-full bg-orange" />
      <span className="sr-only">Switch colour theme, currently</span>
      {/* Title case in the DOM, uppercased by .t-label: caps in the source make
          some screen readers spell short words out letter by letter. */}
      <span className="theme-label theme-label--dark">Dark</span>
      <span className="theme-label theme-label--light">Light</span>
    </button>
  );
}
