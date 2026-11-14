"use client";

import React, { useState } from "react";
import { Baby, CheckCircle2, Utensils, Clock, Scale, Sparkles, BookOpen } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { STAGES_DATA } from "@/data/stages";
import { AgeGroupId } from "@/types";

export const AgeStages: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<AgeGroupId>("6-8");
  const stage = STAGES_DATA.find((item) => item.id === activeStageId) ?? STAGES_DATA[0];

  return (
    <section
      id="stages"
      aria-label="Panduan tahapan usia MPASI"
      className="border-t border-primary/10 bg-cream/70 py-16 sm:py-24 scroll-mt-24 relative"
    >
      <div className="container-custom">
        <SectionHeading
          badge="Panduan Usia & Tahapan"
          badgeIcon={<Baby className="w-4 h-4 text-primary" />}
          title="Tekstur dan Porsi Bertumbuh Bersama Anak"
          subtitle="Pilih kelompok usia untuk melihat panduan tekstur, porsi, frekuensi, dan contoh menu sesuai tahapan oromotorik anak merujuk Buku KIA Kemenkes RI (2024) dan WHO (2023)."
          align="center"
        />

        {/* Tab Selection */}
        <div
          className="mb-8 flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-soft mx-auto w-full sm:w-fit border border-primary/15"
          role="tablist"
          aria-label="Kelompok usia MPASI"
        >
          {STAGES_DATA.map((item) => {
            const isActive = activeStageId === item.id;
            return (
              <button
                key={item.id}
                id={`stage-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`stage-panel-${item.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveStageId(item.id)}
                onKeyDown={(event) => {
                  const currentIndex = STAGES_DATA.findIndex((s) => s.id === activeStageId);
                  let nextIndex = currentIndex;

                  if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % STAGES_DATA.length;
                  else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + STAGES_DATA.length) % STAGES_DATA.length;
                  else if (event.key === "Home") nextIndex = 0;
                  else if (event.key === "End") nextIndex = STAGES_DATA.length - 1;
                  else return;

                  event.preventDefault();
                  const nextStage = STAGES_DATA[nextIndex];
                  setActiveStageId(nextStage.id);
                  document.getElementById(`stage-tab-${nextStage.id}`)?.focus();
                }}
                className={`flex-1 sm:flex-initial shrink-0 rounded-xl px-5 py-3 text-xs sm:text-sm font-heading font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "bg-primary text-white shadow-soft"
                    : "text-darkGreen-400 hover:text-darkGreen hover:bg-secondary-50"
                }`}
              >
                {item.age}
              </button>
            );
          })}
        </div>

        {/* Active Stage Panel */}
        <div
          key={stage.id}
          id={`stage-panel-${stage.id}`}
          role="tabpanel"
          aria-labelledby={`stage-tab-${stage.id}`}
          tabIndex={0}
          className="rounded-3xl border border-primary/15 bg-white p-6 sm:p-9 shadow-card animate-fade-in"
        >
          {/* Header Bar */}
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 pb-6">
            <div>
              <span className="inline-block text-xs font-heading font-bold uppercase tracking-[0.16em] text-primary">
                Tahap Perkembangan Oromotorik
              </span>
              <h3 className="mt-1 font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-darkGreen">
                Usia {stage.age}: <span className="text-primary">{stage.title || "Panduan MPASI"}</span>
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-100 text-primary shrink-0 shadow-2xs border border-secondary/30">
              <Baby className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>

          {/* 4 Core Parameters Grid */}
          <dl className="grid gap-4 sm:grid-cols-2">
            {/* 1. Tekstur Makanan */}
            <div className="rounded-2xl bg-cream-50 p-4 sm:p-5 border border-primary/10 hover:border-primary/20 transition-colors">
              <dt className="flex items-center gap-2 font-heading text-sm font-bold text-primary">
                <Utensils className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Tekstur Makanan</span>
              </dt>
              <dd className="mt-2 text-xs sm:text-sm leading-relaxed text-darkGreen-400 font-body">
                {stage.texture}
              </dd>
            </div>

            {/* 2. Frekuensi Makan */}
            <div className="rounded-2xl bg-cream-50 p-4 sm:p-5 border border-primary/10 hover:border-primary/20 transition-colors">
              <dt className="flex items-center gap-2 font-heading text-sm font-bold text-primary">
                <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Frekuensi Makan</span>
              </dt>
              <dd className="mt-2 text-xs sm:text-sm leading-relaxed text-darkGreen-400 font-body">
                {stage.frequency}
              </dd>
            </div>

            {/* 3. Porsi Makanan */}
            <div className="rounded-2xl bg-cream-50 p-4 sm:p-5 border border-primary/10 hover:border-primary/20 transition-colors">
              <dt className="flex items-center gap-2 font-heading text-sm font-bold text-primary">
                <Scale className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Porsi Tiap Kali Makan</span>
              </dt>
              <dd className="mt-2 text-xs sm:text-sm leading-relaxed text-darkGreen-400 font-body">
                {stage.portion}
              </dd>
            </div>

            {/* 4. Contoh Makanan */}
            <div className="rounded-2xl bg-cream-50 p-4 sm:p-5 border border-primary/10 hover:border-primary/20 transition-colors">
              <dt className="flex items-center gap-2 font-heading text-sm font-bold text-primary">
                <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Contoh Bahan & Variasi Menu</span>
              </dt>
              <dd className="mt-2 text-xs sm:text-sm leading-relaxed text-darkGreen-400 font-body">
                {stage.foods}
              </dd>
            </div>
          </dl>

          {/* 5. Tips & Informasi Pendukung */}
          <div className="mt-6 rounded-2xl bg-secondary-50/80 p-5 border border-secondary/30">
            <h4 className="font-heading font-bold text-sm sm:text-base text-darkGreen flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Tips Pemberian & Aturan Praktik (Feeding Rules):</span>
            </h4>
            <ul className="mt-3.5 space-y-2.5">
              {stage.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-darkGreen-400 font-body">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footnote Citation */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-darkGreen-300 font-body">
          Rujukan resmi: <strong>Buku Kesehatan Ibu dan Anak (Buku KIA) Kemenkes RI (2024)</strong> & <strong>WHO IYCF Guidelines (2023)</strong>.
          Porsi dan tekstur dapat disesuaikan bertahap sesuai kemampuan oromotorik anak; ASI tetap diteruskan sesuai permintaan.
        </p>
      </div>
    </section>
  );
};

export default AgeStages;
