import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { GalleryImage } from '../lib/images'
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './Icons'

interface Props {
  images: GalleryImage[]
  index: number
  label: string
  onIndexChange: (index: number) => void
  onClose: () => void
}

const arrow = 'absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-control border border-white/30 bg-black/50 text-white transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30'

/**
 * Full-size image viewer. An overlay, not a route: closing it (X, Esc, click outside)
 * leaves the page exactly where it was. Arrow keys and swipe move between pictures.
 */
export function Lightbox({ images, index, label, onIndexChange, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const [broken, setBroken] = useState<ReadonlySet<string>>(new Set())
  const count = images.length
  const current = images[index]
  const go = (i: number) => onIndexChange(Math.max(0, Math.min(count - 1, i)))

  // Lock page scroll, move focus into the dialog, and give focus back to the trigger on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') go(index - 1)
      else if (e.key === 'ArrowRight') go(index + 1)
      else if (e.key === 'Tab') {
        // Keep Tab inside the dialog.
        const items = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled)') ?? [])]
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        const active = document.activeElement
        if (!dialogRef.current?.contains(active)) { e.preventDefault(); first.focus() }
        else if (e.shiftKey && active === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count, onClose, onIndexChange])

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current
    touch.current = null
    if (!start || count < 2) return
    const dx = e.changedTouches[0].clientX - start.x
    const dy = e.changedTouches[0].clientY - start.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1))
  }

  return createPortal(
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={`${label} — image viewer`} className="fixed inset-0 z-50 flex flex-col bg-black/95">
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <p className="font-mono text-xs text-white/80" aria-live="polite">
          {count > 1 ? `${index + 1} / ${count}` : label}
          {count > 1 && <span className="sr-only">{`, image ${index + 1} of ${count}`}</span>}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close image viewer" className="grid h-10 w-10 place-items-center rounded-control border border-white/30 hover:border-accent hover:text-accent">
          <CloseIcon />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }}
        onTouchEnd={onTouchEnd}
      >
        {broken.has(current.src) ? (
          <p className="font-mono text-sm text-white/70">This image could not be loaded.</p>
        ) : (
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            onError={() => setBroken((s) => new Set(s).add(current.src))}
            className="max-h-full max-w-full select-none object-contain"
            draggable={false}
          />
        )}
        {count > 1 && (
          <>
            <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous image" className={`${arrow} left-2 sm:left-4`}><ChevronLeftIcon /></button>
            <button type="button" onClick={() => go(index + 1)} disabled={index === count - 1} aria-label="Next image" className={`${arrow} right-2 sm:right-4`}><ChevronRightIcon /></button>
          </>
        )}
      </div>

      <p className="min-h-[3rem] px-4 py-3 text-center text-sm text-white/80">{current.caption}</p>
    </div>,
    document.body,
  )
}
