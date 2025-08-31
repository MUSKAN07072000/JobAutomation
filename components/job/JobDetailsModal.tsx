
import React, { useState, useCallback } from 'react';
import { Job, UserSettings } from '../../types';
import { generateTailoredDocuments } from '../../services/geminiService';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { XMarkIcon, BotIcon } from '../icons/Icons';

interface JobDetailsModalProps {
  job: Job;
  userSettings: UserSettings;
  onClose: () => void;
  onApply: (job: Job, tailoredResume: string, tailoredCoverLetter: string) => void;
}

enum GenerationState {
  Idle,
  Loading,
  Success,
  Error
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, userSettings, onClose, onApply }) => {
  const [generationState, setGenerationState] = useState<GenerationState>(GenerationState.Idle);
  const [tailoredResume, setTailoredResume] = useState<string>('');
  const [tailoredCoverLetter, setTailoredCoverLetter] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'resume' | 'coverLetter'>('resume');

  const handleGenerate = useCallback(async () => {
    setGenerationState(GenerationState.Loading);
    setError('');
    try {
      const { tailoredResume, tailoredCoverLetter } = await generateTailoredDocuments(job.description, userSettings);
      setTailoredResume(tailoredResume);
      setTailoredCoverLetter(tailoredCoverLetter);
      setGenerationState(GenerationState.Success);
    } catch (err: any) {
      setGenerationState(GenerationState.Error);
      setError(err.message || 'An unknown error occurred.');
    }
  }, [job.description, userSettings]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h2>
            <p className="text-md text-blue-600 dark:text-blue-400">{job.company}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel: Job Description */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h3 className="text-lg font-semibold">Job Description</h3>
            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{job.description}</p>
          </div>

          {/* Right Panel: AI Generation */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <BotIcon className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold">AI Tailoring</h3>
            </div>
            
            {generationState === GenerationState.Idle && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed rounded-lg dark:border-gray-600">
                <p className="text-gray-500 dark:text-gray-400 mb-4">Generate a custom resume and cover letter for this job using your base documents.</p>
                <Button onClick={handleGenerate} disabled={job.applied}>
                  {job.applied ? 'Already Applied' : 'Generate with AI'}
                </Button>
              </div>
            )}
            
            {generationState === GenerationState.Loading && (
              <div className="flex-1 flex items-center justify-center">
                <Spinner />
                <span className="ml-2">AI is working...</span>
              </div>
            )}
            
            {generationState === GenerationState.Error && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed rounded-lg border-red-500 dark:border-red-400">
                 <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                 <Button onClick={handleGenerate}>Try Again</Button>
              </div>
            )}
            
            {generationState === GenerationState.Success && (
              <div className="flex-1 flex flex-col border rounded-lg dark:border-gray-600 overflow-hidden">
                <div className="flex border-b dark:border-gray-600">
                  <button onClick={() => setActiveTab('resume')} className={`flex-1 p-3 text-sm font-medium ${activeTab === 'resume' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                    Tailored Resume
                  </button>
                  <button onClick={() => setActiveTab('coverLetter')} className={`flex-1 p-3 text-sm font-medium ${activeTab === 'coverLetter' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                    Tailored Cover Letter
                  </button>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 flex-1 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 dark:text-gray-200">
                    {activeTab === 'resume' ? tailoredResume : tailoredCoverLetter}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t dark:border-gray-700 flex justify-end space-x-4">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onApply(job, tailoredResume, tailoredCoverLetter)} disabled={generationState !== GenerationState.Success || job.applied}>
            {job.applied ? 'Applied' : 'Mark as Applied'}
          </Button>
        </div>
      </div>
    </div>
  );
};
