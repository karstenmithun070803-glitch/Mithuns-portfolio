"use client";

import { StickyNote } from "@/components/canvas/StickyNote";
import { Reveal } from "@/components/motion/Reveal";
import ParticleText from "@/components/ui/ParticleText";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center items-center px-6 md:px-10"
    >
      <div className="w-full max-w-[1360px] flex flex-col items-center text-center">
        {/* Chip */}
        <Reveal delay={0}>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-300 px-4 py-1.5 text-xs text-ink-500 font-mono tracking-wider uppercase mb-8">
            designer + developer &middot; Coimbatore &middot; open for work
          </span>
        </Reveal>

        {/* Headline — particle effect (desktop), static text (mobile) */}
        <div className="hidden md:block w-full" style={{ height: "clamp(80px, 18vw, 200px)" }}>
          <ParticleText
            text="BUILT TO BE REMEMBERED."
            color="#FF6B35"
            highlightColor="#E85D2F"
            particleSize={2.5}
            density={3}
            scatter={200}
            gatherDuration={1800}
            stagger={500}
            pointerRepel={50}
            repelRadius={140}
            idleDrift={0.5}
            trigger="mount"
            fontSize="clamp(2rem, 8vw, 6rem)"
            fontWeight={800}
            fontFamily="inherit"
            glow
          />
        </div>
        <Reveal delay={200}>
          <h1
            className="md:hidden h-display text-flame-500"
            style={{ fontSize: "clamp(2rem, 10vw, 4rem)" }}
          >
            BUILT TO BE REMEMBERED.
          </h1>
        </Reveal>

        {/* Sticky note */}
        <Reveal delay={400}>
          <div className="mt-6">
            <StickyNote>
              forgettable is not in the brief &#10022;
            </StickyNote>
          </div>
        </Reveal>

        {/* Subhead */}
        <Reveal delay={600}>
          <p className="lead mt-8 mx-auto text-center">
            I design and ship brands, sites, and tools for founders who refuse
            to blend in.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={800}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center rounded-full bg-flame-500 text-white px-7 py-3.5 font-medium shadow-md hover:bg-flame-600 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              Let&apos;s build
              <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </a>
            <a
              href="#work"
              className="inline-flex items-center rounded-full border border-ink-300 px-7 py-3.5 text-ink-700 hover:border-ink-900 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              See what I&apos;ve made
            </a>
          </div>
        </Reveal>
      </div>

      {/* Bottom corners */}
      <Reveal delay={1000} className="absolute bottom-8 left-6 md:left-10 eyebrow-mono hidden md:block">
        <p>One desk, every timezone</p>
        <p>Coimbatore, India</p>
      </Reveal>

      <Reveal delay={1000} className="absolute bottom-8 right-6 md:right-10 eyebrow-mono text-right hidden md:block">
        <p>Taking on projects</p>
        <p>Let&apos;s talk</p>
      </Reveal>
    </section>
  );
}
