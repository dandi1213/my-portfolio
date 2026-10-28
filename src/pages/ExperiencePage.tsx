import { Link, useParams } from 'react-router-dom'
import { portfolio } from '../data/portfolio'
import { getGalleryImages } from '../lib/images'
import { ImageGallery } from '../components/ImageGallery'
import { OrgLogo } from '../components/OrgLogo'
import { SafeLink } from '../components/SafeLink'
import { ArrowLeftIcon, ExternalIcon } from '../components/Icons'
import { validUrl } from '../lib/placeholder'
import NotFound from './NotFound'

export default function ExperiencePage() {
  const { slug } = useParams()
  const e = portfolio.experience.find((x) => x.slug === slug)
  if (!e) return <NotFound what="experience" />
  const images = getGalleryImages(e, `${e.role} at ${e.organization}`)
  const project = e.projectSlug ? portfolio.projects.find((x) => x.slug === e.projectSlug) : undefined

  return (
    <article className="container-page max-w-3xl py-14 sm:py-20">
      <Link to="/#experience" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg"><ArrowLeftIcon />Experience</Link>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <p className="font-mono text-xs text-muted">{e.period}</p>
        {e.employmentType && <span className="tag">{e.employmentType}</span>}
      </div>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{e.role}</h1>
      <div className="mt-4 flex items-center gap-3">
        <OrgLogo name={e.organization} src={e.logo} />
        <p className="text-lg text-muted">{e.organization}{e.location && <span className="text-muted/80"> · {e.location}</span>}</p>
      </div>
      {e.isDemo && <p className="mt-3 text-sm text-accent">Sample content — replace this entry in src/data/portfolio.ts.</p>}
      <p className="mt-6 text-lg text-muted">{e.description}</p>
      {validUrl(e.url) && (
        <SafeLink href={e.url} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">View experience reference <ExternalIcon /></SafeLink>
      )}

      {images.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-panel border border-line">
          <ImageGallery key={e.slug} images={images} label={`${e.role} at ${e.organization}`} eager />
        </div>
      )}

      <div className="mt-12 space-y-10">
        <section><h2 className="text-xl font-semibold">Responsibilities</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-muted">{e.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul></section>
        {!!e.achievements?.length && <section><h2 className="text-xl font-semibold">Achievements & contributions</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-muted">{e.achievements.map((a) => <li key={a}>{a}</li>)}</ul></section>}
        {!!e.stack?.length && <section><h2 className="text-xl font-semibold">Built with</h2><ul className="mt-3 flex flex-wrap gap-2">{e.stack.map((t) => <li key={t} className="tag">{t}</li>)}</ul></section>}
        {project && <section><h2 className="text-xl font-semibold">Related project</h2><p className="mt-2 text-muted"><Link to={`/portfolio/projects/${project.slug}`} className="font-medium text-accent hover:underline">{project.title}</Link> — read the full case study.</p></section>}
      </div>
    </article>
  )
}
