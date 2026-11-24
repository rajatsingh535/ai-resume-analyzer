import Link from 'next/link';
import JobTracker from '@/components/JobTracker';

export default function TrackerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight">
            <span className="text-blue-600">✦</span>
            <span>AI Resume Analyzer</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
              Home
            </Link>
            <Link href="/analyze" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
              Analysis
            </Link>
            <Link href="/tracker" className="text-blue-600 dark:text-blue-400 font-semibold">
              Job Tracker
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <JobTracker />
      </main>
    </div>
  );
}
