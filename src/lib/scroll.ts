import Lenis from 'lenis'

let lenis: Lenis | null = null

/** Starts smooth scrolling and returns a cleanup function. */
export function initLenis() {
  lenis?.destroy()
  const instance = new Lenis({ lerp: 0.09 })
  lenis = instance
  let frame = 0
  const raf = (time: number) => {
    instance.raf(time)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)
  return () => {
    cancelAnimationFrame(frame)
    instance.destroy()
    if (lenis === instance) lenis = null
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: id === 'top' ? 0 : -20, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function lockScroll(locked: boolean) {
  if (!lenis) {
    document.documentElement.style.overflow = locked ? 'hidden' : ''
    return
  }
  if (locked) lenis.stop()
  else lenis.start()
}
