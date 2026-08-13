"use client";

import { CHAT_SCRIPT, type ChatMessage } from "@/lib/constants/chat-script";
import { StickyNote } from "@/components/canvas/StickyNote";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/* ---------- Avatar ---------- */
function Avatar({ sender }: { sender: "you" | "mithun" }) {
  const isYou = sender === "you";
  return (
    <div
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white",
        isYou ? "bg-cursor" : "bg-flame-500",
      )}
    >
      {isYou ? "Y" : "M"}
    </div>
  );
}

/* ---------- FileChip ---------- */
function FileChip({ name, type }: { name: string; type: "doc" | "image" }) {
  return (
    <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg border border-ink-300/60 text-xs font-mono text-ink-700 bg-paper-alt">
      <svg
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        <path
          d="M1 1h6.5L11 4.5V13H1V1Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M7 1v4h4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      {name}
    </span>
  );
}

/* ---------- Reaction ---------- */
function Reaction({ emoji, count }: { emoji: string; count: number }) {
  return (
    <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full border border-ink-300/50 text-xs bg-paper-alt text-ink-700">
      {emoji} {count}
    </span>
  );
}

/* ---------- MessageBubble ---------- */
function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isYou = msg.sender === "you";
  return (
    <div className="flex gap-3 items-start">
      <Avatar sender={msg.sender} />
      <div className="min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-sm font-bold text-ink-900">
            {isYou ? "You" : "Mithun"}
          </span>
          <span className="font-mono text-[10px] text-ink-500">
            {msg.time}
          </span>
        </div>
        <p className="text-sm text-ink-700 leading-relaxed">{msg.text}</p>
        {msg.file && <FileChip name={msg.file.name} type={msg.file.type} />}
        {msg.reaction && (
          <Reaction emoji={msg.reaction.emoji} count={msg.reaction.count} />
        )}
      </div>
    </div>
  );
}

/* ---------- SectionDivider ---------- */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="flex-1 h-px bg-ink-300/40" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-flame-500 font-bold whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-ink-300/40" />
    </div>
  );
}

/* ========== Main Component ========== */
export function ApproachChat() {
  return (
    <section
      id="approach"
      className="py-[var(--space-section)] px-6 md:px-10"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <Reveal>
          <p className="eyebrow-script mb-3">working with me</p>
          <h2
            className="h-section text-ink-900 mb-6"
            style={{ fontSize: "var(--fs-h1)" }}
          >
            THIS IS THE ENTIRE PROCESS.
          </h2>
        </Reveal>

        {/* Sticky note */}
        <Reveal delay={200}>
          <div className="mb-10">
            <StickyNote>
              yes, it&apos;s really this simple &#10022;
            </StickyNote>
          </div>
        </Reveal>

        {/* Chat window */}
        <Reveal delay={300}>
          <div className="card overflow-hidden max-w-[800px] mx-auto">
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-ink-300/30">
              <span className="font-mono text-sm font-bold text-ink-900">
                # mithun &times; your-brand
              </span>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  <span className="w-5 h-5 rounded-full bg-flame-500 border-2 border-white" />
                  <span className="w-5 h-5 rounded-full bg-cursor border-2 border-white" />
                </div>
                <span className="flex items-center gap-1 font-mono text-[10px] text-ink-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                  2 online
                </span>
              </div>
            </div>

            {/* Chat body */}
            <div className="px-6 md:px-8 py-6 space-y-2">
              {CHAT_SCRIPT.map((section, si) => (
                <div key={section.label}>
                  <SectionDivider label={section.label} />
                  <div className="space-y-5">
                    {section.messages.map((msg, mi) => (
                      <MessageBubble key={`${si}-${mi}`} msg={msg} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
