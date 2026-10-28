import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { portfolio } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import { SectionLink } from './SectionLink'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons'

const NAV: { id: string; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  // Hidden automatically when there is no experience data (the section is not rendered either).
  ...(portfolio.experience.length ? [{ id: 'experience', label: 'Experience' }] : []),
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
]

const SECTION_IDS = NAV.map((n) => n.id)

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()
  const onMain = pathname === '/'
  const observed = useActiveSection(SECTION_IDS, onMain)
  // Detail pages belong to their parent section.
  const active = onMain ? observed : pathname.startsWith('/portfolio') ? 'portfolio' : pathname.startsWith('/experience') ? 'experience' : ''
  const linkClass = (id: string) => `rounded-control px-3 py-2 text-sm transition-colors hover:text-fg ${active === id ? 'text-fg' : 'text-muted'}`

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-control focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg">Skip to content</a>
      <div className="container-page flex h-16 items-center justify-between">
        <SectionLink section="home" className="flex items-center gap-2 font-mono text-sm font-medium" aria-label={`${portfolio.name} — home`}>
          <span className="grid h-8 w-8 place-items-center rounded-control border border-accent/60 text-accent">{portfolio.monogram}</span>
          <span className="hidden text-muted sm:inline md:hidden lg:inline">~/portfolio</span>
        </SectionLink>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <SectionLink key={n.id} section={n.id} className={linkClass(n.id)} aria-current={active === n.id ? 'true' : undefined}>{n.label}</SectionLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={toggle} className="grid h-9 w-9 place-items-center rounded-control border border-line text-muted hover:text-fg" aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <SectionLink section="contact" className="btn btn-primary hidden whitespace-nowrap md:inline-flex">Let’s collaborate</SectionLink>
          <button type="button" className="grid h-9 w-9 place-items-center rounded-control border border-line md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-bg md:hidden">
          <ul className="container-page flex flex-col py-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <SectionLink section={n.id} onClick={() => setOpen(false)} className={`block rounded-control px-2 py-3 text-base hover:text-fg ${active === n.id ? 'text-fg' : 'text-muted'}`}>{n.label}</SectionLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
