import type { Experience } from './types'

/** Newest first. */
export const experience: Experience[] = [
  {
    role: 'Full Stack Software Developer',
    company: 'Nano Kernel Ltd.',
    location: 'Bangalore, India',
    period: 'Jul 2026 — Present',
    summary: 'Architecting IPOYPO, a fintech IPO platform built to scale to 500K+ users.',
    highlights: [
      'Designed the end-to-end architecture and owned 8+ modules across a React PWA and a NestJS (Fastify) modular monolith, split into independently scalable API and worker services on AWS.',
      'Built a live NSE/BSE IPO data ingestion pipeline with pluggable adapters, hash-based change detection and a transactional outbox, cutting redundant writes by ~90%.',
      'Shipped a high-throughput alerts & notifications system with idempotent consumers and exactly-once inbox writes, benchmarked at 750K alert rules.',
      'Integrated a SEBI-registered broker’s E-IPO APIs for UPI-mandate (ASBA) applications with signature-verified webhooks and a PAN vault keeping PII out of logs.',
    ],
    stack: ['React PWA', 'NestJS', 'Fastify', 'PostgreSQL', 'Prisma', 'Redis', 'AWS', 'Claude Code', 'MCP'],
  },
  {
    role: 'Software Engineer (Intern → Full-time)',
    company: 'Cimpress',
    location: 'Remote, India',
    period: 'Feb 2023 — Apr 2026',
    summary: 'Customer-facing features for a global e-commerce platform serving ~100K users a month.',
    highlights: [
      'Built core e-commerce flows (product listing, product detail, checkout, homepage) with React, Redux and TypeScript, plus a library of reusable Tailwind components.',
      'Designed a scalable multi-product cart architecture handling dynamic pricing, product configurations, validations and conditional workflows.',
      'Contributed to an event-driven architecture on AWS (Lambda, SQS, EventBridge) supporting real-time updates and 99.9% availability.',
      'Improved search relevance with Algolia, led mobile UX improvements, contributed to a platform-wide rebrand and earned the “Your Imprint” recognition.',
    ],
    stack: ['React', 'Redux', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'AWS Lambda', 'SQS', 'EventBridge', 'Algolia'],
  },
]
