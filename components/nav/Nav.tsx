"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_LINKS, SITE } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

/* ── Scroll-spy hook ─────────────────────────────────────────── */

function useActiveSection() {
  const [active, setActive] = useState("#top");

  const update = useCallback(() => {
    const sections = NAV_LINKS.map((l) =>
      document.querySelector(l.href),
    ).filter(Boolean) as HTMLElement[];

    const scrollY = window.scrollY + window.innerHeight / 3;

    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop <= scrollY) {
        setActive(NAV_LINKS[i].href);
        return;
      }
    }
    setActive("#top");
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

  return active;
}

/* ── Icons ────────────────────────────────────────────────────── */

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn("w-3.5 h-3.5", className)}
      aria-hidden="true"
    >
      <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
      <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-5 flex flex-col items-center justify-center gap-[5px]">
      <span
        className={cn(
          "block h-[1.5px] w-5 bg-ink-900 transition-all duration-300",
          open && "translate-y-[3.25px] rotate-45",
        )}
      />
      <span
        className={cn(
          "block h-[1.5px] w-5 bg-ink-900 transition-all duration-300",
          open && "-translate-y-[3.25px] -rotate-45",
        )}
      />
    </div>
  );
}

/* ── Component ────────────────────────────────────────────────── */

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop nav — three floating pills */}
      <header className="fixed top-10 inset-x-0 z-40 hidden md:flex items-start justify-between px-6 lg:px-10 pointer-events-none">
        {/* Left: availability pill */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md font-mono text-[0.65rem] text-ink-700 select-none">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="uppercase tracking-wider">
            Available for projects
          </span>
        </div>

        {/* Center: nav pill with scroll-spy */}
        <nav className="pointer-events-auto flex items-center gap-1 rounded-full bg-white px-2 py-1.5 shadow-md">
          {NAV_LINKS.map((link) => {
            const isContact = link.label === "Contact";
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200",
                  isContact
                    ? "bg-ink-900 text-white hover:bg-ink-700"
                    : isActive
                      ? "bg-flame-500/10 text-flame-500"
                      : "text-ink-700 hover:text-ink-900 hover:bg-ink-300/20",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: email pill */}
        <a
          href={`mailto:${SITE.email}`}
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md font-mono text-[0.65rem] text-ink-700 hover:text-ink-900 transition-colors"
        >
          <MailIcon />
          <span className="tracking-wider">{SITE.email}</span>
        </a>
      </header>

      {/* Mobile nav — hamburger + overlay */}
      <header className="fixed top-4 inset-x-0 z-40 flex md:hidden items-center justify-between px-4">
        {/* Mobile availability dot */}
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-ink-700">
            Open
          </span>
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6 md:hidden"
            style={{
              background:
                "linear-gradient(180deg, var(--color-sky-300) 0%, var(--color-sky-500) 100%)",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={cn(
                  "text-2xl font-medium",
                  activeSection === link.href
                    ? "text-white"
                    : "text-white/70",
                )}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href={`mailto:${SITE.email}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: NAV_LINKS.length * 0.05 }}
              className="mt-4 font-mono text-xs text-white/80 underline underline-offset-4"
            >
              {SITE.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
