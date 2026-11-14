import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import AboutMPASI from "@/components/sections/AboutMPASI";
import Footer from "@/components/layout/Footer";
import { Sparkles, BookOpen, Apple, ChefHat, ShieldCheck, HelpCircle, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar Component (Tanggung Jawab: Arkaan) */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero Section (Tanggung Jawab: Arkaan) */}
        <Hero />

        {/* 3. About MPASI Section (Tanggung Jawab: Arkaan) */}
        <AboutMPASI />

        {/* 
          =======================================================================
          SLOT INTEGRASI UNTUK ANGGOTA TIM LAIN
          Disiapkan oleh Arkaan sebagai koordinator visual/layout agar navigasi 
          anchor smooth scroll (#stages, #nutrition, #recipes, dll) berfungsi sempurna.
          =======================================================================
        */}

        {/* Prinsip MPASI (#principles) */}
        <section id="principles" className="py-14 sm:py-20 bg-white border-t border-primary/10">
          <div className="container-custom text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-100 text-primary-700 text-xs font-heading font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Section Tim</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-darkGreen">
              Prinsip Pemberian MPASI
            </h2>
            <p className="mt-2 text-sm text-darkGreen-300 font-body max-w-xl mx-auto">
              [Slot Komponen: <code>Principles.tsx</code> • 4 Prinsip WHO: Tepat Waktu, Adekuat, Aman, Diberikan dengan Benar]
            </p>
          </div>
        </section>

        {/* Tahapan Usia (#stages) */}
        <section id="stages" className="py-14 sm:py-20 bg-cream/70 border-t border-primary/10">
          <div className="container-custom text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-100 text-primary-700 text-xs font-heading font-medium mb-3">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span>Section Tim</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-darkGreen">
              Panduan Tahapan Usia & Tekstur
            </h2>
            <p className="mt-2 text-sm text-darkGreen-300 font-body max-w-xl mx-auto">
              [Slot Komponen: <code>AgeStages.tsx</code> • Tab Usia 6–8 bln, 9–11 bln, 12–23 bln]
            </p>
          </div>
        </section>

        {/* Nutrisi MPASI (#nutrition) */}
        <section id="nutrition" className="py-14 sm:py-20 bg-white border-t border-primary/10">
          <div className="container-custom text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-100 text-primary-700 text-xs font-heading font-medium mb-3">
              <Apple className="w-3.5 h-3.5 text-primary" />
              <span>Section Tim</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-darkGreen">
              Kebutuhan & Sumber Nutrisi MPASI
            </h2>
            <p className="mt-2 text-sm text-darkGreen-300 font-body max-w-xl mx-auto">
              [Slot Komponen: <code>Nutrition.tsx</code> • Protein Hewani, Zat Besi, Lemak, Vitamin]
            </p>
          </div>
        </section>

        {/* Resep MPASI (#recipes) */}
        <section id="recipes" className="py-14 sm:py-20 bg-cream/70 border-t border-primary/10">
          <div className="container-custom text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-100 text-primary-700 text-xs font-heading font-medium mb-3">
              <ChefHat className="w-3.5 h-3.5 text-primary" />
              <span>Section Tim</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-darkGreen">
              Inspirasi Resep MPASI Sehat
            </h2>
            <p className="mt-2 text-sm text-darkGreen-300 font-body max-w-xl mx-auto">
              [Slot Komponen: <code>Recipes.tsx</code> • Katalog resep, filter usia, modal detail]
            </p>
          </div>
        </section>

        {/* Keamanan Pangan (#safety) */}
        <section id="safety" className="py-14 sm:py-20 bg-white border-t border-primary/10">
          <div className="container-custom text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-100 text-primary-700 text-xs font-heading font-medium mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Section Tim</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-darkGreen">
              Keamanan & Higienitas Pangan
            </h2>
            <p className="mt-2 text-sm text-darkGreen-300 font-body max-w-xl mx-auto">
              [Slot Komponen: <code>FoodSafety.tsx</code> • Higienitas, penyimpanan, pencegahan tersedak]
            </p>
          </div>
        </section>

        {/* FAQ (#faq) */}
        <section id="faq" className="py-14 sm:py-20 bg-cream/70 border-t border-primary/10">
          <div className="container-custom text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-100 text-primary-700 text-xs font-heading font-medium mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-primary" />
              <span>Section Tim</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-darkGreen">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="mt-2 text-sm text-darkGreen-300 font-body max-w-xl mx-auto">
              [Slot Komponen: <code>FAQ.tsx</code> • Accordion FAQ interaktif]
            </p>
          </div>
        </section>
      </main>

      {/* 4. Footer Component (Tanggung Jawab: Arkaan) */}
      <Footer />
    </div>
  );
}

