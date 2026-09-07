'use client';

import React, { useState } from 'react';
import { MeetingSession, DivisionTask } from '@/lib/types';
import {
  FileDown,
  FileText,
  Code,
  CheckCircle,
  Clock,
  ShieldCheck,
  Building2,
  Gavel,
} from 'lucide-react';

interface MinutesDocumentProps {
  session: MeetingSession;
}

export const MinutesDocument: React.FC<MinutesDocumentProps> = ({ session }) => {
  const [tasks, setTasks] = useState<DivisionTask[]>(session.divisionTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const handleExport = (format: 'PDF' | 'DOCX' | 'Markdown') => {
    alert(
      `Mengekspor Risalah Rapat "${session.title}" dalam format resmi ${format}... Berkas siap diunduh.`
    );
  };

  // Group tasks by division
  const divisions = Array.from(new Set(tasks.map((t) => t.division)));

  return (
    <div className="space-y-6">
      {/* EXECUTIVE HEADER & EXPORT ACTIONS */}
      <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-[11px] text-brand-500">
            <span className="bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded">
              DOKUMEN RESMI NOTULENSI
            </span>
            <span>REF: {session.referenceCode}</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> TERVERIFIKASI AKUSTIK
            </span>
          </div>
          <h1 className="text-xl font-bold text-brand-900">{session.title}</h1>
          <p className="text-xs text-brand-500 mt-1">
            {session.date} • {session.timeRange} • Pimpinan: {session.leader}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleExport('PDF')}
            className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
          >
            <FileDown className="w-4 h-4 text-rose-400" />
            <span>Ekspor PDF Resmi</span>
          </button>
          <button
            onClick={() => handleExport('DOCX')}
            className="bg-white hover:bg-brand-50 text-brand-800 border border-brand-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Ekspor Word (.docx)</span>
          </button>
          <button
            onClick={() => handleExport('Markdown')}
            className="bg-white hover:bg-brand-50 text-brand-800 border border-brand-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
          >
            <Code className="w-4 h-4 text-brand-600" />
            <span>Salin Markdown</span>
          </button>
        </div>
      </div>

      {/* METADATA SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-brand-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 block mb-1">
            Pimpinan Rapat
          </span>
          <span className="text-xs font-bold text-brand-900">{session.leader}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-brand-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 block mb-1">
            Peserta Terdaftar
          </span>
          <span className="text-xs font-bold text-brand-900">
            3 Pembicara (100% Cocok)
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-brand-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 block mb-1">
            Total Butir Penugasan
          </span>
          <span className="text-xs font-bold text-brand-900 font-mono">
            {tasks.length} Butir Lintas {divisions.length} Divisi
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-brand-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 block mb-1">
            Integritas Diarisasi AI
          </span>
          <span className="text-xs font-bold text-emerald-700 font-mono">
            98.2% Acoustic Confidence
          </span>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-700 mb-3 flex items-center gap-2">
          <Building2 className="w-3.5 h-3.5 text-accent-600" />
          Ringkasan Eksekutif Hasil Rapat
        </h3>
        <p className="text-xs text-brand-800 leading-relaxed bg-brand-50/70 p-4 rounded-xl border border-brand-200">
          {session.executiveSummary}
        </p>
      </div>

      {/* DIVISION-GROUPED ACTION ITEMS TABLES */}
      <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-brand-100">
          <div>
            <h3 className="text-sm font-bold text-brand-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent-600" />
              Tabel Penugasan Berdasarkan Divisi
            </h3>
            <p className="text-[11px] text-brand-500">
              Struktur penugasan formal diekstraksi dari klausa perintah rapat oleh Noted.
            </p>
          </div>
          <span className="text-xs bg-brand-100 text-brand-800 font-mono font-semibold px-3 py-1 rounded-lg">
            {tasks.filter((t) => t.isCompleted).length} / {tasks.length} Selesai
          </span>
        </div>

        {divisions.map((divName, idx) => {
          const divTasks = tasks.filter((t) => t.division === divName);
          return (
            <div key={divName} className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-900" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-900">
                  {idx + 1}. Divisi {divName}
                </h4>
              </div>

              <div className="overflow-x-auto rounded-xl border border-brand-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-brand-50 text-brand-700 font-semibold border-b border-brand-200 text-[11px]">
                    <tr>
                      <th className="p-3 w-1/2">Deskripsi Tugas / Perintah</th>
                      <th className="p-3">Penanggung Jawab (PIC)</th>
                      <th className="p-3">Tenggat Waktu</th>
                      <th className="p-3">Tingkat Prioritas</th>
                      <th className="p-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-100 text-brand-800">
                    {divTasks.map((t) => (
                      <tr
                        key={t.id}
                        className={`transition ${
                          t.isCompleted
                            ? 'bg-brand-50/40 text-brand-400 line-through'
                            : 'hover:bg-brand-50/60 text-brand-900'
                        }`}
                      >
                        <td className="p-3 font-medium">
                          {t.taskDescription}
                          {t.triggerQuote && (
                            <span className="block text-[10px] font-mono text-brand-400 not-italic mt-0.5">
                              &ldquo;{t.triggerQuote}&rdquo;
                            </span>
                          )}
                        </td>
                        <td className="p-3 font-mono text-[11px]">{t.pic}</td>
                        <td className="p-3 font-mono text-[11px] text-brand-600">
                          {t.deadline}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                              t.priority === 'high'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : t.priority === 'medium'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {t.priority}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={t.isCompleted}
                            onChange={() => toggleTask(t.id)}
                            className="w-4 h-4 text-accent-600 rounded border-brand-300"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECTION: KEY DECISIONS MATRIX */}
      <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-700 mb-3 flex items-center gap-2">
          <Gavel className="w-3.5 h-3.5 text-accent-600" />
          Matriks Keputusan Resmi Rapat
        </h3>
        <div className="space-y-3 text-xs text-brand-800">
          {session.keyDecisions.map((kd, idx) => (
            <div
              key={kd.id}
              className="p-4 bg-brand-50 rounded-xl border border-brand-200 flex items-start gap-3"
            >
              <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-mono">
                0{idx + 1}
              </span>
              <div>
                <span className="font-bold text-brand-900 block mb-0.5">
                  {kd.title}
                </span>
                <p className="text-brand-600">{kd.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
