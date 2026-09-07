'use client';

import React, { useState } from 'react';
import {
  INITIAL_MEETING_SESSION,
  INITIAL_VOICE_PROFILES,
} from '@/lib/mock-data';
import { MeetingSession, Utterance } from '@/lib/types';
import { OperatorStudio } from '@/components/OperatorStudio';
import { MinutesDocument } from '@/components/MinutesDocument';
import { VoiceProfilesView } from '@/components/VoiceProfilesView';
import { RobotCompanion } from '@/components/RobotCompanion';
import { SpeakerSetupModal } from '@/components/SpeakerSetupModal';
import {
  TableColumnsSplit,
  FileText,
  Fingerprint,
  Tablet,
  AudioWaveform,
} from 'lucide-react';

export default function NotedApp() {
  const [activeTab, setActiveTab] = useState<'operator' | 'summary' | 'voice'>('operator');
  const [isRobotFullscreen, setIsRobotFullscreen] = useState(false);
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);
  const [session, setSession] = useState<MeetingSession>(INITIAL_MEETING_SESSION);
  const [activeUtterance, setActiveUtterance] = useState<Utterance | undefined>(
    INITIAL_MEETING_SESSION.utterances[0]
  );
  const [detectedTask, setDetectedTask] = useState<string | undefined>();

  const handleSpeakerSave = (newSpeakers: string[]) => {
    // Update speaker names in utterances
    const updated = session.utterances.map((ut, idx) => {
      if (idx < newSpeakers.length) {
        return { ...ut, speakerName: newSpeakers[idx] };
      }
      return ut;
    });
    setSession({ ...session, utterances: updated });
    // Auto deploy to robot tablet mode
    setIsRobotFullscreen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-50 text-brand-900 font-sans">
      {/* ENTERPRISE APP HEADER */}
      <header className="bg-brand-950 text-white border-b border-brand-800/80 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* BRAND IDENTITY */}
          <div className="flex items-center space-x-3.5">
            <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center font-bold text-white shadow-sm">
              <AudioWaveform className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wider">NOTED</span>
                <span className="text-[10px] bg-brand-800 text-sky-300 border border-brand-700 px-2 py-0.2 rounded font-mono font-medium">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-brand-400 font-medium">
                Asisten meetingmu boss, noted!
              </p>
            </div>
          </div>

          {/* WORKFLOW NAVIGATION TABS */}
          <div className="hidden md:flex items-center bg-brand-900 p-1 rounded-xl border border-brand-800">
            <button
              onClick={() => setActiveTab('operator')}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
                activeTab === 'operator'
                  ? 'bg-accent-600 text-white shadow-sm'
                  : 'text-brand-400 hover:text-white'
              }`}
            >
              <TableColumnsSplit className="w-3.5 h-3.5" />
              <span>Live Operator (70:30)</span>
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
                activeTab === 'summary'
                  ? 'bg-accent-600 text-white shadow-sm'
                  : 'text-brand-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Dokumen Risalah & Tugas Divisi</span>
            </button>
            <button
              onClick={() => setActiveTab('voice')}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
                activeTab === 'voice'
                  ? 'bg-accent-600 text-white shadow-sm'
                  : 'text-brand-400 hover:text-white'
              }`}
            >
              <Fingerprint className="w-3.5 h-3.5" />
              <span>Basis Data Profil Suara</span>
            </button>
          </div>

          {/* TABLET HARDWARE COMPANION TRIGGER */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsRobotFullscreen(true)}
              className="bg-brand-800 hover:bg-brand-700 text-brand-100 border border-brand-700 hover:border-brand-600 text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-2 shadow-sm"
            >
              <Tablet className="w-3.5 h-3.5 text-accent-400" />
              <span>Mode Meja Tablet</span>
            </button>
          </div>
        </div>
      </header>

      {/* SUB-HEADER MINI ROBOT DOCK (INTEGRATED COMPANION STRIP) */}
      <div className="bg-brand-900 border-b border-brand-800 px-6 py-2.5 text-xs text-brand-300 flex items-center justify-between max-w-[1440px] w-full mx-auto">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] text-brand-200">
            Hardware Noted Siap: &ldquo;Siap mencatat perintah rapat, Boss!&rdquo;
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setDetectedTask('Backend');
              setTimeout(() => setDetectedTask(undefined), 3000);
            }}
            className="text-[10px] font-mono bg-brand-800 hover:bg-brand-700 text-sky-300 px-2.5 py-1 rounded-md border border-brand-700"
          >
            ⚡ Tes Perintah Tugas Divisi
          </button>
          <button
            onClick={() => setIsSpeakerModalOpen(true)}
            className="text-[10px] font-mono bg-brand-800 hover:bg-brand-700 text-brand-200 px-2.5 py-1 rounded-md border border-brand-700"
          >
            ⚙️ Setting Pembicara
          </button>
        </div>
      </div>

      {/* MAIN VIEW CONTENT CONTAINER */}
      <div className="max-w-[1440px] w-full mx-auto px-6 py-6 flex-1">
        {activeTab === 'operator' && (
          <OperatorStudio
            session={session}
            onSelectUtterance={(ut) => {
              setActiveUtterance(ut);
              if (ut.detectedDirective) {
                setDetectedTask(ut.detectedDirective.division);
                setTimeout(() => setDetectedTask(undefined), 3000);
              }
            }}
            onFinalize={() => setActiveTab('summary')}
            onOpenSpeakerConfig={() => setIsSpeakerModalOpen(true)}
          />
        )}

        {activeTab === 'summary' && <MinutesDocument session={session} />}

        {activeTab === 'voice' && (
          <VoiceProfilesView profiles={INITIAL_VOICE_PROFILES} />
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-brand-200 py-4 text-center text-xs text-brand-500 font-mono">
        &copy; 2026 Noted — AI Meeting Intelligence & Acoustic Diarization. All rights reserved.
      </footer>

      {/* FULLSCREEN CUTE ROBOT COMPANION OVERLAY */}
      {isRobotFullscreen && (
        <RobotCompanion
          isFullscreen={true}
          onToggleFullscreen={() => setIsRobotFullscreen(false)}
          currentUtterance={activeUtterance}
          detectedDivisionTask={detectedTask}
        />
      )}

      {/* FAST SPEAKER SETUP MODAL */}
      <SpeakerSetupModal
        isOpen={isSpeakerModalOpen}
        onClose={() => setIsSpeakerModalOpen(false)}
        onSave={handleSpeakerSave}
      />
    </div>
  );
}
