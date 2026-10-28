import { Link, useParams } from 'react-router-dom'
import { portfolio } from '../data/portfolio'
import { validUrl } from '../lib/placeholder'
import { getGalleryImages } from '../lib/images'
import { ImageGallery } from '../components/ImageGallery'
import { ArrowLeftIcon, ExternalIcon } from '../components/Icons'
import NotFound from './NotFound'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = portfolio.projects.find((p) => p.slug === slug)
  if (!project) return <NotFound what="project" />
  const repo = validUrl(project.repoUrl)
  const demo = validUrl(project.demoUrl)
  const images = getGalleryImages(project, `Screenshot of ${project.title}`)

  const blocks = [
    { title: 'The problem', body: project.problem },
    { title: 'My role', body: project.role },
    { title: 'Process', body: project.process },
    { title: 'Outcome', body: project.outcome },
  ]

  return (
    <article className="container-page max-w-3xl py-14 sm:py-20">
      <Link to="/portfolio/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg"><ArrowLeftIcon />All projects</Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">{project.title}</h1>
      {project.isDemo && <p className="mt-3 text-sm text-accent">Sample content — replace this project in src/data/portfolio.ts.</p>}
      <p className="mt-4 text-lg text-muted">{project.summary}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {repo && <a className="btn btn-ghost" href={repo} target="_blank" rel="noopener noreferrer">Source code <ExternalIcon /></a>}
        {demo && <a className="btn btn-primary" href={demo} target="_blank" rel="noopener noreferrer">Live demo <ExternalIcon /></a>}
      </div>
      <div className="mt-8 overflow-hidden rounded-panel border border-line">
        <ImageGallery key={project.slug} images={images} label={project.title} placeholder={{ hint: 'screenshot goes here', fileName: `${project.slug}.png` }} eager />
      </div>

      <div className="mt-12 space-y-10">
        {blocks.map((b) => (<section key={b.title}><h2 className="text-xl font-semibold">{b.title}</h2><p className="mt-2 leading-relaxed text-muted">{b.body}</p></section>))}
        <section><h2 className="text-xl font-semibold">Key features</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-muted">{project.features.map((f) => <li key={f}>{f}</li>)}</ul></section>
        <section><h2 className="text-xl font-semibold">Built with</h2><ul className="mt-3 flex flex-wrap gap-2">{project.stack.map((t) => <li key={t} className="tag">{t}</li>)}</ul></section>
      </div>
    </article>
  )
}
