'use client';

import React from 'react';
import { Settings, Calendar, Bell, Cpu, Link2, ShieldCheck, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-brand-500">
            <span className="bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded">
              ENTERPRISE INTEGRATION
            </span>
            <span>•</span>
            <span>KONFIGURASI SISTEM</span>
          </div>
          <h1 className="text-xl font-bold text-brand-900">Pengaturan & Integrasi Perusahaan</h1>
          <p className="text-xs text-brand-500 mt-0.5">
            Kelola integrasi kalender, bot rapat otomatis, webhook notifikasi ke Slack/WhatsApp, dan provider AI.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. KALENDER & BOT RAPAT */}
        <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-brand-100">
            <Calendar className="w-5 h-5 text-accent-600" />
            <div>
              <h3 className="text-sm font-bold text-brand-900">Sinkronisasi Kalender Rapat</h3>
              <p className="text-[11px] text-brand-500">Impor otomatis jadwal rapat Google Calendar / Outlook</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-brand-50 rounded-xl border border-brand-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-brand-200 flex items-center justify-center font-bold text-brand-700">
                  G
                </div>
                <div>
                  <h4 className="font-bold text-brand-900">Google Workspace Calendar</h4>
                  <p className="text-[11px] text-brand-500">corporate@company.com</p>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <Check className="w-3 h-3" /> Terhubung
              </span>
            </div>

            <div className="p-3 bg-brand-50 rounded-xl border border-brand-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-brand-200 flex items-center justify-center font-bold text-brand-700">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-brand-900">Microsoft 365 / Teams</h4>
                  <p className="text-[11px] text-brand-500">Belum terhubung</p>
                </div>
              </div>
              <button
                onClick={() => alert('Menghubungkan akun Microsoft 365...')}
                className="bg-brand-900 hover:bg-brand-800 text-white font-mono text-[11px] font-semibold px-3 py-1.5 rounded-lg transition"
              >
                Hubungkan
              </button>
            </div>
          </div>
        </div>

        {/* 2. NOTIFIKASI & WEBHOOK */}
        <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-brand-100">
            <Bell className="w-5 h-5 text-accent-600" />
            <div>
              <h3 className="text-sm font-bold text-brand-900">Webhook & Pengiriman Notulensi</h3>
              <p className="text-[11px] text-brand-500">Kirim risalah otomatis ke kanal komunikasi tim</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-brand-50 rounded-xl border border-brand-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-brand-900">Slack Webhook Channel</h4>
                <p className="text-[11px] text-brand-500">#notulensi-eksekutif</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <Check className="w-3 h-3" /> Aktif
              </span>
            </div>

            <div className="p-3 bg-brand-50 rounded-xl border border-brand-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-brand-900">WhatsApp Business API Webhook</h4>
                <p className="text-[11px] text-brand-500">Grup Koordinasi Tim</p>
              </div>
              <button
                onClick={() => alert('Konfigurasi Webhook WhatsApp...')}
                className="bg-brand-900 hover:bg-brand-800 text-white font-mono text-[11px] font-semibold px-3 py-1.5 rounded-lg transition"
              >
                Atur Webhook
              </button>
            </div>
          </div>
        </div>

        {/* 3. AI PROVIDER ENGINES */}
        <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm space-y-4 md:col-span-2">
          <div className="flex items-center gap-2.5 pb-3 border-b border-brand-100">
            <Cpu className="w-5 h-5 text-accent-600" />
            <div>
              <h3 className="text-sm font-bold text-brand-900">Provider AI & Speech Engine (4-Layer Pipeline)</h3>
              <p className="text-[11px] text-brand-500">Konfigurasi engine Speech-to-Text, Voice Memory, dan LLM Synthesis</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-brand-50 rounded-xl border border-brand-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-brand-500 block">Layer 1: Diarisasi Streaming</span>
              <span className="font-bold text-brand-900 block text-sm">Deepgram Nova-2</span>
              <span className="text-emerald-700 text-[11px]">Latensi 280ms • Akustik OK</span>
            </div>

            <div className="p-4 bg-brand-50 rounded-xl border border-brand-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-brand-500 block">Layer 2: Sidik Suara Memory</span>
              <span className="font-bold text-brand-900 block text-sm">pgvector (512-dim)</span>
              <span className="text-emerald-700 text-[11px]">Cosine Similarity &gt; 0.85</span>
            </div>

            <div className="p-4 bg-brand-50 rounded-xl border border-brand-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-brand-500 block">Layer 4: Ekstraksi Tabel Divisi</span>
              <span className="font-bold text-brand-900 block text-sm">Google Gemini 2.0 Flash</span>
              <span className="text-emerald-700 text-[11px]">Strict JSON Schema Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
