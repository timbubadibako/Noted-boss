'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AudioWaveform, Building2, Lock, ArrowRight, ShieldCheck, Tablet, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [selectedTenant, setSelectedTenant] = useState('PT Maju Teknologi Indonesia');
  const [loginMethod, setLoginMethod] = useState<'sso' | 'kiosk'>('sso');
  const [kioskPin, setKioskPin] = useState('');

  const companies = [
    { name: 'PT Maju Teknologi Indonesia', code: 'MAJU-TECH', rooms: '3 Ruang Terpasang' },
    { name: 'PT Sinergi Digital Nusantara', code: 'SINERGI-DIGI', rooms: '5 Ruang Terpasang' },
    { name: 'PT Surya Finansial Global', code: 'SURYA-FIN', rooms: '2 Ruang Terpasang' },
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to isolated enterprise dashboard
    router.push(`/dashboard?tenant=${encodeURIComponent(selectedTenant)}`);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-white font-sans flex flex-col justify-between p-6 antialiased selection:bg-accent-600 selection:text-white">
      
      {/* HEADER BRAND */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center space-x-3 hover:opacity-90 transition">
          <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center font-bold text-white shadow-sm">
            <AudioWaveform className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-wider">NOTED</span>
            <span className="text-[10px] text-brand-400 block font-mono">ENTERPRISE PORTAL</span>
          </div>
        </a>

        <a href="/" className="text-xs text-brand-400 hover:text-white transition font-mono">
          ← Kembali ke Beranda
        </a>
      </div>

      {/* LOGIN CARD */}
      <div className="max-w-md w-full mx-auto my-8 bg-[#0a0f1d] border border-brand-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-500/10 border border-accent-500/30 text-sky-400 text-[10px] font-mono mb-2">
            <ShieldCheck className="w-3 h-3" />
            <span>Kredensial Organisasi Terisolasi</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Masuk ke Noted Workspace</h1>
          <p className="text-xs text-brand-400 mt-1">
            Pilih organisasi perusahaan Anda untuk membuka statistik & risalah rapat grup Anda.
          </p>
        </div>

        {/* METHOD TOGGLE: SSO vs KIOSK PIN */}
        <div className="grid grid-cols-2 gap-2 bg-[#050811] p-1 rounded-xl border border-brand-800 text-xs font-semibold font-mono">
          <button
            type="button"
            onClick={() => setLoginMethod('sso')}
            className={`py-2 rounded-lg transition ${
              loginMethod === 'sso'
                ? 'bg-accent-600 text-white shadow-sm'
                : 'text-brand-400 hover:text-white'
            }`}
          >
            Akun Karyawan (SSO)
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('kiosk')}
            className={`py-2 rounded-lg transition ${
              loginMethod === 'kiosk'
                ? 'bg-accent-600 text-white shadow-sm'
                : 'text-brand-400 hover:text-white'
            }`}
          >
            Tablet Kiosk PIN
          </button>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          
          {/* TENANT SELECTION */}
          <div>
            <label className="font-semibold text-brand-300 block mb-1.5 font-mono">
              Pilih Organisasi / Perusahaan:
            </label>
            <select
              value={selectedTenant}
              onChange={(e) => setSelectedTenant(e.target.value)}
              className="w-full p-3 bg-[#050811] border border-brand-800 rounded-xl text-brand-100 font-sans focus:border-accent-600 outline-none"
            >
              {companies.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name} ({c.rooms})
                </option>
              ))}
            </select>
          </div>

          {loginMethod === 'sso' ? (
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full bg-white hover:bg-brand-100 text-brand-950 font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-sm font-sans"
              >
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  G
                </div>
                <span>Masuk dengan Google Workspace</span>
              </button>

              <button
                type="submit"
                className="w-full bg-[#1e293b] hover:bg-[#334155] text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-sm font-sans"
              >
                <div className="w-4 h-4 rounded-sm bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
                  M
                </div>
                <span>Masuk dengan Microsoft 365</span>
              </button>

              <div className="relative py-2 text-center text-[11px] text-brand-500 font-mono">
                <span>Atau gunakan email perusahaan (@perusahaan.co.id)</span>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="nama@perusahaan.co.id"
                  className="w-full p-3 bg-[#050811] border border-brand-800 rounded-xl text-brand-100 placeholder:text-brand-600 focus:border-accent-600 outline-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-accent-600/30"
              >
                <span>Lanjutkan ke Dashboard Organisasi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="p-3.5 bg-brand-900/60 border border-brand-800 rounded-xl text-[11px] text-brand-300 font-mono flex items-center gap-2">
                <Tablet className="w-4 h-4 text-accent-400 shrink-0" />
                <span>Mode Cepat Ruang Rapat: Masukkan PIN Kiosk untuk langsung mengaktifkan mikrofon meja.</span>
              </div>

              <div>
                <label className="font-semibold text-brand-300 block mb-1.5 font-mono">
                  4-Digit Room PIN (Ruang Rapat Aceh):
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={kioskPin}
                  onChange={(e) => setKioskPin(e.target.value)}
                  placeholder="••••"
                  className="w-full text-center tracking-[1em] text-lg font-mono p-3 bg-[#050811] border border-brand-800 rounded-xl text-sky-400 focus:border-accent-600 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-accent-600/30 font-mono"
              >
                <KeyRound className="w-4 h-4" />
                <span>Buka Layar Ruang Rapat</span>
              </button>
            </div>
          )}

        </form>

      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-brand-500 font-mono">
        &copy; 2026 Noted Enterprise B2B — Keamanan Terisolasi Tingkat Korporat
      </div>

    </div>
  );
}
