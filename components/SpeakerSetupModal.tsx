'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface SpeakerSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (speakers: string[]) => void;
  initialSpeakers?: string[];
}

export const SpeakerSetupModal: React.FC<SpeakerSetupModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSpeakers = ['Budi Santoso', 'Siti Rahma', 'Rina Wijaya'],
}) => {
  const [speakers, setSpeakers] = useState<string[]>(initialSpeakers);

  if (!isOpen) return null;

  const handleChange = (index: number, val: string) => {
    const updated = [...speakers];
    updated[index] = val;
    setSpeakers(updated);
  };

  const handleConfirm = () => {
    onSave(speakers);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-brand-950/75 z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-brand-200">
        <div className="flex items-center justify-between border-b border-brand-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-brand-900">
              Konfigurasi Pembicara Kilat
            </h3>
            <p className="text-[11px] text-brand-500">
              Ganti nama Person 1, 2, 3 sebelum tablet diletakkan di meja rapat
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-brand-400 hover:text-brand-700 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {speakers.map((spk, idx) => (
            <div key={idx}>
              <label className="font-semibold text-brand-700 block mb-1">
                Kanal Akustik {idx + 1} (Person {idx + 1}):
              </label>
              <input
                type="text"
                value={spk}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="w-full p-2.5 bg-brand-50 border border-brand-200 rounded-lg font-mono text-brand-900 focus:bg-white focus:border-accent-600 outline-none"
              />
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={handleConfirm}
            className="w-full bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Simpan & Luncurkan Mode Meja Tablet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
