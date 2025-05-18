import { QuestionData } from '../types/gameTypes';

// White cards focus on traffic sign recognition
export const whiteCards: QuestionData[] = [
  {
    question: "Apa arti rambu ini?",
    options: ["Tikungan tajam ke kiri", "Tikungan tajam ke kanan", "Tikungan tajam ke kanan di belakang", "Tikungan tajam ke kiri di belakang"],
    correct: "Tikungan tajam ke kanan",
    hint: "Perhatikan arah panah pada rambu"
  },
  {
    question: "Apa arti rambu ini?",
    options: ["Dilarang berhenti", "Dilarang masuk", "Dilarang belok", "Dilarang lewat"],
    correct: "Dilarang masuk",
    hint: "Rambu ini melarang kendaraan untuk memasuki area"
  },
  {
    question: "Apa arti rambu ini?",
    options: ["Jalan untuk penyandang disabilitas", "Jalan untuk lansia", "Jalan pejalan kaki", "Jalan khusus pejalan kaki"],
    correct: "Jalan pejalan kaki",
    hint: "Rambu ini menunjukkan area khusus untuk pejalan kaki"
  },
  {
    question: "Apa arti rambu ini?",
    options: ["Jalan satu arah", "Dilarang belok kanan", "Memberi prioritas lawan", "Dilarang berbalik arah"],
    correct: "Dilarang berbalik arah",
    hint: "Rambu ini melarang kendaraan untuk berputar balik"
  },
  {
    question: "Apa yang harus dilakukan saat melihat rambu STOP?",
    options: ["Berhenti & putar balik", "Berhenti sejenak, cek aman, lanjut", "Terus tanpa melakukan apa-apa", "Tambah kecepatan & lanjut"],
    correct: "Berhenti sejenak, cek aman, lanjut",
    hint: "Rambu ini mengharuskan kendaraan untuk berhenti sepenuhnya"
  }
];

// Black cards focus on general traffic knowledge
export const blackCards: QuestionData[] = [
  {
    question: "Apa yang harus dilakukan jika terjadi ban pecah saat berkendara?",
    options: [
      "Menginjak rem mendadak",
      "Mengemudi lebih cepat",
      "Meneruskan perjalanan dengan kecepatan biasa",
      "Mengurangi kecepatan perlahan & menepi ke bahu jalan"
    ],
    correct: "Mengurangi kecepatan perlahan & menepi ke bahu jalan",
    hint: "Pilih tindakan yang paling aman untuk semua"
  },
  {
    question: "Apa yang harus dilakukan ketika melihat seseorang yang terluka akibat kecelakaan di jalan raya?",
    options: [
      "Meninggalkan tempat kejadian",
      "Memanggil orang lain untuk membantu",
      "Mengambil foto korban kecelakaan",
      "Membantu korban segera & memanggil bantuan"
    ],
    correct: "Membantu korban segera & memanggil bantuan",
    hint: "Prioritaskan keselamatan korban"
  },
  {
    question: "Komponen terjadinya lalu lintas adalah...",
    options: [
      "Manusia, kendaraan & jalan",
      "Manusia, kendaraan & rambu",
      "Manusia, jalan & rambu",
      "Manusia, jalan & lingkungan"
    ],
    correct: "Manusia, kendaraan & jalan",
    hint: "Tiga komponen utama dalam sistem lalu lintas"
  },
  {
    question: "Tempat penyebrangan berupa garis putih-hitam adalah...",
    options: ["Halte", "Trotoar", "Terminal", "Zebra cross"],
    correct: "Zebra cross",
    hint: "Tempat khusus untuk penyeberangan pejalan kaki"
  },
  {
    question: "Kepanjangan STNK adalah...",
    options: [
      "Surat tanda naik kendaraan",
      "Surat tanda nomor kendaraan",
      "Surat tanda nomor keahlian",
      "Surat tugas nomor kendaraan"
    ],
    correct: "Surat tanda nomor kendaraan",
    hint: "Dokumen resmi kepemilikan kendaraan"
  },
  {
    question: "Syarat usia untuk memiliki SIM adalah...",
    options: ["16 tahun", "17 tahun", "18 tahun", "19 tahun"],
    correct: "17 tahun",
    hint: "Usia minimal sesuai peraturan di Indonesia"
  },
  {
    question: "Jika lampu lalu lintas menyala kuning, maka kita harus...",
    options: [
      "Tancap gas",
      "Bersiap berhenti",
      "Belok kiri langsung",
      "Jalan terus tanpa melihat sekitar"
    ],
    correct: "Bersiap berhenti",
    hint: "Tanda peringatan untuk perubahan lampu"
  },
  {
    question: "Fungsi trotoar adalah untuk...",
    options: [
      "Tempat parkir sepeda motor",
      "Jalur kendaraan umum",
      "Tempat berjalan kaki",
      "Tempat jualan kaki lima"
    ],
    correct: "Tempat berjalan kaki",
    hint: "Fasilitas untuk pejalan kaki"
  },
  {
    question: "Warna dasar rambu peringatan biasanya adalah...",
    options: ["Biru", "Kuning", "Putih", "Merah"],
    correct: "Kuning",
    hint: "Warna yang mudah terlihat"
  },
  {
    question: "Marka jalan garis putus-putus berarti...",
    options: [
      "Boleh mendahului jika aman",
      "Tidak boleh berhenti",
      "Wajib belok kiri",
      "Khusus pejalan kaki"
    ],
    correct: "Boleh mendahului jika aman",
    hint: "Marka yang memperbolehkan perpindahan lajur"
  }
];