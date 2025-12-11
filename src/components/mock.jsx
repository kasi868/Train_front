// src/data/mock.js
export const COURSES = [
  {
    id: 'c1',
    title: 'Full Stack Web Development (Online)',
    mode: 'Online',
    duration: '6 months',
    price: '₹25,000',
    summary: 'Build modern web apps using React, Node, Express and Postgres.',
    videos: 120,
    internships: 12,
  },
  {
    id: 'c2',
    title: 'UI/UX Design (Offline)',
    mode: 'Offline',
    duration: '3 months',
    price: '₹15,000',
    summary: 'Hands-on design bootcamp with real client projects.',
    videos: 40,
    internships: 5,
  },
];

export const JOBS = [
  {
    id: 'j1',
    title: 'Junior React Developer',
    company: 'MaxZen Tech',
    location: 'Hyderabad',
    type: 'job', // job or internship
    rounds: ['Aptitude', 'Coding', 'HR'],
    salary: '₹2.8 LPA',
    postedOn: '2025-11-20',
  },
  {
    id: 'j2',
    title: 'Front-end Intern',
    company: 'ClearPixel',
    location: 'Remote',
    type: 'internship',
    rounds: ['Coding', 'Project Review'],
    stipend: '₹12,000 / month',
    duration: '3 months',
    postedOn: '2025-11-18',
  },
  {
    id: 'j3',
    title: 'Data Analyst Intern',
    company: 'SparkML',
    location: 'Bengaluru',
    type: 'internship',
    rounds: ['Aptitude', 'Case Study', 'HR'],
    stipend: '₹15,000 / month',
    duration: '6 months',
    postedOn: '2025-11-21',
  },
  {
  id: 'j4',
  title: 'React Developer',
  company: 'MaxZen Tech',
  location: 'Hyderabad',
  type: 'job',
  rounds: ['Coding','HR'],
  salary: '₹4 LPA',
  summary: 'React developer building SPA using React, Redux, Node.',
  skills: ['react','redux','node'],
  postedOn: '2025-11-22'
},


  
];
