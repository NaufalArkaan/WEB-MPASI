"use client";

import React, { useState, useMemo } from "react";
import { 
  ChefHat, 
  Clock, 
  Utensils, 
  AlertCircle, 
  Sparkles, 
  Check, 
  Flame, 
  Heart,
  ChevronRight,
  Info
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SearchBar from "@/components/ui/SearchBar";
import Modal from "@/components/ui/Modal";
import { RECIPES_DATA } from "@/data/recipes";
import { Recipe, AgeGroupId } from "@/types";

type FilterTab = "all" | AgeGroupId;

const FILTER_OPTIONS: { id: FilterTab; label: string; countSuffix?: string }[] = [
  { id: "all", label: "Semua Resep" },
  { id: "6-8", label: "6–8 Bulan" },
  { id: "9-11", label: "9–11 Bulan" },
  { id: "12-23", label: "12–23 Bulan" },
];

export const Recipes: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  // Filter recipes based on age group and search term
  const filteredRecipes = useMemo(() => {
    return RECIPES_DATA.filter((recipe) => {
      const matchAge = selectedAge === "all" || recipe.ageGroup === selectedAge;
      const matchQuery =
        searchQuery.trim() === "" ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchAge && matchQuery;
    });
  }, [selectedAge, searchQuery]);

  return (
    <section
      id="recipes"
      aria-label="Inspirasi Resep MPASI Sehat"
      className="border-t border-primary/10 bg-cream/70 py-16 sm:py-24"
    >
      <div className="container-custom">
        <SectionHeading
          badge="Katalog Menu"
          badgeIcon={<ChefHat className="w-4 h-4" />}
          title="Inspirasi Resep MPASI Padat Gizi"
          subtitle="Menu sehat, lezat, dan teruji berdasarkan prinsip gizi seimbang WHO dan Buku KIA Kemenkes RI. Disesuaikan dengan tahapan tekstur si kecil."
        />

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Age Group Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter Resep berdasarkan Usia"
            className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-primary/15 shadow-sm overflow-x-auto w-full md:w-auto"
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
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
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
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery("")}
            placeholder="Cari menu, ayam, salmon, brokoli..."
            className="w-full md:w-72 lg:w-80"
          />
        </div>

        {/* Recipe Cards Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                variant="default"
                padding="none"
                rounded="3xl"
                className="group flex flex-col h-full bg-white border border-primary/15 hover:border-primary/30 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Decorative Visual Header */}
                <div className="relative h-44 bg-gradient-to-br from-cream via-cream-100 to-secondary-50 p-6 flex flex-col justify-between overflow-hidden border-b border-primary/10">
                  <div className="flex items-center justify-between z-10">
                    <Badge variant="secondary" size="md">
                      Usia {recipe.ageLabel}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs font-heading font-medium text-darkGreen-300 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-primary/10">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{recipe.duration}</span>
                    </div>
                  </div>

                  {/* Decorative Icon Pattern */}
                  <div className="flex items-center justify-center my-auto z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-soft flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 border border-primary/15">
                      <Utensils className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-darkGreen-300 z-10">
                    <span className="font-heading font-semibold text-primary truncate max-w-[200px]">
                      {recipe.portion}
                    </span>
                    {recipe.nutrition?.calories && (
                      <span className="inline-flex items-center gap-1 font-body font-medium bg-accent-100/80 text-accent-900 px-2 py-0.5 rounded-md">
                        <Flame className="w-3 h-3 text-accent-700" />
                        {recipe.nutrition.calories}
                      </span>
                    )}
                  </div>

                  {/* Subtle background circles */}
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                </div>

                {/* Recipe Content Body */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-darkGreen group-hover:text-primary transition-colors leading-snug">
                      {recipe.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-darkGreen-300 font-body line-clamp-2 leading-relaxed">
                      {recipe.description}
                    </p>

                    {/* Texture Spec Pill */}
                    <div className="mt-4 pt-3.5 border-t border-primary/10 flex items-start gap-2 text-xs text-darkGreen-400">
                      <span className="font-bold text-primary shrink-0">Tekstur:</span>
                      <span className="text-darkGreen-300 font-body">{recipe.texture}</span>
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="mt-6 pt-4 border-t border-primary/10">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconRight={<ChevronRight className="w-4 h-4" />}
                      onClick={() => setActiveRecipe(recipe)}
                      className="group-hover:bg-primary group-hover:text-white transition-all font-semibold"
                    >
                      Lihat Resep & Takaran
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-primary/15 shadow-sm max-w-md mx-auto">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cream-200 text-darkGreen-300 flex items-center justify-center mb-4">
              <ChefHat className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-lg text-darkGreen">
              Resep Tidak Ditemukan
            </h3>
            <p className="mt-2 text-sm text-darkGreen-300 font-body">
              Tidak ada resep yang sesuai dengan kata kunci &quot;{searchQuery}&quot; pada kategori usia terpilih.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedAge("all");
              }}
              className="mt-5"
            >
              Reset Filter & Pencarian
            </Button>
          </div>
        )}

        {/* Recipe Detail Modal */}
        {activeRecipe && (
          <Modal
            isOpen={!!activeRecipe}
            onClose={() => setActiveRecipe(null)}
            title={activeRecipe.name}
            description={`Panduan Takaran & Cara Pengolahan untuk Bayi Usia ${activeRecipe.ageLabel}`}
            maxWidth="xl"
          >
            <div className="space-y-6">
              {/* Meta stats chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-2xl bg-cream-50 border border-primary/10 text-center">
                  <span className="text-[10px] uppercase font-bold text-darkGreen-300 block">
                    Kelompok Usia
                  </span>
                  <span className="font-heading font-bold text-xs sm:text-sm text-primary">
                    {activeRecipe.ageLabel}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-cream-50 border border-primary/10 text-center">
                  <span className="text-[10px] uppercase font-bold text-darkGreen-300 block">
                    Waktu Masak
                  </span>
                  <span className="font-heading font-bold text-xs sm:text-sm text-primary">
                    {activeRecipe.duration}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-cream-50 border border-primary/10 text-center">
                  <span className="text-[10px] uppercase font-bold text-darkGreen-300 block">
                    Estimasi Porsi
                  </span>
                  <span className="font-heading font-bold text-xs sm:text-sm text-primary">
                    {activeRecipe.portion.split("(")[0].trim()}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-cream-50 border border-primary/10 text-center">
                  <span className="text-[10px] uppercase font-bold text-darkGreen-300 block">
                    Kepadatan Energi
                  </span>
                  <span className="font-heading font-bold text-xs sm:text-sm text-accent-800">
                    {activeRecipe.nutrition?.calories || "Padat Gizi"}
                  </span>
                </div>
              </div>

              {/* Texture guidance box */}
              <div className="p-4 rounded-2xl bg-secondary-50/80 border border-secondary/30">
                <div className="flex items-center gap-2 font-heading font-bold text-xs text-primary-800">
                  <Utensils className="w-4 h-4 text-primary" />
                  <span>Karakteristik Tekstur:</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-darkGreen-400 font-body leading-relaxed">
                  {activeRecipe.texture}
                </p>
              </div>

              {/* Nutrition Facts table */}
              {activeRecipe.nutrition && (
                <div>
                  <h4 className="font-heading font-bold text-sm text-darkGreen flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Perkiraan Kandungan Gizi (Per Porsi Makan):</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-primary/15 text-center">
                      <span className="text-darkGreen-300 block">Protein</span>
                      <span className="font-heading font-bold text-darkGreen">
                        {activeRecipe.nutrition.protein}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-primary/15 text-center">
                      <span className="text-darkGreen-300 block">Zat Besi (Fe)</span>
                      <span className="font-heading font-bold text-primary">
                        {activeRecipe.nutrition.iron}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-primary/15 text-center">
                      <span className="text-darkGreen-300 block">Lemak Tambahan</span>
                      <span className="font-heading font-bold text-darkGreen">
                        {activeRecipe.nutrition.fat}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-primary/15 text-center">
                      <span className="text-darkGreen-300 block">Karbohidrat</span>
                      <span className="font-heading font-bold text-darkGreen">
                        {activeRecipe.nutrition.carbs}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Ingredients list */}
              <div>
                <h4 className="font-heading font-bold text-sm text-darkGreen mb-3">
                  Bahan-Bahan Diperlukan:
                </h4>
                <ul className="space-y-2">
                  {activeRecipe.ingredients.map((ing, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-darkGreen-400 font-body"
                    >
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions list */}
              <div>
                <h4 className="font-heading font-bold text-sm text-darkGreen mb-3">
                  Langkah-Langkah Pengolahan:
                </h4>
                <ol className="space-y-3">
                  {activeRecipe.instructions.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-darkGreen-400 font-body"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Chef tips */}
              {activeRecipe.tips && (
                <div className="p-4 rounded-2xl bg-cream-100 border border-primary/10 text-xs sm:text-sm text-darkGreen-400">
                  <span className="font-heading font-bold text-primary block mb-1">
                    Tips Ahli Nutrisi:
                  </span>
                  <span>{activeRecipe.tips}</span>
                </div>
              )}

              {/* Allergens warning */}
              {activeRecipe.allergens.length > 0 && (
                <div className="flex items-start gap-2 p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Potensi Alergen: </span>
                    <span>{activeRecipe.allergens.join(", ")}. Pastikan bahan telah dikenalkan bertahap.</span>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default Recipes;
