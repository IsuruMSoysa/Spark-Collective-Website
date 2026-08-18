"use client";

import { useEffect, useRef, useState } from "react";
import {
  PillButton,
  type PillShape,
  type PillSize,
  type PillVariant,
} from "./Pill";

type Status = "idle" | "copied" | "error";

/**
 * navigator.clipboard is undefined on non-secure origins other than localhost —
 * exactly what happens when someone previews the site over the LAN on http — so
 * this checks isSecureContext rather than merely feature-testing, and falls back
 * to an off-screen textarea.
 */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }

  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", ""); // stops iOS opening the keyboard
    area.style.cssText = "position:fixed;top:-1000px;opacity:0";
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, text.length); // iOS Safari needs the explicit range
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

export function CopyButton({
  text,
  label = "Copy text",
  copiedLabel = "Copied!",
  variant = "outline",
  size = "md",
  shape = "pill",
  className,
  onFailure,
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  variant?: PillVariant;
  size?: PillSize;
  shape?: PillShape;
  className?: string;
  /** Called when both clipboard paths fail, so the caller can reveal the text. */
  onFailure?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear the pending reset so no state is set after unmount.
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  async function onClick() {
    const ok = await copyText(text);
    setStatus(ok ? "copied" : "error");
    if (!ok) onFailure?.();

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <>
      <PillButton
        onClick={onClick}
        variant={variant}
        size={size}
        shape={shape}
        className={className}
        // Stable accessible name while the visible label swaps.
        aria-label={label}
      >
        {status === "copied"
          ? copiedLabel
          : status === "error"
            ? "Press Ctrl+C"
            : label}
      </PillButton>

      <span aria-live="polite" className="sr-only">
        {status === "copied"
          ? "Brief copied to clipboard"
          : status === "error"
            ? "Copy failed — the text is selectable below"
            : ""}
      </span>
    </>
  );
}
