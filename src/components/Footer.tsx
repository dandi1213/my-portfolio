import { SectionLink } from './SectionLink'
import { portfolio } from '../data/portfolio'
import { validUrl } from '../lib/placeholder'
import { socialIcon } from './Icons'

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{portfolio.name}</p>
          <p className="text-sm text-muted">{portfolio.tagline}</p>
        </div>
        <ul className="flex items-center gap-4 text-sm text-muted">
          <li><SectionLink section="portfolio" className="hover:text-fg">Portfolio</SectionLink></li>
          <li><SectionLink section="contact" className="hover:text-fg">Contact</SectionLink></li>
          {portfolio.social.filter((s) => validUrl(s.url)).map((s) => (
            <li key={s.label}>
              <a href={validUrl(s.url)} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="hover:text-fg">{socialIcon(s.label)}</a>
            </li>
          ))}
        </ul>
      </div>
      <p className="container-page mt-6 text-xs text-muted">© {new Date().getFullYear()} {portfolio.name}. Built with React, Vite and Tailwind CSS.</p>
    </footer>
  )
}
