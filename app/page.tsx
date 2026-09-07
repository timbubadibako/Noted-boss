'use client';

import React, { useState } from 'react';
import {
  INITIAL_MEETING_SESSION,
  INITIAL_VOICE_PROFILES,
} from '@/lib/mock-data';
import { MeetingSession, Utterance, DivisionTask } from '@/lib/types';
import { Sidebar, MainNavSection } from '@/components/Sidebar';
import { DashboardView } from '@/components/DashboardView';
import { OperatorStudio } from '@/components/OperatorStudio';
import { MinutesDocument } from '@/components/MinutesDocument';
import { CompanyTasksView } from '@/components/CompanyTasksView';
import { VoiceProfilesView } from '@/components/VoiceProfilesView';
import { KnowledgeBaseView } from '@/components/KnowledgeBaseView';
import { RoomsAndKioskView } from '@/components/RoomsAndKioskView';
import { SettingsView } from '@/components/SettingsView';
import { RobotCompanion } from '@/components/RobotCompanion';
import { SpeakerSetupModal } from '@/components/SpeakerSetupModal';
import { SplashScreen } from '@/components/SplashScreen';
import {
  TableColumnsSplit,
  FileText,
  Tablet,
  Zap,
  Menu,
  X,
  Bell,
  Search,
} from 'lucide-react';

export default function NotedApp() {
  const [activeSection, setActiveSection] = useState<MainNavSection>('dashboard');
  const [meetingTab, setMeetingTab] = useState<'operator' | 'summary'>('operator');
  const [showSplash, setShowSplash] = useState(false);
  const [isRobotFullscreen, setIsRobotFullscreen] = useState(false);
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Centralized session & tasks state
  const [session, setSession] = useState<MeetingSession>(INITIAL_MEETING_SESSION);
  const [tasks, setTasks] = useState<DivisionTask[]>(INITIAL_MEETING_SESSION.divisionTasks);
  const [activeUtterance, setActiveUtterance] = useState<Utterance | undefined>(
    INITIAL_MEETING_SESSION.utterances[0]
  );
  const [detectedTask, setDetectedTask] = useState<string | undefined>();

  const handleSpeakerSave = (newSpeakers: string[]) => {
    const updated = session.utterances.map((ut, idx) => {
      if (idx < newSpeakers.length) {
        return { ...ut, speakerName: newSpeakers[idx] };
      }
      return ut;
    });
    setSession({ ...session, utterances: updated });
    setIsRobotFullscreen(true);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const handleAddTask = (newTask: DivisionTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <div className="min-h-screen flex bg-brand-50 text-brand-900 font-sans antialiased selection:bg-accent-100 selection:text-accent-900">
      
      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex">
        <Sidebar
          activeSection={activeSection}
          onSelectSection={(sec) => setActiveSection(sec)}
          onOpenTabletMode={() => setIsRobotFullscreen(true)}
          onOpenSplash={() => setShowSplash(true)}
          taskCount={tasks.length}
        />
      </div>

      {/* MOBILE SIDEBAR DRAWER */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-brand-950/70 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-64 flex">
            <Sidebar
              activeSection={activeSection}
              onSelectSection={(sec) => {
                setActiveSection(sec);
                setIsMobileSidebarOpen(false);
              }}
              onOpenTabletMode={() => {
                setIsRobotFullscreen(true);
                setIsMobileSidebarOpen(false);
              }}
              onOpenSplash={() => {
                setShowSplash(true);
                setIsMobileSidebarOpen(false);
              }}
              taskCount={tasks.length}
            />
          </div>
        </div>
      )}

      {/* MAIN APPLICATION VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* TOP ENTERPRISE APP HEADER */}
        <header className="bg-white border-b border-brand-200 h-16 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 shadow-xs">
          {/* LEFT: MOBILE TOGGLE & BREADCRUMB */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-2 text-brand-600 hover:text-brand-900 hover:bg-brand-50 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-brand-400">NOTED</span>
              <span className="text-brand-300">/</span>
              <span className="font-bold text-brand-900 uppercase">
                {activeSection === 'dashboard'
                  ? 'Dashboard Utama'
                  : activeSection === 'meetings'
                  ? 'Sesi & Risalah Rapat'
                  : activeSection === 'tasks'
                  ? 'Papan Tugas Divisi'
                  : activeSection === 'voice'
                  ? 'Sidik Suara Tim'
                  : activeSection === 'knowledge'
                  ? 'Tanya Noted (AI Search)'
                  : activeSection === 'rooms'
                  ? 'Ruang Rapat & Tablet'
                  : 'Pengaturan & Integrasi'}
              </span>
            </div>
          </div>

          {/* RIGHT: HARDWARE TABLET & QUICK ACTIONS */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setShowSplash(true)}
              className="bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-semibold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 font-mono shadow-xs"
              title="Putar Animasi Boot Sequence"
            >
              <Zap className="w-3.5 h-3.5 text-sky-600" />
              <span className="hidden sm:inline">Splash Boot</span>
            </button>

            <button
              onClick={() => setIsRobotFullscreen(true)}
              className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl transition flex items-center gap-2 shadow-sm font-mono"
            >
              <Tablet className="w-3.5 h-3.5 text-accent-400" />
              <span>Mode Meja Tablet</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE VIEW CONTAINER */}
        <div className="flex-1 p-4 sm:p-8 max-w-[1440px] w-full mx-auto">
          
          {/* SECTION 1: DASHBOARD UTAMA */}
          {activeSection === 'dashboard' && (
            <DashboardView
              session={session}
              tasks={tasks}
              onStartMeeting={() => {
                setActiveSection('meetings');
                setMeetingTab('operator');
              }}
              onOpenMoM={() => {
                setActiveSection('meetings');
                setMeetingTab('summary');
              }}
              onOpenTasks={() => setActiveSection('tasks')}
              onOpenVoice={() => setActiveSection('voice')}
            />
          )}

          {/* SECTION 2: MEETINGS (LIVE OPERATOR & MOM STUDIO) */}
          {activeSection === 'meetings' && (
            <div className="space-y-6">
              {/* Internal Tab Switcher for Meetings */}
              <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-brand-200 shadow-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setMeetingTab('operator')}
                    className={`text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                      meetingTab === 'operator'
                        ? 'bg-accent-600 text-white shadow-sm'
                        : 'text-brand-600 hover:bg-brand-50'
                    }`}
                  >
                    <TableColumnsSplit className="w-3.5 h-3.5" />
                    <span>Live Operator Studio (70:30)</span>
                  </button>
                  <button
                    onClick={() => setMeetingTab('summary')}
                    className={`text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                      meetingTab === 'summary'
                        ? 'bg-accent-600 text-white shadow-sm'
                        : 'text-brand-600 hover:bg-brand-50'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Dokumen Risalah & Tugas Divisi</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 pr-2 font-mono text-[11px] text-brand-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="hidden sm:inline">Koneksi WebRTC Stabil</span>
                </div>
              </div>

              {meetingTab === 'operator' ? (
                <OperatorStudio
                  session={session}
                  onSelectUtterance={(ut) => {
                    setActiveUtterance(ut);
                    if (ut.detectedDirective) {
                      setDetectedTask(ut.detectedDirective.division);
                      setTimeout(() => setDetectedTask(undefined), 3000);
                    }
                  }}
                  onFinalize={() => setMeetingTab('summary')}
                  onOpenSpeakerConfig={() => setIsSpeakerModalOpen(true)}
                />
              ) : (
                <MinutesDocument session={session} />
              )}
            </div>
          )}

          {/* SECTION 3: PAPAN TUGAS DIVISI */}
          {activeSection === 'tasks' && (
            <CompanyTasksView
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
            />
          )}

          {/* SECTION 4: SIDIK SUARA TIM */}
          {activeSection === 'voice' && (
            <VoiceProfilesView profiles={INITIAL_VOICE_PROFILES} />
          )}

          {/* SECTION 5: TANYA NOTED (AI KNOWLEDGE BASE) */}
          {activeSection === 'knowledge' && <KnowledgeBaseView />}

          {/* SECTION 6: RUANG RAPAT & TABLET */}
          {activeSection === 'rooms' && <RoomsAndKioskView />}

          {/* SECTION 7: PENGATURAN & INTEGRASI */}
          {activeSection === 'settings' && <SettingsView />}

        </div>

        {/* FOOTER */}
        <footer className="bg-white border-t border-brand-200 py-4 px-6 text-center text-xs text-brand-500 font-mono">
          &copy; 2026 Noted — AI Meeting Intelligence & Acoustic Diarization. All rights reserved.
        </footer>

      </div>

      {/* SPLASH SCREEN & BOOT SEQUENCE MODAL OVERLAY */}
      {showSplash && (
        <SplashScreen
          autoDismissMs={0}
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* FULLSCREEN CUTE OLED ROBOT COMPANION OVERLAY */}
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
