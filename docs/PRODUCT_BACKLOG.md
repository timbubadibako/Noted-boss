# 🗂️ Product Backlog & User Stories — NotulaAI

## User Stories

### Epik 1: Perekaman & Transkripsi Audio Rapat
- **US-1.1:** Sebagai *pimpinan rapat*, saya ingin merekam jalannya rapat secara langsung melalui browser agar tidak memerlukan perangkat rekaman fisik terpisah.
- **US-1.2:** Sebagai *peserta rapat*, saya ingin mengunggah file rekaman audio rapat (MP3/WAV/M4A) yang sudah ada agar bisa diproses menjadi notulensi otomatis.
- **US-1.3:** Sebagai *notulis*, saya ingin sistem memisahkan teks ucapan per pembicara (`Person 1`, `Person 2`) beserta timestamp agar mudah dilacak.

### Epik 2: Notulensi Cerdas & Ekstraksi Tabel
- **US-2.1:** Sebagai *project manager*, saya ingin notulensi menampilkan tabel **Action Items** (Tugas, PIC, Deadline, Prioritas) secara eksplisit agar pembagian tugas setelah rapat jelas.
- **US-2.2:** Sebagai *peserta rapat*, saya ingin melihat ringkasan matriks keputusan penting (*Key Decisions*) agar tidak perlu membaca seluruh transkrip yang panjang.

### Epik 3: Speaker Identification & Voice Profile Memory
- **US-3.1:** Sebagai *user*, saya ingin dapat mengganti nama pembicara `Person 1` menjadi nama asli (misal: "Budi") hanya dengan satu klik pada transkrip.
- **US-3.2:** Sebagai *sistem AI*, AI mendeteksi secara otomatis saat peserta memperkenalkan diri (misal: "Saya Rina dari Marketing...") dan menyarankan pengubahan nama pembicara.
- **US-3.3:** Sebagai *user*, saya ingin sistem menyimpan *Voice Profile/Memory* peserta rapat agar pada rapat berikutnya sistem otomatis mengenali ucapan orang tersebut tanpa perlu penamaan ulang.

---

## 📌 Development Roadmap (Sprint Plan)

### Sprint 1: Prototype UI/UX & Interactive HTML Mockups (Phase 2)
- [ ] Buat **HTML Interactive Mockups** (Dashboard, Perekam Rapat, Halaman Detail Notulensi dengan Tabel Task & Speaker Editor).
- [ ] Tentukan Design System (skema warna slate-navy, tipografi Inter/sans-serif).

### Sprint 2: Core Frontend Setup & Mock API (Phase 3)
- [ ] Setup Next.js 14 (App Router) + Tailwind CSS + Lucide Icons.
- [ ] Implementasi Web Audio Recording Component (Audio Visualizer, Timer, Pause/Stop).
- [ ] Implementasi Mock Data untuk Notulensi & Speaker Editor.

### Sprint 3: Backend & AI Engine Integration
- [ ] Setup Python FastAPI Service.
- [ ] Integrasi Deepgram / Whisper API untuk Audio Diarization.
- [ ] Integrasi Gemini / GPT-4o dengan Structured Output untuk ekstraksi Notulensi & Action Items Table.
- [ ] Implementasi Voice Profile Embedding Matching (Memory Feature).

### Sprint 4: Testing & Empirical Debugging (Phase 4)
- [ ] Test Cases untuk perekaman audio panjang, format audio berbeda, dan akurasi diarization.
- [ ] Linting, type check, dan build verification.

### Sprint 5: Deployment & User Guide (Phase 5)
- [ ] Pembuatan `DEVELOPMENT_LOG.md`, Runbook deployment, dan User Manual.

---
