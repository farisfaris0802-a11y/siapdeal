import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Hotel,
  Lightbulb,
  Store,
  TrendingUp,
  Waves,
} from "lucide-react";

import { JudgeLoginButton } from "@/components/auth/judge-login-button";
import { Logo } from "@/components/logo";
import { ScoreRing } from "@/components/score-ring";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { judgeLoginAction } from "@/lib/actions/auth";
import {
  RUBRIC_ASPECTS,
} from "@/lib/ai/personas";
import { getCurrentUser } from "@/lib/auth";

function JudgeDemoForm({
  formClassName,
  buttonClassName,
  variant = "default",
}: {
  formClassName?: string;
  buttonClassName?: string;
  variant?: "default" | "outline";
}) {
  return (
    <form action={judgeLoginAction} className={formClassName}>
      <input type="hidden" name="next" value="/simulasi/baru?demo=1" />
      <JudgeLoginButton
        label="Mode Juri (Demo)"
        pendingLabel="Menyiapkan ruang juri…"
        size="lg"
        variant={variant}
        className={buttonClassName}
        icon="sparkles"
      />
    </form>
  );
}

function DealRoomPanel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary-foreground/15 bg-background text-ink shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <Hotel className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">
              Ibu Ayu Prameswari
            </p>
            <p className="truncate text-xs text-muted-foreground">
              F&amp;B Director, Amrita Resort Nusa Dua
            </p>
          </div>
        </div>
        <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
          Sesi aktif
        </span>
      </div>

      <div className="space-y-4 px-5 py-5">
        <div>
          <p className="mb-1.5 text-[11px] font-medium text-muted-foreground">
            Mitra B2B
          </p>
          <div className="max-w-[92%] rounded-2xl rounded-tl-none border border-border bg-card px-4 py-3 text-sm leading-relaxed text-ink">
            Untuk welcome amenity kami butuh 300 pcs per bulan. Kami minta harga
            distributor Rp62.000 dan TOP 60 hari, ya.
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[92%] rounded-2xl rounded-tr-none bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground">
            Harga dasar Rp85.000. Untuk 300 pcs saya bisa Rp74.000, termasuk
            gift packaging dan 20 sampel gratis.
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-medium text-muted-foreground">
            Mitra B2B
          </p>
          <div className="max-w-[92%] rounded-2xl rounded-tl-none border border-border bg-card px-4 py-3 text-sm leading-relaxed text-ink">
            Masih di atas target food cost kami. Kalau bisa Rp68.000, kami bantu
            eksposur di tiga outlet dan kontrak 6 bulan.
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 text-[11px] text-muted-foreground">
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-primary motion-reduce:animate-none" />
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-primary [animation-delay:150ms] motion-reduce:animate-none" />
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-primary [animation-delay:300ms] motion-reduce:animate-none" />
          </span>
          Ibu Ayu sedang meninjau penawaran Anda
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-4">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground">
            Skor negosiasi
          </p>
          <p className="mt-1 flex items-end gap-1">
            <span className="font-display text-3xl font-bold leading-none text-ink">
              78
            </span>
            <span className="pb-0.5 text-xs text-muted-foreground">/100</span>
          </p>
        </div>
        <div className="text-right">
          <p className="flex items-center justify-end gap-1 text-xs font-semibold text-primary">
            <TrendingUp className="h-3.5 w-3.5" />
            +12 poin
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            dari sesi sebelumnya
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function LandingPage() {
  const { user } = await getCurrentUser();

  return (
    <div className="min-h-screen bg-background font-sans text-ink [&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-ring">
      <SiteHeader isLoggedIn={Boolean(user)} />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container grid w-full grid-cols-1 gap-12 py-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-16 lg:py-16">
          <div className="min-w-0">
            <h1 className="w-full max-w-[650px] break-words font-sans text-[2.5rem] font-bold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[3.55rem]">
              Flight Simulator
              <br className="hidden sm:block" />{" "}
              Negosiasi B2B Pertama
              <br className="hidden sm:block" />{" "}
              untuk UMKM Bali
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-primary-foreground/70 sm:text-base">
              Latih taktik tawar-menawar menghadapi F&amp;B Director Hotel,
              Ritel, dan Beach Club berbasis AI sebelum bertemu pembeli aslinya.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                variant="accent"
                className="shadow-sm"
              >
                <Link href={user ? "/simulasi/baru" : "/register"}>
                  {user ? "Mulai simulasi" : "Mulai Gratis"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              {user ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="/dashboard">Buka dashboard</Link>
                </Button>
              ) : (
                <JudgeDemoForm
                  formClassName="w-full sm:w-auto"
                  variant="outline"
                  buttonClassName="w-full border border-primary-foreground/25 bg-transparent text-primary-foreground shadow-none hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
                />
              )}
            </div>

            <p className="mt-3 text-[11px] text-primary-foreground/55">
              Tanpa registrasi. Satu klik untuk juri.
            </p>
          </div>

          <div className="relative min-w-0">
            <DealRoomPanel />

            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-primary-foreground/15 pt-4 text-[11px] text-primary-foreground/60">
              <span className="flex items-center gap-1.5">
                <Hotel className="h-3.5 w-3.5 text-accent" />
                Hotel Resort
              </span>
              <span className="flex items-center gap-1.5">
                <Store className="h-3.5 w-3.5 text-accent" />
                Oleh-Oleh
              </span>
              <span className="flex items-center gap-1.5">
                <Waves className="h-3.5 w-3.5 text-accent" />
                Beach Club
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Rubric */}
      <section id="rubrik" className="scroll-mt-24 bg-background">
        <div className="container py-16 lg:py-24">
          <div className="overflow-hidden rounded-2xl bg-ink text-primary-foreground">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <h2 className="max-w-lg font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Lima aspek yang menentukan apakah penawaran Anda layak
                  dipercaya.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/60">
                  Rubrik yang sama dipakai di setiap sesi, sehingga skor Anda
                  bisa dibandingkan dari waktu ke waktu.
                </p>

                <div className="mt-7 space-y-0 divide-y divide-primary-foreground/10 border-y border-primary-foreground/10">
                  {RUBRIC_ASPECTS.map((aspect, index) => (
                    <div
                      key={aspect.key}
                      className="flex items-start gap-4 py-3.5"
                    >
                      <span className="font-display text-sm font-bold text-accent">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-primary-foreground">
                          {aspect.label}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-primary-foreground/55">
                          {aspect.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background p-7 text-ink sm:p-10 lg:p-12">
                <p className="text-sm font-semibold text-ink">
                  Contoh hasil evaluasi
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Kopi Kintamani, Hotel Resort, level menengah
                </p>

                <div className="mt-6 flex items-center gap-5">
                  <ScoreRing score={74} size={112} strokeWidth={9} />
                  <div className="space-y-2.5">
                    {[
                      ["Kejelasan penawaran", 82],
                      ["Value proposition", 78],
                      ["Objection handling", 61],
                      ["Margin flexibility", 70],
                      ["Closing assertion", 79],
                    ].map(([label, score]) => (
                      <div key={label} className="flex items-center gap-2.5">
                        <span className="w-[124px] shrink-0 text-[10px] text-muted-foreground">
                          {label}
                        </span>
                        <span className="h-1 w-12 overflow-hidden rounded-full bg-secondary">
                          <span
                            className="block h-full rounded-full bg-primary"
                            style={{ width: `${score}%` }}
                          />
                        </span>
                        <span className="text-[10px] font-bold text-ink">
                          {score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 border-t border-border pt-5">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                    <Lightbulb className="h-3.5 w-3.5 text-accent" />
                    Contoh saran perbaikan
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    “Saya bisa Rp74.000 untuk 300 pcs per bulan, asalkan TOP 30
                    hari dan kontrak 6 bulan. Gift packaging dan 20 sampel gratis
                    kami sertakan.”
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                  Penilaian AI adalah panduan latihan, bukan jaminan hasil nyata.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-primary-foreground">
        <div className="container py-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-sm">
              <Logo href="/" inverted />
              <p className="mt-4 text-xs leading-relaxed text-primary-foreground/50">
                AI flight simulator negosiasi B2B untuk membantu UMKM Bali masuk
                jalur retail dan hospitality dengan lebih percaya diri.
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-[10px] text-primary-foreground/45">
                <Award className="h-3 w-3 text-accent" />
                Bali DigiFest 2026, AI Web Innovation Challenge
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-xs">
              <div>
                <p className="font-semibold text-primary-foreground">Produk</p>
                <div className="mt-3 space-y-2 text-primary-foreground/50">
                  <Link href="/simulasi/baru" className="block hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    Simulasi baru
                  </Link>
                  <Link href="/dashboard" className="block hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    Dashboard
                  </Link>
                  <a href="#rubrik" className="block hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    Rubrik penilaian
                  </a>
                </div>
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">Akun</p>
                <div className="mt-3 space-y-2 text-primary-foreground/50">
                  <Link href="/login" className="block hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    Masuk
                  </Link>
                  <Link href="/register" className="block hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    Daftar
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-2 border-t border-primary-foreground/10 pt-5 text-[10px] text-primary-foreground/35 sm:flex-row">
            <p>© {new Date().getFullYear()} SiapDeal. Dibuat untuk UMKM Bali.</p>
            <p>Denpasar, Nusa Dua, Canggu</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
