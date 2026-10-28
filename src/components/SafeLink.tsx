import type { ReactNode } from 'react'
import { validUrl } from '../lib/placeholder'

interface Props {
  href?: string
  className?: string
  children: ReactNode
  openInNewTab?: boolean
  /** Shown as a tooltip when the link is not configured yet. */
  missingHint?: string
}

/** Renders a real link only when `href` is valid; otherwise a visibly disabled control (never a fake link). */
export function SafeLink({ href, className = '', children, openInNewTab = false, missingHint = 'Not set yet — edit src/data/portfolio.ts' }: Props) {
  // Same-site paths and mailto:/tel: links open in the same tab; external http(s) links open in a new one.
  const isPath = !!href && (href.startsWith('/') || /^(mailto|tel):/.test(href))
  const url = isPath ? href : validUrl(href)
  if (!url) {
    return (
      <span className={className} aria-disabled="true" title={missingHint}>
        {children}
      </span>
    )
  }
  return (
    <a href={url} className={className} target={isPath && !openInNewTab ? undefined : '_blank'} rel={isPath && !openInNewTab ? undefined : 'noopener noreferrer'}>
      {children}
    </a>
  )
}
