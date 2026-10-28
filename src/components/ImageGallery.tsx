import { useCallback, useEffect, useRef, useState } from 'react'
import type { GalleryImage } from '../lib/images'
import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon } from './Icons'
import { Lightbox } from './Lightbox'
import { MediaThumb } from './MediaThumb'

interface Props {
  images: GalleryImage[]
  /** Accessible name of the gallery, e.g. the project title. */
  label: string
  /** Shown when there are no images. Omit to render nothing at all. */
  placeholder?: { hint: string; fileName: string }
  eager?: boolean
}

const MAX_DOTS = 8
const navBtn = 'absolute top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-control border border-line bg-bg/80 text-fg backdrop-blur transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30'
const chip = 'tag absolute z-10 bg-bg/80 backdrop-blur'

/**
 * Reusable picture gallery (projects, certificates, awards, experience).
 * - 0 images: the placeholder (if given). 1 image: shown plainly, no carousel controls.
 * - 2+ images: swipeable carousel (native scroll-snap, so touch, trackpad and keyboard just work)
 *   with arrows, dots and an "n / total" counter.
 * - Clicking a picture opens it full size in a Lightbox.
 * Give it a `key` that changes with the item so the position resets when the item changes.
 */
export function ImageGallery({ images, label, placeholder, eager = false }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const settle = useRef(0)
  const target = useRef<number | null>(null)
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [failed, setFailed] = useState<ReadonlySet<string>>(new Set())
  const count = images.length
  const current = Math.min(index, Math.max(count - 1, 0))
  const currentRef = useRef(current)
  currentRef.current = current

  const goTo = useCallback((i: number, smooth = true) => {
    const next = Math.max(0, Math.min(count - 1, i))
    setIndex(next)
    const el = trackRef.current
    if (!el) return
    // While we scroll programmatically, ignore scroll events so the counter does not flicker.
    target.current = next
    window.clearTimeout(settle.current)
    settle.current = window.setTimeout(() => { target.current = null }, 700)
    const left = next * el.clientWidth
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (typeof el.scrollTo === 'function') el.scrollTo({ left, behavior: smooth && !reduce ? 'smooth' : 'auto' })
    else el.scrollLeft = left
  }, [count])

  const onScroll = () => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const el = trackRef.current
      if (!el || !el.clientWidth) return
      if (target.current !== null) {
        if (Math.abs(el.scrollLeft - target.current * el.clientWidth) < 2) target.current = null
        return
      }
      setIndex(Math.round(el.scrollLeft / el.clientWidth))
    })
  }

  // Keep the current picture aligned when the width changes (rotate phone, resize window).
  useEffect(() => {
    const el = trackRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => { el.scrollLeft = currentRef.current * el.clientWidth })
    ro.observe(el)
    return () => ro.disconnect()
  }, [count])

  useEffect(() => () => { cancelAnimationFrame(frame.current); window.clearTimeout(settle.current) }, [])

  if (!count) return placeholder ? <MediaThumb alt="" hint={placeholder.hint} fileName={placeholder.fileName} /> : null

  const multi = count > 1
  const hasCaptions = images.some((i) => i.caption)
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!multi || !e.currentTarget.contains(e.target as Node)) return
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1) }
  }

  return (
    <div
      {...(multi ? { role: 'region', 'aria-roledescription': 'carousel', 'aria-label': `${label} — images` } : {})}
      onKeyDown={onKeyDown}
    >
      <div className="group relative aspect-[16/9] w-full overflow-hidden bg-bg">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className="h-full w-full shrink-0 snap-center snap-always"
              {...(multi ? { role: 'group', 'aria-roledescription': 'slide', 'aria-label': `${i + 1} of ${count}` } : {})}
            >
              {failed.has(img.src) ? (
                <MediaThumb alt="" hint="image could not be loaded" fileName={img.src.split('/').pop() ?? 'image'} />
              ) : (
                <button
                  type="button"
                  onClick={() => { setIndex(i); setZoom(true) }}
                  tabIndex={i === current ? 0 : -1}
                  aria-label={`Enlarge: ${img.alt}`}
                  className="block h-full w-full cursor-zoom-in"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading={eager && i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                    onError={() => setFailed((s) => new Set(s).add(img.src))}
                    className="h-full w-full object-contain"
                  />
                </button>
              )}
            </div>
          ))}
        </div>

        <span aria-hidden="true" className={`${chip} right-2 top-2 pointer-events-none px-1.5 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100`}><ExpandIcon /></span>

        {multi && (
          <>
            <span className={`${chip} left-2 top-2 pointer-events-none`}>
              <span aria-hidden="true">{current + 1} / {count}</span>
              <span className="sr-only" aria-live="polite">{`Image ${current + 1} of ${count}`}</span>
            </span>
            <button type="button" onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous image" className={`${navBtn} left-2`}><ChevronLeftIcon /></button>
            <button type="button" onClick={() => goTo(current + 1)} disabled={current === count - 1} aria-label="Next image" className={`${navBtn} right-2`}><ChevronRightIcon /></button>
            {count <= MAX_DOTS && (
              <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center rounded-full border border-line bg-bg/80 px-1 backdrop-blur">
                {images.map((img, i) => (
                  <button key={img.src} type="button" onClick={() => goTo(i)} aria-label={`Go to image ${i + 1}`} aria-current={i === current ? 'true' : undefined} className="grid h-6 w-5 place-items-center">
                    <span className={`h-2 w-2 rounded-full border border-accent transition-colors ${i === current ? 'bg-accent' : 'bg-transparent'}`} />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {hasCaptions && <p className="min-h-[2.5rem] border-t border-line bg-surface px-4 py-2 text-xs text-muted">{images[current].caption}</p>}

      {zoom && <Lightbox images={images} index={current} label={label} onIndexChange={(i) => goTo(i, false)} onClose={() => setZoom(false)} />}
    </div>
  )
}
