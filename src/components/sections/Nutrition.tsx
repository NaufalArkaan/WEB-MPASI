import {
  Apple,
  Bean,
  Beef,
  Carrot,
  Droplets,
  Wheat,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const nutrients = [
  {
    name: "Protein",
    role: "Mendukung pertumbuhan dan pemeliharaan jaringan tubuh.",
    sources: "Telur, ikan, ayam, daging, tahu, tempe, dan kacang-kacangan.",
    note: "Sertakan sumber protein dalam menu beragam; pangan hewani dapat membantu memenuhi kebutuhan zat gizi anak.",
    icon: Beef,
    foods: ["🍳", "🐟", "🍗"],
    color: "bg-accent-50 text-accent-800",
  },
  {
    name: "Zat besi",
    role: "Diperlukan untuk pembentukan hemoglobin yang membawa oksigen dalam darah.",
    sources: "Daging, hati, ikan, telur, kacang-kacangan, dan pangan fortifikasi.",
    note: "Padukan sumber nabati zat besi dengan buah atau sayur sumber vitamin C sebagai bagian dari menu seimbang.",
    icon: Droplets,
    foods: ["🥩", "🐟", "🥚"],
    color: "bg-rose-50 text-rose-700",
  },
  {
    name: "Zinc",
    role: "Berperan dalam pertumbuhan dan fungsi kekebalan tubuh.",
    sources: "Daging, ikan, telur, susu, kacang-kacangan, dan biji-bijian.",
    note: "Variasikan sumber pangan agar anak mendapatkan beragam zat gizi dari makanannya.",
    icon: Bean,
    foods: ["🥜", "🥩", "🫘"],
    color: "bg-secondary-100 text-primary-700",
  },
  {
    name: "Lemak",
    role: "Sumber energi dan membantu penyerapan vitamin larut lemak.",
    sources: "Ikan, telur, alpukat, santan, serta minyak yang digunakan secukupnya.",
    note: "Lemak alami dapat membantu meningkatkan kepadatan energi makanan anak.",
    icon: Droplets,
    foods: ["🥑", "🐟", "🥥"],
    color: "bg-yellow-50 text-yellow-800",
  },
  {
    name: "Karbohidrat",
    role: "Salah satu sumber energi untuk aktivitas dan tumbuh kembang anak.",
    sources: "Nasi, kentang, ubi, jagung, oat, dan sumber pangan pokok lain.",
    note: "Pilih sumber karbohidrat yang bervariasi dan sajikan bersama lauk serta sayur atau buah.",
    icon: Wheat,
    foods: ["🍚", "🌽", "🍠"],
    color: "bg-amber-50 text-amber-800",
  },
  {
    name: "Vitamin",
    role: "Beragam vitamin mendukung fungsi tubuh, pertumbuhan, dan kesehatan.",
    sources: "Sayur dan buah berwarna, telur, ikan, serta pangan lain yang beragam.",
    note: "Tawarkan sayur dan buah dengan variasi warna, bentuk, dan tekstur yang aman sesuai usia.",
    icon: Carrot,
    foods: ["🥕", "🥬", "🍊"],
    color: "bg-orange-50 text-orange-800",
  },
];

export default function Nutrition() {
  return (
    <section
      id="nutrition"
      aria-label="Informasi nutrisi MPASI"
      className="border-t border-primary/10 bg-white py-16 sm:py-24"
    >
      <div className="container-custom">
        <SectionHeading
          badge="Gizi Seimbang"
          title="Kenali peran gizi di setiap suapan"
          subtitle="Ragam pangan membantu memenuhi kebutuhan zat gizi yang berbeda. Utamakan bahan yang mudah dijumpai dan sajikan dengan tekstur aman sesuai usia."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {nutrients.map((nutrient) => {
            const Icon = nutrient.icon;
            return (
              <article
                key={nutrient.name}
                className="overflow-hidden rounded-3xl border border-primary/15 bg-cream-50 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex items-center justify-between bg-white px-5 py-4">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${nutrient.color}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="flex gap-2 text-2xl" aria-hidden="true">
                    {nutrient.foods.map((food) => (
                      <span key={food}>{food}</span>
                    ))}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-darkGreen">{nutrient.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-darkGreen-300">{nutrient.role}</p>
                  <div className="mt-4 border-t border-primary/10 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Contoh sumber</p>
                    <p className="mt-1 text-sm leading-relaxed text-darkGreen-400">{nutrient.sources}</p>
                    <p className="mt-3 text-xs leading-relaxed text-darkGreen-300">{nutrient.note}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-accent/40 bg-accent-50 p-4 text-sm leading-relaxed text-darkGreen-400">
          <Apple className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p>
            Ilustrasi bahan hanya contoh sumber pangan, bukan pengganti saran tenaga kesehatan.
            Kebutuhan individu dapat berbeda.
          </p>
        </div>
      </div>
    </section>
  );
}
