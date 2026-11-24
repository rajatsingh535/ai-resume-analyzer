'use client';

import { useState } from 'react';
import { JobApplication } from '@/lib/types';
import { mockJobApplications } from '@/lib/mockData';
import JobCard from './JobCard';

const COLUMNS: { id: JobApplication['status']; title: string; accent: string }[] = [
  { id: 'applied', title: 'Applied', accent: 'border-t-blue-500' },
  { id: 'phone_screen', title: 'Phone Screen', accent: 'border-t-yellow-500' },
  { id: 'interview', title: 'Interview', accent: 'border-t-purple-500' },
  { id: 'offer', title: 'Offer', accent: 'border-t-green-500' },
  { id: 'rejected', title: 'Rejected', accent: 'border-t-red-500' },
];

export default function JobTracker() {
  const [jobs, setJobs] = useState<JobApplication[]>(mockJobApplications);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJob, setNewJob] = useState<{
    company: string;
    role: string;
    status: JobApplication['status'];
    salary: string;
    notes: string;
  }>({
    company: '',
    role: '',
    status: 'applied',
    salary: '',
    notes: '',
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, jobId: string) => {
    setDraggedId(jobId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetStatus: JobApplication['status']) => {
    e.preventDefault();
    if (!draggedId) return;
    setJobs((prev) =>
      prev.map((job) => (job.id === draggedId ? { ...job, status: targetStatus } : job))
    );
    setDraggedId(null);
  };

  const handleDelete = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  const openModalForStatus = (status: JobApplication['status']) => {
    setNewJob({ company: '', role: '', status, salary: '', notes: '' });
    setIsModalOpen(true);
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.company.trim() || !newJob.role.trim()) return;

    const created: JobApplication = {
      id: Date.now().toString(),
      company: newJob.company.trim(),
      role: newJob.role.trim(),
      status: newJob.status,
      dateApplied: new Date().toISOString().split('T')[0],
      salary: newJob.salary.trim() || undefined,
      notes: newJob.notes.trim() || undefined,
    };

    setJobs((prev) => [created, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Application Pipeline
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Drag and drop cards between stages to update their status.
          </p>
        </div>
        <button
          onClick={() => openModalForStatus('applied')}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-colors"
        >
          + Add Application
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
        {COLUMNS.map((col) => {
          const colJobs = jobs.filter((j) => j.status === col.id);
          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 border-t-4 ${col.accent} rounded-xl p-3 min-h-[420px] flex flex-col gap-3`}
            >
              <div className="flex items-center justify-between px-1">
                <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100">
                  {col.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {colJobs.length}
                </span>
              </div>

              <div className="flex-1 space-y-3">
                {colJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onDragStart={handleDragStart}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              <button
                onClick={() => openModalForStatus(col.id)}
                className="w-full py-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                + Add to {col.title}
              </button>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Add Job Application
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddJob} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  required
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  placeholder="e.g. Stripe"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Role *
                </label>
                <input
                  type="text"
                  required
                  value={newJob.role}
                  onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Stage
                  </label>
                  <select
                    value={newJob.status}
                    onChange={(e) =>
                      setNewJob({ ...newJob, status: e.target.value as JobApplication['status'] })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {COLUMNS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    placeholder="e.g. $160k - $190k"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  rows={3}
                  value={newJob.notes}
                  onChange={(e) => setNewJob({ ...newJob, notes: e.target.value })}
                  placeholder="Referral details, interview prep notes..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
