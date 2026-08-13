"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/lib/constants/site";

/* ── Live IST clock ───────────────────────────────────────────── */

function useISTClock() {
  const format = () =>
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    setTime(format());
    const id = setInterval(() => setTime(format()), 60_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

/* ── Sunrise illustration ─────────────────────────────────────── */

function SunriseSVG() {
  return (
    <svg
      width="60"
      height="34"
      viewBox="0 0 60 34"
      fill="none"
      aria-hidden
      className="mx-auto"
    >
      <line x1="30" y1="4" x2="30" y2="0" stroke="var(--color-flame-500)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="7" x2="17" y2="4" stroke="var(--color-flame-500)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="7" x2="43" y2="4" stroke="var(--color-flame-500)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="14" x2="9" y2="13" stroke="var(--color-flame-500)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="47" y1="14" x2="51" y2="13" stroke="var(--color-flame-500)" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M14 26 A16 16 0 0 1 46 26"
        fill="var(--color-flame-500)"
        opacity="0.85"
      />
      <line x1="2" y1="26" x2="58" y2="26" stroke="var(--color-ink-900)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Section ──────────────────────────────────────────────────── */

export function Contact() {
  const time = useISTClock();

  return (
    <section
      id="contact"
      className="relative px-6 md:px-10"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="mx-auto w-full max-w-[1360px] text-center flex flex-col items-center">
        <Reveal>
          <p className="eyebrow-script mb-6">got something?</p>

          <h2 className="h-section text-ink-900 text-[length:var(--fs-h1)] leading-[0.92]">
            DON&apos;T SIT ON
            <br />
            A GOOD{" "}
            <span className="text-flame-500">IDEA.</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative mt-10 inline-block">
            <div className="bg-paper-alt px-4 py-2 shadow-sm relative">
              <p className="text-sm text-ink-700">sunrise in coimbatore</p>
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

          <div className="mt-8">
            <SunriseSVG />
          </div>
        </Reveal>

        <Reveal delay={400}>
          <p className="mt-8 text-ink-700 max-w-[48ch] leading-relaxed text-lg">
            It&apos;s{" "}
            <strong className="text-ink-900 font-semibold">{time}</strong>{" "}
            in Coimbatore. Tell me what you&apos;re working on — worst
            case, you get free advice over coffee.
          </p>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href={`mailto:${SITE.email}?subject=Let's build something`}
              className="group inline-flex items-center bg-flame-500 text-white rounded-full px-8 py-4 text-lg font-medium shadow-lg transition-all duration-200 hover:bg-flame-600 hover:scale-[1.03] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-flame-500 focus-visible:ring-offset-2"
            >
              Let&apos;s talk
              <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden>&rarr;</span>
            </a>

            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-ink-700 underline underline-offset-4 decoration-ink-300 hover:text-flame-500 transition-colors"
            >
              or DM me on Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
