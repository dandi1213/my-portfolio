import type { Portfolio } from "./types";

export const portfolio: Portfolio = {
  name: "M Dandi Al Idrus",
  monogram: "MD",
  title: "Junior Software Developer",
  tagline: "Building practical software solutions for real-world problems.",
  intro: "D4 Industrial Information Engineering Technology graduate with 5 months of internship experience in IT and software development, including ERP-integrated web applications and WhatsApp automation.",
  focus: ["Software Development", "Web Development", "Industrial IoT"],
  openTo: "Open to entry-level opportunities in Software Development, Web Development, Application Development, and IT.",
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
    birth: "08 October 2003",
    address: "Purwakarta",
    phone: "+62 878-2947-8221", // contoh: "+62 812-3456-7890"
  },

  about: [
    "I graduated with a D4 degree in Industrial Information Engineering Technology from Politeknik Manufaktur Bandung. My academic background combines software development, information technology, IoT, and industrial automation.",
    "During my five-month internship at PT Indopoly Swakarsa Industry Tbk, I developed a web-based WhatsApp monitoring dashboard integrated with the company's ERP system. My work involved frontend development, backend integration, database management, and WhatsApp message automation.",
    "I enjoy solving technical problems, learning new technologies, and building practical solutions. I am looking for an entry-level role where I can contribute to software development or IT projects while continuing to grow as an engineer.",
  ],

  // Entri pertama dianggap pendidikan terakhir. Harus tepat 2 entri.
  education: [
    {
      institution: "Politeknik Manufaktur Bandung",
      program: "D4 Industrial Information Engineering Technology",
      logo: "/education/polman.png",
      period: "2022 – 2026",
      description: "Graduated with a GPA of 3.32/4.00. Final project focused on smart agriculture using IoT and machine learning.",
    },
    {
      institution: "SMKN 1 Plered",
      program: "Industrial Automation Engineering",
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
      employmentType: "Internship",
      period: "February 2025 - July 2025", // ganti dengan periode pasti, mis. "Feb 2025 – Jun 2025"
      location: "Purwakarta",
      description: "Five-month internship focused on a web-based WhatsApp monitoring dashboard integrated with the company's ERP system, covering frontend, backend integration, database work, and WhatsApp message automation.",
      responsibilities: [
        "Developed the WhatsApp monitoring dashboard across frontend and backend components.",
        "Built the frontend with React.js and backend functionality with C#, connected through REST API.",
        "Worked with Microsoft SQL Server to read and manage message data.",
        "Implemented message status monitoring, search and filtering, message details, and manual retry for failed messages.",
        "Used Python and Selenium for WhatsApp message automation.",
      ],
      achievements: ["Delivered a dedicated interface for checking message statuses and manually resending failed messages.", "Contributed to expanding the sending engine setup from one to four engines."],
      stack: ["React.js", "C#", "REST API", "Microsoft SQL Server", "Python", "Selenium"],
      url: "https://drive.google.com/file/d/1T2xb2MiQ4nySWIRS2-lFjGtyuL4kzeZ-/view?usp=sharing", // tautan referensi perusahaan atau bukti magang, jika ada
      projectSlug: "whatsapp-monitoring-dashboard",
      images: [
        "/internship/Indopoly/indopoly_0.jpeg",
        "/internship/Indopoly/indopoly_1.jpeg",
        "/internship/Indopoly/indopoly_2.jpeg",
        "/internship/Indopoly/indopoly_3.jpeg",
        "/internship/Indopoly/indopoly_4.jpeg",
        "/internship/Indopoly/indopoly_5.jpeg",
        "/internship/Indopoly/indopoly_6.jpeg",
      ],
    },
    {
      slug: "puskesmas-garuda-kkn",
      kind: "work",
      organization: "UPTD Puskesmas Garuda Bandung",
      role: "Mobile Application Developer",
      employmentType: "KKN Project",
      period: "October 2025 - November 2025", // ganti dengan periode pasti, mis. "Feb 2025 – Jun 2025"
      location: "Bandung, Indonesia",
      description: "Developed a mobile application to support document collection at UPTD Puskesmas Garuda Bandung as part of a community service program (KKN).",
      responsibilities: [
        "Developed a mobile application using Flutter and Dart.",
        "Supported the digitalization of document collection processes at the health center.",
        "Worked with the KKN team to develop an application based on the identified needs of the institution.",
      ],
      achievements: ["Contributed to the development of a mobile application to support administrative document collection."],
      stack: ["Flutter", "Dart", "Mobile Application Development"],
      url: "",
      projectSlug: "",
      images: ["/kkn/kkn_1.jpeg", "/kkn/kkn_2.png", "/kkn/kkn_3.png", "/kkn/kkn_4.png"],
    },
    {
      slug: "sanbe-farma-internship",
      kind: "work",
      organization: "PT Sanbe Farma",
      role: "Maintenance & Automation Intern",
      employmentType: "Internship",
      period: "October 2021 - December 2021", // ganti dengan periode pasti, mis. "Feb 2025 – Jun 2025"
      location: "Bandung, Indonesia",
      description: "Internship experience supporting the Maintenance and Automation team in maintaining and troubleshooting automated production machines in a pharmaceutical manufacturing environment.",
      responsibilities: [
        "Assisted technicians with preventive maintenance and troubleshooting of automated production machines.",
        "Supported technicians with PLC configuration and programming under supervision.",
        "Assisted with electrical wiring activities and the installation of new machines.",
        "Learned about industrial automation systems, equipment maintenance, and systematic troubleshooting.",
      ],
      achievements: [
        "Gained hands-on exposure to industrial automation and maintenance practices in a manufacturing environment.",
        "Developed a foundational understanding of PLC systems, electrical wiring, and automated production equipment.",
      ],
      stack: ["PLC", "Industrial Automation", "Preventive Maintenance", "Troubleshooting", "Electrical Wiring"],
      url: "", // tautan referensi perusahaan atau bukti magang, jika ada
      projectSlug: "",
      images: ["/internship/SanbeFarma/sanbe_1.JPG", "/internship/SanbeFarma/sanbe_2.JPG", "/internship/SanbeFarma/sanbe_3.jpg", "/internship/SanbeFarma/sanbe_4.JPG", "/internship/SanbeFarma/sanbe_5.JPG"],
    },
    {
      slug: "hima-organization",
      kind: "organization",
      organization: "Himpunan Mahasiswa Teknik Otomasi Manufaktur dan Mekatronika",
      role: "Expert Staff, Facilities and Infrastructure Division",
      employmentType: "Organization",
      period: "2024 - 2026",
      description: "Contributed to student organization activities in the fields of manufacturing automation and mechatronics, supporting facilities and infrastructure needs to ensure smooth event operations.",
      responsibilities: [
        "Assisted in preparing facilities, equipment, and other resources needed for organizational activities.",
        "Collaborated with division members and other committee members to support the successful execution of events.",
        "Supported the coordination and management of equipment and logistical requirements for organizational activities.",
      ],
      achievements: ["Contributed to the smooth execution of organizational activities through facilities preparation and coordination."],
      images: ["/Organization/himamo/himamo_1.JPG", "/Organization/himamo/himamo_2.JPG", "/Organization/himamo/himamo_3.jpg"],
      isDemo: false,
    },
  ],

  projects: [
    {
      slug: "whatsapp-monitoring-dashboard",
      title: "WhatsApp Monitoring Dashboard Integrated with ERP",
      summary: "A web-based dashboard developed during my internship to monitor WhatsApp messages connected to the company's existing ERP system.",
      problem: "The messaging process relied on a single sending engine, which could result in long queues and failed messages. A dedicated interface was needed to make message statuses easier to monitor.",
      role: "Developed the dashboard across frontend and backend components, integrated the application with the existing ERP environment, and implemented message monitoring and retry features.",
      process:
        "Built the frontend using React.js, developed backend functionality using C#, connected components through REST API, and used Microsoft SQL Server to work with message data. Python and Selenium were used for WhatsApp automation.",
      outcome:
        "Delivered a dedicated interface for checking message statuses, searching and filtering records, viewing message details, and manually resending failed messages. Also contributed to the expansion of the sending engine setup from one to four engines.",
      features: ["Message status monitoring", "Search and filter message records", "Message details and manual retry", "WhatsApp automation"],
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
      ],
      // Lebih dari satu gambar? Pakai: images: ['/projects/a.png', { src: '/projects/b.png', caption: 'Halaman detail' }],
      // (jika `images` diisi, ia dipakai menggantikan `image`)
      isDemo: false,
    },
    {
      slug: "smart-agriculture-iot-machine-learning",
      title: "Smart Agriculture Decision Support System",
      summary: "An academic final project combining IoT and machine learning to support crop recommendations and irrigation water requirement estimation.",
      problem: "The project explored how data-driven recommendations could support crop selection and irrigation planning in agriculture.",
      role: "Worked on the development of a decision support system using machine learning methods for crop recommendations and irrigation water estimation.",
      process: "Used Python, Pandas, and Scikit-learn for data processing and model development, applying Random Forest Classifier and Random Forest Regression.",
      outcome: "Developed an academic decision support system focused on crop recommendations and irrigation water requirements. No quantitative performance claims are included here.",
      features: ["Crop recommendation", "Irrigation water requirement estimation", "Machine learning model development"],
      stack: ["Python", "Pandas", "Scikit-learn", "Random Forest", "IoT"],
      repoUrl: "",
      demoUrl: "https://ta-frontend-polman-bandung.vercel.app/",
      images: [
        { src: "/projects/TA/ta_1.png", caption: "System Dashboard" },
        { src: "/projects/TA/ta_5.png", caption: "System Overview" },
        { src: "/projects/TA/ta_2.jpeg", caption: "System Demonstration with Examiners" },
        { src: "/projects/TA/ta_3.jpeg", caption: "Sensor Circuit Assembly" },
        { src: "/projects/TA/ta_4.jpeg", caption: "Soil and Leaf Sensors in Application" },
      ],
      isDemo: false,
    },
    {
      slug: "puskesmas-garuda-document-collection-app",
      title: "Puskesmas Garuda Document Collection Mobile App",
      summary: "A mobile application developed to support document collection at UPTD Puskesmas Garuda Bandung during a community service program (KKN).",
      problem: "The project aimed to support the document collection process at UPTD Puskesmas Garuda Bandung through a mobile application.",
      role: "Contributed to the development of a mobile application using Flutter and Dart as part of the KKN team.",
      process: "Developed the mobile application using Flutter and Dart based on the identified needs of the institution.",
      outcome: "Contributed to the development of a mobile application to support administrative document collection at UPTD Puskesmas Garuda Bandung.",
      features: ["Mobile application for document collection", "Digital support for administrative document handling"],
      stack: ["Flutter", "Dart", "Mobile Application Development"],
      repoUrl: "",
      demoUrl: "",
      images: ["/kkn/kkn_1.jpeg", "/kkn/kkn_2.png", "/kkn/kkn_3.png", "/kkn/kkn_4.png"],
      isDemo: false,
    },
    {
      slug: "esp32-iot-web-configuration-system",
      title: "ESP32-Based IoT Monitoring and Web Configuration System",
      summary: "An ESP32-based IoT system featuring a built-in web interface for configuring WiFi connectivity, selecting communication modes, and managing sensor settings for remote monitoring applications.",
      problem:
        "Configuring IoT devices traditionally requires modifying and uploading firmware whenever communication settings need to be changed. This project provides a web-based configuration interface to simplify device setup without requiring firmware reprogramming.",
      role: "Collaborated on developing an ESP32-based IoT configuration system with a built-in web server, allowing users to manage WiFi settings, select communication modes, and configure sensor options through a web browser.",
      process:
        "Developed the ESP32 web configuration interface using Arduino IDE and ESP32 libraries. Implemented WiFi Access Point and Station configuration, operational mode selection, and device status monitoring. Integrated configuration options for GSM using SIM800 and LoRa communication using RFM95/SX1276 modules.",
      outcome:
        "Developed a web-based configuration system that allows users to configure WiFi credentials, select GSM, WiFi, or LoRa communication modes, choose supported sensor options, and monitor device status through a browser without reprogramming the ESP32.",
      features: [
        "Built-in ESP32 web server and configuration dashboard",
        "WiFi Access Point and Station configuration",
        "WiFi credential management and automatic reconnection",
        "GSM communication mode using SIM800",
        "LoRa communication mode using RFM95/SX1276",
        "LoRa sensor selection for water level and NPK",
        "Real-time device status monitoring",
        "Persistent configuration storage",
      ],
      stack: ["ESP32", "Arduino IDE", "C/C++", "HTML", "CSS", "JavaScript", "WiFi", "WebServer", "GSM", "LoRaWAN", "IoT"],
      repoUrl: "",
      demoUrl: "",
      images: ["/pbl/pbl_1.png", "/pbl/pbl_2.png"],
      isDemo: false,
    },
    {
      slug: "drilling-control-operation-mes",
      title: "Drilling Control Operation – Manufacturing Execution System",
      summary: "An industrial automation project focused on developing a Drilling Control System integrated with a Manufacturing Execution System (MES) for machine control, real-time monitoring, and production efficiency analysis.",
      problem:
        "The project addressed the need for an integrated drilling control system that enables operators to monitor machine status, control motor movements, manage manual and automatic operating modes, and visualize operational data through a centralized dashboard.",
      role: "Collaborated on the development of a drilling control and monitoring system using PLC-based automation and a Node-RED dashboard. The project involved implementing motor control logic, designing the user interface, integrating PLC communication, visualizing sensor data, and developing Overall Equipment Effectiveness (OEE) calculations.",
      process:
        "Developed PLC control logic using Bosch Rexroth ctrlX PLC and configured Node-RED flows for dashboard functionality and PLC communication. Implemented manual and automatic drilling cycles, forward and reverse motor control, limit switch handling, SVG machine animation, sensor monitoring, real-time data visualization, machine operating-time tracking, and OEE calculations based on availability, performance, and quality.",
      outcome:
        "Developed an integrated drilling control prototype featuring manual and automatic machine operation, a dashboard for real-time control and monitoring, sensor data visualization, and OEE performance indicators. The project demonstrated the integration of PLC-based automation and a Node-RED interface to support industrial machine operation and monitoring.",
      features: [
        "Manual and automatic drilling operation",
        "PLC-based motor forward and reverse control",
        "Limit switch integration and automatic cycle sequencing",
        "Node-RED dashboard with login and logout functionality",
        "SVG-based drilling machine animation",
        "Real-time machine status and sensor monitoring",
        "Sensor data visualization using charts",
        "Machine operating-time tracking",
        "OEE calculation and visualization",
        "PLC and dashboard integration using ctrlX and Node-RED",
      ],
      stack: ["Bosch Rexroth ctrlX", "PLC", "Node-RED", "JavaScript", "SVG", "Industrial Automation", "Manufacturing Execution System (MES)", "OEE"],
      repoUrl: "https://drive.google.com/file/d/12Pmb_1e9CjXzcDmS2qsMZ5WGkOao5_Q7/view?usp=sharing",
      demoUrl: "",
      images: [
        { src: "/projects/MES/mes_1.png", caption: "System Overview" },
        { src: "/projects/MES/mes_2.png", caption: "Control and Monitoring Dashboard" },
        { src: "/projects/MES/mes_3.png", caption: "Data Visualization Dashboard" },
        { src: "/projects/MES/mes_4.png", caption: "PLC Ladder Logic Diagram" },
        { src: "/projects/MES/mes_5.png", caption: "Visualization in CODESYS CtrlX Software" },
        { src: "/projects/MES/mes_6.png", caption: "Node-RED Flow Overview" },
      ],
      isDemo: false,
    },
  ],

  certificates: [
    {
      name: "Webinar on the Application and Implementation of Industrial Automation in the Manufacturing Industry",
      issuer: "Kampus Merdeka",
      year: "2024",
      image: "/certificate/webinar.png", // contoh: "/certificates/python.jpg". Banyak gambar: images: ["/certificate/a.png", "/certificate/b.png"]
      url: "https://drive.google.com/file/d/1tgb_HW2VgPFaJJjdcNpqF82SrICZxI1D/view?usp=sharing", // link sertifikat / kredensial, jika ada
    },
    {
      name: "TOEFL-CERTIFIED ENGLISH",
      issuer: "PT. MAIRODI MANDIRI SEJAHTERA",
      year: "2024",
      image: "/certificate/TOEFL.png", // contoh: "/certificates/python.jpg"
      url: "https://drive.google.com/file/d/1uPmvCE9Hvk0wpyT6ZIZmyZuqQfW7xLp_/view?usp=sharing", // link sertifikat / kredensial, jika ada
    },
    {
      name: "Basic Python Programming Training",
      issuer: "Program Kartu Prakerja",
      year: "2023",
      image: "/certificate/E-SERTIFIKAT_KOMPETENSI.png", // contoh: "/certificates/python.jpg"
      url: "https://drive.google.com/file/d/1VZt7h7PJHI_77MWV0zl1YmX4mGUzjr5T/view?usp=sharing", // link sertifikat / kredensial, jika ada
    },
    {
      name: "CERTIFICATE OF COMPETENCY ASSESSMENT",
      issuer: "SMKN 1 PLERED",
      year: "2022",
      image: "/certificate/UJIKOM_SMK.png", // contoh: "/certificates/python.jpg"
      url: "https://drive.google.com/file/d/1jpF300mhDxuFxR3kzFw_5cKF6BvJQDWY/view?usp=sharing", // link sertifikat / kredensial, jika ada
    },
  ],

  awards: [
    {
      title: "1st Place - Assembly Bluetooth Smartcar",
      issuer: "Robonesia, UPTD TIKOMDIK & West Java Provincial Education Office",
      year: "2021",
      description:
        "Won 1st place in the Assembly Bluetooth Smartcar category at the J.E.R.C. (Jabar Robotic Expo & Competition), held from May 31 to June 5, 2021, organized by Robonesia in collaboration with the UPTD for Educational Information and Communication Technology (TIKOMDIK) and the West Java Provincial Education Office.",
      url: "https://drive.google.com/file/d/13x3PeQEWZxYH992RZh659NfV2Nikg7Ad/view?usp=sharing", // tautan bukti atau referensi penghargaan, jika ada
    },
    {
      title: "Smart Agriculture Decision Support System Based on Internet of Things and Machine Learning for Crop Recommendation and Irrigation Water Requirements",
      issuer: "Politeknik Manufaktur Bandung",
      year: "2026",
      description:
        "Developed a research-based smart agriculture decision support system integrating Internet of Things (IoT) and Machine Learning to recommend suitable crops and estimate irrigation water requirements, supporting data-driven agricultural decision-making and efficient water management.",
      url: "https://drive.google.com/file/d/1JFb92bsdhxB056PpOSyOoIln5O3HQvo6/view?usp=sharing", // tautan bukti atau referensi penghargaan, jika ada
    },
    {
      title: "Analysis of the Level of Understanding Among Industrial Informatics Engineering Technology Students Regarding the Use of the JavaScript Programming Language",
      issuer: "Informatika Dan Teknologi (INTECH)",
      year: "2026",
      description:
        "Conducted a research study analyzing the level of understanding among Industrial Informatics Engineering Technology students regarding the use of JavaScript programming language. The study aimed to assess students' programming knowledge, identify challenges in understanding JavaScript concepts, and evaluate their familiarity with its practical application in programming.",
      url: "", // tautan bukti atau referensi penghargaan, jika ada
    },
  ],

  // Logo: taruh file di public/assets/tech/ dengan nama yang sama seperti path di bawah.
  // Jika file belum ada, otomatis tampil kotak placeholder.
  techStack: [
    {
      category: "Programming Languages",
      items: [
        { name: "Python", logo: "/assets/tech/python.png" },
        { name: "JavaScript", logo: "/assets/tech/javascript.png" },
        { name: "C#", logo: "/assets/tech/csharp.svg" },
        { name: "PHP", logo: "/assets/tech/php.svg" },
      ],
    },
    {
      category: "Web Development",
      items: [
        { name: "React.js", logo: "/assets/tech/react.svg" },
        { name: "HTML", logo: "/assets/tech/html.svg" },
        { name: "CSS", logo: "/assets/tech/css.svg" },
      ],
    },
    {
      category: "Database",
      items: [
        { name: "Microsoft SQL Server", logo: "/assets/tech/sql_server.svg" },
        { name: "MySql", logo: "/assets/tech/mysql.svg" },
        { name: "MongoDB", logo: "/assets/tech/mongodb.svg" },
      ],
    },
    {
      category: "Tools & Automation",
      items: [
        { name: "Git", logo: "/assets/tech/git.svg" },
        { name: "Selenium", logo: "/assets/tech/selenium.svg" },
      ],
    },
    {
      category: "Data & Machine Learning",
      items: [
        { name: "Pandas", logo: "/assets/tech/pandas.svg" },
        { name: "Scikit-learn", logo: "/assets/tech/scikit-learn.svg" },
      ],
    },
    {
      category: "IoT & Industrial Automation",
      items: [
        { name: "ESP32", logo: "/assets/tech/esp32.svg" },
        { name: "Arduino", logo: "/assets/tech/arduino.svg" },
        { name: "PLC", logo: "/assets/tech/plc.svg" },
      ],
    },
  ],

  seo: {
    title: "M Dandi Al Idrus — Junior Software Developer",
    description: "Portfolio of M Dandi Al Idrus, a D4 Industrial Informatics Engineering graduate with internship experience in software development, ERP integration, WhatsApp automation, IoT, and industrial automation.",
  },
};
