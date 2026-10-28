import type { MediaImage, WithImages } from '../data/types'

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

/**
 * Turns an item's `images` (or the legacy single `image`) into a clean list.
 * - `images` wins when it has at least one usable entry; otherwise `image` is used.
 * - Empty paths and duplicates are dropped, so a half-filled array never renders a broken slide.
 * - Alt text defaults to "<label> (n of total)" so screen readers can tell the pictures apart.
 */
export function getGalleryImages(item: WithImages, label: string): GalleryImage[] {
  const clean = (raw: MediaImage[]) => {
    const seen = new Set<string>()
    const out: { src: string; alt?: string; caption?: string }[] = []
    for (const entry of raw) {
      const o = typeof entry === 'string' ? { src: entry } : entry
      const src = o.src?.trim()
      if (!src || seen.has(src)) continue
      seen.add(src)
      out.push({ ...o, src })
    }
    return out
  }
  const fromImages = clean(item.images ?? [])
  const list = fromImages.length ? fromImages : clean(item.image ? [item.image] : [])
  return list.map((o, i) => ({
    src: o.src,
    alt: o.alt ?? (list.length > 1 ? `${label} (${i + 1} of ${list.length})` : label),
    caption: o.caption,
  }))
}
