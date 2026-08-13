"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { SERVICES } from "@/lib/constants/services";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/* ── Expandable panel content ─────────────────────────────────── */

function ServicePanel({
  service,
  className,
}: {
  service: (typeof SERVICES)[number];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex-shrink-0 w-[85vw] md:w-[min(620px,42vw)] min-w-[85vw] md:min-w-[min(620px,42vw)] md:min-h-[480px] bg-paper rounded-3xl shadow-card p-8 md:p-12 flex flex-col",
        className,
      )}
    >
      {/* Index label */}
      <p className="eyebrow-mono mb-6">
        <span className="inline-block mr-1.5 opacity-40">{"□"}</span>
        {service.index}{" "}
        <span className="capitalize">
          {service.slug.replace(/-/g, " ")}
        </span>
      </p>

      {/* Title */}
      <h3 className="font-display text-3xl md:text-4xl font-bold text-ink-900 leading-tight tracking-tight">
        {service.title}
      </h3>

      {/* Subtitle */}
      <p className="mt-4 text-ink-700 max-w-prose leading-relaxed">
        {service.sub}
      </p>

      {/* Expand toggle */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="mt-8 inline-flex items-center gap-2 self-start rounded-full border border-flame-500 px-5 py-2.5 text-sm font-medium text-flame-500 transition-all duration-200 hover:bg-flame-500 hover:text-white hover:scale-[1.03] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-flame-500 focus-visible:ring-offset-2"
      >
        See process + deliverables
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className={cn(
            "transition-transform duration-300",
            open && "rotate-180",
          )}
          aria-hidden
        >
          <path
            d="M3.5 5.25L7 8.75L10.5 5.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Expandable content with fade-in */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-8 space-y-6">
            {/* The Work */}
            <div>
              <p className="eyebrow-mono mb-3">THE WORK</p>
              <p className="text-ink-700 leading-relaxed max-w-prose">
                {service.work}
              </p>
            </div>

            {/* Deliverables */}
            <div>
              <p className="eyebrow-mono mb-3">DELIVERABLES</p>
              <div className="flex flex-wrap gap-2">
                {service.deliverables.map((d) => (
                  <span
                    key={d}
                    className="rounded-full bg-paper border border-ink-300 px-3 py-1.5 text-sm text-ink-700"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Scroll progress dots ────────────────────────────────────── */

function ScrollDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex gap-2 justify-center mt-6">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            i === active
              ? "bg-flame-500 scale-125"
              : "bg-ink-300/50",
          )}
        />
      ))}
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */

export function Services() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const setupGsap = useCallback(async () => {
    if (isMobile || prefersReduced) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    const totalWidth = track.scrollWidth;
    const viewWidth = window.innerWidth;
    const distance = totalWidth - viewWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance + 200}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile, prefersReduced]);

  useEffect(() => {
    const cleanup = setupGsap();
    return () => {
      cleanup.then((revert) => revert?.());
    };
  }, [setupGsap]);

  const activeCard = Math.min(
    SERVICES.length - 1,
    Math.floor(scrollProgress * SERVICES.length),
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: isMobile || prefersReduced ? "var(--space-section)" : "120px",
      }}
    >
      {/* Header */}
      <div className="px-6 md:px-10 mb-10 md:mb-14">
        <div className="mx-auto w-full max-w-[1360px]">
          <Reveal>
            <p className="eyebrow-script mb-4">the good stuff</p>
            <h2 className="h-section text-ink-900 text-[length:var(--fs-h1)]">
              WHAT I MAKE
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative mt-6 inline-block">
              <div className="bg-paper-alt px-4 py-2 shadow-sm relative">
                <p className="text-sm text-ink-700">
                  Three things, one canvas. Scroll sideways to pan.
                </p>
                <div
                  className="absolute top-0 right-0 w-4 h-4"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(225deg, var(--color-sky-300) 50%, var(--color-paper-alt) 50%)",
                  }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Panels track */}
      {isMobile || prefersReduced ? (
        <div className="px-6 md:px-10">
          <div className="mx-auto w-full max-w-[1360px] flex flex-col gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 100}>
                <ServicePanel service={s} className="w-full" />
              </Reveal>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div
            ref={trackRef}
            className="flex items-center gap-8 pb-10 pl-[max(1.5rem,calc((100vw-1360px)/2+1.5rem))] will-change-transform"
          >
            {SERVICES.map((s) => (
              <ServicePanel key={s.slug} service={s} />
            ))}
            <div className="flex-shrink-0 w-[30vw]" aria-hidden="true" />
          </div>
          <ScrollDots count={SERVICES.length} active={activeCard} />
        </>
      )}
    </section>
  );
}
