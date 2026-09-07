'use client';

import React from 'react';
import { Building2, Tablet, BatteryCharging, Mic, Lock, Plus, ShieldCheck } from 'lucide-react';

export const RoomsAndKioskView: React.FC = () => {
  const rooms = [
    {
      id: 'rm-1',
      name: 'Ruang Rapat Aceh (Executive Boardroom)',
      location: 'Lantai 3 - Gedung A',
      tabletModel: 'iPad Pro 11" / Galaxy Tab S9',
      status: 'Aktif Menyimak',
      battery: '100% (Plugged)',
      micQuality: 'Acoustic Array 48kHz OK',
      kioskPin: '**** (Terkunci)',
    },
    {
      id: 'rm-2',
      name: 'Ruang Rapat Batavia (Product Hub)',
      location: 'Lantai 2 - Wing Barat',
      tabletModel: 'Xiaomi Pad 6 Enterprise',
      status: 'Standby Siap Sesi',
      battery: '92%',
      micQuality: 'Single Mic OK',
      kioskPin: '**** (Terkunci)',
    },
    {
      id: 'rm-3',
      name: 'Ruang Diskusi Kreatif (Sprint Room)',
      location: 'Lantai 1 - Open Space',
      tabletModel: 'Surface Go 3',
      status: 'Offline',
      battery: '45%',
      micQuality: 'Standby',
      kioskPin: '**** (Terkunci)',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-brand-500">
            <span className="bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded">
              HARDWARE & KIOSK MANAGEMENT
            </span>
            <span>•</span>
            <span>3 RUANG TERPASANG</span>
          </div>
          <h1 className="text-xl font-bold text-brand-900">Manajemen Ruang Rapat & Tablet Kiosk</h1>
          <p className="text-xs text-brand-500 mt-0.5">
            Pantau status operasional tablet meja rapat, daya baterai, konektivitas mic, dan kunci PIN kiosk.
          </p>
        </div>

        <button
          onClick={() => alert('Daftarkan Ruang Rapat / Tablet Meja Baru')}
          className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>+ Daftarkan Ruang Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl border border-brand-200 p-5 shadow-sm space-y-4 hover:border-accent-400 transition"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-brand-900 text-white flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent-400" />
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  room.status.includes('Aktif')
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : room.status.includes('Standby')
                    ? 'bg-sky-50 text-sky-700 border border-sky-200'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {room.status}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-brand-900">{room.name}</h3>
              <p className="text-[11px] text-brand-500 font-mono">{room.location}</p>
            </div>

            <div className="bg-brand-50 rounded-xl p-3 border border-brand-100 text-xs space-y-2 font-mono">
              <div className="flex justify-between items-center text-brand-600">
                <span className="flex items-center gap-1.5">
                  <Tablet className="w-3.5 h-3.5" /> Device:
                </span>
                <span className="font-semibold text-brand-900 text-[11px]">{room.tabletModel}</span>
              </div>
              <div className="flex justify-between items-center text-brand-600">
                <span className="flex items-center gap-1.5">
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" /> Baterai:
                </span>
                <span className="font-semibold text-brand-900 text-[11px]">{room.battery}</span>
              </div>
              <div className="flex justify-between items-center text-brand-600">
                <span className="flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-blue-600" /> Akustik:
                </span>
                <span className="font-semibold text-brand-900 text-[11px]">{room.micQuality}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => alert(`Membuka kontrol PIN Kiosk untuk ${room.name}`)}
                className="flex-1 bg-white hover:bg-brand-50 text-brand-800 border border-brand-200 text-xs font-semibold py-2 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-brand-500" />
                <span>Kiosk PIN Lock</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
