'use client';

import React, { useState } from 'react';
import { DivisionTask } from '@/lib/types';
import {
  CheckSquare,
  Filter,
  Download,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Building,
} from 'lucide-react';

interface CompanyTasksViewProps {
  tasks: DivisionTask[];
  onToggleTask: (id: string) => void;
  onAddTask: (newTask: DivisionTask) => void;
}

export const CompanyTasksView: React.FC<CompanyTasksViewProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
}) => {
  const [filterDivision, setFilterDivision] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const divisions = Array.from(new Set(tasks.map((t) => t.division)));

  const filteredTasks = tasks.filter((t) => {
    const matchesDiv = filterDivision === 'all' || t.division === filterDivision;
    const matchesSearch =
      t.taskDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.pic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiv && matchesSearch;
  });

  const handleCreatePrompt = () => {
    const desc = prompt('Masukkan uraian tugas baru:');
    if (!desc) return;
    const div = prompt('Masukkan divisi penanggung jawab (misal: Backend & DevOps, QA, Product):', 'Backend & DevOps') || 'Umum';
    const pic = prompt('Nama PIC (Penanggung Jawab):', 'Budi Santoso') || 'Budi Santoso';
    const deadline = prompt('Tenggat Waktu:', 'Besok 17:00 WIB') || 'Segera';

    const newTask: DivisionTask = {
      id: `task-${Date.now()}`,
      division: div,
      taskDescription: desc,
      pic: pic,
      deadline: deadline,
      priority: 'medium',
      isCompleted: false,
    };
    onAddTask(newTask);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-brand-500">
            <span className="bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded">
              MODUL PENUGASAN TERPUSAT
            </span>
            <span>•</span>
            <span>TOTAL: {tasks.length} TUGAS LINTAS RAPAT</span>
          </div>
          <h1 className="text-xl font-bold text-brand-900">Papan Tugas Perusahaan & Delegasi Divisi</h1>
          <p className="text-xs text-brand-500 mt-0.5">
            Seluruh butir tugas diekstraksi otomatis dari percakapan rapat oleh Noted dan dipetakan per divisi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Mengekspor seluruh tabel penugasan ke format CSV/Excel...')}
            className="bg-white hover:bg-brand-50 text-brand-800 border border-brand-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-brand-600" />
            <span>Ekspor Excel/CSV</span>
          </button>
          <button
            onClick={handleCreatePrompt}
            className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Tugas Manual</span>
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH STRIP */}
      <div className="bg-white rounded-2xl border border-brand-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Division Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterDivision('all')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition shrink-0 ${
              filterDivision === 'all'
                ? 'bg-accent-600 text-white shadow-sm'
                : 'text-brand-600 hover:bg-brand-50'
            }`}
          >
            Semua Divisi ({tasks.length})
          </button>
          {divisions.map((div) => {
            const count = tasks.filter((t) => t.division === div).length;
            const isAct = filterDivision === div;
            return (
              <button
                key={div}
                onClick={() => setFilterDivision(div)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition shrink-0 ${
                  isAct
                    ? 'bg-accent-600 text-white shadow-sm'
                    : 'text-brand-600 hover:bg-brand-50'
                }`}
              >
                {div} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
          <input
            type="text"
            placeholder="Cari tugas atau nama PIC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-brand-50 border border-brand-200 rounded-lg text-xs font-sans text-brand-900 focus:bg-white focus:border-accent-600 outline-none"
          />
        </div>
      </div>

      {/* TASK LIST CARDS */}
      <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto rounded-xl border border-brand-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-50 text-brand-700 font-semibold border-b border-brand-200 text-[11px]">
              <tr>
                <th className="p-3.5 w-5/12">Deskripsi Tugas</th>
                <th className="p-3.5">Divisi</th>
                <th className="p-3.5">Penanggung Jawab (PIC)</th>
                <th className="p-3.5">Tenggat Waktu</th>
                <th className="p-3.5">Prioritas</th>
                <th className="p-3.5 text-center">Tuntas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100 text-brand-800">
              {filteredTasks.map((t) => (
                <tr
                  key={t.id}
                  className={`transition ${
                    t.isCompleted
                      ? 'bg-brand-50/40 text-brand-400 line-through'
                      : 'hover:bg-brand-50/60 text-brand-900'
                  }`}
                >
                  <td className="p-3.5 font-medium">
                    {t.taskDescription}
                    {t.triggerQuote && (
                      <span className="block text-[10px] font-mono text-brand-400 not-italic mt-0.5">
                        &ldquo;{t.triggerQuote}&rdquo;
                      </span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <span className="text-[10px] font-mono font-semibold bg-brand-100 text-brand-800 px-2 py-0.5 rounded">
                      {t.division}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-[11px] font-semibold">{t.pic}</td>
                  <td className="p-3.5 font-mono text-[11px] text-brand-600">{t.deadline}</td>
                  <td className="p-3.5">
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
                  <td className="p-3.5 text-center">
                    <input
                      type="checkbox"
                      checked={t.isCompleted}
                      onChange={() => onToggleTask(t.id)}
                      className="w-4 h-4 text-accent-600 rounded border-brand-300 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
