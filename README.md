# Website Portofolio Pribadi — Panduan Lengkap VS Code

Proyek ini adalah aplikasi React + TypeScript + Tailwind CSS yang sudah dikonversi secara modular dari file `personal_portfolio_website.tsx` dengan mempertahankan 100% tampilan visual, animasi, dan interaksi aslinya.

---

## 1. Cara Instalasi & Menjalankan di VS Code

1. **Ekstrak File ZIP** ke folder pilihan Anda di komputer.
2. **Buka Folder di VS Code**:
   - Buka Visual Studio Code.
   - Klik **File > Open Folder...** dan pilih folder `my-portfolio`.
3. **Instal Dependencies**:
   - Buka terminal di VS Code (`Ctrl + \`` di Windows/Linux atau `Cmd + \`` di Mac).
   - Jalankan perintah berikut:
     ```bash
     npm install
     ```
4. **Jalankan Server Lokal**:
   ```bash
   npm run dev
   ```
5. **Buka di Browser**: Klik tautan lokal yang muncul di terminal (biasanya `http://localhost:5173`).

---

## 2. Panduan Mengedit Data Portofolio (`src/data/portfolioData.ts`)

Semua informasi di website terpusat di satu file: **`src/data/portfolioData.ts`**. Anda cukup mengedit file ini tanpa menyentuh kode komponen UI.

### A. Mengedit Nama, Biodata, Kontak & Media Sosial
Buka `src/data/portfolioData.ts` dan ubah bagian `personal`:
- `brandName`: Nama logo di pojok kiri atas navbar & footer.
- `fullName`: Nama lengkap Anda.
- `roles`: Daftar profesi untuk efek animasi mengetik (typing effect).
- `heroBio`: Deskripsi singkat di bawah nama pada halaman utama.
- `aboutParagraphs`: Paragraf cerita tentang diri Anda di bagian *About Me*.
- `email` & `socials`: Alamat email serta tautan GitHub, LinkedIn, dan Instagram.

### B. Mengganti Foto Profil & Menambah Gambar Baru
1. Siapkan file gambar Anda (misalnya `foto-profil.jpg` atau `proyek-1.png`).
2. Simpan gambar tersebut ke dalam folder **`public/images/`**.
3. Pada `src/data/portfolioData.ts`, ubah path gambar menjadi `'/images/foto-profil.jpg'` (atau tetap gunakan URL gambar online `https://...`).

### C. Menambah atau Menghapus Proyek
Cari bagian `projects: [ ... ]` di `src/data/portfolioData.ts`.
- **Menghapus proyek**: Hapus satu blok `{ id: '...', ... }` dari dalam array `projects`.
- **Menambah proyek**: Salin salah satu blok `{ id: '...', ... }`, tempel di dalam array `projects`, ubah `id` menjadi unik (misal `'proj-6'`), dan sesuaikan judul, deskripsi, gambar (`images`), link demo (`liveUrl`), dan repository (`repoUrl`).

### D. Mengubah Skills (Keahlian)
Cari bagian `skills: [ ... ]`. Tambahkan atau hapus item sesuai keahlian Anda. Nilai `key` yang didukung ikon berwarna: `react`, `nextjs`, `typescript`, `javascript`, `tailwind`, `html5`, `css3`, `nodejs`, `graphql`, `git`, `vite`, `postgresql`.

### E. Mengubah Pendidikan & Pengalaman Kerja
- **Pendidikan**: Edit bagian `education: [ ... ]`.
- **Pengalaman Kerja / Freelance / Organisasi**: Edit bagian `experience: [ ... ]`. Pastikan nilai `type` diisi dengan `'Work Experience'`, `'Freelance'`, atau `'Organization'` agar tombol filter tab berfungsi optimal.
