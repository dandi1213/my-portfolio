import { useState } from 'react'

interface Props {
  src?: string
  alt: string
  /** Text shown in the placeholder when there is no image (or it fails to load). */
  hint: string
  fileName: string
  eager?: boolean
}

/** Image when available; otherwise a deliberate placeholder that mimics a code window. */
export function MediaThumb({ src, alt, hint, fileName, eager = false }: Props) {
  const [failed, setFailed] = useState(false)
  if (src && !failed) {
    return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} className="aspect-[16/9] w-full object-cover" />
  }
  return (
    <div className="aspect-[16/9] w-full bg-bg p-4 font-mono text-xs text-muted" role="img" aria-label={hint}>
      <div className="mb-3 flex gap-1.5"><span className="h-2 w-2 rounded-full bg-line" /><span className="h-2 w-2 rounded-full bg-line" /><span className="h-2 w-2 rounded-full bg-line" /></div>
      <p>{`// ${hint}`}</p>
      <p className="text-accent">{fileName}</p>
    </div>
  )
}
