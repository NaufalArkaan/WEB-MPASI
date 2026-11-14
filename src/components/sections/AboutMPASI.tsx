"use client";

import React, { useState } from "react";
import { 
  HeartHandshake, 
  Baby, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  Utensils, 
  BookOpen, 
  Flame, 
  Brain,
  ChevronRight,
  Info
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface AboutTopic {
  id: string;
  tabTitle: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlights: {
    label: string;
    text: string;
  }[];
  citation: string;
}

const ABOUT_TOPICS: AboutTopic[] = [
  {
    id: "pengertian",
    tabTitle: "Pengertian MPASI",
    badge: "Definisi Resmi",
    title: "Apa Itu Makanan Pendamping ASI (MPASI)?",
    description:
      "MPASI adalah makanan padat atau cair bergizi yang diberikan secara bertahap kepada bayi ketika Air Susu Ibu (ASI) saja tidak lagi mencukupi seluruh kebutuhan energi dan mikronutrien tubuhnya.",
    icon: <Utensils className="w-5 h-5" />,
    highlights: [
      {
        label: "Bukan Pengganti ASI",
        text: "MPASI berfungsi mendampingi ASI, bukan menggantikannya. ASI tetap merupakan sumber cairan dan antibodi utama.",
      },
      {
        label: "Menutup 'Energy Gap'",
        text: "Setelah usia 6 bulan, kebutuhan energi bayi melonjak pesat sehingga terjadi defisit kalori (energy gap) yang wajib dipenuhi dari makanan.",
      },
      {
        label: "Sumber Zat Besi (Iron Store)",
        text: "Cadangan zat besi bawaan lahir bayi mulai habis pada usia 6 bulan. MPASI kaya zat besi wajib diberikan segera.",
      },
    ],
    citation: "WHO Guideline (2023) & Buku KIA Kemenkes RI (2024)",
  },
  {
    id: "urgensi",
    tabTitle: "Mengapa Sangat Penting?",
    badge: "Urgensi Kesehatan",
    title: "Mengapa Periode MPASI Sangat Krusial?",
    description:
      "Usia 6–23 bulan adalah bagian dari 1000 Hari Pertama Kehidupan (1000 HPK). Kualitas asupan MPASI menentukan kapasitas kognitif, tinggi badan maksimal, dan imunitas seumur hidup.",
    icon: <Brain className="w-5 h-5" />,
    highlights: [
      {
        label: "Pencegahan Stunting Linier",
        text: "Mayoritas kasus stunting di Indonesia terjadi pada masa MPASI akibat kekurangan protein hewani dan frekuensi makan yang tidak adekuat.",
      },
      {
        label: "Perkembangan Otak (Neurodevelopment)",
        text: "80% volume otak manusia berkembang pada 2 tahun pertama. Asupan zat besi, asam lemak esensial, dan zinc krusial untuk sinaps saraf.",
      },
      {
        label: "Pencegahan Anemia Defisiensi Besi",
        text: "Anemia pada bayi di bawah 2 tahun dapat menyebabkan penurunan daya ingat dan gangguan konsentrasi permanen.",
      },
    ],
    citation: "WHO Guideline (2023) Section 2 & Kemenkes RI",
  },
  {
    id: "kapan",
    tabTitle: "Kapan Mulai Diberikan?",
    badge: "Waktu Pemberian",
    title: "Kapan Bayi Mulai Diberikan MPASI?",
    description:
      "MPASI wajib dimulai tepat saat bayi berusia genap 6 bulan (180 hari). Pemberian sebelum 6 bulan (dini) maupun terlambat (di atas 6 bulan) berisiko tinggi bagi kesehatan bayi.",
    icon: <Clock className="w-5 h-5" />,
    highlights: [
      {
        label: "Kematangan Saluran Pencernaan",
        text: "Enzim pencernaan dan dinding usus bayi baru siap mengolah protein dan karbohidrat kompleks secara aman pada usia 6 bulan.",
      },
      {
        label: "Bahaya MPASI Terlalu Dini",
        text: "Meningkatkan risiko infeksi diare, alergi makanan, obesitas, dan penurunan produksi ASI ibu secara drastis.",
      },
      {
        label: "Bahaya MPASI Terlambat",
        text: "Menyebabkan berat badan seret (faltering growth), anemia berat, defisiensi mikronutrien, dan penolakan makanan padat.",
      },
    ],
    citation: "Buku KIA Kemenkes RI (2024) Halaman 45-48",
  },
  {
    id: "peran-asi",
    tabTitle: "Peran ASI Selama MPASI",
    badge: "Kelanjutan ASI",
    title: "ASI Tetap Berlanjut Hingga Usia 2 Tahun",
    description:
      "Memulai MPASI bukan berarti menyapih. ASI tetap menjadi sumber nutrisi, cairan, asam lemak esensial, dan perlindungan imunologik yang tak tergantikan bagi anak.",
    icon: <HeartHandshake className="w-5 h-5" />,
    highlights: [
      {
        label: "Usia 6–8 Bulan",
        text: "ASI masih mencukupi sekitar 70% kebutuhan energi harian bayi, sementara 30% lainnya dipenuhi dari MPASI.",
      },
      {
        label: "Usia 9–11 Bulan",
        text: "ASI menyuplai sekitar 50% kebutuhan kalori harian, seiring bertambahnya porsi dan frekuensi makan anak.",
      },
      {
        label: "Usia 12–23 Bulan",
        text: "ASI tetap menyediakan sekitar 30–35% energi harian serta antibodi aktif yang melindungi dari penyakit menular.",
      },
    ],
    citation: "WHO Guideline for Complementary Feeding (2023)",
  },
  {
    id: "perkembangan",
    tabTitle: "Sesuai Perkembangan",
    badge: "Milestones Oromotorik",
    title: "Pemberian Sesuai Tahap Perkembangan Bayi",
    description:
      "Tekstur makanan harus dinaikkan secara bertahap mengikuti perkembangan oromotorik (otot rongga mulut) agar bayi mahir mengunyah dan tidak menolak makanan kasar.",
    icon: <Baby className="w-5 h-5" />,
    highlights: [
      {
        label: "Stimulasi Bicara (Speech Development)",
        text: "Gerakan mengunyah dan memindahkan makanan di dalam mulut melatih otot bibir dan lidah yang sama yang digunakan untuk berbicara.",
      },
      {
        label: "Mencegah GTM & Picky Eater",
        text: "Keterlambatan mengenalkan tekstur kasar di atas 9 bulan sering menjadi penyebab utama anak menolak makanan (Gerakan Tutup Mulut).",
      },
      {
        label: "Kemandirian (Self-Feeding)",
        text: "Mengenalkan finger foods lembut melatih koordinasi tangan-mata (fine motor skills) dan rasa percaya diri anak.",
      },
    ],
    citation: "Petunjuk Teknis Pemantauan MPASI Kemenkes RI (2024)",
  },
];

const READINESS_SIGNS = [
  {
    title: "Duduk Tegak Mandiri",
    desc: "Mampu menegakkan leher dan duduk dengan sedikit atau tanpa bantuan untuk mencegah tersedak.",
  },
  {
    title: "Refleks Menjulurkan Lidah Hilang",
    desc: "Refleks ekstrusi (dorongan lidah) berkurang sehingga makanan tidak otomatis didorong keluar mulut.",
  },
  {
    title: "Membuka Mulut Antusias",
    desc: "Membuka mulut sukarela saat didekati sendok dan condong ke depan saat melihat makanan.",
  },
  {
    title: "Koordinasi Mata & Tangan",
    desc: "Tertarik melihat orang makan, mencoba meraih makanan, dan memasukkan benda ke dalam mulut.",
  },
];

export const AboutMPASI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("pengertian");
  const currentTopic = ABOUT_TOPICS.find((t) => t.id === activeTab) || ABOUT_TOPICS[0];

  return (
    <section id="about" className="py-16 sm:py-24 bg-cream/50 relative overflow-hidden">
      {/* Decorative background accents */}
      <div 
        className="absolute top-0 right-10 w-96 h-96 bg-secondary-100/30 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 left-0 w-80 h-80 bg-accent-100/30 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="container-custom">
        {/* Section Header */}
        <SectionHeading
          badge="Tentang MPASI"
          badgeIcon={<Sparkles className="w-4 h-4 text-primary" />}
          title="Fondasi Emas Tumbuh Kembang Si Kecil"
          subtitle="Pahami esensi, urgensi, dan prinsip dasar pemberian Makanan Pendamping ASI berdasarkan rujukan resmi medis WHO (2023) dan Buku KIA Kemenkes RI (2024)."
          align="center"
        />

        {/* Interactive Topic Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 sm:mb-12 gap-2 no-scrollbar">
          {ABOUT_TOPICS.map((topic) => {
            const isActive = topic.id === activeTab;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveTab(topic.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-heading font-medium whitespace-nowrap transition-all duration-200 shrink-0",
                  isActive
                    ? "bg-primary text-white shadow-soft-md scale-[1.02]"
                    : "bg-white text-darkGreen-400 hover:text-darkGreen hover:bg-white/80 border border-primary/10 shadow-sm"
                )}
                aria-selected={isActive}
                role="tab"
              >
                <span className={cn(isActive ? "text-accent-200" : "text-primary")}>
                  {topic.icon}
                </span>
                <span>{topic.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Editorial Feature Showcase Box for Active Topic */}
        <div className="bg-white rounded-3xl border border-primary/15 shadow-card p-6 sm:p-10 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-100 text-primary-700 text-xs font-heading font-semibold w-fit mb-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {currentTopic.badge}
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-darkGreen leading-snug">
                {currentTopic.title}
              </h3>

              <p className="mt-4 text-base sm:text-lg text-darkGreen-300 font-body leading-relaxed">
                {currentTopic.description}
              </p>

              {/* Highlight Cards */}
              <div className="mt-6 flex flex-col gap-3.5">
                {currentTopic.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-cream-50 border border-primary/10 flex items-start gap-3.5 hover:border-primary/30 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-darkGreen">
                        {item.label}
                      </h4>
                      <p className="text-xs sm:text-sm text-darkGreen-300 font-body mt-1 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Citation Footer */}
              <div className="mt-6 pt-4 border-t border-primary/10 flex items-center gap-2 text-xs text-darkGreen-300 font-body">
                <BookOpen className="w-4 h-4 text-primary shrink-0" />
                <span>Rujukan Resmi: <strong className="text-primary font-medium">{currentTopic.citation}</strong></span>
              </div>
            </div>

            {/* Right Column: Visual Infographic Breakdown */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Energy Contribution Card */}
              <Card variant="accent" padding="md" rounded="3xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-accent-700" />
                    <span className="font-heading font-bold text-sm text-darkGreen">
                      Porsi Energi: ASI vs MPASI
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-primary uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-primary/10">
                    WHO 2023
                  </span>
                </div>

                <div className="space-y-4 text-xs font-body">
                  {/* 6-8 Bulan */}
                  <div>
                    <div className="flex justify-between font-heading font-medium text-darkGreen mb-1.5">
                      <span>Usia 6–8 Bulan</span>
                      <span className="text-primary font-bold">ASI 70% • MPASI 30%</span>
                    </div>
                    <div className="w-full h-3 bg-secondary-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-primary rounded-l-full" style={{ width: "70%" }} title="ASI 70%" />
                      <div className="h-full bg-accent rounded-r-full" style={{ width: "30%" }} title="MPASI 30%" />
                    </div>
                  </div>

                  {/* 9-11 Bulan */}
                  <div>
                    <div className="flex justify-between font-heading font-medium text-darkGreen mb-1.5">
                      <span>Usia 9–11 Bulan</span>
                      <span className="text-primary font-bold">ASI 50% • MPASI 50%</span>
                    </div>
                    <div className="w-full h-3 bg-secondary-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-primary rounded-l-full" style={{ width: "50%" }} title="ASI 50%" />
                      <div className="h-full bg-accent rounded-r-full" style={{ width: "50%" }} title="MPASI 50%" />
                    </div>
                  </div>

                  {/* 12-23 Bulan */}
                  <div>
                    <div className="flex justify-between font-heading font-medium text-darkGreen mb-1.5">
                      <span>Usia 12–23 Bulan</span>
                      <span className="text-primary font-bold">ASI 30% • MPASI 70%</span>
                    </div>
                    <div className="w-full h-3 bg-secondary-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-primary rounded-l-full" style={{ width: "30%" }} title="ASI 30%" />
                      <div className="h-full bg-accent rounded-r-full" style={{ width: "70%" }} title="MPASI 70%" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-accent/20 flex items-center justify-between text-[11px] text-darkGreen-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                    <span>ASI Lanjut</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block" />
                    <span>Makanan Pendamping</span>
                  </div>
                </div>
              </Card>

              {/* Key Takeaway Box */}
              <div className="p-5 rounded-3xl bg-secondary-50 border border-secondary/30 flex items-start gap-3.5">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-darkGreen leading-relaxed font-body">
                  <strong className="font-heading font-semibold text-primary-700 block mb-0.5">
                    Kunci Keberhasilan MPASI:
                  </strong>
                  Fokus utama MPASI bukan hanya sekadar mengenyangkan, melainkan menyediakan kepadatan energi dan gizi mikro terutama <strong>protein hewani dan zat besi</strong> sedini mungkin.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Readiness Checklist: 4 Tanda Kesiapan Bayi Memulai MPASI */}
        <div className="mt-14 sm:mt-18">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-darkGreen">
              4 Tanda Kesiapan Fisik Bayi Memulai MPASI
            </h3>
            <p className="text-xs sm:text-sm text-darkGreen-300 font-body mt-2">
              Sebelum menyuapkan sendok pertama pada usia 6 bulan, pastikan si kecil telah menunjukkan sinyal kesiapan oromotorik dan neurologis berikut:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {READINESS_SIGNS.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-5 border border-primary/15 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-secondary-100 text-primary-700 flex items-center justify-center font-heading font-bold text-sm mb-4">
                    0{index + 1}
                  </div>
                  <h4 className="font-heading font-bold text-base text-darkGreen mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-darkGreen-300 font-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-primary/10 flex items-center gap-1.5 text-xs text-primary font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Kriteria Siap</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMPASI;

