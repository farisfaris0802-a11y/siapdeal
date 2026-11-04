import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/plus-jakarta-sans";
import { Toaster } from "sonner";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SiapDeal — AI Flight Simulator Negosiasi UMKM Bali",
    template: "%s · SiapDeal",
  },
  description:
    "Latih negosiasi B2B dengan F&B Director hotel Nusa Dua, manager pusat oleh-oleh Bali, dan owner beach club Canggu. Dapatkan skor 5 aspek serta saran kalimat yang lebih kuat — tanpa risiko kehilangan mitra sungguhan.",
  keywords: [
    "simulasi negosiasi",
    "negosiasi B2B",
    "UMKM Bali",
    "AI untuk UMKM",
    "Bali DigiFest 2026",
    "latihan penjualan",
    "supplier hotel",
    "titip jual",
  ],
  authors: [{ name: "SiapDeal · NegoLab" }],
  openGraph: {
    title: "SiapDeal — AI Flight Simulator Negosiasi UMKM Bali",
    description:
      "Hadapi pembeli virtual Bali yang realistis, lalu lihat skor dan saran perbaikan negosiasi Anda. Dibuat untuk Bali DigiFest 2026.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className="font-sans">
        {children}
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            style: {
              borderRadius: "14px",
              fontFamily: "var(--font-sans)",
            },
          }}
        />
      </body>
    </html>
  );
}
