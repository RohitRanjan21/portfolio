import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, type ReactNode } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

/** Fades + lifts its children into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/** Splits a line into words that slide up from a mask. */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  animate,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  /** When provided, controls playback instead of scroll-into-view. */
  animate?: boolean
}) {
  const words = text.split(' ')
  const controlled = animate !== undefined
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            {...(controlled
              ? { animate: animate ? { y: '0%' } : { y: '110%' } }
              : { whileInView: { y: '0%' }, viewport: { once: true, margin: '-60px' } })}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** Paragraph whose words light up as the reader scrolls through it. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className="inline" aria-hidden>
      {children}{' '}
    </motion.span>
  )
}

export function SectionHeading({ index, label, title, accent }: { index: string; label: string; title: string; accent?: string }) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-mute uppercase">
          <span className="text-accent">{index}</span>
          <span className="h-px w-10 bg-line" />
          <span>{label}</span>
        </div>
      </Reveal>
      <h2 className="text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.95] font-medium tracking-[-0.04em]">
        <SplitWords text={title} />
        {accent && (
          <>
            {' '}
            <SplitWords text={accent} className="font-serif font-normal tracking-[-0.02em] italic text-gradient" delay={0.15} />
          </>
        )}
      </h2>
    </div>
  )
}
