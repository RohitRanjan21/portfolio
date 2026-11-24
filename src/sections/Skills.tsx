import { motion } from 'motion/react'
import { Cloud, Code, Cpu, Database, LayoutTemplate, Server, Sparkles, Wrench, type LucideIcon } from 'lucide-react'
import { SectionHeading } from '../components/Reveal'
import { skillGroups } from '../data/skills'
import type { SkillIcon } from '../data/types'

const icons: Record<SkillIcon, LucideIcon> = {
  code: Code,
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  cloud: Cloud,
  ai: Sparkles,
  tools: Wrench,
  cpu: Cpu,
}

function Marquee({ items, reverse, duration }: { items: string[]; reverse?: boolean; duration: number }) {
  const row = [...items, ...items]
  return (
    <div className="marquee mask-fade-x flex overflow-hidden py-3">
      <div
        className={`marquee-track flex shrink-0 gap-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {row.map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-4 text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-[-0.04em] whitespace-nowrap text-fg/90 transition-colors hover:text-accent"
          >
            {i % 3 === 1 ? <span className="font-serif font-normal italic">{s}</span> : s}
            <span className="text-[0.4em] text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  const all = skillGroups.flatMap((g) => g.skills)
  const half = Math.ceil(all.length / 2)

  return (
    <section id="skills" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="04" label="Toolkit" title="The stack I" accent="think in." />
      </div>

      <div className="-rotate-[1.5deg] border-y border-line bg-ink-2/50 py-4">
        <Marquee items={all.slice(0, half)} duration={55} />
        <Marquee items={all.slice(half)} duration={60} reverse />
      </div>

      <div className="mx-auto mt-24 grid max-w-7xl gap-4 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.icon]
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 transition-colors duration-500 hover:border-white/15"
            >
              <div className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/15" />
              <div className="mb-8 flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-2xl border border-line text-accent transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <span className="font-mono text-xs text-dim">{String(group.skills.length).padStart(2, '0')}</span>
              </div>
              <h3 className="mb-4 text-lg font-medium tracking-tight">{group.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line px-2.5 py-1 text-[12.5px] text-mute transition-colors duration-300 hover:border-accent/50 hover:text-fg"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
