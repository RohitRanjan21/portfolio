import type { ReactNode } from 'react'
import { Magnetic } from './Magnetic'

/** Pill button with a fill that wipes up on hover and a rolling label. */
export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  icon,
  external,
}: {
  children: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  icon?: ReactNode
  external?: boolean
}) {
  const base =
    'group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-medium transition-colors duration-500'
  const styles =
    variant === 'primary'
      ? 'bg-accent text-ink'
      : 'border border-line text-fg hover:border-fg hover:text-ink'
  const fill = variant === 'primary' ? 'bg-fg' : 'bg-fg'

  const inner = (
    <>
      <span
        className={`absolute inset-0 translate-y-full rounded-[50%_50%_0_0] ${fill} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:rounded-none`}
      />
      <span className="relative block h-5 overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:text-ink">
          {children}
        </span>
      </span>
      {icon && <span className="relative transition-transform duration-500 group-hover:rotate-45 group-hover:text-ink">{icon}</span>}
    </>
  )

  return (
    <Magnetic strength={0.25}>
      {href ? (
        <a href={href} className={`${base} ${styles}`} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {inner}
        </a>
      ) : (
        <button onClick={onClick} className={`${base} ${styles}`}>
          {inner}
        </button>
      )}
    </Magnetic>
  )
}
