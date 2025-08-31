
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { Application, Job } from '../../types';
import { Card } from '../ui/Card';
import { BriefcaseIcon, CheckCircleIcon, ClockIcon } from '../icons/Icons';

interface DashboardViewProps {
  applications: Application[];
  jobs: Job[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const DashboardView: React.FC<DashboardViewProps> = ({ applications, jobs }) => {
  const applicationStatusData = useMemo(() => {
    const statusCounts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  }, [applications]);
  
  const recentApplications = useMemo(() => {
    return [...applications].sort((a,b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()).slice(0, 5);
  }, [applications]);

  const totalApplications = applications.length;
  const jobsToApply = jobs.filter(job => !job.applied).length;
  const interviewingCount = applications.filter(app => app.status === 'Interviewing').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="col-span-1 md:col-span-2 lg:col-span-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Dashboard Overview</h2>
      </Card>

      <Card>
        <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-800">
                <BriefcaseIcon className="w-6 h-6 text-blue-500 dark:text-blue-300"/>
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Applications</p>
                <p className="text-2xl font-semibold text-gray-800 dark:text-white">{totalApplications}</p>
            </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-800">
                <CheckCircleIcon className="w-6 h-6 text-green-500 dark:text-green-300"/>
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Interviewing</p>
                <p className="text-2xl font-semibold text-gray-800 dark:text-white">{interviewingCount}</p>
            </div>
        </div>
      </Card>
       <Card>
        <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-800">
                <ClockIcon className="w-6 h-6 text-yellow-500 dark:text-yellow-300"/>
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Jobs to Apply</p>
                <p className="text-2xl font-semibold text-gray-800 dark:text-white">{jobsToApply}</p>
            </div>
        </div>
      </Card>
      
       <Card>
        <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-800">
                <BriefcaseIcon className="w-6 h-6 text-red-500 dark:text-red-300"/>
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Jobs Found</p>
                <p className="text-2xl font-semibold text-gray-800 dark:text-white">{jobs.length}</p>
            </div>
        </div>
      </Card>

      <Card className="md:col-span-2">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Application Status</h3>
        <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={applicationStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {applicationStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="md:col-span-2">
         <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Recent Applications</h3>
         <ul className="space-y-4">
           {recentApplications.map(app => (
             <li key={app.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
               <div>
                 <p className="font-semibold">{app.jobTitle}</p>
                 <p className="text-sm text-gray-500 dark:text-gray-400">{app.company}</p>
               </div>
               <span className="text-sm text-gray-500 dark:text-gray-400">{app.dateApplied}</span>
             </li>
           ))}
         </ul>
      </Card>
    </div>
  );
};
