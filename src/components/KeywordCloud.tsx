'use client';

import { Keyword } from '@/lib/types';

interface KeywordCloudProps {
  keywords: Keyword[];
}

export default function KeywordCloud({ keywords }: KeywordCloudProps) {
  const foundCount = keywords.filter((k) => k.found).length;
  const missingCount = keywords.length - foundCount;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Keyword Analysis</h3>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-green-700 dark:text-green-400">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
            Found ({foundCount})
          </span>
          <span className="flex items-center gap-1.5 text-red-700 dark:text-red-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            Missing ({missingCount})
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {keywords.map((kw) => (
          <span
            key={kw.word}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-transform hover:scale-105 ${
              kw.found
                ? 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700'
                : 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700'
            }`}
          >
            <span>{kw.found ? '✓' : '✗'}</span>
            <span>{kw.word}</span>
            {kw.importance === 'high' && (
              <span className="text-[10px] uppercase opacity-75 ml-0.5">★</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
