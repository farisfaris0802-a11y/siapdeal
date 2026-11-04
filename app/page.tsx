import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  Check,
  ChevronRight,
  Clock,
  Cpu,
  Gavel,
  Hotel,
  Lightbulb,
  LineChart,
  LockKeyhole,
  MapPin,
  MessageSquare,
  MessagesSquare,
  Quote,
  ShieldCheck,
  Store,
  Target,
  TrendingUp,
  Users,
  Waves,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { ScoreRing } from "@/components/score-ring";
import { SiteHeader } from "@/components/site-header";
import { JudgeLoginButton } from "@/components/auth/judge-login-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { judgeLoginAction } from "@/lib/actions/auth";
import {
  DIFFICULTY_META,
  PARTNER_META,
  RUBRIC_ASPECTS,
} from "@/lib/ai/personas";

const personas = [
  {
    type: "hotel_resort_bali" as const,
    Icon: Hotel,
    tone: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    type: "souvenir_retail" as const,
    Icon: Store,
    tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    type: "beach_club_cafe" as const,
    Icon: Waves,
    tone: "bg-sky-50 text-sky-700 border-sky-200",
  },
];

export default async function LandingPage() {
  const { user } = await getCurrentUser();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader isLoggedIn={Boolean(user)} />

      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-32 h-[380px] w-[380px] rounded-full bg-amber-200/40 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 grain opacity-[0.45]" />

        <div className="container relative grid items-center gap-12 pb-12 pt-9 lg:grid-cols-[1.03fr_0.97fr] lg:gap-10 lg:pb-20 lg:pt-14">
          <div className="animate-in-up">
            <Badge
              variant="outline"
              className="mb-6 gap-2 border-primary/20 bg-white/70 px-3 py-1.5 text-xs text-primary shadow-sm backdrop-blur"
            >
              <Award className="h-3.5 w-3.5" />
              Bali DigiFest 2026 · AI Web Innovation Challenge
            </Badge>

            <h1 className="text-balance font-display text-[2.35rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.7rem]">
              Latih negosiasi
              <br />
              <span className="relative inline-block">
                sebelum bertemu
                <svg
                  className="absolute -bottom-2 left-0 w-full text-accent"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8.5C75 3 150 2.5 297 6"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              pembeli Bali.
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
              <span className="font-semibold text-ink">SiapDeal</span> adalah
              AI flight simulator negosiasi untuk UMKM Bali. Hadapi F&amp;B
              Director hotel Nusa Dua, manager pusat oleh-oleh, dan owner beach
              club Canggu yang menawar margin, menuntut titip jual, serta
              memperpanjang TOP — lalu dapatkan skor 5 aspek dan kalimat
              perbaikan yang siap dipakai.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {user ? (
                <>
                  <Button asChild size="lg" className="group">
                    <Link href="/simulasi/baru">
                      Mulai simulasi baru
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/dashboard">
                      Buka dashboard
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <form action={judgeLoginAction} className="w-full sm:w-auto">
                    <input type="hidden" name="next" value="/simulasi/baru?demo=1" />
                    <JudgeLoginButton
                      label="Quick Demo Login as Judge"
                      pendingLabel="Menyiapkan ruang juri…"
                      size="lg"
                      className="w-full"
                    />
                  </form>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/register">
                      Saya pelaku UMKM
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {!user && (
              <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1 font-medium text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Tanpa registrasi
                </span>
                <span className="text-border">·</span>
                <span>1 klik untuk juri</span>
                <span className="text-border">·</span>
                <span>skenario Bali sudah terisi</span>
                <span className="text-border">·</span>
                <Link href="/login" className="font-medium underline-offset-4 hover:underline">
                  Masuk akun
                </Link>
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" /> 3 persona Bali asli
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" /> Rubrik 5 aspek
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" /> Saran kalimat siap pakai
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-[520px] animate-in-up animate-delay-2 lg:mx-0">
            <div className="absolute -right-3 -top-5 z-20 hidden w-[178px] rounded-2xl border border-white bg-white/95 p-3.5 shadow-lift backdrop-blur sm:block">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Skor negosiasi
                </p>
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <div className="mt-1 flex items-end gap-1">
                <span className="font-display text-4xl font-bold leading-none text-ink">78</span>
                <span className="pb-1 text-xs font-medium text-muted-foreground">/100</span>
              </div>
              <div className="mt-3 space-y-1.5">
                {[86, 78, 64, 72, 88].map((value, index) => (
                  <div key={index} className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-emerald-700"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-2.5 text-[10px] font-medium text-emerald-700">
                +12 poin dari sesi sebelumnya
              </p>
            </div>

            <div className="relative z-10 overflow-hidden rounded-[26px] border border-border/80 bg-white shadow-lift">
              <div className="flex items-center justify-between border-b border-border/70 bg-sand-50 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative grid h-10 w-10 place-items-center rounded-full bg-amber-100 text-lg">
                    🏨
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-tight text-ink">Ibu Ayu Prameswari</p>
                    <p className="text-[11px] text-muted-foreground">
                      F&amp;B Director · Amrita Resort Nusa Dua
                    </p>
                  </div>
                </div>
                <Badge variant="warning" className="text-[10px]">
                  Hotel Resort
                </Badge>
              </div>

              <div className="space-y-3.5 bg-[#FDFCF8] p-5">
                <div className="flex gap-2.5">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-800">
                    A
                  </div>
                  <div className="max-w-[82%] rounded-2xl rounded-tl-md border border-border/70 bg-white px-3.5 py-2.5 text-[13px] leading-relaxed text-ink shadow-sm">
                    Untuk welcome amenity kami butuh 300 pcs per bulan. Tapi
                    kami minta harga distributor Rp62.000 dan TOP 60 hari, ya.
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="max-w-[84%] rounded-2xl rounded-tr-md bg-primary px-3.5 py-2.5 text-[13px] leading-relaxed text-primary-foreground shadow-sm">
                    Harga dasar kami Rp85.000. Untuk 300 pcs saya bisa
                    Rp74.000, termasuk gift packaging dan 20 sampel gratis.
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-800">
                    A
                  </div>
                  <div className="max-w-[82%] rounded-2xl rounded-tl-md border border-border/70 bg-white px-3.5 py-2.5 text-[13px] leading-relaxed text-ink shadow-sm">
                    Masih di atas target food cost kami. Kalau bisa Rp68.000,
                    kami bantu eksposur di tiga outlet dan kontrak 6 bulan.
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-9 pt-0.5">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-muted-foreground/50" />
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
                  <span className="ml-1 text-[10px] text-muted-foreground">
                    Ibu Ayu sedang mengetik…
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-border/70 bg-white p-3">
                <div className="flex-1 rounded-full border border-border bg-sand-50 px-4 py-2.5 text-xs text-muted-foreground">
                  Tulis respons negosiasi Anda…
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-12 -left-4 z-20 hidden items-center gap-2.5 rounded-xl border border-emerald-200 bg-white px-3.5 py-2.5 shadow-lift sm:flex">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-100">
                <BadgeCheck className="h-4 w-4 text-emerald-700" />
              </span>
              <div>
                <p className="text-[10px] font-medium text-muted-foreground">Status sesi</p>
                <p className="text-xs font-bold text-ink">Kesepakatan tercapai 🎉</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container relative pb-14">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/80 bg-border/70 sm:grid-cols-4">
            {[
              { value: "3", label: "Persona pembeli Bali", icon: Users },
              { value: "9", label: "Skenario mitra × level", icon: Target },
              { value: "5", label: "Aspek penilaian tetap", icon: Clock },
              { value: "0", label: "Risiko ke mitra nyata", icon: ShieldCheck },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 bg-white px-5 py-5">
                <item.icon className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-display text-xl font-bold leading-none text-ink">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== MASALAH ============================== */}
      <section className="border-y border-border/60 bg-white">
        <div className="container grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <div>
            <Badge variant="muted" className="mb-4">
              Kenapa UMKM Bali butuh ini
            </Badge>
            <h2 className="text-balance font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              Negosiasi Bali punya aturannya sendiri. Jangan belajar dari
              kesepakatan yang sudah hilang.
            </h2>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Hotel menuntut sertifikasi dan TOP panjang. Pusat oleh-oleh menawar
              dengan titip jual. Beach club menghitung food cost per porsi.
              Pelatihan sales umumnya tidak menyiapkan Anda menghadapi ketiganya
              sekaligus.
            </p>

            <div className="mt-7 space-y-4">
              {[
                {
                  title: "Tiga gaya pembeli, satu produk",
                  body: "Harga distributor hotel, margin ritel 40%, dan food cost 30% menuntut jawaban yang berbeda.",
                },
                {
                  title: "Titip jual dan TOP 60 hari",
                  body: "Stok dan arus kas Anda dipertaruhkan. Tanpa latihan, mudah menyerah pada syarat yang merugikan.",
                },
                {
                  title: "Tidak tahu bagian mana yang lemah",
                  body: "Tanpa rubrik tetap, sulit tahu apakah masalahnya di nilai produk, objection handling, atau closing.",
                },
              ].map((item, index) => (
                <div key={item.title} className="flex gap-3.5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose-50 text-xs font-bold text-rose-700">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-lift sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-2xl" />
            <Quote className="h-9 w-9 text-accent" />
            <blockquote className="mt-5 font-display text-2xl font-semibold leading-snug sm:text-[1.7rem]">
              “Saya sudah tiga kali presentasi ke hotel dan selalu gugup saat
              ditanya margin serta TOP. Baru sadar, jawaban saya terlalu umum.”
            </blockquote>
            <p className="mt-5 text-sm leading-relaxed text-primary-foreground/70">
              — cerita yang berulang dari pengrajin dan produsen makanan Bali
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {[
                ["1", "Persiapan"],
                ["5", "Aspek dinilai"],
                ["∞", "Kesempatan ulang"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-3xl font-bold text-accent">{value}</p>
                  <p className="mt-1 text-[11px] font-medium text-primary-foreground/70">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================== FITUR ============================== */}
      <section id="fitur" className="container scroll-mt-20 py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="muted" className="mb-4">
            Fitur inti MVP
          </Badge>
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Satu alur sederhana: atur skenario, bernegosiasi, lalu evaluasi.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Tidak ada teori panjang. Anda langsung berlatih menghadapi tekanan
            pembeli profesional dan mendapat umpan balik yang bisa dipakai.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: MessageSquare,
              title: "Pembeli virtual khas Bali",
              body: "F&B Director Nusa Dua, manager oleh-oleh, dan owner beach club Canggu. Karakter, batas harga, dan playbook tawar-menawar terkunci pada persona.",
              accent: "bg-emerald-50 text-emerald-700",
            },
            {
              icon: Target,
              title: "Rubrik penilaian 5 aspek",
              body: "Setiap transkrip dinilai dengan rubrik tetap — bukan penilaian subjektif. Skor 0–100, kelebihan, kelemahan, dan alasan yang spesifik.",
              accent: "bg-amber-50 text-amber-700",
            },
            {
              icon: Lightbulb,
              title: "Kalimat pengganti yang lebih kuat",
              body: "Respons lemah diubah menjadi contoh kalimat siap pakai, lengkap dengan alasan mengapa versi baru lebih efektif.",
              accent: "bg-sky-50 text-sky-700",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border/80 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${feature.accent}`}>
                <feature.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================== CARA KERJA ============================== */}
      <section id="cara-kerja" className="scroll-mt-20 border-y border-border/60 bg-white">
        <div className="container py-16 lg:py-24">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <Badge variant="muted" className="mb-4">
                Cara kerja
              </Badge>
              <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Dari skenario ke strategi baru dalam empat langkah.
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href={user ? "/simulasi/baru" : "/register"}>
                Coba sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Pilih mitra Bali",
                body: "Masukkan produk, harga dasar, kategori, dan USP. Pilih hotel resort, pusat oleh-oleh, atau beach club.",
                icon: Building2,
              },
              {
                step: "02",
                title: "Mulai negosiasi",
                body: "Pembeli membuka percakapan. Jawab tuntutan margin, titip jual, TOP, dan sertifikasi.",
                icon: MessageSquare,
              },
              {
                step: "03",
                title: "Tutup sesi",
                body: "AI mendeteksi kesepakatan atau kebuntuan. Anda juga bisa mengakhiri kapan saja.",
                icon: BadgeCheck,
              },
              {
                step: "04",
                title: "Pelajari hasilnya",
                body: "Lihat skor per aspek, kekuatan, kelemahan, dan contoh kalimat yang lebih baik.",
                icon: LineChart,
              },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="flex items-center gap-3">
                  <span className="font-display text-4xl font-bold text-secondary">
                    {item.step}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-sand-50 text-primary">
                    <item.icon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
                {index < 3 && (
                  <ArrowRight className="absolute -right-4 top-6 hidden h-4 w-4 text-border lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== RUBRIK ============================== */}
      <section id="rubrik" className="container scroll-mt-20 py-16 lg:py-24">
        <div className="overflow-hidden rounded-[32px] bg-primary text-primary-foreground shadow-lift">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative p-8 sm:p-12">
              <div className="pointer-events-none absolute inset-0 grain opacity-30" />
              <Badge className="relative mb-5 border-white/15 bg-white/10 text-primary-foreground">
                Rubrik tetap · skor 0–100
              </Badge>
              <h2 className="relative text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Lima aspek yang menentukan apakah penawaran Anda layak
                dipercaya.
              </h2>
              <p className="relative mt-4 max-w-lg text-sm leading-relaxed text-primary-foreground/70">
                Rubrik yang sama dipakai di setiap sesi, sehingga skor Anda
                benar-benar bisa dibandingkan dari waktu ke waktu.
              </p>

              <div className="relative mt-8 space-y-3">
                {RUBRIC_ASPECTS.map((aspect, index) => (
                  <div
                    key={aspect.key}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm"
                  >
                    <span className="mt-0.5 font-display text-lg font-bold text-accent">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold">{aspect.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-primary-foreground/65">
                        {aspect.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col justify-center gap-6 bg-[#F7F3E8] p-8 text-ink sm:p-12">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Contoh hasil evaluasi
                  </p>
                  <p className="mt-1 font-display text-xl font-bold">Sesi Kopi Kintamani × Hotel Resort</p>
                </div>
                <Badge variant="success">Cukup baik</Badge>
              </div>

              <div className="flex items-center gap-6 rounded-2xl border border-border bg-white p-5 shadow-soft">
                <ScoreRing score={74} size={112} strokeWidth={9} />
                <div className="space-y-2.5 text-sm">
                  {[
                    ["Kejelasan penawaran", 82],
                    ["Value proposition", 78],
                    ["Objection handling", 61],
                    ["Margin flexibility", 70],
                    ["Closing assertion", 79],
                  ].map(([label, score]) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <span className="w-[128px] shrink-0 text-[11px] text-muted-foreground">
                        {label}
                      </span>
                      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                        <span
                          className="block h-full rounded-full bg-emerald-700"
                          style={{ width: `${score}%` }}
                        />
                      </span>
                      <span className="text-[11px] font-bold">{score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Lightbulb className="h-3.5 w-3.5" />
                  Contoh saran perbaikan
                </p>
                <p className="mt-2 text-xs leading-relaxed text-emerald-900/80">
                  “Saya bisa Rp74.000 untuk 300 pcs per bulan, asalkan TOP 30
                  hari dan kontrak 6 bulan. Gift packaging serta 20 sampel gratis
                  kami sertakan. Boleh kita kunci uji coba dua minggu?”
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                Penilaian AI bersifat panduan latihan, bukan jaminan hasil nyata.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== PERSONA ============================== */}
      <section id="mitra" className="scroll-mt-20 border-y border-border/60 bg-white">
        <div className="container py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="muted" className="mb-4">
              Profil pembeli virtual
            </Badge>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Tiga wajah pembeli Bali. Tiga tingkat tekanan.
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Setiap kombinasi punya karakter, batas harga, dan playbook
              komersial yang berbeda — seperti negosiasi sesungguhnya.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {personas.map(({ type, Icon, tone }) => {
              const meta = PARTNER_META[type];
              return (
                <div
                  key={type}
                  className="group flex flex-col rounded-2xl border border-border/80 bg-sand-50/50 p-6 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lift"
                >
                  <div className="flex items-center justify-between">
                    <span className={`grid h-11 w-11 place-items-center rounded-xl border ${tone}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-2xl">{meta.emoji}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold leading-snug text-ink">
                    {meta.label}
                  </h3>
                  <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {meta.location}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {meta.description}
                  </p>
                  <div className="mt-4 space-y-1.5 border-t border-border pt-4">
                    {meta.playbook.slice(0, 2).map((tactic) => (
                      <p
                        key={tactic}
                        className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {tactic}
                      </p>
                    ))}
                  </div>
                  <div className="mt-auto border-t border-border pt-4">
                    <p className="text-xs font-bold text-ink">
                      {meta.buyerName} · {meta.buyerRole}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{meta.company}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(["easy", "medium", "hard"] as const).map((difficulty) => (
                      <Badge
                        key={difficulty}
                        variant={difficulty === "hard" ? "destructive" : difficulty === "medium" ? "warning" : "success"}
                        className="text-[10px]"
                      >
                        {DIFFICULTY_META[difficulty].label}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== AI PIPELINE ============================== */}
      <section id="teknologi" className="container scroll-mt-20 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <Badge variant="muted" className="mb-4">
              Di balik layar
            </Badge>
            <h2 className="text-balance font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              Bukan chatbot biasa. Ini simulator dengan aturan main.
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Setiap persona punya batas harga rahasia, playbook tuntutan, dan
              protokol akhir sesi. Evaluasi memakai structured output, bukan
              penilaian bebas yang berubah-ubah.
            </p>

            <div className="mt-7 space-y-3.5">
              {[
                {
                  icon: LockKeyhole,
                  title: "Reservation price tersembunyi",
                  body: "Batas harga pembeli dihitung dari rasio persona × harga dasar, tidak pernah dibocorkan ke model lawan bicara.",
                },
                {
                  icon: MessagesSquare,
                  title: "Streaming dua arah + persistensi",
                  body: "Balasan pembeli mengalir token demi token, sementara transkrip disimpan untuk evaluasi.",
                },
                {
                  icon: Gavel,
                  title: "Rubrik 5 aspek via structured output",
                  body: "Zod schema memaksa skor, feedback, kekuatan, kelemahan, dan kalimat pengganti dalam bentuk JSON yang konsisten.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3.5 rounded-2xl border border-border/70 bg-white p-4 shadow-soft">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-[#0B2B22] p-6 text-white shadow-lift sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 grain opacity-20" />
            <div className="relative flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                <Cpu className="h-3.5 w-3.5 text-accent" />
                SiapDeal AI pipeline
              </p>
              <Badge className="border-white/10 bg-white/10 text-[10px] text-white">
                Gemini / GPT
              </Badge>
            </div>

            <div className="relative mt-6 space-y-3 font-mono text-[11px] leading-relaxed">
              {[
                { step: "01", title: "persona", value: "hotel_resort_bali · medium" },
                { step: "02", title: "secret_floor", value: "0.79 × base_price" },
                { step: "03", title: "streamText", value: "buyer reply → data stream" },
                { step: "04", title: "end_protocol", value: "[[DEAL]] / [[NO_DEAL]]" },
                { step: "05", title: "generateObject", value: "5 aspects → evaluations" },
              ].map((row) => (
                <div
                  key={row.step}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2.5"
                >
                  <span className="text-accent">{row.step}</span>
                  <span className="w-[92px] shrink-0 text-white/45">{row.title}</span>
                  <span className="text-white/80">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="relative mt-5 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.05] p-3.5 text-[10px] leading-relaxed text-white/55">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              Prompt pembeli dikunci pada konteks bisnis. Permintaan membocorkan
              instruksi atau keluar karakter ditolak.
            </div>
          </div>
        </div>
      </section>

      {/* ============================== CTA ============================== */}
      <section className="container py-16 lg:py-20">
        <div className="relative overflow-hidden rounded-[32px] bg-accent p-8 text-accent-foreground shadow-lift sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground/70">
                Bali DigiFest 2026 · siap dinilai
              </p>
              <h2 className="text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Coba alur lengkapnya
                <br className="hidden sm:block" /> dalam satu klik.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-accent-foreground/75 sm:text-base">
                Juri bisa langsung masuk tanpa registrasi. Pelaku UMKM bisa
                membuat akun untuk menyimpan riwayat dan membandingkan skor.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              {user ? (
                <>
                  <Button asChild size="lg" className="w-full bg-ink text-white hover:bg-ink/90 lg:w-auto">
                    <Link href="/simulasi/baru">
                      Mulai simulasi
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full border-ink/20 bg-transparent hover:bg-white/40 lg:w-auto">
                    <Link href="/dashboard">Buka dashboard</Link>
                  </Button>
                </>
              ) : (
                <>
                  <form action={judgeLoginAction} className="w-full lg:w-auto">
                    <input type="hidden" name="next" value="/simulasi/baru?demo=1" />
                    <JudgeLoginButton
                      label="Quick Demo Login as Judge"
                      pendingLabel="Menyiapkan…"
                      size="lg"
                      className="w-full bg-ink text-white hover:bg-ink/90"
                    />
                  </form>
                  <Button asChild size="lg" variant="outline" className="w-full border-ink/20 bg-transparent hover:bg-white/40 lg:w-auto">
                    <Link href="/register">
                      Buat akun UMKM
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================== FOOTER ============================== */}
      <footer className="border-t border-border/70 bg-white">
        <div className="container py-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div className="max-w-sm">
              <Logo />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                AI flight simulator negosiasi B2B untuk membantu UMKM Bali masuk
                jalur retail dan hospitality dengan lebih percaya diri.
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-sand-50 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                <Award className="h-3 w-3 text-primary" />
                Bali DigiFest 2026 · AI Web Innovation Challenge
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 text-sm">
              <div>
                <p className="font-bold text-ink">Produk</p>
                <div className="mt-3 space-y-2 text-muted-foreground">
                  <Link href="/simulasi/baru" className="block hover:text-foreground">
                    Simulasi baru
                  </Link>
                  <Link href="/dashboard" className="block hover:text-foreground">
                    Dashboard
                  </Link>
                  <a href="#rubrik" className="block hover:text-foreground">
                    Rubrik penilaian
                  </a>
                </div>
              </div>
              <div>
                <p className="font-bold text-ink">Akun</p>
                <div className="mt-3 space-y-2 text-muted-foreground">
                  <Link href="/login" className="block hover:text-foreground">
                    Masuk
                  </Link>
                  <Link href="/register" className="block hover:text-foreground">
                    Daftar
                  </Link>
                  <a href="#mitra" className="block hover:text-foreground">
                    Profil pembeli
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} SiapDeal · NegoLab. Dibuat untuk UMKM Bali.</p>
            <p className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Denpasar · Nusa Dua · Canggu
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
