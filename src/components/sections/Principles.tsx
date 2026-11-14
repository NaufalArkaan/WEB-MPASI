import {
  Baby,
  Check,
  Clock3,
  HandHeart,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const principles = [
  {
    title: "Tepat waktu",
    description:
      "Mulai MPASI saat anak berusia 6 bulan, ketika ASI saja tidak lagi mencukupi kebutuhan gizinya.",
    detail:
      "Teruskan pemberian ASI sesuai kebutuhan. Perhatikan kesiapan anak dan konsultasikan ke tenaga kesehatan bila ada kondisi khusus.",
    icon: Clock3,
    art: Baby,
    artLabel: "Ilustrasi pendampingan bayi",
    tone: "bg-accent-100 text-accent-800",
  },
  {
    title: "Adekuat",
    description:
      "Sajikan makanan yang cukup jumlah dan ragamnya, dengan tekstur serta frekuensi sesuai usia.",
    detail:
      "Utamakan makanan padat gizi dari beragam kelompok pangan, termasuk pangan sumber protein hewani, dan tingkatkan tekstur secara bertahap.",
    icon: Leaf,
    art: Sparkles,
    artLabel: "Ilustrasi makanan beragam",
    tone: "bg-secondary-100 text-primary-700",
  },
  {
    title: "Aman",
    description:
      "Siapkan dan berikan makanan dengan tangan serta peralatan bersih, dan pilih bahan yang aman.",
    detail:
      "Masak hingga matang, simpan makanan dengan benar, dan dudukkan anak tegak serta awasi selama makan untuk mengurangi risiko tersedak.",
    icon: ShieldCheck,
    art: Check,
    artLabel: "Ilustrasi makanan yang disiapkan dengan aman",
    tone: "bg-primary-50 text-primary-700",
  },
  {
    title: "Cara yang benar",
    description:
      "Dampingi anak dengan sabar dan responsif, sesuai sinyal lapar dan kenyangnya.",
    detail:
      "Beri waktu anak belajar makan dan dorong ia mencoba tanpa memaksa. Minimalkan distraksi dan dampingi anak sepanjang waktu makan.",
    icon: HandHeart,
    art: HandHeart,
    artLabel: "Ilustrasi pengasuh mendampingi anak makan",
    tone: "bg-accent-50 text-accent-800",
  },
];

export default function Principles() {
  return (
    <section
      id="principles"
      aria-label="Prinsip pemberian MPASI"
      className="border-t border-primary/10 bg-white py-16 sm:py-24"
    >
      <div className="container-custom">
        <SectionHeading
          badge="Prinsip MPASI"
          title="Empat prinsip untuk setiap waktu makan"
          subtitle="Jadikan MPASI tepat waktu, cukup gizinya, aman, dan diberikan dengan cara yang mendukung anak belajar makan."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            const Art = principle.art;

            return (
              <details
                key={principle.title}
                className="group rounded-3xl border border-primary/15 bg-cream-50 p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover sm:p-6"
              >
                <summary className="list-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${principle.tone}`}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold tracking-[0.16em] text-primary/60">
                      0{index + 1}
                    </span>
                  </div>
                  <div
                    className="my-5 flex h-28 items-center justify-center rounded-2xl bg-white"
                    role="img"
                    aria-label={principle.artLabel}
                  >
                    <Art className="h-12 w-12 text-primary/70" strokeWidth={1.4} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-darkGreen">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-darkGreen-300">
                    {principle.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    <span className="group-open:hidden">Baca detail</span>
                    <span className="hidden group-open:inline">Tutup detail</span>
                    <span aria-hidden="true" className="transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 border-t border-primary/10 pt-4 text-sm leading-relaxed text-darkGreen-400">
                  {principle.detail}
                </p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
