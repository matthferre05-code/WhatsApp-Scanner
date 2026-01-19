
export enum AppState {
  IDLE = 'IDLE',
  SCANNING = 'SCANNING',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED'
}

export interface LogEntry {
  message: string;
  timestamp: string;
}
