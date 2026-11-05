import Link from "next/link";

import { cn } from "@/lib/utils";

const DEFAULT_TAGLINE = "B2B AI Negotiation Simulator for Bali SMEs";

function BrandMark({
  compact = false,
  inverted = false,
}: {
  compact?: boolean;
  inverted?: boolean;
}) {
  if (compact) {
    return (
      <span
        className={cn(
          "relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-[linear-gradient(145deg,#1B7353_0%,#0F5132_48%,#08301F_100%)] shadow-[0_8px_20px_-8px_rgba(8,48,31,0.65),inset_0_1px_0_rgba(255,255,255,0.28)] ring-1 ring-white/20 transition-all duration-300 group-hover:-rotate-3",
          inverted ? "ring-white/20" : ""
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-1.5 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/25 to-transparent blur-[1px]"
        />
        <svg
          viewBox="0 0 64 64"
          fill="none"
          className="relative h-7 w-7"
          aria-hidden="true"
        >
          <path
            d="M42 14c7 0 11 4.3 11 10 0 6.2-5 10-12 10H31c-7 0-11 4.2-11 10 0 5.7 4 10 11 10"
            stroke="#D97706"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M22 14c-7 0-11 4.3-11 10 0 6.2 5 10 12 10h10c7 0 11 4.2 11 10 0 5.7-4 10-11 10"
            stroke="#FFFFFF"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M49 5.5l1.9 4.6 4.6 1.9-4.6 1.9L49 18.5l-1.9-4.6L42.5 12l4.6-1.9L49 5.5Z"
            fill="#FBBF24"
          />
        </svg>
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-11 w-11 shrink-0 transition-transform duration-300 group-hover:-rotate-3"
      aria-hidden="true"
    >
      <path
        d="M42 14c7 0 11 4.3 11 10 0 6.2-5 10-12 10H31c-7 0-11 4.2-11 10 0 5.7 4 10 11 10"
        stroke="#D97706"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M22 14c-7 0-11 4.3-11 10 0 6.2 5 10 12 10h10c7 0 11 4.2 11 10 0 5.7-4 10-11 10"
        stroke="#0F5132"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M49 5.5l1.9 4.6 4.6 1.9-4.6 1.9L49 18.5l-1.9-4.6L42.5 12l4.6-1.9L49 5.5Z"
        fill="#D97706"
      />
    </svg>
  );
}

export function Logo({
  className,
  href = "/",
  showWordmark = true,
  tagline,
  showTagline = true,
  compact = false,
  inverted = false,
}: {
  className?: string;
  href?: string;
  showWordmark?: boolean;
  tagline?: string;
  showTagline?: boolean;
  compact?: boolean;
  inverted?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="SiapDeal — B2B AI Negotiation Simulator for Bali SMEs"
    >
      <BrandMark compact={compact} inverted={inverted} />

      {showWordmark && (
        <span className="flex min-w-0 flex-col">
          <span className="font-sans text-[1.45rem] font-bold leading-none tracking-[-0.05em]">
            <span className={inverted ? "text-white" : "text-[#0F172A]"}>Siap</span>
            <span className="text-[#D97706]">Deal.</span>
          </span>
          {showTagline && (
            <span
              className={cn(
                "mt-1 truncate text-[7px] font-bold uppercase tracking-[0.17em] sm:text-[7.5px]",
                inverted ? "text-white/40" : "text-slate-400"
              )}
            >
              {tagline ?? DEFAULT_TAGLINE}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
