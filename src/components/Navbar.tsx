import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useActiveSection } from '../lib/hooks'
import { lockScroll, scrollToId } from '../lib/scroll'

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
]
const ids = ['top', ...navItems.map((n) => n.id)]

export function Navbar({ show }: { show: boolean }) {
  const active = useActiveSection(ids)
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 400 && !open)
    setScrolled(y > 40)
  })

  useEffect(() => lockScroll(open), [open])

  const go = (id: string) => {
    setOpen(false)
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: show && !hidden ? 0 : -100, opacity: show ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-colors duration-500 ${
            scrolled ? 'border-line bg-ink/70 backdrop-blur-xl' : 'border-transparent'
          }`}
        >
          <button onClick={() => go('top')} className="group flex items-center gap-2.5 pl-2" aria-label="Back to top">
            <span className="grid size-8 place-items-center rounded-full bg-accent font-serif text-lg text-ink italic transition-transform duration-500 group-hover:rotate-[360deg]">
              {profile.firstName[0]}
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">{profile.name}</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active === item.id ? 'text-ink' : 'text-mute hover:text-fg'
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-fg"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${profile.email}`}
            className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent md:flex"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Hire me
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink-2 px-6 pt-24 pb-10 md:hidden"
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-1">
              {navItems.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.button
                    onClick={() => go(item.id)}
                    className="flex w-full items-baseline gap-4 py-2 text-left text-5xl font-medium tracking-tight"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {item.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.a
              href={`mailto:${profile.email}`}
              className="mt-10 font-mono text-sm text-mute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
            >
              {profile.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
