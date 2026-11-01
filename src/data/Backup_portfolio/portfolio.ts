import type { Portfolio } from "./types";

export const portfolio: Portfolio = {
  name: "M Dandi Al Idrus",
  monogram: "MD",
  title: "Junior Software Developer",
  tagline: "Membangun solusi perangkat lunak praktis untuk berbagai kebutuhan nyata.",
  intro:
    "Lulusan D4 Teknologi Rekayasa Informatika Industri dengan pengalaman magang selama 5 bulan di PT Indopoly Swakarsa Industry Tbk divisi IT dan pengembangan perangkat lunak, termasuk aplikasi web terintegrasi ERP dan otomasi WhatsApp.",
  focus: ["Pengembangan Perangkat Lunak", "Pengembangan Web", "IoT Industri"],
  openTo: "Terbuka untuk peluang tingkat pemula di bidang pengembangan perangkat lunak, pengembangan web, pengembangan aplikasi, dan TI.",
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
    fullName: "M Dandi Al Idrus", // ganti jika nama lengkap Anda berbeda
    photo: "/projects/FotoProfil.jpeg", // contoh: "/profile.jpg" (taruh file di folder public/)
    birth: "8 Oktober 2003",
    address: "Purwakarta",
    phone: "+62 878-2947-8221", // contoh: "+62 812-3456-7890"
  },

  about: [
    "Saya lulus dari program D4 Teknologi Rekayasa Informatika Industri di Politeknik Manufaktur Bandung. Latar belakang akademis saya mencakup pengembangan perangkat lunak, teknologi informasi, IoT, dan otomasi industri.",
    "Selama magang lima bulan di PT Indopoly Swakarsa Industry Tbk, saya mengembangkan dasbor pemantauan WhatsApp berbasis web yang terintegrasi dengan sistem ERP perusahaan. Pekerjaan saya mencakup pengembangan antarmuka, integrasi sisi server, pengelolaan basis data, dan otomasi pesan WhatsApp.",
    "Saya senang memecahkan masalah teknis, mempelajari teknologi baru, dan membangun solusi praktis. Saya mencari posisi tingkat pemula agar dapat berkontribusi pada proyek pengembangan perangkat lunak atau TI sambil terus berkembang sebagai engineer.",
  ],

  // Entri pertama dianggap pendidikan terakhir. Harus tepat 2 entri.
  education: [
    {
      institution: "Politeknik Manufaktur Bandung",
      program: "D4 Teknologi Rekayasa Informatika Industri",
      logo: "/education/polman.png",
      period: "2022 – 2026",
      description: "Lulus dengan IPK 3,32/4,00. Tugas akhir berfokus pada pertanian cerdas menggunakan IoT dan pembelajaran mesin.",
    },
    {
      institution: "SMKN 1 Plered",
      program: "Teknik Otomasi Industri",
      logo: "/education/smkn1plered.png",
      period: "2018 – 2022",
      // description: "[OPTIONAL SHORT DESCRIPTION]",
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
        "Program magang lima bulan yang berfokus pada pengembangan dasbor pemantauan WhatsApp berbasis web terintegrasi dengan sistem ERP perusahaan, mencakup antarmuka, integrasi sisi server, basis data, otomasi pesan WhatsApp, serta pemantauan dan pemeliharaan infrastruktur IT.",
      responsibilities: [
        "Mengembangkan dasbor pemantauan WhatsApp pada bagian antarmuka dan sisi server.",
        "Membangun antarmuka dengan React.js dan fungsionalitas sisi server dengan C#, yang terhubung melalui REST API.",
        "Menggunakan Microsoft SQL Server untuk membaca dan mengelola data pesan.",
        "Menerapkan pemantauan status pesan, pencarian dan penyaringan, detail pesan, serta pengiriman ulang secara manual untuk pesan yang gagal.",
        "Menggunakan Python dan Selenium untuk otomasi pesan WhatsApp.",
        "Melakukan pemantauan server secara berkala untuk memastikan layanan dan sistem IT berjalan dengan baik.",
        "Membantu menangani kendala dan troubleshooting pada server serta sistem ERP.",
        "Melakukan pemeriksaan dan perbaikan pada perangkat IoT, termasuk sensor suhu di ruang server yang mengalami kendala pembacaan data.",
      ],
      achievements: ["Membangun antarmuka khusus untuk memeriksa status pesan dan mengirim ulang pesan yang gagal secara manual.", "Berkontribusi dalam pengembangan konfigurasi mesin pengiriman dari satu menjadi empat mesin."],
      stack: ["React.js", "C#", "REST API", "Microsoft SQL Server", "Python", "Selenium", "IoT", "Server Monitoring"],
      url: "https://drive.google.com/file/d/1T2xb2MiQ4nySWIRS2-lFjGtyuL4kzeZ-/view?usp=sharing",
      projectSlug: "whatsapp-monitoring-dashboard",
      images: [
        "/internship/Indopoly/indopoly_0.jpeg",
        "/internship/Indopoly/indopoly_1.jpeg",
        "/internship/Indopoly/indopoly_2.jpeg",
        "/internship/Indopoly/indopoly_3.jpeg",
        "/internship/Indopoly/indopoly_4.jpeg",
        "/internship/Indopoly/indopoly_5.jpeg",
        "/internship/Indopoly/indopoly_6.jpeg",
        "/internship/Indopoly/indopoly_7.png",
      ],
    },
    {
      slug: "puskesmas-garuda-kkn",
      kind: "work",
      organization: "UPTD Puskesmas Garuda Bandung",
      role: "Pengembang Aplikasi Seluler",
      employmentType: "Proyek KKN",
      period: "Oktober 2025 - November 2025", // ganti dengan periode pasti, mis. "Feb 2025 – Jun 2025"
      location: "Bandung, Indonesia",
      description: "Mengembangkan aplikasi seluler untuk mendukung pengumpulan dokumen di UPTD Puskesmas Garuda Bandung sebagai bagian dari program Kuliah Kerja Nyata (KKN).",
      responsibilities: [
        "Mengembangkan aplikasi seluler menggunakan Flutter dan Dart.",
        "Mendukung digitalisasi proses pengumpulan dokumen di puskesmas.",
        "Bekerja sama dengan tim KKN untuk mengembangkan aplikasi sesuai kebutuhan instansi.",
      ],
      achievements: ["Berkontribusi dalam pengembangan aplikasi seluler untuk mendukung pengumpulan dokumen administrasi."],
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
      period: "Oktober 2021 - Desember 2021", // ganti dengan periode pasti, mis. "Feb 2025 – Jun 2025"
      location: "Bandung, Indonesia",
      description: "Pengalaman magang dalam mendukung tim Pemeliharaan dan Otomasi untuk merawat serta menangani kendala pada mesin produksi otomatis di lingkungan manufaktur farmasi.",
      responsibilities: [
        "Membantu teknisi melakukan pemeliharaan preventif dan menangani kendala pada mesin produksi otomatis.",
        "Mendukung teknisi dalam konfigurasi dan pemrograman PLC di bawah pengawasan.",
        "Membantu pekerjaan pengawatan listrik dan pemasangan mesin baru.",
        "Mempelajari sistem otomasi industri, pemeliharaan peralatan, dan pemecahan masalah secara sistematis.",
      ],
      achievements: ["Memperoleh pengalaman langsung dalam otomasi industri dan praktik pemeliharaan di lingkungan manufaktur.", "Membangun pemahaman dasar tentang sistem PLC, pengawatan listrik, dan peralatan produksi otomatis."],
      stack: ["PLC", "Otomasi Industri", "Pemeliharaan Preventif", "Pemecahan Masalah", "Pengawatan Listrik"],
      url: "", // tautan referensi perusahaan atau bukti magang, jika ada
      projectSlug: "",
      images: ["/internship/SanbeFarma/sanbe_1.JPG", "/internship/SanbeFarma/sanbe_2.JPG", "/internship/SanbeFarma/sanbe_3.jpg", "/internship/SanbeFarma/sanbe_4.JPG", "/internship/SanbeFarma/sanbe_5.JPG"],
    },
    {
      slug: "hima-organization",
      kind: "organization",
      organization: "Himpunan Mahasiswa Teknik Otomasi Manufaktur dan Mekatronika",
      role: "Staf Ahli Divisi Sarana dan Prasarana",
      employmentType: "Organisasi",
      period: "2024 - 2026",
      description: "Berkontribusi dalam kegiatan organisasi mahasiswa di bidang otomasi manufaktur dan mekatronika, serta mendukung kebutuhan sarana dan prasarana agar kegiatan berjalan lancar.",
      responsibilities: [
        "Membantu menyiapkan fasilitas, perlengkapan, dan sumber daya lain yang dibutuhkan untuk kegiatan organisasi.",
        "Berkolaborasi dengan anggota divisi dan panitia lain untuk mendukung kelancaran acara.",
        "Mendukung koordinasi dan pengelolaan perlengkapan serta kebutuhan logistik kegiatan organisasi.",
      ],
      achievements: ["Mendukung kelancaran kegiatan organisasi melalui persiapan fasilitas dan koordinasi."],
      images: ["/Organization/himamo/himamo_1.JPG", "/Organization/himamo/himamo_2.JPG", "/Organization/himamo/himamo_3.jpg"],
      isDemo: false,
    },
  ],

  projects: [
    {
      slug: "whatsapp-monitoring-dashboard",
      title: "Dasbor Pemantauan WhatsApp Terintegrasi ERP",
      summary:
        "Pengembangan sistem dasbor berbasis web yang terintegrasi dengan ERP perusahaan untuk memantau aktivitas dan status pengiriman pesan WhatsApp secara terpusat, dilengkapi pengelolaan data pesan, pemantauan performa pengiriman, serta mekanisme pengiriman ulang pesan yang gagal.",

      problem:
        "Sebelumnya, proses pengiriman pesan WhatsApp hanya mengandalkan satu mesin pengiriman. Kondisi ini menyebabkan antrean pesan yang panjang dan berpotensi menimbulkan kegagalan pengiriman. Selain itu, belum tersedia dasbor khusus yang memudahkan pengguna memantau status setiap pesan, menelusuri riwayat pengiriman, dan menangani pesan yang gagal dikirim.",

      role: "Bertanggung jawab mengembangkan dasbor pemantauan WhatsApp dari sisi frontend, backend, hingga integrasi basis data. Mengintegrasikan dasbor ke dalam sistem ERP perusahaan yang sudah berjalan serta mengembangkan fitur pemantauan pesan dan pengelolaan proses pengiriman ulang.",

      process:
        "Mengembangkan antarmuka dasbor menggunakan React.js dan membangun fungsionalitas backend menggunakan C#. Menghubungkan frontend dan backend melalui REST API serta menggunakan Microsoft SQL Server untuk menyimpan dan mengelola data pesan. Mengintegrasikan sistem dengan mesin otomasi WhatsApp yang menggunakan Python dan Selenium. Selain itu, mengembangkan pengaturan mesin pengiriman dari satu menjadi empat mesin, dengan pembagian dua mesin untuk divisi HR dan dua mesin untuk divisi Operations. Menerapkan mekanisme percobaan ulang menggunakan mesin kedua apabila pengiriman melalui mesin pertama mengalami kegagalan.",

      outcome:
        "Menghasilkan dasbor pemantauan WhatsApp yang terintegrasi dengan ERP dan memungkinkan pengguna memantau status pengiriman pesan secara terpusat. Pengguna dapat menelusuri data pesan, melihat detail pengiriman, memantau aktivitas berdasarkan divisi, serta melakukan pengiriman ulang secara manual terhadap pesan yang gagal. Pengembangan konfigurasi empat mesin pengiriman juga membantu membagi proses pengiriman berdasarkan kebutuhan divisi dan menyediakan mekanisme percobaan ulang ketika terjadi kegagalan.",

      features: [
        "Dashboard ringkasan aktivitas dan jumlah pesan WhatsApp",
        "Pemantauan status pesan: Belum Dikirim, Berhasil, dan Gagal",
        "Pencarian dan penyaringan data pesan",
        "Halaman detail dan riwayat pengiriman pesan",
        "Fitur pengiriman ulang pesan yang gagal secara manual",
        "Pemantauan aktivitas pengiriman berdasarkan divisi HR dan Operations",
        "Informasi waktu pemrosesan pengiriman pesan",
        "Integrasi dengan ERP perusahaan",
        "Konfigurasi empat mesin pengiriman WhatsApp",
        "Mekanisme percobaan ulang pengiriman melalui mesin kedua",
      ],

      stack: ["React.js", "C#", "REST API", "Microsoft SQL Server", "Python", "Selenium"],

      repoUrl: "",
      demoUrl: "",
      images: [
        "/internship/Indopoly/indopoly_0.jpeg",
        "/internship/Indopoly/indopoly_1.jpeg",
        "/internship/Indopoly/indopoly_2.jpeg",
        "/internship/Indopoly/indopoly_3.jpeg",
        "/internship/Indopoly/indopoly_4.jpeg",
        "/internship/Indopoly/indopoly_5.jpeg",
        "/internship/Indopoly/indopoly_6.jpeg",
        "/internship/Indopoly/indopoly_7.png",
      ],

      isDemo: false,
    },

    {
      slug: "smart-agriculture-iot-machine-learning",
      title: "Sistem Pendukung Keputusan Pertanian Cerdas",
      summary: "Proyek tugas akhir yang menggabungkan IoT dan pembelajaran mesin untuk memberikan rekomendasi tanaman serta memperkirakan kebutuhan air irigasi.",
      problem: "Proyek ini mengeksplorasi pemanfaatan rekomendasi berbasis data untuk mendukung pemilihan tanaman dan perencanaan irigasi.",
      role: "Mengembangkan sistem pendukung keputusan menggunakan metode pembelajaran mesin untuk memberikan rekomendasi tanaman dan memperkirakan kebutuhan air irigasi.",
      process: "Menggunakan Python, Pandas, dan Scikit-learn untuk pengolahan data dan pengembangan model, dengan menerapkan Random Forest Classifier dan Random Forest Regression.",
      outcome: "Mengembangkan sistem pendukung keputusan akademis yang berfokus pada rekomendasi tanaman dan kebutuhan air irigasi. Tidak mencantumkan klaim performa kuantitatif.",
      features: ["Rekomendasi tanaman", "Estimasi kebutuhan air irigasi", "Pengembangan model pembelajaran mesin"],
      stack: ["Python", "Pandas", "Scikit-learn", "Random Forest", "IoT"],
      repoUrl: "",
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
      role: "Berkontribusi dalam pengembangan aplikasi seluler menggunakan Flutter dan Dart sebagai bagian dari tim KKN.",
      process: "Mengembangkan aplikasi seluler menggunakan Flutter dan Dart berdasarkan kebutuhan instansi.",
      outcome: "Berkontribusi dalam pengembangan aplikasi seluler untuk mendukung pengumpulan dokumen administrasi di UPTD Puskesmas Garuda Bandung.",
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
      summary: "Sistem IoT berbasis ESP32 dengan antarmuka web bawaan untuk mengatur koneksi WiFi, memilih mode komunikasi, dan mengelola pengaturan sensor pada aplikasi pemantauan jarak jauh.",
      problem:
        "Konfigurasi perangkat IoT biasanya mengharuskan firmware diubah dan diunggah ulang setiap kali pengaturan komunikasi perlu diperbarui. Proyek ini menyediakan antarmuka konfigurasi berbasis web untuk menyederhanakan pengaturan perangkat tanpa perlu memprogram ulang firmware.",
      role: "Berkolaborasi mengembangkan sistem konfigurasi IoT berbasis ESP32 dengan web server bawaan, sehingga pengguna dapat mengelola pengaturan WiFi, memilih mode komunikasi, dan mengatur sensor melalui browser.",
      process:
        "Mengembangkan antarmuka konfigurasi web ESP32 menggunakan Arduino IDE dan pustaka ESP32. Menerapkan konfigurasi WiFi Access Point dan Station, pemilihan mode operasional, serta pemantauan status perangkat. Mengintegrasikan opsi konfigurasi GSM menggunakan SIM800 dan komunikasi LoRa menggunakan modul RFM95/SX1276.",
      outcome:
        "Mengembangkan sistem konfigurasi berbasis web yang memungkinkan pengguna mengatur kredensial WiFi, memilih mode komunikasi GSM, WiFi, atau LoRa, memilih opsi sensor yang didukung, dan memantau status perangkat melalui browser tanpa memprogram ulang ESP32.",
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
      stack: ["ESP32", "Arduino IDE", "C/C++", "HTML", "CSS", "JavaScript", "WiFi", "WebServer", "GSM", "LoRaWAN", "IoT"],
      repoUrl: "",
      demoUrl: "",
      images: ["/pbl/pbl_1.png", "/pbl/pbl_2.png"],
      isDemo: false,
    },
    {
      slug: "drilling-control-operation-mes",
      title: "Operasi Kendali Pengeboran – Sistem Eksekusi Manufaktur",
      summary:
        "Proyek otomasi industri yang berfokus pada pengembangan sistem kendali pengeboran terintegrasi dengan Sistem Eksekusi Manufaktur (MES) untuk mengendalikan mesin, melakukan pemantauan secara langsung, dan menganalisis efisiensi produksi.",
      problem:
        "Proyek ini menjawab kebutuhan akan sistem kendali pengeboran terintegrasi yang memungkinkan operator memantau status mesin, mengendalikan pergerakan motor, mengatur mode operasi manual dan otomatis, serta melihat data operasional melalui dasbor terpusat.",
      role: "Berkolaborasi mengembangkan sistem kendali dan pemantauan pengeboran menggunakan otomasi berbasis PLC dan dasbor Node-RED. Proyek ini mencakup penerapan logika kendali motor, perancangan antarmuka pengguna, integrasi komunikasi PLC, visualisasi data sensor, dan pengembangan perhitungan Overall Equipment Effectiveness (OEE).",
      process:
        "Mengembangkan logika kendali PLC menggunakan Bosch Rexroth ctrlX PLC dan mengonfigurasi alur Node-RED untuk fungsi dasbor serta komunikasi PLC. Menerapkan siklus pengeboran manual dan otomatis, kendali motor maju dan mundur, penanganan sakelar batas, animasi mesin SVG, pemantauan sensor, visualisasi data secara langsung, pencatatan waktu operasi mesin, serta perhitungan OEE berdasarkan ketersediaan, performa, dan kualitas.",
      outcome:
        "Mengembangkan prototipe kendali pengeboran terintegrasi yang mencakup pengoperasian mesin secara manual dan otomatis, dasbor kendali dan pemantauan secara langsung, visualisasi data sensor, serta indikator performa OEE. Proyek ini menunjukkan integrasi otomasi berbasis PLC dengan antarmuka Node-RED untuk mendukung pengoperasian dan pemantauan mesin industri.",
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
      name: "Webinar Penerapan dan Implementasi Otomasi Industri di Industri Manufaktur",
      issuer: "Kampus Merdeka",
      year: "2024",
      image: "/certificate/webinar.png", // contoh: "/certificates/python.jpg". Banyak gambar: images: ["/certificate/a.png", "/certificate/b.png"]
      url: "https://drive.google.com/file/d/1tgb_HW2VgPFaJJjdcNpqF82SrICZxI1D/view?usp=sharing", // link sertifikat / kredensial, jika ada
    },
    {
      name: "Bahasa Inggris Bersertifikat TOEFL",
      issuer: "PT. MAIRODI MANDIRI SEJAHTERA",
      year: "2024",
      image: "/certificate/TOEFL.png", // contoh: "/certificates/python.jpg"
      url: "https://drive.google.com/file/d/1uPmvCE9Hvk0wpyT6ZIZmyZuqQfW7xLp_/view?usp=sharing", // link sertifikat / kredensial, jika ada
    },
    {
      name: "Pelatihan Dasar Pemrograman Python",
      issuer: "Program Kartu Prakerja",
      year: "2023",
      image: "/certificate/E-SERTIFIKAT_KOMPETENSI.png", // contoh: "/certificates/python.jpg"
      url: "https://drive.google.com/file/d/1VZt7h7PJHI_77MWV0zl1YmX4mGUzjr5T/view?usp=sharing", // link sertifikat / kredensial, jika ada
    },
    {
      name: "SERTIFIKAT UJI KOMPETENSI",
      issuer: "SMKN 1 PLERED",
      year: "2022",
      image: "/certificate/UJIKOM_SMK.png", // contoh: "/certificates/python.jpg"
      url: "https://drive.google.com/file/d/1jpF300mhDxuFxR3kzFw_5cKF6BvJQDWY/view?usp=sharing", // link sertifikat / kredensial, jika ada
    },
  ],

  awards: [
    {
      title: "Juara 1 - Perakitan Smartcar Bluetooth",
      issuer: "Robonesia, UPTD TIKOMDIK & Dinas Pendidikan Provinsi Jawa Barat",
      year: "2021",
      description:
        "Meraih juara 1 kategori Perakitan Smartcar Bluetooth pada J.E.R.C. (Jabar Robotic Expo & Competition) yang diselenggarakan pada 31 Mei hingga 5 Juni 2021 oleh Robonesia, bekerja sama dengan UPTD Teknologi Informasi dan Komunikasi Pendidikan (TIKOMDIK) serta Dinas Pendidikan Provinsi Jawa Barat.",
      url: "https://drive.google.com/file/d/13x3PeQEWZxYH992RZh659NfV2Nikg7Ad/view?usp=sharing", // tautan bukti atau referensi penghargaan, jika ada
    },
    {
      title: "Sistem Pendukung Keputusan Pertanian Cerdas Berbasis Internet of Things dan Pembelajaran Mesin untuk Rekomendasi Tanaman dan Kebutuhan Air Irigasi",
      issuer: "Politeknik Manufaktur Bandung",
      year: "2026",
      description:
        "Mengembangkan sistem pendukung keputusan pertanian cerdas berbasis penelitian yang mengintegrasikan Internet of Things (IoT) dan pembelajaran mesin untuk merekomendasikan tanaman yang sesuai serta memperkirakan kebutuhan air irigasi, sehingga mendukung pengambilan keputusan pertanian berbasis data dan pengelolaan air yang efisien.",
      url: "https://drive.google.com/file/d/1JFb92bsdhxB056PpOSyOoIln5O3HQvo6/view?usp=sharing", // tautan bukti atau referensi penghargaan, jika ada
    },
    {
      title: "Analisis Tingkat Pemahaman Mahasiswa Teknologi Rekayasa Informatika Industri terhadap Penggunaan Bahasa Pemrograman JavaScript",
      issuer: "Informatika Dan Teknologi (INTECH)",
      year: "2026",
      description:
        "Melakukan penelitian untuk menganalisis tingkat pemahaman mahasiswa Teknologi Rekayasa Informatika Industri terhadap penggunaan bahasa pemrograman JavaScript. Penelitian ini bertujuan menilai pengetahuan pemrograman mahasiswa, mengidentifikasi kendala dalam memahami konsep JavaScript, serta mengevaluasi pemahaman mereka tentang penerapannya dalam pemrograman.",
      url: "", // tautan bukti atau referensi penghargaan, jika ada
    },
  ],

  // Logo: taruh file di public/assets/tech/ dengan nama yang sama seperti path di bawah.
  // Jika file belum ada, otomatis tampil kotak placeholder.
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
        { name: "HTML", logo: "/assets/tech/html.svg" },
        { name: "CSS", logo: "/assets/tech/css.svg" },
      ],
    },
    {
      category: "Basis Data",
      items: [
        { name: "Microsoft SQL Server", logo: "/assets/tech/sql_server.svg" },
        { name: "MySql", logo: "/assets/tech/mysql.svg" },
        { name: "MongoDB", logo: "/assets/tech/mongodb.svg" },
      ],
    },
    {
      category: "Alat & Otomasi",
      items: [
        { name: "Git", logo: "/assets/tech/git.svg" },
        { name: "Selenium", logo: "/assets/tech/selenium.svg" },
      ],
    },
    {
      category: "Data & Pembelajaran Mesin",
      items: [
        { name: "Pandas", logo: "/assets/tech/pandas.svg" },
        { name: "Scikit-learn", logo: "/assets/tech/scikit-learn.svg" },
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
    title: "M Dandi Al Idrus — Pengembang Perangkat Lunak Junior",
    description: "Portofolio M Dandi Al Idrus, lulusan D4 Teknologi Rekayasa Informatika Industri dengan pengalaman magang di bidang pengembangan perangkat lunak, integrasi ERP, otomasi WhatsApp, IoT, dan otomasi industri.",
  },
};
