
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/views/DashboardView';
import { JobsView } from './components/views/JobsView';
import { TrackerView } from './components/views/TrackerView';
import { SettingsView } from './components/views/SettingsView';
import { Job, Application, UserSettings, View } from './types';
import { MOCK_JOBS, MOCK_APPLICATIONS } from './constants';
import { JobDetailsModal } from './components/job/JobDetailsModal';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Dashboard);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [settings, setSettings] = useState<UserSettings>({
    baseResume: `John Doe\n123 Main St, Anytown, USA\n(555) 123-4567 | john.doe@email.com\n\nObjective\nA highly motivated software engineer with 5+ years of experience in developing scalable web applications seeking to leverage my skills in React and Node.js to contribute to a forward-thinking tech company.\n\nExperience\nSenior Frontend Developer | Tech Solutions Inc. | 2018 - Present\n- Led the development of a major e-commerce platform using React and TypeScript.\n- Mentored junior developers and improved code quality by 20%.\n\nSkills\n- JavaScript, TypeScript, React, Node.js, Python, SQL`,
    baseCoverLetter: `Dear Hiring Manager,\n\nI am writing to express my keen interest in the Software Engineer position I saw advertised. With my extensive experience in building modern web applications and a passion for creating intuitive user experiences, I am confident that I possess the skills and qualifications you are looking for.\n\nMy background in [mention a key skill] aligns perfectly with the requirements outlined in the job description. I am particularly excited about the opportunity to contribute to [mention something about the company].\n\nThank you for your time and consideration. I look forward to the possibility of discussing my application with you further.\n\nSincerely,\nJohn Doe`,
  });

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleSelectJob = useCallback((job: Job) => {
    setSelectedJob(job);
  }, []);
  
  const handleCloseModal = useCallback(() => {
    setSelectedJob(null);
  }, []);

  const handleApply = useCallback((job: Job, tailoredResume: string, tailoredCoverLetter: string) => {
    const newApplication: Application = {
      id: `app-${applications.length + 1}`,
      jobTitle: job.title,
      company: job.company,
      dateApplied: new Date().toISOString().split('T')[0],
      status: 'Applied',
      resumeVersion: `v${Math.random().toString(16).slice(2, 6)}`,
      coverLetterVersion: `v${Math.random().toString(16).slice(2, 6)}`,
    };
    setApplications(prev => [newApplication, ...prev]);
    setJobs(prev => prev.map(j => j.id === job.id ? { ...j, applied: true } : j));
    handleCloseModal();
  }, [applications.length, handleCloseModal]);

  const renderView = () => {
    switch (activeView) {
      case View.Dashboard:
        return <DashboardView applications={applications} jobs={jobs} />;
      case View.Jobs:
        return <JobsView jobs={jobs} onSelectJob={handleSelectJob} />;
      case View.Tracker:
        return <TrackerView applications={applications} />;
      case View.Settings:
        return <SettingsView settings={settings} setSettings={setSettings} />;
      default:
        return <DashboardView applications={applications} jobs={jobs} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-6">
          {renderView()}
        </main>
      </div>
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          userSettings={settings}
          onClose={handleCloseModal}
          onApply={handleApply}
        />
      )}
    </div>
  );
};

export default App;
