"use client";

import React, { useState } from "react";
import {
  ChefHat,
  Clock,
  Utensils,
  AlertTriangle,
  Sparkles,
  Check,
  Flame,
  Info,
  Scale,
  ShieldCheck,
  HeartHandshake
} from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Recipe } from "@/types";

export interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * RecipeModal Component (Robi - MPASI SMART)
 * 
 * Reusable modal dialog integrating Syahrial's accessible Modal component:
 * - Foto makanan with fallback
 * - Nama resep & subtitle tahapan usia
 * - Informasi tekstur sesuai panduan oromotorik anak
 * - Bahan-bahan lengkap dengan takaran gram/sendok
 * - Langkah pengolahan higienis langkah-demi-langkah
 * - Estimasi kandungan nutrisi (dengan transparansi ilmiah)
 * - Peringatan alergen dan disclaimer kontaminasi silang (cross-contamination)
 */
export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isOpen,
  onClose,
}) => {
  const [imageError, setImageError] = useState(false);

  if (!recipe) return null;

  const imageSource = imageError ? "/images/recipes/recipe-placeholder.svg" : recipe.image;

  // Format nutrition value or display "Belum tersedia" to respect healthcare communication guidelines
  const formatNutrition = (val?: string) => {
    if (!val || val.trim() === "" || val.toLowerCase() === "n/a") {
      return <span className="text-darkGreen-300 italic font-normal text-xs">Belum tersedia</span>;
    }
    return val;
  };

  const hasNutrition = !!recipe.nutrition;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={recipe.name}
      description={`Panduan Porsi, Takaran Bahan, dan Tekstur untuk Bayi ${recipe.ageLabel || `Usia ${recipe.ageGroup} Bulan`}`}
      maxWidth="2xl"
      ariaLabel={`Detail resep ${recipe.name}`}
      footer={
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
          <p className="text-[11px] text-darkGreen-300 flex items-center gap-1.5 order-2 sm:order-1 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
            <span>Sesuai Pedoman Gizi Seimbang WHO & Kemenkes RI</span>
          </p>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onClose}
            className="w-full sm:w-auto font-heading font-semibold order-1 sm:order-2"
          >
            Tutup Panduan Resep
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 1. Header Banner: Foto Makanan & Key Stats */}
        <div className="relative rounded-2xl bg-cream-100 border border-primary/15 overflow-hidden p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Visual Image / SVG Illustration */}
            <div className="sm:col-span-5 h-44 sm:h-40 rounded-xl bg-white border border-primary/10 overflow-hidden flex items-center justify-center p-2 shadow-xs">
              <img
                src={imageSource}
                alt={`Tampilan menu ${recipe.name}`}
                onError={() => setImageError(true)}
                className="w-full h-full object-contain rounded-lg select-none"
              />
            </div>

            {/* Quick Metadata Grid */}
            <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" size="md">
                    {recipe.ageLabel || `Usia ${recipe.ageGroup} Bulan`}
                  </Badge>
                  {recipe.isFeatured && (
                    <Badge variant="accent" size="sm">
                      Pilihan Favorit
                    </Badge>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-darkGreen-400 font-body leading-relaxed">
                  {recipe.description}
                </p>
              </div>

              {/* Stats Chips */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-primary/10 flex items-center gap-2 shadow-2xs">
                  <Clock className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-darkGreen-300 block">Waktu Masak</span>
                    <span className="font-heading font-bold text-darkGreen">{recipe.duration}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-primary/10 flex items-center gap-2 shadow-2xs">
                  <Scale className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-darkGreen-300 block">Estimasi Porsi</span>
                    <span className="font-heading font-bold text-darkGreen truncate block max-w-[120px]">
                      {recipe.portion.split("(")[0].trim()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Tekstur Sesuai Usia (Oromotor Guidance) */}
        <div className="p-4 rounded-2xl bg-secondary-50 border border-secondary/40 shadow-xs">
          <div className="flex items-center gap-2 font-heading font-bold text-xs sm:text-sm text-primary-800">
            <Utensils className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
            <span>Karakteristik Tekstur & Panduan Oromotorik:</span>
          </div>
          <p className="mt-1.5 text-xs sm:text-sm text-darkGreen-400 font-body leading-relaxed">
            {recipe.texture}
          </p>
          <div className="mt-2.5 text-[11px] text-primary-700 bg-white/80 p-2 rounded-xl border border-secondary/30 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
            <span>Porsi anjuran: {recipe.portion}</span>
          </div>
        </div>

        {/* 3. Estimasi Kandungan Nutrisi (Scientific & Honest) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-heading font-bold text-sm text-darkGreen flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Estimasi Kandungan Nutrisi (Per Porsi Makan):</span>
            </h4>
            {recipe.nutrition?.calories && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-900 bg-accent-100 px-2 py-0.5 rounded-md">
                <Flame className="w-3.5 h-3.5 text-accent-700" aria-hidden="true" />
                {recipe.nutrition.calories}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            {/* Protein */}
            <div className="p-3 rounded-xl bg-cream-50 border border-primary/15 text-center">
              <span className="text-darkGreen-300 text-[11px] block font-medium">Protein Hewani/Total</span>
              <span className="font-heading font-bold text-sm text-darkGreen mt-0.5 block">
                {hasNutrition ? formatNutrition(recipe.nutrition?.protein) : "Belum tersedia"}
              </span>
            </div>

            {/* Zat Besi (Fe) */}
            <div className="p-3 rounded-xl bg-cream-50 border border-primary/15 text-center">
              <span className="text-darkGreen-300 text-[11px] block font-medium">Zat Besi (Fe)</span>
              <span className="font-heading font-bold text-sm text-primary mt-0.5 block">
                {hasNutrition ? formatNutrition(recipe.nutrition?.iron) : "Belum tersedia"}
              </span>
            </div>

            {/* Lemak */}
            <div className="p-3 rounded-xl bg-cream-50 border border-primary/15 text-center">
              <span className="text-darkGreen-300 text-[11px] block font-medium">Lemak Tambahan</span>
              <span className="font-heading font-bold text-sm text-darkGreen mt-0.5 block">
                {hasNutrition ? formatNutrition(recipe.nutrition?.fat) : "Belum tersedia"}
              </span>
            </div>

            {/* Karbohidrat */}
            <div className="p-3 rounded-xl bg-cream-50 border border-primary/15 text-center">
              <span className="text-darkGreen-300 text-[11px] block font-medium">Karbohidrat</span>
              <span className="font-heading font-bold text-sm text-darkGreen mt-0.5 block">
                {hasNutrition ? formatNutrition(recipe.nutrition?.carbs) : "Belum tersedia"}
              </span>
            </div>
          </div>

          {/* Basis Perhitungan Transparan */}
          <p className="mt-2 text-[11px] text-darkGreen-300 italic font-body">
            * Dasar Perhitungan: {recipe.nutrition?.note || "Dihitung berdasarkan takaran bahan mentah per porsi mengacu pada Tabel Komposisi Pangan Indonesia (TKPI) Kemenkes RI."}
          </p>
        </div>

        {/* 4. Bahan-Bahan & Takaran Terukur */}
        <div>
          <h4 className="font-heading font-bold text-sm text-darkGreen mb-3 flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-primary" aria-hidden="true" />
            <span>Bahan-Bahan & Takaran Diperlukan:</span>
          </h4>
          <ul className="space-y-2 bg-cream-50/70 p-4 rounded-2xl border border-primary/10">
            {recipe.ingredients.map((ing, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-darkGreen font-body"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary mt-0.5">
                  <Check className="w-3 h-3 text-primary stroke-[3]" aria-hidden="true" />
                </span>
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 5. Langkah-Langkah Memasak Higienis */}
        <div>
          <h4 className="font-heading font-bold text-sm text-darkGreen mb-3">
            Langkah-Langkah Pengolahan Higienis:
          </h4>
          <ol className="space-y-3">
            {recipe.instructions.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-xs sm:text-sm text-darkGreen font-body"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-heading font-bold text-white mt-0.5 shadow-2xs">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* 6. Tips Ahli Nutrisi & Penyimpanan */}
        {recipe.tips && (
          <div className="p-4 rounded-2xl bg-cream-100 border border-primary/15 text-xs sm:text-sm text-darkGreen">
            <div className="flex items-center gap-1.5 font-heading font-bold text-primary mb-1">
              <HeartHandshake className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Tips Ahli Nutrisi:</span>
            </div>
            <p className="font-body text-darkGreen-400 leading-relaxed">{recipe.tips}</p>
          </div>
        )}

        {/* 7. Informasi Alergen & Peringatan Kontaminasi Silang */}
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 space-y-2">
          <div className="flex items-start gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
            <span>Informasi Alergen Makanan:</span>
          </div>

          <div className="pl-6 space-y-1">
            <p className="font-medium">
              Bahan yang teridentifikasi:{" "}
              <span className="font-bold underline decoration-amber-500">
                {recipe.allergens && recipe.allergens.length > 0
                  ? recipe.allergens.join(", ")
                  : "Tidak mengandung alergen umum prioritas"}
              </span>
            </p>
            <p className="text-[11px] leading-relaxed text-amber-800/90 font-body">
              ⚠️ <strong>Peringatan Kontaminasi Silang:</strong> Informasi di atas tidak menjamin bahwa makanan bebas 100% dari risiko kontaminasi silang pada peralatan dapur, talenan, atau fasilitas penyimpanan bahan. Terapkan prinsip pengenalan makanan baru satu per satu selama 3 hari berturut-turut untuk mendeteksi potensi reaksi alergi (seperti ruam merah, gatal, bengkak, atau diare), dan segera konsultasikan ke dokter anak jika muncul gejala reaksi alergi.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RecipeModal;
