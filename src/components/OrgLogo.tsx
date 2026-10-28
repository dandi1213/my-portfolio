import { useState } from 'react'

/** Organization / company logo, falling back to its initials (same look as the Education logos). */
export function OrgLogo({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(!src)
  const initials = name
    .split(/\s+/)
    .map((word) => word.replace(/^[^A-Za-z0-9]+/, ''))
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  if (failed) {
    return (
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-control border border-line bg-surface font-mono text-xs font-semibold text-accent" aria-hidden="true">
        {initials || '·'}
      </span>
    )
  }
  return (
    <img src={src} alt={`${name} logo`} width={40} height={40} loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-10 w-10 shrink-0 rounded-control border border-line bg-surface object-contain p-1" />
  )
}
