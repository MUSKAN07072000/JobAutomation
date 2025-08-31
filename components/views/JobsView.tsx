
import React from 'react';
import { Job } from '../../types';
import { JobCard } from '../job/JobCard';

interface JobsViewProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
}

export const JobsView: React.FC<JobsViewProps> = ({ jobs, onSelectJob }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Available Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} onSelectJob={onSelectJob} />
        ))}
      </div>
    </div>
  );
};
