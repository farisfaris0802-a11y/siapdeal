import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  showWordmark = true,
  tagline,
  compact = false,
  inverted = false,
}: {
  className?: string;
  href?: string;
  showWordmark?: boolean;
  tagline?: string;
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
          "relative grid shrink-0 place-items-center overflow-hidden rounded-[14px] bg-[linear-gradient(145deg,#1B7353_0%,#0F5132_48%,#08301F_100%)] text-white shadow-[0_8px_20px_-8px_rgba(8,48,31,0.65),inset_0_1px_0_rgba(255,255,255,0.28)] ring-1 ring-white/20 transition-all duration-300 group-hover:-rotate-3 group-hover:shadow-[0_12px_26px_-8px_rgba(8,48,31,0.7),inset_0_1px_0_rgba(255,255,255,0.32)]",
          inverted ? "ring-white/20" : "",
          compact ? "h-9 w-9" : "h-10 w-10"
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-1.5 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/25 to-transparent blur-[1px]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-3 -right-3 h-8 w-8 rounded-full bg-amber-400/25 blur-md"
        />
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={cn("relative", compact ? "h-6 w-6" : "h-7 w-7")}
          aria-hidden="true"
        >
          <path
            d="M22 10.8c-.9-1.2-2.4-1.9-4.2-1.9-2.9 0-4.9 1.4-4.9 3.6 0 4.8 9.4 2.7 9.4 7.6 0 2.4-2.1 3.9-5.2 3.9-2.2 0-4-.8-5.2-2.1"
            stroke="currentColor"
            strokeWidth="2.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.4 5.7l1 2.2 2.4.3-1.8 1.7.5 2.4-2.1-1.2-2.1 1.2.4-2.4-1.7-1.7 2.4-.3 1-2.2Z"
            fill="#FBBF24"
          />
        </svg>
      </span>
      {showWordmark && (
        <span className="flex min-w-0 flex-col">
          <span
            className={cn(
              "font-display text-[1.45rem] font-bold leading-none tracking-[-0.035em]",
              inverted ? "text-white" : "text-ink"
            )}
          >
            SiapDeal<span className="text-accent">.</span>
          </span>
          {tagline && (
            <span
              className={cn(
                "mt-1 truncate text-[8px] font-semibold uppercase tracking-[0.18em]",
                inverted ? "text-white/40" : "text-muted-foreground/80"
              )}
            >
              {tagline}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
