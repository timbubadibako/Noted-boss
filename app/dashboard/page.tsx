'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
  Building2,
  Menu,
  FileCode,
  ArrowRight,
} from 'lucide-react';

export default function DashboardWorkspace() {
  const searchParams = useSearchParams();
  const tenantName = searchParams.get('tenant') || 'PT Maju Teknologi Indonesia';

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

  // Flow: "+ Mulai Rapat Baru" -> Splash Boot Sequence -> Direct to Robot Fullscreen Mode!
  const handleStartMeetingFlow = () => {
    setShowSplash(true);
  };

  const handleSplashBootComplete = () => {
    setShowSplash(false);
    // Directly deploy into Fullscreen Tablet Robot Companion Mode!
    setIsRobotFullscreen(true);
  };

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
    <div className="h-screen w-screen flex bg-brand-50 text-brand-900 font-sans antialiased overflow-hidden selection:bg-accent-100 selection:text-accent-900">
      
      {/* DESKTOP FIXED SIDEBAR (H-SCREEN, NOT SCROLLED) */}
      <div className="hidden lg:block h-screen shrink-0 border-r border-brand-800/80">
        <Sidebar
          activeSection={activeSection}
          onSelectSection={(sec) => setActiveSection(sec)}
          onOpenTabletMode={() => setIsRobotFullscreen(true)}
          onOpenSplash={handleStartMeetingFlow}
          taskCount={tasks.length}
        />
      </div>

      {/* MOBILE DRAWER */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-brand-950/70 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-64 flex h-screen">
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
                handleStartMeetingFlow();
                setIsMobileSidebarOpen(false);
              }}
              taskCount={tasks.length}
            />
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA: SCROLLABLE VIEWPORT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP ENTERPRISE HEADER WITH TENANT ISOLATION */}
        <header className="bg-white border-b border-brand-200 h-16 shrink-0 flex items-center justify-between px-4 sm:px-8 shadow-xs z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-2 text-brand-600 hover:text-brand-900 hover:bg-brand-50 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* TENANT BADGE */}
            <div className="flex items-center gap-2 text-xs">
              <div className="w-6 h-6 rounded-md bg-brand-900 text-white flex items-center justify-center font-bold text-[10px] font-mono">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-brand-900">{tenantName}</span>
                <span className="text-[10px] text-brand-400 font-mono block">Data Grup Terisolasi</span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleStartMeetingFlow}
              className="bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-2 shadow-sm font-mono"
            >
              <span>+ Mulai Rapat Langsung</span>
            </button>
            <button
              onClick={() => setIsRobotFullscreen(true)}
              className="bg-brand-900 hover:bg-brand-800 text-brand-100 text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm font-mono"
            >
              <Tablet className="w-3.5 h-3.5 text-accent-400" />
              <span>Mode Meja</span>
            </button>
          </div>
        </header>

        {/* INDEPENDENTLY SCROLLABLE CONTENT BODY */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-[1440px] w-full mx-auto">
          
          {/* 1. DASHBOARD UTAMA */}
          {activeSection === 'dashboard' && (
            <DashboardView
              session={session}
              tasks={tasks}
              onStartMeeting={handleStartMeetingFlow}
              onOpenMoM={() => {
                setActiveSection('meetings');
                setMeetingTab('summary');
              }}
              onOpenTasks={() => setActiveSection('tasks')}
              onOpenVoice={() => setActiveSection('voice')}
            />
          )}

          {/* 2. RIWAYAT RAPAT (MEETINGS) */}
          {activeSection === 'meetings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3 rounded-2xl border border-brand-200 gap-3 shadow-xs">
                <div>
                  <h2 className="text-sm font-bold text-brand-900">Riwayat & Dokumen Sesi Rapat</h2>
                  <p className="text-[11px] text-brand-500 font-mono">Format Penyimpanan Berkas: Markdown Lake (.md)</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setMeetingTab('operator')}
                    className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-2 ${
                      meetingTab === 'operator'
                        ? 'bg-accent-600 text-white shadow-sm'
                        : 'text-brand-600 hover:bg-brand-50'
                    }`}
                  >
                    <TableColumnsSplit className="w-3.5 h-3.5" />
                    <span>Studio Operator (70:30)</span>
                  </button>
                  <button
                    onClick={() => setMeetingTab('summary')}
                    className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-2 ${
                      meetingTab === 'summary'
                        ? 'bg-accent-600 text-white shadow-sm'
                        : 'text-brand-600 hover:bg-brand-50'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Dokumen Risalah MoM</span>
                  </button>
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
                <div className="space-y-6">
                  {/* Markdown lake notification */}
                  <div className="p-3 bg-brand-900 text-brand-200 rounded-xl flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-emerald-400" />
                      <span>Tersimpan di Markdown Lake: storage/meetings/2026-09-07-sprint-planning.md</span>
                    </div>
                    <span className="text-emerald-400 font-bold">Obsidian & CLI Sync OK</span>
                  </div>
                  <MinutesDocument session={session} />
                </div>
              )}
            </div>
          )}

          {/* 3. PAPAN TUGAS DIVISI */}
          {activeSection === 'tasks' && (
            <CompanyTasksView
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
            />
          )}

          {/* 4. SIDIK SUARA TIM */}
          {activeSection === 'voice' && (
            <VoiceProfilesView profiles={INITIAL_VOICE_PROFILES} />
          )}

          {/* 5. TANYA NOTED (KNOWLEDGE BASE) */}
          {activeSection === 'knowledge' && <KnowledgeBaseView />}

          {/* 6. RUANG RAPAT & TABLET */}
          {activeSection === 'rooms' && <RoomsAndKioskView />}

          {/* 7. PENGATURAN & INTEGRASI */}
          {activeSection === 'settings' && <SettingsView />}

        </main>
      </div>

      {/* SPLASH BOOT SEQUENCE MODAL (AUTO TRANSITIONS TO FULLSCREEN ROBOT) */}
      {showSplash && (
        <SplashScreen
          autoDismissMs={2600}
          onComplete={handleSplashBootComplete}
        />
      )}

      {/* FULLSCREEN CUTE OLED ROBOT COMPANION (WITH BUTTON TO SWITCH TO 70:30 STUDIO) */}
      {isRobotFullscreen && (
        <div className="fixed inset-0 z-50">
          <RobotCompanion
            isFullscreen={true}
            onToggleFullscreen={() => setIsRobotFullscreen(false)}
            currentUtterance={activeUtterance}
            detectedDivisionTask={detectedTask}
          />
          {/* Quick switcher to 70:30 Studio floating on top right of the robot screen */}
          <div className="fixed top-8 right-32 z-50">
            <button
              onClick={() => {
                setIsRobotFullscreen(false);
                setActiveSection('meetings');
                setMeetingTab('operator');
              }}
              className="bg-brand-900/90 hover:bg-brand-800 text-sky-300 border border-sky-500/40 text-xs font-mono font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-lg backdrop-blur-md"
            >
              <TableColumnsSplit className="w-3.5 h-3.5" />
              <span>Buka Studio Operator (70:30)</span>
            </button>
          </div>
        </div>
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
