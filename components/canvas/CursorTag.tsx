"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, motion } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const springConfig = { stiffness: 150, damping: 20 };

export function CursorTag() {
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
      style={{ x, y }}
    >
      {/* Cursor arrow */}
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        <path
          d="M1 1L1 15.5L4.75 11.25L8.5 19L11 18L7.25 10.25L13 10.25L1 1Z"
          fill="var(--color-cursor)"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Name pill */}
      <div
        className="absolute left-4 top-4 flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium text-white shadow-sm"
        style={{ backgroundColor: "var(--color-cursor)" }}
      >
        You
      </div>
    </motion.div>
  );
}
