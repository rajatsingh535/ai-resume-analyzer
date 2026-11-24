import Link from 'next/link';
import ResumeUpload from '@/components/ResumeUpload';

const FEATURES = [
  {
    icon: '📊',
    title: 'ATS Score',
    description:
      'Instant compatibility rating showing how well your resume parses through modern Applicant Tracking Systems.',
  },
  {
    icon: '🔑',
    title: 'Keyword Analysis',
    description:
      'Spot high-impact technical and soft-skill keywords found in your resume alongside critical missing terms.',
  },
  {
    icon: '💡',
    title: 'Improvement Tips',
    description:
      'Actionable, line-by-line suggestions on quantifiable impact, action verbs, and section formatting.',
  },
  {
    icon: '🎯',
    title: 'Job Match',
    description:
      'Discover top roles tailored to your skill profile and track every application in our built-in Kanban board.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'I bumped my ATS score from 62 to 91 in twenty minutes and landed three interviews the same week.',
    name: 'Sarah Chen',
    role: 'Frontend Engineer at Stripe',
  },
  {
    quote:
      'The keyword breakdown showed me exact skills I had worked with but forgot to list clearly on my resume.',
    name: 'Marcus Vance',
    role: 'Full Stack Developer at Vercel',
  },
  {
    quote:
      'Having the resume analyzer and the Kanban job tracker in one place kept my entire job search organized.',
    name: 'Priya Patel',
    role: 'Product Engineer at Figma',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200/80 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight">
            <span className="text-blue-600">✦</span>
            <span>AI Resume Analyzer</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/analyze" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Analysis
            </Link>
            <Link href="/tracker" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Job Tracker
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero & Upload Section */}
      <main>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6">
            <span>⚡</span>
            <span>Instant AI-Powered Resume & ATS Feedback</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 dark:from-white dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
            AI Resume Analyzer
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get instant AI-powered feedback on your resume
          </p>

          <div className="mt-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/5">
            <ResumeUpload />
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-gray-200/70 dark:border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Everything you need to beat the ATS</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Comprehensive scoring, keyword diagnostics, and role matching in seconds.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-2xl mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-gray-200/70 dark:border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Loved by job seekers</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Real results from engineers and designers who upgraded their resumes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              >
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-xs text-gray-500 dark:text-gray-400">
        AI Resume Analyzer — Built with Next.js & Tailwind CSS
      </footer>
    </div>
  );
}
