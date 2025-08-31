
import React from 'react';
import { Application } from '../../types';
import { Card } from '../ui/Card';

interface TrackerViewProps {
  applications: Application[];
}

const statusColorMap: { [key in Application['status']]: string } = {
  Applied: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  Interviewing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Offer: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export const TrackerView: React.FC<TrackerViewProps> = ({ applications }) => {
  return (
    <Card>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Application Tracker</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Job Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date Applied</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Versions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{app.jobTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{app.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{app.dateApplied}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColorMap[app.status]}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {app.resumeVersion} / {app.coverLetterVersion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
