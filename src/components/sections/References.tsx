import { ArrowUpRight, BookOpen, Globe2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const references = [
  {
    title: "WHO Guideline for Complementary Feeding of Infants and Young Children 6–23 Months of Age",
    publisher: "World Health Organization",
    year: "2023",
    description:
      "Panduan berbasis bukti untuk pemberian makanan pendamping bagi anak usia 6–23 bulan.",
    href: "https://www.who.int/publications/i/item/9789240081864",
    linkLabel: "Buka panduan WHO",
  },
  {
    title: "Buku Kesehatan Ibu dan Anak",
    publisher: "Kementerian Kesehatan Republik Indonesia",
    year: "2024",
    description:
      "Buku KIA edisi 2024 sebagai rujukan informasi dan pemantauan kesehatan ibu dan anak, termasuk pemberian MPASI.",
    href: "https://ayosehat.kemkes.go.id/",
    linkLabel: "Kunjungi portal Ayo Sehat Kemenkes",
  },
  {
    title: "Petunjuk Teknis Pemantauan Praktik MP-ASI Anak Usia 6–23 Bulan",
    publisher: "Kementerian Kesehatan Republik Indonesia",
    year: "2024",
    description:
      "Rujukan teknis Kemenkes untuk pemantauan praktik pemberian MP-ASI pada anak usia 6–23 bulan.",
    href: "https://repository.kemkes.go.id/",
    linkLabel: "Kunjungi repositori Kemenkes",
  },
];

export default function References() {
  return (
    <section
      id="references"
      aria-label="Referensi edukasi MPASI"
      className="border-t border-primary/10 bg-white py-16 sm:py-24"
    >
      <div className="container-custom">
        <SectionHeading
          badge="Bacaan Lanjutan"
          title="Rujukan resmi"
          subtitle="Materi edukasi ini merangkum sumber berikut. Buka dokumen penerbit untuk membaca panduan lengkap."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {references.map((reference) => (
            <article key={reference.title} className="flex flex-col rounded-3xl border border-primary/15 bg-cream-50 p-5 shadow-card sm:p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary-100 text-primary">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {reference.publisher} · {reference.year}
              </p>
              <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-darkGreen">
                {reference.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-darkGreen-300">
                {reference.description}
              </p>
              <a
                href={reference.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <Globe2 className="h-4 w-4" aria-hidden="true" />
                {reference.linkLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-darkGreen-300">
          Untuk dua publikasi Kemenkes, tautan mengarah ke portal resmi penerbit; cari judul dokumen
          tersebut bila tautan unduhan langsung berubah.
        </p>
      </div>
    </section>
  );
}
