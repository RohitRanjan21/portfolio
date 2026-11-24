import type { Project } from './types.ts'

/**
 * Add a new project by copying any object below and editing it.
 * Order here is the order on the page.
 */
export const projects: Project[] = [
  {
    slug: 'ipoypo',
    org: 'Nano Kernel',
    title: 'IPOYPO',
    tagline: 'A fintech IPO platform engineered for 500K+ users',
    description:
      'End-to-end architecture for a platform that lets investors track, get alerted on and apply for Indian IPOs. A React PWA on top of a NestJS (Fastify) modular monolith, split into independently scalable API and worker services on AWS.',
    category: 'Fintech',
    year: '2026',
    role: 'Architect & full stack lead',
    featured: true,
    badge: 'Flagship',
    accent: '#c8ff3d',
    highlights: [
      'Owned 8+ modules across the PWA and backend',
      'Phone-OTP auth with JWT and rotating refresh tokens, Redis rate limiting and permission-based RBAC with audit logs',
      'Cache-aside with stampede protection and an idempotent rewards ledger',
      'CI on GitHub Actions with unit + integration suites, migration checks and Docker builds',
      'Figma MCP and Claude Code used for design-to-code acceleration',
    ],
    stack: ['React', 'PWA', 'NestJS', 'Fastify', 'PostgreSQL', 'Prisma', 'Redis', 'AWS', 'Docker'],
    metrics: [
      { value: '500K+', label: 'users target scale' },
      { value: '8+', label: 'modules owned' },
    ],
  },
  {
    slug: 'ipo-ingestion',
    org: 'Nano Kernel',
    title: 'Live IPO Data Pipeline',
    tagline: 'Real-time NSE/BSE market data, deduplicated and resilient',
    description:
      'A data ingestion pipeline for live IPO calendars, subscription figures and listing prices. Pluggable provider adapters feed a validated, change-detected stream into the platform.',
    category: 'Backend',
    year: '2026',
    accent: '#22d3ee',
    highlights: [
      'Pluggable provider adapters with Zod schema validation',
      'Hash-based change detection, retries and circuit breakers',
      'Transactional outbox for reliable downstream events',
    ],
    stack: ['Node.js', 'TypeScript', 'Zod', 'PostgreSQL', 'Redis'],
    metrics: [{ value: '~90%', label: 'fewer redundant writes' }],
  },
  {
    slug: 'alerts-engine',
    org: 'Nano Kernel',
    title: 'Alerts & Notifications Engine',
    tagline: 'High-throughput, exactly-once alerting at scale',
    description:
      'A notifications system delivering in-app and Web Push alerts (FCM/APNs-ready). Keyset-paged index scans keep rule evaluation fast, and idempotent consumers guarantee each user sees an alert exactly once.',
    category: 'Backend',
    year: '2026',
    accent: '#7c5cff',
    highlights: [
      'Keyset pagination over indexed scans for rule evaluation',
      'Idempotent event consumers with exactly-once inbox writes',
      'Multi-channel delivery: in-app, Web Push, FCM/APNs-ready',
    ],
    stack: ['NestJS', 'PostgreSQL', 'Redis', 'Web Push', 'Event-driven'],
    metrics: [{ value: '750K', label: 'alert rules benchmarked' }],
  },
  {
    slug: 'broker-eipo',
    org: 'Nano Kernel',
    title: 'Broker E-IPO Integration',
    tagline: 'In-app IPO applications via UPI mandate (ASBA)',
    description:
      'Integration with a SEBI-registered broker’s E-IPO APIs so users can place, modify and cancel IPO applications across multiple accounts securely, with every order reconciled.',
    category: 'Fintech',
    year: '2026',
    accent: '#f59e0b',
    highlights: [
      'Place, modify and cancel across multiple demat accounts',
      'Signature-verified webhooks and scheduled order reconciliation',
      'PAN vault keeping PII out of logs, URLs and caches',
    ],
    stack: ['NestJS', 'Webhooks', 'Cron', 'Encryption', 'PostgreSQL'],
  },
  {
    slug: 'multi-product-cart',
    org: 'Cimpress',
    title: 'Multi-Product Cart',
    tagline: 'Cart architecture for a global e-commerce platform',
    description:
      'A scalable cart handling complex state, dynamic pricing, product configurations, validations and conditional workflows across product and checkout flows for customers in 25+ countries.',
    category: 'E-commerce',
    year: '2023-26',
    accent: '#f472b6',
    highlights: [
      'Normalized cart state with Redux for configurable products',
      'Dynamic, region-aware pricing and validations',
      'Reusable, responsive Tailwind component library',
    ],
    stack: ['React', 'Redux', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
    metrics: [
      { value: '100K', label: 'users / month' },
      { value: '25+', label: 'countries' },
    ],
  },
  {
    slug: 'event-driven-aws',
    org: 'Cimpress',
    title: 'Event-Driven Workflows',
    tagline: 'Loosely coupled serverless backends on AWS',
    description:
      'Contributed to an event-driven architecture built on Lambda, SQS and EventBridge, powering real-time updates across the e-commerce platform.',
    category: 'E-commerce',
    year: '2023-26',
    accent: '#34d399',
    highlights: [
      'Loosely coupled workflows on Lambda, SQS and EventBridge',
      'Real-time updates with 99.9% production availability',
      'Observability with Sentry, GA and Hotjar',
    ],
    stack: ['AWS Lambda', 'SQS', 'EventBridge', 'Node.js', 'Sentry'],
    metrics: [{ value: '99.9%', label: 'availability' }],
  },
]
