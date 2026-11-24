import { motion, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { SectionHeading } from '../components/Reveal'
import { experience } from '../data/experience'

const ease = [0.16, 1, 0.3, 1] as const

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-32">
      <SectionHeading index="02" label="Experience" title="Where I’ve" accent="made an impact." />

      <div ref={ref} className="relative">
        {/* Track + scroll-linked fill */}
        <div className="absolute top-0 bottom-0 left-[7px] w-px bg-line md:left-[calc(30%+7px)]" />
        <motion.div
          className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-gradient-to-b from-accent via-cyan to-violet md:left-[calc(30%+7px)]"
          style={{ scaleY }}
        />

        <div className="space-y-20 md:space-y-28">
          {experience.map((job, i) => (
            <motion.article
              key={job.company + job.period}
              className="relative grid gap-6 pl-10 md:grid-cols-[30%_1fr] md:gap-0 md:pl-0"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-120px' }}
            >
              {/* Dot */}
              <motion.span
                className="absolute top-2 left-0 grid size-[15px] place-items-center rounded-full border border-line bg-ink md:left-[30%]"
                variants={{ hidden: { scale: 0.4 }, show: { scale: 1 } }}
                transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              >
                <motion.span
                  className="size-[7px] rounded-full bg-accent shadow-[0_0_18px_4px_rgba(200,255,61,0.55)]"
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                  transition={{ delay: 0.2 }}
                />
              </motion.span>

              <motion.div
                className="md:pr-14 md:text-right"
                variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.9, ease }}
              >
                <p className="font-mono text-xs tracking-[0.15em] text-accent uppercase">{job.period}</p>
                <h3 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
                  {job.companyUrl ? (
                    <a href={job.companyUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 hover:text-accent">
                      {job.company}
                      <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                <p className="mt-2 text-sm text-mute">{job.location}</p>
                <p className="mt-6 hidden font-serif text-8xl text-white/5 italic md:block">0{experience.length - i}</p>
              </motion.div>

              <motion.div
                className="group relative overflow-hidden rounded-3xl border border-line bg-ink-2/60 p-6 backdrop-blur transition-colors duration-500 hover:border-white/15 md:ml-14 md:p-9"
                variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.9, delay: 0.1, ease }}
              >
                <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-violet/10 blur-3xl transition-opacity duration-700 group-hover:opacity-100 md:opacity-0" />
                <h4 className="text-xl font-medium tracking-tight md:text-2xl">{job.role}</h4>
                {job.summary && <p className="mt-2 text-mute">{job.summary}</p>}
                <ul className="mt-6 space-y-4">
                  {job.highlights.map((h, j) => (
                    <motion.li
                      key={j}
                      className="flex gap-3 text-[15px] leading-relaxed text-fg/80"
                      variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.6, delay: 0.25 + j * 0.07, ease }}
                    >
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                      {h}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-2">
                  {job.stack.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-mute">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
