import { MeetingSession, VoiceProfile } from './types';

export const INITIAL_VOICE_PROFILES: VoiceProfile[] = [
  {
    id: 'prf-01',
    name: 'Budi Santoso',
    role: 'Product Lead',
    avatarInitials: 'BS',
    totalSessionsMatched: 14,
    acousticConfidenceAvg: 0.984,
    lastActive: '2026-09-07',
  },
  {
    id: 'prf-02',
    name: 'Siti Rahma',
    role: 'Backend Lead',
    avatarInitials: 'SR',
    totalSessionsMatched: 9,
    acousticConfidenceAvg: 0.961,
    lastActive: '2026-09-07',
  },
  {
    id: 'prf-03',
    name: 'Rina Wijaya',
    role: 'QA Lead',
    avatarInitials: 'RW',
    totalSessionsMatched: 7,
    acousticConfidenceAvg: 0.948,
    lastActive: '2026-09-07',
  },
];

export const INITIAL_MEETING_SESSION: MeetingSession = {
  id: 'sess-2026-0907-sp4',
  title: 'Sprint Planning Q4 & Integrasi Payment Gateway',
  referenceCode: 'MOM-2026-0907-01',
  date: 'Senin, 7 September 2026',
  timeRange: '10:00 - 10:24 WIB',
  durationFormatted: '00:24:18',
  leader: 'Budi Santoso (Product Lead)',
  status: 'active',
  executiveSummary:
    'Rapat koordinasi sprint planning berfokus pada kesiapan teknis dan operasional peluncuran gerbang pembayaran baru. Evaluasi backend mencatatkan penyelesaian modul 90%, dengan jadwal deployment lingkungan staging pada Selasa sore. Verifikasi QA difokuskan pada integritas skenario refund dan audit logging data transaksi. Peluncuran lingkungan produksi disepakati pada hari Jumat jam 16:00 WIB setelah seluruh tahapan verifikasi dinyatakan tuntas.',
  keyDecisions: [
    {
      id: 'kd-1',
      title: 'Jadwal Rilis Produksi Resmi',
      description:
        'Disepakati jadwal rilis pada hari Jumat pukul 16:00 WIB dengan syarat seluruh hasil regresi QA berstatus lulus.',
    },
    {
      id: 'kd-2',
      title: 'Standar Keamanan Audit Logging',
      description:
        'Seluruh alur refund wajib mencatatkan data timestamp dan identitas pengguna pemroses secara permanen.',
    },
  ],
  divisionTasks: [
    {
      id: 'task-1',
      division: 'Backend & DevOps',
      taskDescription:
        'Pelaksanaan staging deployment backend payment gateway & integrasi webhook notifikasi',
      pic: 'Siti Rahma',
      deadline: 'Selasa (17:00 WIB)',
      priority: 'high',
      isCompleted: false,
      triggerQuote:
        'Saya dan tim DevOps akan pastikan staging deployment selesai besok sore.',
    },
    {
      id: 'task-2',
      division: 'Backend & DevOps',
      taskDescription:
        'Penyusunan dokumen spesifikasi API skenario refund dan penanganan kegagalan transaksi',
      pic: 'Siti Rahma',
      deadline: 'Senin (Sore)',
      priority: 'medium',
      isCompleted: true,
      triggerQuote:
        'Tolong Siti siapkan dokumentasi API spec-nya sore ini ya.',
    },
    {
      id: 'task-3',
      division: 'Quality Assurance (QA)',
      taskDescription:
        'Penyusunan test cases skenario refund, validasi audit logging, dan uji beban transaksi',
      pic: 'Rina Wijaya',
      deadline: 'Kamis Pagi',
      priority: 'normal',
      isCompleted: false,
      triggerQuote:
        'Dari sisi QA kami butuh test case tambahan untuk skenario refund.',
    },
    {
      id: 'task-4',
      division: 'Product & Operasional',
      taskDescription:
        'Penyusunan panduan operasional layanan pelanggan (CS) dan materi rilis fitur transaksi',
      pic: 'Budi Santoso',
      deadline: 'Jumat Pagi',
      priority: 'high',
      isCompleted: false,
      triggerQuote:
        'Pastikan tim CS dan Finance mendapatkan briefing SOP refund 24 jam sebelum rilis.',
    },
  ],
  utterances: [
    {
      id: 'ut-1',
      speakerId: 'prf-01',
      speakerName: 'Budi Santoso',
      role: 'Product Lead',
      timestamp: '00:01:12',
      seconds: 72,
      text: 'Baik rekan-rekan, kita mulai rapat sprint planning minggu ini. Target utama divisi adalah menyelesaikan integrasi payment gateway baru sebelum hari Jumat jam 16:00 WIB.',
      acousticMatchConfidence: 0.984,
    },
    {
      id: 'ut-2',
      speakerId: 'prf-02',
      speakerName: 'Siti Rahma',
      role: 'Backend Lead',
      timestamp: '00:01:45',
      seconds: 105,
      text: 'Untuk backend API payment gateway sudah siap 90%. Saya dan tim DevOps akan pastikan staging deployment selesai besok sore.',
      acousticMatchConfidence: 0.961,
      detectedDirective: {
        division: 'Backend & DevOps',
        task: 'Staging deployment backend payment gateway',
        deadline: 'Selasa (17:00 WIB)',
      },
    },
    {
      id: 'ut-3',
      speakerId: 'prf-03',
      speakerName: 'Rina Wijaya',
      role: 'QA Lead',
      timestamp: '00:03:02',
      seconds: 182,
      text: 'Dari sisi QA kami butuh test case tambahan untuk skenario refund. Tolong Siti siapkan dokumentasi API spec-nya sore ini ya.',
      acousticMatchConfidence: 0.948,
      detectedDirective: {
        division: 'QA & Backend',
        task: 'Penyusunan API Spec refund & Test Cases',
        deadline: 'Hari Ini',
      },
    },
    {
      id: 'ut-4',
      speakerId: 'prf-01',
      speakerName: 'Budi Santoso',
      role: 'Product Lead',
      timestamp: '00:04:15',
      seconds: 255,
      text: 'Bagus sekali! Semua sepakat rilis di akhir minggu ya. Jangan lupa koordinasi dengan tim CS dan Finance.',
      acousticMatchConfidence: 0.982,
    },
  ],
};
