import type { Profile } from './types.ts'

export const profile: Profile = {
  name: 'Rohit Ranjan',
  firstName: 'Rohit',
  lastName: 'Ranjan',
  role: 'Full Stack Software Engineer',
  rotatingWords: ['scalable systems', 'delightful interfaces', 'event-driven backends', 'AI-powered products'],
  tagline:
    'I design and ship production-grade products end to end, from pixel-perfect React interfaces to resilient, event-driven backends on AWS.',
  about:
    'I’m a full stack engineer with 3.5+ years of experience building products people rely on, from a global e-commerce platform serving customers in 25+ countries to a fintech IPO platform built to scale to half a million users. I care about the whole stack: clean architecture, fast and accessible interfaces, and systems that stay calm under load. These days I build with React, TypeScript, NestJS, PostgreSQL, Redis and AWS, and I use AI-assisted development with Claude Code and MCP every day to ship faster without cutting corners.',
  location: 'Bangalore, India',
  timezone: 'Asia/Kolkata',
  email: 'rohitranjan68524@gmail.com',
  available: true,
  availabilityText: 'Open to new opportunities',
  resume: '',
  photo: '/profile.jpg',
  socials: {
    github: 'https://github.com/RohitRanjan21',
    linkedin: 'https://www.linkedin.com/in/rohit-ranjan-69560a1a9',
    // leetcode: 'https://leetcode.com/u/your-handle',
  },
  stats: [
    { value: 3.5, decimals: 1, suffix: '+', label: 'Years shipping production code' },
    { value: 100, suffix: 'K', label: 'Monthly users served at Cimpress' },
    { value: 25, suffix: '+', label: 'Countries reached by my features' },
    { value: 750, suffix: 'K', label: 'Alert rules benchmarked' },
  ],
}
