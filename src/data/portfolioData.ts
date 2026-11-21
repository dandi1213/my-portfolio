import { PortfolioData } from "../types/portfolio";

/**
 * ============================================================================
 * PUSAT PENGELOLAAN DATA PORTOFOLIO (CENTRALIZED PORTFOLIO DATA)
 * ============================================================================
 * Cukup edit bagian di bawah ini untuk mengubah nama, foto, biodata,
 * pendidikan, keahlian, daftar proyek, pengalaman kerja, dan kontak Anda.
 *
 * Tips Gambar:
 * Anda bisa menggunakan URL gambar online (https://...) ATAU menyimpan file
 * gambar ke folder `public/images/` lalu memanggilnya dengan `/images/nama-file.jpg`.
 * ============================================================================
 */
export const PORTFOLIO_DATA: PortfolioData = {
  // 1. INFORMASI PRIBADI & MEDIA SOSIAL
  personal: {
    brandName: "MD",
    fullName: "M Dandi Al Idrus",
    profilePhoto: "/images/Home/foto-profil.jpeg",
    // Foto sisi belakang (efek koin flip):
    secondaryPhoto: "/images/Home/foto-profil-2.jpeg",
    roles: ["Junior Software Developer", "IT Engineer", "Web & Mobile Developer", "IoT & Industrial Automation Enthusiast"],
    heroBio: "Merancang dan mengembangkan solusi digital melalui perangkat lunak, pengolahan data, dan integrasi teknologi.",
    aboutParagraphs: [
      "Saya merupakan lulusan D4 Teknologi Rekayasa Informatika Industri dari Politeknik Manufaktur Bandung dengan pengalaman di bidang pengembangan perangkat lunak, web, dan integrasi sistem.",
      "Selama magang di industri manufaktur, saya mengembangkan sistem pengiriman WhatsApp terintegrasi ERP dan dasbor pemantauan.",
      "Saya juga mengembangkan sistem pendukung keputusan pertanian cerdas berbasis IoT dan machine learning sebagai proyek tugas akhir.",
      "Saya memiliki ketertarikan pada pengembangan solusi digital, integrasi teknologi, dan otomasi industri, serta terus mengembangkan kemampuan untuk menghasilkan solusi yang efektif dan bermanfaat.",
    ],
    location: "Purwakarta, Jawa Barat, Indonesia",
    educationSummary: "D4 Teknologi Rekayasa Informatika Industri — Politeknik Manufaktur Bandung",
    experienceSummary: "Magang IT & Software Development di Lingkungan Manufaktur",
    email: "mdandialidrus08@gmail.com",
    socials: {
      github: "https://github.com/dandi1213",
      linkedin: "https://www.linkedin.com/in/m-dandi-al-idrus-b219a1247",
      instagram: "https://www.instagram.com/dndialidrs/",
    },
    // Tempelkan URL Google Drive untuk CV / Resume Anda di bawah ini:
    cvUrl: "https://drive.google.com/file/d/1gTrahfvQzXTVpwRIFPN50eCPnyQd5lff/view?usp=sharing",
  },

  // 2. RIWAYAT PENDIDIKAN & SERTIFIKASI
  education: [
    {
      id: "edu-1",
      period: "2022 — 2026",
      degree: "D4 Teknologi Rekayasa Informatika Industri",
      institution: "Politeknik Manufaktur Bandung",
      location: "Bandung, Jawa Barat",
      honors: "",
      // honors: "IPK 3.32 / 4.00",
      description:
        "Tugas akhir mengembangkan sistem pendukung keputusan pertanian cerdas berbasis Internet of Things (IoT) dan machine learning, dengan aplikasi web untuk mengintegrasikan data sensor, mengolah informasi, dan menghasilkan rekomendasi tanaman serta kebutuhan air irigasi.",
      highlights: ["Software Development", "Internet of Things (IoT)", "Machine Learning"],
      logo: "/images/Education/polman.png",
    },
    {
      id: "edu-2",
      period: "2018 — 2022",
      degree: "Teknik Otomasi Industri",
      institution: "SMKN 1 Plered",
      location: "Purwakarta, Jawa Barat",
      honors: "",
      // honors: "Sertifikat Uji Kompetensi (2022) & Juara 1 Perakitan Smartcar Bluetooth J.E.R.C. (2021)",
      description:
        "Mempelajari dasar-dasar otomasi industri, sistem kendali, instalasi dan pengawatan listrik, serta perakitan perangkat keras dan pemrograman mikrokontroler. Memperoleh pemahaman mengenai penggunaan PLC, komponen elektronika, dan penerapan sistem otomasi dalam proses industri.",
      highlights: ["Otomasi Industri", "Sistem Kendali", "Robotika"],
      logo: "/images/Education/smkn.png",
    },
  ],

  // 3. DAFTAR SERTIFIKAT & PENGHARGAAN (CERTIFICATIONS & CREDENTIALS)

  certificates: [
    {
      id: "cert-1",
      title: "TOEFL ITP",
      issuer: "PT Mairodi Mandiri Sejahtera",
      issueDate: "2024",
      category: "Bahasa",
      credentialUrl: "https://drive.google.com/file/d/1un-33Q7bX6mlWoV3dH9Fu_sm23a_Glhi/view?usp=sharing",
      credentialId: "",
      description: "Sertifikat kemampuan bahasa Inggris dengan perolehan skor TOEFL ITP sebesar 418.",
      skills: ["English Proficiency", "TOEFL ITP"],
      image: "/images/Certificates/TOEFL.png",
    },
    {
      id: "cert-2",
      title: "Webinar Penerapan dan Implementasi Otomasi Industri di Industri Manufaktur",
      issuer: "Universitas Pelita Bangsa",
      issueDate: "2024",
      category: "Otomasi Industri",
      credentialUrl: "https://drive.google.com/file/d/1tgb_HW2VgPFaJJjdcNpqF82SrICZxI1D/view?usp=sharing",
      credentialId: "",
      description: "Mengikuti webinar yang membahas penerapan dan implementasi teknologi otomasi dalam lingkungan industri manufaktur.",
      skills: ["Otomasi Industri", "Manufaktur", "Teknologi Industri"],
      image: "/images/Certificates/Webinar-1.png",
    },
    {
      id: "cert-3",
      title: "Pelatihan Dasar Pemrograman Python",
      issuer: "Laboratorium Komputer Indonesia",
      issueDate: "2023",
      category: "Software & Programming",
      credentialUrl: "https://drive.google.com/file/d/1VZt7h7PJHI_77MWV0zl1YmX4mGUzjr5T/view?usp=sharing",
      credentialId: "",
      description: "Mengikuti pelatihan dasar pemrograman Python sebagai pengenalan konsep dan penerapan bahasa pemrograman.",
      skills: ["Python", "Programming", "Basic Programming"],
      image: "/images/Certificates/Sertifikat-LKI-Python.png",
    },
    {
      id: "cert-4",
      title: "Sertifikat Uji Kompetensi PLC",
      issuer: "SMKN 1 Plered",
      issueDate: "2022",
      category: "Otomasi Industri",
      credentialUrl: "https://drive.google.com/file/d/1jpF300mhDxuFxR3kzFw_5cKF6BvJQDWY/view?usp=sharing",
      credentialId: "",
      description: "Sertifikat hasil uji kompetensi pada bidang keahlian Teknik Otomasi Industri.",
      skills: ["Teknik Otomasi Industri", "Sistem Kendali"],
      image: "/images/Certificates/Sertifikat-Ujikom-PLC.png",
    },
    {
      id: "cert-5",
      title: "Juara 1 Perakitan Smartcar Bluetooth",
      issuer: "J.E.R.C. (Jabar Robotic Expo & Competition)",
      issueDate: "2021",
      category: "Penghargaan",
      credentialUrl: "https://drive.google.com/file/d/13x3PeQEWZxYH992RZh659NfV2Nikg7Ad/view?usp=sharing",
      credentialId: "",
      description: "Meraih Juara 1 dalam kompetisi perakitan Smartcar Bluetooth yang diselenggarakan pada 31 Mei–5 Juni 2021 oleh Robonesia bekerja sama dengan UPTD TIKOMDIK dan Dinas Pendidikan Provinsi Jawa Barat.",
      skills: ["Robotika", "Smartcar", "Bluetooth", "Mikrokontroler"],
      image: "/images/Certificates/Juara-1-Robotic.png",
    },
  ],

  // 4. DAFTAR SKILLS & TEKNOLOGI
  skills: [
    { name: "Python", category: "Language", key: "python" },
    { name: "JavaScript", category: "Language", key: "javascript" },
    { name: "C#", category: "Language", key: "csharp" },
    { name: "React.js", category: "Web Framework", key: "react" },
    { name: "FastAPI", category: "Backend Framework", key: "fastapi" },
    { name: "Flutter", category: "Mobile Framework", key: "flutter" },
    { name: "MongoDB", category: "Database", key: "mongodb" },
    { name: "MySQL", category: "Database", key: "mysql" },
    { name: "Git", category: "Version Control", key: "git" },
    { name: "scikit-learn & Pandas", category: "Data & ML", key: "machine-learning" },
    { name: "ESP32 & LoRa", category: "IoT & Automation", key: "iot" },
    { name: "Node-RED", category: "Industrial IoT", key: "nodered" },
  ],

  // 4. DAFTAR PROYEK PORTOFOLIO (Terpisah rapi per bagian menggunakan multiline string)
  projects: [
    {
      id: "proj-1",
      title: "Sistem Pendukung Keputusan Pertanian Cerdas Berbasis IoT dan Machine Learning",
      category: "Web Development",
      year: "2026",
      client: "Tugas Akhir — Polman Bandung & Mitra Pemda Garut",
      description: `Proyek tugas akhir yang menggabungkan data sensor lahan dan data cuaca untuk mendukung rekomendasi jenis tanaman serta prediksi kebutuhan air irigasi harian.

Latar Belakang:
Pengambilan keputusan pertanian membutuhkan informasi kondisi tanah dan cuaca, terutama untuk pemilihan tanaman dan perencanaan irigasi. Proyek ini mengintegrasikan informasi tersebut dalam satu platform pendukung keputusan.

Peran:
Mengembangkan komponen perangkat lunak, meliputi penerimaan data sensor, backend, basis data, model machine learning, dan dasbor web. Perancangan serta pembuatan perangkat keras sensor dan gateway berada di luar lingkup pekerjaan. Proyek dikerjakan bersama kampus dan mitra pemerintah daerah di Garut.

Proses Pengembangan:
Data sensor Dragino diterima melalui webhook jaringan LoRaWAN ke backend FastAPI, kemudian divalidasi dan disimpan di MongoDB bersama data cuaca dari OpenWeatherMap dan Open-Meteo. Dua model Random Forest berbasis pipeline scikit-learn dikembangkan menggunakan dataset publik: model klasifikasi (2.200 data, 22 jenis tanaman) dan model regresi (3.000 data, 10 jenis tanaman, dengan mengeluarkan variabel ET₀ dan Kc untuk mencegah data leakage). Backend diterapkan di Render dan frontend di Vercel.`,
      images: ["/images/Project/TA/ta_0.jpeg","/images/Project/TA/ta_1.png", "/images/Project/TA/ta_2.jpeg", "/images/Project/TA/ta_3.jpeg", "/images/Project/TA/ta_4.jpeg", "/images/Project/TA/ta_5.png", "/images/Project/TA/ta_6.png", "/images/Project/TA/ta_7.png"],
      tags: ["Python", "FastAPI", "MongoDB", "scikit-learn", "LoRaWAN", "JavaScript"],
      highlights: [
        "Hasil Evaluasi: Model klasifikasi meraih akurasi 91,59% (weighted F1 0,92); model regresi menghasilkan MAE 0,35 mm/hari dan R² ~0,55. Lolos 41 skenario pengujian black-box pada 5 modul API.",
        "Implementasi Lapangan: Sejak Maret 2026, sistem aktif menerima data sensor dari lahan di Cikajang, Garut setiap 20 menit.",
        "Fitur Rekomendasi & Prediksi: Rekomendasi 3 jenis tanaman teratas beserta skor kepercayaan serta prediksi kebutuhan air irigasi harian (mm/hari & konversi ke liter berdasarkan luas lahan).",
        "Fitur Analisis & Monitoring: Analisis kondisi tanah harian (kering, optimal, basah), perencanaan masa tanam berbasis klimatologi, riwayat tabel & grafik, pengaturan lahan, serta webhook sensor berautentikasi.",
      ],
      liveUrl: "https://ta-frontend-polman-bandung.vercel.app/",
      repoUrl: "",
      architectureSnippet: `// Webhook penerimaan data sensor LoRaWAN ke FastAPI & MongoDB
@app.post("/api/webhook/sensor")
async def receive_sensor_data(payload: SensorPayload, authorized: bool = Depends(verify_token)):
    weather = await fetch_weather_context(payload.lat, payload.lon)
    prediction = ml_pipeline.predict_crop_and_irrigation(payload, weather)
    await db.sensor_readings.insert_one({**payload.dict(), "prediction": prediction})
    return {"status": "stored", "recommendation": prediction}`,
    },
    {
      id: "proj-2",
      title: "Sistem Pengiriman WhatsApp (Waattach) dan Dasbor Pemantauan Terintegrasi ERP",
      category: "Web Development",
      year: "2025",
      client: "PT Indopoly Swakarsa Industry Tbk",
      description: `Pengembangan ulang sistem pengiriman WhatsApp otomatis yang terintegrasi dengan ERP, dilengkapi dasbor web untuk memantau status, menelusuri riwayat, dan mengirim ulang pesan.

Latar Belakang:
Sistem awal menggunakan Python dan Selenium tanpa API maupun basis data. Pesan diproses langsung dari permintaan URL sehingga antrean belum terkelola dengan baik dan riwayat pesan gagal tidak tersedia. Dalam kondisi tertentu, pesan dapat menumpuk atau tergabung, dan pengisian pesan per karakter memerlukan waktu lebih dari 30 detik per pesan tanpa dasbor pemantauan.

Peran:
Mengembangkan sebagian besar komponen sistem secara mandiri, termasuk struktur basis data, mesin Python, dan alur pengiriman. Pengembangan API C# dan dasbor React.js dilakukan dengan bimbingan mentor, kemudian diintegrasikan ke ERP perusahaan.

Proses Pengembangan:
Pesan disimpan ke tabel SQL Server melalui API C#. Mesin Python mengambil 10 pesan teratas berstatus New atau Failed berdasarkan sequence terkecil, mengubah status menjadi Proses, mencari nomor tujuan di WhatsApp Web, mengisi pesan melalui injeksi JavaScript, lalu memperbarui status menjadi Sent atau Failed melalui API. Sistem dikembangkan menjadi empat mesin (Ipol Center dan HR Center, masing-masing satu mesin untuk pesan baru dan satu mesin untuk pesan gagal).`,
      images: ["images/Project/INDOPOLY/indopoly_cover.jpeg","images/Project/INDOPOLY/indopoly_0.png", "images/Project/INDOPOLY/indopoly_1.png", "images/Project/INDOPOLY/indopoly_2.png", "images/Project/INDOPOLY/indopoly_3.png", "images/Project/INDOPOLY/indopoly_4.png", "images/Project/INDOPOLY/indopoly_5.png", "images/Project/INDOPOLY/indopoly_6.png", "images/Project/INDOPOLY/indopoly_7.png", "images/Project/INDOPOLY/indopoly_8.png", "images/Project/INDOPOLY/indopoly_9.png", "images/Project/INDOPOLY/indopoly_10.png", "images/Project/INDOPOLY/indopoly_11.png", "images/Project/INDOPOLY/indopoly_12.png"],
      tags: ["React.js", "C#", "REST API", "Microsoft SQL Server", "Python", "Selenium"],
      highlights: [
        "Hasil & Dampak: Waktu pengiriman berkurang dari >30 detik menjadi ~10 detik per pesan dan tidak lagi bergantung pada panjang pesan. Menangani hingga ~1.000 pesan per hari dan tetap digunakan aktif setelah magang berakhir.",
        "Fitur Dasbor Pemantauan: Pemantauan status pesan real-time, pencarian & penyaringan data pesan, serta halaman detail pesan.",
        "Fitur Kontrol & Laporan: Pengiriman ulang pesan dengan konfirmasi, penghapusan pesan berstatus New, ekspor laporan harian/mingguan ke Excel, serta pilihan tema gelap dan terang.",
        "Integrasi & Antrean: Pengelolaan antrean otomatis berdasarkan sequence, status, dan mode pengiriman yang terintegrasi langsung dengan ERP perusahaan.",
      ],
      liveUrl: "",
      repoUrl: "",
      architectureSnippet: `// Pengambilan antrean pesan berdasarkan sequence terkecil
const fetchQueueBatch = async (status: 'New' | 'Failed') => {
  const response = await apiClient.get('/messages/queue', {
    params: { status, limit: 10, orderBy: 'sequence_asc' }
  });
  return response.data;
};`,
    },
    {
      id: "proj-3",
      title: "Sistem Pemantauan IoT dan Konfigurasi Web Berbasis ESP32",
      category: "IoT & Embedded Systems",
      year: "2024",
      client: "Proyek Pengembangan Perangkat IoT",
      description: `Sistem IoT berbasis ESP32 dengan antarmuka web untuk mengatur koneksi Wi-Fi, memilih mode komunikasi, dan menentukan sensor yang digunakan.

Latar Belakang:
Perubahan pengaturan komunikasi perangkat IoT sering kali memerlukan pemrograman ulang firmware. Proyek ini menyediakan antarmuka web agar konfigurasi tertentu dapat diubah langsung melalui browser tanpa mengunggah ulang program.

Peran:
Berkolaborasi dalam pengembangan sistem konfigurasi berbasis ESP32 yang memungkinkan pengguna mengatur Wi-Fi, memilih mode komunikasi, dan menentukan sensor melalui browser.

Proses Pengembangan:
Membangun antarmuka konfigurasi web menggunakan Arduino IDE dan pustaka ESP32. Pengembangan mencakup mode Wi-Fi Access Point dan Station, pemilihan mode komunikasi, serta pemantauan status perangkat. Sistem juga mendukung opsi komunikasi GSM melalui SIM800 dan LoRa melalui modul RFM95/SX1276.`,
      images: ["images/Project/PBL/pbl_0.jpeg","images/Project/PBL/pbl_1.png", "images/Project/PBL/pbl_2.png"],
      tags: ["ESP32", "Arduino IDE", "C/C++", "HTML/CSS/JS", "LoRa", "GSM"],
      highlights: [
        "Hasil: Menghasilkan sistem konfigurasi web yang memungkinkan pengaturan kredensial jaringan, mode komunikasi, dan sensor tanpa memprogram ulang ESP32.",
        "Fitur Web & Jaringan: Web server dan dasbor konfigurasi langsung pada ESP32, konfigurasi Wi-Fi Access Point & Station, serta pengelolaan kredensial dengan koneksi ulang otomatis.",
        "Fitur Multi-Komunikasi & Sensor: Dukungan komunikasi GSM (SIM800) dan LoRa (RFM95/SX1276), pemilihan sensor LoRa untuk ketinggian air dan NPK, serta penyimpanan konfigurasi.",
      ],
      liveUrl: "",
      repoUrl: "",
      architectureSnippet: `// Handler simpan konfigurasi komunikasi perangkat ESP32 via WebServer
void handleSaveConfig() {
  String commMode = server.arg("comm_mode"); // WIFI | GSM | LORA
  String sensorType = server.arg("sensor_type"); // WATER_LEVEL | NPK
  savePreferences(commMode, sensorType);
  server.send(200, "application/json", "{\\"status\\":\\"saved\\"}");
}`,
    },
    {
      id: "proj-4",
      title: "Operasi Kendali Pengeboran – Simulasi Sistem Eksekusi Manufaktur",
      category: "Industrial Automation",
      year: "2024",
      client: "Proyek Otomasi Industri & MES",
      description: `Proyek simulasi otomasi industri yang mengintegrasikan kendali pengeboran berbasis PLC dengan antarmuka pemantauan Node-RED dalam konteks Manufacturing Execution System (MES).

Latar Belakang:
Proyek mengeksplorasi integrasi kendali mesin dan antarmuka pemantauan untuk menampilkan status operasi, mengendalikan motor, serta menyajikan informasi melalui dasbor.

Peran:
Berkolaborasi mengembangkan simulasi kendali dan pemantauan pengeboran menggunakan PLC dan Node-RED. Pekerjaan mencakup logika kendali motor, antarmuka HMI, komunikasi PLC, dan visualisasi status operasi.

Proses Pengembangan:
Menyusun logika kendali pada lingkungan Bosch Rexroth ctrlX dan mengonfigurasi alur Node-RED untuk dasbor serta komunikasi PLC. Simulasi mencakup kendali motor maju-mundur, logika operasi, tampilan HMI, dan visualisasi status sistem.`,
      images: ["images/Project/MES/mes_0.jpeg","images/Project/MES/mes_1.png", "images/Project/MES/mes_2.png", "images/Project/MES/mes_3.png", "images/Project/MES/mes_4.png", "images/Project/MES/mes_5.png", "images/Project/MES/mes_6.png"],
      tags: ["Bosch Rexroth ctrlX", "PLC", "Node-RED", "JavaScript", "SVG", "MES & OEE"],
      highlights: [
        "Hasil: Prototipe simulasi kendali pengeboran yang menghubungkan logika PLC dengan antarmuka Node-RED sebagai pengalaman integrasi otomasi dan pemantauan berbasis perangkat lunak.",
        "Fitur Kendali Mesin: Pengoperasian pengeboran secara manual dan otomatis, kendali motor maju dan mundur berbasis PLC, serta integrasi limit switch dan pengurutan siklus otomatis.",
        "Fitur Dasbor & MES: Dasbor Node-RED dengan animasi mesin pengeboran berbasis SVG, pemantauan status mesin & sensor dalam grafik, pencatatan waktu operasi, serta perhitungan OEE.",
      ],
      liveUrl: "",
      repoUrl: "https://github.com/dandi1213/MES---Drilling-Control-Operation.git",
      architectureSnippet: `// Kalkulasi OEE pada alur Node-RED dari tag status PLC
const availability = runTime / plannedProductionTime;
const performance = (idealCycleTime * totalCount) / runTime;
const quality = goodCount / totalCount;
msg.payload = { oee: +(availability * performance * quality * 100).toFixed(2) };
return msg;`,
    },
{
  id: "proj-5",
  title: "Aplikasi Seluler Pengumpulan Dokumen Puskesmas Garuda",
  category: "Mobile Development",
  year: "2025",
  client: "UPTD Puskesmas Garuda Bandung (Proyek KKN)",
  description: `Aplikasi seluler yang dikembangkan untuk mendukung pengumpulan dokumen di UPTD Puskesmas Garuda Bandung selama program KKN.

Latar Belakang:
Proyek ini bertujuan mendukung dan mempermudah proses pengumpulan dokumen administrasi di UPTD Puskesmas Garuda Bandung melalui aplikasi seluler.

Peran & Proses Pengembangan:
Mengembangkan aplikasi seluler menggunakan Flutter dan Dart bersama tim KKN berdasarkan kebutuhan operasional instansi untuk mendukung proses pengumpulan dokumen.`,
  images: [
	"/images/Project/KKN/kkn_0.jpeg",
    "/images/Project/KKN/kkn_1.jpeg",
    "/images/Project/KKN/kkn_2.png",
    "/images/Project/KKN/kkn_3.png",
    "/images/Project/KKN/kkn_4.png",
  ],
  tags: ["Flutter", "Dart", "Mobile Development"],
  highlights: [
    "Hasil: Memberikan kontribusi nyata berupa aplikasi seluler yang mendukung pengumpulan dokumen administrasi di UPTD Puskesmas Garuda Bandung.",
    "Fitur Utama: Aplikasi seluler untuk pengumpulan dokumen dan dukungan digital bagi pengelolaan dokumen administrasi.",
  ],
  liveUrl: "",
  repoUrl: "",
  architectureSnippet: `// Model data pengajuan dokumen administrasi pada Flutter
class DocumentSubmission {
  final String id;
  final String applicantName;
  final String documentType;
  final DateTime submittedAt;

  DocumentSubmission({
    required this.id,
    required this.applicantName,
    required this.documentType,
    required this.submittedAt,
  });
}`,
},

{
  id: "proj-6",
  title: "Gatherly - Platform Web Manajemen Event & Tiket Digital",
  category: "Web Development",
  year: "2026",
  client: "Proyek Pribadi (Portfolio)",
  description: `Aplikasi web yang dikembangkan untuk membantu penyelenggara mengelola event gratis secara end-to-end, mulai dari pembuatan event, registrasi peserta, penerbitan tiket digital ber-QR, hingga proses check-in dan pelaporan kehadiran.

Latar Belakang:
Pengelolaan event sering menghadapi kendala seperti data registrasi yang tersebar, pengaturan kuota secara manual yang rawan kelebihan peserta, distribusi tiket yang kurang rapi, serta proses check-in yang lambat dan berpotensi duplikasi. Gatherly dirancang untuk memusatkan seluruh alur tersebut dalam satu platform.

Peran & Proses Pengembangan:
Mengembangkan aplikasi web secara mandiri sebagai proyek portfolio menggunakan Laravel, Inertia.js, React, dan Tailwind CSS. Fokus pengembangan mencakup perancangan alur registrasi berbasis kuota, penerbitan tiket digital dengan QR code, validasi check-in yang aman, penugasan staff per event, serta dashboard ringkasan dan ekspor data peserta untuk organizer.`,
  images: [
    "/images/Project/Gatherly/gatherly_1.jpeg",
  ],
  tags: [
    "Laravel",
    "Inertia.js",
    "React",
    "Tailwind CSS",
    "QR Code",
    "Supabase",
  ],
  highlights: [
    "Hasil: Menghasilkan platform manajemen event dengan alur lengkap (buat event → registrasi → tiket digital → check-in → laporan) yang menjaga integritas data melalui kontrol kuota dan pencegahan check-in ganda.",
    "Fitur Utama: Manajemen event dan tipe tiket, registrasi peserta, tiket digital ber-QR, check-in via scan kamera atau pencarian manual, penugasan staff, dashboard statistik, serta ekspor data peserta (CSV).",
  ],
  liveUrl: "https://gatherly-cbpe.onrender.com/",
  repoUrl: "https://github.com/dandi1213/gatherly",
  architectureSnippet: `// Penerbitan tiket secara atomik untuk mencegah oversell kuota
DB::transaction(function () use ($event, $ticketType, $user) {
    $lockedType = TicketType::query()
        ->whereKey($ticketType->id)
        ->lockForUpdate()
        ->firstOrFail();

    $issuedCount = $lockedType->tickets()
        ->whereIn('status', ['active', 'checked_in'])
        ->count();

    if ($issuedCount >= $lockedType->quota) {
        throw new \\RuntimeException('Kuota tiket habis.');
    }

    $registration = Registration::create([
        'event_id' => $event->id,
        'user_id' => $user->id,
        'ticket_type_id' => $lockedType->id,
        'registration_code' => $this->generateRegistrationCode(),
        'status' => 'registered',
    ]);

    $registration->ticket()->create([
        'ticket_code' => Str::random(40),
        'status' => 'active',
    ]);
});`,
},
{
  id: "proj-7",
  title: "Cuanora - Personal Finance Tracker",
  category: "Web Development",
  year: "2026",
  client: "Proyek Pribadi (Portfolio)",
  description: `Aplikasi web manajemen keuangan pribadi yang membantu pengguna mencatat pemasukan dan pengeluaran, mengelola beberapa wallet, mengatur anggaran bulanan, memantau target tabungan, serta memahami kondisi keuangan melalui dashboard dan laporan sederhana.

Latar Belakang:
Pengelolaan keuangan pribadi sering terkendala oleh pencatatan yang tersebar, saldo yang tidak sinkron dengan transaksi, pengeluaran yang sulit dikontrol, dan minimnya gambaran menyeluruh tentang arus kas. Cuanora dirancang untuk memusatkan seluruh alur tersebut dalam satu aplikasi yang sederhana, responsif, dan mudah dipahami.

Peran & Proses Pengembangan:
Mengembangkan aplikasi secara mandiri sebagai proyek portfolio menggunakan Next.js App Router, TypeScript, Supabase, dan Tailwind CSS. Fokus pengembangan mencakup perancangan skema database dengan Row Level Security, perhitungan saldo wallet yang selalu diturunkan dari transaksi, validasi transaksi dan budget di sisi server, visualisasi keuangan dengan Recharts, serta antarmuka responsif dengan navigasi sidebar di desktop dan bottom navigation di mobile.`,
  images: [
    "/images/Project/Cuanora/Cuanora_cover.jpeg",
  ],
  tags: [
    "Next.js",
    "TypeScript",
    "Supabase",
    "Tailwind CSS",
    "React",
    "Recharts",
    "shadcn/ui",
    "React Hook Form",
    "Zod",
  ],
  highlights: [
    "Hasil: Menghasilkan aplikasi finance tracker dengan alur lengkap (register → wallet → transaksi → budget → savings goal → laporan) yang menjaga integritas data melalui isolasi antar pengguna, validasi tipe kategori, dan perhitungan saldo yang tidak pernah disimpan secara stale.",
    "Fitur Utama: Autentikasi dan profil, manajemen wallet, pencatatan pemasukan/pengeluaran dengan filter dan pencarian, budget bulanan overall maupun per kategori dengan status normal/warning/exceeded, target tabungan dengan progress manual, dashboard statistik dengan grafik Recharts, laporan keuangan per periode, serta UI responsif dengan Bahasa Indonesia dan format mata uang IDR.",
  ],
  liveUrl: "https://cuanora-finance-tracker.vercel.app",
  repoUrl: "",
  architectureSnippet: `// Server Action: membuat transaksi dengan validasi kepemilikan & tipe kategori
'use server'

export async function createTransaction(input: TransactionInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const parsed = transactionSchema.parse(input) // validasi Zod: amount > 0, tanggal valid

  // Wallet dan kategori harus dimiliki user yang sama, dan tipe kategori
  // harus cocok dengan tipe transaksi (income/expense)
  const [{ data: wallet }, { data: category }] = await Promise.all([
    supabase
      .from('wallets')
      .select('id')
      .eq('id', parsed.walletId)
      .eq('user_id', user.id)
      .single(),
    supabase
      .from('categories')
      .select('id')
      .eq('id', parsed.categoryId)
      .eq('user_id', user.id)
      .eq('type', parsed.type)
      .single(),
  ])

  if (!wallet || !category) {
    throw new Error('Wallet atau kategori tidak valid.')
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert({
      user_id: user.id,
      wallet_id: wallet.id,
      category_id: category.id,
      type: parsed.type,
      amount: parsed.amount,
      description: parsed.description,
      transaction_date: parsed.transactionDate,
    })
    .select()
    .single()

  if (error) throw error

  // Saldo tidak disimpan sebagai kolom: selalu dihitung ulang dari
  // initial_balance + total income - total expense (diamankan oleh RLS)
  return data
}`,
},
  ],

  // 5. PENGALAMAN KERJA, FREELANCE & ORGANISASI
  experience: [
    {
      id: "exp-1",
      type: "Work Experience",
      period: "Oktober — November 2025",
      role: "Pengembang Aplikasi Seluler (Proyek KKN)",
      organization: "UPTD Puskesmas Garuda Bandung",
      location: "Bandung, Jawa Barat",
      teamContext: "Tim Kuliah Kerja Nyata (KKN)",
      highlightMetric: "Digitalisasi Dokumen",
      description: "Berkontribusi dalam pengembangan aplikasi seluler untuk mendukung proses pengumpulan dokumen administrasi di UPTD Puskesmas Garuda Bandung.",
      achievements: [
        "Mengembangkan aplikasi seluler menggunakan Flutter dan Dart.",
        "Mendukung digitalisasi proses pengumpulan dokumen administrasi.",
        "Berkolaborasi dengan tim KKN untuk menyesuaikan pengembangan aplikasi dengan kebutuhan instansi.",
      ],
      impactStats: [
        { label: "Platform", value: "Mobile (Flutter)" },
        { label: "Fokus", value: "Digitalisasi" },
        { label: "Kolaborasi", value: "Tim KKN" },
      ],
      tags: ["Flutter", "Dart", "Mobile App"],
      image: "/images/Experience/kkn_1.jpeg",
      images: [
        
      ],
    },
    {
      id: "exp-2",
      type: "Work Experience",
      period: "Februari — Juli 2025",
      role: "IT & Software Development Intern",
      organization: "PT Indopoly Swakarsa Industry Tbk",
      location: "Purwakarta, Jawa Barat",
      teamContext: "Divisi IT • Pengembangan Sistem & Dukungan TI",
      highlightMetric: "Nilai A (PPI) • ~1.000 Pesan/Hari",
      description: `Menjalani program magang selama lima bulan di divisi IT dengan fokus pada pengembangan sistem pengiriman WhatsApp yang terintegrasi dengan ERP dan pembuatan dasbor pemantauan.

Selain pengembangan perangkat lunak, turut membantu pemantauan tiket layanan TI serta kondisi suhu ruang server.`,
      achievements: [
        "Merancang alur pengiriman pesan dengan menyimpan data ke Microsoft SQL Server, mengatur antrean berdasarkan nomor urut, dan memperbarui status pesan melalui REST API.",
        "Mengoptimalkan proses pengisian pesan menggunakan JavaScript untuk mengurangi waktu pengiriman dan ketergantungan pada panjang pesan (terpangkas dari >30 detik menjadi ~10 detik per pesan).",
        "Mengembangkan dasbor pemantauan menggunakan React.js dan API berbasis C# dengan Microsoft SQL Server, dilengkapi fitur pencarian, penyaringan, detail pesan, kirim ulang, hapus pesan New, dan ekspor laporan ke Excel.",
        "Membuat mesin Python untuk menangani pengiriman ulang pesan gagal dan meningkatkan jumlah mesin dari 2 menjadi 4 untuk melayani hingga ~1.000 pesan per hari.",
        "Memantau tiket bantuan TI, memeriksa suhu ruang server, serta membantu penggantian sensor suhu ESP8266 dan pembaruan SSL fingerprint. Meraih nilai A pada program Praktik Industri (PPI).",
      ],
      impactStats: [
        { label: "Kecepatan Kirim", value: "~10 Detik" },
        { label: "Volume Harian", value: "~1.000 Pesan" },
        { label: "Nilai Magang", value: "A (PPI)" },
      ],
      tags: ["React.js", "C#", "REST API", "SQL Server", "Python", "Selenium", "JavaScript", "ESP8266"],
      image: "/images/Experience/indopoly_0.png",
      images: [
      
      ],
    },
    {
      id: "exp-3",
      type: "Work Experience",
      period: "Oktober — Desember 2021",
      role: "Maintenance & Automation Intern",
      organization: "PT Sanbe Farma",
      location: "Bandung, Jawa Barat",
      teamContext: "Tim Pemeliharaan dan Otomasi Manufaktur Farmasi",
      highlightMetric: "Pemeliharaan & PLC",
      description: "Mendukung tim Pemeliharaan dan Otomasi dalam kegiatan perawatan serta penanganan kendala mesin produksi otomatis di lingkungan manufaktur farmasi.",
      achievements: [
        "Membantu teknisi melaksanakan pemeliharaan preventif dan menangani kendala pada mesin produksi otomatis.",
        "Mendukung konfigurasi dan pemrograman PLC di bawah pengawasan teknisi.",
        "Membantu pekerjaan pengawatan listrik dan pemasangan mesin baru.",
        "Mempelajari penerapan otomasi industri, pemeliharaan peralatan, dan pemecahan masalah secara sistematis.",
      ],
      impactStats: [
        { label: "Durasi", value: "3 Bulan" },
        { label: "Bidang", value: "Otomasi & PLC" },
        { label: "Industri", value: "Farmasi" },
      ],
      tags: ["PLC", "Otomasi Industri", "Pemeliharaan Preventif", "Pengawatan Listrik"],
      image: "/images/Experience/sanbefarma.jpg",
      images: [
       
      ],
    },
    {
      id: "exp-4",
      type: "Organization",
      period: "2024 — 2026",
      role: "Staf Ahli Divisi Sarana dan Prasarana",
      organization: "Himpunan Mahasiswa Teknik Otomasi Manufaktur dan Mekatronika",
      location: "Politeknik Manufaktur Bandung",
      teamContext: "Divisi Sarana dan Prasarana",
      highlightMetric: "Logistik & Fasilitas",
      description: "Mendukung kegiatan organisasi mahasiswa melalui pengelolaan fasilitas, perlengkapan, dan kebutuhan logistik.",
      achievements: [
        "Menyiapkan fasilitas dan perlengkapan untuk mendukung kegiatan organisasi.",
        "Berkolaborasi dengan anggota divisi dan panitia agar persiapan kegiatan berjalan lancar.",
        "Membantu koordinasi perlengkapan serta kebutuhan logistik selama pelaksanaan kegiatan.",
      ],
      impactStats: [
        { label: "Posisi", value: "Staf Ahli" },
        { label: "Divisi", value: "Sarpras" },
        { label: "Periode", value: "2024–2026" },
      ],
      tags: ["Manajemen Logistik", "Koordinasi Tim", "Organisasi Mahasiswa"],
      image: "/images/Experience/hima_0.png",
      images: [
      
      ],
    },
  ],
};
