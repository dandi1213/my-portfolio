# Developer Portfolio

Website portfolio statis: React + Vite + TypeScript + Tailwind CSS. Tanpa backend, siap di-deploy ke Vercel/Netlify.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build produksi ke dist/
npm run preview    # coba hasil build
```

## Cara personalisasi

Semua konten ada di **`src/data/portfolio.ts`** (tipe datanya di `src/data/types.ts`). Anda tidak perlu mengubah komponen.

- Teks `[SEPERTI INI]` adalah placeholder. Ganti semuanya.
- `skills`, `projects`, `timeline` berisi **contoh**. Hapus yang tidak sesuai kenyataan.
- Project: hapus `isDemo: true` setelah diganti dengan proyek asli. Letakkan screenshot di `public/projects/` lalu isi `image: '/projects/nama.png'`. Kosongkan `repoUrl`/`demoUrl` jika tidak ada; tombolnya otomatis tidak ditampilkan.
- CV: taruh PDF di `public/` lalu isi `cvPath: '/cv-nama.pdf'`.
- Link/email yang belum diisi tampil sebagai tombol nonaktif, bukan link palsu.
- Meta tag awal ada di `index.html` (ganti juga di sana). Untuk gambar preview link (`og:image`), tambahkan file ke `public/` dan tambahkan tag `<meta property="og:image" content="https://DOMAIN-ANDA/og.png">`.
- Warna ada di `src/index.css` (variabel CSS `--accent`, dll, untuk dark dan light).

## Keputusan arsitektur

- **Tanpa library animasi.** Animasi hanya CSS (masuknya hero) dan menghormati `prefers-reduced-motion`.
- **Form kontak** membuka aplikasi email pengunjung (`mailto:`). Tidak ada server, jadi pasti bekerja tanpa konfigurasi. Jika ingin pengiriman langsung, gunakan layanan seperti Formspree atau Web3Forms dan ubah `onSubmit` di `src/sections/Contact.tsx`.
- **Routing** memakai `react-router-dom` untuk halaman detail proyek (`/projects/:slug`). Fallback SPA sudah disiapkan di `vercel.json` dan `public/_redirects` (Netlify).

## Upload ke GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
# buat repo kosong di github.com/new, lalu:
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

## Deploy ke Vercel

1. Buka vercel.com, login dengan GitHub.
2. **Add New → Project**, pilih repo ini.
3. Framework akan terdeteksi sebagai Vite (build `npm run build`, output `dist`). Klik **Deploy**.
4. Domain kustom: **Settings → Domains → Add**, lalu atur DNS di penyedia domain sesuai instruksi Vercel (record A/CNAME).

## Checklist sebelum publik

- [ ] Nama, monogram, title, intro, tagline
- [ ] Email, GitHub, LinkedIn
- [ ] File CV + `cvPath`
- [ ] Teks About
- [ ] Skills: hanya yang benar-benar Anda kuasai
- [ ] Proyek asli (deskripsi, peran, hasil jujur, repo/demo, screenshot), hapus `isDemo`
- [ ] Timeline: pendidikan, magang, sertifikat yang nyata
- [ ] Experience: periode pasti magang, hapus/ganti entri organisasi contoh (`isDemo: true`)
- [ ] `<title>` dan meta di `index.html`, plus `og:image`
- [ ] Cari `[` di `src/` dan `index.html` untuk memastikan tidak ada placeholder tersisa

## Tes

`npm test` menjalankan tes navigasi (klik di homepage dan halaman proyek). Tes ini memakai jsdom, bukan browser sungguhan.

## Catatan CV

File CV harus benar-benar ada di `public/` (mis. `public/cv-nama.pdf`) dan `cvPath` harus sama (`'/cv-nama.pdf'`). Jika file tidak ada, hosting akan mengembalikan halaman website, bukan PDF.

## Struktur halaman (single-page)

Halaman utama `/` berisi 5 section berurutan: **Home → About → Experience → Portfolio → Contact** (`src/pages/Home.tsx`).
Experience diletakkan setelah About (yang berakhir dengan riwayat pendidikan) dan sebelum Portfolio, sehingga alurnya: siapa saya → pendidikan → pengalaman → hasil karya → kontak.
Menu navbar adalah anchor `#home`, `#about`, `#experience`, `#portfolio`, `#contact` dengan smooth scroll (CSS `scroll-behavior` + `scroll-padding-top` agar judul tidak tertutup navbar). Tidak ada perpindahan route.

Detail kategori Portfolio adalah halaman terpisah (tidak ada di navbar), dengan tombol kembali ke section Portfolio:

| URL | Isi |
| --- | --- |
| `/experience/:slug` | Detail satu pengalaman (kerja/magang/organisasi) + galeri gambar |
| `/portfolio/projects`, `/portfolio/projects/:slug` | Daftar proyek dan studi kasus |
| `/portfolio/certificates` | Sertifikat |
| `/portfolio/awards` | Penghargaan |
| `/portfolio/tech-stack` | Teknologi dengan logo |

URL lama `/about`, `/experience`, `/portfolio`, `/contact` otomatis diarahkan ke section yang sesuai.

Semua konten ada di `src/data/portfolio.ts` (`profile`, `education`, `experience`, `certificates`, `awards`, `techStack`, `projects`).
Logo Tech Stack: taruh file di `public/assets/tech/` (lihat README.txt di folder itu).
Foto profil: taruh di `public/` lalu isi `profile.photo`. Gambar sertifikat: isi `image` pada tiap sertifikat.

## Experience (pengalaman kerja, magang, organisasi)

Data ada di `experience` pada `src/data/portfolio.ts`. Urutan array = urutan tampil (terbaru di atas). `kind: "work"` masuk grup *Work & internship*, `kind: "organization"` masuk grup *Organizations*. Grup yang kosong otomatis disembunyikan; jika `experience` kosong, section dan menu Experience ikut hilang.

Tambah entri baru dengan menyalin salah satu objek yang ada:

```ts
{
  slug: "nama-unik-tanpa-spasi",        // dipakai di URL /experience/nama-unik-tanpa-spasi
  kind: "work",                          // atau "organization"
  organization: "Nama Perusahaan / Organisasi",
  role: "Posisi / Jabatan",
  employmentType: "Internship",          // opsional (label kecil)
  period: "Feb 2025 – Jun 2025",
  location: "Kota, Provinsi",            // opsional
  logo: "/experience/logo.png",          // opsional; tanpa logo tampil inisial
  description: "Ringkasan 1-2 kalimat (tampil di halaman utama).",
  responsibilities: ["Tanggung jawab 1", "Tanggung jawab 2"],
  achievements: ["Pencapaian / kontribusi"],   // opsional
  stack: ["React.js", "Python"],                // opsional
  projectSlug: "slug-proyek-terkait",          // opsional, menautkan ke studi kasus
  images: [ "/experience/foto-1.jpg", { src: "/experience/foto-2.jpg", caption: "Foto bersama tim" } ],
}
```

Kartu di halaman utama menampilkan ringkasan; "View details" membuka `/experience/:slug` dengan seluruh isi dan galeri.

## Galeri multi-gambar

Berlaku untuk **projects, certificates, awards, dan experience**. Cara pakai sama di semua kategori:

1. Taruh file gambar di `public/` (mis. `public/experience/foto-1.jpg`, `public/projects/…`, `public/certificate/…`).
2. Isi `images` pada item di `src/data/portfolio.ts`:

```ts
images: [
  "/projects/halaman-utama.png",
  { src: "/projects/detail.png", alt: "Halaman detail pesan", caption: "Detail pesan dan tombol kirim ulang" },
],
```

- Setiap elemen boleh berupa string (path) atau objek `{ src, alt?, caption? }`.
- **Data lama tetap jalan**: field `image: "/path.png"` (satu gambar) masih didukung. Jika `images` diisi, ia dipakai menggantikan `image`.
- 0 gambar: placeholder (projects/certificates) atau tidak ada galeri (experience/awards). 1 gambar: tampil biasa tanpa kontrol carousel. 2+ gambar: carousel dengan tombol panah, titik indikator, penghitung "1 / 3", geser (swipe) di layar sentuh, dan tombol panah keyboard.
- Klik gambar membuka tampilan besar (Esc / tombol X / klik di luar untuk menutup, panah/swipe untuk berpindah). Ini overlay, bukan halaman baru, sehingga navigasi tidak terganggu.
- Gambar ditampilkan utuh dalam bingkai 16:9 (tidak dipotong dan tidak terdistorsi); rasio lain diberi bidang kosong di sisinya. Kartu daftar proyek tetap memakai gambar pertama sebagai thumbnail dan menampilkan jumlah gambar.

Komponen yang dipakai ulang: `src/components/ImageGallery.tsx` (carousel), `src/components/Lightbox.tsx` (tampilan besar), `src/lib/images.ts` (normalisasi data `image`/`images`). Untuk memakainya di bagian baru: `<ImageGallery images={getGalleryImages(item, 'label')} label="label" />`.
