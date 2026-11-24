import type { Plugin } from 'vite'
import { awards, certifications, education } from '../src/data/credentials.ts'
import { experience } from '../src/data/experience.ts'
import { profile } from '../src/data/profile.ts'
import { projects } from '../src/data/projects.ts'
import { skillGroups } from '../src/data/skills.ts'

export const SITE_URL = 'https://rohit-ranjan.in'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** schema.org data so search engines know who this site is about. */
function structuredData() {
  const person = `${SITE_URL}/#person`
  const current = experience[0]
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': person,
        name: profile.name,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}${profile.photo}`,
        jobTitle: profile.role,
        description: profile.tagline,
        ...(current && { worksFor: { '@type': 'Organization', name: current.company } }),
        alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
        address: {
          '@type': 'PostalAddress',
          addressLocality: profile.location.split(',')[0].trim(),
          addressCountry: 'IN',
        },
        sameAs: Object.values(profile.socials).filter(Boolean),
        knowsAbout: skillGroups.flatMap((g) => g.skills),
        ...(certifications.length && {
          hasCredential: certifications.map((c) => ({
            '@type': 'EducationalOccupationalCredential',
            name: c.name,
            recognizedBy: { '@type': 'Organization', name: c.issuer },
            ...(c.url && { url: c.url }),
          })),
        }),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: profile.name,
        publisher: { '@id': person },
      },
      {
        '@type': 'ProfilePage',
        url: `${SITE_URL}/`,
        name: `${profile.name} - ${profile.role}`,
        mainEntity: { '@id': person },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
    ],
  }
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
}

/**
 * Plain HTML version of the page, placed inside #root. Crawlers read it on
 * first load; React replaces it as soon as the app starts.
 */
function staticContent() {
  const list = (items: string[]) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
  const socials = Object.entries(profile.socials)
    .filter(([, url]) => url)
    .map(([name, url]) => `<a href="${esc(url!)}">${esc(name[0].toUpperCase() + name.slice(1))}</a>`)

  return `<div class="seo-fallback">
<header>
<h1>${esc(profile.name)}</h1>
<p>${esc(profile.role)} based in ${esc(profile.location)}</p>
</header>
<section><h2>About</h2><p>${esc(profile.about)}</p></section>
<section><h2>Experience</h2>${experience
    .map(
      (job) =>
        `<article><h3>${esc(job.role)} at ${esc(job.company)}</h3><p>${esc(job.period)}, ${esc(job.location)}</p>${list(job.highlights)}</article>`,
    )
    .join('')}</section>
<section><h2>Projects</h2>${projects
    .map(
      (p) =>
        `<article><h3>${esc(p.title)}</h3><p>${esc(p.tagline)}. ${esc(p.description)}</p><p>Built with ${esc(p.stack.join(', '))}</p></article>`,
    )
    .join('')}</section>
<section><h2>Skills</h2>${skillGroups.map((g) => `<p><strong>${esc(g.title)}:</strong> ${esc(g.skills.join(', '))}</p>`).join('')}</section>
<section><h2>Education and recognition</h2>${list([
    ...education.map((e) => `${e.degree}, ${e.school} (${e.period})${e.detail ? `, ${e.detail}` : ''}`),
    ...awards.map((a) => `${a.title}, ${a.org}`),
    ...certifications.map((c) => `${c.name}, ${c.issuer} (${c.date})`),
  ])}</section>
<section><h2>Contact</h2><p><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a> ${socials.join(' ')}</p></section>
</div>`
}

export function seo(): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      return html
        .replace('<!--structured-data-->', structuredData())
        .replace('<!--static-content-->', staticContent())
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </url>
</urlset>
`,
      })
    },
  }
}
