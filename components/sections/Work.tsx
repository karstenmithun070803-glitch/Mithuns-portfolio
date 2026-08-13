"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { PROJECTS } from "@/lib/constants/projects";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function Work() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const updateActive = useCallback(() => {
    const el = carouselRef.current;
    if (!el || !el.children.length) return;
    const cardWidth = (el.children[0] as HTMLElement).offsetWidth;
    const gap = 24;
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setActive(Math.min(idx, PROJECTS.length - 1));
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActive, { passive: true });
    return () => el.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  const scrollTo = useCallback((index: number) => {
    const el = carouselRef.current;
    if (!el || !el.children.length) return;
    const cardWidth = (el.children[0] as HTMLElement).offsetWidth;
    const gap = 24;
    el.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
  }, []);

  const prev = () => scrollTo(Math.max(0, active - 1));
  const next = () => scrollTo(Math.min(PROJECTS.length - 1, active + 1));

  return (
    <section
      id="work"
      className="py-[var(--space-section)] overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 mb-12">
        <Reveal>
          <p className="eyebrow-script mb-3">what i&apos;ve shipped</p>
          <h2
            className="h-section text-ink-900"
            style={{ fontSize: "var(--fs-h1)" }}
          >
            EVERY PROJECT HAS A STORY.
          </h2>
          <p className="eyebrow-mono mt-4">here are a few worth telling</p>
        </Reveal>
      </div>

      {/* Carousel */}
      <div className="relative max-w-[1360px] mx-auto px-6 md:px-10">
        <div
          ref={carouselRef}
          className={cn(
            "flex gap-6 overflow-x-auto",
            "snap-x snap-mandatory",
            "scroll-smooth",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          )}
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          }}
        >
          {PROJECTS.map((project) => (
            <a
              key={project.slug}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "card group relative flex-shrink-0 overflow-hidden snap-start",
                "w-[85vw] md:w-[560px] lg:w-[640px]",
                "transition-all duration-500 ease-[var(--ease-settle)]",
                "hover:-translate-y-1.5 hover:shadow-xl",
              )}
              style={{ aspectRatio: "16 / 10" }}
            >
              <Image
                src={project.cover}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-[var(--ease-settle)] group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 85vw, 640px"
              />

              <span
                className={cn(
                  "absolute top-4 right-4 z-10 w-10 h-10 rounded-full",
                  "bg-white/90 backdrop-blur-sm flex items-center justify-center",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  "text-ink-900 text-lg font-bold",
                )}
                aria-hidden="true"
              >
                &#8599;
              </span>

              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 z-10",
                  "bg-gradient-to-t from-ink-900/80 via-ink-900/40 to-transparent",
                  "p-6 md:p-8 flex flex-col justify-end",
                )}
              >
                <h3 className="font-display font-bold text-white text-xl md:text-2xl mb-1">
                  {project.title}
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  {project.oneLiner}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono uppercase px-3 py-1 rounded-full border border-white/30 text-white/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Controls: counter + arrows — centered */}
      <Reveal delay={200}>
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 mt-8 flex flex-col items-center gap-3">
          {/* Counter */}
          <span className="font-mono text-sm text-ink-500 tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </span>

          {/* Arrows */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              aria-label="Previous project"
              className={cn(
                "w-11 h-11 rounded-full bg-ink-900 flex items-center justify-center",
                "text-white transition-all duration-200",
                "hover:scale-110 active:scale-95",
                active === 0 && "opacity-30 pointer-events-none",
              )}
            >
              &#8592;
            </button>
            <button
              onClick={next}
              aria-label="Next project"
              className={cn(
                "w-11 h-11 rounded-full bg-ink-900 flex items-center justify-center",
                "text-white transition-all duration-200",
                "hover:scale-110 active:scale-95",
                active === PROJECTS.length - 1 && "opacity-30 pointer-events-none",
              )}
            >
              &#8594;
            </button>
          </div>

          {/* Mobile swipe hint */}
          <p className="md:hidden font-mono text-[10px] text-ink-400 uppercase tracking-wider animate-pulse">
            swipe to explore
          </p>
        </div>
      </Reveal>
    </section>
  );
}
