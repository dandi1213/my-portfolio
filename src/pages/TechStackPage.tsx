import { portfolio as p } from '../data/portfolio'
import { SectionHeading } from '../components/SectionHeading'
import { TechLogo } from '../components/TechLogo'

export default function TechStackPage() {
  return (
    <section aria-labelledby="tech-stack" className="section">
      <div className="container-page">
        <SectionHeading id="tech-stack" title="Tech Stack" lead="Languages, frameworks and tools I work with." back={{ to: '/#portfolio', label: 'Portfolio' }} as="h1" />
        <div className="space-y-12">
          {p.techStack.map((g) => (
            <section key={g.category} aria-labelledby={`tech-${g.category}`}>
              <h2 id={`tech-${g.category}`} className="mb-4 font-mono text-sm text-muted">{g.category}</h2>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {g.items.map((t) => (
                  <li key={t.name} className="flex flex-col items-center gap-3 rounded-panel border border-line bg-surface p-4 text-center transition-colors hover:border-accent/60">
                    <TechLogo name={t.name} src={t.logo} />
                    <span className="text-sm font-medium">{t.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
