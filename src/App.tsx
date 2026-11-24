import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { Cursor } from './components/Cursor'
import { Navbar } from './components/Navbar'
import { Preloader } from './components/Preloader'
import { initLenis, lockScroll } from './lib/scroll'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Credentials } from './sections/Credentials'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-accent via-cyan to-violet"
      style={{ scaleX }}
    />
  )
}

// Only play the full intro once per browser session.
const seenIntro = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('intro-seen') === '1'

export default function App() {
  const [loading, setLoading] = useState(!seenIntro)

  useEffect(() => {
    const destroy = initLenis()
    return destroy
  }, [])

  useEffect(() => {
    lockScroll(loading)
    if (!loading) sessionStorage.setItem('intro-seen', '1')
  }, [loading])

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  const done = useCallback(() => setLoading(false), [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="preloader" onDone={done} />}</AnimatePresence>
      <Cursor />
      <ScrollProgress />
      <div className="grain pointer-events-none fixed inset-0 z-[80] opacity-[0.035]" aria-hidden />
      <Navbar show={!loading} />
      <main>
        <Hero ready={!loading} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Credentials />
      </main>
      <Contact />
    </MotionConfig>
  )
}
