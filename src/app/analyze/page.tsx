'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ResumeAnalysis, FeedbackItem } from '@/lib/types';
import { analyzeResume } from '@/lib/analyzer';
import ScoreCard from '@/components/ScoreCard';
import FeedbackSection from '@/components/FeedbackSection';
import KeywordCloud from '@/components/KeywordCloud';

type TabId = 'overview' | 'keywords' | 'experience' | 'skills' | 'improvements';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'keywords', label: 'Keywords' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'improvements', label: 'Improvements' },
];

const SAMPLE_RESUME = `Alex Rivera
alex.rivera@example.com | (555) 123-4567 | github.com/alexrivera | linkedin.com/in/alexrivera

SUMMARY
Senior Frontend Engineer with 5+ years of experience building scalable React and TypeScript applications.

EXPERIENCE
Senior Software Engineer, Acme Corp (2021 - Present)
- Led migration to Next.js and TypeScript, improving page load performance by 42%.
- Built reusable UI component library used across 6 product teams.
- Implemented CI/CD pipelines with Docker and GitHub Actions.

Software Engineer, Beta Labs (2019 - 2021)
- Developed REST APIs with Node.js and PostgreSQL serving 100k+ daily users.
- Collaborated in Agile Scrum sprints to launch 4 major customer-facing features.

SKILLS
React, TypeScript, JavaScript, Node.js, Python, SQL, AWS, Docker, Git, REST API, Agile`;

export default function AnalyzePage() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  useEffect(() => {
    const stored = sessionStorage.getItem('resumeAnalysis');
    if (stored) {
      try {
        setAnalysis(JSON.parse(stored));
        return;
      } catch {
        // fallback to sample analysis
      }
    }
    setAnalysis(analyzeResume(SAMPLE_RESUME));
  }, []);

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-950 text-gray-600 dark:text-gray-300">
        Loading analysis...
      </div>
    );
  }

  const strengthItems: FeedbackItem[] = analysis.strengths.map((s) => ({
    type: 'success',
    text: s,
  }));

  const improvementItems: FeedbackItem[] = analysis.improvements.map((imp) => ({
    type: 'warning',
    text: imp,
    explanation: 'Applying this change can boost your ATS ranking and recruiter readability.',
  }));

  const experienceFeedback: FeedbackItem[] = [
    {
      type: analysis.sectionScores.experience >= 75 ? 'success' : 'warning',
      text: `Experience Section Score: ${analysis.sectionScores.experience}/100`,
      explanation: 'Evaluates action verbs, measurable outcomes, and reverse-chronological clarity.',
    },
    ...analysis.overallFeedback.filter(
      (f) => f.text.toLowerCase().includes('verb') || f.text.toLowerCase().includes('achievement')
    ),
  ];

  const skillsFeedback: FeedbackItem[] = [
    {
      type: analysis.sectionScores.skills >= 75 ? 'success' : 'warning',
      text: `Skills Section Score: ${analysis.sectionScores.skills}/100`,
      explanation: 'Measures alignment with high-demand technical and collaboration keywords.',
    },
    {
      type: 'success',
      text: `${analysis.keywords.filter((k) => k.found).length} of ${analysis.keywords.length} target keywords matched`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight">
            <span className="text-blue-600">✦</span>
            <span>AI Resume Analyzer</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
              Upload New
            </Link>
            <Link href="/tracker" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
              Job Tracker
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Top Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <ScoreCard score={analysis.atsScore} title="Overall ATS Score" size="lg" />

          <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold">Resume Diagnostic Report</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Breakdown across key ATS parsing and recruiter evaluation criteria.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {Object.entries(analysis.sectionScores).map(([section, score]) => (
                <div
                  key={section}
                  className="rounded-xl bg-gray-50 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 p-4 text-center"
                >
                  <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    {section}
                  </p>
                  <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                    {score}%
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Top Job Matches: <strong className="text-gray-800 dark:text-gray-200">{analysis.jobMatches.slice(0, 2).join(', ')}</strong>
              </span>
              <Link
                href="/tracker"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Track Applications →
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="border-b border-gray-200 dark:border-gray-800 px-4 flex overflow-x-auto gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FeedbackSection title="ATS Checks" items={analysis.overallFeedback} />
                <div className="space-y-6">
                  <FeedbackSection title="Key Strengths" items={strengthItems} />
                  <div>
                    <h3 className="text-lg font-bold mb-3">Recommended Job Matches</h3>
                    <ul className="space-y-2">
                      {analysis.jobMatches.map((job) => (
                        <li
                          key={job}
                          className="px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-sm font-medium text-blue-900 dark:text-blue-200"
                        >
                          🎯 {job}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'keywords' && <KeywordCloud keywords={analysis.keywords} />}

            {activeTab === 'experience' && (
              <FeedbackSection title="Experience & Impact Analysis" items={experienceFeedback} />
            )}

            {activeTab === 'skills' && (
              <div className="space-y-6">
                <FeedbackSection title="Skills Evaluation" items={skillsFeedback} />
                <KeywordCloud keywords={analysis.keywords} />
              </div>
            )}

            {activeTab === 'improvements' && (
              <FeedbackSection title="Actionable Improvement Tips" items={improvementItems} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
