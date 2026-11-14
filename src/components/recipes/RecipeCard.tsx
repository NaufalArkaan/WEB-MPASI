"use client";

import React, { useState } from "react";
import { Clock, Utensils, ChevronRight, Flame, ShieldAlert } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Recipe } from "@/types";

export interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  className?: string;
}

/**
 * RecipeCard Component (Robi - MPASI SMART)
 * 
 * Displays an individual recipe preview within the catalog:
 * - Foto makanan (SVG / Image with fallback)
 * - Badges: Kelompok usia & Durasi masak
 * - Nama resep (2-line consistent min-height to prevent uneven card heights)
 * - Deskripsi singkat
 * - Preview Tekstur oromotorik
 * - Indikator Alergen
 * - Tombol aksi "Lihat Resep" (accessible trigger for RecipeModal)
 */
export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelect,
  className,
}) => {
  const [imageError, setImageError] = useState(false);

  // Fallback image in case of loading error
  const imageSource = imageError ? "/images/recipes/recipe-placeholder.svg" : recipe.image;

  return (
    <Card
      variant="default"
      padding="none"
      rounded="3xl"
      className={`group flex flex-col h-full bg-white border border-primary/15 hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${
        className || ""
      }`}
    >
      {/* 1. Foto Makanan Container */}
      <div className="relative h-44 sm:h-48 w-full bg-gradient-to-br from-cream-100 to-secondary-50/40 overflow-hidden border-b border-primary/10 flex items-center justify-center">
        {/* Actual Image / Pure Vector Illustration */}
        <div className="w-full h-full p-2.5 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <img
            src={imageSource}
            alt={`Ilustrasi menu ${recipe.name}`}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain rounded-2xl select-none"
          />
        </div>

        {/* Floating Top Chips: Age Group & Duration */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
          <Badge
            variant="secondary"
            size="md"
            className="shadow-xs backdrop-blur-md bg-white/95 font-heading font-bold text-xs text-primary border border-primary/20 shrink-0"
          >
            {recipe.ageLabel || `Usia ${recipe.ageGroup} Bulan`}
          </Badge>

          <div className="flex items-center gap-1.5 text-xs font-heading font-semibold text-darkGreen bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-primary/15 shrink-0">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
            <span>{recipe.duration}</span>
          </div>
        </div>

        {/* Floating Bottom Nutritional Chip (if calories available) */}
        {recipe.nutrition?.calories && (
          <div className="absolute bottom-2.5 right-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 text-[11px] font-heading font-bold bg-accent-100/95 text-accent-900 border border-accent/40 px-2.5 py-0.5 rounded-lg shadow-2xs backdrop-blur-xs">
              <Flame className="w-3 h-3 text-accent-700" aria-hidden="true" />
              <span>{recipe.nutrition.calories}</span>
            </span>
          </div>
        )}
      </div>

      {/* 2. Card Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Recipe Name - min-height ensures uniform card height */}
          <h3 className="font-heading font-bold text-base sm:text-lg text-darkGreen group-hover:text-primary transition-colors leading-snug line-clamp-2 min-h-[2.75rem] flex items-center">
            {recipe.name}
          </h3>

          {/* Short Description */}
          <p className="mt-2 text-xs sm:text-sm text-darkGreen-300 font-body line-clamp-2 min-h-[2.5rem] leading-relaxed">
            {recipe.description}
          </p>

          {/* Texture Specification Pill */}
          <div className="mt-3.5 pt-3 border-t border-primary/10 flex items-start gap-2 text-xs">
            <span className="font-heading font-bold text-primary shrink-0 flex items-center gap-1">
              <Utensils className="w-3 h-3 text-primary" aria-hidden="true" />
              <span>Tekstur:</span>
            </span>
            <span className="text-darkGreen-400 font-body line-clamp-1">
              {recipe.texture}
            </span>
          </div>

          {/* Allergens Notice Preview */}
          {recipe.allergens && recipe.allergens.length > 0 && recipe.allergens[0] !== "Tidak mengandung alergen umum prioritas" ? (
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50/80 border border-amber-200/70 px-2.5 py-1 rounded-lg">
              <ShieldAlert className="w-3 h-3 text-amber-700 shrink-0" aria-hidden="true" />
              <span className="truncate">Alergen: {recipe.allergens.join(", ")}</span>
            </div>
          ) : (
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-primary-700 bg-secondary-50/80 border border-secondary/40 px-2.5 py-1 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="truncate">Bahan ramah cerna bayi</span>
            </div>
          )}
        </div>

        {/* 3. Card Footer Action Button */}
        <div className="mt-5 pt-3.5 border-t border-primary/10">
          <Button
            type="button"
            variant="outline"
            size="sm"
            fullWidth
            iconRight={<ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            onClick={() => onSelect(recipe)}
            className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-200 font-heading font-semibold text-xs sm:text-sm py-2.5"
            aria-label={`Lihat resep lengkap dan takaran ${recipe.name}`}
          >
            Lihat Resep
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RecipeCard;
