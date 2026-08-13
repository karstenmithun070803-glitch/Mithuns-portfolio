import { cn } from "@/lib/utils";

interface StickyNoteProps {
  children: React.ReactNode;
  className?: string;
}

export function StickyNote({ children, className }: StickyNoteProps) {
  return (
    <div
      className={cn(
        "relative inline-block px-4 py-2 text-sm text-ink-700 rounded-lg rounded-tr-none shadow-md",
        className,
      )}
      style={{ backgroundColor: "var(--color-paper-alt)" }}
    >
      {children}

      {/* Folded corner — CSS triangle in top-right */}
      <span
        className="absolute top-0 right-0 w-0 h-0 pointer-events-none"
        aria-hidden="true"
        style={{
          borderStyle: "solid",
          borderWidth: "0 16px 16px 0",
          borderColor: "transparent var(--color-sky-300) transparent transparent",
        }}
      />
    </div>
  );
}
