'use client';

import React, { useState } from 'react';
import { Sparkles, Search, Send, FileText, ArrowRight, CornerDownRight } from 'lucide-react';

export const KnowledgeBaseView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ q: string; a: string; citation: string }>>([
    {
      q: 'Kapan target rilis payment gateway disepakati?',
      a: 'Target rilis gerbang pembayaran baru telah disepakati resmi pada hari Jumat pukul 16:00 WIB oleh Budi Santoso (Product Lead), dengan syarat seluruh hasil regresi QA berstatus lulus.',
      citation: 'Rapat Sprint Planning Q4 (7 Sep 2026, 00:04:15)',
    },
    {
      q: 'Apa tugas divisi QA terkait modul refund?',
      a: 'Rina Wijaya (QA Lead) ditugaskan menyusun skenario test cases refund, validasi audit logging, dan pengujian beban dengan tenggat hari Kamis pagi.',
      citation: 'Rapat Sprint Planning Q4 (7 Sep 2026, 00:03:02)',
    },
  ]);

  const handleAsk = (customQ?: string) => {
    const questionToAsk = customQ || query;
    if (!questionToAsk.trim()) return;

    // Simulate smart semantic search response
    const newEntry = {
      q: questionToAsk,
      a: `Berdasarkan arsip transkrip rapat Noted, poin "${questionToAsk}" tercatat dalam kesepakatan bahwa seluruh divisi wajib berkoordinasi 24 jam sebelum peluncuran produksi dengan audit log aktif pada database.`,
      citation: 'Rapat Koordinasi Antar Divisi (Ref: MOM-2026-0907-01)',
    };

    setChatHistory([newEntry, ...chatHistory]);
    setQuery('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-brand-500">
            <span className="bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded">
              SEMANTIC KNOWLEDGE BASE
            </span>
            <span>•</span>
            <span>INDEX: 12 RISALAH RAPAT TERINTEGRASI</span>
          </div>
          <h1 className="text-xl font-bold text-brand-900">Tanya Noted — Basis Pengetahuan Rapat</h1>
          <p className="text-xs text-brand-500 mt-0.5">
            Tanyakan segala keputusan, tenggat waktu, atau komitmen yang pernah dibahas dalam seluruh rapat perusahaan.
          </p>
        </div>
      </div>

      {/* SEARCH / ASK BAR */}
      <div className="bg-white rounded-2xl border border-brand-200 p-4 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tanyakan apa saja, Boss... (contoh: 'Kapan jadwal deployment staging?')"
              className="w-full pl-10 pr-4 py-3 bg-brand-50 border border-brand-200 rounded-xl text-xs font-sans text-brand-900 focus:bg-white focus:border-accent-600 outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-accent-600 hover:bg-accent-500 text-white text-xs font-semibold px-5 py-3 rounded-xl transition flex items-center gap-1.5 shadow-sm shrink-0"
          >
            <span>Tanya</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick prompt chips */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-brand-100 overflow-x-auto text-[11px] text-brand-600 font-mono">
          <span className="text-brand-400 shrink-0">Contoh Pertanyaan:</span>
          <button
            onClick={() => handleAsk('Apa saja tugas Siti Rahma minggu ini?')}
            className="px-2.5 py-1 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg shrink-0 transition"
          >
            &ldquo;Apa tugas Siti Rahma minggu ini?&rdquo;
          </button>
          <button
            onClick={() => handleAsk('Kapan jadwal rilis produksi disepakati?')}
            className="px-2.5 py-1 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg shrink-0 transition"
          >
            &ldquo;Kapan jadwal rilis disepakati?&rdquo;
          </button>
        </div>
      </div>

      {/* CHAT / Q&A FEED */}
      <div className="space-y-4">
        {chatHistory.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-brand-200 p-5 shadow-sm space-y-3"
          >
            <div className="flex items-center gap-2 font-semibold text-xs text-brand-900">
              <span className="w-5 h-5 rounded-md bg-brand-900 text-white flex items-center justify-center font-mono text-[10px]">
                Q
              </span>
              <span>{item.q}</span>
            </div>

            <div className="p-3.5 bg-brand-50 rounded-xl border border-brand-200/80 text-xs text-brand-800 leading-relaxed space-y-2">
              <div className="flex items-start gap-2">
                <CornerDownRight className="w-4 h-4 text-accent-600 shrink-0 mt-0.5" />
                <p>{item.a}</p>
              </div>

              <div className="pt-2 border-t border-brand-200/60 flex items-center justify-between text-[11px] font-mono text-brand-500">
                <span className="flex items-center gap-1.5 text-accent-700">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Rujukan: {item.citation}</span>
                </span>
                <button
                  onClick={() => alert('Membuka transkrip audio persis pada stempel waktu tersebut...')}
                  className="hover:underline text-brand-700 flex items-center gap-1"
                >
                  <span>Buka Transkrip</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
