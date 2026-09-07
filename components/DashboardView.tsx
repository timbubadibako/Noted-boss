'use client';

import React from 'react';
import { MeetingSession, DivisionTask } from '@/lib/types';
import {
  Play,
  Upload,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  FileText,
  Users,
} from 'lucide-react';

interface DashboardViewProps {
  session: MeetingSession;
  tasks: DivisionTask[];
  onStartMeeting: () => void;
  onOpenMoM: () => void;
  onOpenTasks: () => void;
  onOpenVoice: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  session,
  tasks,
  onStartMeeting,
  onOpenMoM,
  onOpenTasks,
  onOpenVoice,
}) => {
  const completedTasks = tasks.filter((t) => t.isCompleted).length;
  const highPriorityTasks = tasks.filter((t) => t.priority === 'high');

  return (
    <div className="space-y-6">
      {/* HERO COMMAND LAUNCHER */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-[#0c162d] text-white rounded-3xl p-7 border border-brand-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 border border-accent-400/30 text-sky-300 text-xs font-mono mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Pusat Kendali Eksekutif • Siap Melayani, Boss!</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Selamat Datang di Noted Mission Control
          </h1>
          <p className="text-xs sm:text-sm text-brand-300 leading-relaxed mb-6">
            Mulai pencatatan rapat live dengan asisten meja robotik, pantau butir penugasan lintas divisi, atau buka dokumen risalah rapat resmi dengan sekali klik.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartMeeting}
              className="bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold px-5 py-3 rounded-xl transition flex items-center gap-2 shadow-lg shadow-accent-600/30"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>+ Mulai Rapat Baru Langsung</span>
            </button>

            <button
              onClick={() => alert('Fitur Unggah Berkas: Pilih file audio .mp3 atau .wav untuk transkripsi dan ekstraksi tabel tugas.')}
              className="bg-brand-900/80 hover:bg-brand-800 text-brand-200 border border-brand-700 text-xs font-semibold px-4 py-3 rounded-xl transition flex items-center gap-2"
            >
              <Upload className="w-4 h-4 text-brand-400" />
              <span>Unggah File Audio (.mp3/.wav)</span>
            </button>

            <button
              onClick={() => alert('Sinkronisasi Kalender: Masukkan tautan Google Meet atau Zoom untuk mengundang bot Noted.')}
              className="bg-brand-900/80 hover:bg-brand-800 text-brand-200 border border-brand-700 text-xs font-semibold px-4 py-3 rounded-xl transition flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-brand-400" />
              <span>Link Zoom / Google Meet</span>
            </button>
          </div>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl border border-brand-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-brand-500">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">
              Durasi Rapat Bulan Ini
            </span>
            <Clock className="w-4 h-4 text-accent-600" />
          </div>
          <div className="text-2xl font-bold text-brand-900 font-mono">18.4 Jam</div>
          <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>12 sesi rapat tercatat</span>
          </p>
        </div>

        {/* Card 2 */}
        <div
          onClick={onOpenTasks}
          className="bg-white rounded-2xl border border-brand-200 p-5 shadow-sm space-y-2 cursor-pointer hover:border-accent-400 transition"
        >
          <div className="flex items-center justify-between text-brand-500">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">
              Tugas Aktif Divisi
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-brand-900 font-mono">
            {completedTasks} / {tasks.length}{' '}
            <span className="text-xs text-brand-500 font-normal">Selesai</span>
          </div>
          <p className="text-[11px] text-brand-600">
            {tasks.length - completedTasks} tugas menunggu penyelesaian
          </p>
        </div>

        {/* Card 3 */}
        <div
          onClick={onOpenVoice}
          className="bg-white rounded-2xl border border-brand-200 p-5 shadow-sm space-y-2 cursor-pointer hover:border-accent-400 transition"
        >
          <div className="flex items-center justify-between text-brand-500">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">
              Sidik Suara Terdaftar
            </span>
            <Fingerprint className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-brand-900 font-mono">14 Profil</div>
          <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Akurasi Akustik 98.2%</span>
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl border border-brand-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-brand-500">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">
              Status Companion
            </span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Online</span>
          </div>
          <p className="text-[11px] text-brand-500 font-mono">Ruang Rapat Aceh • Baterai 100%</p>
        </div>
      </div>

      {/* TWO COLUMN CONTENT: RECENT MEETINGS + URGENT TASKS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT (8 cols): RECENT MEETINGS WITH DIRECT ACTIONS */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-brand-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-100">
            <div>
              <h3 className="text-base font-bold text-brand-900">Sesi & Risalah Rapat Terkini</h3>
              <p className="text-xs text-brand-500">Daftar pertemuan yang tercatat lengkap dengan status risalah resmi</p>
            </div>
            <button
              onClick={onStartMeeting}
              className="text-xs font-semibold text-accent-600 hover:text-accent-700 flex items-center gap-1"
            >
              <span>Buka Live Operator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Active / Latest Meeting Card */}
            <div className="p-4 rounded-xl border border-accent-200 bg-accent-50/30 hover:bg-accent-50/60 transition space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                    SESI AKTIF
                  </span>
                  <h4 className="text-sm font-bold text-brand-900">{session.title}</h4>
                </div>
                <span className="text-[11px] text-brand-500 font-mono">
                  {session.date} • {session.durationFormatted}
                </span>
              </div>

              <p className="text-xs text-brand-700 line-clamp-2 leading-relaxed">
                {session.executiveSummary}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-accent-100 text-xs">
                <div className="flex items-center gap-3 text-[11px] text-brand-600 font-mono">
                  <span>👤 Pimpinan: {session.leader.split(' ')[0]}</span>
                  <span>•</span>
                  <span>📋 {tasks.length} Butir Penugasan Divisi</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenMoM}
                    className="bg-white hover:bg-brand-50 text-brand-900 border border-brand-300 text-xs font-semibold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5 text-accent-600" />
                    <span>Lihat Risalah Resmi</span>
                  </button>
                  <button
                    onClick={onStartMeeting}
                    className="bg-accent-600 hover:bg-accent-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    Masuk Live Studio
                  </button>
                </div>
              </div>
            </div>

            {/* Historical Meeting 2 */}
            <div className="p-4 rounded-xl border border-brand-200 bg-white hover:bg-brand-50/50 transition space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span className="bg-brand-100 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                    ARSIP RESMI
                  </span>
                  <h4 className="text-sm font-bold text-brand-900">
                    Review Arsitektur Keamanan Database & Enkripsi
                  </h4>
                </div>
                <span className="text-[11px] text-brand-400 font-mono">3 September 2026 • 00:42:10</span>
              </div>
              <p className="text-xs text-brand-600 line-clamp-1">
                Evaluasi enkripsi AES-256 at-rest dan pemisahan kredensial environment staging vs production.
              </p>
            </div>

            {/* Historical Meeting 3 */}
            <div className="p-4 rounded-xl border border-brand-200 bg-white hover:bg-brand-50/50 transition space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span className="bg-brand-100 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                    ARSIP RESMI
                  </span>
                  <h4 className="text-sm font-bold text-brand-900">
                    All-Hands & Perencanaan Strategi Kuartal 4
                  </h4>
                </div>
                <span className="text-[11px] text-brand-400 font-mono">1 September 2026 • 01:15:30</span>
              </div>
              <p className="text-xs text-brand-600 line-clamp-1">
                Penetapan OKR seluruh divisi dan pembentukan satuan tugas rilis produk mobile.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT (4 cols): URGENT DIVISION TASKS */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-brand-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-100 mb-3">
              <h3 className="text-sm font-bold text-brand-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>Tugas Prioritas Tinggi</span>
              </h3>
              <button
                onClick={onOpenTasks}
                className="text-[11px] font-semibold text-accent-600 hover:underline"
              >
                Lihat Semua ({tasks.length})
              </button>
            </div>

            <div className="space-y-3">
              {highPriorityTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 bg-rose-50/40 border border-rose-200 rounded-xl space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                      {t.division}
                    </span>
                    <span className="text-[10px] font-mono text-brand-500">{t.deadline}</span>
                  </div>
                  <p className="text-xs font-medium text-brand-900 leading-snug">
                    {t.taskDescription}
                  </p>
                  <div className="text-[11px] text-brand-600 font-mono">
                    PIC: <span className="font-semibold text-brand-900">{t.pic}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-brand-100">
            <button
              onClick={onOpenTasks}
              className="w-full bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
            >
              <span>Buka Papan Tugas Divisi (Kanban)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
