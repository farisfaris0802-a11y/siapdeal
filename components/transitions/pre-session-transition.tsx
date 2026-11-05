"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Radar } from "lucide-react";

import { cn } from "@/lib/utils";

type StartTransition = (onComplete?: () => void) => void;

const TransitionContext = createContext<{ start: StartTransition } | null>(null);

export function usePreSessionTransition() {
  const value = useContext(TransitionContext);
  if (!value) {
    throw new Error("usePreSessionTransition must be used inside its provider");
  }
  return value;
}

export function PreSessionTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [phase, setPhase] = useState<0 | 1>(0);
  const activeRef = useRef(false);
  const onCompleteRef = useRef<(() => void) | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const start = useCallback<StartTransition>(
    (onComplete) => {
      if (activeRef.current) return;

      activeRef.current = true;
      onCompleteRef.current = onComplete ?? null;
      setActive(true);
      setLeaving(false);
      setPhase(0);

      clearTimers();
      timersRef.current = [
        setTimeout(() => setPhase(1), 800),
        setTimeout(() => setLeaving(true), 1800),
        setTimeout(() => {
          setActive(false);
          setLeaving(false);
          activeRef.current = false;
          const complete = onCompleteRef.current;
          onCompleteRef.current = null;
          complete?.();
        }, 2100),
      ];
    },
    [clearTimers]
  );

  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const value = useMemo(() => ({ start }), [start]);

  return (
    <TransitionContext.Provider value={value}>
      {children}

      {active && (
        <div
          role="status"
          aria-live="polite"
          aria-busy="true"
          className={cn(
            "presession-in fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-slate-950/90 px-6 backdrop-blur-xl transition-opacity duration-300",
            leaving ? "pointer-events-none opacity-0" : "opacity-100"
          )}
        >
          <Image
            src="/images/meeting-hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/95" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative grid h-28 w-28 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/15 motion-reduce:animate-none" />
              <span className="absolute inset-2 animate-pulse rounded-full border border-amber-400/30 motion-reduce:animate-none" />
              <span className="absolute inset-4 rounded-full border border-emerald-400/25" />
              <span className="relative grid h-16 w-16 place-items-center rounded-full bg-slate-900/90 text-emerald-400 shadow-[0_0_56px_rgba(16,185,129,0.32)] ring-1 ring-emerald-400/30">
                <Radar className="h-7 w-7 animate-pulse motion-reduce:animate-none" />
              </span>
            </div>

            <div
              aria-hidden="true"
              className="mt-5 flex h-7 items-end gap-1.5"
            >
              {[0, 1, 2].map((bar) => (
                <span
                  key={bar}
                  className="voice-bar h-6 w-1.5 rounded-full bg-emerald-400"
                  style={{ animationDelay: `${bar * 120}ms` }}
                />
              ))}
            </div>

            <p className="mt-6 text-sm font-medium text-slate-200 sm:text-base">
              {phase === 0
                ? "Menginisialisasi Simulator B2B AI..."
                : "Menyiapkan skenario negosiasi F&B Director..."}
            </p>
            <p className="mt-2 text-[11px] text-slate-500">
              Menyiapkan ruang latihan Anda
            </p>

            <div className="mt-5 h-1 w-52 overflow-hidden rounded-full bg-slate-800">
              <span className="presession-progress block h-full w-full origin-left rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300" />
            </div>
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  );
}

export const TransitionLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link>
>(function TransitionLink({ href, onClick, ...props }, ref) {
  const router = useRouter();
  const { start } = usePreSessionTransition();

  return (
    <Link
      ref={ref}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          typeof href !== "string" ||
          href.startsWith("#")
        ) {
          return;
        }

        event.preventDefault();
        start(() => router.push(href));
      }}
      {...props}
    />
  );
});
