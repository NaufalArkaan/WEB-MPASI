import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "MPASI SMART | Panduan & Edukasi Nutrisi MPASI Bayi 6–23 Bulan",
  description:
    "Platform edukasi Makanan Pendamping ASI (MPASI) terpercaya berbasis standar WHO (2023) dan Buku KIA Kemenkes RI (2024). Panduan tekstur, nutrisi, dan inspirasi menu terbaik untuk si kecil.",
  keywords: [
    "MPASI",
    "MPASI Bayi",
    "Nutrisi Bayi",
    "Resep MPASI",
    "WHO MPASI 2023",
    "Buku KIA 2024",
    "Cegah Stunting",
    "Makanan Pendamping ASI",
  ],
  authors: [{ name: "Tim Pengembang MPASI SMART" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-cream text-darkGreen font-body antialiased selection:bg-secondary selection:text-darkGreen min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
