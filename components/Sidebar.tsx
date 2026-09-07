'use client';

import React from 'react';
import {
  LayoutDashboard,
  Mic2,
  CheckSquare,
  Fingerprint,
  Sparkles,
  Building2,
  Settings,
  AudioWaveform,
  Tablet,
  Zap,
} from 'lucide-react';

export type MainNavSection =
  | 'dashboard'
  | 'meetings'
  | 'tasks'
  | 'voice'
  | 'knowledge'
  | 'rooms'
  | 'settings';

interface SidebarProps {
  activeSection: MainNavSection;
  onSelectSection: (section: MainNavSection) => void;
  onOpenTabletMode: () => void;
  onOpenSplash: () => void;
  taskCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  onOpenTabletMode,
  onOpenSplash,
  taskCount = 4,
}) => {
  const navItems: Array<{
    id: MainNavSection;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: 'dashboard',
      label: 'Dashboard Utama',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'meetings',
      label: 'Sesi & Risalah Rapat',
      icon: <Mic2 className="w-4 h-4" />,
      badge: 'Live',
    },
    {
      id: 'tasks',
      label: 'Papan Tugas Divisi',
      icon: <CheckSquare className="w-4 h-4" />,
      badge: `${taskCount}`,
    },
    {
      id: 'voice',
      label: 'Sidik Suara Tim',
      icon: <Fingerprint className="w-4 h-4" />,
    },
    {
      id: 'knowledge',
      label: 'Tanya Noted (AI Search)',
      icon: <Sparkles className="w-4 h-4" />,
      badge: 'Baru',
    },
    {
      id: 'rooms',
      label: 'Ruang Rapat & Tablet',
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      id: 'settings',
      label: 'Pengaturan & Integrasi',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-64 bg-brand-950 text-white flex flex-col border-r border-brand-800/80 shrink-0 select-none min-h-screen">
      {/* BRAND HEADER */}
      <div className="p-5 border-b border-brand-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-accent-600 flex items-center justify-center font-bold text-white shadow-sm shadow-accent-600/30">
            <AudioWaveform className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-wider">NOTED</span>
              <span className="text-[9px] bg-brand-800 text-sky-300 border border-brand-700 px-1.5 py-0.5 rounded font-mono font-medium">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-brand-400 font-medium leading-tight">
              Asisten meetingmu boss, noted!
            </p>
          </div>
        </div>
      </div>

      {/* QUICK TABLET LAUNCHER CALLOUT */}
      <div className="p-3 m-3 bg-gradient-to-b from-brand-900 to-brand-900/60 border border-brand-800 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-brand-400 uppercase tracking-wider">
            Companion Meja
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <p className="text-xs text-brand-200 font-medium mb-2.5">
          &ldquo;Siap mencatat seluruh rapat, Boss!&rdquo;
        </p>
        <button
          onClick={onOpenTabletMode}
          className="w-full bg-accent-600 hover:bg-accent-500 text-white text-xs font-semibold py-2 px-3 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span>Buka Mode Meja Tablet</span>
        </button>
      </div>

      {/* NAVIGATION ITEMS */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-brand-500 px-3 py-2">
          Navigasi Perusahaan
        </div>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                isActive
                  ? 'bg-accent-600 text-white shadow-sm font-semibold'
                  : 'text-brand-300 hover:bg-brand-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-brand-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? 'bg-accent-700 text-white'
                      : item.badge === 'Live'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-brand-800 text-brand-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* BOTTOM FOOTER UTILITIES */}
      <div className="p-4 border-t border-brand-800/80 space-y-2">
        <button
          onClick={onOpenSplash}
          className="w-full bg-brand-900 hover:bg-brand-800 text-brand-300 border border-brand-800 text-[11px] font-mono py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 text-sky-400" />
          <span>Boot / Splash Screen</span>
        </button>

        <div className="pt-2 flex items-center justify-between text-[11px] text-brand-500 font-mono">
          <span>Ruang Rapat Aceh</span>
          <span className="text-emerald-400">Online</span>
        </div>
      </div>
    </aside>
  );
};
