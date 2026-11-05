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
];

const secondaryButtonClass =
  "h-8 rounded-full border border-border bg-background px-2.5 text-[11px] font-semibold text-ink/70 transition-colors hover:bg-secondary hover:text-ink sm:h-9 sm:px-3.5 sm:text-[13px]";

const primaryButtonClass =
  "group h-8 rounded-full bg-primary px-2.5 text-[11px] font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:translate-y-px sm:h-9 sm:px-4 sm:text-[13px]";

export function SiteHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between gap-2 sm:h-[68px] sm:gap-4">
        <div className="flex min-w-0 items-center">
          <Logo className="hidden shrink-0 sm:inline-flex" />
          <Logo className="shrink-0 sm:hidden" compact showWordmark={false} />
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
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
                className={cn(secondaryButtonClass, "px-2 sm:px-3.5")}
              >
                <Link href="/login">Masuk</Link>
              </Button>

              <form action={judgeLoginAction} className="flex">
                <input type="hidden" name="next" value="/simulasi/baru?demo=1" />
                <JudgeLoginButton
                  label="Demo"
                  pendingLabel="Memuat..."
                  size="sm"
                  variant="ghost"
                  className={cn(secondaryButtonClass, "gap-1.5 px-2 sm:px-3.5")}
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
