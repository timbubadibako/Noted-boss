# Noted — Asisten meetingmu boss, noted! 🎙️🤖

> **AI-Powered Meeting Intelligence, Acoustic Speaker Diarization, Voice Memory & Hardware Desk Companion.**

---

## 📌 Tentang Noted

**Noted** adalah asisten notulensi rapat cerdas berbasis kecerdasan buatan (AI) yang dirancang untuk mendampingi pimpinan rapat dan tim (*"The Boss"*). Noted mampu merekam suara rapat secara *real-time*, membedakan suara pembicara (*speaker diarization*), mengingat profil sidik suara peserta rapat lintas sesi (*Voice Memory*), serta mengekstrak risalah rapat resmi dengan **Tabel Penugasan Berdasarkan Divisi**.

Selain dapat dioperasikan oleh notulis melalui laptop, Noted juga dapat difungsikan sebagai **Hardware Desk Companion** pada tablet yang diletakkan di tengah meja rapat dengan wajah robot OLED interaktif yang ekspresif, tolah-toleh menyimak pembicara, dan manggut-manggut paham saat poin penting rapat disepakati.

---

## ✨ Fitur Utama

### 1. 🤖 Mode Meja Tablet (Hardware OLED Companion)
- **Ekspresi Hidup & Responsif:**
  - *Siap Boss! (Salute)*: Melompat sigap dan siap mencatat tugas saat perintah diberikan.
  - *Manggut Paham (Nodding)*: Mengangguk 2 kali dengan mata cerah saat kesepakatan tercapai.
  - *Tolah Kiri & Kanan*: Bola mata dan kepala menoleh mengikuti arah suara pembicara aktif di meja rapat.
  - *Menyimak Dalam (Curious)*: Memiringkan kepala saat mendengar bahasan mendalam atau pertanyaan.
  - *Kedip Siap (Wink)*: Mengonfirmasi pencatatan tugas dengan percaya diri.
- **Bebas Spektrum Kaku:** Wajah robot OLED bersih dengan mata bercahaya alami tanpa grafik spektrum audio yang mengganggu.

### 2. 🖥️ Studio Live Operator (Split Resizable 70 : 30)
- **Panel Kiri (70% - AI Stream):** Transkripsi *real-time* berstempel waktu, diarisasi pembicara otomatis, serta **Kartu Tangkap Tugas (*Directive Capture*)** yang langsung melabeli tugas ke divisi terkait.
- **Panel Kanan (30% - Catatan Notulis):** Lembar catatan manual operator dengan fitur auto-save dan daftar centang agenda rapat (*Agenda Checklist*).
- **Konfigurasi Pembicara Kilat:** Modal 5 detik di awal rapat untuk menyesuaikan nama Person 1, 2, 3 sebelum tablet diletakkan di meja.

### 3. 📑 Dokumen Risalah & Tabel Penugasan Berdasarkan Divisi
- Risalah rapat eksekutif (*Executive Minutes of Meeting*).
- **Tabel Tugas Terstruktur per Divisi:**
  - 🔵 **Divisi Backend & DevOps**: Tugas teknis, PIC, deadline, prioritas, dan kutipan konteks.
  - 🟣 **Divisi Quality Assurance (QA)**: Pengujian, validasi audit logging, dan uji beban.
  - 🟢 **Divisi Product & Operasional**: Panduan briefing layanan pelanggan dan materi rilis.
- **Matriks Keputusan Resmi Rapat** dengan nomor urut dokumen.
- **Multi-Format Export:** Ekspor PDF Resmi, Word (.docx), dan salin cepat ke Markdown/WhatsApp.

### 4. 👤 Basis Data Sidik Suara (Voice Memory Hub)
- Katalog biometrik akustik (vektor embedding sidik suara).
- Mengenali peserta rapat secara konsisten pada sesi-sesi berikutnya tanpa perlu penamaan ulang (rata-rata akurasi >96%).

---

## 🏗️ Arsitektur AI Berlapis (4-Layer Pipeline)

```text
[ Audio Stream dari Mikrofon Browser / Tablet ]
                     │
                     ▼
┌────────────────────────────────────────────────────────┐
│  LAYER 1: Speech-to-Text (STT) & Real-time Diarization │
│  (Deepgram Nova-2 / Faster-Whisper Streaming)          │
└────────────────────────────┬───────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────┐
│  LAYER 2: Acoustic Voice Biometrics & Memory Matching  │
│  (512-dim Vector Embedding Matching via pgvector)      │
└────────────────────────────┬───────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────┐
│  LAYER 3: Real-Time Intent & Directive Detector (NLP)  │
│  (Deteksi live perintah tugas divisi & emosi robot)    │
└────────────────────────────┬───────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────┐
│  LAYER 4: Heavy LLM Synthesis & Structured JSON Schema │
│  (Gemini 2.0 / GPT-4o -> Tabel Tugas Divisi & MoM)     │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Memulai (Getting Started)

### Prasyarat
- Node.js >= 18.0.0
- npm / yarn / pnpm

### Instalasi & Menjalankan Aplikasi

1. Clone repositori:
   ```bash
   git clone https://github.com/timbubadibako/Noted-boss.git
   cd Noted-boss
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

3. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```

4. Buka di browser:
   ```text
   http://localhost:3000
   ```

5. Build untuk produksi:
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Struktur Direktori

```text
noted/
├── app/
│   ├── globals.css          # Animasi perangkat OLED, ekspresi robot, dan gaya global
│   ├── layout.tsx           # RootLayout dengan font Inter & JetBrains Mono
│   └── page.tsx             # Halaman utama (Operator Studio, Risalah, Mode Meja)
├── components/
│   ├── MinutesDocument.tsx  # Tampilan risalah resmi & tabel tugas per divisi
│   ├── OperatorStudio.tsx   # Tampilan split 70:30 operator lapangan
│   ├── RobotCompanion.tsx   # Komponen karakter robot meja OLED interaktif
│   ├── SpeakerSetupModal.tsx# Modal konfigurasi pembicara kilat
│   └── VoiceProfilesView.tsx# Tampilan katalog sidik suara akustik
├── docs/                    # Dokumentasi SDLC (PRD, SRS, Backlog, Arsitektur)
├── lib/
│   ├── mock-data.ts         # Data simulasi sesi rapat dan profil suara
│   └── types.ts             # Definisi tipe TypeScript
├── mockups/                 # Mockup interaktif HTML
└── package.json
```

---

## 📄 Lisensi

Projek ini dilisensikan di bawah lisensi MIT.

---

*"Siap mencatat seluruh jalannya rapat, Boss!"* 🫡
