import { Link } from 'react-router-dom'
import { portfolio as p } from '../data/portfolio'
import { SectionHeading } from '../components/SectionHeading'

const techCount = p.techStack.reduce((n, g) => n + g.items.length, 0)

const CATEGORIES = [
  { to: '/portfolio/projects', title: 'Projects', text: 'Things I have built, with the problem, my role and the outcome.', count: `${p.projects.length} projects` },
  { to: '/portfolio/certificates', title: 'Certificates', text: 'Courses and training I have completed.', count: `${p.certificates.length} certificates` },
  { to: '/portfolio/awards', title: 'Awards', text: 'Recognition and achievements.', count: `${p.awards.length} awards` },
  { to: '/portfolio/tech-stack', title: 'Tech Stack', text: 'Languages, frameworks and tools I work with.', count: `${techCount} technologies` },
]

export function Portfolio() {
  return (
    <section aria-labelledby="portfolio" className="section border-b border-line">
      <div className="container-page">
        <SectionHeading id="portfolio" title="Portfolio" lead="Choose a category to see the details." />
        <ul className="grid gap-6 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <li key={c.to}>
              <Link to={c.to} className="group flex h-full flex-col rounded-panel border border-line bg-surface p-6 transition-colors hover:border-accent/60">
                <p className="font-mono text-xs text-muted">{c.count}</p>
                <h3 className="mt-3 text-xl font-semibold group-hover:text-accent">{c.title}</h3>
                <p className="mt-2 text-sm text-muted">{c.text}</p>
                <span className="mt-6 text-sm font-medium text-accent">View {c.title.toLowerCase()} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
