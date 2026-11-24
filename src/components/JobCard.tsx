'use client';

import { JobApplication } from '@/lib/types';

interface JobCardProps {
  job: JobApplication;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, jobId: string) => void;
  onDelete: (jobId: string) => void;
}

const STATUS_BADGES: Record<JobApplication['status'], { label: string; className: string }> = {
  applied: {
    label: 'Applied',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  },
  phone_screen: {
    label: 'Phone Screen',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  },
  interview: {
    label: 'Interview',
    className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  },
  offer: {
    label: 'Offer',
    className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  },
};

export default function JobCard({ job, onDragStart, onDelete }: JobCardProps) {
  const badge = STATUS_BADGES[job.status];

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, job.id)}
      className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white text-sm">{job.company}</h4>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-0.5">{job.role}</p>
        </div>
        <button
          onClick={() => onDelete(job.id)}
          title="Remove application"
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 text-xs transition-opacity"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${badge.className}`}>
          {badge.label}
        </span>
        {job.salary && (
          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
            {job.salary}
          </span>
        )}
      </div>

      {job.notes && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2.5 line-clamp-2">
          {job.notes}
        </p>
      )}

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 dark:border-gray-700/70 text-[11px] text-gray-400">
        <span>Applied: {job.dateApplied}</span>
        {job.link && (
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Posting ↗
          </a>
        )}
      </div>
    </div>
  );
}
