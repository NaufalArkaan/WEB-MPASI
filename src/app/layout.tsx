import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#52765B",
};

export const metadata: Metadata = {
  title: "MPASI SMART | Panduan MPASI untuk Si Kecil",
  description:
    "Platform edukasi dan panduan MPASI terpercaya berdasarkan standar WHO (2023) dan Buku KIA Kemenkes RI (2024).",
  keywords: [
    "MPASI",
    "MPASI SMART",
    "Panduan MPASI",
    "MPASI Bayi 6-23 Bulan",
    "Nutrisi Bayi",
    "Resep MPASI",
    "WHO 2023",
    "Buku KIA 2024",
    "Cegah Stunting",
  ],
  authors: [{ name: "Tim MPASI SMART" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-cream text-darkGreen font-body antialiased selection:bg-secondary selection:text-darkGreen min-h-screen flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
