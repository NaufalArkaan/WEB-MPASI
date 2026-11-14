# DOKUMEN SPESIFIKASI SISTEM

# MPASI SMART

**Platform Edukasi dan Panduan Makanan Pendamping ASI**

  Informasi             Keterangan
  --------------------- -----------------------------
  Nama produk           MPASI SMART
  Jenis produk          Website edukasi MPASI
  Platform              Web responsif
  Framework             Next.js 14
  Bahasa pemrograman    TypeScript
  Styling               Tailwind CSS
  Arsitektur            Frontend only
  Backend               Tidak menggunakan
  Database              Tidak menggunakan
  Deployment            Vercel (opsional)
  Target pengguna       Orang tua dan pengasuh bayi
  Rentang usia materi   6--23 bulan
  Tools pengembangan    Antigravity IDE

------------------------------------------------------------------------

# 1. PENDAHULUAN

## 1.1 Latar Belakang

Pemberian Makanan Pendamping ASI (MPASI) merupakan salah satu tahapan
penting dalam mendukung pertumbuhan dan perkembangan bayi. Pada usia
sekitar 6 bulan, kebutuhan energi dan nutrisi bayi mulai meningkat
sehingga ASI perlu didampingi makanan pendamping yang sesuai dengan
kebutuhan perkembangannya.

Namun, orang tua sering mengalami kesulitan dalam memperoleh informasi
MPASI yang terstruktur, seperti tahapan tekstur makanan, frekuensi
pemberian, kebutuhan nutrisi, variasi menu, dan keamanan makanan.

Oleh karena itu, dikembangkan MPASI SMART sebagai website edukasi yang
menyediakan informasi dan panduan MPASI berdasarkan referensi kesehatan
resmi, khususnya WHO dan Kementerian Kesehatan Republik Indonesia.

Website ini dirancang sebagai media informasi yang mudah diakses,
interaktif, responsif, dan mudah dipahami oleh pengguna.

## 1.2 Tujuan Sistem

1.  Menyediakan informasi edukasi mengenai MPASI.
2.  Membantu orang tua memahami tahapan MPASI berdasarkan usia bayi.
3.  Memberikan informasi mengenai kebutuhan dan sumber nutrisi.
4.  Menyediakan inspirasi menu serta resep MPASI.
5.  Memberikan edukasi mengenai keamanan dan kebersihan makanan.
6.  Menyajikan informasi kesehatan berdasarkan referensi terpercaya.

## 1.3 Ruang Lingkup

Website hanya berfokus pada sisi frontend.

### Fitur dalam ruang lingkup

-   Landing page edukasi MPASI.
-   Navigasi antar-section.
-   Tab tahapan usia bayi.
-   Kartu informasi nutrisi.
-   Katalog resep statis.
-   Filter resep berdasarkan usia.
-   Modal detail resep.
-   FAQ interaktif.
-   Halaman atau section referensi.
-   Responsive design.

### Di luar ruang lingkup

-   Backend dan REST API.
-   Database dan CRUD.
-   Login dan registrasi.
-   Dashboard pengguna.
-   Dashboard admin.
-   Penyimpanan data pengguna di server.
-   AI atau machine learning.
-   Konsultasi dokter secara langsung.

# 2. TARGET PENGGUNA

  Pengguna          Kebutuhan
  ----------------- -----------------------------------
  Orang tua bayi    Memahami panduan MPASI
  Ibu baru          Mendapatkan informasi dasar MPASI
  Pengasuh bayi     Memahami makanan sesuai usia
  Masyarakat umum   Mendapatkan edukasi nutrisi bayi

Karakteristik pengguna yang menjadi dasar UI/UX:

-   Tidak harus memiliki pengetahuan medis.
-   Membutuhkan informasi yang mudah dipahami.
-   Lebih menyukai informasi visual dan ringkas.
-   Mengakses website melalui smartphone maupun komputer.

# 3. STRUKTUR DAN ARSITEKTUR WEBSITE

Website menggunakan konsep **Single Page Landing Page**.

Artinya, konten utama berada dalam satu halaman, sementara navigasi
navbar mengarahkan pengguna ke bagian tertentu melalui anchor atau
scroll.

## 3.1 Sitemap

``` text
MPASI SMART – Home
│
├── Tentang MPASI       (#about)
├── Prinsip MPASI       (#principles)
├── Tahapan Usia        (#stages)
├── Nutrisi MPASI       (#nutrition)
├── Menu & Resep        (#recipes)
├── Keamanan Pangan     (#safety)
├── FAQ                 (#faq)
├── Referensi           (#references)
│
└── Footer
```

## 3.2 Susunan Navbar

Navbar harus memiliki:

-   Logo MPASI SMART.
-   Beranda.
-   Tentang MPASI.
-   Tahapan Usia.
-   Nutrisi.
-   Resep.
-   FAQ.
-   Tombol CTA "Jelajahi Panduan".

Pada perangkat mobile, navbar berubah menjadi hamburger menu dengan
animasi buka dan tutup.

# 4. SPESIFIKASI KONTEN SETIAP SECTION

## 4.1 Hero Section

**Headline:** Awali Perjalanan MPASI Si Kecil dengan Nutrisi Terbaik.

**Subheadline:** Panduan MPASI terpercaya untuk mendukung tumbuh kembang
si kecil.

  -----------------------------------------------------------------------
  Komponen                            Spesifikasi
  ----------------------------------- -----------------------------------
  Headline                            Awali Perjalanan MPASI Si Kecil
                                      dengan Nutrisi Terbaik

  Subheadline                         Panduan MPASI terpercaya untuk
                                      mendukung tumbuh kembang si kecil

  CTA 1                               Jelajahi Panduan

  CTA 2                               Lihat Resep

  Visual                              Foto makanan bayi atau ilustrasi
                                      MPASI

  Background                          Sage green dan cream
  -----------------------------------------------------------------------

Tujuan: menarik perhatian pengguna dan menjelaskan fungsi utama website.

## 4.2 Tentang MPASI

Konten:

-   Definisi MPASI.
-   Waktu pemberian MPASI.
-   Tujuan pemberian MPASI.
-   Hubungan MPASI dengan tumbuh kembang.
-   Pentingnya melanjutkan pemberian ASI.

Penyajian menggunakan kombinasi teks, ilustrasi, dan kartu informasi.

## 4.3 Prinsip Pemberian MPASI

Menampilkan empat prinsip:

  -----------------------------------------------------------------------
  Prinsip                             Penjelasan
  ----------------------------------- -----------------------------------
  Tepat waktu                         Dimulai saat bayi membutuhkan
                                      MPASI, umumnya pada usia 6 bulan

  Adekuat                             Memenuhi kebutuhan energi dan zat
                                      gizi

  Aman                                Memperhatikan kebersihan serta
                                      keamanan pangan

  Diberikan dengan benar              Memperhatikan responsive feeding
  -----------------------------------------------------------------------

Setiap kartu memiliki ikon, deskripsi singkat, dan tombol detail.

## 4.4 Tahapan MPASI

Menampilkan tiga tab kelompok usia:

  Kelompok usia   Materi utama
  --------------- -------------------------------------------------
  6--8 bulan      Tekstur lumat dan kental, pengenalan makanan
  9--11 bulan     Makanan dicincang atau dicacah sesuai kemampuan
  12--23 bulan    Makanan keluarga yang dimodifikasi

Setiap tab menampilkan:

-   Karakteristik tekstur.
-   Frekuensi makan.
-   Perkiraan jumlah atau porsi.
-   Contoh menu.
-   Tips pemberian makanan.

Angka porsi dan frekuensi harus mengikuti edisi referensi yang
digunakan, bukan dibuat berdasarkan asumsi pengembang.

## 4.5 Nutrisi MPASI

Konten utama:

  Nutrisi       Fungsi                        Contoh sumber
  ------------- ----------------------------- -------------------
  Protein       Pertumbuhan jaringan          Ayam, ikan, telur
  Zat besi      Pembentukan hemoglobin        Daging, hati
  Zinc          Pertumbuhan dan fungsi imun   Daging, ikan
  Lemak         Sumber energi                 Minyak, alpukat
  Karbohidrat   Sumber energi                 Nasi, kentang
  Vitamin       Mendukung fungsi tubuh        Sayuran dan buah

Fitur interaksi: pengguna menekan kartu nutrisi untuk melihat penjelasan
lebih lengkap.

## 4.6 Menu dan Resep MPASI

Katalog resep menggunakan data statis.

Setiap resep mempunyai struktur data:

  Field          Keterangan
  -------------- ---------------------------------
  id             Identitas resep
  name           Nama resep
  image          Gambar resep
  ageGroup       Kelompok usia
  ingredients    Daftar bahan
  instructions   Langkah memasak
  texture        Tekstur makanan
  allergens      Informasi alergen
  nutrition      Informasi nutrisi jika tersedia
  duration       Estimasi waktu memasak

Fitur:

-   Filter resep berdasarkan usia 6--8 bulan.
-   Filter resep berdasarkan usia 9--11 bulan.
-   Filter resep berdasarkan usia 12--23 bulan.
-   Pencarian nama resep.
-   Modal detail resep.
-   Tampilan kartu resep.

## 4.7 Keamanan Pangan

Konten:

-   Kebersihan tangan.
-   Kebersihan peralatan.
-   Pengolahan bahan makanan.
-   Penyimpanan makanan.
-   Pencegahan risiko tersedak.
-   Pengawasan selama bayi makan.

## 4.8 FAQ

Menggunakan accordion interaktif.

Pertanyaan:

1.  Kapan bayi mulai MPASI?
2.  Apakah ASI tetap diberikan?
3.  Bagaimana menentukan tekstur makanan?
4.  Berapa kali bayi makan dalam sehari?
5.  Bagaimana mengenali alergi makanan?
6.  Bagaimana mencegah risiko tersedak?

## 4.9 Referensi

Menampilkan sumber informasi yang digunakan dalam pengembangan konten.

Referensi utama:

1.  WHO (2023) -- *Guideline for Complementary Feeding of Infants and
    Young Children 6--23 Months of Age*.
2.  Kementerian Kesehatan RI (2024) -- *Buku Kesehatan Ibu dan Anak*.
3.  Kementerian Kesehatan RI (2024) -- *Petunjuk Teknis Pemantauan
    Praktik MP-ASI Anak Usia 6--23 Bulan*.

Setiap referensi ditampilkan dengan judul, penerbit, tahun, deskripsi,
dan tautan sumber jika tersedia.

# 5. SPESIFIKASI UI/UX

## 5.1 Design System

### Palet warna

  Peran        Warna        Kode
  ------------ ------------ -----------
  Primary      Sage green   `#52765B`
  Secondary    Light sage   `#A9C4A8`
  Background   Cream        `#F7F4EA`
  Accent       Warm peach   `#E8B88D`
  Text         Dark green   `#26352B`
  Surface      White        `#FFFFFF`

### Tipografi

-   Heading: Poppins.
-   Body: Inter.
-   Ukuran heading responsif.

### Gaya visual

-   Modern, minimalis, bersih, dan profesional.
-   Rounded corners.
-   Soft shadows.
-   Whitespace yang proporsional.
-   Animasi transisi halus.
-   Ilustrasi dan foto makanan MPASI berkualitas.

## 5.2 Responsivitas

Website harus mendukung:

  Perangkat              Lebar acuan
  ------------------ ---------------
  Smartphone kecil       320--374 px
  Smartphone             375--767 px
  Tablet                768--1023 px
  Laptop               1024--1439 px
  Desktop besar             ≥1440 px

Ketentuan:

-   Tidak ada horizontal overflow.
-   Navbar mobile menggunakan hamburger.
-   Grid kartu menyesuaikan lebar layar.
-   Ukuran teks mudah dibaca.
-   Gambar menggunakan ukuran responsif.
-   Modal dapat digunakan pada layar kecil.
-   Tombol memiliki area sentuh yang memadai.

## 5.3 Interaktivitas

  Elemen          Interaksi
  --------------- --------------------------
  Navbar          Smooth scrolling
  Hamburger       Toggle menu
  Tab usia        Mengganti konten
  Kartu nutrisi   Modal detail
  Filter resep    Memfilter data lokal
  Search resep    Pencarian lokal
  Detail resep    Modal
  FAQ             Accordion
  CTA             Scroll ke section tujuan
  Back to top     Scroll ke atas

## 5.4 Aksesibilitas

-   Kontras warna yang cukup.
-   Alt text pada gambar.
-   Semantic HTML.
-   Label yang jelas pada tombol.
-   Navigasi keyboard.
-   Fokus elemen terlihat.
-   Menghormati preferensi `prefers-reduced-motion`.

# 6. SPESIFIKASI TEKNOLOGI

  Komponen         Teknologi
  ---------------- --------------------------
  Framework        Next.js 14
  Routing          App Router
  Bahasa           TypeScript
  Styling          Tailwind CSS
  Icon             Lucide React
  UI Interaction   React Hooks
  Data             Static TypeScript / JSON
  Font             Google Fonts
  Deployment       Vercel

### Ketentuan teknis

1.  Menggunakan App Router (`src/app`).
2.  Menggunakan TypeScript.
3.  Client Component hanya untuk komponen interaktif.
4.  Server Component digunakan untuk komponen statis jika sesuai.
5.  Tidak membuat API route.
6.  Tidak menghubungkan database.
7.  Tidak menggunakan autentikasi.
8.  Tidak menggunakan backend.
9.  Data resep dan konten disimpan di folder `data`.
10. Menghindari duplikasi komponen.

# 7. STRUKTUR FOLDER PROJECT

``` text
mpasi-smart/
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── recipes/
│   │   ├── nutrition/
│   │   └── education/
│   └── icons/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── AboutMPASI.tsx
│   │   │   ├── Principles.tsx
│   │   │   ├── AgeStages.tsx
│   │   │   ├── Nutrition.tsx
│   │   │   ├── Recipes.tsx
│   │   │   ├── FoodSafety.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── References.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       └── SectionHeading.tsx
│   │
│   ├── data/
│   │   ├── recipes.ts
│   │   ├── nutrition.ts
│   │   ├── stages.ts
│   │   ├── faq.ts
│   │   └── references.ts
│   │
│   ├── hooks/
│   │   └── useScroll.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── lib/
│       └── utils.ts
│
├── package.json
└── tsconfig.json
```

# 8. STANDAR KUALITAS DAN PENGUJIAN

Website dianggap selesai jika memenuhi kriteria berikut.

  No.   Pengujian       Kriteria keberhasilan
  ----- --------------- ---------------------------------
  1     Landing page    Seluruh section tampil
  2     Navbar          Semua tautan navigasi berfungsi
  3     Responsivitas   Tidak terjadi layout rusak
  4     Tab usia        Konten berubah dengan benar
  5     Filter resep    Data terfilter sesuai pilihan
  6     Search resep    Pencarian berjalan
  7     Modal           Dapat dibuka dan ditutup
  8     FAQ             Accordion berfungsi
  9     Gambar          Tidak ada gambar rusak
  10    Build           `npm run build` berhasil
  11    TypeScript      Tidak ada error tipe
  12    Konten          Sesuai sumber referensi

Pengujian dilakukan pada smartphone, tablet, laptop, dan desktop.

# 9. REFERENSI DAN LANDASAN KONTEN

Seluruh anggota wajib menggunakan sumber yang sama agar informasi dalam
website konsisten.

## 9.1 Referensi utama

1.  **WHO (2023).** *Guideline for Complementary Feeding of Infants and
    Young Children 6--23 Months of Age.*\
    https://www.who.int/publications/i/item/9789240081864

2.  **Kementerian Kesehatan RI (2024).** *Buku Kesehatan Ibu dan Anak
    (Buku KIA) Edisi 2024.*\
    Gunakan dokumen resmi Buku KIA yang telah disediakan sebagai acuan
    tim.

3.  **Kementerian Kesehatan RI (2024).** *Petunjuk Teknis Pemantauan
    Praktik MP-ASI Anak Usia 6--23 Bulan.*\
    Gunakan dokumen resmi Kemenkes yang telah disediakan sebagai acuan
    tim.

## 9.2 Ketentuan penggunaan referensi

-   Jangan menyalin isi buku secara keseluruhan.
-   Gunakan parafrasa dengan bahasa yang mudah dipahami.
-   Cantumkan sumber pada konten yang relevan.
-   Jangan membuat klaim kesehatan tanpa landasan.
-   Pastikan resep dan takaran telah divalidasi.
-   Perhatikan ketentuan lisensi dan hak penggunaan gambar maupun
    publikasi.

# 10. KRITERIA PENERIMAAN PRODUK

MPASI SMART dinyatakan selesai apabila:

1.  Seluruh section utama sudah terintegrasi.
2.  Seluruh komponen memiliki desain yang konsisten.
3.  Website responsif pada berbagai ukuran layar.
4.  Seluruh interaksi frontend berfungsi.
5.  Informasi MPASI memiliki sumber referensi.
6.  Tidak terdapat error TypeScript.
7.  Production build berhasil.
8.  Tidak terdapat fitur backend yang berada di luar ruang lingkup.

# 11. CATATAN IMPLEMENTASI

1.  Gunakan satu repository dan satu project Next.js utama. Setiap
    anggota mengerjakan komponen masing-masing pada branch terpisah.
2.  Sepakati interface komponen sebelum pengerjaan paralel agar komponen
    dapat digunakan bersama tanpa banyak perubahan.
3.  Batasi perubahan Antigravity pada file yang menjadi tanggung jawab
    masing-masing anggota.
4.  Konten kesehatan harus diperiksa dan disesuaikan dengan sumber
    resmi. Website merupakan media edukasi, bukan pengganti konsultasi
    tenaga kesehatan.
5.  Prioritaskan tampilan dan pengalaman pengguna. Landing page harus
    mudah dipahami oleh orang tua yang tidak memiliki latar belakang
    kesehatan.

------------------------------------------------------------------------

## RINGKASAN PROYEK

  Aspek            Spesifikasi
  ---------------- -----------------------------------------------
  Produk           MPASI SMART
  Jenis            Website edukasi MPASI
  Jumlah section   9 section utama
  Framework        Next.js 14
  Bahasa           TypeScript
  Styling          Tailwind CSS
  Arsitektur       Frontend-only
  Sumber data      Statis / lokal
  Backend          Tidak ada
  Database         Tidak ada
  Target           Website responsif, informatif, dan interaktif

**Target akhir:** Website edukasi MPASI yang modern, responsif,
interaktif, informatif, dan mempunyai dokumentasi sumber informasi yang
jelas.

**Catatan:** Informasi kesehatan, angka porsi, frekuensi, tekstur, dan
resep harus diperiksa kembali terhadap edisi dokumen resmi yang
digunakan sebelum dipublikasikan.
