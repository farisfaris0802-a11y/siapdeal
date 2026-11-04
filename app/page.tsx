import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Check,
  Cpu,
  Gavel,
  Hotel,
  Lightbulb,
  LineChart,
  LockKeyhole,
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
  Zap,
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

const personaTypes = [
  {
    type: "hotel_resort_bali" as const,
    Icon: Hotel,
    tone: "border-amber-200 bg-amber-50 text-amber-700",
  },
  {
    type: "souvenir_retail" as const,
    Icon: Store,
    tone: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  {
    type: "beach_club_cafe" as const,
    Icon: Waves,
    tone: "border-sky-200 bg-sky-50 text-sky-700",
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
}: {
  formClassName?: string;
  buttonClassName?: string;
}) {
  return (
    <form action={judgeLoginAction} className={formClassName}>
      <input type="hidden" name="next" value="/simulasi/baru?demo=1" />
      <JudgeLoginButton
        label="Quick Demo Login as Judge"
        pendingLabel="Menyiapkan ruang juri…"
        size="lg"
        className={buttonClassName}
      />
    </form>
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

        <div className="container relative grid items-center gap-14 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:py-20">
          <div className="animate-in-up">
            <Badge className="mb-6 gap-2 border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-[11px] text-amber-200">
              <Award className="h-3.5 w-3.5" />
              Bali DigiFest 2026 · AI Web Innovation Challenge
            </Badge>

            <h1 className="max-w-3xl font-sans text-[2.7rem] font-bold leading-[0.99] tracking-[-0.045em] sm:text-6xl lg:text-[4.4rem]">
              Latih negosiasi
              <br />
              <span className="text-amber-300">sebelum</span> bertemu
              <br />
              pembeli Bali.
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-white/65 sm:text-[17px]">
              SiapDeal adalah AI flight simulator negosiasi untuk UMKM Bali.
              Hadapi F&amp;B Director hotel Nusa Dua, manager pusat oleh-oleh,
              dan owner beach club Canggu yang menawar margin, menuntut titip
              jual, serta memperpanjang TOP.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {user ? (
                <Button
                  asChild
                  size="lg"
                  className="bg-[linear-gradient(180deg,#FBBF24_0%,#D97706_100%)] text-[#0F172A] shadow-[0_12px_30px_-12px_rgba(217,119,6,0.8)] hover:brightness-105"
                >
                  <Link href="/simulasi/baru">
                    Mulai simulasi baru
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <JudgeDemoForm
                  formClassName="w-full sm:w-auto"
                  buttonClassName="w-full bg-[linear-gradient(180deg,#FBBF24_0%,#D97706_100%)] text-[#0F172A] shadow-[0_12px_30px_-12px_rgba(217,119,6,0.8)] hover:brightness-105 sm:w-auto"
                />
              )}

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/[0.06] text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={user ? "/dashboard" : "/register"}>
                  {user ? "Buka dashboard" : "Saya pelaku UMKM"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
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

          {/* Hero chat mockup */}
          <div className="relative mx-auto w-full max-w-[530px] animate-in-up animate-delay-2 lg:mx-0">
            <div className="pointer-events-none absolute -inset-6 rounded-[38px] bg-[radial-gradient(circle_at_55%_40%,rgba(251,191,36,0.18),transparent_62%)] blur-2xl" />

            <div className="relative z-10 overflow-hidden rounded-[26px] border border-white/15 bg-white shadow-[0_35px_80px_-30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between border-b border-slate-200/80 bg-[#F8FAF9] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative grid h-10 w-10 place-items-center rounded-full bg-amber-50 text-lg ring-1 ring-amber-100">
                    🏨
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-tight text-ink">
                      Ibu Ayu Prameswari
                    </p>
                    <p className="text-[10px] text-slate-500">
                      F&amp;B Director · Amrita Resort Nusa Dua
                    </p>
                    <Badge variant="warning" className="mt-1 text-[8px]">
                      Hotel Resort
                    </Badge>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="border-emerald-200 bg-emerald-50 text-[8px] uppercase tracking-wide text-emerald-700"
                >
                  Mitra B2B
                </Badge>
              </div>

              <div className="space-y-3.5 bg-[#F8FAF9] p-5">
                <div className="flex gap-2.5">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-800">
                    A
                  </div>
                  <div className="max-w-[84%] rounded-2xl rounded-tl-none border border-slate-200 bg-white px-3.5 py-2.5 text-[12px] leading-relaxed text-slate-700 shadow-sm">
                    Untuk welcome amenity kami butuh 300 pcs per bulan. Kami minta
                    harga distributor Rp62.000 dan TOP 60 hari, ya.
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="max-w-[86%] rounded-2xl rounded-tr-none bg-[linear-gradient(135deg,#177A52_0%,#0F5132_100%)] px-3.5 py-2.5 text-[12px] leading-relaxed text-white shadow-md">
                    Harga dasar Rp85.000. Untuk 300 pcs saya bisa Rp74.000,
                    termasuk gift packaging dan 20 sampel gratis.
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-800">
                    A
                  </div>
                  <div className="max-w-[84%] rounded-2xl rounded-tl-none border border-slate-200 bg-white px-3.5 py-2.5 text-[12px] leading-relaxed text-slate-700 shadow-sm">
                    Masih di atas target food cost kami. Kalau bisa Rp68.000,
                    kami bantu eksposur di tiga outlet dan kontrak 6 bulan.
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-9 pt-0.5">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-500" />
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-500 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-500 [animation-delay:300ms]" />
                  <span className="ml-1 text-[9px] text-slate-400">
                    Ibu Ayu sedang meninjau penawaran…
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-slate-200/80 bg-white p-3">
                <div className="flex-1 rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-2.5 text-[11px] text-slate-400">
                  Ketik respons negosiasi Anda di sini…
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#0F5132] text-white shadow-sm">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="absolute -right-4 -top-20 z-20 hidden w-[160px] rounded-2xl border border-white/70 bg-white/95 p-3.5 shadow-xl backdrop-blur sm:block">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Skor negosiasi
                </p>
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <div className="mt-1 flex items-end gap-1">
                <span className="font-sans text-3xl font-bold leading-none text-ink">
                  78
                </span>
                <span className="pb-1 text-[10px] font-medium text-slate-400">
                  /100
                </span>
              </div>
              <div className="mt-2.5 space-y-1.5">
                {[86, 78, 64, 72, 88].map((value) => (
                  <div
                    key={value}
                    className="h-1.5 overflow-hidden rounded-full bg-slate-100"
                  >
                    <div
                      className="h-full rounded-full bg-[#0F5132]"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[9px] font-medium text-emerald-700">
                +12 poin dari sesi sebelumnya
              </p>
            </div>

            <div className="absolute -bottom-16 -left-3 z-20 hidden items-center gap-2.5 rounded-xl border border-emerald-200 bg-white px-3.5 py-2.5 shadow-xl sm:flex">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-100">
                <BadgeCheck className="h-4 w-4 text-emerald-700" />
              </span>
              <div>
                <p className="text-[9px] font-medium text-slate-400">
                  Status sesi
                </p>
                <p className="text-xs font-bold text-ink">
                  Kesepakatan tercapai 🎉
                </p>
              </div>
            </div>
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
              <span className="rounded-full border border-slate-200 bg-[#F8FAF9] px-3 py-1.5 text-[10px] font-semibold text-slate-600">
                TOP 30–60 hari
              </span>
              <span className="rounded-full border border-slate-200 bg-[#F8FAF9] px-3 py-1.5 text-[10px] font-semibold text-slate-600">
                Titip jual & sale-or-return
              </span>
              <span className="rounded-full border border-slate-200 bg-[#F8FAF9] px-3 py-1.5 text-[10px] font-semibold text-slate-600">
                FOOD cost & margin
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {personaTypes.map(({ type, Icon, tone }) => {
              const meta = PARTNER_META[type];
              return (
                <div
                  key={type}
                  className="rounded-2xl border border-slate-200/80 bg-[#F8FAF9] p-4 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-soft"
                >
                  <span className={`grid h-10 w-10 place-items-center rounded-xl border ${tone}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="mt-4 text-sm font-bold text-ink">
                    {meta.shortLabel}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                    {meta.description}
                  </p>
                  <p className="mt-3 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                    <MapPin className="h-3 w-3" />
                    {meta.location}
                  </p>
                </div>
              );
            })}
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
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lift"
                >
                  <div className="flex items-center justify-between">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl border ${tone}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-2xl">{meta.emoji}</span>
                  </div>
                  <h3 className="mt-5 font-sans text-lg font-bold leading-snug text-ink">
                    {meta.label}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    <MapPin className="h-3 w-3" />
                    {meta.location}
                  </p>
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
      {/* AI ENGINE                                                        */}
      {/* ================================================================ */}
      <section
        id="teknologi"
        className="scroll-mt-24 border-y border-slate-200/70 bg-white"
      >
        <div className="container grid gap-10 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <Badge variant="muted" className="mb-4">
              AI engine
            </Badge>
            <h2 className="max-w-lg font-sans text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              Bukan chatbot biasa. Ini simulator dengan aturan main.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-500">
              Setiap persona punya batas harga rahasia, gaya menawar, dan aturan
              akhir sesi. Evaluasi memakai rubrik yang sama untuk semua sesi.
            </p>

            <div className="mt-6 space-y-3">
              {[
                {
                  icon: LockKeyhole,
                  title: "Batas harga pembeli tetap rahasia",
                  body: "Dihitung dari profil persona dan harga dasar produk, tidak pernah dibocorkan ke lawan bicara.",
                },
                {
                  icon: MessagesSquare,
                  title: "Chat real-time + transkrip tersimpan",
                  body: "Balasan pembeli mengalir langsung ke layar, sementara seluruh percakapan disimpan untuk evaluasi.",
                },
                {
                  icon: Gavel,
                  title: "Penilaian 5 aspek yang konsisten",
                  body: "Skor, feedback, kekuatan, kelemahan, dan kalimat pengganti disusun dengan format yang sama.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-2xl border border-slate-200/80 bg-[#F8FAF9] p-3.5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-[#0F172A] p-6 text-white shadow-lift sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 grain opacity-20" />
            <div className="relative flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                <Cpu className="h-3.5 w-3.5 text-amber-300" />
                Alur kerja AI SiapDeal
              </p>
              <Badge className="border-white/10 bg-white/10 text-[10px] text-white">
                Gemini / GPT
              </Badge>
            </div>

            <div className="relative mt-6 space-y-2.5 text-[11px] leading-relaxed">
              {[
                { step: "01", title: "Persona pembeli", value: "Hotel Resort · Menengah" },
                { step: "02", title: "Batas harga pembeli", value: "79% dari harga dasar" },
                { step: "03", title: "Chat real-time", value: "Balasan mengalir ke browser" },
                { step: "04", title: "Deteksi deal", value: "Deal / belum sepakat" },
                { step: "05", title: "Evaluasi 5 aspek", value: "Skor + saran kalimat" },
              ].map((row) => (
                <div
                  key={row.step}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2.5"
                >
                  <span className="font-mono text-amber-300">{row.step}</span>
                  <span className="w-[126px] shrink-0 text-white/45">
                    {row.title}
                  </span>
                  <span className="font-mono text-white/80">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="relative mt-5 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.05] p-3.5 text-[10px] leading-relaxed text-white/55">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />
              Pembeli virtual tetap dalam konteks bisnis. Permintaan membocorkan
              instruksi atau keluar karakter akan ditolak.
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CTA                                                              */}
      {/* ================================================================ */}
      <section className="container py-16 lg:py-20">
        <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#FBBF24_0%,#F59E0B_48%,#D97706_100%)] p-8 text-[#0F172A] shadow-lift sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/25 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#0F5132]/10 blur-2xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F172A]/60">
                <Zap className="h-3.5 w-3.5" />
                Bali DigiFest 2026 · siap dinilai
              </p>
              <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Coba alur lengkapnya
                <br className="hidden sm:block" /> dalam satu klik.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#0F172A]/65 sm:text-base">
                Juri bisa langsung masuk tanpa registrasi. Pelaku UMKM bisa
                membuat akun untuk menyimpan riwayat dan membandingkan skor.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              {user ? (
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#0F172A] text-white shadow-lg hover:bg-[#0F172A]/90 lg:w-auto"
                >
                  <Link href="/simulasi/baru">
                    Mulai simulasi
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <JudgeDemoForm
                  formClassName="w-full lg:w-auto"
                  buttonClassName="w-full bg-[#0F172A] text-white shadow-lg hover:bg-[#0F172A]/90 lg:w-auto"
                />
              )}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-[#0F172A]/20 bg-transparent hover:bg-white/30 lg:w-auto"
              >
                <Link href={user ? "/dashboard" : "/register"}>
                  {user ? "Buka dashboard" : "Buat akun UMKM"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
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
                tagline="B2B AI Negotiation Simulator"
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
