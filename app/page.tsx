import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Check,
  Hotel,
  Lightbulb,
  LineChart,
  MapPin,
  MessageSquare,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Users,
  Waves,
} from "lucide-react";

import { JudgeLoginButton } from "@/components/auth/judge-login-button";
import { Logo } from "@/components/logo";
import { ScoreRing } from "@/components/score-ring";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { judgeLoginAction } from "@/lib/actions/auth";
import {
  DIFFICULTY_META,
  PARTNER_META,
  RUBRIC_ASPECTS,
} from "@/lib/ai/personas";
import { getCurrentUser } from "@/lib/auth";

const personaCardTitles = {
  hotel_resort_bali: "F&B Director Hotel Resort",
  souvenir_retail: "Manager Pusat Oleh-Oleh & Ritel",
  beach_club_cafe: "Owner Kafe & Restoran Modern",
} as const;

const personaTypes = [
  {
    type: "hotel_resort_bali" as const,
    Icon: Hotel,
    tone: "border-amber-200 bg-amber-50 text-amber-700",
    accent: "border-t-emerald-600",
    iconTone: "bg-emerald-50 text-emerald-700",
  },
  {
    type: "souvenir_retail" as const,
    Icon: Store,
    tone: "border-emerald-200 bg-emerald-50 text-emerald-700",
    accent: "border-t-amber-500",
    iconTone: "bg-amber-50 text-amber-700",
  },
  {
    type: "beach_club_cafe" as const,
    Icon: Waves,
    tone: "border-sky-200 bg-sky-50 text-sky-700",
    accent: "border-t-teal-500",
    iconTone: "bg-teal-50 text-teal-700",
  },
];

const stats = [
  { value: "3", label: "Persona pembeli Bali", icon: Users },
  { value: "9", label: "Skenario mitra × level", icon: Target },
  { value: "5", label: "Aspek penilaian tetap", icon: LineChart },
  { value: "0", label: "Risiko ke mitra nyata", icon: ShieldCheck },
];

const steps = [
  {
    number: "01",
    title: "Pilih produk & mitra",
    body: "Masukkan produk, harga dasar, kategori, dan USP. Pilih hotel resort, pusat oleh-oleh, atau beach club.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Mulai negosiasi",
    body: "Pembeli virtual membuka percakapan dengan gaya khas Bali, lengkap dengan batas harga dan tuntutan komersial.",
    icon: MessagesSquare,
  },
  {
    number: "03",
    title: "AI menilai 5 aspek",
    body: "Transkrip dinilai dengan rubrik tetap: kejelasan, value, objection handling, margin, dan closing.",
    icon: Target,
  },
  {
    number: "04",
    title: "Perbaiki & ulangi",
    body: "Dapatkan skor, kekuatan, kelemahan, dan contoh kalimat yang lebih kuat untuk sesi berikutnya.",
    icon: TrendingUp,
  },
];

function JudgeDemoForm({
  formClassName,
  buttonClassName,
  label = "Mode Juri (Demo)",
}: {
  formClassName?: string;
  buttonClassName?: string;
  label?: string;
}) {
  return (
    <form action={judgeLoginAction} className={formClassName}>
      <input type="hidden" name="next" value="/simulasi/baru?demo=1" />
      <JudgeLoginButton
        label={label}
        pendingLabel="Menyiapkan ruang juri…"
        size="lg"
        className={buttonClassName}
        icon="sparkles"
      />
    </form>
  );
}

function LiveSimulationMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
      <div className="pointer-events-none absolute -inset-8 rounded-[42px] bg-[radial-gradient(circle_at_55%_42%,rgba(251,191,36,0.16),transparent_60%)] blur-2xl" />

      <div className="relative z-10 rounded-2xl border border-emerald-500/30 bg-[#062c1b] p-4 shadow-2xl lg:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0f5132_1px,transparent_1px),linear-gradient(to_bottom,#0f5132_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

        {/* Window chrome */}
        <div className="relative flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[8px] font-medium text-white/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
            siapdeal.app/simulasi/live
          </span>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-emerald-300">
            Live
          </span>
        </div>

        {/* Session header */}
        <div className="relative mt-4 flex items-center justify-between gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/40 px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-100 text-base ring-2 ring-white/10">
              🏨
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#062c1b] bg-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white">
                Ibu Ayu Prameswari
              </p>
              <Badge
                variant="outline"
                className="mt-1 max-w-full truncate border-emerald-400/20 bg-emerald-400/10 text-[8px] text-emerald-200"
              >
                F&amp;B Director · Amrita Resort Nusa Dua
              </Badge>
            </div>
          </div>
          <Badge
            variant="outline"
            className="shrink-0 border-white/10 bg-white/[0.05] text-[8px] text-white/50"
          >
            Mitra B2B
          </Badge>
        </div>

        {/* Chat preview */}
        <div className="relative mt-4 space-y-3">
          <div className="flex items-start gap-2">
            <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-100 text-[9px] font-bold text-amber-800">
              A
            </span>
            <div className="max-w-[86%] rounded-2xl rounded-tl-none border border-slate-700 bg-slate-900/80 p-3 text-xs leading-relaxed text-slate-200">
              Untuk welcome amenity kami butuh 300 pcs/bulan. Tapi kami minta
              harga distributor Rp62.000 &amp; TOP 60 hari, ya.
            </div>
          </div>

          <div className="flex justify-end">
            <div className="max-w-[86%] rounded-2xl rounded-tr-none bg-emerald-600 p-3 text-xs leading-relaxed text-white shadow-md shadow-emerald-950/30">
              Harga dasar kami Rp85.000. Untuk 300 pcs saya bisa di Rp74.000
              termasuk gift packaging.
            </div>
          </div>

          <div className="flex items-center gap-2 pl-8 pt-0.5">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-300" />
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-300 [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-300 [animation-delay:300ms]" />
            <span className="ml-1 text-[9px] text-emerald-200/45">
              Ibu Ayu sedang mengetik...
            </span>
          </div>
        </div>

        {/* Ghost input */}
        <div className="relative mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/40 px-3 py-2">
          <span className="text-[9px] text-white/25">
            Ketik respons negosiasi Anda...
          </span>
          <span className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 text-emerald-300">
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Floating score badge */}
      <div className="absolute -right-4 -top-7 z-20 w-[152px] rounded-xl border border-amber-500/40 bg-slate-900/90 p-3 shadow-lg backdrop-blur-md sm:-right-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
            Skor Negosiasi
          </p>
          <TrendingUp className="h-3 w-3 text-amber-300" />
        </div>
        <p className="mt-1 font-sans text-2xl font-bold leading-none text-amber-300">
          78<span className="ml-0.5 text-[10px] font-medium text-slate-500">/100</span>
        </p>
        <div className="mt-2 flex items-center gap-1 text-[8px] font-semibold text-emerald-300">
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          +12 poin dari sesi sebelumnya
        </div>
      </div>

      {/* Floating persona pills — desktop */}
      <div className="absolute -left-4 -top-5 z-20 hidden animate-pulse items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-900/80 px-3 py-1.5 text-[11px] text-emerald-200 shadow-md backdrop-blur-md sm:inline-flex">
        🏨 Hotel Resort (Nusa Dua)
      </div>
      <div className="absolute -bottom-5 -left-5 z-20 hidden animate-pulse items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-900/80 px-3 py-1.5 text-[11px] text-emerald-200 shadow-md backdrop-blur-md [animation-delay:300ms] sm:inline-flex">
        🛍️ Pusat Oleh-Oleh (Denpasar)
      </div>
      <div className="absolute -bottom-11 -right-4 z-20 hidden animate-pulse items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-900/80 px-3 py-1.5 text-[11px] text-emerald-200 shadow-md backdrop-blur-md [animation-delay:600ms] sm:inline-flex">
        🌅 Beach Club (Canggu)
      </div>

      {/* Floating persona pills — mobile */}
      <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:hidden">
        {[
          "🏨 Hotel Resort (Nusa Dua)",
          "🛍️ Pusat Oleh-Oleh (Denpasar)",
          "🌅 Beach Club (Canggu)",
        ].map((label) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-900/80 px-3 py-1.5 text-[10px] text-emerald-200 shadow-md backdrop-blur-md"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function LandingPage() {
  const { user } = await getCurrentUser();

  return (
    <div className="min-h-screen bg-[#F8FAF9] font-sans text-ink">
      <SiteHeader isLoggedIn={Boolean(user)} />

      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#07251A_0%,#0B3B2A_45%,#0F5132_100%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.18),transparent_42%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.2),transparent_46%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />
        <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        <div className="container relative grid items-center gap-14 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-20">
          <div className="animate-in-up">
            <Badge className="mb-6 gap-2 border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-[11px] text-amber-200">
              <Award className="h-3.5 w-3.5" />
              Bali DigiFest 2026 · AI Web Innovation Challenge
            </Badge>

            <h1 className="max-w-[660px] text-balance font-sans text-[2.35rem] font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.1rem] xl:text-[3.65rem]">
              Flight Simulator
              <br />
              <span className="text-amber-300">Negosiasi B2B</span> Pertama
              <br />
              untuk UMKM Bali
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-white/65 sm:text-[17px]">
              Latih taktik tawar-menawar menghadapi{" "}
              <span className="font-semibold text-white">
                F&amp;B Director Hotel, Ritel, dan Beach Club
              </span>{" "}
              berbasis AI sebelum bertemu pembeli aslinya.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-[linear-gradient(180deg,#FBBF24_0%,#D97706_100%)] text-[#0F172A] shadow-[0_12px_30px_-12px_rgba(217,119,6,0.8)] hover:brightness-105"
              >
                <Link href={user ? "/simulasi/baru" : "/register"}>
                  {user ? "Mulai Simulasi" : "Mulai Gratis"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              {user ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/[0.06] text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/dashboard">
                    Buka dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <JudgeDemoForm
                  formClassName="w-full sm:w-auto"
                  buttonClassName="w-full border border-white/20 bg-white/[0.06] text-white shadow-none hover:bg-white/10 hover:text-white sm:w-auto"
                />
              )}
            </div>

            {!user && (
              <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-white/45">
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-300/80">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Tanpa registrasi
                </span>
                <span>·</span>
                <span>1 klik untuk juri</span>
                <span>·</span>
                <span>skenario Bali sudah terisi</span>
                <span>·</span>
                <Link href="/login" className="underline-offset-4 hover:underline">
                  Masuk akun
                </Link>
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-300" />
                3 persona Bali asli
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-300" />
                Rubrik 5 aspek
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-300" />
                Saran kalimat siap pakai
              </span>
            </div>
          </div>

          {/* Hero live simulation mockup */}
          <div className="relative mx-auto w-full max-w-[560px] items-center justify-center lg:mx-0">
            <LiveSimulationMockup />
          </div>
        </div>

        {/* Hero stats */}
        <div className="container relative pb-12">
          <div className="grid grid-cols-2 gap-2 rounded-3xl border border-white/10 bg-white/[0.045] p-2 backdrop-blur-md sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-2xl px-3 py-4 transition-colors duration-200 hover:bg-white/[0.06] sm:px-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.07] text-emerald-300">
                  <stat.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-sans text-2xl font-bold leading-none text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-white/45">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* VALUE / TRUST                                                    */}
      {/* ================================================================ */}
      <section className="border-b border-slate-200/70 bg-white">
        <div className="container grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <Badge
              variant="outline"
              className="mb-4 border-emerald-200 bg-emerald-50/70 text-emerald-800"
            >
              <Sparkles className="h-3 w-3" />
              Built for Bali SMEs
            </Badge>
            <h2 className="max-w-xl font-sans text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              Negosiasi Bali punya aturannya sendiri.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500">
              Hotel menuntut sertifikasi dan TOP panjang. Pusat oleh-oleh menawar
              dengan titip jual. Beach club menghitung food cost per porsi. Satu
              produk yang sama bisa membutuhkan strategi yang sangat berbeda.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                TOP 30–60 hari
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                Titip Jual
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                Food Cost
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {personaTypes.map(
              ({ type, Icon, accent, iconTone }, index) => {
                const meta = PARTNER_META[type];
                return (
                  <div
                    key={type}
                    className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 border-t-4 ${accent} bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-xl ${iconTone}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[10px] font-bold text-slate-200">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 flex items-center justify-between gap-2 text-base font-bold text-slate-900">
                      {personaCardTitles[type]}
                      <span className="text-lg">{meta.emoji}</span>
                    </h3>
                    <p className="mt-2 text-xs font-normal leading-relaxed text-slate-600">
                      {meta.description}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* HOW IT WORKS                                                     */}
      {/* ================================================================ */}
      <section id="cara-kerja" className="scroll-mt-24 bg-[#F8FAF9]">
        <div className="container py-16 lg:py-24">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <Badge variant="muted" className="mb-4">
                Cara kerja
              </Badge>
              <h2 className="font-sans text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Dari skenario ke strategi baru dalam 4 langkah.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
                Tidak ada teori panjang. Anda langsung berlatih menghadapi
                tekanan pembeli profesional dan mendapat feedback yang bisa
                dipakai di meeting berikutnya.
              </p>
            </div>
            <Button asChild variant="outline" className="w-fit bg-white">
              <Link href={user ? "/simulasi/baru" : "/register"}>
                Coba sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-4xl font-bold text-slate-100 transition-colors group-hover:text-emerald-100">
                    {step.number}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                    <step.icon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-4 font-sans text-base font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                  {step.body}
                </p>
                {index < steps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-slate-300 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PERSONAS                                                         */}
      {/* ================================================================ */}
      <section
        id="mitra"
        className="scroll-mt-24 border-y border-slate-200/70 bg-white"
      >
        <div className="container py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="muted" className="mb-4">
              Profil pembeli virtual
            </Badge>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Tiga wajah pembeli Bali. Tiga tingkat tekanan.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Setiap kombinasi memiliki karakter, batas harga, dan playbook
              komersial yang berbeda — seperti negosiasi sesungguhnya.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {personaTypes.map(({ type, Icon, tone }) => {
              const meta = PARTNER_META[type];
              return (
                <div
                  key={type}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative">
                      <div className="grid h-16 w-16 place-items-center rounded-full bg-[linear-gradient(145deg,#F8FAF9_0%,#E8F3ED_100%)] text-3xl shadow-[0_10px_24px_-14px_rgba(15,81,50,0.45)] ring-4 ring-white">
                        {meta.emoji}
                      </div>
                      <span className={`absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-white ${tone}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-5 font-sans text-lg font-bold leading-snug text-ink">
                    {personaCardTitles[type]}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {meta.description}
                  </p>

                  <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                    {meta.playbook.slice(0, 2).map((tactic) => (
                      <p
                        key={tactic}
                        className="flex items-start gap-1.5 text-[10px] leading-relaxed text-slate-500"
                      >
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                        {tactic}
                      </p>
                    ))}
                  </div>

                  <div className="mt-auto border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold text-ink">
                      {meta.buyerName} · {meta.buyerRole}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {meta.company}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(["easy", "medium", "hard"] as const).map((difficulty) => (
                      <Badge
                        key={difficulty}
                        variant={
                          difficulty === "hard"
                            ? "destructive"
                            : difficulty === "medium"
                              ? "warning"
                              : "success"
                        }
                        className="text-[9px]"
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

      {/* ================================================================ */}
      {/* RUBRIC                                                           */}
      {/* ================================================================ */}
      <section id="rubrik" className="scroll-mt-24 bg-[#F8FAF9]">
        <div className="container py-16 lg:py-24">
          <div className="overflow-hidden rounded-[32px] bg-[#0F172A] text-white shadow-lift">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative p-7 sm:p-10 lg:p-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.18),transparent_55%)]" />
                <div className="pointer-events-none absolute inset-0 grain opacity-20" />
                <Badge className="relative mb-5 border-white/10 bg-white/10 text-white">
                  Rubrik tetap · skor 0–100
                </Badge>
                <h2 className="relative max-w-lg font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Lima aspek yang menentukan apakah penawaran Anda layak
                  dipercaya.
                </h2>
                <p className="relative mt-3 max-w-lg text-sm leading-relaxed text-white/60">
                  Rubrik yang sama dipakai di setiap sesi, sehingga skor Anda
                  bisa dibandingkan dari waktu ke waktu.
                </p>

                <div className="relative mt-7 space-y-2.5">
                  {RUBRIC_ASPECTS.map((aspect, index) => (
                    <div
                      key={aspect.key}
                      className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.05] p-3.5 backdrop-blur-sm"
                    >
                      <span className="mt-0.5 font-sans text-sm font-bold text-amber-300">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-white">
                          {aspect.label}
                        </p>
                        <p className="mt-0.5 text-[10px] leading-relaxed text-white/50">
                          {aspect.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex flex-col justify-center gap-5 bg-[#F8FAF9] p-7 text-ink sm:p-10 lg:p-12">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Contoh hasil evaluasi
                    </p>
                    <p className="mt-1 font-sans text-lg font-bold">
                      Kopi Kintamani × Hotel Resort
                    </p>
                  </div>
                  <Badge variant="success">Cukup baik</Badge>
                </div>

                <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
                  <ScoreRing score={74} size={108} strokeWidth={9} />
                  <div className="space-y-2.5 text-sm">
                    {[
                      ["Kejelasan penawaran", 82],
                      ["Value proposition", 78],
                      ["Objection handling", 61],
                      ["Margin flexibility", 70],
                      ["Closing assertion", 79],
                    ].map(([label, score]) => (
                      <div key={label} className="flex items-center gap-2.5">
                        <span className="w-[124px] shrink-0 text-[10px] text-slate-500">
                          {label}
                        </span>
                        <span className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-100">
                          <span
                            className="block h-full rounded-full bg-[#0F5132]"
                            style={{ width: `${score}%` }}
                          />
                        </span>
                        <span className="text-[10px] font-bold">{score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold text-amber-900">
                    <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                    Contoh saran perbaikan
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-amber-950/75">
                    “Saya bisa Rp74.000 untuk 300 pcs per bulan, asalkan TOP 30
                    hari dan kontrak 6 bulan. Gift packaging dan 20 sampel gratis
                    kami sertakan. Boleh kita kunci uji coba dua minggu?”
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Penilaian AI adalah panduan latihan, bukan jaminan hasil nyata.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer className="bg-[#0F172A] text-white">
        <div className="container py-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-sm">
              <Logo
                href="/"
                inverted
                tagline="B2B AI Negotiation Simulator for Bali SMEs"
              />
              <p className="mt-4 text-xs leading-relaxed text-white/45">
                AI flight simulator negosiasi B2B untuk membantu UMKM Bali masuk
                jalur retail dan hospitality dengan lebih percaya diri.
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[9px] font-semibold text-white/50">
                <Award className="h-3 w-3 text-amber-300" />
                Bali DigiFest 2026 · AI Web Innovation Challenge
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-xs">
              <div>
                <p className="font-bold text-white">Produk</p>
                <div className="mt-3 space-y-2 text-white/45">
                  <Link href="/simulasi/baru" className="block hover:text-white">
                    Simulasi baru
                  </Link>
                  <Link href="/dashboard" className="block hover:text-white">
                    Dashboard
                  </Link>
                  <a href="#rubrik" className="block hover:text-white">
                    Rubrik penilaian
                  </a>
                </div>
              </div>
              <div>
                <p className="font-bold text-white">Akun</p>
                <div className="mt-3 space-y-2 text-white/45">
                  <Link href="/login" className="block hover:text-white">
                    Masuk
                  </Link>
                  <Link href="/register" className="block hover:text-white">
                    Daftar
                  </Link>
                  <a href="#mitra" className="block hover:text-white">
                    Profil pembeli
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-[10px] text-white/35 sm:flex-row">
            <p>
              © {new Date().getFullYear()} SiapDeal · NegoLab. Dibuat untuk UMKM
              Bali.
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              Denpasar · Nusa Dua · Canggu
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
