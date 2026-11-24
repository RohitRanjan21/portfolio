import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Reveal, ScrollText, SectionHeading } from '../components/Reveal'
import { profile } from '../data/profile'

function Counter({ value, decimals = 0, suffix = '' }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState((0).toFixed(decimals))
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, value, decimals])
  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-accent">{suffix}</span>
    </span>
  )
}

function Portrait() {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 15 })
  const sry = useSpring(ry, { stiffness: 150, damping: 15 })
  const glareX = useTransform(sry, [-12, 12], ['0%', '100%'])

  return (
    <div className="[perspective:1200px]">
      <motion.div
        data-cursor="Hi!"
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-line bg-ink-3"
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 24)
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * 24)
        }}
        onPointerLeave={() => {
          rx.set(0)
          ry.set(0)
        }}
      >
        <img
          src={profile.photo}
          alt={profile.name}
          loading="lazy"
          className="size-full object-cover grayscale-[35%] transition-all duration-700 hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            background: useTransform(glareX, (x) => `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.7) ${x}, transparent 80%)`),
          }}
        />
        <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
          <div>
            <p className="font-serif text-2xl italic">{profile.name}</p>
            <p className="font-mono text-[11px] tracking-[0.15em] text-mute uppercase">{profile.location}</p>
          </div>
          <span className="grid size-11 place-items-center rounded-full bg-accent text-ink">
            <span className="animate-[spin_8s_linear_infinite] text-lg">✦</span>
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-32">
      <SectionHeading index="01" label="About" title="Engineer by craft," accent="builder by heart." />

      <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <Reveal className="mx-auto w-full max-w-sm md:sticky md:top-28 md:max-w-none md:self-start">
          <Portrait />
        </Reveal>

        <div className="flex flex-col justify-between gap-16">
          <ScrollText text={profile.about} className="text-[clamp(1.35rem,2.4vw,2.1rem)] leading-[1.35] font-light tracking-tight" />

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
            {profile.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="h-full">
                <div className="group relative h-full bg-ink p-6 transition-colors duration-500 hover:bg-ink-3 md:p-8">
                  <div className="text-4xl font-medium tracking-tight md:text-6xl">
                    <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                  </div>
                  <p className="mt-3 text-sm text-mute">{s.label}</p>
                  <span className="absolute top-5 right-5 size-1.5 rounded-full bg-dim transition-colors group-hover:bg-accent" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
