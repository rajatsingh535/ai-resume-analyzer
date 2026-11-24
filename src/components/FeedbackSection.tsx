'use client';

import { FeedbackItem } from '@/lib/types';

interface FeedbackSectionProps {
  items: FeedbackItem[];
  title?: string;
}

export default function FeedbackSection({ items, title }: FeedbackSectionProps) {
  const getStyles = (type: FeedbackItem['type']) => {
    switch (type) {
      case 'success':
        return {
          icon: '✓',
          container: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
          iconBg: 'bg-green-600 text-white',
          title: 'text-green-900 dark:text-green-200',
          desc: 'text-green-700 dark:text-green-300',
        };
      case 'error':
        return {
          icon: '✗',
          container: 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800',
          iconBg: 'bg-red-600 text-white',
          title: 'text-red-900 dark:text-red-200',
          desc: 'text-red-700 dark:text-red-300',
        };
      case 'warning':
      default:
        return {
          icon: '⚠',
          container: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800',
          iconBg: 'bg-yellow-500 text-white',
          title: 'text-yellow-900 dark:text-yellow-200',
          desc: 'text-yellow-700 dark:text-yellow-300',
        };
    }
  };

  return (
    <div className="space-y-3">
      {title && (
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      )}
      {items.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No feedback items to display.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, idx) => {
            const styles = getStyles(item.type);
            return (
              <li
                key={idx}
                className={`flex items-start gap-3 p-4 rounded-xl border ${styles.container}`}
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${styles.iconBg}`}
                >
                  {styles.icon}
                </span>
                <div>
                  <p className={`font-semibold text-sm ${styles.title}`}>{item.text}</p>
                  {item.explanation && (
                    <p className={`text-xs mt-1 ${styles.desc}`}>{item.explanation}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
