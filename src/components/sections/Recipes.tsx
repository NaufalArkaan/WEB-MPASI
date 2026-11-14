"use client";

import React, { useState, useMemo } from "react";
import {
  ChefHat,
  Search,
  RotateCcw,
  Sparkles,
  BookOpen,
  Filter,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SearchInput from "@/components/ui/SearchInput";
import Button from "@/components/ui/Button";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { RecipeModal } from "@/components/recipes/RecipeModal";
import { RECIPES_DATA } from "@/data/recipes";
import { Recipe, AgeGroupId } from "@/types";

export type FilterTab = "all" | AgeGroupId;

export interface FilterOption {
  id: FilterTab;
  label: string;
  badgeLabel?: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: "all", label: "Semua Resep", badgeLabel: "Semua Usia" },
  { id: "6-8", label: "6–8 Bulan", badgeLabel: "Lumat Halus" },
  { id: "9-11", label: "9–11 Bulan", badgeLabel: "Cincang Kasar" },
  { id: "12-23", label: "12–23 Bulan", badgeLabel: "Makanan Keluarga" },
];

/**
 * Recipes Section Component (Robi - Senior Frontend Developer)
 * MPASI SMART | Recipe Catalog & Static Data Management
 * 
 * Features:
 * 1. Recipe Section container with responsive layout and theme styling
 * 2. Recipe Card grid with hover animations, soft shadows, and rounded cards
 * 3. Static recipes data sourced locally from `@/data/recipes`
 * 4. Case-insensitive search powered by Syahrial's reusable SearchInput
 * 5. Interactive local age filtering (Semua, 6–8 bulan, 9–11 bulan, 12–23 bulan)
 * 6. Recipe Detail Modal integration displaying full nutrition, textures, ingredients, and allergen warnings
 */
export const Recipes: React.FC = () => {
  // React state for category filtering & search query
  const [selectedAge, setSelectedAge] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal active item state
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  // Filter recipes based on age group and search input (case-insensitive)
  const filteredRecipes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return RECIPES_DATA.filter((recipe) => {
      // 1. Age group filter criteria
      const matchAge = selectedAge === "all" || recipe.ageGroup === selectedAge;

      // 2. Search query criteria (matches name, ingredients, or description)
      const matchQuery =
        query === "" ||
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(query));

      return matchAge && matchQuery;
    });
  }, [selectedAge, searchQuery]);

  // Reset both search and age filter
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedAge("all");
  };

  return (
    <section
      id="recipes"
      aria-label="Katalog Resep MPASI Sehat"
      className="border-t border-primary/10 bg-gradient-to-b from-cream-50 via-cream/80 to-cream-100 py-16 sm:py-24 relative overflow-hidden scroll-mt-24"
    >
      {/* Subtle Background Decorative Blur */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-secondary-200/20 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="container-custom relative">
        {/* Section Heading with Badge */}
        <SectionHeading
          badge="Katalog Menu & Resep"
          badgeIcon={<ChefHat className="w-4 h-4 text-primary" />}
          title="Inspirasi Resep MPASI Padat Gizi"
          subtitle="Menu sehat, lezat, dan teruji berdasarkan prinsip gizi seimbang WHO dan Buku KIA Kemenkes RI. Disesuaikan dengan tahapan tekstur si kecil."
          align="center"
        />

        {/* Filter Tabs & Search Bar Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 sm:gap-6 mt-10 mb-8 sm:mb-10">
          {/* Age Group Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter Resep berdasarkan Kelompok Usia"
            className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-primary/20 shadow-soft overflow-x-auto scrollbar-none w-full lg:w-auto"
          >
            {FILTER_OPTIONS.map((tab) => {
              const isActive = selectedAge === tab.id;
              const count =
                tab.id === "all"
                  ? RECIPES_DATA.length
                  : RECIPES_DATA.filter((r) => r.ageGroup === tab.id).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedAge(tab.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-heading font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "bg-primary text-white shadow-soft"
                      : "text-darkGreen-400 hover:text-darkGreen hover:bg-cream-100"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-cream-200 text-darkGreen-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input using Syahrial's Reusable SearchInput */}
          <div className="w-full lg:w-80 shrink-0">
            <SearchInput
              id="recipe-search-input"
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
              placeholder="Cari resep, ayam, salmon, alpukat..."
              ariaLabel="Pencarian menu resep MPASI"
              size="md"
              className="w-full"
            />
          </div>
        </div>

        {/* Search & Filter Status Feedback */}
        {(searchQuery.trim() !== "" || selectedAge !== "all") && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-4 py-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-primary/10 text-xs text-darkGreen-400">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span>
                Menampilkan <strong>{filteredRecipes.length}</strong> resep
                {selectedAge !== "all" && (
                  <span>
                    {" "}pada kelompok usia <strong>{FILTER_OPTIONS.find((t) => t.id === selectedAge)?.label}</strong>
                  </span>
                )}
                {searchQuery.trim() !== "" && (
                  <span>
                    {" "}dengan kata kunci &ldquo;<strong>{searchQuery}</strong>&rdquo;
                  </span>
                )}
              </span>
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 font-heading font-semibold text-primary hover:text-primary-700 transition-colors focus:outline-none focus-visible:underline"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              <span>Reset Filter</span>
            </button>
          </div>
        )}

        {/* Recipe Cards Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={(selected) => setActiveRecipe(selected)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="p-10 sm:p-14 text-center bg-white rounded-3xl border border-primary/15 shadow-soft max-w-lg mx-auto my-6 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cream-100 text-primary flex items-center justify-center mb-4 border border-primary/15">
              <ChefHat className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-darkGreen">
              Resep Tidak Ditemukan
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-darkGreen-300 font-body leading-relaxed max-w-sm mx-auto">
              Tidak ada resep yang sesuai dengan kata kunci &ldquo;{searchQuery}&rdquo;
              {selectedAge !== "all" ? ` pada filter kategori usia ${selectedAge} bulan.` : "."}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                type="button"
                variant="primary"
                size="sm"
                iconLeft={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={handleResetFilters}
                className="font-heading font-semibold"
              >
                Reset Filter & Pencarian
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Educational Quality Banner */}
        <div className="mt-14 p-5 sm:p-6 rounded-3xl bg-secondary-50/70 border border-secondary/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-2xs shrink-0 border border-secondary/30">
              <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-darkGreen">
                Standar Keamanan Pangan & Higienitas Terjamin
              </h4>
              <p className="text-[11px] sm:text-xs text-darkGreen-300 font-body">
                Pastikan peralatan makan, saringan kawat, dan talenan dicuci bersih dengan air mengalir untuk mencegah kontaminasi silang.
              </p>
            </div>
          </div>
          <a
            href="#safety"
            className="text-xs font-heading font-bold text-primary hover:text-primary-700 underline underline-offset-4 shrink-0 transition-colors"
          >
            Pelajari Keamanan Pangan &rarr;
          </a>
        </div>

        {/* Recipe Detail Modal Integration */}
        <RecipeModal
          recipe={activeRecipe}
          isOpen={!!activeRecipe}
          onClose={() => setActiveRecipe(null)}
        />
      </div>
    </section>
  );
};

export default Recipes;
