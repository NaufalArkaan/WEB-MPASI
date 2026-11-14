# DOKUMENTASI KATALOG RESEP & PENGELOLAAN DATA STATIS
**MPASI SMART | Platform Edukasi Makanan Pendamping ASI**  
**Author / Developer**: Robi (Senior Frontend Developer - Recipe Catalog & Static Data Management)  
**Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React  

---

## 📋 Ringkasan Implementasi

Modul Katalog Resep MPASI SMART dirancang sebagai katalog interaktif berbasis data statis lokal (tanpa backend, tanpa API, tanpa database, dan tanpa autentikasi). Modul ini menyediakan 12 resep MPASI bergizi tinggi yang terbagi merata ke dalam 3 kelompok usia sesuai standar resmi **Buku KIA Kemenkes RI (2024)** dan panduan **WHO Infant and Young Child Feeding (IYCF)**.

Seluruh data resep, pencarian multi-kriteria, filter kelompok usia, dan modal interaktif detail resep beroperasi 100% pada *client-side state* yang ringan, responsif, dan aksesibel.

---

## 🎨 Kepatuhan Design System

Komponen mengadopsi Design System resmi MPASI SMART secara ketat:

| Token | Nilai HEX | Penggunaan pada Katalog Resep |
| :--- | :--- | :--- |
| **Primary** | `#52765B` *(Sage Green)* | Header, border aktif, tab terpilih, ikon penanda, tombol CTA aksi, bullet langkah |
| **Secondary** | `#A9C4A8` *(Light Sage)* | Kotak oromotorik tekstur, chip usia bayi, background banner edukasi |
| **Cream** | `#F7F4EA` *(Warm Cream)* | Latar belakang section (`bg-cream/80`), latar foto makanan, container list bahan |
| **Accent** | `#E8B88D` *(Warm Peach)* | Highlight kalori/energi (`Flame`), badge pilihan favorit, aksen visual |
| **Dark Green** | `#26352B` *(Deep Forest)* | Tipografi judul resep, teks deskripsi, teks modal |

**Tipografi**:
- Heading: `Poppins` (`font-heading`)
- Body: `Inter` (`font-body`)

---

## 📂 Struktur Berkas & Komponen

```text
src/
├── data/
│   ├── recipes.ts                    # Koleksi 12 resep terverifikasi gizi & tipe data
│   └── index.ts                      # Re-export data resep
├── types/
│   └── index.ts                      # Definisi Interface Recipe & RecipeNutrition
├── components/
│   ├── recipes/
│   │   ├── RecipeCard.tsx            # Komponen kartu resep individual
│   │   ├── RecipeModal.tsx           # Integrasi dialog modal detail resep
│   │   └── index.ts                  # Barrel export modul recipes
│   └── sections/
│       ├── Recipes.tsx               # Section utama katalog resep & filter controller
│       └── RecipeCard.tsx            # Re-export untuk kompatibilitas import tim
public/
└── images/
    └── recipes/                      # 12+ ilustrasi vektor SVG makanan MPASI
```

---

## 1. Struktur Data Resep (`src/data/recipes.ts`)

### TypeScript Interface:
```typescript
export type AgeGroupId = "6-8" | "9-11" | "12-23";

export interface RecipeNutrition {
  calories?: string;
  protein?: string;
  iron?: string;
  fat?: string;
  carbs?: string;
  note?: string;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  ageGroup: AgeGroupId;
  ageLabel?: string;
  texture: string;
  duration: string;
  portion: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  allergens: string[];
  nutrition?: RecipeNutrition;
  tips?: string;
  isFeatured?: boolean;
}
```

### Distribusi 12 Resep Berdasarkan Kelompok Usia:

#### Kelompok 6–8 Bulan (Tekstur Lumat Kental / Puree Halus):
1. **Bubur Ayam Wortel** (`bubur-ayam-wortel`) — Beras pulen, fillet ayam kampung, parutan wortel betakaroten, dan minyak kelapa lemak tambahan.
2. **Puree Alpukat** (`puree-alpukat`) — Daging alpukat mentega segar kaya MUFA/PUFA untuk perkembangan mielin otak bayi, dilumatkan bersama ASI perah.
3. **Bubur Ikan dan Sayuran** (`bubur-ikan-sayuran`) — Ikan kembung lokal tinggi Omega-3 dan DHA, labu kuning, serta bayam hijau cincang saring.
4. **Kentang Tumbuk dengan Protein Hewani** (`kentang-tumbuk-protein-hewani`) — Kentang kuning kukus lumat daging sapi cincang kaya heme iron dan unsalted butter.

#### Kelompok 9–11 Bulan (Tekstur Cincang Halus / Cincang Kasar / Finger Food Lunak):
5. **Nasi Tim Ayam** (`nasi-tim-ayam`) — Nasi tim aron lembut dengan daging ayam cincang, tahu sutra, dan dadu wortel kecil (< 0.5 cm).
6. **Nasi Tim Ikan** (`nasi-tim-ikan`) — Nasi tim lembut salmon/kembung, irisan bayam, dan jagung manis muda tumbuk kasar.
7. **Bola Kentang Ayam Keju** (`bola-kentang-ayam-keju`) — Finger food lonjong seukuran genggaman jari anak (pincer grasp), empuk dan lumer di mulut.
8. **Nasi Tim Daging Sapi & Telur Puyuh** (`nasi-tim-sapi-telur-puyuh`) — Padat zat besi dan kolin kuning telur puyuh untuk fungsi kognitif.

#### Kelompok 12–23 Bulan (Makanan Keluarga yang Disesuaikan / Diiris Kecil):
9. **Nasi Ayam Sayur** (`nasi-ayam-sayur`) — Nasi pulen hangat dengan sup ayam kampung kuah bening aromatik, kentang, wortel, dan buncis empuk.
10. **Nasi Ikan Kembung Bumbu Kuning** (`nasi-ikan-kembung`) — Suwiran ikan kembung kuah kuning rempah kunyit dan serai ramah anak tanpa bumbu pedas.
11. **Rolade Daging Sapi & Tahu Kukus** (`rolade-sapi-tahu`) — Gulungan telur dadar isi daging sapi dan tahu sutra kukus, dipotong bite-sized.
12. **Perkedel Tempe Daging Ayam Wortel** (`perkedel-tempe-ayam-wortel`) — Variasi prebiotik tempe fermentasi kedelai lumat berpadu ayam cincang gurih.

---

## 2. Kebijakan Medis Nutrisi & Peringatan Alergen

### Kebijakan Transparansi Nutrisi:
- **Anti-Fabrikasi Angka**: Angka nutrisi tidak dikarang bebas. Estimasi dihitung per porsi makan berdasarkan takaran bahan mentah mengacu pada **Tabel Komposisi Pangan Indonesia (TKPI) Kemenkes RI**.
- **Fallback Terbuka**: Jika suatu zat gizi mikro tidak terukur secara valid, sistem menampilkan badge teks *"Belum tersedia"*, bukan mengarang nilai sembarangan.

### Peringatan Kontaminasi Silang (*Cross-Contamination Disclaimer*):
Setiap modal resep menyertakan peringatan kesehatan eksplisit:
> ⚠️ **Peringatan Kontaminasi Silang**: Informasi bahan tidak menjamin 100% bebas risiko kontaminasi silang pada peralatan masak atau fasilitas penyimpanan. Orang tua dianjurkan menerapkan aturan pengenalan makanan baru bertahap selama 3 hari berturut-turut (*rule of three*) untuk mendeteksi potensi reaksi alergi (seperti ruam merah, gatal, bengkak, atau diare), dan segera berkonsultasi dengan dokter anak jika timbul gejala atopik.

---

## 3. Komponen RecipeCard (`RecipeCard.tsx`)

Menampilkan kartu resep berdesain modern:
- **Foto Makanan**: Merender SVG lokal ilustratif resolusi tinggi dari `/images/recipes/` dengan proteksi fallback `onError` ke ilustrasi cadangan.
- **Badge Usia & Durasi**: Chip mengambang dengan latar kaca lembut (`bg-white/90 backdrop-blur-sm`).
- **Nama & Deskripsi**: Judul tegas dengan hover warna primer dan deskripsi ringkas 2 baris (`line-clamp-2`).
- **Pill Tekstur & Preview Alergen**: Panduan oromotorik instan sebelum membuka modal.
- **Tombol "Lihat Resep"**: Terintegrasi dengan komponen `Button` dari Syahrial (`variant="outline"`).

---

## 4. Komponen RecipeModal (`RecipeModal.tsx`)

Mengintegrasikan komponen `Modal` reusable buatan Syahrial dengan fitur:
- Body scroll lock otomatis saat dialog aktif.
- Penutupan via tombol `Esc` keyboard atau klik backdrop luar.
- Focus trap WAI-ARIA dialog (`role="dialog"` dan `aria-modal="true"`).
- Breakdown takaran gram dan sendok yang presisi untuk memudahkan orang tua di dapur.
- Langkah-langkah memasak higienis berpenomoran urut.
- Tips ahli nutrisi mengenai trik penyerapan zat besi dan penyimpanan higienis (*meal prep*).

---

## 5. Fitur Pencarian & Filter Usia (`Recipes.tsx`)

### Search Recipe:
- Menggunakan komponen `SearchInput` dari Syahrial (`@/components/ui/SearchInput`).
- Pencarian bersifat **case-insensitive**.
- Memfilter secara *real-time* berdasarkan kecocokan nama resep, bahan baku, atau ringkasan deskripsi.
- Tombol clear instan ('X') dan tombol keyboard `Escape` untuk mengosongkan pencarian.

### Filter Kelompok Usia:
- Tab pilihan: **Semua Resep**, **6–8 Bulan**, **9–11 Bulan**, **12–23 Bulan**.
- Dilengkapi badge penghitung jumlah resep aktif per kelompok.
- Pencarian dan filter usia dapat digunakan secara simultan (*multi-criteria filtering*).

### State Resep Kosong (*Empty State*):
- Jika kombinasi kata kunci dan filter tidak menemukan hasil, ditampilkan pesan ramah dengan tombol **"Reset Filter & Pencarian"** yang mengembalikan state ke default.

---

## 6. Verifikasi Responsivitas & TypeScript

- **TypeScript Compilation**:
  `npx tsc --noEmit` / `npm run type-check` -> **Exit Code 0 (0 Error)**.
- **Responsivitas**:
  - Layar Ponsel (`< 640px`): 1 kolom kartu, dialog modal mode bottom sheet / centered, tabs scrollable horizontal.
  - Layar Tablet (`640px – 1023px`): 2 kolom kartu (`sm:grid-cols-2`).
  - Layar Desktop (`≥ 1024px`): 3 kolom kartu (`lg:grid-cols-3`), kontrol filter sejajar dengan bar pencarian.
- **Integritas Batasan Sistem**:
  - File `src/app/page.tsx` **TIDAK diubah**.
  - File `Navbar.tsx` dan `Hero.tsx` **TIDAK diubah**.
  - Komponen anggota tim lain **TIDAK diubah**.
  - Tidak ada penambahan endpoint API, backend, atau database.
