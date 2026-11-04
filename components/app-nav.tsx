"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  History,
  LayoutDashboard,
  PlusCircle,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

const primaryNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/simulasi/baru", label: "Simulasi baru", icon: PlusCircle, exact: false },
  { href: "/dashboard#riwayat", label: "Riwayat sesi", icon: History, exact: false },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {primaryNav.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : item.href.startsWith("/dashboard#")
            ? false
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-white/12 text-white shadow-sm ring-1 ring-white/10"
                : "text-white/60 hover:bg-white/[0.06] hover:text-white"
            )}
          >
            <item.icon
              className={cn(
                "h-[18px] w-[18px]",
                active ? "text-accent" : "text-white/45 group-hover:text-white/80"
              )}
            />
            {item.label}
            {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}
          </Link>
        );
      })}
    </nav>
  );
}

export function SidebarPracticeCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/20 blur-xl" />
      <Sparkles className="h-5 w-5 text-accent" />
      <p className="mt-3 text-sm font-bold text-white">Latihan 5 menit</p>
      <p className="mt-1 text-xs leading-relaxed text-white/55">
        Satu skenario, satu evaluasi. Konsisten berlatih lebih penting daripada
        satu sesi panjang.
      </p>
      <Link
        href="/simulasi/baru"
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-accent/80"
      >
        Mulai sekarang
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  const items = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/simulasi/baru", label: "Latihan", icon: PlusCircle },
    { href: "/dashboard#riwayat", label: "Riwayat", icon: History },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-3">
        {items.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : item.href === "/simulasi/baru"
                ? pathname === "/simulasi/baru"
                : false;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
