import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import AboutMPASI from "@/components/sections/AboutMPASI";
import Principles from "@/components/sections/Principles";
import AgeStages from "@/components/sections/AgeStages";
import Nutrition from "@/components/sections/Nutrition";
import Recipes from "@/components/sections/Recipes";
import FoodSafety from "@/components/sections/FoodSafety";
import FAQ from "@/components/sections/FAQ";
import References from "@/components/sections/References";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar (Arkaan) */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero Section (#home - Arkaan) */}
        <Hero />

        {/* 3. About MPASI Section (#about - Arkaan) */}
        <AboutMPASI />

        {/* 4. Principles Section (#principles - Juan) */}
        <Principles />

        {/* 5. Age Stages Section (#stages - Juan) */}
        <AgeStages />

        {/* 6. Nutrition Section (#nutrition - Juan) */}
        <Nutrition />

        {/* 7. Recipes Section (#recipes - Robi) */}
        <Recipes />

        {/* 8. Food Safety Section (#safety - Juan) */}
        <FoodSafety />

        {/* 9. FAQ Section (#faq - Syahrial & Naufal) */}
        <FAQ />

        {/* 10. References Section (#references - Juan) */}
        <References />
      </main>

      {/* 11. Footer (Arkaan) */}
      <Footer />
    </div>
  );
}
