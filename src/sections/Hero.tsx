import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { Socials } from '../components/Socials'
import { profile } from '../data/profile'
import { scrollToId } from '../lib/scroll'

const ease = [0.16, 1, 0.3, 1] as const

function Letters({ text, ready, delay, className }: { text: string; ready: boolean; delay: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.22em] -mb-[0.16em] ${className ?? ''}`} aria-hidden>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '105%', rotate: 8 }}
          animate={ready ? { y: '0%', rotate: 0 } : undefined}
          transition={{ duration: 1.1, delay: delay + i * 0.045, ease }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600)
    return () => clearInterval(id)
  }, [words.length])
  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1 font-serif whitespace-nowrap italic text-gradient"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Spotlight that trails the pointer
  const mx = useMotionValue(50)
  const my = useMotionValue(40)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, rgba(124,92,255,0.18), transparent 60%)`

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width) * 100)
        my.set(((e.clientY - r.top) / r.height) * 100)
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      <motion.div
        className="absolute -top-40 -left-40 size-[38rem] rounded-full bg-violet/25 blur-[120px]"
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 size-[32rem] rounded-full bg-cyan/15 blur-[120px]"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/3 size-[26rem] rounded-full bg-accent/10 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, -50, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-32 pb-16 md:px-10"
      >
        <motion.div
          className="mb-8 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          {profile.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs text-accent">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {profile.availabilityText}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs text-mute">
            <MapPin size={12} /> {profile.location}
          </span>
        </motion.div>

        <h1 className="text-[clamp(4.5rem,19vw,13.5rem)] leading-[0.82] font-semibold tracking-[-0.06em]" aria-label={profile.name}>
          <Letters text={profile.firstName} ready={ready} delay={0.15} />
          <br />
          <span className="flex items-end gap-[0.15em]">
            <Letters
              text={profile.lastName}
              ready={ready}
              delay={0.35}
              className="font-serif font-normal tracking-[-0.03em] italic"
            />
            <motion.span
              className="mb-[0.18em] inline-block size-[0.14em] rounded-full bg-accent"
              initial={{ scale: 0 }}
              animate={ready ? { scale: 1 } : undefined}
              transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.95 }}
            />
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[1.3fr_1fr] md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.7, ease }}
          >
            <p className="text-2xl leading-snug font-light tracking-tight md:text-4xl">
              {profile.role.replace(' Software', '')} crafting <br className="hidden sm:block" />
              <RotatingWord words={profile.rotatingWords} />
            </p>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.85, ease }}
          >
            <p className="max-w-md text-base leading-relaxed text-mute">{profile.tagline}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => scrollToId('projects')} icon={<ArrowUpRight size={16} />}>
                View my work
              </Button>
              {profile.resume ? (
                <Button href={profile.resume} variant="ghost" external>
                  Résumé
                </Button>
              ) : (
                <Button onClick={() => scrollToId('contact')} variant="ghost">
                  Let’s talk
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 pb-8 md:px-10"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <Socials />
        <button
          onClick={() => scrollToId('about')}
          className="group flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-mute uppercase"
        >
          <span className="hidden sm:inline">Scroll to explore</span>
          <span className="relative grid h-12 w-7 place-items-start justify-center rounded-full border border-line pt-2">
            <motion.span
              className="size-1.5 rounded-full bg-accent"
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
          <ArrowDown size={14} className="sm:hidden" />
        </button>
      </motion.div>
    </section>
  )
}
