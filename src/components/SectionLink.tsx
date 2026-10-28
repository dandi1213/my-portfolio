import type { AnchorHTMLAttributes } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** Id of a section on the main page, e.g. "portfolio". */
  section: string
}

/**
 * Link to a section of the main page.
 * On the main page it is a plain in-page anchor (smooth scroll, no route change);
 * on a Portfolio detail page it returns to "/" and scrolls to the section.
 */
export function SectionLink({ section, ...rest }: Props) {
  const { pathname } = useLocation()
  return pathname === '/' ? <a href={`#${section}`} {...rest} /> : <Link to={`/#${section}`} {...rest} />
}
