import Link from "next/link";
import { ArrowRight, LayoutDashboard, Sparkles } from "lucide-react";

import { Logo } from "@/components/logo";
import { JudgeLoginButton } from "@/components/auth/judge-login-button";
import { Button } from "@/components/ui/button";
import { judgeLoginAction } from "@/lib/actions/auth";

export function SiteHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          <a href="#cara-kerja" className="whitespace-nowrap transition-colors hover:text-foreground">
            Cara kerja
          </a>
          <a href="#mitra" className="whitespace-nowrap transition-colors hover:text-foreground">
            Persona Bali
          </a>
          <a href="#rubrik" className="whitespace-nowrap transition-colors hover:text-foreground">
            Rubrik
          </a>
          <a href="#teknologi" className="whitespace-nowrap transition-colors hover:text-foreground">
            Teknologi AI
          </a>
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <Button asChild size="sm" className="h-9 px-4">
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden h-9 sm:inline-flex">
                <Link href="/login">Masuk</Link>
              </Button>
              <form action={judgeLoginAction} className="hidden sm:block">
                <input type="hidden" name="next" value="/simulasi/baru?demo=1" />
                <JudgeLoginButton
                  label="Demo Juri"
                  pendingLabel="Memuat…"
                  size="sm"
                  variant="outline"
                  className="h-9 border-primary/25 bg-white/80 px-3.5"
                  icon="sparkles"
                />
              </form>
              <Button asChild size="sm" className="h-9 px-4">
                <Link href="/register">
                  Mulai gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
