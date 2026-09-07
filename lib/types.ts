export type RobotEmotion =
  | 'idle'
  | 'listen-left'
  | 'listen-right'
  | 'nodding'
  | 'curious'
  | 'salute'
  | 'thinking'
  | 'wink';

export type TaskPriority = 'high' | 'medium' | 'normal';

export interface DivisionTask {
  id: string;
  division: string;
  taskDescription: string;
  pic: string;
  deadline: string;
  priority: TaskPriority;
  isCompleted: boolean;
  triggerQuote?: string;
}

export interface Utterance {
  id: string;
  speakerId?: string;
  speakerName: string;
  role?: string;
  timestamp: string; // e.g. "00:01:12"
  seconds: number;
  text: string;
  acousticMatchConfidence?: number; // e.g. 0.984 for 98.4%
  detectedDirective?: {
    division: string;
    task: string;
    deadline: string;
  };
}

export interface MeetingSession {
  id: string;
  title: string;
  referenceCode: string;
  date: string;
  timeRange: string;
  durationFormatted: string;
  leader: string;
  status: 'active' | 'processing' | 'verified';
  executiveSummary: string;
  keyDecisions: Array<{ id: string; title: string; description: string }>;
  divisionTasks: DivisionTask[];
  utterances: Utterance[];
}

export interface VoiceProfile {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  totalSessionsMatched: number;
  acousticConfidenceAvg: number;
  lastActive: string;
}
