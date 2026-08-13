"use client";

import { STACK } from "@/lib/constants/stack";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/* ---------- FileTag ---------- */
function FileTag({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "absolute top-4 right-4 font-mono text-[10px] uppercase tracking-wider",
        dark ? "text-white/40" : "text-ink-500",
      )}
    >
      {label}
    </span>
  );
}

/* ---------- Capabilities ---------- */
const CAPABILITIES = [
  "Web Development",
  "AI Prototyping",
  "Custom Software",
] as const;

export function AboutBento() {
  return (
    <section
      id="about"
      className="py-[var(--space-section)] px-6 md:px-10"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <Reveal>
          <p className="eyebrow-script mb-3">behind the screen</p>
          <h2
            className="h-section text-ink-900 mb-12"
            style={{ fontSize: "var(--fs-h1)" }}
          >
            THE SHORT VERSION.
          </h2>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* ---- Card 1: Statement ---- */}
          <Reveal delay={100} className="md:col-span-2">
            <div className="card relative p-8 md:p-10 h-full">
              <FileTag label="STATEMENT.TXT" />

              <span
                className="block font-display text-6xl leading-none text-flame-500 select-none mb-2"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <p className="font-display text-2xl md:text-3xl font-bold text-ink-900 leading-snug mb-6">
                I don&apos;t design to be liked. I design to be{" "}
                <span className="text-flame-500 italic">remembered.</span>
              </p>

              <p className="text-ink-700 leading-relaxed max-w-[56ch] mb-8">
                Solo designer-developer in Coimbatore. I handle strategy,
                design, and code — all under one roof. Founders come to me
                when &ldquo;good enough&rdquo; isn&apos;t.
              </p>

              <hr className="border-ink-300/50 mb-6" />

              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-500">
                  MITHUN &middot; COIMBATORE, IN
                </span>
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-500">
                  <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
                  AVAILABLE NOW
                </span>
              </div>
            </div>
          </Reveal>

          {/* ---- Card 2: Stack ---- */}
          <Reveal delay={200}>
            <div className="card relative p-8 md:p-10 h-full">
              <FileTag label="STACK.YML" />

              <p className="eyebrow-mono mb-6 mt-2">MY DAILY DRIVERS</p>

              <div className="grid grid-cols-2 gap-3">
                {STACK.map((tool) => (
                  <div
                    key={tool.name}
                    className={cn(
                      "rounded-xl border border-ink-300/60 p-3 flex items-start gap-3",
                      "transition-transform duration-300 ease-[var(--ease-settle)]",
                      "hover:-translate-y-0.5 hover:shadow-md",
                    )}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                      style={{ backgroundColor: tool.color }}
                    >
                      {tool.short}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-ink-900 truncate">
                        {tool.name}
                      </p>
                      <p className="text-[11px] text-ink-500 leading-tight">
                        {tool.tagline}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ---- Card 3: Capabilities ---- */}
          <Reveal delay={300}>
            <div className="card relative p-8 md:p-10 h-full">
              <FileTag label="CAPABILITIES" />

              <p className="eyebrow-mono mb-6 mt-2">AREAS I COVER</p>

              <div className="flex flex-wrap gap-2">
                {CAPABILITIES.map((cap) => (
                  <span
                    key={cap}
                    className={cn(
                      "rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-700",
                      "transition-colors duration-300",
                      "hover:border-flame-500 hover:text-flame-500 cursor-default",
                    )}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ---- Card 4: Hero.frame (dark) ---- */}
          <Reveal delay={400} className="sm:col-span-2 md:col-span-2">
            <div className="card-dark relative p-8 md:p-10 flex flex-col justify-between min-h-[260px] h-full">
              <FileTag label="HERO.FRAME" dark />

              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-[360px] rounded-lg border border-white/10 overflow-hidden">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5">
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <div className="px-6 py-8 flex items-center justify-center relative">
                    <p className="font-display font-bold text-lg text-white/90 tracking-tight">
                      Ship it.
                    </p>
                    <span className="absolute bottom-3 right-6 flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: "var(--color-cursor)" }}
                      />
                      <span className="text-[10px] font-mono bg-cursor text-white px-1.5 py-0.5 rounded-sm">
                        Mithun
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-wider text-white/30 mt-6">
                DESIGNED LIVE &middot; 360 &times; 240
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
