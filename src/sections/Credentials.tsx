import { motion } from 'motion/react'
import { ArrowUpRight, Award, BadgeCheck, GraduationCap, Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import { SectionHeading } from '../components/Reveal'
import { awards, certifications, education } from '../data/credentials'

const ease = [0.16, 1, 0.3, 1] as const

function Card({ children, i, href }: { children: ReactNode; i: number; href?: string }) {
  const cls =
    'group relative block h-full overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 transition-colors duration-500 hover:border-white/15 md:p-7'
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: i * 0.08, ease }}
      className="h-full"
    >
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {children}
        </a>
      ) : (
        <div className={cls}>{children}</div>
      )}
    </motion.div>
  )
}

function Column({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-2.5 font-mono text-xs tracking-[0.15em] text-mute uppercase">
        <span className="text-accent">{icon}</span>
        {title}
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  )
}

export function Credentials() {
  return (
    <section id="credentials" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-32">
      <SectionHeading index="05" label="Credentials" title="Always" accent="learning." />

      <div className="grid gap-12 lg:grid-cols-3 lg:gap-6">
        <Column icon={<BadgeCheck size={14} />} title="Certifications">
          {certifications.length === 0 ? (
            <Card i={0}>
              <div className="flex h-full min-h-44 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line text-center">
                <motion.span
                  className="grid size-11 place-items-center rounded-full border border-line text-mute"
                  animate={{ rotate: 90 }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                >
                  <Plus size={16} />
                </motion.span>
                <p className="text-sm text-mute">
                  Next certification <span className="font-serif text-base text-fg italic">in progress…</span>
                </p>
              </div>
            </Card>
          ) : (
            certifications.map((c, i) => (
              <Card key={c.name} i={i} href={c.url}>
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">{c.date}</p>
                  {c.url && <ArrowUpRight size={16} className="text-mute transition-transform group-hover:rotate-45 group-hover:text-accent" />}
                </div>
                <h3 className="mt-4 text-xl font-medium tracking-tight">{c.name}</h3>
                <p className="mt-1 text-sm text-mute">{c.issuer}</p>
                {c.credentialId && <p className="mt-3 font-mono text-[11px] text-dim">ID {c.credentialId}</p>}
                {c.skills && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {c.skills.map((s) => (
                      <span key={s} className="rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[10.5px] text-mute">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))
          )}
        </Column>

        <Column icon={<GraduationCap size={14} />} title="Education">
          {education.map((e, i) => (
            <Card key={e.school} i={i + 1}>
              <p className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">{e.period}</p>
              <h3 className="mt-4 text-xl font-medium tracking-tight">{e.school}</h3>
              <p className="mt-1 text-sm text-mute">{e.degree}</p>
              {e.detail && <p className="mt-6 font-serif text-3xl italic text-gradient">{e.detail}</p>}
              <p className="mt-2 font-mono text-[11px] text-dim">{e.location}</p>
            </Card>
          ))}
        </Column>

        <Column icon={<Award size={14} />} title="Recognition">
          {awards.map((a, i) => (
            <Card key={a.title} i={i + 2}>
              <p className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">{[a.org, a.year].filter(Boolean).join(' · ')}</p>
              <h3 className="mt-4 text-xl font-medium tracking-tight">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{a.description}</p>
              <motion.span
                className="absolute -right-4 -bottom-6 font-serif text-[9rem] leading-none text-white/[0.03] italic"
                whileHover={{ rotate: -8 }}
              >
                ★
              </motion.span>
            </Card>
          ))}
        </Column>
      </div>
    </section>
  )
}
