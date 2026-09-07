'use client';

import React from 'react';
import { VoiceProfile } from '@/lib/types';
import { Fingerprint, Mic, Volume2 } from 'lucide-react';

interface VoiceProfilesViewProps {
  profiles: VoiceProfile[];
}

export const VoiceProfilesView: React.FC<VoiceProfilesViewProps> = ({ profiles }) => {
  const handleEnroll = () => {
    alert(
      'Wizard Pendaftaran Sidik Suara Baru: Silakan ucapkan kalimat panduan selama 15 detik untuk merekam sidik suara akustik baru ke database.'
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-brand-900 flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-accent-600" />
            <span>Basis Data Sidik Suara (Voice Memory Hub)</span>
          </h2>
          <p className="text-xs text-brand-500 mt-0.5">
            Peta vektor biometrik akustik yang memungkinkan Noted mengenali suara peserta secara konsisten lintas rapat.
          </p>
        </div>
        <button
          onClick={handleEnroll}
          className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
        >
          <Mic className="w-4 h-4 text-emerald-400" />
          <span>Pendaftaran Suara Baru (15 Detik)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-2xl border border-brand-200 p-5 shadow-sm space-y-4 hover:border-accent-400 transition"
          >
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl bg-brand-900 text-white font-bold text-xs flex items-center justify-center font-mono shadow-sm">
                {profile.avatarInitials}
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-900">{profile.name}</h4>
                <p className="text-[11px] text-brand-500 font-mono">
                  {profile.role} • ID: {profile.id}
                </p>
              </div>
            </div>

            <div className="bg-brand-50 rounded-xl p-3 border border-brand-100 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-brand-500">Rapat Teridentifikasi:</span>
                <span className="font-bold text-brand-900">
                  {profile.totalSessionsMatched} Sesi
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-500">Akurasi Akustik:</span>
                <span className="font-bold text-emerald-700">
                  {Math.round(profile.acousticConfidenceAvg * 1000) / 10}% Rata-rata
                </span>
              </div>
            </div>

            <button
              onClick={() => alert(`Memutar sampel audio sidik suara untuk ${profile.name}...`)}
              className="w-full bg-white hover:bg-brand-50 text-brand-700 border border-brand-200 text-xs font-semibold py-2 rounded-lg transition flex items-center justify-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5 text-brand-500" />
              <span>Dengarkan Sampel Audio</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
