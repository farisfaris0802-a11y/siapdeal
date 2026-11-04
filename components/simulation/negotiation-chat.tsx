"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  CircleStop,
  Info,
  Lightbulb,
  Loader2,
  Mic,
  PanelRight,
  RotateCcw,
  Send,
  Sparkles,
  XCircle,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { detectOutcome } from "@/lib/ai/buyer-prompt";
import { sanitizeAssistantText } from "@/lib/ai/sanitize";
import {
  DIFFICULTY_META,
  PARTNER_META,
} from "@/lib/ai/personas";
import type {
  ChatMessage,
  Difficulty,
  PartnerType,
  ProductCategory,
  SessionOutcome,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScenarioPanel } from "@/components/simulation/scenario-panel";
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
  category: ProductCategory;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

interface NegotiationChatProps {
  sessionId: string;
  product: ChatProduct;
  partnerType: PartnerType;
  difficulty: Difficulty;
  initialMessages: ChatMessage[];
  isJudge?: boolean;
}

const MAX_CHARS = 1500;

export function NegotiationChat({
  sessionId,
  product,
  partnerType,
  difficulty,
  initialMessages,
  isJudge = false,
}: NegotiationChatProps) {
  const router = useRouter();
  const partner = PARTNER_META[partnerType];
  const diff = DIFFICULTY_META[difficulty];

  const [endOpen, setEndOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [coachOpen, setCoachOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
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
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
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

  const startVoiceInput = () => {
    if (typeof window === "undefined") return;

    const speechWindow = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Recognition =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!Recognition) {
      toast.info("Browser ini belum mendukung input suara. Gunakan Chrome atau Edge.");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "id-ID";
    recognition.interimResults = true;
    recognition.continuous = false;
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();
      if (transcript) setInput(transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Input suara gagal. Coba lagi.");
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const coachSuggestions = [
    {
      title: "Tanyakan volume & kebutuhan",
      body: "Buka ruang negosiasi dengan data, bukan langsung diskon.",
      example: `Bapak/Ibu, untuk kebutuhan ${product.name}, berapa volume ideal per bulan? Saya bisa siapkan skema harga bertingkat.`,
    },
    {
      title: "Tukar konsesi dengan syarat",
      body: "Setiap penurunan harga harus dibayar dengan komitmen lain.",
      example:
        "Saya bisa menyesuaikan harga jika TOP dipersingkat menjadi 30 hari dan ada komitmen volume minimal 100 pcs.",
    },
    {
      title: "Kunci langkah lanjutan",
      body: "Closing konkret menurunkan risiko keputusan menggantung.",
      example:
        "Boleh kita kunci uji coba 2 minggu untuk 100 pcs, lalu review bersama pada akhir bulan?",
    },
  ];

  const applyCoachSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setCoachOpen(false);
    textareaRef.current?.focus();
  };

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
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:text-emerald-700"
            aria-label="Kembali ke dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="outline" className="border-slate-200 bg-white text-[10px] text-slate-600">
                {partner.shortLabel}
              </Badge>
              <Badge
                variant={difficulty === "hard" ? "destructive" : difficulty === "medium" ? "warning" : "success"}
                className="text-[10px]"
              >
                Level: {diff.label}
              </Badge>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Sesi Aktif · {isJudge ? "Mode Juri" : "Fast Demo"}
              </span>
            </div>
            <h1 className="mt-1 truncate font-display text-lg font-bold leading-tight text-ink sm:text-xl">
              {product.name}
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            size="sm"
            className="h-auto min-h-9 gap-1.5 border-slate-200 bg-white text-[11px] text-slate-600 hover:border-emerald-200 hover:text-emerald-700 xl:hidden"
            onClick={() => setInfoOpen(true)}
          >
            <PanelRight className="h-4 w-4" />
            Detail Skenario
          </Button>
          <Button
            size="sm"
            className="h-auto min-h-9 w-full shrink-0 gap-1.5 whitespace-normal border border-rose-200 bg-rose-50 px-4 py-2 text-[11px] font-semibold text-rose-700 shadow-sm transition-all duration-200 hover:bg-rose-100 sm:w-auto sm:text-xs"
            onClick={() => setEndOpen(true)}
            disabled={locked}
          >
            <CircleStop className="h-4 w-4" />
            Selesaikan &amp; Lihat Evaluasi Deal
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="relative flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
          {/* Chat header */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-50 text-lg ring-1 ring-emerald-100">
                {partner.emoji}
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <p className="truncate text-sm font-bold leading-tight text-ink">
                    {partner.buyerName}
                  </p>
                  <Badge
                    variant="outline"
                    className="border-emerald-200 bg-emerald-50/80 text-[8px] uppercase tracking-wide text-emerald-700"
                  >
                    Mitra B2B
                  </Badge>
                </div>
                <p className="truncate text-[10px] text-muted-foreground">
                  {partner.buyerRole} · {partner.company}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-[9px] font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online · siap bernegosiasi
                </p>
              </div>
            </div>
            <Badge variant="success" className="shrink-0 gap-1 text-[10px]">
              <Sparkles className="h-3 w-3" />
              AI Negotiator
            </Badge>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="chat-scroll flex-1 space-y-4 overflow-y-auto bg-[#F8FAF9] px-3 py-4 sm:px-5"
          >
            <div className="mx-auto max-w-md rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2 text-center text-[10px] leading-relaxed text-slate-500">
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
                <div key={message.id} className={cn(isUser ? "" : "space-y-1")}>
                  {!isUser && (
                    <p className="pl-9 text-[9px] font-semibold tracking-wide text-slate-400">
                      {partner.buyerRole} · {partner.company}
                    </p>
                  )}
                  <div
                    className={cn("flex gap-2.5", isUser ? "justify-end" : "justify-start")}
                  >
                    {!isUser && (
                      <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                        {partner.buyerName.split(" ").slice(-1)[0]?.charAt(0) ?? "P"}
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[86%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-sm sm:max-w-[78%] sm:text-sm",
                        isUser
                          ? "rounded-tr-none bg-primary text-primary-foreground shadow-emerald-950/10"
                          : "rounded-tl-none border border-slate-200 bg-white text-slate-700"
                      )}
                    >
                      {content}
                    </div>
                    {isUser && (
                      <div className="mt-0.5 hidden h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-900 text-[10px] font-bold text-white sm:grid">
                        Anda
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="space-y-1">
                <p className="pl-9 text-[9px] font-semibold tracking-wide text-slate-400">
                  {partner.buyerRole} · {partner.company}
                </p>
                <div className="flex gap-2.5">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                    {partner.buyerName.split(" ").slice(-1)[0]?.charAt(0) ?? "P"}
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-none border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-500" />
                    <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-500 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-500 [animation-delay:300ms]" />
                    <span className="ml-1 text-[10px] text-slate-500">
                      {partner.buyerName} sedang meninjau penawaran Anda...
                    </span>
                  </div>
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

            <div className="mb-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setCoachOpen(true)}
                disabled={locked}
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-semibold text-amber-800 transition-colors hover:bg-amber-100 disabled:opacity-50"
              >
                <Lightbulb className="h-3.5 w-3.5" />
                Tanya Coach AI
              </button>
              <span className="hidden text-[10px] text-slate-400 sm:inline">
                Saran cepat, bukan jawaban otomatis
              </span>
            </div>

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
                    : "Ketik respons negosiasi Anda di sini... (Tekan Enter untuk kirim)"
                }
                disabled={locked}
                maxLength={MAX_CHARS}
                className="min-h-[56px] resize-none rounded-2xl border-slate-200 bg-white py-3.5 pl-4 pr-28 text-sm leading-relaxed shadow-sm transition-all focus-visible:border-emerald-300 focus-visible:ring-emerald-600/15"
              />
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1">
                {input.length > 0 && (
                  <span
                    className={cn(
                      "hidden text-[10px] tabular-nums sm:inline",
                      input.length > MAX_CHARS - 100 ? "text-rose-600" : "text-slate-400"
                    )}
                  >
                    {input.length}/{MAX_CHARS}
                  </span>
                )}
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={startVoiceInput}
                  disabled={locked || isLoading}
                  className={cn(
                    "h-9 w-9 shrink-0 rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-700",
                    isListening && "bg-amber-50 text-amber-700"
                  )}
                  aria-label="Input suara"
                  title="Input suara"
                >
                  <Mic className={cn("h-4 w-4", isListening && "animate-pulse")} />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || locked || isLoading}
                  className="h-9 w-9 shrink-0 rounded-full bg-primary shadow-sm transition-all duration-200 hover:bg-emerald-700 disabled:bg-primary/60"
                  aria-label="Kirim pesan"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
            <div className="mt-2 flex items-center justify-between gap-3 px-1 text-[10px]">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 font-medium",
                  isLoading ? "text-emerald-700" : "text-slate-400"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    isLoading ? "animate-pulse bg-emerald-500" : "bg-slate-300"
                  )}
                />
                {isLoading
                  ? "AI sedang mengetik..."
                  : "AI siap menerima respons Anda"}
              </span>
              <span className="hidden text-slate-400 sm:inline">
                Shift + Enter untuk baris baru
              </span>
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

        {/* Sidebar desktop */}
        <aside className="hidden min-h-0 space-y-3 overflow-y-auto pr-0.5 xl:block">
          <ScenarioPanel
            product={product}
            partnerType={partnerType}
            difficulty={difficulty}
          />
        </aside>
      </div>

      {/* Mobile scenario drawer */}
      {infoOpen && (
        <div
          className="fixed inset-0 z-[60] xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Detail skenario"
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
            onClick={() => setInfoOpen(false)}
            aria-label="Tutup detail skenario"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[86dvh] overflow-y-auto rounded-t-3xl border-t border-slate-200 bg-[#F8FAF9] p-4 pb-8 shadow-2xl">
            <div className="mx-auto h-1 w-10 rounded-full bg-slate-300" />
            <div className="mt-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Informasi sesi
                </p>
                <h2 className="mt-1 font-display text-lg font-bold text-ink">
                  Detail Skenario
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setInfoOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:text-ink"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4">
              <ScenarioPanel
                product={product}
                partnerType={partnerType}
                difficulty={difficulty}
              />
            </div>
          </div>
        </div>
      )}

      {/* Coach dialog */}
      <Dialog open={coachOpen} onOpenChange={setCoachOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-2 grid h-11 w-11 place-items-center rounded-full bg-amber-50 text-amber-600">
              <Lightbulb className="h-5 w-5" />
            </div>
            <DialogTitle>Tanya Coach AI</DialogTitle>
            <DialogDescription>
              Gunakan saran ini sebagai pemicu berpikir. Sesuaikan dengan harga,
              volume, dan syarat yang sedang dinegosiasikan.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2.5">
            {coachSuggestions.map((suggestion, index) => (
              <div
                key={suggestion.title}
                className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-3.5"
              >
                <p className="text-xs font-bold text-amber-950">
                  {index + 1}. {suggestion.title}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-amber-900/75">
                  {suggestion.body}
                </p>
                <p className="mt-2 rounded-lg border border-amber-200 bg-white/80 p-2.5 text-[11px] italic leading-relaxed text-slate-600">
                  “{suggestion.example}”
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="mt-2 h-7 border-amber-300 bg-white text-[10px] text-amber-800 hover:bg-amber-50"
                  onClick={() => applyCoachSuggestion(suggestion.example)}
                >
                  Masukkan ke chat
                </Button>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCoachOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* End session dialog */}
      <Dialog open={endOpen} onOpenChange={setEndOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-2 grid h-11 w-11 place-items-center rounded-full bg-rose-50 text-rose-600">
              <CircleStop className="h-5 w-5" />
            </div>
            <DialogTitle>Selesaikan &amp; lihat evaluasi deal?</DialogTitle>
            <DialogDescription>
              Percakapan akan ditutup dan AI menilai seluruh transkrip dengan
              rubrik 5 aspek. Hasilnya langsung tersedia di halaman evaluasi.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs leading-relaxed text-slate-500">
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
              onClick={handleManualEnd}
              disabled={isEvaluating || !hasUserMessage}
              className="gap-1.5 bg-rose-600 text-white hover:bg-rose-700"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menyusun evaluasi…
                </>
              ) : (
                <>
                  <CircleStop className="h-4 w-4" />
                  Selesaikan &amp; Lihat Evaluasi Deal
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
