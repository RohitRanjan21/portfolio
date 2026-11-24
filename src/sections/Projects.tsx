import { AnimatePresence, LayoutGroup, motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Reveal, SectionHeading } from '../components/Reveal'
import { projects } from '../data/projects'
import type { Project } from '../data/types'
import { lockScroll } from '../lib/scroll'

const ease = [0.16, 1, 0.3, 1] as const

/** A cover drawn from the project's accent colour when there is no image. */
function Cover({ project, large }: { project: Project; large?: boolean }) {
  const accent = project.accent ?? '#c8ff3d'
  if (project.image) {
    return <img src={project.image} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
  }
  return (
    <div className="relative size-full overflow-hidden bg-ink-3">
      <div
        className="absolute inset-0 opacity-60"
        style={{ background: `radial-gradient(120% 90% at 85% 10%, ${accent}40, transparent 55%), radial-gradient(80% 60% at 0% 100%, ${accent}1f, transparent 60%)` }}
      />
      <div
        className="absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        style={{ backgroundImage: `radial-gradient(${accent}55 1px, transparent 1px)`, backgroundSize: '18px 18px' }}
      />
      {/* Orbits */}
      <div className="absolute top-1/2 right-[8%] -translate-y-1/2 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-12">
        {[1, 0.72, 0.46].map((s, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ width: `${(large ? 22 : 16) * s}rem`, height: `${(large ? 22 : 16) * s}rem`, borderColor: `${accent}${['26', '33', '55'][i]}` }}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: accent, boxShadow: `0 0 40px 10px ${accent}66` }} />
      </div>
      <span
        className="absolute bottom-[-0.18em] left-5 font-serif leading-none italic transition-transform duration-700 group-hover:-translate-y-2"
        style={{ fontSize: large ? '13rem' : '9rem', color: `${accent}22`, WebkitTextStroke: `1px ${accent}55` }}
      >
        {project.title[0]}
      </span>
      {project.metrics?.[0] && (
        <div className="absolute top-5 right-5 rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-right backdrop-blur-md">
          <p className="text-2xl font-medium tracking-tight" style={{ color: accent }}>
            {project.metrics[0].value}
          </p>
          <p className="font-mono text-[10px] tracking-wider text-mute uppercase">{project.metrics[0].label}</p>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sry = useSpring(ry, { stiffness: 200, damping: 20 })
  const px = useMotionValue(-200)
  const py = useMotionValue(-200)
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${px}px ${py}px, ${project.accent ?? '#c8ff3d'}1c, transparent 70%)`

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, ease }}
      className={`[perspective:1400px] ${project.featured ? 'md:col-span-2' : ''}`}
    >
      <motion.button
        onClick={onOpen}
        data-cursor="View"
        className="group relative block h-full w-full overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 text-left transition-colors duration-500 hover:border-white/15"
        style={{ rotateX: srx, rotateY: sry }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          px.set(e.clientX - r.left)
          py.set(e.clientY - r.top)
          if (e.pointerType === 'mouse') {
            ry.set(((e.clientX - r.left) / r.width - 0.5) * 6)
            rx.set(-((e.clientY - r.top) / r.height - 0.5) * 6)
          }
        }}
        onPointerLeave={() => {
          rx.set(0)
          ry.set(0)
          px.set(-200)
          py.set(-200)
        }}
      >
        <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ background: spotlight }} />
        <motion.div layoutId={`cover-${project.slug}`} className={`relative overflow-hidden ${project.featured ? 'aspect-[16/10] md:aspect-[21/8]' : 'aspect-[16/10]'}`}>
          <Cover project={project} large={project.featured} />
        </motion.div>
        <div className="relative p-6 md:p-7">
          <div className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-mute uppercase">
            {project.org && <span>{project.org}</span>}
            {project.org && <span className="text-dim">/</span>}
            <span>{project.category}</span>
            <span className="text-dim">·</span>
            <span>{project.year}</span>
            {project.badge && (
              <span className="ml-auto rounded-full bg-accent/10 px-2.5 py-0.5 text-accent normal-case">{project.badge}</span>
            )}
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{project.title}</h3>
              <p className="mt-2 text-[15px] text-mute">{project.tagline}</p>
            </div>
            <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
              <ArrowUpRight size={16} />
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, project.featured ? 7 : 4).map((t) => (
              <span key={t} className="rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[10.5px] text-mute">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.button>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    lockScroll(true)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const accent = project.accent ?? '#c8ff3d'

  return (
    <motion.div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center md:p-8" role="dialog" aria-modal aria-label={project.title}>
      <motion.div
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        data-lenis-prevent
        className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] border border-line bg-ink-2 md:rounded-[2rem]"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <motion.div layoutId={`cover-${project.slug}`} className="relative aspect-[16/7] overflow-hidden">
          <Cover project={project} large />
        </motion.div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 left-4 z-10 grid size-11 place-items-center rounded-full border border-white/10 bg-ink/70 backdrop-blur transition-colors hover:bg-fg hover:text-ink"
        >
          <X size={18} />
        </button>

        <div className="p-6 md:p-10">
          <p className="font-mono text-xs tracking-[0.15em] uppercase" style={{ color: accent }}>
            {[project.org, project.category, project.year].filter(Boolean).join(' · ')}
          </p>
          <h3 className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">{project.title}</h3>
          <p className="mt-2 font-serif text-2xl text-mute italic">{project.tagline}</p>

          <div className="mt-8 grid gap-10 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="leading-relaxed text-fg/80">{project.description}</p>
              <h4 className="mt-8 mb-4 font-mono text-xs tracking-[0.15em] text-mute uppercase">Highlights</h4>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    className="flex gap-3 text-[15px] leading-relaxed text-fg/80"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                    {h}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              {project.role && (
                <div>
                  <h4 className="mb-2 font-mono text-xs tracking-[0.15em] text-mute uppercase">Role</h4>
                  <p>{project.role}</p>
                </div>
              )}
              {project.metrics && (
                <div className="grid grid-cols-2 gap-3">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="rounded-2xl border border-line p-4">
                      <p className="text-2xl font-medium" style={{ color: accent }}>
                        {m.value}
                      </p>
                      <p className="mt-1 text-xs text-mute">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}
              <div>
                <h4 className="mb-3 font-mono text-xs tracking-[0.15em] text-mute uppercase">Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent"
                    >
                      {l.label} <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map((p) => p.category)))], [])
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState<Project | null>(null)
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-32">
      <SectionHeading index="03" label="Selected work" title="Things I’ve" accent="built & shipped." />

      <Reveal>
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {categories.map((c) => {
            const count = c === 'All' ? projects.length : projects.filter((p) => p.category === c).length
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${
                  filter === c ? 'border-transparent text-ink' : 'border-line text-mute hover:text-fg'
                }`}
              >
                {filter === c && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">
                  {c} <sup className="font-mono text-[9px] opacity-60">{count}</sup>
                </span>
              </button>
            )
          })}
        </div>
      </Reveal>

      <LayoutGroup>
        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.slug} project={p} onOpen={() => setOpen(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>{open && <ProjectModal key={open.slug} project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
      </LayoutGroup>
    </section>
  )
}
