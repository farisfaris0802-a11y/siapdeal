import Link from "next/link";
import { ArrowRight, LayoutDashboard, LogIn } from "lucide-react";

import { Logo } from "@/components/logo";
import { JudgeLoginButton } from "@/components/auth/judge-login-button";
import { SiteMobileMenu } from "@/components/site-mobile-menu";
import { Button } from "@/components/ui/button";
import { judgeLoginAction } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#cara-kerja", label: "Cara kerja" },
  { href: "#mitra", label: "Persona Bali" },
  { href: "#rubrik", label: "Rubrik" },
];

const secondaryButtonClass =
  "group ios-pop ios-sheen relative h-9 overflow-hidden rounded-full border border-primary/15 bg-gradient-to-b from-white/80 via-white/60 to-secondary/60 px-3 text-[12px] font-semibold text-primary shadow-md ring-1 ring-inset ring-white/60 backdrop-blur-xl transition-[transform,background-image,box-shadow,color] duration-300 hover:-translate-y-0.5 hover:from-white/95 hover:to-secondary/80 hover:text-primary hover:shadow-lg active:translate-y-0 active:scale-[0.96] motion-reduce:transition-none sm:h-10 sm:px-4 sm:text-[13px]";

const primaryButtonClass =
  "group ios-pop ios-sheen ios-primary relative h-9 overflow-hidden rounded-full border border-white/10 px-3 text-[12px] font-semibold text-primary-foreground shadow-lg shadow-brand-teal/20 ring-1 ring-inset ring-white/10 transition-[transform,filter,box-shadow] duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-xl hover:shadow-brand-teal/30 active:translate-y-0 active:scale-[0.96] motion-reduce:transition-none sm:h-10 sm:px-4 sm:text-[13px]";

export function SiteHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-gradient-to-r from-background/95 via-background/85 to-secondary/60 backdrop-blur-xl">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-teal/40 to-transparent"
      />
      <div className="container relative flex h-16 items-center justify-between gap-2 sm:h-[68px] sm:gap-4">
        <div className="flex min-w-0 items-center">
          <Logo className="hidden shrink-0 sm:inline-flex" />
          <Logo className="shrink-0 sm:hidden" compact showWordmark={false} />
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium text-primary/65 transition-colors hover:bg-secondary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-primary after:to-brand-teal after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
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
                <Link href="/login">
                  <LogIn className="h-3.5 w-3.5 text-brand-teal" />
                  Masuk
                </Link>
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
                    "animate-delay-1 gap-1.5 px-3 [&_svg]:text-brand-teal [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:rotate-12 group-hover:[&_svg]:scale-110 sm:px-4"
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

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Button
            asChild
            size="sm"
            className={cn(primaryButtonClass, "animate-delay-1")}
          >
            <Link href={isLoggedIn ? "/dashboard" : "/register"}>
              {isLoggedIn ? (
                <>
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard
                </>
              ) : (
                <>
                  Mulai Gratis
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </Link>
          </Button>
          <SiteMobileMenu isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </header>
  );
}
