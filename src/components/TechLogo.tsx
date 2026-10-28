import { useState } from 'react'

const initials = (name: string) => name.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase()

/** Fixed 48×48 box so every logo has the same size; falls back to a placeholder tile when the file is missing. */
export function TechLogo({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return <span className="grid h-12 w-12 place-items-center rounded-control border border-dashed border-line font-mono text-sm text-muted" aria-hidden="true">{initials(name)}</span>
  }
  return (
    <span className="grid h-12 w-12 place-items-center">
      <img src={src} alt="" width={48} height={48} loading="lazy" decoding="async" onError={() => setFailed(true)} className="max-h-full max-w-full object-contain" />
    </span>
  )
}
