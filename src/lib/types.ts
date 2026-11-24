export interface Keyword {
  word: string;
  found: boolean;
  importance: 'high' | 'medium' | 'low';
}

export interface FeedbackItem {
  type: 'success' | 'error' | 'warning';
  text: string;
  explanation?: string;
}

export interface ResumeAnalysis {
  atsScore: number;
  keywords: Keyword[];
  strengths: string[];
  improvements: string[];
  jobMatches: string[];
  overallFeedback: FeedbackItem[];
  sectionScores: {
    experience: number;
    skills: number;
    education: number;
    formatting: number;
  };
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  dateApplied: string;
  status: 'applied' | 'phone_screen' | 'interview' | 'offer' | 'rejected';
  notes?: string;
  salary?: string;
  link?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  status: JobApplication['status'];
  color: string;
  jobs: JobApplication[];
}
