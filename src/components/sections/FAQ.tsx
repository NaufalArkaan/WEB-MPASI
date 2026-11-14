"use client";

import React from "react";
import { HelpCircle, Sparkles, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { FAQ_DATA } from "@/data/faq";

export const FAQ: React.FC = () => {
  const accordionItems = FAQ_DATA.map((item) => ({
    id: item.id,
    title: item.question,
    category: item.category,
    content: (
      <div className="space-y-3">
        <p className="leading-relaxed text-darkGreen-400 font-body">
          {item.answer}
        </p>
      </div>
    ),
  }));

  return (
    <section
      id="faq"
      aria-label="Pertanyaan yang Sering Diajukan"
      className="border-t border-primary/10 bg-cream/70 py-16 sm:py-24 scroll-mt-24"
    >
      <div className="container-custom">
        <SectionHeading
          badge="Tanya Jawab"
          badgeIcon={<HelpCircle className="w-4 h-4" />}
          title="Pertanyaan yang Sering Diajukan (FAQ)"
          subtitle="Jawaban atas keraguan umum orang tua seputar jadwal, tekstur, porsi, dan keamanan MPASI berlandaskan pedoman WHO dan Kemenkes RI."
        />

        <div className="max-w-3xl mx-auto">
          <Accordion
            items={accordionItems}
            defaultOpenId="kapan-mulai"
            allowMultiple={false}
          />

          <div className="mt-10 p-5 rounded-2xl bg-white border border-primary/15 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center text-primary shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-darkGreen">
                  Masih punya pertanyaan seputar kondisi si kecil?
                </h4>
                <p className="text-xs text-darkGreen-300 font-body mt-0.5">
                  Konsultasikan tumbuh kembang anak secara berkala ke dokter spesialis anak atau bidan/puskesmas terdekat.
                </p>
              </div>
            </div>
            <a
              href="#references"
              className="px-4 py-2 rounded-xl bg-cream-100 text-primary hover:bg-primary hover:text-white transition-colors text-xs font-heading font-semibold shrink-0"
            >
              Lihat Rujukan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
