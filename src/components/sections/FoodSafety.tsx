import {
  Check,
  ClipboardCheck,
  CookingPot,
  Hand,
  Refrigerator,
  ShieldAlert,
  Soup,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const safetySteps = [
  {
    title: "Cuci tangan",
    description: "Cuci tangan dengan sabun dan air mengalir sebelum menyiapkan makanan dan menyuapi anak.",
    icon: Hand,
  },
  {
    title: "Bersihkan peralatan",
    description: "Gunakan alat makan dan permukaan yang bersih; simpan peralatan bersih di tempat terlindung.",
    icon: Soup,
  },
  {
    title: "Olah hingga matang",
    description: "Cuci bahan pangan dengan air bersih dan masak hingga matang. Pisahkan bahan mentah dari makanan siap santap.",
    icon: CookingPot,
  },
  {
    title: "Simpan dengan aman",
    description: "Sajikan makanan segera setelah disiapkan. Simpan sisa makanan dengan tertutup dan jangan berikan makanan yang diragukan keamanannya.",
    icon: Refrigerator,
  },
  {
    title: "Cegah tersedak",
    description: "Hindari makanan keras, lengket, atau bulat utuh yang berisiko; potong dan olah sesuai kemampuan anak.",
    icon: ShieldAlert,
  },
  {
    title: "Awasi saat makan",
    description: "Pastikan anak duduk tegak dan selalu dampingi selama makan. Hindari makan sambil berjalan, bermain, atau berbaring.",
    icon: ClipboardCheck,
  },
];

export default function FoodSafety() {
  return (
    <section
      id="safety"
      aria-label="Keamanan pangan MPASI"
      className="border-t border-primary/10 bg-cream/70 py-16 sm:py-24"
    >
      <div className="container-custom">
        <SectionHeading
          badge="Keamanan Pangan"
          title="Kebiasaan sederhana, waktu makan lebih aman"
          subtitle="Gunakan daftar periksa ini setiap kali menyiapkan dan memberikan MPASI."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {safetySteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="flex gap-4 rounded-3xl border border-primary/15 bg-white p-5 shadow-card sm:p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary-100 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                    <h3 className="font-heading font-bold text-darkGreen">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-darkGreen-300">{step.description}</p>
                  <span className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-wider text-primary/70">
                    Langkah 0{index + 1}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-darkGreen-300">
          Pedoman umum kebersihan dan keamanan pangan. Untuk penyimpanan, ikuti panduan keamanan
          pangan setempat dan petunjuk tenaga kesehatan.
        </p>
      </div>
    </section>
  );
}
