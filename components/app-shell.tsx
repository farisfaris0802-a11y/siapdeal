import Link from "next/link";
import { LogOut } from "lucide-react";

import { Logo } from "@/components/logo";
import {
  MobileNav,
  SidebarNav,
  SidebarPracticeCard,
} from "@/components/app-nav";
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
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col bg-[#0B2B22] px-4 py-6 lg:flex">
        <div className="px-2">
          <Logo href="/dashboard" inverted />
        </div>

        <div className="mt-9 flex-1">
          <p className="mb-3 px-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
            Ruang latihan
          </p>
          <SidebarNav />
        </div>

        <div className="space-y-4">
          <SidebarPracticeCard />

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-9 w-9 border border-white/10">
                <AvatarFallback className="bg-accent text-xs font-bold text-accent-foreground">
                  {initials(fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-xs font-semibold text-white">{fullName}</p>
                  {isJudge && (
                    <span className="shrink-0 rounded-full bg-accent px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-accent-foreground">
                      Juri
                    </span>
                  )}
                </div>
                <p className="truncate text-[10px] text-white/45">{email}</p>
              </div>
              <form action="/auth/signout" method="post">
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon-sm"
                  className="text-white/50 hover:bg-white/10 hover:text-white"
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
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Logo href="/dashboard" compact />
          <div className="flex items-center gap-2">
            <form action="/auth/signout" method="post">
              <Button
                type="submit"
                variant="ghost"
                size="icon-sm"
                aria-label="Keluar dari akun"
                className="text-muted-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
            <Link href="/dashboard" aria-label="Profil">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-[10px] font-bold text-primary-foreground">
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
