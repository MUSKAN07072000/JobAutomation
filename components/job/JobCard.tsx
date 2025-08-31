
import React from 'react';
import { Job } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MapPinIcon, ClockIcon, BriefcaseIcon } from '../icons/Icons';

interface JobCardProps {
  job: Job;
  onSelectJob: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onSelectJob }) => {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.title}</h3>
            {job.applied && <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-300">Applied</span>}
        </div>
        <p className="text-md font-semibold text-blue-600 dark:text-blue-400">{job.company}</p>
        
        <div className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-2"/>
                <span>{job.location}</span>
            </div>
            <div className="flex items-center">
                <BriefcaseIcon className="w-4 h-4 mr-2"/>
                <span>{job.type}</span>
            </div>
             {job.salary && (
                <div className="flex items-center">
                    <span className="font-bold mr-2">$</span>
                    <span>{job.salary}</span>
                </div>
            )}
        </div>
        
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
            {job.description}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center"><ClockIcon className="w-4 h-4 mr-1"/>{job.postedDate}</p>
        <Button onClick={() => onSelectJob(job)} size="sm">View & Tailor</Button>
      </div>
    </Card>
  );
};
