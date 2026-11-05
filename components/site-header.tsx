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
  "group ios-pop ios-sheen relative h-9 overflow-hidden rounded-full border border-border/70 bg-white/55 px-3 text-[12px] font-semibold text-ink/75 shadow-md ring-1 ring-inset ring-white/60 backdrop-blur-xl transition-[transform,background-color,box-shadow,color] duration-300 hover:-translate-y-0.5 hover:bg-white/80 hover:text-ink hover:shadow-lg active:translate-y-0 active:scale-[0.96] motion-reduce:transition-none sm:h-10 sm:px-4 sm:text-[13px]";

const primaryButtonClass =
  "group ios-pop ios-sheen relative h-9 overflow-hidden rounded-full border border-primary-foreground/15 bg-primary px-3 text-[12px] font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-primary/95 active:translate-y-0 active:scale-[0.96] motion-reduce:transition-none sm:h-10 sm:px-4 sm:text-[13px]";

export function SiteHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
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
                className={cn(secondaryButtonClass, "px-3 sm:px-4")}
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
                  className={cn(
                    secondaryButtonClass,
                    "animate-delay-1 gap-1.5 px-3 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:rotate-12 group-hover:[&_svg]:scale-110 sm:px-4"
                  )}
                  icon="sparkles"
                />
              </form>

              <Button
                asChild
                size="sm"
                className={cn(primaryButtonClass, "animate-delay-2")}
              >
                <Link href="/register">
                  Mulai Gratis
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
