"use client";

import { SITE } from "@/lib/constants/site";

/* ── Instagram glyph ─────────────────────────────────────────── */

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ── Footer ───────────────────────────────────────────────────── */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-10 py-8">
      <div className="mx-auto w-full max-w-[1360px]">
        {/* Separator */}
        <div className="border-t border-ink-300/30 mb-8" />

        <div className="flex flex-col items-center gap-4">
          {/* Mono credit line */}
          <p className="eyebrow-mono text-ink-500 text-center">
            MITHUN &middot; {year} &middot; MADE WITH TOO MUCH FILTER COFFEE{" "}
            <span aria-label="coffee">&#9749;</span> &middot; COIMBATORE, IN
          </p>

          {/* Instagram link */}
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-ink-500 hover:text-flame-500 transition-colors"
          >
            <InstagramIcon size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
