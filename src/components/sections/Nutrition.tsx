"use client";

import React, { useState, useMemo } from "react";
import {
  Apple,
  Bean,
  Beef,
  Carrot,
  Droplets,
  Wheat,
  Sparkles,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Info,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useScroll } from "@/hooks/useScroll";
import { NUTRITION_DATA } from "@/data/nutrition";
import { NutritionItem } from "@/types";

type NutritionCategory = "all" | "macro" | "micro";

const CATEGORY_TABS: { id: NutritionCategory; label: string; count: number }[] = [
  { id: "all", label: "Semua Nutrisi", count: 6 },
  { id: "macro", label: "Makronutrien", count: 3 },
  { id: "micro", label: "Mikronutrien Prioritas", count: 3 },
];

const ICON_MAP: Record<string, React.ElementType> = {
  Beef: Beef,
  Droplets: Droplets,
  Bean: Bean,
  Wheat: Wheat,
  Carrot: Carrot,
};

export const Nutrition: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<NutritionCategory>("all");
  const [activeNutrient, setActiveNutrient] = useState<NutritionItem | null>(null);
  const { scrollToSection } = useScroll();

  // Filter nutrient cards based on category tab
  const filteredNutrients = useMemo(() => {
    if (selectedCategory === "all") return NUTRITION_DATA;
    if (selectedCategory === "macro") {
      return NUTRITION_DATA.filter((item) =>
        ["protein", "fat", "carbs"].includes(item.id)
      );
    }
    if (selectedCategory === "micro") {
      return NUTRITION_DATA.filter((item) =>
        ["iron", "zinc", "vitamins"].includes(item.id)
      );
    }
    return NUTRITION_DATA;
  }, [selectedCategory]);

  return (
    <section
      id="nutrition"
      aria-label="Informasi nutrisi MPASI"
      className="border-t border-primary/10 bg-white py-16 sm:py-24 scroll-mt-24 relative overflow-hidden"
    >
      <div className="container-custom">
        <SectionHeading
          badge="Gizi Seimbang & Prioritas"
          badgeIcon={<Sparkles className="w-4 h-4 text-primary" />}
          title="Kenali Peran Zat Gizi di Setiap Suapan"
          subtitle="Pemberian makanan beragam memenuhi zat gizi esensial yang saling melengkapi. Utamakan pangan hewani tinggi zat besi dan seng untuk mencegah stunting sejak hari pertama MPASI."
          align="center"
        />

        {/* Interactive Category Tabs */}
        <div className="flex items-center justify-center my-8 sm:my-10">
          <div
            role="tablist"
            aria-label="Filter kategori zat gizi"
            className="flex items-center gap-1.5 p-1.5 bg-cream-50 rounded-2xl border border-primary/15 shadow-sm overflow-x-auto w-full sm:w-auto"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "bg-primary text-white shadow-soft"
                      : "text-darkGreen-400 hover:text-darkGreen hover:bg-cream-100"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-cream-200 text-darkGreen-300"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nutrients Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNutrients.map((nutrient) => {
            const Icon = (nutrient.iconName && ICON_MAP[nutrient.iconName]) || Droplets;

            return (
              <article
                key={nutrient.id}
                className="group overflow-hidden rounded-3xl border border-primary/15 bg-cream-50 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon and Food Emojis */}
                  <div className="flex items-center justify-between bg-white px-5 py-4 border-b border-primary/10">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${nutrient.color} shadow-2xs`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="flex items-center gap-1.5 text-2xl" aria-hidden="true">
                      {nutrient.foods.map((food, idx) => (
                        <span key={idx} className="transition-transform group-hover:scale-110">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-primary bg-secondary-100/80 px-2.5 py-0.5 rounded-md">
                        {nutrient.category || "Zat Gizi"}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-darkGreen group-hover:text-primary transition-colors">
                      {nutrient.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-darkGreen-300 font-body">
                      {nutrient.role}
                    </p>

                    <div className="mt-4 border-t border-primary/10 pt-4">
                      <p className="text-xs font-heading font-bold uppercase tracking-wider text-primary">
                        Pilihan Sumber Bahan:
                      </p>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-darkGreen-400 font-body">
                        {nutrient.sources}
                      </p>
                      <p className="mt-2.5 text-[11px] leading-relaxed text-darkGreen-300 font-body italic bg-white/70 p-2.5 rounded-xl border border-primary/10">
                        {nutrient.note}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Card Action Button */}
                <div className="px-5 pb-5 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconRight={<ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                    onClick={() => setActiveNutrient(nutrient)}
                    className="group-hover:bg-primary group-hover:text-white transition-all font-heading font-semibold text-xs"
                    aria-label={`Pelajari rincian zat gizi ${nutrient.name}`}
                  >
                    Pelajari Rincian & Manfaat
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Banner with Working Navigation Button to Recipe Catalog */}
        <div className="mt-10 p-5 sm:p-6 rounded-3xl bg-secondary-50/90 border border-secondary/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shrink-0 shadow-2xs border border-secondary/30 mt-0.5">
              <Apple className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-darkGreen">
                Ingin melihat contoh olahan menu padat gizi di atas?
              </h4>
              <p className="text-xs text-darkGreen-300 font-body mt-0.5">
                Katalog resep MPASI kami telah dikurasi dengan takaran seimbang antara protein hewani, zat besi, lemak, dan karbohidrat.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="primary"
            size="sm"
            iconRight={<ArrowRight className="w-4 h-4" />}
            onClick={() => scrollToSection("recipes", true)}
            className="shrink-0 font-heading font-semibold text-xs sm:text-sm w-full sm:w-auto"
          >
            Buka Katalog Resep
          </Button>
        </div>

        {/* Nutrient Detail Modal */}
        {activeNutrient && (
          <Modal
            isOpen={!!activeNutrient}
            onClose={() => setActiveNutrient(null)}
            title={`Panduan Gizi: ${activeNutrient.name}`}
            description={activeNutrient.category}
            maxWidth="lg"
            ariaLabel={`Detail zat gizi ${activeNutrient.name}`}
            footer={
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] text-darkGreen-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>WHO IYCF Guidelines (2023)</span>
                </span>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveNutrient(null)}
                  className="font-heading font-semibold"
                >
                  Tutup Rincian
                </Button>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cream-50 border border-primary/10">
                <h4 className="text-xs font-heading font-bold uppercase text-primary mb-1">
                  Peran Fisiologis bagi Tumbuh Kembang Bayi:
                </h4>
                <p className="text-xs sm:text-sm text-darkGreen-400 font-body leading-relaxed">
                  {activeNutrient.role}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-heading font-bold uppercase text-primary mb-2">
                  Bahan Makanan Sumber Alami:
                </h4>
                <div className="p-3.5 rounded-xl bg-white border border-primary/15 text-xs sm:text-sm text-darkGreen font-body leading-relaxed flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">
                    {activeNutrient.foods.join(" ")}
                  </span>
                  <span>{activeNutrient.sources}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-secondary-50/80 border border-secondary/30">
                <div className="flex items-center gap-2 text-xs font-heading font-bold text-primary-800 mb-1">
                  <Info className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Catatan Penting Nutrisi:</span>
                </div>
                <p className="text-xs sm:text-sm text-darkGreen-400 font-body leading-relaxed">
                  {activeNutrient.note}
                </p>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default Nutrition;
