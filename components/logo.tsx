import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  showWordmark = true,
  compact = false,
  inverted = false,
}: {
  className?: string;
  href?: string;
  showWordmark?: boolean;
  compact?: boolean;
  inverted?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="SiapDeal — beranda"
    >
      <span
        className={cn(
          "relative grid place-items-center overflow-hidden rounded-xl shadow-sm transition-transform group-hover:-rotate-3",
          inverted
            ? "bg-white/10 text-white ring-1 ring-white/15"
            : "bg-primary text-primary-foreground",
          compact ? "h-8 w-8" : "h-9 w-9"
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={cn(compact ? "h-5 w-5" : "h-6 w-6")}
          aria-hidden="true"
        >
          <path
            d="M6.8 9.4a4 4 0 0 1 4-4h7.6a4 4 0 0 1 4 4v3.2a4 4 0 0 1-4 4h-3.1l-3.5 3v-3h-1a4 4 0 0 1-4-4V9.4Z"
            fill="currentColor"
            opacity="0.35"
          />
          <path
            d="M12.4 16.1a4 4 0 0 1 4-4h5.8a4 4 0 0 1 4 4v4.5a4 4 0 0 1-4 4h-1.3v2.6l-3.2-2.6h-1.3a4 4 0 0 1-4-4v-4.5Z"
            fill="currentColor"
          />
          <path
            d="M16.5 20.5l2.1-4.2 2 4.2"
            stroke="#0B2B22"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M19.5 19.4v3.1" stroke="#0B2B22" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </span>
      {showWordmark && (
        <span
          className={cn(
            "font-display text-[1.35rem] font-bold leading-none tracking-tight",
            inverted ? "text-white" : "text-ink"
          )}
        >
          SiapDeal<span className="text-accent">.</span>
        </span>
      )}
    </Link>
  );
}
