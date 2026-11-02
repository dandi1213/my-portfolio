import type { Portfolio } from "./types";

export const portfolio: Portfolio = {
  name: "M Dandi Al Idrus",
  monogram: "MD",
  title: "Junior Software Developer | IT Engineer",
  tagline: "Mengembangkan solusi perangkat lunak yang praktis, terukur, dan sesuai kebutuhan pengguna.",
  intro:
    "Lulusan D4 Teknologi Rekayasa Informatika Industri dengan pengalaman di bidang pengembangan perangkat lunak dan dukungan IT. Pernah mengembangkan sistem otomatisasi WhatsApp yang terintegrasi dengan ERP serta dasbor pemantauan. Tugas akhir berfokus pada sistem pendukung keputusan pertanian berbasis IoT dan machine learning.",
  focus: ["Pengembangan Perangkat Lunak", "Pengembangan Web", "IoT Industri"],
  openTo: "Terbuka untuk peluang karier tingkat pemula di bidang software development, web development, pengembangan aplikasi, dan teknologi informasi.",
  email: "mdandialidrus08@gmail.com",
  cvPath: "/CV_M_Dandi_Al_Idrus.pdf",
  social: [
    { label: "GitHub", url: "https://github.com/dandi1213" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/m-dandi-al-idrus-b219a1247",
    },
  ],

  profile: {
    fullName: "M Dandi Al Idrus",
    photo: "/projects/FotoProfil.jpeg",
    birth: "8 Oktober 2003", // PERTIMBANGKAN dihapus: data pribadi di situs publik mudah disalahgunakan
    address: "Purwakarta",
    phone: "+62 878-2947-8221",
  },

  about: [
    "Saya lulusan D4 Teknologi Rekayasa Informatika Industri dari Politeknik Manufaktur Bandung. Saya memiliki minat pada pengembangan perangkat lunak, teknologi informasi, Internet of Things (IoT), dan otomasi industri.",
    "Selama lima bulan magang di PT Indopoly Swakarsa Industry Tbk, saya mengembangkan ulang sistem pengiriman WhatsApp yang terintegrasi dengan ERP. Perbaikan tersebut memangkas waktu pengiriman dari lebih dari 30 detik menjadi sekitar 10 detik per pesan. Saya juga mengembangkan dasbor pemantauan menggunakan React.js dan C# REST API yang digunakan oleh tim IT.",
    "Dalam tugas akhir, saya mengembangkan perangkat lunak untuk sistem pendukung keputusan pertanian berbasis IoT dan machine learning, mencakup penerimaan data sensor, backend, model machine learning, dan dasbor web. Sistem telah diterapkan secara daring dan menerima data sensor dari lahan sejak Maret 2026.",
    "Saya ingin terus mengembangkan kemampuan teknis dan berkontribusi melalui solusi teknologi yang bermanfaat, baik dalam pengembangan perangkat lunak maupun dukungan teknologi informasi.",
  ],

  // Entri pertama dianggap pendidikan terakhir. Harus tepat 2 entri.
  education: [
    {
      institution: "Politeknik Manufaktur Bandung",
      program: "D4 Teknologi Rekayasa Informatika Industri",
      logo: "/education/polman.png",
      period: "2022 – 2026",
      description: "Lulus dengan IPK 3,32/4,00. Tugas akhir berjudul sistem pendukung keputusan pertanian cerdas berbasis IoT dan machine learning, dengan aplikasi web yang menerima data sensor.",
    },
    {
      institution: "SMKN 1 Plered",
      program: "Teknik Otomasi Industri",
      logo: "/education/smkn1plered.png",
      period: "2018 – 2022",
    },
  ],

  // Pengalaman kerja / magang (kind: "work") dan organisasi (kind: "organization").
  // Urutan array = urutan tampil. Letakkan yang terbaru di atas.
  // Gambar: isi `images` dengan satu atau lebih file dari folder public/ (mis. "/experience/magang-1.jpg"),
  // atau pakai bentuk objek { src, alt, caption } untuk menambah keterangan. Kosongkan jika belum ada.
  experience: [
    {
      slug: "indopoly-internship",
      kind: "work",
      organization: "PT Indopoly Swakarsa Industry Tbk",
      role: "IT & Software Development Intern",
      employmentType: "Magang",
      period: "Februari 2025 - Juli 2025",
      location: "Purwakarta",
      description:
        "Menjalani magang selama lima bulan di divisi IT dengan fokus pada pengembangan sistem pengiriman WhatsApp terintegrasi ERP dan dasbor pemantauan. Selain itu, membantu pemantauan tiket IT serta kondisi suhu ruang server. Meraih nilai A pada Praktik Industri (PPI).",
      responsibilities: [
        "Memperbarui alur Waattach dengan menyimpan pesan ke Microsoft SQL Server terlebih dahulu, mengatur antrean berdasarkan nomor urut, dan memperbarui status pesan melalui API.",
        "Mengoptimalkan proses pengisian pesan dengan JavaScript untuk mengurangi waktu pengiriman dan ketergantungan pada panjang pesan.",
        "Mengembangkan dasbor pemantauan menggunakan React.js dan API berbasis C#, dengan Microsoft SQL Server sebagai basis data, di bawah bimbingan mentor.",
        "Menambahkan fitur pencarian dan penyaringan, detail pesan, pengiriman ulang, penghapusan pesan berstatus New, serta ekspor laporan ke Excel.",
        "Menambahkan mesin Python khusus untuk menangani pengiriman ulang pesan gagal pada masing-masing nomor WhatsApp.",
        "Memantau tiket permintaan bantuan TI dari divisi lain, meneruskannya kepada teknisi terkait, dan memeriksa suhu ruang server.",
        "Membantu mengganti komponen sensor suhu berbasis ESP8266 dan memperbarui SSL fingerprint agar pemantauan suhu tetap berjalan.",
      ],
      achievements: [
        "Memangkas waktu pengiriman pesan dari lebih dari 30 detik menjadi sekitar 10 detik, dihitung sejak pesan masuk ke database hingga terkirim.",
        "Sistem menangani hingga sekitar 1.000 pesan per hari dan tetap digunakan setelah masa magang berakhir.",
        "Meningkatkan jumlah mesin pengiriman dari dua menjadi empat untuk mendukung pengiriman pesan baru dan penanganan pesan gagal.",
        "Mendapat nilai A pada program Praktik Industri (PPI).",
      ],
      stack: ["React.js", "C#", "REST API", "Microsoft SQL Server", "Python", "Selenium", "JavaScript", "ESP8266"],
      url: "https://drive.google.com/file/d/1T2xb2MiQ4nySWIRS2-lFjGtyuL4kzeZ-/view?usp=sharing",
      projectSlug: "whatsapp-monitoring-dashboard",
      images: ["/internship/Indopoly/indopoly_0.jpeg", "/internship/Indopoly/indopoly_1.jpeg", "/internship/Indopoly/indopoly_2.png", "/internship/Indopoly/indopoly_3.png"],
    },
    {
      slug: "puskesmas-garuda-kkn",
      kind: "work",
      organization: "UPTD Puskesmas Garuda Bandung",
      role: "Pengembang Aplikasi Seluler",
      employmentType: "Proyek KKN",
      period: "Oktober 2025 - November 2025", // TODO cek periode pasti
      location: "Bandung, Indonesia",
      description: "Berkontribusi dalam pengembangan aplikasi seluler untuk mendukung proses pengumpulan dokumen di UPTD Puskesmas Garuda Bandung selama program Kuliah Kerja Nyata (KKN).",
      responsibilities: [
        "Mengembangkan aplikasi seluler menggunakan Flutter dan Dart.",
        "Mendukung digitalisasi proses pengumpulan dokumen administrasi di puskesmas.",
        "Bekerja sama dengan tim KKN untuk mengembangkan aplikasi sesuai kebutuhan instansi.",
      ],
      achievements: ["Turut mengembangkan aplikasi seluler untuk membantu proses pengumpulan dokumen administrasi."],
      stack: ["Flutter", "Dart", "Pengembangan Aplikasi Seluler"],
      url: "",
      projectSlug: "",
      images: ["/kkn/kkn_1.jpeg", "/kkn/kkn_2.png", "/kkn/kkn_3.png", "/kkn/kkn_4.png"],
    },
    {
      slug: "sanbe-farma-internship",
      kind: "work",
      organization: "PT Sanbe Farma",
      role: "Maintenance & Automation Intern",
      employmentType: "Magang",
      period: "Oktober 2021 - Desember 2021",
      location: "Bandung, Indonesia",
      description: "Mendukung tim Pemeliharaan dan Otomasi dalam perawatan serta penanganan kendala mesin produksi otomatis di lingkungan manufaktur farmasi.",
      responsibilities: [
        "Membantu teknisi melaksanakan pemeliharaan preventif dan menangani kendala pada mesin produksi otomatis.",
        "Membantu proses konfigurasi dan pemrograman PLC di bawah pengawasan teknisi.",
        "Membantu pekerjaan pengawatan listrik dan pemasangan mesin baru.",
        "Mempelajari penerapan otomasi industri, pemeliharaan peralatan, dan pemecahan masalah secara sistematis.",
      ],
      achievements: ["Memperoleh pengalaman langsung dalam otomasi industri dan praktik pemeliharaan di lingkungan manufaktur.", "Membangun pemahaman dasar tentang sistem PLC, pengawatan listrik, dan peralatan produksi otomatis."],
      stack: ["PLC", "Otomasi Industri", "Pemeliharaan Preventif", "Pemecahan Masalah", "Pengawatan Listrik"],
      url: "",
      projectSlug: "",
      images: ["/internship/SanbeFarma/sanbe_1.JPG", "/internship/SanbeFarma/sanbe_2.JPG", "/internship/SanbeFarma/sanbe_3.jpg", "/internship/SanbeFarma/sanbe_4.JPG", "/internship/SanbeFarma/sanbe_5.JPG"],
    },
    {
      slug: "hima-organization",
      kind: "organization",
      organization: "Himpunan Mahasiswa Teknik Otomasi Manufaktur dan Mekatronika",
      role: "Staf Ahli Divisi Sarana dan Prasarana",
      employmentType: "Organisasi",
      period: "2024 - 2026", // TODO cek: di CV tertulis 2024 – 2025
      description: "Mendukung kegiatan organisasi mahasiswa di bidang otomasi manufaktur dan mekatronika melalui pengelolaan sarana, prasarana, dan kebutuhan logistik.",
      responsibilities: [
        "Menyiapkan fasilitas dan perlengkapan yang dibutuhkan untuk kegiatan organisasi.",
        "Bekerja sama dengan anggota divisi dan panitia untuk memastikan persiapan acara berjalan lancar.",
        "Membantu koordinasi perlengkapan dan kebutuhan logistik kegiatan organisasi.",
      ],
      achievements: ["Mendukung pelaksanaan kegiatan organisasi melalui persiapan fasilitas dan koordinasi perlengkapan."],
      images: ["/Organization/himamo/himamo_1.JPG", "/Organization/himamo/himamo_2.JPG", "/Organization/himamo/himamo_3.jpg"],
      isDemo: false,
    },
  ],

  projects: [
    {
      slug: "whatsapp-monitoring-dashboard",
      title: "Perombakan Sistem WhatsApp (Waattach) dan Dasbor Pemantauan Terintegrasi ERP",
      summary: "Pengembangan ulang sistem pengiriman WhatsApp otomatis yang terintegrasi dengan ERP, dilengkapi dasbor web untuk memantau status, menelusuri riwayat, dan mengirim ulang pesan.",

      problem:
        "Sistem awal menggunakan Python dan Selenium tanpa API maupun basis data. Pesan diproses langsung dari permintaan URL, sehingga antrean tidak terkelola dengan baik dan riwayat pesan gagal tidak tersedia. Dalam kondisi tertentu, pesan dapat menumpuk atau tergabung. Proses pengisian pesan per karakter juga membuat pengiriman memerlukan lebih dari 30 detik per pesan, sementara dasbor pemantauan belum tersedia.",

      role: "Mengembangkan sebagian besar komponen sistem secara mandiri, termasuk struktur basis data, mesin Python, dan alur pengiriman. Pengembangan API C# dan dasbor React.js dilakukan dengan bimbingan mentor dan diintegrasikan ke ERP perusahaan.",

      process:
        "Pesan kini masuk ke tabel SQL Server (berisi nomor sequence berformat tanggal, prioritas, mode, nomor tujuan, isi pesan, dan status) lewat API C#. Mesin Python mengambil 10 pesan teratas berstatus New atau Failed berdasarkan sequence terkecil, menandainya Proses, mencari nomor di WhatsApp Web, mengisi pesan dengan injeksi JavaScript, lalu memperbarui status menjadi Sent atau Failed lewat API. Mesin ditambah menjadi empat: untuk tiap nomor (Ipol Center dan HR Center) ada satu mesin pesan baru dan satu mesin pesan gagal. Dasbor dibangun dengan React.js dan terhubung ke API C#.",

      outcome:
        "Waktu pengiriman berkurang dari lebih dari 30 detik menjadi sekitar 10 detik per pesan dan tidak lagi terlalu bergantung pada panjang pesan. Pesan tersimpan beserta statusnya, dengan volume hingga sekitar 1.000 pesan per hari. Dasbor digunakan tim IT untuk memantau pesan, menelusuri kendala, dan mengirim ulang pesan gagal. Sistem tetap digunakan setelah masa magang berakhir.",

      features: [
        "Pemantauan status pesan secara langsung",
        "Pencarian dan penyaringan data pesan",
        "Halaman detail pesan",
        "Kirim ulang pesan (apa pun statusnya) dengan konfirmasi",
        "Hapus pesan yang masih berstatus New",
        "Export laporan harian atau mingguan ke Excel",
        "Pilihan tema gelap dan terang",
        "Antrean pesan berurutan berdasarkan sequence, status, dan mode (umum atau HR)",
        "Empat mesin pengiriman: mesin pesan baru dan mesin pesan gagal untuk tiap nomor",
        "Integrasi dengan ERP perusahaan",
      ],

      stack: ["React.js", "C#", "REST API", "Microsoft SQL Server", "Python", "Selenium", "JavaScript"],

      repoUrl: "",
      demoUrl: "",
      images: [
        "/projects/indopoly/indopoly_0.jpeg",
        "/projects/indopoly/indopoly_1.png",
        "/projects/indopoly/indopoly_2.png",
        "/projects/indopoly/indopoly_3.png",
        "/projects/indopoly/indopoly_4.png",
        "/projects/indopoly/indopoly_5.png",
        "/projects/indopoly/indopoly_6.png",
        "/projects/indopoly/indopoly_7.png",
        "/projects/indopoly/indopoly_8.png",
        "/projects/indopoly/indopoly_9.png",
        "/projects/indopoly/indopoly_10.png",
        "/projects/indopoly/indopoly_11.png",
        "/projects/indopoly/indopoly_12.png",
      ],

      isDemo: false,
    },

    {
      slug: "smart-agriculture-iot-machine-learning",
      title: "Sistem Pendukung Keputusan Pertanian Cerdas",
      summary:
        "Proyek tugas akhir yang menggabungkan data sensor lahan berbasis IoT dan data cuaca untuk merekomendasikan jenis tanaman serta memperkirakan kebutuhan air irigasi harian menggunakan machine learning. Sistem telah diterapkan secara daring dan menerima data sensor dari lahan di Cikajang, Garut sejak Maret 2026.",
      problem:
        "Kebutuhan pengambilan keputusan pertanian mencakup pemilihan tanaman dan perencanaan irigasi, dengan mempertimbangkan kondisi tanah serta cuaca. Proyek ini menggabungkan informasi tersebut dalam satu platform pendukung keputusan.",
      role: "Mengembangkan komponen perangkat lunak, mulai dari penerimaan data sensor, backend, basis data, model machine learning, hingga dasbor web. Perancangan dan pembuatan perangkat keras sensor serta gateway berada di luar lingkup pekerjaan saya. Proyek dikerjakan bersama kampus dan mitra pemerintah daerah di Garut.",
      process:
        "Data sensor Dragino diterima lewat webhook jaringan LoRaWAN ke backend FastAPI, divalidasi, lalu disimpan di MongoDB bersama data cuaca dari OpenWeatherMap dan Open-Meteo. Dua model Random Forest (Pipeline scikit-learn) dilatih dari dataset publik: classifier (Kaggle, 2.200 data, 22 jenis tanaman) dan regressor (GitHub, 3.000 data, 10 jenis tanaman). Variabel ET₀ dan Kc dibuang dari fitur regresi untuk mencegah data leakage. Backend dideploy di Render dan frontend di Vercel.",
      outcome:
        "Model klasifikasi mencapai akurasi 91,59% dengan weighted F1 sebesar 0,92. Model regresi menghasilkan MAE 0,35 mm/hari dan R² sekitar 0,55 setelah fitur yang berpotensi menyebabkan data leakage dikeluarkan. Sebanyak 41 skenario pengujian black-box pada lima modul API berhasil dijalankan. Sistem menerima data sensor setiap 20 menit sejak Maret 2026. Model masih perlu divalidasi menggunakan data dari lebih banyak lokasi.",
      features: [
        "Rekomendasi tiga tanaman teratas beserta skor kepercayaan",
        "Prediksi kebutuhan air irigasi harian (mm/hari, dikonversi ke liter berdasarkan luas lahan)",
        "Analisis harian kondisi tanah (Kering, Optimal, Basah) dengan rekomendasi penyiraman",
        "Perencanaan masa tanam berbasis data klimatologi",
        "Riwayat data dalam bentuk tabel dan grafik",
        "Pengaturan konfigurasi lahan",
        "Penerimaan data sensor via webhook dengan autentikasi",
      ],
      stack: ["Python", "FastAPI", "MongoDB", "Scikit-learn", "Pandas", "Random Forest", "LoRaWAN", "IoT", "JavaScript", "Bootstrap", "Vercel", "Render"],
      repoUrl: "", // repo masih private; isi setelah dipublikasikan
      demoUrl: "https://ta-frontend-polman-bandung.vercel.app/",
      images: [
        { src: "/projects/TA/ta_1.png", caption: "Dasbor Sistem" },
        { src: "/projects/TA/ta_5.png", caption: "Ikhtisar Sistem" },
        { src: "/projects/TA/ta_2.jpeg", caption: "Demonstrasi Sistem kepada Penguji" },
        { src: "/projects/TA/ta_3.jpeg", caption: "Rangkaian Sensor" },
        { src: "/projects/TA/ta_4.jpeg", caption: "Penerapan Sensor Tanah dan Daun" },
      ],
      isDemo: false,
    },
    {
      slug: "puskesmas-garuda-document-collection-app",
      title: "Aplikasi Seluler Pengumpulan Dokumen Puskesmas Garuda",
      summary: "Aplikasi seluler yang dikembangkan untuk mendukung pengumpulan dokumen di UPTD Puskesmas Garuda Bandung selama program Kuliah Kerja Nyata (KKN).",
      problem: "Proyek ini bertujuan mendukung proses pengumpulan dokumen di UPTD Puskesmas Garuda Bandung melalui aplikasi seluler.",
      role: "Mengembangkan aplikasi seluler menggunakan Flutter dan Dart bersama tim Kuliah Kerja Nyata (KKN).",
      process: "Mengembangkan aplikasi seluler menggunakan Flutter dan Dart berdasarkan kebutuhan instansi.",
      outcome: "Menghasilkan kontribusi pada aplikasi seluler yang mendukung pengumpulan dokumen administrasi di UPTD Puskesmas Garuda Bandung.",
      features: ["Aplikasi seluler untuk pengumpulan dokumen", "Dukungan digital untuk pengelolaan dokumen administrasi"],
      stack: ["Flutter", "Dart", "Pengembangan Aplikasi Seluler"],
      repoUrl: "",
      demoUrl: "",
      images: ["/kkn/kkn_1.jpeg", "/kkn/kkn_2.png", "/kkn/kkn_3.png", "/kkn/kkn_4.png"],
      isDemo: false,
    },
    {
      slug: "esp32-iot-web-configuration-system",
      title: "Sistem Pemantauan IoT dan Konfigurasi Web Berbasis ESP32",
      summary: "Sistem IoT berbasis ESP32 yang menyediakan antarmuka web untuk mengatur koneksi Wi-Fi, memilih mode komunikasi, dan menentukan sensor yang digunakan.",
      problem: "Perubahan pengaturan komunikasi perangkat IoT sering kali memerlukan pemrograman ulang firmware. Proyek ini menyediakan antarmuka web agar konfigurasi tertentu dapat diubah melalui browser tanpa mengunggah ulang program.",
      role: "Berkolaborasi mengembangkan sistem konfigurasi berbasis ESP32 yang memungkinkan pengguna mengatur Wi-Fi, memilih mode komunikasi, dan menentukan sensor melalui browser.",
      process:
        "Membangun antarmuka konfigurasi web menggunakan Arduino IDE dan pustaka ESP32. Fitur yang dikembangkan mencakup mode Wi-Fi Access Point dan Station, pemilihan mode komunikasi, serta pemantauan status perangkat. Sistem juga mendukung opsi komunikasi GSM melalui SIM800 dan LoRa melalui modul RFM95/SX1276.",
      outcome:
        "Menghasilkan sistem konfigurasi web yang memungkinkan pengguna mengatur kredensial Wi-Fi, memilih komunikasi GSM, Wi-Fi, atau LoRa, menentukan sensor yang didukung, dan memantau status perangkat tanpa memprogram ulang ESP32.",
      features: [
        "Web server dan dasbor konfigurasi bawaan ESP32",
        "Konfigurasi WiFi Access Point dan Station",
        "Pengelolaan kredensial WiFi dan koneksi ulang otomatis",
        "Mode komunikasi GSM menggunakan SIM800",
        "Mode komunikasi LoRa menggunakan RFM95/SX1276",
        "Pemilihan sensor LoRa untuk ketinggian air dan NPK",
        "Pemantauan status perangkat secara langsung",
        "Penyimpanan konfigurasi persisten",
      ],
      stack: ["ESP32", "Arduino IDE", "C/C++", "HTML", "CSS", "JavaScript", "Wi-Fi", "WebServer", "GSM", "LoRa", "IoT"], // TODO cek: sebelumnya "LoRaWAN", padahal deskripsi memakai modul RFM95 (LoRa),
      repoUrl: "",
      demoUrl: "",
      images: ["/pbl/pbl_1.png", "/pbl/pbl_2.png"],
      isDemo: false,
    },
    {
      slug: "drilling-control-operation-mes",
      title: "Operasi Kendali Pengeboran – Sistem Eksekusi Manufaktur",
      summary: "Proyek simulasi otomasi industri yang mengintegrasikan kendali pengeboran berbasis PLC dengan antarmuka pemantauan Node-RED dalam konteks Manufacturing Execution System (MES).",
      problem: "Proyek ini mengeksplorasi integrasi kendali mesin dan antarmuka pemantauan untuk menampilkan status operasi, mengendalikan motor, serta menyajikan informasi melalui dasbor.",
      role: "Berkolaborasi mengembangkan simulasi kendali dan pemantauan pengeboran menggunakan PLC dan Node-RED. Pekerjaan mencakup logika kendali motor, antarmuka HMI, komunikasi PLC, dan visualisasi status operasi.",
      process:
        "Menyusun logika kendali pada lingkungan ctrlX dan mengonfigurasi alur Node-RED untuk dasbor serta komunikasi PLC. Simulasi mencakup kendali motor maju-mundur, logika operasi sederhana, tampilan HMI, dan visualisasi status sistem.",
      outcome:
        "Menghasilkan prototipe simulasi kendali pengeboran yang menghubungkan logika PLC dengan antarmuka Node-RED untuk menampilkan status dan fungsi kendali dasar. Proyek ini menjadi latihan integrasi sistem otomasi dan pemantauan berbasis perangkat lunak.",
      features: [
        "Pengoperasian pengeboran manual dan otomatis",
        "Kendali motor maju dan mundur berbasis PLC",
        "Integrasi limit switch dan pengurutan siklus otomatis",
        "Dasbor Node-RED dengan fungsi masuk dan keluar",
        "Animasi mesin pengeboran berbasis SVG",
        "Pemantauan status mesin dan sensor secara langsung",
        "Visualisasi data sensor menggunakan grafik",
        "Pencatatan waktu operasi mesin",
        "Perhitungan dan visualisasi OEE",
        "Integrasi PLC dan dasbor menggunakan ctrlX dan Node-RED",
      ],
      stack: ["Bosch Rexroth ctrlX", "PLC", "Node-RED", "JavaScript", "SVG", "Otomasi Industri", "Sistem Eksekusi Manufaktur (MES)", "OEE"],
      repoUrl: "https://drive.google.com/file/d/12Pmb_1e9CjXzcDmS2qsMZ5WGkOao5_Q7/view?usp=sharing",
      demoUrl: "",
      images: [
        { src: "/projects/MES/mes_1.png", caption: "Ikhtisar Sistem" },
        { src: "/projects/MES/mes_2.png", caption: "Dasbor Kendali dan Pemantauan" },
        { src: "/projects/MES/mes_3.png", caption: "Dasbor Visualisasi Data" },
        { src: "/projects/MES/mes_4.png", caption: "Diagram Logika Ladder PLC" },
        { src: "/projects/MES/mes_5.png", caption: "Visualisasi pada Perangkat Lunak CODESYS CtrlX" },
        { src: "/projects/MES/mes_6.png", caption: "Ikhtisar Flow Node-RED" },
      ],
      isDemo: false,
    },
  ],

  certificates: [
    {
      name: "TOEFL ITP (Skor 418)", // TODO cek jenis tes dan skor pada sertifikat
      issuer: "PT. MAIRODI MANDIRI SEJAHTERA",
      year: "2024",
      image: "/certificate/TOEFL.png",
      url: "https://drive.google.com/file/d/1uPmvCE9Hvk0wpyT6ZIZmyZuqQfW7xLp_/view?usp=sharing",
    },
    {
      name: "Webinar Penerapan dan Implementasi Otomasi Industri di Industri Manufaktur",
      issuer: "Kampus Merdeka", // TODO cek: di CV tertulis penyelenggara Universitas Pelita Bangsa
      year: "2024",
      image: "/certificate/webinar.png",
      url: "https://drive.google.com/file/d/1tgb_HW2VgPFaJJjdcNpqF82SrICZxI1D/view?usp=sharing",
    },
    {
      name: "Pelatihan Dasar Pemrograman Python",
      issuer: "Program Kartu Prakerja",
      year: "2023",
      image: "/certificate/E-SERTIFIKAT_KOMPETENSI.png",
      url: "https://drive.google.com/file/d/1VZt7h7PJHI_77MWV0zl1YmX4mGUzjr5T/view?usp=sharing",
    },
    {
      name: "Sertifikat Uji Kompetensi",
      issuer: "SMKN 1 Plered",
      year: "2022",
      image: "/certificate/UJIKOM_SMK.png",
      url: "https://drive.google.com/file/d/1jpF300mhDxuFxR3kzFw_5cKF6BvJQDWY/view?usp=sharing",
    },
  ],

  awards: [
    {
      title: "Juara 1 - Perakitan Smartcar Bluetooth",
      issuer: "Robonesia, UPTD TIKOMDIK & Dinas Pendidikan Provinsi Jawa Barat",
      year: "2021",
      description:
        "Meraih juara 1 kategori Perakitan Smartcar Bluetooth pada J.E.R.C. (Jabar Robotic Expo & Competition) yang diselenggarakan pada 31 Mei hingga 5 Juni 2021 oleh Robonesia, bekerja sama dengan UPTD Teknologi Informasi dan Komunikasi Pendidikan (TIKOMDIK) serta Dinas Pendidikan Provinsi Jawa Barat.",
      url: "https://drive.google.com/file/d/13x3PeQEWZxYH992RZh659NfV2Nikg7Ad/view?usp=sharing",
    },
    // DIKELUARKAN: entri "Sistem Pendukung Keputusan Pertanian Cerdas..." (Politeknik Manufaktur Bandung, 2026)
    // karena itu tugas akhir, bukan penghargaan, dan sudah tampil di bagian Proyek.
    // Jika TA memang mendapat penghargaan/nilai khusus, tulis nama penghargaannya di sini.
    {
      title: "Analisis Tingkat Pemahaman Mahasiswa Teknologi Rekayasa Informatika Industri terhadap Penggunaan Bahasa Pemrograman JavaScript",
      issuer: "Informatika Dan Teknologi (INTECH)", // TODO cek status: sudah terbit atau baru submit?
      year: "2026",
      description:
        "Melakukan penelitian untuk menganalisis tingkat pemahaman mahasiswa Teknologi Rekayasa Informatika Industri terhadap penggunaan bahasa pemrograman JavaScript. Penelitian ini bertujuan menilai pengetahuan pemrograman mahasiswa, mengidentifikasi kendala dalam memahami konsep JavaScript, serta mengevaluasi pemahaman mereka tentang penerapannya dalam pemrograman.",
      url: "",
    },
  ],

  // Logo: taruh file di public/assets/tech/ dengan nama yang sama seperti path di bawah.
  // Logo BARU yang perlu ditambahkan: fastapi.svg, bootstrap.svg, flutter.svg, nodered.svg
  techStack: [
    {
      category: "Bahasa Pemrograman",
      items: [
        { name: "Python", logo: "/assets/tech/python.png" },
        { name: "JavaScript", logo: "/assets/tech/javascript.png" },
        { name: "C#", logo: "/assets/tech/csharp.svg" },
        { name: "PHP", logo: "/assets/tech/php.svg" },
      ],
    },
    {
      category: "Pengembangan Web",
      items: [
        { name: "React.js", logo: "/assets/tech/react.svg" },
        { name: "FastAPI", logo: "/assets/tech/fastapi.svg" },
        { name: "HTML", logo: "/assets/tech/html.svg" },
        { name: "CSS", logo: "/assets/tech/css.svg" },
        { name: "Bootstrap", logo: "/assets/tech/bootstrap.svg" },
      ],
    },
    {
      category: "Pengembangan Seluler",
      items: [{ name: "Flutter", logo: "/assets/tech/flutter.svg" }],
    },
    {
      category: "Basis Data",
      items: [
        { name: "Microsoft SQL Server", logo: "/assets/tech/sql_server.svg" },
        { name: "MongoDB", logo: "/assets/tech/mongodb.svg" },
        { name: "MySQL", logo: "/assets/tech/mysql.svg" },
      ],
    },
    {
      category: "Alat & Otomasi",
      items: [
        { name: "Git", logo: "/assets/tech/git.svg" },
        { name: "Selenium", logo: "/assets/tech/selenium.svg" },
        { name: "Node-RED", logo: "/assets/tech/nodered.svg" },
      ],
    },
    {
      category: "Data & Pembelajaran Mesin",
      items: [
        { name: "Scikit-learn", logo: "/assets/tech/scikit-learn.svg" },
        { name: "Pandas", logo: "/assets/tech/pandas.svg" },
      ],
    },
    {
      category: "IoT & Otomasi Industri",
      items: [
        { name: "ESP32", logo: "/assets/tech/esp32.svg" },
        { name: "Arduino", logo: "/assets/tech/arduino.svg" },
        { name: "PLC", logo: "/assets/tech/plc.svg" },
      ],
    },
  ],

  seo: {
    title: "M Dandi Al Idrus — Junior Software Developer",
    description:
      "Portofolio M Dandi Al Idrus, lulusan D4 Teknologi Rekayasa Informatika Industri dengan pengalaman pengembangan perangkat lunak, integrasi WhatsApp-ERP, serta sistem pendukung keputusan pertanian berbasis IoT dan machine learning.",
  },
};
