import { Link } from 'react-router-dom'
import type { Project } from '../data/types'
import { validUrl } from '../lib/placeholder'
import { getGalleryImages } from '../lib/images'
import { ExternalIcon } from './Icons'
import { ProjectThumb } from './ProjectThumb'

export function ProjectCard({ project }: { project: Project }) {
  const repo = validUrl(project.repoUrl)
  const demo = validUrl(project.demoUrl)
  const imageCount = getGalleryImages(project, project.title).length
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-panel border border-line bg-surface transition-colors hover:border-accent/60">
      <div className="relative overflow-hidden border-b border-line">
        <ProjectThumb project={project} />
        {imageCount > 1 && <span className="tag absolute bottom-2 right-2 bg-bg/80 backdrop-blur">{imageCount} images</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">
            <Link to={`/portfolio/projects/${project.slug}`} className="after:absolute after:inset-0 hover:text-accent">{project.title}</Link>
          </h3>
          {project.isDemo && <span className="tag shrink-0 text-accent">sample</span>}
        </div>
        <p className="mt-2 text-sm text-muted">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">{project.stack.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
        <div className="mt-5 flex items-center gap-4 pt-1 text-sm">
          <Link to={`/portfolio/projects/${project.slug}`} className="relative z-10 font-medium text-accent hover:underline">Case study</Link>
          {repo && <a href={repo} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-1 text-muted hover:text-fg">Code <ExternalIcon /></a>}
          {demo && <a href={demo} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-1 text-muted hover:text-fg">Live demo <ExternalIcon /></a>}
        </div>
      </div>
    </article>
  )
}
