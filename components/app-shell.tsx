import Link from "next/link";
import { LogOut, PlusCircle } from "lucide-react";

import { Logo } from "@/components/logo";
import { MobileNav, SidebarNav } from "@/components/app-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { initials } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";

export function AppShell({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const fullName =
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "Pengguna";
  const isJudge =
    Boolean(user.is_anonymous) || user.user_metadata?.role === "judge";
  const email = isJudge ? "Mode demo juri" : user.email ?? "";

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col overflow-hidden bg-[#0F172A] px-4 py-6 lg:flex">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.18),transparent_68%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/[0.06]" />

        <div className="relative px-2">
          <Logo
            href="/dashboard"
            inverted
            tagline="B2B AI Negotiation Simulator"
          />
        </div>

        <Button
          asChild
          className="relative mt-7 h-11 w-full justify-start rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-emerald-900/40"
        >
          <Link href="/simulasi/baru">
            <PlusCircle className="h-4 w-4" />
            Simulasi Baru
          </Link>
        </Button>

        <div className="relative mt-7 flex-1">
          <p className="mb-3 px-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
            Workspace
          </p>
          <SidebarNav />
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-3.5 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Avatar className="h-10 w-10 border border-white/10">
                  <AvatarFallback className="bg-emerald-500/15 text-xs font-bold text-emerald-200">
                    {initials(fullName)}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0F172A] bg-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-xs font-semibold text-white">
                    {fullName}
                  </p>
                  {isJudge && (
                    <span className="shrink-0 rounded-full bg-amber-400/15 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-amber-300">
                      Juri
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-[10px] text-white/40">
                  {email}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[9px] font-medium text-emerald-300/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online · Free Plan
                </p>
              </div>
              <form action="/auth/signout" method="post">
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon-sm"
                  className="text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Keluar dari akun"
                  title="Keluar"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0F172A] lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Logo href="/dashboard" inverted compact />
          <div className="flex items-center gap-2">
            <form action="/auth/signout" method="post">
              <Button
                type="submit"
                variant="ghost"
                size="icon-sm"
                aria-label="Keluar dari akun"
                className="text-white/55 hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
            <Link href="/dashboard" aria-label="Profil">
              <Avatar className="h-8 w-8 border border-white/10">
                <AvatarFallback className="bg-emerald-500/20 text-[10px] font-bold text-emerald-200">
                  {initials(fullName)}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <div className="lg:pl-[264px]">
        <main className="min-h-[calc(100dvh-3.5rem)] pb-16 lg:min-h-screen lg:pb-0">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
