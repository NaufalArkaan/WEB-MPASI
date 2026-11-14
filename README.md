# MPASI SMART | Platform Edukasi & Panduan MPASI Bayi 6–23 Bulan

MPASI SMART adalah platform edukasi interaktif dan panduan Makanan Pendamping ASI (MPASI) terpercaya untuk orang tua dan pengasuh anak usia 6–23 bulan. Platform ini dirancang berbasis rujukan resmi:
1. **World Health Organization (WHO 2023)** — *Guideline for Complementary Feeding of Infants and Young Children 6–23 Months of Age*.
2. **Kementerian Kesehatan Republik Indonesia (2024)** — *Buku Kesehatan Ibu dan Anak (Buku KIA) Edisi 2024*.
3. **Kementerian Kesehatan Republik Indonesia (2024)** — *Petunjuk Teknis Pemantauan Praktik MP-ASI Anak Usia 6–23 Bulan*.

---

## 🛠️ Tech Stack & Arsitektur

- **Framework**: Next.js 14 (App Router)
- **Bahasa**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Tipografi**: Poppins (Heading) & Inter (Body)
- **Arsitektur**: **Frontend-Only** (tanpa backend, database, REST API, maupun authentication). Semua data dikelola secara statis dan terstruktur di `src/data/`.

---

## 👥 Pembagian Peran Tim Pengembang

| Anggota Tim | Peran & Tanggung Jawab | Komponen / Modul |
| :--- | :--- | :--- |
| **Naufal** *(Technical Lead & Architect)* | Arsitektur Aplikasi, Integrasi Keseluruhan, Layout, Types, QC, Build Stability | `layout.tsx`, `page.tsx`, `types/index.ts`, `data/`, Quality Control & Verification |
| **Arkaan** | Layout Shell, Hero, & Edukasi Pembuka | `Navbar.tsx`, `Hero.tsx`, `AboutMPASI.tsx`, `Footer.tsx` |
| **Juan** | Modul Edukasi Utama & Kebijakan Kesehatan | `Principles.tsx`, `AgeStages.tsx`, `Nutrition.tsx`, `FoodSafety.tsx`, `References.tsx` |
| **Syahrial** | Reusable Interactive UI Components | `Button.tsx`, `Card.tsx`, `SectionHeading.tsx`, `Modal.tsx`, `Tabs.tsx`, `Accordion.tsx`, `Badge.tsx`, `SearchBar.tsx` |
| **Robi** | Modul Resep & Data Kuliner Bayi | `Recipes.tsx`, `recipes.ts`, filter usia, pencarian, dan modal takaran |

---

## 📁 Struktur Folder Project

```text
WEB-MPASI/
├── public/
│   ├── icons/
│   │   ├── logo.svg
│   │   └── icon.svg
│   └── images/
├── src/
│   ├── app/
│   │   ├── globals.css         # Styling global, font variables, scroll behavior
│   │   ├── layout.tsx          # Root layout: metadata resmi, font Poppins & Inter, lang="id"
│   │   └── page.tsx            # Komposisi 11 section terintegrasi
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Navigasi sticky, hamburger mobile, anchor smooth scroll
│   │   │   └── Footer.tsx      # Footer informatif, disclaimer kesehatan, back-to-top
│   │   ├── sections/
│   │   │   ├── Hero.tsx        # Section Hero (#home)
│   │   │   ├── AboutMPASI.tsx  # Section Tentang MPASI (#about)
│   │   │   ├── Principles.tsx  # Section Prinsip MPASI (#principles)
│   │   │   ├── AgeStages.tsx   # Section Tahapan Usia & Tekstur (#stages)
│   │   │   ├── Nutrition.tsx   # Section Kebutuhan & Sumber Nutrisi (#nutrition)
│   │   │   ├── Recipes.tsx     # Section Katalog Resep & Modal Detail (#recipes)
│   │   │   ├── FoodSafety.tsx  # Section Keamanan & Higienitas Pangan (#safety)
│   │   │   ├── FAQ.tsx         # Section Tanya Jawab Interaktif Accordion (#faq)
│   │   │   └── References.tsx  # Section Rujukan Resmi Kemenkes & WHO (#references)
│   │   └── ui/
│   │       ├── Accordion.tsx   # Accessible expandable accordion
│   │       ├── Badge.tsx       # Design system badge pill
│   │       ├── Button.tsx      # Reusable button & link CTA
│   │       ├── Card.tsx        # Container kartu berbayang lembut
│   │       ├── Modal.tsx       # Dialog modal aksesibel (ESC, backdrop, focus lock)
│   │       ├── SearchBar.tsx   # Input pencarian interaktif dengan tombol clear
│   │       ├── SectionHeading.tsx # Heading section standar
│   │       └── Tabs.tsx        # Tab bar interaktif
│   ├── data/
│   │   ├── faq.ts              # Data FAQ resmi seputar MPASI
│   │   ├── nutrition.ts        # Data makronutrien & mikronutrien esensial
│   │   ├── recipes.ts          # Katalog resep teruji 6–8 bln, 9–11 bln, 12–23 bln
│   │   ├── references.ts       # Metadata rujukan WHO & Kemenkes RI
│   │   └── stages.ts           # Data tahapan usia, tekstur, porsi, frekuensi
│   ├── hooks/
│   │   └── useScroll.ts        # Hook pendeteksi scroll posisi & active section
│   ├── lib/
│   │   └── utils.ts            # Utility helper cn (clsx + tailwind-merge)
│   └── types/
│       └── index.ts            # TypeScript interfaces & types lengkap
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🧭 Urutan Komposisi Halaman (`src/app/page.tsx`)

1. **Navbar** (`<Navbar />`) — Navigasi desktop & hamburger mobile drawer.
2. **Hero** (`#home`) — Headline, subheadline, visual MPASI, CTA button.
3. **About MPASI** (`#about`) — Pengertian, urgensi 1000 HPK, tanda kesiapan bayi.
4. **Principles** (`#principles`) — 4 Prinsip WHO (Tepat Waktu, Adekuat, Aman, Cara yang Benar).
5. **Age Stages** (`#stages`) — Tab usia 6–8 bulan, 9–11 bulan, 12–23 bulan (tekstur, porsi, frekuensi Buku KIA).
6. **Nutrition** (`#nutrition`) — 6 kartu nutrisi (Protein, Zat Besi, Zinc, Lemak, Karbohidrat, Vitamin).
7. **Recipes** (`#recipes`) — Filter usia, search bar, kartu menu, dan modal resep detail.
8. **Food Safety** (`#safety`) — 6 langkah keamanan pangan & pencegahan tersedak.
9. **FAQ** (`#faq`) — Accordion interaktif 6 pertanyaan umum orang tua.
10. **References** (`#references`) — Rujukan resmi WHO (2023) dan Kemenkes RI (2024).
11. **Footer** (`<Footer />`) — Navigasi sitemap, disclaimer medis, dan tombol kembali ke atas.

Setiap section menggunakan ID konsisten yang diselaraskan dengan navigasi anchor bar.

---

## 🚀 Cara Menjalankan Project

### 1. Prasyarat
- Node.js versi 18.17.0 atau lebih baru
- npm / yarn / pnpm

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Akses aplikasi melalui browser di: `http://localhost:3000`

### 4. Pengecekan Type TypeScript
```bash
npx tsc --noEmit
```

### 5. Menjalankan Production Build
```bash
npm run build
```

---

## 🛡️ Laporan Quality Control (QC)

- [x] **TypeScript Compliance**: `npx tsc --noEmit` lolos 0 error.
- [x] **Production Build**: `npm run build` sukses membuat static prerendered output (`○ / 32.6 kB`).
- [x] **Semua 11 Section Terintegrasi**: Tanpa duplikasi ID dan tanpa placeholder yang tertinggal.
- [x] **Anchor Navigation**: Seluruh tautan navbar dan CTA mengarah tepat ke target section dengan offset 84px untuk sticky navbar.
- [x] **Mobile Responsiveness**: Diuji pada lebar 320px, 375px, 768px, 1024px, 1440px tanpa horizontal overflow.
- [x] **Aksesibilitas & Interaktivitas**: Modal dapat ditutup dengan tombol ESC atau klik luar; Accordion dan Tab mendukung navigasi keyboard.
- [x] **Zero External Asset Failures**: Seluruh visual menggunakan inline SVG hand-crafted dan Lucide icons sehingga tidak ada gambar pecah / error 404.
