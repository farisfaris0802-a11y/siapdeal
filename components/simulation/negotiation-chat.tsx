"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleStop,
  Clock,
  Info,
  Lightbulb,
  Loader2,
  Lock,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Square,
  Target,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { detectOutcome } from "@/lib/ai/buyer-prompt";
import { sanitizeAssistantText } from "@/lib/ai/sanitize";
import {
  DIFFICULTY_META,
  PARTNER_META,
  RUBRIC_ASPECTS,
} from "@/lib/ai/personas";
import type {
  ChatMessage,
  Difficulty,
  PartnerType,
  Product,
  SessionOutcome,
} from "@/lib/types";
import { cn, formatRupiah } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ChatProduct {
  name: string;
  base_price: number;
  usp: string;
}

interface NegotiationChatProps {
  sessionId: string;
  product: ChatProduct;
  partnerType: PartnerType;
  difficulty: Difficulty;
  initialMessages: ChatMessage[];
}

const MAX_CHARS = 1500;

export function NegotiationChat({
  sessionId,
  product,
  partnerType,
  difficulty,
  initialMessages,
}: NegotiationChatProps) {
  const router = useRouter();
  const partner = PARTNER_META[partnerType];
  const diff = DIFFICULTY_META[difficulty];

  const [endOpen, setEndOpen] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);
  const [autoOutcome, setAutoOutcome] = useState<Exclude<SessionOutcome, "manual"> | null>(
    null
  );

  const autoTriggeredRef = useRef(false);
  const evaluationInFlightRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const finishSession = useCallback(
    async (outcome: SessionOutcome) => {
      if (evaluationInFlightRef.current) return;
      evaluationInFlightRef.current = true;
      setIsEvaluating(true);
      setEvaluationError(null);
      setEndOpen(false);

      try {
        const response = await fetch("/api/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, outcome }),
        });

        const payload = (await response.json().catch(() => null)) as
          | { error?: string; evaluation?: unknown }
          | null;

        if (!response.ok) {
          throw new Error(payload?.error || "Evaluasi gagal dijalankan.");
        }

        toast.success("Evaluasi selesai. Membuka hasil…");
        router.push(`/simulasi/${sessionId}/hasil`);
        router.refresh();
      } catch (error) {
        evaluationInFlightRef.current = false;
        setIsEvaluating(false);
        const message =
          error instanceof Error
            ? error.message
            : "Evaluasi gagal dijalankan. Silakan coba lagi.";
        setEvaluationError(message);
        toast.error(message);
      }
    },
    [router, sessionId]
  );

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error: chatError,
    reload,
  } = useChat({
    api: "/api/chat",
    body: { sessionId },
    initialMessages: initialMessages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
    })),
    onFinish: (message) => {
      const detected = detectOutcome(message.content);
      if (!detected || autoTriggeredRef.current) return;

      autoTriggeredRef.current = true;
      setAutoOutcome(detected);

      timeoutRef.current = setTimeout(() => {
        void finishSession(detected);
      }, 1800);
    },
    onError: (chatError) => {
      toast.error(
        chatError.message || "Koneksi ke pembeli virtual terputus. Coba lagi."
      );
    },
  });

  const locked = isEvaluating || autoOutcome !== null;
  const hasUserMessage = messages.some((message) => message.role === "user");

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, autoOutcome, evaluationError]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 132)}px`;
  }, [input]);

  const submitMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() || isLoading || locked) return;
    handleSubmit(event);
  };

  const handleManualEnd = () => {
    if (!hasUserMessage) {
      toast.error("Kirim minimal satu pesan negosiasi sebelum mengakhiri sesi.");
      return;
    }
    void finishSession("manual");
  };

  const outcomeBanner =
    autoOutcome === "deal"
      ? {
          icon: CheckCircle2,
          title: "Kesepakatan tercapai!",
          description:
            "Pembeli virtual menyatakan sepakat. AI sedang menyusun evaluasi negosiasi Anda.",
          className: "border-emerald-200 bg-emerald-50 text-emerald-900",
          iconClass: "text-emerald-700",
        }
      : autoOutcome === "no_deal"
        ? {
            icon: XCircle,
            title: "Negosiasi berakhir tanpa kesepakatan",
            description:
              "Pembeli virtual mengakhiri negosiasi. Tetap ada pelajaran berharga — AI sedang menilai cara Anda.",
            className: "border-rose-200 bg-rose-50 text-rose-900",
            iconClass: "text-rose-700",
          }
        : null;

  return (
    <div className="flex h-full flex-col gap-3">
      {/* Top bar */}
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/dashboard"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-white text-muted-foreground shadow-sm transition-colors hover:text-foreground"
            aria-label="Kembali ke dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="outline" className="bg-white text-[10px]">
                {partner.shortLabel}
              </Badge>
              <Badge
                variant={difficulty === "hard" ? "destructive" : difficulty === "medium" ? "warning" : "success"}
                className="text-[10px]"
              >
                {diff.label}
              </Badge>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Sesi aktif
              </span>
            </div>
            <h1 className="mt-1 truncate font-display text-lg font-bold leading-tight text-ink sm:text-xl">
              {product.name}
            </h1>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-9 shrink-0 gap-1.5 border-rose-200 bg-white text-rose-700 hover:bg-rose-50 hover:text-rose-800"
          onClick={() => setEndOpen(true)}
          disabled={locked}
        >
          <CircleStop className="h-4 w-4" />
          Akhiri sesi
        </Button>
      </div>

      {/* Body */}
      <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_310px]">
        <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-white shadow-soft relative">
          {/* Chat header */}
          <div className="flex shrink-0 items-center justify-between border-b border-border/70 bg-sand-50/70 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-base ring-1 ring-emerald-200">
                {partner.emoji}
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold leading-tight text-ink">
                  {partner.buyerName}
                </p>
                <p className="truncate text-[10px] text-muted-foreground">
                  {partner.buyerRole} · {partner.company}
                </p>
              </div>
            </div>
            <Badge variant="success" className="shrink-0 gap-1 text-[10px]">
              <Sparkles className="h-3 w-3" />
              AI
            </Badge>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="chat-scroll flex-1 space-y-4 overflow-y-auto bg-[#FDFCF8] px-3 py-4 sm:px-5"
          >
            <div className="mx-auto max-w-md rounded-xl border border-border/60 bg-white/70 px-3 py-2 text-center text-[10px] leading-relaxed text-muted-foreground">
              Simulasi latihan. AI memerankan pembeli profesional dan tidak
              mewakili perusahaan nyata.
            </div>

            {messages.map((message) => {
              const isUser = message.role === "user";
              const content = isUser
                ? message.content
                : sanitizeAssistantText(message.content);

              if (!content) return null;

              return (
                <div
                  key={message.id}
                  className={cn("flex gap-2.5", isUser ? "justify-end" : "justify-start")}
                >
                  {!isUser && (
                    <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-800">
                      {partner.buyerName.split(" ").slice(-1)[0]?.charAt(0) ?? "P"}
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[86%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm sm:max-w-[78%] sm:text-sm",
                      isUser
                        ? "rounded-tr-md bg-primary text-primary-foreground"
                        : "rounded-tl-md border border-border/70 bg-white text-ink"
                    )}
                  >
                    {content}
                  </div>
                  {isUser && (
                    <div className="mt-0.5 hidden h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground sm:grid">
                      Anda
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5">
                <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-800">
                  {partner.buyerName.split(" ").slice(-1)[0]?.charAt(0) ?? "P"}
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-border/70 bg-white px-4 py-3 shadow-sm">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-muted-foreground/60" />
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-muted-foreground/60 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-muted-foreground/60 [animation-delay:300ms]" />
                  <span className="ml-1 text-[10px] text-muted-foreground">
                    {partner.buyerName} mengetik…
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer / input */}
          <div className="shrink-0 border-t border-border/70 bg-white p-3 sm:p-4">
            {outcomeBanner && (
              <div className={cn("mb-3 flex items-start gap-2.5 rounded-xl border p-3", outcomeBanner.className)}>
                <outcomeBanner.icon className={cn("mt-0.5 h-4 w-4 shrink-0", outcomeBanner.iconClass)} />
                <div className="min-w-0">
                  <p className="text-xs font-bold">{outcomeBanner.title}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed opacity-80">
                    {outcomeBanner.description}
                  </p>
                  {isEvaluating && (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Menganalisis transkrip & menyusun skor…
                    </p>
                  )}
                  {evaluationError && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-medium text-rose-700">
                        {evaluationError}
                      </span>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-7 bg-white text-[11px]"
                        onClick={() => void finishSession(autoOutcome ?? "manual")}
                      >
                        <RotateCcw className="h-3 w-3" />
                        Coba lagi
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {chatError && (
              <Alert variant="destructive" className="mb-3 py-2.5">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between gap-3">
                  <span className="text-xs">{chatError.message}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 shrink-0 bg-white text-[11px]"
                    onClick={() => reload()}
                  >
                    Coba lagi
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {evaluationError && !outcomeBanner && (
              <Alert variant="destructive" className="mb-3 py-2.5">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between gap-3">
                  <span className="text-xs">{evaluationError}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 shrink-0 bg-white text-[11px]"
                    onClick={() => void finishSession("manual")}
                  >
                    <RotateCcw className="h-3 w-3" />
                    Ulangi evaluasi
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={submitMessage} className="relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(event) => {
                  if (event.target.value.length <= MAX_CHARS) {
                    handleInputChange(event);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                rows={1}
                placeholder={
                  locked
                    ? "Sesi sedang dievaluasi…"
                    : "Tulis respons negosiasi Anda… (Enter untuk kirim)"
                }
                disabled={locked}
                maxLength={MAX_CHARS}
                className="min-h-[52px] resize-none rounded-2xl border-border/80 py-3.5 pl-4 pr-24 text-sm focus-visible:ring-primary/30"
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
                {input.length > 0 && (
                  <span
                    className={cn(
                      "text-[10px] tabular-nums",
                      input.length > MAX_CHARS - 100 ? "text-rose-600" : "text-muted-foreground/60"
                    )}
                  >
                    {input.length}/{MAX_CHARS}
                  </span>
                )}
                {isLoading ? (
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => stop()}
                    className="h-9 w-9 shrink-0 rounded-full"
                    aria-label="Hentikan respons"
                  >
                    <Square className="h-3.5 w-3.5" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || locked}
                    className="h-9 w-9 shrink-0 rounded-full"
                    aria-label="Kirim pesan"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
            <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Percakapan disimpan untuk evaluasi
              </span>
              <span className="hidden sm:inline">Shift + Enter untuk baris baru</span>
            </div>
          </div>

          {isEvaluating && !autoOutcome && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/80 p-6 backdrop-blur-sm">
              <div className="max-w-sm rounded-2xl border border-border bg-white p-6 text-center shadow-lift">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </span>
                <p className="mt-4 font-display text-lg font-bold text-ink">
                  AI sedang menilai negosiasi Anda
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Transkrip dianalisis dengan 5 aspek rubrik. Proses ini biasanya
                  memakan waktu 10–20 detik.
                </p>
                <div className="mt-4 flex items-center justify-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-primary/50" />
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-primary/50 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-primary/50 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden min-h-0 space-y-3 overflow-y-auto pr-0.5 xl:block">
          <div className="rounded-2xl border border-border/80 bg-white p-4 shadow-soft">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Skenario
            </p>
            <p className="mt-2 font-display text-base font-bold leading-snug text-ink">
              {product.name}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Harga dasar {formatRupiah(product.base_price)} / unit
            </p>

            <div className="mt-3 rounded-xl bg-sand-50 p-3 text-[11px] leading-relaxed text-muted-foreground">
              <p className="mb-1 flex items-center gap-1 font-semibold text-ink">
                <Info className="h-3.5 w-3.5 text-primary" />
                Keunggulan yang Anda klaim
              </p>
              {product.usp}
            </div>

            <div className="mt-3 space-y-2 border-t border-border/70 pt-3 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Mitra</span>
                <span className="font-semibold text-ink">{partner.shortLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Kesulitan</span>
                <span className="font-semibold text-ink">{diff.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pembeli</span>
                <span className="font-semibold text-ink">{partner.buyerName}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
            <p className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Lightbulb className="h-4 w-4 text-amber-700" />
              Strategi yang perlu dicoba
            </p>
            <ul className="mt-2.5 space-y-2 text-[11px] leading-relaxed text-amber-900/80">
              {difficulty === "easy" ? (
                <>
                  <li>• Sebutkan harga, isi paket, dan syarat secara spesifik sejak awal.</li>
                  <li>• Hubungkan USP dengan manfaat nyata untuk mitra.</li>
                  <li>• Tutup dengan pertanyaan yang meminta komitmen.</li>
                </>
              ) : difficulty === "medium" ? (
                <>
                  <li>• Jangan langsung menurunkan harga; tanyakan dulu kebutuhan volume.</li>
                  <li>• Tukar konsesi harga dengan syarat pembayaran atau komitmen volume.</li>
                  <li>• Jawab keberatan TOP dengan solusi, bukan penolakan.</li>
                </>
              ) : (
                <>
                  <li>• Jaga batas harga Anda dan jangan panik saat pembeli mengancam mundur.</li>
                  <li>• Tawarkan paket alternatif: harga lebih rendah untuk komitmen lebih besar.</li>
                  <li>• Tolak konsinyasi penuh dengan alternatif yang tetap menguntungkan.</li>
                </>
              )}
            </ul>
          </div>

          <div className="rounded-2xl border border-border/80 bg-white p-4 shadow-soft">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              <Target className="h-3.5 w-3.5" />
              Dinilai di akhir sesi
            </p>
            <div className="mt-3 space-y-2">
              {RUBRIC_ASPECTS.map((aspect, index) => (
                <div key={aspect.key} className="flex items-start gap-2 text-[11px]">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-secondary text-[9px] font-bold text-secondary-foreground">
                    {index + 1}
                  </span>
                  <span className="leading-snug text-muted-foreground">{aspect.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1.5 border-t border-border/70 pt-3 text-[10px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
              Rubrik tetap dan konsisten antar sesi.
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-sand-50 px-3 py-2.5 text-[10px] text-muted-foreground">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            Sesi berakhir otomatis saat sepakat atau buntu.
          </div>
        </aside>
      </div>

      {/* End session dialog */}
      <Dialog open={endOpen} onOpenChange={setEndOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-2 grid h-11 w-11 place-items-center rounded-full bg-rose-100 text-rose-700">
              <CircleStop className="h-5 w-5" />
            </div>
            <DialogTitle>Akhiri sesi sekarang?</DialogTitle>
            <DialogDescription>
              Percakapan akan ditutup dan AI akan menilai seluruh transkrip
              menggunakan rubrik 5 aspek. Anda tidak bisa melanjutkan chat
              setelah ini.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-border/70 bg-sand-50 p-3.5 text-xs leading-relaxed text-muted-foreground">
            <p className="font-semibold text-ink">Ringkasan sesi</p>
            <div className="mt-2 space-y-1.5">
              <div className="flex justify-between gap-3">
                <span>Produk</span>
                <span className="truncate font-medium text-ink">{product.name}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Mitra</span>
                <span className="font-medium text-ink">
                  {partner.shortLabel} · {diff.label}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Pesan Anda</span>
                <span className="font-medium text-ink">
                  {messages.filter((message) => message.role === "user").length} pesan
                </span>
              </div>
            </div>
          </div>

          {!hasUserMessage && (
            <p className="flex items-start gap-1.5 text-xs text-amber-700">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Anda belum mengirim pesan. Kirim minimal satu respons agar AI bisa
              menilai negosiasi.
            </p>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEndOpen(false)}>
              Lanjutkan negosiasi
            </Button>
            <Button
              variant="destructive"
              onClick={handleManualEnd}
              disabled={isEvaluating || !hasUserMessage}
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menyusun evaluasi…
                </>
              ) : (
                <>
                  Akhiri & evaluasi
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
