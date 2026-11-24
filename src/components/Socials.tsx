import { profile } from '../data/profile'
import { GithubIcon, LeetcodeIcon, LinkedinIcon, XIcon } from './Icons'
import { Magnetic } from './Magnetic'

const map = {
  github: { Icon: GithubIcon, label: 'GitHub' },
  linkedin: { Icon: LinkedinIcon, label: 'LinkedIn' },
  leetcode: { Icon: LeetcodeIcon, label: 'LeetCode' },
  x: { Icon: XIcon, label: 'X' },
} as const

export function Socials({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const entries = (Object.keys(map) as (keyof typeof map)[]).filter((k) => profile.socials[k])
  const box = size === 'lg' ? 'size-14' : 'size-11'
  const icon = size === 'lg' ? 'size-5' : 'size-4'
  return (
    <div className="flex items-center gap-2">
      {entries.map((key) => {
        const { Icon, label } = map[key]
        return (
          <Magnetic key={key} strength={0.5}>
            <a
              href={profile.socials[key]}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={`${box} grid place-items-center rounded-full border border-line text-mute transition-all duration-300 hover:border-accent hover:bg-accent hover:text-ink`}
            >
              <Icon className={icon} />
            </a>
          </Magnetic>
        )
      })}
    </div>
  )
}
