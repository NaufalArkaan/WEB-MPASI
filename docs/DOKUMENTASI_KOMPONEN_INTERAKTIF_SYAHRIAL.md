# DOKUMENTASI KOMPONEN UI INTERAKTIF & REACT HOOKS
**MPASI SMART | Platform Edukasi Makanan Pendamping ASI**  
**Author / Developer**: Syahrial (Senior Frontend Developer - Interactive Components & React Hooks)  
**Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React

---

## 🎨 Design System & Standar Warna

Seluruh komponen UI interaktif ini dirancang konsisten mengikuti Design System resmi MPASI SMART:

| Token / Warna | Nilai HEX | Penggunaan Utama |
| :--- | :--- | :--- |
| **Primary** | `#52765B` *(Sage Green)* | Brand utama, tombol CTA utama, tab aktif, icon highlight, border fokus |
| **Secondary** | `#A9C4A8` *(Light Sage)* | Latar elemen sekunder, badge status, chip tahapan usia, hover state |
| **Cream** | `#F7F4EA` *(Warm Cream)* | Latar belakang aplikasi, container netral, pill bar background |
| **Accent** | `#E8B88D` *(Warm Peach)* | Highlight peringatan lembut, kalori/gizi, aksen tombol sekunder |
| **Dark Green** | `#26352B` *(Deep Forest)* | Warna tipografi teks utama, backdrop overlay modal |

**Tipografi**:
- Heading: `Poppins` (`font-heading`)
- Body Text: `Inter` (`font-body`)

---

## 📦 Daftar Komponen Interaktif

1. [Modal (`Modal.tsx`)](#1-modal-component-modaltsx)
2. [Accordion (`Accordion.tsx`)](#2-accordion-component-accordiontsx)
3. [Tabs (`Tabs.tsx`)](#3-tabs-component-tabstsx)
4. [Search Input (`SearchInput.tsx` / `SearchBar.tsx`)](#4-search-input-component-searchinputtsx)
5. [Reusable Button (`Button.tsx`)](#5-reusable-button-component-buttontsx)
6. [Back to Top (`BackToTop.tsx`)](#6-back-to-top-component-backtotoptsx)
7. [Scroll Hook (`useScroll.ts`)](#7-scroll-interaction-hook-usescrollts)

---

## 1. Modal Component (`Modal.tsx`)

### Lokasi File:
`src/components/ui/Modal.tsx`

### Peruntukan dalam Tim:
- **Robi (`Recipes.tsx`)**: Detail takaran resep, bahan, langkah memasak, informasi gizi, potensi alergen.
- **Juan (`Nutrition.tsx`)**: Modal rincian zat gizi mikro (Zat Besi, Zinc, Vitamin) atau detail pencegahan stunting.
- **Juan & Arkaan (`Principles.tsx` / `AboutMPASI.tsx`)**: Modal penjelasan lengkap 4 prinsip MPASI WHO & Kemenkes RI.

### Fitur Utama:
- **Open & Close Control**: Dikontrol melalui prop `isOpen` dan callback `onClose`.
- **Prevent Background Scroll**: Mengunci scroll `document.body` saat modal terbuka dan mengembalikan padding serta overflow saat modal ditutup/unmount.
- **Keyboard Escape**: Menutup modal secara instan saat tombol `Esc` ditekan (`closeOnEscape`).
- **Safe Backdrop Click**: Menutup modal saat backdrop diklik (`closeOnBackdrop`). Dilengkapi proteksi mousedown/mouseup agar seleksi teks tidak memicu penutupan tidak sengaja.
- **Accessible Focus Trap**: Menahan fokus tombol keyboard (Tab / Shift+Tab) agar tidak bocor ke elemen latar belakang, serta mengembalikan fokus ke tombol pemanggil saat ditutup.
- **Mobile Responsive**: Tampilan responsif dengan rounded bottom sheet di layar HP dan card dialog elegan di desktop (`max-h-[92vh] flex flex-col`).
- **WAI-ARIA Compliant**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`.

### TypeScript Interface:
```typescript
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"; // Default: "lg"
  className?: string;
  showCloseButton?: boolean; // Default: true
  closeOnBackdrop?: boolean; // Default: true
  closeOnEscape?: boolean;   // Default: true
  footer?: React.ReactNode;
  ariaLabel?: string;
}
```

### Contoh Penggunaan (Detail Resep):
```tsx
import React, { useState } from "react";
import { Modal, Button } from "@/components/ui";

export function RecipeCardExample({ recipe }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        Lihat Resep & Takaran
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={recipe.name}
        description={`Panduan Porsi dan Tekstur Usia ${recipe.ageLabel}`}
        maxWidth="xl"
      >
        <div className="space-y-4">
          <p className="text-sm text-darkGreen-300">{recipe.description}</p>
          <h4 className="font-heading font-bold text-darkGreen text-sm">Bahan:</h4>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {recipe.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
}
```

---

## 2. Accordion Component (`Accordion.tsx`)

### Lokasi File:
`src/components/ui/Accordion.tsx`

### Peruntukan dalam Tim:
- **Syahrial & Naufal (`FAQ.tsx`)**: Tanya Jawab seputar MPASI, mitos & fakta, penanganan GTM.
- **Modul Edukasi Tambahan**: Panduan langkah higienitas makanan bertahap.

### Fitur Utama:
- **Smooth Fluid Animation**: Menggunakan teknik CSS Grid modern (`grid-template-rows: 0fr -> 1fr`) yang menjamin transisi membuka/menutup berlangsung mulus tanpa kedip dan tanpa kalkulasi pixel manual.
- **Rotating Indicator**: Ikon panah `ChevronDown` berputar 180° dengan transisi warna ke `#52765B`.
- **Multiple Mode**: Mendukung mode accordion tunggal (`allowMultiple={false}`) atau membuka banyak panel sekaligus (`allowMultiple={true}`).
- **Keyboard Accessible**: Mendukung navigasi panah atas (`ArrowUp`), panah bawah (`ArrowDown`), `Home`, dan `End` untuk berpindah antar pertanyaan.
- **Badge Kategori**: Mendukung label kategori pada setiap item pertanyaan.

### TypeScript Interface:
```typescript
export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
  category?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  defaultOpenIds?: string[];
  allowMultiple?: boolean; // Default: false
  className?: string;
}
```

### Contoh Penggunaan:
```tsx
import { Accordion } from "@/components/ui";

const FAQ_ITEMS = [
  {
    id: "kapan-mulai",
    category: "Jadwal MPASI",
    title: "Kapan waktu paling tepat untuk memulai MPASI?",
    content: (
      <p>
        Berdasarkan panduan WHO (2023) dan Kemenkes RI (2024), MPASI dimulai tepat
        saat bayi berusia genap 6 bulan (180 hari), ketika ASI saja tidak lagi
        mencukupi seluruh kebutuhan energi dan mikronutrien tubuhnya.
      </p>
    ),
  },
  {
    id: "gtm",
    category: "Tumbuh Kembang",
    title: "Bagaimana cara mengatasi Gerakan Tutup Mulut (GTM)?",
    content: (
      <p>
        Terapkan feeding rules: buat jadwal makan teratur maksimal 30 menit,
        minimalkan distraksi (gadget/mainan), dan periksa apakah tekstur makanan
        sudah sesuai dengan kemampuan oromotorik anak.
      </p>
    ),
  },
];

export function FAQSection() {
  return (
    <Accordion
      items={FAQ_ITEMS}
      defaultOpenId="kapan-mulai"
      allowMultiple={false}
    />
  );
}
```

---

## 3. Tabs Component (`Tabs.tsx`)

### Lokasi File:
`src/components/ui/Tabs.tsx`

### Peruntukan dalam Tim:
- **Juan (`AgeStages.tsx`)**: Tahapan usia MPASI (6–8 bulan, 9–11 bulan, 12–23 bulan).
- **Robi (`Recipes.tsx`)**: Filter kategori usia katalog resep.
- **Arkaan (`AboutMPASI.tsx`)**: Pemilihan topik edukasi dasar MPASI.

### Fitur Utama:
- **Dual Mode (Controlled & Uncontrolled)**:
  - Mode *Controlled*: Menggunakan `activeTab` dan `onChange` dari parent.
  - Mode *Uncontrolled*: Menggunakan internal `useState` otomatis jika `activeTab` tidak dipasok.
- **Automatic Content Rendering**: Jika prop `renderContent={true}` atau properti `content` disertakan di dalam array `tabs`, komponen otomatis menampilkan panel konten aktif dengan animasi fade-in yang halus.
- **WAI-ARIA Tablist Pattern**: Menggunakan role `tablist`, `tab`, dan `tabpanel`. Mendukung navigasi keyboard `ArrowLeft`, `ArrowRight`, `Home`, dan `End` dengan pemindahan fokus instan.
- **Responsive Scrollable**: Wadah dapat di-scroll horizontal secara halus di perangkat mobile tanpa memotong konten.
- **Badge & Icon**: Mendukung ikon visual dan penanda angka (misal: jumlah resep per kategori).

### TypeScript Interface:
```typescript
export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  renderContent?: boolean; // Default: false
  variant?: "pills" | "underlined" | "cards"; // Default: "pills"
  fullWidth?: boolean;
}
```

### Contoh Penggunaan (Tahapan Usia MPASI):
```tsx
import { useState } from "react";
import { Tabs } from "@/components/ui";

const STAGE_TABS = [
  { id: "6-8", label: "6–8 Bulan", badge: "Lumat Halus" },
  { id: "9-11", label: "9–11 Bulan", badge: "Cincang Lunak" },
  { id: "12-23", label: "12–23 Bulan", badge: "Menu Keluarga" },
];

export function AgeStageSection() {
  const [selectedAge, setSelectedAge] = useState("6-8");

  return (
    <div>
      <Tabs
        tabs={STAGE_TABS}
        activeTab={selectedAge}
        onChange={(tabId) => setSelectedAge(tabId)}
      />

      <div className="mt-6 p-6 bg-white rounded-3xl border border-primary/15">
        {selectedAge === "6-8" && <p>Panduan tekstur bubur saring kental 6–8 bulan...</p>}
        {selectedAge === "9-11" && <p>Panduan tekstur cincang halus & finger foods 9–11 bulan...</p>}
        {selectedAge === "12-23" && <p>Panduan makanan keluarga bergizi 12–23 bulan...</p>}
      </div>
    </div>
  );
}
```

---

## 4. Search Input Component (`SearchInput.tsx` / `SearchBar.tsx`)

### Lokasi File:
`src/components/ui/SearchInput.tsx` *(Re-exported via `SearchBar.tsx`)*

### Peruntukan dalam Tim:
- **Robi (`Recipes.tsx`)**: Input pencarian resep dan menu berdasarkan nama, bahan, atau deskripsi.

### Batasan Penting:
> ⚠️ **Catatan Arsitektur**: Komponen ini adalah **pure reusable UI component**. Sesuai batasan sistem, komponen ini **tidak menyimpan atau membuat mock data resep sendiri**. Seluruh logika data dan pencarian dikelola oleh parent (Robi di `Recipes.tsx`) melalui prop `value` dan callback `onChange`.

### Fitur Utama:
- **Ikon Pencarian**: Ikon `Search` Lucide berwarna primary `#52765B` di sisi kiri.
- **Tombol Hapus ('X')**: Otomatis muncul saat terdapat teks pencarian. Mengklik tombol ini atau menekan tombol `Escape` akan mengosongkan input dan memanggil `onClear`.
- **Keyboard Escape**: Menekan tombol `Escape` saat input aktif akan langsung menghapus query pencarian.
- **Aksesibilitas Lengkap**: Tag `<label>` tersembunyi (sr-only) dengan relasi `htmlFor`, fokus ring warna sage green, serta aria-label.
- **Backward Compatibility**: Diekspor sebagai `SearchInput` dan `SearchBar` sehingga pemanggilan oleh anggota tim lain tidak akan mengalami broken imports.

### TypeScript Interface:
```typescript
export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  ariaLabel?: string;
  size?: "sm" | "md" | "lg"; // Default: "md"
}

export type SearchBarProps = SearchInputProps;
```

### Contoh Penggunaan:
```tsx
import { useState } from "react";
import { SearchInput } from "@/components/ui";

export function RecipeSearch() {
  const [query, setQuery] = useState("");

  return (
    <SearchInput
      value={query}
      onChange={setQuery}
      onClear={() => setQuery("")}
      placeholder="Cari menu, ayam, salmon, brokoli..."
      className="w-full md:w-80"
    />
  );
}
```

---

## 5. Reusable Button Component (`Button.tsx`)

### Lokasi File:
`src/components/ui/Button.tsx`

### Peruntukan dalam Tim:
- Seluruh anggota tim untuk tombol aksi, trigger modal, link CTA navbar/hero, dan navigasi.

### Fitur Utama:
- **Polymorphic Dual Mode**:
  - Jika prop `href` diisi: Merender tag semantik `<a>` sebagai link CTA yang aman.
  - Jika prop `href` tidak diisi: Merender `<button type="button">`.
- **Palet Warna Sesuai Design System**:
  - `primary`: Background `#52765B`, teks putih, hover `#43624B`.
  - `secondary`: Background `#A9C4A8`, teks `#26352B`, hover `#8EAE8D`.
  - `accent`: Background `#E8B88D`, teks `#26352B`, hover `#D99965`.
  - `outline`: Border 2px `#52765B`, teks `#52765B`, hover bg `#52765B`/10.
  - `ghost`: Transparan, teks `#52765B`, hover bg `#52765B`/10.
  - `cream`: Background `#F7F4EA`, border `#52765B`/20, teks `#26352B`.
- **Loading State**: Prop `isLoading` menampilkan spinner `Loader2` yang berputar halus dan otomatis menonaktifkan klik serta menambahkan `aria-busy="true"`.
- **Icon Support**: Mendukung `iconLeft` dan `iconRight` dengan efek animasi mikro saat hover.
- **ForwardRef**: Mendukung passing `ref` langsung ke elemen DOM native.

### TypeScript Interface:
```typescript
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent" | "cream";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;   // Default: "primary"
  size?: ButtonSize;         // Default: "md"
  href?: string;             // Jika ada, merender <a>
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;       // Default: false
  isLoading?: boolean;       // Default: false
}
```

### Contoh Penggunaan:
```tsx
import { Button } from "@/components/ui";
import { ArrowRight, Download } from "lucide-react";

export function ButtonDemos() {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Tombol Utama */}
      <Button variant="primary" size="md" iconRight={<ArrowRight className="w-4 h-4" />}>
        Jelajahi Panduan
      </Button>

      {/* Link CTA ke Section */}
      <Button href="#recipes" variant="secondary" size="md">
        Lihat Katalog Resep
      </Button>

      {/* Tombol dengan Kondisi Loading */}
      <Button variant="outline" size="sm" isLoading={true}>
        Memuat Data
      </Button>
    </div>
  );
}
```

---

## 6. Back to Top Component (`BackToTop.tsx`)

### Lokasi File:
`src/components/ui/BackToTop.tsx`

### Fitur Utama:
- **Scroll Detection**: Otomatis memantau posisi scroll layar. Muncul dengan transisi fade & slide up saat posisi scroll melewati `threshold` (default: 300px), dan memudar saat berada di bagian atas halaman.
- **High Performance**: Menggunakan `window.requestAnimationFrame` dan `{ passive: true }` event listener sehingga tidak membebani rendering browser (60fps).
- **Native Smooth Scrolling**: Menggulirkan layar kembali ke atas dengan halus (`window.scrollTo({ top: 0, behavior: "smooth" })`).
- **Non-Intrusive**: Saat tidak aktif/tersembunyi, memiliki class `pointer-events-none` sehingga tidak menghalangi klik pada konten di bawahnya.
- **Floating Design**: Dilengkapi bayangan melayang elegan (`shadow-floating`), hover lift micro-animation, border transparan, dan ikon panah atas yang tegas.
- **A11y**: Memiliki `aria-label="Kembali ke bagian atas halaman"` dan `tabIndex={-1}` saat tersembunyi.

### TypeScript Interface:
```typescript
export interface BackToTopProps {
  threshold?: number;       // Default: 300 (pixel scroll)
  smooth?: boolean;         // Default: true
  className?: string;
  ariaLabel?: string;       // Default: "Kembali ke bagian atas halaman"
  showLabel?: boolean;      // Default: false
  label?: string;           // Default: "Ke Atas"
  bottomOffset?: string;    // Custom posisi bottom (cth: "bottom-8")
}
```

### Contoh Penggunaan:
Cukup dipasang di bagian bawah layout utama (`layout.tsx` atau `Footer.tsx`):
```tsx
import { BackToTop } from "@/components/ui";

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <BackToTop threshold={300} />
    </>
  );
}
```

---

## 7. Scroll Interaction Hook (`useScroll.ts`)

### Lokasi File:
`src/hooks/useScroll.ts`

### Fitur Utama:
Custom hook React terstruktur untuk mendeteksi status scroll dan section aktif:
- `scrolled`: Boolean bernilai `true` saat posisi scroll > threshold (cocok untuk background blur pada sticky navbar).
- `activeSection`: ID section yang sedang dibaca pengguna (misal: `"home"`, `"about"`, `"principles"`, `"stages"`, `"nutrition"`, `"recipes"`, `"faq"`).
- `scrollY`: Posisi vertikal scroll terkini dalam pixel.
- `scrollToTop()`: Fungsi bantuan untuk scroll ke atas secara halus.
- `scrollToSection(id, offset)`: Fungsi bantuan untuk scroll ke elemen section tertentu dengan kompensasi tinggi sticky navbar (default offset: 84px).

---

## 💡 Best Practices React Hooks pada Seluruh Komponen

1. **`"use client"` Placement**:
   Seluruh file komponen interaktif (`Modal.tsx`, `Accordion.tsx`, `Tabs.tsx`, `SearchInput.tsx`, `Button.tsx`, `BackToTop.tsx`, `useScroll.ts`) secara presisi menyertakan direktif `"use client"` di baris pertama, tanpa perlu memaksa seluruh aplikasi menjadi client component.
2. **Efisiensi Hooks**:
   - `useState` hanya digunakan untuk state lokal yang benar-benar memicu re-render visual.
   - `useEffect` selalu dilengkapi fungsi cleanup (menghapus event listener `keydown` dan `scroll`, serta mengembalikan style `document.body.style.overflow`).
   - `useRef` digunakan untuk referensi DOM (focus trap modal, tracking mouse down target pada backdrop click, input focus).
   - `useCallback` digunakan untuk fungsi callback yang diteruskan ke dependency array `useEffect` guna mencegah re-subscribing yang tidak perlu.
3. **Stateless UI Pattern**:
   Komponen `SearchInput` dirancang murni menerima data dari parent, menjamin modularitas dan kepatuhan terhadap prinsip *Single Responsibility*.

---

*Seluruh komponen telah terintegrasi di `src/components/ui/index.ts` dan siap digunakan oleh seluruh anggota tim tanpa perubahan besar.*

