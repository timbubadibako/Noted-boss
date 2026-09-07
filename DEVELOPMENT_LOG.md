# 🚀 Noted — Development Log & Handover Protocol

**Project Name:** Noted  
**Tagline:** *"Asisten meetingmu boss, noted!"*  
**Status Projek:** Phase 3 Complete (Enterprise Dashboard, Sidebar, Splash Screen, & All Menu Views Implemented)  
**Terakhir Diperbarui:** 2026-09-07

---

## 📋 Status 5-Phase SDLC

- [x] **Phase 1 — Brainstorming, PRD, SRS & Backlog**
  - [x] Dokumen PRD & SRS di [`docs/PRD_SRS.md`](file:///home/jrilym/Projects/Draft/noted/docs/PRD_SRS.md).
  - [x] Product Backlog & Roadmap di [`docs/PRODUCT_BACKLOG.md`](file:///home/jrilym/Projects/Draft/noted/docs/PRODUCT_BACKLOG.md).
  - [x] Arsitektur 4-Layer AI Pipeline di [`docs/ARCHITECTURE_AND_API_SPEC.md`](file:///home/jrilym/Projects/Draft/noted/docs/ARCHITECTURE_AND_API_SPEC.md).

- [x] **Phase 2 — UI/UX Mockup via HTML Options**
  - [x] File HTML Mockup Notulensi Interaktif di [`mockups/meeting_assistant_mockup.html`](file:///home/jrilym/Projects/Draft/noted/mockups/meeting_assistant_mockup.html).
  - [x] File HTML Mockup Splash Screen di [`mockups/splash_screen_mockup.html`](file:///home/jrilym/Projects/Draft/noted/mockups/splash_screen_mockup.html).

- [x] **Phase 3 — Next.js Enterprise Implementation**
  - [x] **Splash Screen / Boot Sequence** ([`components/SplashScreen.tsx`](file:///home/jrilym/Projects/Draft/noted/components/SplashScreen.tsx)): Animasi pembuka diagnostik audio WebRTC, aktivasi mata OLED, dan sapaan *"Siap Boss!"*.
  - [x] **Sidebar Navigasi Perusahaan** ([`components/Sidebar.tsx`](file:///home/jrilym/Projects/Draft/noted/components/Sidebar.tsx)): Navigasi 7 modul dengan counter badge dinamis.
  - [x] **Executive Dashboard** ([`components/DashboardView.tsx`](file:///home/jrilym/Projects/Draft/noted/components/DashboardView.tsx)): Hero launcher, 4 metrik efisiensi rapat, daftar rapat terkini, dan tugas prioritas tinggi.
  - [x] **Papan Tugas Divisi** ([`components/CompanyTasksView.tsx`](file:///home/jrilym/Projects/Draft/noted/components/CompanyTasksView.tsx)): Pemetaan tugas lintas rapat per divisi teknis (Backend, QA, Product) dengan filter & ekspor.
  - [x] **Tanya Noted / AI Search** ([`components/KnowledgeBaseView.tsx`](file:///home/jrilym/Projects/Draft/noted/components/KnowledgeBaseView.tsx)): Pencarian tanya-jawab semantik ke riwayat keputusan rapat.
  - [x] **Ruang Rapat & Tablet Kiosk** ([`components/RoomsAndKioskView.tsx`](file:///home/jrilym/Projects/Draft/noted/components/RoomsAndKioskView.tsx)): Manajemen tablet meja, status mic, dan PIN Kiosk.
  - [x] **Pengaturan & Integrasi** ([`components/SettingsView.tsx`](file:///home/jrilym/Projects/Draft/noted/components/SettingsView.tsx)): Integrasi Google Calendar, Zoom bot, webhook Slack/WhatsApp, dan provider AI.
  - [x] **OLED Robot Companion** ([`components/RobotCompanion.tsx`](file:///home/jrilym/Projects/Draft/noted/components/RobotCompanion.tsx)): Mode meja tablet dengan ekspresi kaya (*Salute*, *Nodding*, *Tolah Kiri/Kanan*, *Curious*, *Wink*).
  - [x] **Live Operator Studio 70:30** ([`components/OperatorStudio.tsx`](file:///home/jrilym/Projects/Draft/noted/components/OperatorStudio.tsx)).
  - [x] **Dokumen Risalah MoM & Tabel Divisi** ([`components/MinutesDocument.tsx`](file:///home/jrilym/Projects/Draft/noted/components/MinutesDocument.tsx)).

- [ ] **Phase 4 — Backend AI Service & Empirical Integration**
  - [ ] Service Python FastAPI untuk audio streaming WebSocket.
  - [ ] Integrasi `pgvector` untuk pencocokan sidik suara otomatis.
  - [ ] Integrasi Gemini 2.0 Flash JSON Schema untuk ekstraksi tabel tugas divisi.

- [ ] **Phase 5 — Deployment & Runbook**
  - [ ] Docker Compose setup.
  - [ ] Runbook panduan penggunaan aplikasi.

---

## 📌 Cara Menjalankan Aplikasi Noted Lokal

```bash
cd /home/jrilym/Projects/Draft/noted
npm run dev
```
Akses di browser: `http://localhost:3000`

---
