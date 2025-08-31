
import { Job, Application } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer',
    company: 'Innovate Inc.',
    location: 'San Francisco, CA (Remote)',
    type: 'Full-time',
    salary: '$150,000 - $180,000',
    description: 'Innovate Inc. is seeking a Senior Frontend Engineer to build our next-generation user interfaces using React and TypeScript. The ideal candidate will have 5+ years of experience and a passion for creating beautiful, performant applications. Responsibilities include leading feature development, mentoring junior engineers, and collaborating with product and design teams. Strong knowledge of modern JavaScript, CSS, and web performance is required.',
    postedDate: '3 days ago',
    applied: false,
  },
  {
    id: 'job-2',
    title: 'Node.js Backend Developer',
    company: 'DataStream',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'DataStream is looking for a backend developer proficient in Node.js to design and implement scalable APIs. You will work with microservices, databases like PostgreSQL, and deploy on AWS. Experience with Docker and Kubernetes is a plus. The role involves building robust server-side logic and ensuring high performance and responsiveness to requests from the front-end.',
    postedDate: '1 week ago',
    applied: true,
  },
  {
    id: 'job-3',
    title: 'Full Stack Engineer',
    company: 'Connectly',
    location: 'Austin, TX (Hybrid)',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    description: 'Join Connectly as a Full Stack Engineer and work on both our client-facing React application and our Python/Django backend. This is a great opportunity to own features from end-to-end. We value collaboration and clean code. Key responsibilities are developing new features, writing tests, and participating in code reviews.',
    postedDate: '5 days ago',
    applied: false,
  },
  {
    id: 'job-4',
    title: 'UI/UX Designer',
    company: 'Creative Solutions',
    location: 'Remote',
    type: 'Contract',
    description: 'Creative Solutions needs a talented UI/UX designer for a 3-month contract to redesign our mobile application. You will be responsible for user research, wireframing, prototyping, and creating high-fidelity mockups in Figma. A strong portfolio is required.',
    postedDate: '2 weeks ago',
    applied: false,
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    jobTitle: 'Node.js Backend Developer',
    company: 'DataStream',
    dateApplied: '2023-10-20',
    status: 'Interviewing',
    resumeVersion: 'v3.1_node',
    coverLetterVersion: 'v3.1_node_cl',
  },
  {
    id: 'app-2',
    jobTitle: 'Software Engineer',
    company: 'Google',
    dateApplied: '2023-10-18',
    status: 'Applied',
    resumeVersion: 'v3.0_general',
    coverLetterVersion: 'v3.0_general_cl',
  },
  {
    id: 'app-3',
    jobTitle: 'Frontend Developer',
    company: 'Meta',
    dateApplied: '2023-10-15',
    status: 'Rejected',
    resumeVersion: 'v2.9_react',
    coverLetterVersion: 'v2.9_react_cl',
  },
];
