"use client";

import { useState } from "react";
import { Baby, CheckCircle2, Utensils } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const stages = [
  {
    id: "6-8",
    age: "6–8 bulan",
    texture: "Mulai dengan makanan lumat kental; tingkatkan tekstur bertahap sesuai kemampuan anak.",
    frequency: "2–3 kali makan utama per hari.",
    portion: "Mulai 2–3 sendok makan tiap kali makan, tingkatkan bertahap hingga ½ mangkuk 250 ml.",
    foods: "Bubur kental atau makanan lumat dengan lauk hewani, sumber karbohidrat, serta sayur atau buah.",
    tips: [
      "Mulai dengan jumlah kecil dan tingkatkan perlahan sesuai sinyal lapar dan kenyang.",
      "Dudukkan anak tegak dan dampingi selama makan.",
      "Lanjutkan ASI sesuai kebutuhan.",
    ],
  },
  {
    id: "9-11",
    age: "9–11 bulan",
    texture: "Makanan cincang halus atau kasar; berikan makanan yang dapat dipegang bila sesuai kemampuan anak.",
    frequency: "3–4 kali makan utama per hari.",
    portion: "Sekitar ½ mangkuk 250 ml tiap kali makan.",
    foods: "Nasi tim atau makanan keluarga yang dicincang, dengan lauk hewani, sayur, dan buah bertekstur lunak.",
    tips: [
      "Naikkan tekstur secara bertahap; jangan bertahan terlalu lama pada makanan yang terlalu halus.",
      "Biarkan anak mencoba makan sendiri dengan pengawasan.",
      "Sesuaikan potongan makanan dengan kemampuan mengunyah dan menelan.",
    ],
  },
  {
    id: "12-23",
    age: "12–23 bulan",
    texture: "Makanan keluarga dengan tekstur dan potongan yang disesuaikan kemampuan makan anak.",
    frequency: "3–4 kali makan utama dan 1–2 kali makanan selingan per hari.",
    portion: "Sekitar ¾ hingga 1 mangkuk 250 ml tiap kali makan.",
    foods: "Makanan keluarga beragam; batasi garam dan gula, dan hindari potongan keras atau bulat utuh.",
    tips: [
      "Sajikan menu keluarga dengan tekstur aman dan potongan kecil yang mudah dimakan.",
      "Tetap dampingi anak dan dorong makan mandiri tanpa paksaan.",
      "Teruskan ASI hingga usia 2 tahun atau lebih.",
    ],
  },
] as const;

export default function AgeStages() {
  const [activeStage, setActiveStage] = useState<(typeof stages)[number]["id"]>("6-8");
  const stage = stages.find((item) => item.id === activeStage) ?? stages[0];

  return (
    <section
      id="stages"
      aria-label="Panduan tahapan usia MPASI"
      className="border-t border-primary/10 bg-cream/70 py-16 sm:py-24"
    >
      <div className="container-custom">
        <SectionHeading
          badge="Panduan Usia"
          title="Tekstur dan porsi bertumbuh bersama anak"
          subtitle="Pilih kelompok usia untuk melihat panduan umum. Kemampuan setiap anak berbeda; sesuaikan tekstur dengan perkembangannya."
        />

        <div
          className="mb-6 flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-soft sm:mx-auto sm:w-fit"
          role="tablist"
          aria-label="Kelompok usia MPASI"
        >
          {stages.map((item) => (
            <button
              key={item.id}
              id={`stage-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={activeStage === item.id}
              aria-controls="stage-panel"
              tabIndex={activeStage === item.id ? 0 : -1}
              onClick={() => setActiveStage(item.id)}
              onKeyDown={(event) => {
                const currentIndex = stages.findIndex((stageItem) => stageItem.id === activeStage);
                let nextIndex = currentIndex;

                if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % stages.length;
                else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + stages.length) % stages.length;
                else if (event.key === "Home") nextIndex = 0;
                else if (event.key === "End") nextIndex = stages.length - 1;
                else return;

                event.preventDefault();
                const nextStage = stages[nextIndex];
                setActiveStage(nextStage.id);
                document.getElementById(`stage-tab-${nextStage.id}`)?.focus();
              }}
              className={`shrink-0 rounded-xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-6 ${
                activeStage === item.id
                  ? "bg-primary text-white shadow-soft"
                  : "text-darkGreen-400 hover:bg-secondary-50"
              }`}
            >
              {item.age}
            </button>
          ))}
        </div>

        <div
          id="stage-panel"
          role="tabpanel"
          aria-labelledby={`stage-tab-${stage.id}`}
          tabIndex={0}
          className="rounded-3xl border border-primary/15 bg-white p-6 shadow-card sm:p-9"
        >
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Panduan tahap
              </p>
              <h3 className="mt-1 font-heading text-2xl font-bold text-darkGreen">
                Usia {stage.age}
              </h3>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-100 text-primary">
              <Baby className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {[
              ["Tekstur", stage.texture],
              ["Frekuensi", stage.frequency],
              ["Porsi", stage.portion],
              ["Contoh makanan", stage.foods],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-cream-50 p-4 sm:p-5">
                <dt className="flex items-center gap-2 font-heading text-sm font-bold text-primary">
                  <Utensils className="h-4 w-4" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-darkGreen-300">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-2xl bg-secondary-50 p-5">
            <h4 className="font-heading font-bold text-darkGreen">Tips pemberian</h4>
            <ul className="mt-3 space-y-2.5">
              {stage.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2.5 text-sm leading-relaxed text-darkGreen-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-darkGreen-300">
          Panduan frekuensi dan porsi merujuk Buku Kesehatan Ibu dan Anak Kemenkes RI (2024).
          Porsi dapat disesuaikan dengan kebutuhan dan respons anak; ASI tetap diberikan.
        </p>
      </div>
    </section>
  );
}
