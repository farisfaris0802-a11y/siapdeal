import {
  CheckCircle2,
  Clock,
  Info,
  Lightbulb,
  ShieldCheck,
  Target,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  DIFFICULTY_META,
  PARTNER_META,
  RUBRIC_ASPECTS,
} from "@/lib/ai/personas";
import { CATEGORY_LABEL } from "@/lib/catalog";
import type { Difficulty, PartnerType, ProductCategory } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";

export interface ScenarioPanelProduct {
  name: string;
  base_price: number;
  usp: string;
  category: ProductCategory;
}

export function ScenarioPanel({
  product,
  partnerType,
  difficulty,
}: {
  product: ScenarioPanelProduct;
  partnerType: PartnerType;
  difficulty: Difficulty;
}) {
  const partner = PARTNER_META[partnerType];
  const diff = DIFFICULTY_META[difficulty];

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 pt-6 shadow-soft">
        <span className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0F5132_0%,#10B981_58%,#F59E0B_100%)]" />
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Detail Skenario
          </p>
          <Badge variant="success" className="text-[9px]">
            Live
          </Badge>
        </div>
        <p className="mt-2.5 font-display text-lg font-bold leading-snug text-ink">
          {product.name}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {formatRupiah(product.base_price)} / unit ·{" "}
          {CATEGORY_LABEL[product.category]}
        </p>

        <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-[11px]">
          {[
            ["Harga dasar", formatRupiah(product.base_price)],
            ["Kategori", CATEGORY_LABEL[product.category]],
            ["Mitra", partner.shortLabel],
            ["Tingkat", diff.label],
            ["Pembeli", partner.buyerName],
          ].map(([label, value]) => (
            <div key={label} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
              <span className="min-w-0 flex-1 text-muted-foreground">{label}</span>
              <span className="max-w-[150px] text-right font-semibold leading-snug text-ink">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
            <Info className="h-3.5 w-3.5" />
            Keunggulan klaim
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-emerald-950/70">
            {product.usp}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200/80 bg-[linear-gradient(145deg,#FFFBEB_0%,#FEF3C7_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        <div className="flex items-start gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-amber-200 bg-white/70 text-amber-600">
            <Lightbulb className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-bold text-amber-950">Strategi &amp; tips negosiasi</p>
            <p className="mt-0.5 text-[10px] text-amber-800/70">
              Panduan cepat untuk level {diff.label.toLowerCase()}.
            </p>
          </div>
        </div>
        <ul className="mt-3 space-y-2 text-[11px] leading-relaxed text-amber-950/75">
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
        <p className="mt-3 border-t border-amber-200/70 pt-2.5 text-[10px] font-medium text-amber-800/70">
          Gunakan data, nilai produk, dan trade-off — bukan diskon langsung.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-soft">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          <Target className="h-3.5 w-3.5" />
          Dinilai di akhir sesi
        </p>
        <div className="mt-3 space-y-2">
          {RUBRIC_ASPECTS.map((aspect, index) => (
            <div key={aspect.key} className="flex items-start gap-2 text-[11px]">
              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-500">
                {index + 1}
              </span>
              <span className="leading-snug text-slate-500">{aspect.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[10px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          Rubrik tetap dan konsisten antar sesi.
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2.5 text-[10px] text-slate-500">
        <Clock className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
        Sesi berakhir otomatis saat sepakat atau buntu.
      </div>
    </div>
  );
}
