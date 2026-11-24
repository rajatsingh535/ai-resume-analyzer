'use client';

interface ScoreCardProps {
  score: number;
  title?: string;
  size?: 'sm' | 'lg';
}

export default function ScoreCard({ score, title = 'ATS Compatibility Score', size = 'lg' }: ScoreCardProps) {
  const clampedScore = Math.max(0, Math.min(100, Math.round(score)));

  const getColor = (s: number) => {
    if (s >= 80) return { stroke: '#16a34a', text: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/30', badge: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', label: 'Excellent' };
    if (s >= 60) return { stroke: '#ca8a04', text: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-950/30', badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', label: 'Good' };
    return { stroke: '#dc2626', text: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30', badge: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300', label: 'Needs Work' };
  };

  const colors = getColor(clampedScore);
  const dimension = size === 'lg' ? 160 : 96;
  const strokeWidth = size === 'lg' ? 12 : 8;
  const radius = (dimension - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedScore / 100) * circumference;

  return (
    <div className={`rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center text-center ${colors.bg}`}>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-4">
        {title}
      </h3>
      <div className="relative flex items-center justify-center" style={{ width: dimension, height: dimension }}>
        <svg className="-rotate-90 w-full h-full" viewBox={`0 0 ${dimension} ${dimension}`}>
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${size === 'lg' ? 'text-4xl' : 'text-2xl'} font-extrabold ${colors.text}`}>
            {clampedScore}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">/ 100</span>
        </div>
      </div>
      <span className={`mt-4 px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
        {colors.label}
      </span>
    </div>
  );
}
