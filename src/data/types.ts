export interface LinkItem {
  label: string
  href: string
}

export interface Profile {
  name: string
  firstName: string
  lastName: string
  role: string
  /** Words that cycle in the hero headline. */
  rotatingWords: string[]
  tagline: string
  /** Long-form intro shown in the About section (revealed word by word on scroll). */
  about: string
  location: string
  timezone: string
  email: string
  available: boolean
  availabilityText: string
  /** Path inside /public, e.g. "/resume.pdf". Leave empty to hide the résumé button. */
  resume: string
  photo: string
  socials: { github?: string; linkedin?: string; leetcode?: string; x?: string }
  stats: { value: number; suffix?: string; decimals?: number; label: string }[]
}

export interface Experience {
  role: string
  company: string
  companyUrl?: string
  location: string
  period: string
  summary?: string
  highlights: string[]
  stack: string[]
}

export interface Project {
  slug: string
  title: string
  tagline: string
  description: string
  /** Used for the filter chips. Any string works — new categories appear automatically. */
  category: string
  year: string
  role?: string
  highlights: string[]
  stack: string[]
  metrics?: { value: string; label: string }[]
  links?: LinkItem[]
  /** Optional cover image path inside /public. Without one, a generative cover is drawn. */
  image?: string
  /** Hex colour that tints the generative cover and glow. */
  accent?: string
  /** Featured projects take a wider card. */
  featured?: boolean
  /** Where it was built, e.g. "Nano Kernel" or "Personal". */
  org?: string
  /** Small badge on the card, e.g. "Award" or "Coming soon". */
  badge?: string
}

export type SkillIcon = 'code' | 'layout' | 'server' | 'database' | 'cloud' | 'ai' | 'tools' | 'cpu'

export interface SkillGroup {
  title: string
  icon: SkillIcon
  skills: string[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
  url?: string
  credentialId?: string
  skills?: string[]
}

export interface Education {
  school: string
  degree: string
  period: string
  location: string
  detail?: string
}

export interface Award {
  title: string
  org: string
  year: string
  description: string
}
