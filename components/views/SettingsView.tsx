
import React from 'react';
import { UserSettings } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface SettingsViewProps {
  settings: UserSettings;
  setSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, setSettings }) => {
  
  const handleResumeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSettings(prev => ({ ...prev, baseResume: e.target.value }));
  };

  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSettings(prev => ({ ...prev, baseCoverLetter: e.target.value }));
  };
  
  const handleSave = () => {
    // In a real app, this would save to a backend/localStorage
    alert('Settings saved!');
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Settings</h2>
      
      <Card>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Base Resume</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          This is your master resume. The AI will tailor this document for each job application.
        </p>
        <textarea
          value={settings.baseResume}
          onChange={handleResumeChange}
          rows={15}
          className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Paste your base resume here..."
        />
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Base Cover Letter</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          This is your template cover letter. The AI will customize it for each application.
        </p>
        <textarea
          value={settings.baseCoverLetter}
          onChange={handleCoverLetterChange}
          rows={10}
          className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Paste your base cover letter here..."
        />
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
};
