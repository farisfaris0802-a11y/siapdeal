import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";

import { Logo } from "@/components/logo";
import { JudgeLoginButton } from "@/components/auth/judge-login-button";
import { Button } from "@/components/ui/button";
import { judgeLoginAction } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#cara-kerja", label: "Cara kerja" },
  { href: "#mitra", label: "Persona Bali" },
  { href: "#rubrik", label: "Rubrik" },
  { href: "#teknologi", label: "Teknologi AI" },
];

const frostedButtonClass =
  "relative h-8 overflow-hidden rounded-full border border-white/70 bg-white/35 px-2.5 text-[11px] font-semibold text-ink/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(11,43,34,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/60 hover:text-ink hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_8px_18px_-10px_rgba(11,43,34,0.35)] sm:h-9 sm:px-3.5 sm:text-[13px]";

const primaryButtonClass =
  "group relative h-8 overflow-hidden rounded-full border border-emerald-950/25 bg-[linear-gradient(180deg,#1B7353_0%,#10503C_42%,#0F5132_100%)] px-2.5 text-[11px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_8px_20px_-8px_rgba(11,43,34,0.72)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.36),0_12px_24px_-8px_rgba(11,43,34,0.7)] active:translate-y-0 sm:h-9 sm:px-4 sm:text-[13px]";

export function SiteHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="sticky top-0 z-50 px-2 pt-3 sm:px-5 sm:pt-4">
      <div className="relative mx-auto flex h-[60px] max-w-[1180px] items-center justify-between gap-1 overflow-hidden rounded-full border border-white/70 sm:gap-4 bg-[linear-gradient(135deg,rgba(255,255,255,0.84)_0%,rgba(250,248,242,0.58)_36%,rgba(232,242,236,0.64)_68%,rgba(255,255,255,0.8)_100%)] px-2 shadow-[0_18px_50px_-22px_rgba(11,43,34,0.42),0_3px_10px_rgba(11,43,34,0.06),inset_0_1px_0_rgba(255,255,255,0.92)] ring-1 ring-inset ring-white/30 backdrop-blur-2xl backdrop-saturate-150 sm:h-[66px] sm:px-5">
        {/* Lapisan pantulan cahaya khas liquid glass */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-95"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 left-[18%] h-20 w-56 -translate-x-1/2 rounded-full bg-white/55 blur-2xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-900/10 to-transparent"
        />

        <div className="relative flex min-w-0 items-center">
          <Logo className="hidden shrink-0 sm:inline-flex" />
          <Logo className="shrink-0 sm:hidden" compact showWordmark={false} />
        </div>

        <nav className="relative hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium text-ink/60 transition-all duration-300 hover:bg-white/55 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="relative flex shrink-0 items-center gap-1 sm:gap-2">
          {isLoggedIn ? (
            <Button asChild size="sm" className={primaryButtonClass}>
              <Link href="/dashboard">
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className={cn(frostedButtonClass, "px-2 sm:px-3.5")}
              >
                <Link href="/login">Masuk</Link>
              </Button>

              <form action={judgeLoginAction} className="flex">
                <input type="hidden" name="next" value="/simulasi/baru?demo=1" />
                <JudgeLoginButton
                  label="Demo"
                  pendingLabel="Memuat…"
                  size="sm"
                  variant="ghost"
                  className={cn(frostedButtonClass, "gap-1.5 px-2 sm:px-3.5")}
                  icon="sparkles"
                />
              </form>

              <Button asChild size="sm" className={primaryButtonClass}>
                <Link href="/register">
                  Mulai Gratis
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


