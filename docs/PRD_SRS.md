# 📄 Product Requirement Document (PRD) & Software Requirement Specification (SRS)

## 📌 Project Overview
**Nama Project:** `Noted`  
**Tagline:** *"Asisten meetingmu boss, noted!"*  
**Visi Produk:** Asisten notulensi rapat pintar berbasis AI dengan persona robot asisten setia ("Siap Boss, noted!"), mampu melakukan *acoustic speaker diarization*, perekaman live, *Voice Memory* (pengenal sidik suara lintas rapat), dan menyusun risalah rapat resmi dengan **Tabel Penugasan Terkelompok per Divisi**.

---

## 🎯 Target Pengguna & Persona
1. **Pimpinan Rapat / Executive Lead ("The Boss"):** Memberikan arahan dan menugaskan pekerjaan ke divisi terkait dengan kepastian bahwa asisten mencatat dengan presisi tinggi.
2. **Notulis / Operator Lapangan:** Mengoperasikan tampilan *Live Operator (70:30)* untuk memverifikasi nama pembicara, menambahkan catatan kontekstual manual, dan memfinalisasi notulensi.
3. **Divisi Tim (Backend, QA, Product, Marketing):** Menerima risalah rapat terstruktur dengan daftar tugas spesifik per divisi lengkap dengan PIC, deadline, dan konteks perintah.

---

## 📋 Software Requirement Specification (SRS)

| ID | Modul | Deskripsi Fitur |
|---|---|---|
| **FR-01** | **Audio Ingestion & Streaming Diarization** | Mengubah audio live dari mikrofon browser/tablet menjadi teks berstempel waktu secara real-time dengan latensi <300ms (Deepgram Nova-2 / Faster-Whisper). |
| **FR-02** | **Voice Biometrics & Memory Hub** | Ekstraksi 512-dim vector embedding untuk mencocokkan suara pembicara dengan profil tersimpan di database `pgvector` (akurasi rata-rata >96%). |
| **FR-03** | **Live Operator Studio (70:30 Split)** | Panel ganda: 70% streaming transkrip dengan *directive capture*, 30% lembar catatan manual notulis tersinkronisasi AI dan checklist agenda rapat. |
| **FR-04** | **Konfigurasi Pembicara Kilat (Fast Speaker Setup)** | Modal 5 detik di awal rapat untuk menyesuaikan nama Person 1, 2, 3 sebelum tablet ditaruh di tengah meja rapat. |
| **FR-05** | **Hardware Tablet Companion Mode** | Tampilan layar penuh tablet meja rapat dengan karakter OLED Robot beranimasi ekspresif: *Siap Boss! (Salute)*, *Manggut-manggut Paham (Nodding)*, *Tolah Kiri/Kanan*, dan *Menyimak Dalam*. |
| **FR-06** | **Tabel Penugasan Berdasarkan Divisi** | LLM Synthesis (Gemini 2.0 / GPT-4o JSON Schema) untuk mengelompokkan tugas per divisi teknis (Backend & DevOps, QA, Product, Marketing) lengkap dengan PIC, deadline, dan kutipan perintah. |
| **FR-07** | **Multi-Format Export Engine** | Ekspor risalah rapat ke format resmi PDF, Word (.docx), dan salin cepat ke Markdown/WhatsApp. |

---

## 🎨 Enterprise Design System Guidelines
- **Palet Warna:** Deep Obsidian (`#020617`, `#0f172a`), Precision Cobalt Blue (`#2563eb`), Crisp Off-White (`#f8fafc`).
- **Tipografi:** `Inter` untuk body text dan heading; `JetBrains Mono` untuk metadata, timestamp, dan stempel akurasi akustik.
- **Tone & Copywriting:** Profesional, lugas, dengan persona pendamping yang siap tanggap (*"Siap Boss, noted!"*).
