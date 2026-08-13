"use client";

import { useEffect, useState, useCallback } from "react";

function useISTClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const tick = () => setTime(fmt.format(new Date()).toUpperCase());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    setProgress(Math.min(scrollTop / docHeight, 1));
  }, []);

  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [update]);

  return progress;
}

function RulerTicks() {
  const ticks = Array.from({ length: 20 }, (_, i) => i * 100);

  return (
    <svg
      className="h-full w-[2000px] shrink-0"
      viewBox="0 0 2000 24"
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
    >
      {ticks.map((x) => (
        <g key={x}>
          <line
            x1={x}
            y1={14}
            x2={x}
            y2={24}
            stroke="var(--color-ink-300)"
            strokeWidth="1"
          />
          <text
            x={x + 4}
            y={12}
            fill="var(--color-ink-500)"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            {x}
          </text>
          {[20, 40, 60, 80].map((offset) => (
            <line
              key={offset}
              x1={x + offset}
              y1={18}
              x2={x + offset}
              y2={24}
              stroke="var(--color-ink-300)"
              strokeWidth="0.5"
              opacity="0.5"
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function RulerBar() {
  const clock = useISTClock();
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 h-6 hidden md:flex items-center justify-between bg-white/60 backdrop-blur-sm border-b border-ink-300/30"
      aria-hidden="true"
    >
      {/* Progress fill */}
      <div
        className="absolute inset-y-0 left-0 bg-flame-500/15 transition-none"
        style={{ width: `${progress * 100}%` }}
      />

      {/* Left: ruler ticks */}
      <div className="relative overflow-hidden flex-1 h-full flex items-end">
        <RulerTicks />
      </div>

      {/* Right: live clock */}
      <div className="relative flex items-center gap-2 px-4 font-mono text-[0.65rem] text-ink-500 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
        </span>
        <span className="uppercase tracking-wider font-semibold text-signal">
          Live
        </span>
        <span className="text-ink-700 tabular-nums">{clock}</span>
      </div>
    </div>
  );
}
