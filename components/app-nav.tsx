"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardCheck,
  History,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";

const primaryNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/simulasi/baru", label: "Simulasi Baru", icon: PlusCircle, exact: false },
  { href: "/dashboard#riwayat", label: "Riwayat Sesi", icon: History, exact: false },
  { href: "/evaluasi", label: "Evaluasi", icon: ClipboardCheck, exact: false },
];

function isActive(pathname: string, href: string, exact: boolean) {
  if (href.startsWith("/dashboard#")) return false;
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {primaryNav.map((item) => {
        const active = isActive(pathname, item.href, item.exact);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium transition-all duration-200",
              active
                ? "bg-emerald-400/10 text-white ring-1 ring-inset ring-emerald-300/15"
                : "text-white/55 hover:bg-white/[0.055] hover:text-white"
            )}
          >
            <item.icon
              className={cn(
                "h-[18px] w-[18px] transition-colors",
                active
                  ? "text-emerald-300"
                  : "text-white/35 group-hover:text-emerald-300/80"
              )}
            />
            {item.label}
            {active && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_0_3px_rgba(251,191,36,0.12)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  const items = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/simulasi/baru", label: "Latihan", icon: PlusCircle },
    { href: "/dashboard#riwayat", label: "Riwayat", icon: History },
    { href: "/evaluasi", label: "Evaluasi", icon: ClipboardCheck },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const active = isActive(pathname, item.href, item.href === "/dashboard");

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold transition-colors duration-200",
                active ? "text-emerald-700" : "text-slate-400"
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
