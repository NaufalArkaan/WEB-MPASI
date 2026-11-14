"use client";

import React from "react";
import { 
  Sparkles, 
  ArrowUp, 
  ShieldAlert, 
  ExternalLink, 
  Heart, 
  BookOpen, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 84;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-darkGreen text-cream-100 pt-16 pb-10 border-t border-primary/20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-primary-800/30 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="container-custom relative z-10">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column (Col 1-5) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
              aria-label="MPASI SMART - Kembali ke Beranda"
            >
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-soft group-hover:bg-primary-400 transition-colors">
                <Sparkles className="w-5 h-5 text-accent-200" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white tracking-tight leading-none">
                  MPASI <span className="text-secondary font-extrabold">SMART</span>
                </span>
                <span className="text-[10px] font-body text-cream-300 font-medium tracking-wider uppercase mt-1">
                  Edukasi Makanan Pendamping ASI
                </span>
              </div>
            </a>

            <p className="mt-5 text-sm text-cream-300 font-body leading-relaxed max-w-md">
              MPASI SMART adalah platform edukasi kesehatan terpercaya untuk orang tua dan pengasuh dalam mendampingi masa MPASI bayi usia 6–23 bulan. Berkomitmen mendukung pemenuhan nutrisi optimal pada 1000 Hari Pertama Kehidupan (HPK) guna mencegah stunting di Indonesia.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-secondary-300 font-body">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                Frontend-Only Architecture
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                Next.js 14 • Tailwind CSS
              </span>
            </div>
          </div>

          {/* Quick Links Column (Col 6-8) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-base text-white tracking-wide uppercase text-xs mb-4 text-secondary">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-sm font-body">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, "#home")}
                  className="text-cream-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-primary-300" />
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, "#about")}
                  className="text-cream-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-primary-300" />
                  Tentang MPASI
                </a>
              </li>
              <li>
                <a
                  href="#stages"
                  onClick={(e) => handleNavClick(e, "#stages")}
                  className="text-cream-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-primary-300" />
                  Tahapan Usia & Tekstur
                </a>
              </li>
              <li>
                <a
                  href="#nutrition"
                  onClick={(e) => handleNavClick(e, "#nutrition")}
                  className="text-cream-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-primary-300" />
                  Kebutuhan Nutrisi
                </a>
              </li>
              <li>
                <a
                  href="#recipes"
                  onClick={(e) => handleNavClick(e, "#recipes")}
                  className="text-cream-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-primary-300" />
                  Katalog Resep Bergizi
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleNavClick(e, "#faq")}
                  className="text-cream-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-primary-300" />
                  FAQ (Tanya Jawab)
                </a>
              </li>
            </ul>
          </div>

          {/* References & Health Basis Column (Col 9-12) */}
          <div className="lg:col-span-4">
            <h4 className="font-heading font-bold text-base text-white tracking-wide uppercase text-xs mb-4 text-secondary">
              Landasan & Referensi Resmi
            </h4>
            <div className="space-y-3 text-xs text-cream-300 font-body">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/30 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <strong className="font-heading text-white text-xs block">
                    World Health Organization (WHO)
                  </strong>
                  <span className="text-[10px] bg-primary/40 text-secondary-200 px-2 py-0.5 rounded-full shrink-0">
                    2023
                  </span>
                </div>
                <p className="mt-1 text-cream-300 text-[11px] leading-relaxed">
                  Guideline for Complementary Feeding of Infants and Young Children 6–23 Months of Age.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/30 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <strong className="font-heading text-white text-xs block">
                    Kementerian Kesehatan RI
                  </strong>
                  <span className="text-[10px] bg-primary/40 text-secondary-200 px-2 py-0.5 rounded-full shrink-0">
                    2024
                  </span>
                </div>
                <p className="mt-1 text-cream-300 text-[11px] leading-relaxed">
                  Buku Kesehatan Ibu dan Anak (Buku KIA) & Petunjuk Teknis Praktik MP-ASI Anak 6–23 Bulan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Disclaimer Banner */}
        <div className="my-8 p-5 sm:p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-accent-500/20 text-accent-300 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="text-xs text-cream-300 font-body leading-relaxed">
            <strong className="text-white font-heading font-semibold block sm:inline mr-2">
              Disclaimer Edukasi Kesehatan:
            </strong>
            Seluruh konten, panduan tekstur, dan informasi gizi pada website MPASI SMART disusun untuk tujuan edukasi umum berdasarkan rekomendasi WHO dan Kementerian Kesehatan RI. Informasi ini tidak ditujukan sebagai pengganti diagnosis, konsultasi klinis, atau resep medis langsung dari dokter spesialis anak atau tenaga kesehatan berlisensi.
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-300 font-body">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} MPASI SMART. Hak Cipta Dilindungi Undang-Undang.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-secondary">
              Arkaan • Frontend & UI/UX Design System
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-primary text-white transition-all text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Kembali ke bagian atas halaman"
            >
              <span>Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

