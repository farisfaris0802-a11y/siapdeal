import Link from "next/link";
import { ArrowLeft, BadgeCheck, Check, ShieldCheck, Sparkles } from "lucide-react";

import { Logo } from "@/components/logo";

export function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        {/* Brand panel */}
        <div className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="pointer-events-none absolute inset-0 grain opacity-25" />
          <div className="pointer-events-none absolute -right-28 top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

          <Logo href="/" className="relative" inverted />

          <div className="relative max-w-lg">
            <BadgeCheck className="h-10 w-10 text-accent" />
            <h2 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.12] tracking-tight xl:text-5xl">
              Pembeli terbaik tidak datang dua kali. Latih jawaban Anda
              sekarang.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-primary-foreground/70">
              SiapDeal menghadirkan pembeli virtual Bali yang realistis, rubrik
              penilaian tetap, dan saran kalimat yang bisa langsung Anda pakai.
            </p>

            <div className="mt-8 space-y-3.5">
              {[
                "9 profil pembeli: hotel resort, oleh-oleh, dan beach club",
                "Penilaian 5 aspek dengan skor 0–100",
                "Riwayat sesi dan grafik perkembangan skor",
                "Tanpa risiko merusak hubungan mitra sungguhan",
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-primary-foreground/85">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/20 text-lg">
              ☕
            </div>
            <div>
              <p className="text-sm font-semibold">“Latihannya terasa seperti meeting asli.”</p>
              <p className="mt-0.5 text-xs text-primary-foreground/60">
                Produsen kopi lokal · pengguna beta
              </p>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-5 sm:p-8">
            <div className="lg:hidden">
              <Logo />
            </div>
            <Link
              href="/"
              className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Beranda
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center px-5 pb-14 pt-4 sm:px-8">
            <div className="w-full max-w-[430px]">
              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-primary shadow-sm">
                  <Sparkles className="h-3 w-3" />
                  Ruang latihan negosiasi
                </div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                  {title}
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {subtitle}
                </p>
              </div>

              {children}

              <div className="mt-8 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Data Anda disimpan aman dan tidak dibagikan ke pihak lain.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
