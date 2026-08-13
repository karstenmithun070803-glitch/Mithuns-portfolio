"use client";

import { useEffect, useRef } from "react";
import { CLOUD_VIDEO } from "@/lib/constants/site";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function CloudBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduced) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
  }, [reduced]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Sky gradient fallback — always visible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-sky-100) 0%, var(--color-sky-300) 50%, var(--color-sky-500) 100%)",
        }}
      />

      {/* Cloud video — the sky IS the video, brightened to match light airy reference */}
      {!reduced && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-70 brightness-125 saturate-75"
          src={CLOUD_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}

      {/* Light wash to ensure text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(221,235,247,0.45) 0%, rgba(167,203,232,0.3) 50%, rgba(123,176,218,0.35) 100%)",
        }}
      />
    </div>
  );
}
