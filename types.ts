
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  salary?: string;
  description: string;
  postedDate: string;
  applied?: boolean;
}

export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  dateApplied: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  resumeVersion: string;
  coverLetterVersion: string;
}

export interface UserSettings {
  baseResume: string;
  baseCoverLetter: string;
}

export enum View {
  Dashboard = 'Dashboard',
  Jobs = 'Jobs',
  Tracker = 'Tracker',
  Settings = 'Settings',
}
