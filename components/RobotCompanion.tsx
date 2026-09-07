'use client';

import React, { useState, useEffect } from 'react';
import { RobotEmotion, Utterance } from '@/lib/types';
import { Maximize2, Minimize2, Sparkles, Volume2, ShieldCheck } from 'lucide-react';

interface RobotCompanionProps {
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  currentUtterance?: Utterance;
  detectedDivisionTask?: string;
}

export const RobotCompanion: React.FC<RobotCompanionProps> = ({
  isFullscreen = false,
  onToggleFullscreen,
  currentUtterance,
  detectedDivisionTask,
}) => {
  const [emotion, setEmotion] = useState<RobotEmotion>('idle');
  const [isBlinking, setIsBlinking] = useState(false);
  const [voiceLine, setVoiceLine] = useState<string>(
    'Siap mencatat seluruh jalannya rapat, Boss!'
  );

  // Periodic natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Update voice line & reaction when new utterance or task arrives
  useEffect(() => {
    if (detectedDivisionTask) {
      setEmotion('salute');
      setVoiceLine(`Tugas [${detectedDivisionTask}] langsung saya catat ke tabel, Boss!`);
      const timer = setTimeout(() => setEmotion('nodding'), 2200);
      return () => clearTimeout(timer);
    } else if (currentUtterance) {
      if (currentUtterance.seconds % 2 === 0) {
        setEmotion('listen-left');
      } else {
        setEmotion('listen-right');
      }
      setVoiceLine(`Menyimak ${currentUtterance.speakerName}...`);
    }
  }, [currentUtterance, detectedDivisionTask]);

  const triggerEmotion = (newEmotion: RobotEmotion, customLine?: string) => {
    setEmotion(newEmotion);
    if (customLine) {
      setVoiceLine(customLine);
    } else {
      switch (newEmotion) {
        case 'salute':
          setVoiceLine('Siap Boss! Noted, langsung laksanakan!');
          break;
        case 'nodding':
          setVoiceLine('Paham Boss, poin penting disepakati!');
          break;
        case 'wink':
          setVoiceLine('Beres semua urusan rapat, Boss!');
          break;
        case 'curious':
          setVoiceLine('Menyimak detail pertanyaan rapat...');
          break;
        case 'thinking':
          setVoiceLine('Memvalidasi sidik suara & menyusun tabel...');
          break;
        case 'listen-left':
          setVoiceLine('Menyimak pembicara di sisi kiri meja...');
          break;
        case 'listen-right':
          setVoiceLine('Menyimak pembicara di sisi kanan meja...');
          break;
        default:
          setVoiceLine('Siap mendengarkan perintah, Boss!');
      }
    }
  };

  // Compute pupil position based on emotion
  let pupilStyle = { transform: 'translate(0px, 0px)' };
  let headClasses = 'robot-idle';

  if (emotion === 'listen-left') {
    pupilStyle = { transform: 'translate(-12px, 2px)' };
    headClasses = 'transform -translate-x-4 -rotate-3 transition-all duration-300';
  } else if (emotion === 'listen-right') {
    pupilStyle = { transform: 'translate(12px, 2px)' };
    headClasses = 'transform translate-x-4 rotate-3 transition-all duration-300';
  } else if (emotion === 'nodding') {
    headClasses = 'robot-nodding';
    pupilStyle = { transform: 'translate(0px, 4px)' };
  } else if (emotion === 'salute') {
    headClasses = 'robot-salute';
    pupilStyle = { transform: 'translate(0px, -2px) scale(1.1)' };
  } else if (emotion === 'curious') {
    headClasses = 'transform -translate-y-2 -rotate-6 transition-all duration-300';
    pupilStyle = { transform: 'translate(0px, -6px)' };
  } else if (emotion === 'thinking') {
    pupilStyle = { transform: 'translate(0px, -8px)' };
  }

  return (
    <div
      className={`relative select-none flex flex-col justify-between ${
        isFullscreen
          ? 'fixed inset-0 bg-[#050811] text-white z-50 p-8'
          : 'bg-gradient-to-b from-[#0c1220] to-[#060913] text-white rounded-3xl p-6 border border-brand-800 shadow-2xl'
      }`}
    >
      {/* TOP STATUS BAR */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-brand-900/80 border border-brand-800 px-3.5 py-1.5 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-sky-300 font-bold tracking-wider">
              NOTED HARDWARE COMPANION
            </span>
          </div>
          <span className="text-[11px] font-mono text-brand-400 hidden sm:inline-block">
            &ldquo;Asisten meetingmu boss, noted!&rdquo;
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className="bg-brand-900/90 hover:bg-brand-800 text-brand-300 border border-brand-700 text-xs font-semibold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Kembali</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Layar Penuh Meja</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* CENTER: SLEEK HARDWARE OLED ROBOT FACE */}
      <div className="flex flex-col items-center justify-center my-6">
        {/* ROBOT HEAD BEZEL */}
        <div
          className={`relative bg-gradient-to-b from-[#0c1220] to-[#04060d] border-4 border-[#1e293b] rounded-[48px] flex flex-col items-center justify-center shadow-2xl transition-all duration-300 ${headClasses} ${
            isFullscreen ? 'w-[360px] h-[240px]' : 'w-[280px] h-[190px]'
          }`}
        >
          {/* Subtle Chamfer Glow */}
          <div className="absolute inset-2 rounded-[40px] border border-white/5 pointer-events-none bg-gradient-to-b from-white/[0.03] to-transparent" />

          {/* Precision Top Indicator Antenna */}
          <div className="absolute -top-6 flex flex-col items-center">
            <div
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                emotion === 'salute'
                  ? 'bg-emerald-400 shadow-lg shadow-emerald-400/80 scale-125'
                  : emotion === 'curious'
                  ? 'bg-amber-400 shadow-lg shadow-amber-400/80'
                  : 'bg-sky-400 shadow-lg shadow-sky-400/80'
              }`}
            />
            <div className="w-1 h-3 bg-brand-700 rounded-b" />
          </div>

          {/* OLED EYES ROW */}
          <div className="relative w-full flex items-center justify-center gap-8">
            {/* LEFT EYE */}
            <div
              className={`oled-glow bg-sky-400 rounded-[26px] flex items-center justify-center relative overflow-hidden transition-all duration-200 ${
                isBlinking
                  ? 'scale-y-[0.08]'
                  : emotion === 'wink'
                  ? 'scale-y-[0.1]'
                  : 'scale-y-100'
              } ${isFullscreen ? 'w-[68px] h-[86px]' : 'w-[54px] h-[68px]'}`}
            >
              {emotion === 'salute' ? (
                // Happy curved eyes for "Siap Boss!"
                <div className="w-8 h-4 border-t-4 border-[#050811] rounded-t-full mt-2" />
              ) : (
                <div
                  style={pupilStyle}
                  className="w-7 h-9 bg-[#050811] rounded-[14px] flex items-center justify-center transition-all duration-200"
                >
                  <div className="w-2 h-2 bg-white rounded-full self-start mt-1 mr-1" />
                </div>
              )}
            </div>

            {/* RIGHT EYE */}
            <div
              className={`oled-glow bg-sky-400 rounded-[26px] flex items-center justify-center relative overflow-hidden transition-all duration-200 ${
                isBlinking ? 'scale-y-[0.08]' : 'scale-y-100'
              } ${isFullscreen ? 'w-[68px] h-[86px]' : 'w-[54px] h-[68px]'}`}
            >
              {emotion === 'salute' ? (
                <div className="w-8 h-4 border-t-4 border-[#050811] rounded-t-full mt-2" />
              ) : (
                <div
                  style={pupilStyle}
                  className="w-7 h-9 bg-[#050811] rounded-[14px] flex items-center justify-center transition-all duration-200"
                >
                  <div className="w-2 h-2 bg-white rounded-full self-start mt-1 mr-1" />
                </div>
              )}
            </div>
          </div>

          {/* CUTE MOUTH CONTACT DOT */}
          <div className="mt-4 flex items-center justify-center">
            {emotion === 'salute' || emotion === 'wink' ? (
              <div className="w-6 h-2 border-b-2 border-sky-400/90 rounded-b-full" />
            ) : (
              <div className="w-4 h-1 bg-sky-400/80 rounded-full" />
            )}
          </div>
        </div>

        {/* VOICE RESPONSE / LOYAL BOSS LINE BUBBLE */}
        <div className="mt-5 max-w-lg bg-brand-900/80 border border-brand-800 rounded-2xl p-3.5 text-center backdrop-blur-md">
          <div className="flex items-center justify-center gap-1.5 mb-1 font-mono text-[10px] text-sky-400 uppercase tracking-wider font-bold">
            <Volume2 className="w-3 h-3" />
            <span>Respon Asisten Noted</span>
          </div>
          <p className="text-xs text-brand-100 font-mono leading-relaxed">
            &ldquo;{voiceLine}&rdquo;
          </p>
        </div>
      </div>

      {/* QUICK HARDWARE EMOTION TRIGGER STRIP */}
      <div className="bg-brand-900/60 backdrop-blur-md rounded-2xl border border-brand-800 p-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-mono text-brand-400 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Status: Menyimak & Siap Diperintah</span>
        </span>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => triggerEmotion('salute', 'Siap Boss! Noted, langsung saya catat!')}
            className={`text-[11px] font-mono px-2.5 py-1 rounded-lg transition ${
              emotion === 'salute'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'hover:bg-brand-800 text-brand-300'
            }`}
          >
            Siap Boss! (Noted)
          </button>
          <button
            onClick={() => triggerEmotion('nodding', 'Paham Boss, poin penting disepakati!')}
            className={`text-[11px] font-mono px-2.5 py-1 rounded-lg transition ${
              emotion === 'nodding'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                : 'hover:bg-brand-800 text-brand-300'
            }`}
          >
            Manggut Paham
          </button>
          <button
            onClick={() => triggerEmotion('listen-left')}
            className={`text-[11px] font-mono px-2.5 py-1 rounded-lg transition ${
              emotion === 'listen-left'
                ? 'bg-brand-700 text-white'
                : 'hover:bg-brand-800 text-brand-300'
            }`}
          >
            Noleh Kiri
          </button>
          <button
            onClick={() => triggerEmotion('listen-right')}
            className={`text-[11px] font-mono px-2.5 py-1 rounded-lg transition ${
              emotion === 'listen-right'
                ? 'bg-brand-700 text-white'
                : 'hover:bg-brand-800 text-brand-300'
            }`}
          >
            Noleh Kanan
          </button>
          <button
            onClick={() => triggerEmotion('curious', 'Menyimak detail teknis yang kompleks...')}
            className={`text-[11px] font-mono px-2.5 py-1 rounded-lg transition ${
              emotion === 'curious'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'hover:bg-brand-800 text-brand-300'
            }`}
          >
            Menyimak Dalam
          </button>
          <button
            onClick={() => triggerEmotion('wink', 'Semua tabel aman terkendali, Boss!')}
            className={`text-[11px] font-mono px-2.5 py-1 rounded-lg transition ${
              emotion === 'wink'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'hover:bg-brand-800 text-brand-300'
            }`}
          >
            Kedip Siap
          </button>
        </div>
      </div>
    </div>
  );
};
