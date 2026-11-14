# Integrasi section edukasi MPASI

Lima section tersedia sebagai komponen mandiri di `src/components/sections/`:

- `Principles`
- `AgeStages`
- `Nutrition`
- `FoodSafety`
- `References`

Komponen memakai design system, `SectionHeading`, Tailwind CSS, dan ikon Lucide yang sudah ada.
`AgeStages` mengelola tab usia secara lokal; tidak memerlukan backend atau komponen tab tambahan.

## Integrasi halaman

Impor komponen dari `@/components/sections/<NamaKomponen>` di halaman yang merender konten edukasi.
Ganti slot placeholder yang sudah ada, jangan menambahkan komponen dengan `id` yang sama:

1. Ganti slot `#principles` dengan `<Principles />`.
2. Ganti slot `#stages` dengan `<AgeStages />`.
3. Ganti slot `#nutrition` dengan `<Nutrition />`.
4. Ganti slot `#safety` dengan `<FoodSafety />`.
5. Tambahkan `<References />` setelah section keamanan pangan dan sebelum FAQ.

File halaman utama sengaja tidak diubah. Saat integrasi dilakukan, pastikan setiap `id` hanya muncul
satu kali. Semua section di atas menggunakan `id` dan heading aksesibel masing-masing.

## Catatan konten

Angka frekuensi dan porsi usia pada `AgeStages.tsx` dirujuk dari Buku KIA Kemenkes RI edisi 2024:

- 6–8 bulan: 2–3 kali makan utama; mulai 2–3 sendok makan dan tingkatkan bertahap sampai ½ mangkuk 250 ml.
- 9–11 bulan: 3–4 kali makan utama; sekitar ½ mangkuk 250 ml tiap kali makan.
- 12–23 bulan: 3–4 kali makan utama dan 1–2 kali selingan; sekitar ¾ hingga 1 mangkuk 250 ml tiap kali makan.

Angka merupakan panduan umum, bukan ukuran wajib untuk setiap anak. Ikuti respons anak dan arahan
tenaga kesehatan. Link WHO diarahkan ke halaman publikasi resmi. Link Kemenkes mengarah ke portal
resmi karena alamat dokumen unduhan dapat berubah.
