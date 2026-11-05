import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronRight,
  CirclePlay,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Hotel,
  Lightbulb,
  Plus,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Trophy,
  Waves,
} from "lucide-react";

import { ScoreChart } from "@/components/score-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { requireUser } from "@/lib/auth";
import { DIFFICULTY_META, PARTNER_META, RUBRIC_ASPECTS } from "@/lib/ai/personas";
import { getSessionsForUser } from "@/lib/queries";
import type { SessionWithRelations } from "@/lib/types";
import { cn, formatDate, formatRelative, formatRupiah, scoreTone } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

function evaluationOf(session: SessionWithRelations) {
  const embedded = session.evaluations;
  if (!embedded) return null;
  const evaluation = Array.isArray(embedded) ? embedded[0] : embedded;
  return evaluation ?? null;
}

function outcomeBadge(outcome: SessionWithRelations["outcome"]) {
  if (outcome === "deal") return { label: "Sepakat", variant: "success" as const };
  if (outcome === "no_deal") return { label: "Tidak sepakat", variant: "destructive" as const };
  if (outcome === "manual") return { label: "Manual", variant: "muted" as const };
  return null;
}

export default async function DashboardPage() {
  const user = await requireUser();
  const sessions = await getSessionsForUser(user.id);

  const fullName =
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "Pengguna";
  const firstName = fullName.trim().split(/\s+/)[0];
  const isJudge =
    Boolean(user.is_anonymous) || user.user_metadata?.role === "judge";

  const evaluated = sessions
    .map((session) => ({ session, evaluation: evaluationOf(session) }))
    .filter(
      (item): item is { session: SessionWithRelations; evaluation: NonNullable<ReturnType<typeof evaluationOf>> } =>
        Boolean(item.evaluation)
    );

  const scores = evaluated.map((item) => item.evaluation.rubric_scores.overall);
  const averageScore = scores.length
    ? Math.round(scores.reduce((total, score) => total + score, 0) / scores.length)
    : null;
  const bestScore = scores.length ? Math.max(...scores) : null;

  const chronological = [...evaluated].reverse();
  const firstScore = chronological[0]?.evaluation.rubric_scores.overall ?? null;
  const latestScore = chronological[chronological.length - 1]?.evaluation.rubric_scores.overall ?? null;
  const scoreDelta =
    firstScore !== null && latestScore !== null && chronological.length > 1
      ? latestScore - firstScore
      : null;

  const chartData = chronological.slice(-12).map((item) => ({
    score: item.evaluation.rubric_scores.overall,
    date: item.session.created_at,
  }));

  const aspectAverages = RUBRIC_ASPECTS.map((aspect) => {
    const values = evaluated
      .map((item) =>
        item.evaluation.rubric_scores.aspects.find((entry) => entry.key === aspect.key)
      )
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
      .map((entry) => entry.score);

    return {
      ...aspect,
      average: values.length
        ? Math.round(values.reduce((total, value) => total + value, 0) / values.length)
        : null,
    };
  });

  const focusAspect = aspectAverages
    .filter((aspect) => aspect.average !== null)
    .sort((a, b) => (a.average ?? 0) - (b.average ?? 0))[0];

  const activeSessions = sessions.filter((session) => session.status === "active");
  const averageTone = averageScore !== null ? scoreTone(averageScore) : null;

  const stats = [
    {
      label: "Total sesi",
      value: String(sessions.length),
      note: `${sessions.filter((session) => session.status === "completed").length} sesi selesai`,
      icon: ClipboardList,
      tone: "bg-primary/10 text-primary",
    },
    {
      label: "Rata-rata skor",
      value: averageScore !== null ? String(averageScore) : "—",
      note: averageScore !== null ? averageTone?.label ?? "dari 100" : "Belum ada evaluasi",
      icon: BarChart3,
      tone: "bg-sky-50 text-sky-700",
    },
    {
      label: "Skor terbaik",
      value: bestScore !== null ? String(bestScore) : "—",
      note: bestScore !== null ? "dari seluruh sesi" : "Selesaikan satu sesi",
      icon: Trophy,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      label: "Perkembangan",
      value: scoreDelta !== null ? `${scoreDelta > 0 ? "+" : ""}${scoreDelta}` : "—",
      note:
        scoreDelta !== null
          ? "poin dari sesi pertama"
          : "Butuh minimal 2 sesi dinilai",
      icon: TrendingUp,
      tone: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
      {/* Page header */}
      <header className="mb-7 flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(new Date())}
          </p>
          <h1 className="mt-2 flex flex-wrap items-center gap-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Halo, {firstName}.
            {isJudge && (
              <span className="text-xs font-medium text-muted-foreground">
                Demo juri
              </span>
            )}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {sessions.length === 0
              ? "Siap memulai latihan negosiasi pertama Anda? Pilih skenario, hadapi mitra virtual, lalu lihat skor deal Anda."
              : "Pantau perkembangan negosiasi, bandingkan skor, dan lanjutkan latihan berikutnya."}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/evaluasi">
              <ClipboardCheck className="h-4 w-4" />
              Evaluasi
            </Link>
          </Button>
          <Button asChild>
            <Link href="/simulasi/baru">
              <Plus className="h-4 w-4" />
              Simulasi Baru
            </Link>
          </Button>
        </div>
      </header>

      {/* Active session */}
      {activeSessions.length > 0 && (
        <Link
          href={`/simulasi/${activeSessions[0].id}`}
          className="group mb-5 flex flex-col justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 transition-colors hover:bg-amber-50 sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-800">
              <Clock className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-bold text-amber-950">
                Ada sesi yang belum selesai
              </p>
              <p className="mt-0.5 text-xs text-amber-900/70">
                {activeSessions[0].products?.name ?? "Sesi simulasi"},{" "}
                {activeSessions[0].buyer_personas
                  ? PARTNER_META[activeSessions[0].buyer_personas.partner_type].shortLabel
                  : "Mitra"}
                {", dimulai "}
                {formatRelative(activeSessions[0].created_at)}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-amber-900 px-3 py-1.5 text-xs font-semibold text-white sm:self-auto">
            Lanjutkan
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border/80 bg-card p-4"
          >
            <p className="text-[11px] font-semibold text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-3 font-display text-3xl font-bold leading-none tracking-tight text-ink">
              {stat.value}
              {stat.label === "Rata-rata skor" || stat.label === "Skor terbaik" ? (
                <span className="ml-1 text-xs font-medium text-muted-foreground">
                  /100
                </span>
              ) : null}
            </p>
            <p className="mt-1.5 text-[10px] text-muted-foreground">{stat.note}</p>
          </div>
        ))}
      </div>

      {/* Chart + focus */}
      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Card>
          <CardHeader className="flex-row items-start justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-base">Progres skor</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                Skor total dari {chartData.length} sesi terakhir yang dinilai
              </p>
            </div>
            <Badge variant="outline" className="gap-1 bg-white text-[10px]">
              <TrendingUp className="h-3 w-3 text-emerald-700" />
              {scoreDelta !== null ? `${scoreDelta > 0 ? "+" : ""}${scoreDelta} poin` : "Mulai tracking"}
            </Badge>
          </CardHeader>
          <CardContent className="pt-0">
            <ScoreChart data={chartData} />
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-100 text-amber-800">
                <Lightbulb className="h-4 w-4" />
              </span>
              <div>
                <CardTitle className="text-base">Fokus berikutnya</CardTitle>
                <p className="text-[11px] text-muted-foreground">Aspek terlemah Anda</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {focusAspect && focusAspect.average !== null ? (
              <>
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-amber-950">{focusAspect.label}</p>
                    <span className="font-display text-lg font-bold text-amber-800">
                      {focusAspect.average}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-amber-900/70">
                    {focusAspect.description}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {aspectAverages.map((aspect) => (
                    <div key={aspect.key}>
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="truncate text-muted-foreground">{aspect.shortLabel}</span>
                        <span className="font-semibold text-ink">{aspect.average ?? "—"}</span>
                      </div>
                      <Progress
                        value={aspect.average ?? 0}
                        className="mt-1 h-1.5"
                        indicatorClassName={cn(
                          (aspect.average ?? 0) >= 80
                            ? "bg-emerald-700"
                            : (aspect.average ?? 0) >= 60
                              ? "bg-amber-600"
                              : "bg-rose-600"
                        )}
                      />
                    </div>
                  ))}
                </div>

                <Button asChild size="sm" className="w-full">
                  <Link href="/simulasi/baru">
                    Latih aspek ini
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </>
            ) : (
              <div className="py-6 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-muted-foreground">
                  <Target className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-semibold text-ink">Belum ada data skor</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Selesaikan satu simulasi dan jalankan evaluasi untuk melihat
                  aspek yang perlu diperkuat.
                </p>
                <Button asChild size="sm" variant="outline" className="mt-4">
                  <Link href="/simulasi/baru">Mulai latihan</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* History */}
      <section id="riwayat" className="mt-8 scroll-mt-20">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              Sesi latihan Anda
            </h2>
          </div>
          {sessions.length > 0 && (
            <span className="text-xs text-muted-foreground">{sessions.length} sesi</span>
          )}
        </div>

        {sessions.length === 0 ? (
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-border bg-white p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute inset-0 grain opacity-30" />
            <div className="relative mx-auto max-w-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">
                Belum ada sesi latihan
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Mulai dengan satu produk dan satu jenis mitra. Dalam beberapa
                menit, Anda akan mendapat skor dan saran perbaikan yang konkret.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/simulasi/baru">
                  <CirclePlay className="h-4 w-4" />
                  Mulai simulasi pertama
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border/80 bg-white shadow-soft">
            {sessions.map((session, index) => {
              const product = session.products;
              const persona = session.buyer_personas;
              const evaluation = evaluationOf(session);
              const partnerMeta = persona ? PARTNER_META[persona.partner_type] : null;
              const PartnerIcon =
                persona?.partner_type === "hotel_resort_bali"
                  ? Hotel
                  : persona?.partner_type === "souvenir_retail"
                    ? Store
                    : Waves;
              const difficultyMeta = persona ? DIFFICULTY_META[persona.difficulty] : null;
              const badge = outcomeBadge(session.outcome);
              const isActive = session.status === "active";
              const href = isActive
                ? `/simulasi/${session.id}`
                : `/simulasi/${session.id}/hasil`;
              const score = evaluation?.rubric_scores.overall ?? null;
              const tone = score !== null ? scoreTone(score) : null;

              return (
                <Link
                  key={session.id}
                  href={href}
                  className={cn(
                    "group flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-sand-50/70 sm:flex-row sm:items-center sm:justify-between sm:px-5",
                    index !== sessions.length - 1 && "border-b border-border/60"
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary ring-1 ring-border/70">
                      <PartnerIcon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <p className="max-w-[260px] truncate text-sm font-bold text-ink sm:max-w-[380px]">
                          {product?.name ?? "Produk tidak ditemukan"}
                        </p>
                        {badge && (
                          <Badge variant={badge.variant} className="text-[9px]">
                            {badge.label}
                          </Badge>
                        )}
                        {isActive && (
                          <Badge variant="warning" className="text-[9px]">
                            Berlangsung
                          </Badge>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                        {partnerMeta?.shortLabel ?? "Mitra"}
                        {difficultyMeta ? `, ${difficultyMeta.label}` : ""},{" "}
                        {product ? formatRupiah(product.base_price) : ""},{" "}
                        {formatRelative(session.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 pl-14 sm:pl-0">
                    {score !== null && tone ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "grid h-9 w-9 place-items-center rounded-xl font-display text-sm font-bold",
                            tone.bg,
                            tone.color
                          )}
                        >
                          {score}
                        </span>
                        <div className="hidden text-right sm:block">
                          <p className="text-[10px] font-medium text-muted-foreground">Skor</p>
                          <p className={cn("text-[11px] font-semibold", tone.color)}>{tone.label}</p>
                        </div>
                      </div>
                    ) : isActive ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700">
                        Lanjutkan
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                        Belum dinilai
                      </span>
                    )}

                    <span className="grid h-8 w-8 place-items-center rounded-full border border-border bg-white text-muted-foreground transition group-hover:border-primary/30 group-hover:text-primary">
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
