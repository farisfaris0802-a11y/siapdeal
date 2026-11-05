"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  LogIn,
  Menu,
  X,
} from "lucide-react";

import { JudgeLoginButton } from "@/components/auth/judge-login-button";
import { Button } from "@/components/ui/button";
import { judgeLoginAction } from "@/lib/actions/auth";

const navItems = [
  { href: "#cara-kerja", label: "Cara kerja" },
  { href: "#mitra", label: "Persona Bali" },
  { href: "#rubrik", label: "Rubrik" },
];

export function SiteMobileMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="group ios-pop relative h-9 w-9 overflow-hidden rounded-full border border-border/70 bg-gradient-to-b from-white/80 via-white/60 to-secondary/60 text-primary shadow-md ring-1 ring-inset ring-white/60 backdrop-blur-xl transition-[transform,background-color,box-shadow,color] duration-300 hover:-translate-y-0.5 hover:from-white/95 hover:to-secondary/80 hover:shadow-lg active:translate-y-0 active:scale-[0.96] motion-reduce:transition-none sm:h-10 sm:w-10"
        aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
        aria-expanded={open}
        aria-controls="mobile-site-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Tutup menu navigasi"
            className="fixed inset-0 z-40 bg-primary/15 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          <div
            id="mobile-site-menu"
            className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-white/70 bg-background/95 p-3 shadow-2xl ring-1 ring-primary/10 backdrop-blur-2xl animate-in-up motion-reduce:animate-none"
          >
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-secondary/80"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-brand-teal" />
                </a>
              ))}
            </nav>

            {!isLoggedIn && (
              <>
                <div className="my-3 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
                <div className="grid gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 w-full justify-start gap-2 border-primary/15 bg-white/60 text-primary hover:bg-secondary/70"
                  >
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <LogIn className="h-4 w-4 text-brand-teal" />
                      Masuk
                    </Link>
                  </Button>

                  <form action={judgeLoginAction}>
                    <input type="hidden" name="next" value="/simulasi/baru?demo=1" />
                    <JudgeLoginButton
                      label="Demo"
                      pendingLabel="Memuat..."
                      size="lg"
                      variant="default"
                      className="ios-primary w-full justify-start"
                      icon="sparkles"
                    />
                  </form>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
