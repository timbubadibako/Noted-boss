'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Mic, Volume2, ArrowRight, RotateCcw } from 'lucide-react';

interface SplashScreenProps {
  onComplete?: () => void;
  autoDismissMs?: number; // default e.g. 3800ms or 0 to stay until dismissed
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  autoDismissMs = 4200,
}) => {
  const [bootStep, setBootStep] = useState<number>(0);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [robotEyeState, setRobotEyeState] = useState<'closed' | 'opening' | 'awake' | 'salute'>('closed');
  const [statusMessage, setStatusMessage] = useState<string>('Memulai inisialisasi kernel Noted...');

  useEffect(() => {
    // Step 0: Power ON & Audio check
    const t0 = setTimeout(() => {
      setBootStep(1);
      setLogLines((prev) => [...prev, '[BOOT] Noted Acoustic Kernel v1.0 initialized']);
      setStatusMessage('Memeriksa sensor audio multi-kanal...');
    }, 400);

    // Step 1: Eye opening & Voice Memory sync
    const t1 = setTimeout(() => {
      setBootStep(2);
      setRobotEyeState('opening');
      setLogLines((prev) => [
        ...prev,
        '[AUDIO] WebRTC 48kHz Acoustic Channel... OK',
        '[MEMORY] 14 Profil Sidik Suara Tim Tersinkronisasi (pgvector)',
      ]);
      setStatusMessage('Menyelaraskan memori sidik suara...');
    }, 1200);

    // Step 2: Fully awake & scanning room
    const t2 = setTimeout(() => {
      setBootStep(3);
      setRobotEyeState('awake');
      setLogLines((prev) => [
        ...prev,
        '[AI] LLM Directive & Task Extraction Engine... READY',
      ]);
      setStatusMessage('Mendeteksi orientasi akustik meja...');
    }, 2000);

    // Step 3: Salute Boss ("Siap Boss!")
    const t3 = setTimeout(() => {
      setBootStep(4);
      setRobotEyeState('salute');
      setLogLines((prev) => [
        ...prev,
        '[SYSTEM] Status 100% Siap: "Asisten meetingmu boss, noted!"',
      ]);
      setStatusMessage('Noted aktif 100%! Siap mencatat seluruh rapat, Boss!');
    }, 2800);

    // Auto complete if requested
    let tAuto: NodeJS.Timeout | null = null;
    if (autoDismissMs > 0 && onComplete) {
      tAuto = setTimeout(() => {
        onComplete();
      }, autoDismissMs);
    }

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (tAuto) clearTimeout(tAuto);
    };
  }, [autoDismissMs, onComplete]);

  const handleReplay = () => {
    setBootStep(0);
    setLogLines([]);
    setRobotEyeState('closed');
    setStatusMessage('Memulai inisialisasi ulang...');
    setTimeout(() => {
      setBootStep(1);
      setLogLines(['[BOOT] Noted Acoustic Kernel v1.0 reloaded']);
      setStatusMessage('Memeriksa sensor audio multi-kanal...');
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-[#03060f] text-white z-50 flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden font-sans">
      
      {/* TOP BRAND BAR */}
      <div className="flex items-center justify-between border-b border-brand-800/60 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center font-bold text-white shadow-sm">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-wider font-mono">NOTED // BOOT SEQUENCE</span>
            <span className="text-[10px] text-brand-400 block font-mono">HARDWARE DIAGNOSTIC v1.0</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-brand-900/80 border border-brand-800 px-3 py-1 rounded-xl text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${bootStep >= 4 ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-ping'}`} />
            <span className="text-brand-300">
              {bootStep >= 4 ? 'SYSTEM ONLINE' : 'DIAGNOSING...'}
            </span>
          </div>
        </div>
      </div>

      {/* CENTER: WAKING UP ROBOT COMPANION ANIMATION */}
      <div className="flex flex-col items-center justify-center my-auto space-y-6">
        
        {/* ROBOT HEAD BEZEL */}
        <div
          className={`relative bg-gradient-to-b from-[#0c1220] to-[#04060d] border-4 border-[#1e293b] rounded-[52px] w-[340px] h-[230px] flex flex-col items-center justify-center shadow-2xl transition-all duration-500 ${
            robotEyeState === 'salute' ? 'robot-salute shadow-sky-500/20' : 'shadow-black'
          }`}
        >
          {/* Subtle Chamfer Edge */}
          <div className="absolute inset-2 rounded-[44px] border border-white/5 pointer-events-none bg-gradient-to-b from-white/[0.04] to-transparent" />

          {/* Glowing Top Antenna */}
          <div className="absolute -top-7 flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
                bootStep >= 4
                  ? 'bg-emerald-400 shadow-lg shadow-emerald-400/90 scale-125'
                  : bootStep >= 2
                  ? 'bg-sky-400 shadow-lg shadow-sky-400/80 animate-pulse'
                  : 'bg-brand-700'
              }`}
            />
            <div className="w-1.5 h-3.5 bg-brand-700 rounded-b" />
          </div>

          {/* OLED EYES DISPLAY */}
          <div className="relative w-full flex items-center justify-center gap-10">
            
            {/* LEFT EYE */}
            <div
              className={`oled-glow bg-sky-400 rounded-[28px] flex items-center justify-center relative overflow-hidden transition-all duration-500 ${
                robotEyeState === 'closed'
                  ? 'w-[56px] h-[4px] scale-y-50 opacity-40'
                  : robotEyeState === 'opening'
                  ? 'w-[56px] h-[32px] scale-y-75 opacity-80'
                  : 'w-[64px] h-[82px] scale-y-100 opacity-100'
              }`}
            >
              {robotEyeState === 'salute' ? (
                // Happy curved eyes for "Siap Boss!"
                <div className="w-10 h-5 border-t-4 border-[#03060f] rounded-t-full mt-3" />
              ) : robotEyeState === 'closed' ? null : (
                <div className="w-7 h-9 bg-[#03060f] rounded-[14px] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full self-start mt-1 mr-1" />
                </div>
              )}
            </div>

            {/* RIGHT EYE */}
            <div
              className={`oled-glow bg-sky-400 rounded-[28px] flex items-center justify-center relative overflow-hidden transition-all duration-500 ${
                robotEyeState === 'closed'
                  ? 'w-[56px] h-[4px] scale-y-50 opacity-40'
                  : robotEyeState === 'opening'
                  ? 'w-[56px] h-[32px] scale-y-75 opacity-80'
                  : 'w-[64px] h-[82px] scale-y-100 opacity-100'
              }`}
            >
              {robotEyeState === 'salute' ? (
                <div className="w-10 h-5 border-t-4 border-[#03060f] rounded-t-full mt-3" />
              ) : robotEyeState === 'closed' ? null : (
                <div className="w-7 h-9 bg-[#03060f] rounded-[14px] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full self-start mt-1 mr-1" />
                </div>
              )}
            </div>

          </div>

          {/* CUTE MOUTH CONTACT */}
          <div className="mt-4 flex items-center justify-center transition-all duration-300">
            {robotEyeState === 'salute' ? (
              <div className="w-6 h-2 border-b-2 border-sky-400 rounded-b-full" />
            ) : (
              <div className="w-4 h-1 bg-sky-400/80 rounded-full" />
            )}
          </div>
        </div>

        {/* STATUS GREETING BUBBLE */}
        <div className="max-w-md w-full bg-brand-900/90 border border-brand-800 rounded-2xl p-4 text-center backdrop-blur-md shadow-xl transition-all">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-[11px] font-mono text-sky-400 font-semibold tracking-wider uppercase flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Status Asisten</span>
            </span>
          </div>
          <p className="text-sm text-brand-100 font-mono leading-relaxed">
            &ldquo;{statusMessage}&rdquo;
          </p>
        </div>

      </div>

      {/* BOTTOM TELEMETRY LOG & CONTROL ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border-t border-brand-800/60 pt-4">
        
        {/* BOOT LOG TERMINAL */}
        <div className="md:col-span-8 bg-brand-950/80 border border-brand-800/80 rounded-xl p-3 font-mono text-[11px] text-brand-400 space-y-1 h-24 overflow-hidden">
          <div className="text-brand-500 text-[10px] uppercase tracking-wider mb-1">Diagnostic Terminal Output:</div>
          {logLines.map((line, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-accent-500">&gt;</span>
              <span className={idx === logLines.length - 1 ? 'text-emerald-400 font-bold' : 'text-brand-300'}>
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* PROCEED / ACTION BUTTONS */}
        <div className="md:col-span-4 flex items-center gap-2 justify-end">
          <button
            onClick={handleReplay}
            className="p-2.5 bg-brand-900 hover:bg-brand-800 text-brand-300 border border-brand-700 rounded-xl text-xs font-mono transition flex items-center gap-1"
            title="Ulangi Animasi Boot"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          {onComplete && (
            <button
              onClick={onComplete}
              className="flex-1 bg-accent-600 hover:bg-accent-500 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-accent-600/30 font-mono"
            >
              <span>Masuk Aplikasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
