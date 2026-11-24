import type { SkillGroup } from './types'

/** Icons available: code, layout, server, database, cloud, ai, tools, cpu */
export const skillGroups: SkillGroup[] = [
  { title: 'Languages', icon: 'code', skills: ['TypeScript', 'JavaScript', 'Java', 'SQL'] },
  {
    title: 'Frontend',
    icon: 'layout',
    skills: ['React.js', 'Next.js', 'Redux', 'Tailwind CSS', 'Vite', 'HTML5', 'CSS3', 'PWA'],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: ['Node.js', 'NestJS', 'Express.js', 'Fastify', 'REST APIs', 'GraphQL', 'Microservices', 'Prisma'],
  },
  { title: 'Databases', icon: 'database', skills: ['PostgreSQL', 'Redis', 'MongoDB', 'DynamoDB'] },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    skills: ['AWS Lambda', 'SQS', 'EventBridge', 'GCP', 'Docker', 'GitHub Actions', 'CI/CD'],
  },
  {
    title: 'AI & LLMs',
    icon: 'ai',
    skills: ['Claude API', 'LLM Integration', 'Prompt Engineering', 'MCP'],
  },
  {
    title: 'Developer Tools',
    icon: 'tools',
    skills: ['Claude Code', 'GitHub Copilot', 'Cursor', 'Git', 'Postman', 'Vitest'],
  },
  {
    title: 'CS Fundamentals',
    icon: 'cpu',
    skills: ['DSA', 'OOP', 'System Design', 'Distributed Systems', 'Caching', 'Event-Driven Architecture'],
  },
]
