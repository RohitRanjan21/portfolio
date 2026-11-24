import type { Award, Certification, Education } from './types'

/**
 * Add certifications here as you earn them. Example:
 *
 * {
 *   name: 'AWS Certified Developer – Associate',
 *   issuer: 'Amazon Web Services',
 *   date: 'Jan 2027',
 *   url: 'https://www.credly.com/badges/…',
 *   credentialId: 'ABC-123',
 *   skills: ['Lambda', 'DynamoDB', 'SQS'],
 * },
 */
export const certifications: Certification[] = []

export const education: Education[] = [
  {
    school: 'Bangalore Institute of Technology',
    degree: 'B.E. in Computer Science',
    period: '2019 — 2023',
    location: 'Bangalore, India',
    detail: 'CGPA 9.0 / 10',
  },
]

export const awards: Award[] = [
  {
    title: '“Your Imprint” Recognition',
    org: 'Cimpress',
    year: '',
    description: 'Team member recognition for impact on customer-facing e-commerce experiences.',
  },
]
