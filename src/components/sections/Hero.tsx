"use client";

import React from "react";
import { 
  ArrowRight, 
  ChefHat, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  Baby, 
  UtensilsCrossed, 
  Scale
} from "lucide-react";
import Button from "@/components/ui/Button";

export const Hero: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const header = document.querySelector("header");
      const navOffset = (header ? header.offsetHeight : 84) + 10;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });

      if (window.location.hash !== `#${targetId}`) {
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  return (
    <section
      id="home"
      className="relative pt-6 pb-16 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28 overflow-hidden bg-gradient-to-b from-cream via-cream to-cream-100 scroll-mt-24"
    >
      {/* Decorative ambient background orbs */}
      <div 
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] sm:w-[900px] sm:h-[450px] bg-secondary-200/40 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-48 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-accent-200/30 rounded-full blur-2xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 left-10 w-80 h-80 bg-primary-100/40 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-primary/20 text-darkGreen shadow-soft mb-5">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
              <span className="text-xs sm:text-sm font-heading font-medium text-primary-700">
                Panduan Resmi MPASI 6–23 Bulan
              </span>
              <span className="text-darkGreen-200 text-xs">•</span>
              <span className="text-[11px] sm:text-xs font-body font-medium text-darkGreen-300">
                Standar WHO & Kemenkes 2024
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-heading font-bold text-darkGreen leading-[1.18] tracking-tight">
              Awali Perjalanan MPASI Si Kecil dengan{" "}
              <span className="relative inline-block text-primary">
                Nutrisi Terbaik.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-accent fill-current -z-10 opacity-70"
                  viewBox="0 0 250 12"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M0,7 C75,12 175,-3 250,7 L250,12 L0,12 Z" />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-darkGreen-300 font-body leading-relaxed max-w-xl">
              Temukan panduan, inspirasi menu, dan informasi nutrisi MPASI berdasarkan referensi kesehatan terpercaya untuk mendukung tumbuh kembang si kecil.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Button
                href="#stages"
                variant="primary"
                size="lg"
                iconRight={<ArrowRight className="w-5 h-5" />}
                onClick={(e) => handleScrollTo(e as unknown as React.MouseEvent<HTMLAnchorElement>, "stages")}
                className="w-full sm:w-auto text-center font-semibold"
              >
                Jelajahi Panduan
              </Button>

              <Button
                href="#recipes"
                variant="outline"
                size="lg"
                iconLeft={<ChefHat className="w-5 h-5" />}
                onClick={(e) => handleScrollTo(e as unknown as React.MouseEvent<HTMLAnchorElement>, "recipes")}
                className="w-full sm:w-auto text-center bg-white/60 hover:bg-white"
              >
                Lihat Resep
              </Button>
            </div>

            {/* Trust and Social Proof Badges */}
            <div className="mt-10 pt-6 border-t border-primary/15 w-full flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-darkGreen-300 font-body">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Buku KIA Kemenkes RI 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>WHO Guideline 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Bebas Gula Garam Berlebih</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-4 lg:mt-0">
            {/* Visual Canvas Container */}
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-square rounded-[36px] bg-gradient-to-tr from-secondary-100 via-white to-cream-200 border-2 border-primary/15 shadow-soft-lg p-5 flex items-center justify-center">
              {/* Background decorative patterns */}
              <div className="absolute inset-4 rounded-[28px] border border-dashed border-primary/20 pointer-events-none" />

              {/* Main SVG Composition of Nutritious MPASI Bowl */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                <svg
                  viewBox="0 0 360 360"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full max-w-[320px] sm:max-w-[340px] drop-shadow-md select-none"
                  aria-label="Ilustrasi Makanan Sehat MPASI Kaya Nutrisi"
                  role="img"
                >
                  {/* Outer Placemat */}
                  <circle cx="180" cy="180" r="160" fill="#FAF8F1" stroke="#A9C4A8" strokeWidth="2" strokeDasharray="6 6" />

                  {/* Main Ceramic Bowl */}
                  <circle cx="180" cy="185" r="125" fill="#52765B" fillOpacity="0.1" />
                  <ellipse cx="180" cy="180" rx="120" ry="115" fill="#FFFFFF" stroke="#52765B" strokeWidth="4" />
                  
                  {/* Puree Background (Creamy Pumpkin / Sweet Potato Puree) */}
                  <ellipse cx="180" cy="180" rx="104" ry="100" fill="#E8B88D" fillOpacity="0.85" />
                  <ellipse cx="180" cy="178" rx="98" ry="94" fill="#E8B88D" />

                  {/* Puree Swirl Texture */}
                  <path d="M130 160 C 150 140, 200 145, 220 170 C 235 190, 210 220, 180 215 C 160 210, 150 190, 165 180" stroke="#FAF8F1" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6" />

                  {/* Protein: Steamed Salmon / Chicken chunks */}
                  <g transform="translate(130, 140)">
                    <rect x="0" y="0" width="38" height="26" rx="8" fill="#F08A5D" />
                    <line x1="8" y1="4" x2="8" y2="22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    <line x1="18" y1="4" x2="18" y2="22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    <line x1="28" y1="4" x2="28" y2="22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                  </g>

                  {/* Micronutrient: Steamed Broccoli Florets */}
                  <g transform="translate(195, 135)">
                    <circle cx="14" cy="12" r="12" fill="#43624B" />
                    <circle cx="26" cy="16" r="11" fill="#52765B" />
                    <circle cx="18" cy="24" r="10" fill="#354F3C" />
                    <path d="M18 28 L18 36" stroke="#A9C4A8" strokeWidth="4" strokeLinecap="round" />
                  </g>

                  {/* Healthy Fats: Sliced Fresh Avocado */}
                  <g transform="translate(145, 195)">
                    <path d="M0 20 C 0 8, 14 0, 28 0 C 42 0, 56 8, 56 20 C 56 30, 42 38, 28 38 C 14 38, 0 30, 0 20 Z" fill="#93B874" />
                    <ellipse cx="28" cy="19" rx="14" ry="12" fill="#D3E59B" />
                    <circle cx="28" cy="19" r="6" fill="#805B3A" />
                  </g>

                  {/* Hardboiled Egg Slice */}
                  <g transform="translate(200, 190)">
                    <ellipse cx="18" cy="18" rx="18" ry="16" fill="#FFFFFF" stroke="#E3ECE5" strokeWidth="2" />
                    <circle cx="18" cy="18" r="9" fill="#F4B042" />
                  </g>

                  {/* Ergonomic Silicone Baby Spoon */}
                  <g transform="translate(260, 80) rotate(35)">
                    <rect x="0" y="30" width="14" height="90" rx="7" fill="#52765B" />
                    <path d="M-5 35 C-5 12, 19 12, 19 35 C 19 46, -5 46, -5 35 Z" fill="#52765B" />
                    <circle cx="7" cy="105" r="4" fill="#FFFFFF" opacity="0.6" />
                  </g>
                </svg>
              </div>

              {/* Floating Badge 1: Top Left - Pedoman WHO */}
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-6 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-primary/20 shadow-soft-md flex items-center gap-2.5 animate-float">
                <div className="w-8 h-8 rounded-xl bg-primary-100 flex items-center justify-center text-primary-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-darkGreen-300 tracking-wider">Standar Medis</p>
                  <p className="text-xs sm:text-sm font-heading font-bold text-darkGreen">WHO Guideline 2023</p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Right - Tekstur Sesuai Usia */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-primary/20 shadow-soft-md flex items-center gap-3 animate-float-delayed">
                <div className="w-9 h-9 rounded-xl bg-accent-100 flex items-center justify-center text-accent-700">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-darkGreen-300 tracking-wider">Tekstur Bertahap</p>
                  <p className="text-xs sm:text-sm font-heading font-bold text-darkGreen">6–8 • 9–11 • 12–23 Bln</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Banner / Value Proposition Strip */}
        <div className="mt-14 sm:mt-18 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {/* Card 1 */}
            <div className="bg-white/80 backdrop-blur-sm border border-primary/15 rounded-2xl p-4 sm:p-5 shadow-soft hover:shadow-soft-md transition-all">
              <div className="w-8 h-8 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-3">
                <Baby className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-darkGreen">Tepat Waktu</h3>
              <p className="text-xs text-darkGreen-300 font-body mt-1 leading-relaxed">
                Dimulai tepat pada usia 6 bulan saat saluran cerna siap.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/80 backdrop-blur-sm border border-primary/15 rounded-2xl p-4 sm:p-5 shadow-soft hover:shadow-soft-md transition-all">
              <div className="w-8 h-8 rounded-xl bg-secondary-100 text-primary-800 flex items-center justify-center mb-3">
                <Scale className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-darkGreen">Gizi Adekuat</h3>
              <p className="text-xs text-darkGreen-300 font-body mt-1 leading-relaxed">
                Kaya protein hewani dan zat besi cegah anemia serta stunting.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/80 backdrop-blur-sm border border-primary/15 rounded-2xl p-4 sm:p-5 shadow-soft hover:shadow-soft-md transition-all">
              <div className="w-8 h-8 rounded-xl bg-accent-100 text-accent-800 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-darkGreen">Aman & Higienis</h3>
              <p className="text-xs text-darkGreen-300 font-body mt-1 leading-relaxed">
                Proses penyiapan bersih bebas kontaminasi kuman patogen.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/80 backdrop-blur-sm border border-primary/15 rounded-2xl p-4 sm:p-5 shadow-soft hover:shadow-soft-md transition-all">
              <div className="w-8 h-8 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-3">
                <Heart className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-darkGreen">Responsive Feeding</h3>
              <p className="text-xs text-darkGreen-300 font-body mt-1 leading-relaxed">
                Peka mengenali tanda lapar dan kenyang tanpa paksaan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

