import { portfolio as p } from '../data/portfolio'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeading } from '../components/SectionHeading'

export default function ProjectsPage() {
  return (
    <section aria-labelledby="projects" className="section">
      <div className="container-page">
        <SectionHeading id="projects" title="Projects" lead="Each project has a case study with the problem, my role, the process and the outcome." back={{ to: '/#portfolio', label: 'Portfolio' }} as="h1" />
        <div className="grid gap-6 md:grid-cols-2">
          {p.projects.map((proj) => <ProjectCard key={proj.slug} project={proj} />)}
        </div>
      </div>
    </section>
  )
}
