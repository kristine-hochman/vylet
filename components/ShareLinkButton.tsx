"use client";

import { useState } from "react";
import { trackTripLinkCopied } from "@/lib/analytics";

export function ShareLinkButton() {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    await navigator.clipboard.writeText(window.location.href);
    trackTripLinkCopied();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
    >
      {copied ? "Copied! ✅" : "Copy invite link 🔗"}
    </button>
  );
}
