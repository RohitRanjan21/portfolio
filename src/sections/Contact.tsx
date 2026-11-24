import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import { useRef, useState } from 'react'
import { Magnetic } from '../components/Magnetic'
import { SplitWords } from '../components/Reveal'
import { Socials } from '../components/Socials'
import { profile } from '../data/profile'
import { useLocalTime } from '../lib/hooks'
import { scrollToId } from '../lib/scroll'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)
  const time = useLocalTime(profile.timezone)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const orbScale = useTransform(scrollYProgress, [0, 1], [0.6, 1.15])
  const headingX = useTransform(scrollYProgress, [0, 1], ['-6%', '0%'])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden border-t border-line pt-28 md:pt-40">
      <motion.div
        className="pointer-events-none absolute top-1/3 left-1/2 size-[50rem] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg,#7c5cff33,#22d3ee22,#c8ff3d22,#7c5cff33)] blur-[100px]"
        style={{ scale: orbScale }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-mute uppercase">
          <span className="text-accent">06</span>
          <span className="h-px w-10 bg-line" />
          <span>Contact</span>
        </div>

        <motion.h2 style={{ x: headingX }} className="text-[clamp(3.2rem,11vw,10rem)] leading-[0.88] font-semibold tracking-[-0.06em]">
          <SplitWords text="Let’s build" />
          <br />
          <SplitWords text="something great." className="font-serif font-normal tracking-[-0.03em] italic text-gradient" delay={0.15} />
        </motion.h2>

        <div className="mt-16 flex flex-col gap-10 md:mt-24 md:flex-row md:items-end md:justify-between">
          <div className="space-y-5">
            <p className="max-w-md text-lg text-mute">
              Have a role, a project or an idea in mind? My inbox is always open, and I usually reply within a day.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.2}>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-fg py-2 pr-2 pl-6 text-ink transition-colors hover:bg-accent"
                >
                  <span className="text-base font-medium sm:text-lg">{profile.email}</span>
                  <span className="grid size-10 place-items-center rounded-full bg-ink text-fg transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </span>
                </a>
              </Magnetic>
              <button
                onClick={copy}
                aria-label="Copy email address"
                className="relative grid size-14 place-items-center rounded-full border border-line transition-colors hover:border-fg"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={copied ? 'y' : 'n'} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                    {copied ? <Check size={18} className="text-accent" /> : <Copy size={18} />}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      className="absolute -top-9 rounded-full bg-accent px-3 py-1 font-mono text-[11px] whitespace-nowrap text-ink"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
          <Socials size="lg" />
        </div>
      </div>

      <footer className="relative mx-auto mt-28 flex max-w-7xl flex-col gap-6 border-t border-line px-6 py-8 text-sm text-mute md:mt-40 md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} {profile.name}. Designed & built with care.
        </p>
        <div className="flex items-center gap-6">
          <span className="font-mono text-xs">
            {profile.location.split(',')[0]} · {time}
          </span>
          <button onClick={() => scrollToId('top')} className="group flex items-center gap-2 hover:text-fg">
            Back to top
            <span className="grid size-8 place-items-center rounded-full border border-line transition-transform duration-500 group-hover:-translate-y-1">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </footer>
    </section>
  )
}
