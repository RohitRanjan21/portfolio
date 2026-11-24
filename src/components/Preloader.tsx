import { animate, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const greetings = ['Hello', 'नमस्ते', 'Hola', 'Bonjour', 'Ciao', 'こんにちは', 'Hallo', 'Welcome']

export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.1,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(onDone, 250),
    })
    const id = setInterval(() => setIndex((i) => Math.min(i + 1, greetings.length - 1)), 2100 / greetings.length)
    return () => {
      controls.stop()
      clearInterval(id)
    }
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink-2 p-6 md:p-10"
      exit={{ y: '-100%', borderBottomLeftRadius: '50% 12%', borderBottomRightRadius: '50% 12%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex justify-between font-mono text-xs tracking-[0.2em] text-mute uppercase">
        <span>Rohit Ranjan</span>
        <span>Portfolio © {new Date().getFullYear()}</span>
      </div>

      <div className="flex items-center justify-center gap-3">
        <span className="size-2.5 animate-pulse rounded-full bg-accent" />
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="font-serif text-5xl italic md:text-7xl"
        >
          {greetings[index]}
        </motion.span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="h-px flex-1 overflow-hidden bg-line">
          <motion.div className="h-full origin-left bg-accent" style={{ scaleX: count / 100 }} />
        </div>
        <span className="font-mono text-6xl leading-none font-medium tabular-nums md:text-8xl">
          {String(count).padStart(3, '0')}
        </span>
      </div>
    </motion.div>
  )
}
