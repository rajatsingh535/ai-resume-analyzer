'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function ResumeUpload() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [showPaste, setShowPaste] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.includes('text') && !file.name.endsWith('.txt') && !file.name.endsWith('.pdf')) {
      setError('Please upload a .txt or .pdf file');
      return;
    }
    setFileName(file.name);
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      setResumeText(e.target?.result as string || '');
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    const textToAnalyze = resumeText.trim();
    if (!textToAnalyze) {
      setError('Please upload a file or paste your resume text first.');
      return;
    }
    setIsAnalyzing(true);
    setError('');
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToAnalyze }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      sessionStorage.setItem('resumeAnalysis', JSON.stringify(data));
      router.push('/analyze');
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {!showPaste ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer
            ${isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 scale-[1.02]'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <input
            id="fileInput"
            type="file"
            accept=".txt,.pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="text-5xl">{fileName ? '📄' : '☁️'}</div>
            {fileName ? (
              <>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{fileName}</p>
                <p className="text-sm text-green-600">File loaded! Click Analyze to continue.</p>
              </>
            ) : (
              <>
                <p className="font-semibold text-gray-700 dark:text-gray-200 text-lg">
                  Drag & drop your resume here
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">or click to browse</p>
                <p className="text-xs text-gray-400">.txt or .pdf files supported</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <textarea
          className="w-full h-48 rounded-2xl border-2 border-gray-300 dark:border-gray-600 p-4 text-sm
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                     focus:outline-none focus:border-blue-500 resize-none transition-colors"
          placeholder="Paste your resume text here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={() => { setShowPaste(!showPaste); setError(''); }}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 underline"
        >
          {showPaste ? '← Upload a file instead' : 'Or paste resume text →'}
        </button>
        {fileName && (
          <button
            onClick={() => { setFileName(''); setResumeText(''); }}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing || (!resumeText && !fileName)}
        className="w-full py-4 px-8 rounded-2xl font-bold text-lg text-white
                   bg-gradient-to-r from-blue-600 to-indigo-600
                   hover:from-blue-700 hover:to-indigo-700
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5
                   flex items-center justify-center gap-2"
      >
        {isAnalyzing ? (
          <>
            <span className="animate-spin">⚙️</span>
            Analyzing...
          </>
        ) : (
          <>
            🔍 Analyze Resume
          </>
        )}
      </button>
    </div>
  );
}
