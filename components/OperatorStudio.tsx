'use client';

import React, { useState } from 'react';
import { MeetingSession, Utterance } from '@/lib/types';
import {
  Sparkles,
  UserCheck,
  Plus,
  CheckCircle2,
  Clock,
  Settings,
  Flag,
  PenSquare,
  FileCheck2,
} from 'lucide-react';

interface OperatorStudioProps {
  session: MeetingSession;
  onSelectUtterance?: (utterance: Utterance) => void;
  onFinalize?: () => void;
  onOpenSpeakerConfig?: () => void;
}

export const OperatorStudio: React.FC<OperatorStudioProps> = ({
  session,
  onSelectUtterance,
  onFinalize,
  onOpenSpeakerConfig,
}) => {
  const [manualNotes, setManualNotes] = useState(
    '- Pastikan tim CS dan Finance mendapatkan briefing SOP refund 24 jam sebelum rilis.\n- Catatan khusus: Audit log transaksi wajib diaktifkan pada level database.'
  );

  const [agendaList, setAgendaList] = useState([
    { id: 'ag-1', text: 'Evaluasi Progress Modul Backend Payment', done: true },
    { id: 'ag-2', text: 'Penyusunan Rencana Deployment Staging', done: true },
    { id: 'ag-3', text: 'Persetujuan Jadwal Rilis Produksi Resmi', done: false },
  ]);

  const toggleAgenda = (id: string) => {
    setAgendaList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const handleAddManualNote = () => {
    const input = prompt('Tambah catatan manual notulis:');
    if (input) {
      setManualNotes((prev) => `${prev}\n- ${input}`);
    }
  };

  return (
    <div className="space-y-5">
      {/* SESSION TELEMETRY STRIP */}
      <div className="bg-white rounded-2xl border border-brand-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Perekaman Berjalan</span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-brand-900">{session.title}</h2>
            <p className="text-[11px] text-brand-500 font-mono">
              REF: {session.referenceCode} • 3 Kanal Akustik Terhubung
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right font-mono">
            <div className="text-[10px] text-brand-400 uppercase tracking-wider">Durasi</div>
            <div className="text-sm font-bold text-brand-900 tracking-wider">
              {session.durationFormatted}
            </div>
          </div>
          <div className="h-8 w-px bg-brand-200" />
          {onOpenSpeakerConfig && (
            <button
              onClick={onOpenSpeakerConfig}
              className="bg-white hover:bg-brand-50 text-brand-800 border border-brand-300 text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm"
            >
              <Settings className="w-3.5 h-3.5 text-brand-500" />
              <span>Ganti Pembicara Kilat</span>
            </button>
          )}
          {onFinalize && (
            <button
              onClick={onFinalize}
              className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Finalisasi Notulensi</span>
            </button>
          )}
        </div>
      </div>

      {/* 70:30 SPLIT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[580px]">
        {/* 70% COLUMN: AI LIVE TRANSCRIPT & DIRECTIVE DETECTOR */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-brand-200 p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-600" />
                Transkrip Streaming & Diarisasi Akustik (70%)
              </span>
            </div>
            <span className="text-[11px] font-mono text-brand-400">
              Auto-Scroll Aktif
            </span>
          </div>

          {/* UTTERANCE LIST */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[520px]">
            {session.utterances.map((ut) => (
              <div
                key={ut.id}
                onClick={() => onSelectUtterance && onSelectUtterance(ut)}
                className="p-4 rounded-xl border border-brand-200 bg-brand-50/60 hover:bg-brand-50 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-900 bg-brand-200/80 px-2 py-0.5 rounded">
                      {ut.speakerName}
                    </span>
                    {ut.role && (
                      <span className="text-[11px] text-brand-500">{ut.role}</span>
                    )}
                    {ut.acousticMatchConfidence && (
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-medium flex items-center gap-1">
                        <UserCheck className="w-2.5 h-2.5" />
                        Sidik: {Math.round(ut.acousticMatchConfidence * 100)}%
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-brand-400">
                    {ut.timestamp}
                  </span>
                </div>

                <p className="text-xs text-brand-800 leading-relaxed font-sans">
                  &ldquo;{ut.text}&rdquo;
                </p>

                {/* DETECTED DIRECTIVE PILL */}
                {ut.detectedDirective && (
                  <div className="mt-3 bg-white border border-accent-200 rounded-lg p-2.5 flex items-center justify-between text-xs shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold font-mono uppercase bg-accent-100 text-accent-700 px-2 py-0.5 rounded">
                        Tugas [{ut.detectedDirective.division}]
                      </span>
                      <span className="text-brand-900 font-medium">
                        {ut.detectedDirective.task}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-brand-500 font-mono">
                        Tenggat: {ut.detectedDirective.deadline}
                      </span>
                      <span className="text-[10px] bg-brand-100 text-brand-700 font-bold px-1.5 py-0.5 rounded">
                        Dicatat Otomatis
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 30% COLUMN: OPERATOR SCRATCHPAD & AGENDA CHECKLIST */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-brand-200 p-5 shadow-sm flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-100">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 flex items-center gap-1.5">
              <PenSquare className="w-3.5 h-3.5 text-accent-600" />
              Catatan Notulis Lapangan (30%)
            </span>
            <span className="text-[11px] font-mono text-emerald-600">Auto-Save</span>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="text-[11px] font-semibold text-brand-600 uppercase tracking-wider mb-1">
              Catatan Konteks Tambahan:
            </label>
            <textarea
              value={manualNotes}
              onChange={(e) => setManualNotes(e.target.value)}
              className="w-full flex-1 p-3 bg-brand-50 border border-brand-200 rounded-xl text-xs text-brand-900 focus:border-accent-600 focus:bg-white outline-none resize-none leading-relaxed font-mono"
              rows={8}
            />
          </div>

          {/* Agenda Checklist */}
          <div className="border border-brand-200 rounded-xl p-3 bg-brand-50/50">
            <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider block mb-2">
              Agenda Sesi Rapat:
            </span>
            <div className="space-y-2 text-xs text-brand-800">
              {agendaList.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleAgenda(item.id)}
                    className="w-3.5 h-3.5 text-accent-600 rounded border-brand-300"
                  />
                  <span
                    className={
                      item.done ? 'line-through text-brand-400' : 'text-brand-800'
                    }
                  >
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddManualNote}
            className="w-full bg-brand-100 hover:bg-brand-200 text-brand-800 border border-brand-200 text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Poin Catatan Cepat</span>
          </button>
        </div>
      </div>
    </div>
  );
};
