'use client';

import React from 'react';
import Link from 'next/link';
import {
  AudioWaveform,
  ShieldCheck,
  Cpu,
  Tablet,
  CheckCircle2,
  Lock,
  ArrowRight,
  Zap,
  Building2,
  FileText,
  Sparkles,
} from 'lucide-react';

export default function SaasLandingPage() {
  return (
    <div className="min-h-screen bg-[#050811] text-white font-sans antialiased selection:bg-accent-600 selection:text-white flex flex-col justify-between">
      
      {/* NAVBAR */}
      <header className="border-b border-brand-800/60 sticky top-0 z-40 bg-[#050811]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-accent-600 flex items-center justify-center font-bold text-white shadow-lg shadow-accent-600/30">
              <AudioWaveform className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-wider">NOTED</span>
                <span className="text-[10px] bg-brand-800 text-sky-300 border border-brand-700 px-2 py-0.5 rounded font-mono font-medium">
                  ENTERPRISE B2B
                </span>
              </div>
              <p className="text-[11px] text-brand-400 font-medium">
                Asisten meetingmu boss, noted!
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-brand-300">
            <a href="#fitur" className="hover:text-white transition">Fitur Utama</a>
            <a href="#keamanan" className="hover:text-white transition">Privasi & AI Lokal</a>
            <a href="#arsitektur" className="hover:text-white transition">Markdown Lake</a>
            <a href="#harga" className="hover:text-white transition">Paket Enterprise</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="text-xs font-semibold px-4 py-2 rounded-xl text-brand-200 hover:text-white transition border border-brand-800 hover:border-brand-700"
            >
              Masuk Portal
            </Link>
            <Link
              href="/login"
              className="bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-accent-600/20 transition flex items-center gap-2"
            >
              <span>Demo Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-28 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/30 text-sky-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Hardware Desk Companion & Acoustic Diarization untuk Perusahaan</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Asisten Rapat Pintar di Meja Bos, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400">
              Langsung Catat Tugas per Divisi.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-brand-300 leading-relaxed">
            Letakkan tablet di tengah meja rapat. Karakter robot OLED ekspresif tolah-toleh menyimak, mengenali suara peserta dengan <strong>Voice Memory</strong> lokal, dan mengekstrak tabel penugasan resmi per divisi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/login"
              className="bg-accent-600 hover:bg-accent-500 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-xl shadow-accent-600/30 transition flex items-center gap-2.5"
            >
              <span>Coba Demo Enterprise Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#fitur"
              className="bg-brand-900/80 hover:bg-brand-800 text-brand-200 border border-brand-700 text-sm font-semibold px-6 py-3.5 rounded-2xl transition"
            >
              Pelajari Alur Kerja
            </a>
          </div>

          {/* HARDWARE OLED COMPANION SHOWCASE PREVIEW */}
          <div className="pt-10 max-w-2xl mx-auto">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0c1220] to-[#04060d] border-4 border-[#1e293b] shadow-2xl shadow-sky-500/10 flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center gap-2 font-mono text-[10px] text-brand-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Mode Tablet Meja Rapat (OLED Display)</span>
              </div>
              <div className="flex items-center justify-center gap-8 py-2">
                <div className="w-14 h-18 bg-sky-400 rounded-2xl shadow-lg shadow-sky-400/50 flex items-center justify-center">
                  <div className="w-6 h-8 bg-[#050811] rounded-lg" />
                </div>
                <div className="w-14 h-18 bg-sky-400 rounded-2xl shadow-lg shadow-sky-400/50 flex items-center justify-center">
                  <div className="w-6 h-8 bg-[#050811] rounded-lg" />
                </div>
              </div>
              <div className="bg-brand-900/80 border border-brand-800 px-4 py-2 rounded-xl text-xs font-mono text-sky-300">
                &ldquo;Siap Boss! Tugas Divisi Backend langsung saya catat ke tabel, noted!&rdquo;
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* VALUE PILLARS */}
      <section id="fitur" className="py-20 bg-brand-950/60 border-t border-brand-800/80 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-accent-500 tracking-wider">Keunggulan Solusi</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Didesain Khusus untuk Eksekutif & Tim Kerja</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#0a0f1d] border border-brand-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent-600/20 text-accent-400 flex items-center justify-center">
                <Tablet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Hardware Desk Companion</h3>
              <p className="text-xs text-brand-400 leading-relaxed">
                Mode tablet layar penuh yang ditaruh di tengah meja. Karakter OLED hidup tolah-toleh memperhatikan siapa yang berbicara dan manggut-manggut saat kesepakatan tercapai.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a0f1d] border border-brand-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Tabel Tugas per Divisi</h3>
              <p className="text-xs text-brand-400 leading-relaxed">
                Bukan ringkasan teks polos. AI langsung mengekstrak tugas dan membaginya ke kolom divisi (Backend, QA, Product, Marketing) lengkap dengan PIC dan deadline.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a0f1d] border border-brand-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Acoustic Voice Memory</h3>
              <p className="text-xs text-brand-400 leading-relaxed">
                Sidik suara peserta rapat disimpan sebagai vektor biometrik akustik. Noted otomatis mengenali orang yang berbicara di rapat-rapat berikutnya tanpa re-training.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* PRIVACY & MARKDOWN ARCHITECTURE */}
      <section id="keamanan" className="py-20 px-6 border-t border-brand-800/80">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase font-bold text-sky-400 tracking-wider">Arsitektur Data Bersih</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Penyimpanan Berbasis Markdown (.md) & Dukungan AI Lokal
            </h2>
            <p className="text-xs sm:text-sm text-brand-300 leading-relaxed">
              Seluruh risalah rapat disimpan dalam format dokumen Markdown murni (`.md`) dengan frontmatter terstruktur. Data Anda sepenuhnya milik perusahaan Anda, kompatibel dengan Obsidian, dan dapat diakses cepat menggunakan sistem agen AI (Gemini SDK) persis seperti workflow CLI.
            </p>
            <ul className="space-y-2 text-xs text-brand-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Format `.md` terbuka tanpa vendor lock-in database tertutup</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Opsi diarization suara lokal via ONNX / TF.js tanpa kirim audio ke cloud pihak ketiga</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Isolasi penuh data & statistik per organisasi perusahaan</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#0c1220] border border-brand-800 rounded-2xl p-5 font-mono text-xs text-brand-300 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-[11px] text-brand-500 border-b border-brand-800 pb-2">
              <span>meetings/2026-09-07-sprint-planning.md</span>
              <span className="text-emerald-400">Obsidian Ready</span>
            </div>
            <pre className="text-[11px] text-sky-300 leading-relaxed overflow-x-auto">
{`---
title: Sprint Planning Q4 & Payment Gateway
date: 2026-09-07
leader: Budi Santoso
status: verified
divisions: [Backend & DevOps, QA, Product]
---

## 💡 Ringkasan Eksekutif
Rapat menyepakati jadwal rilis pada hari Jumat pukul 16:00 WIB...

## 📋 Tabel Penugasan Divisi
| Tugas | Divisi | PIC | Deadline |
| Staging deploy | Backend | Siti Rahma | Besok 17:00 |
| QA refund test | QA | Rina Wijaya | Kamis Pagi |`}
            </pre>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-brand-800/80 py-8 px-6 text-center text-xs text-brand-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; 2026 Noted Enterprise B2B — Asisten meetingmu boss, noted!</span>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-brand-400 hover:text-white transition">Masuk Portal Karyawan</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
