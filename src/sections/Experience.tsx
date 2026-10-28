import { Link } from 'react-router-dom'
import { portfolio as p } from '../data/portfolio'
import type { Experience as ExperienceItem, ExperienceKind } from '../data/types'
import { getGalleryImages } from '../lib/images'
import { OrgLogo } from '../components/OrgLogo'
import { SectionHeading } from '../components/SectionHeading'
import { ArrowRightIcon, BriefcaseIcon, UsersIcon } from '../components/Icons'

const GROUPS: { kind: ExperienceKind; title: string; hint: string; icon: React.ReactNode }[] = [
  { kind: 'work', title: 'Work & internship', hint: 'Professional experience', icon: <BriefcaseIcon /> },
  { kind: 'organization', title: 'Organizations', hint: 'Student & community involvement', icon: <UsersIcon /> },
]

/** Work and internship: a full card with the details a recruiter scans for (period, role, stack). */
function WorkCard({ e }: { e: ExperienceItem }) {
  const photos = getGalleryImages(e, e.role).length
  return (
    <li className="group relative flex flex-col rounded-panel border border-line bg-surface p-5 transition-colors focus-within:border-accent hover:border-accent/60 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <p className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">{e.period}</p>
        {e.employmentType && <span className="tag">{e.employmentType}</span>}
        {e.isDemo && <span className="tag text-accent">sample</span>}
      </div>
      <h4 className="mt-4 text-lg font-semibold leading-snug">{e.role}</h4>
      <div className="mt-3 flex items-center gap-3">
        <OrgLogo name={e.organization} src={e.logo} />
        <p className="min-w-0 text-sm text-muted">{e.organization}{e.location && <span className="text-muted/80"> · {e.location}</span>}</p>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">{e.description}</p>
      {!!e.stack?.length && <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">{e.stack.map((t) => <li key={t} className="tag">{t}</li>)}</ul>}
      <Link to={`/experience/${e.slug}`} className="mt-5 inline-flex items-center gap-2 border-t border-line pt-4 text-sm font-medium text-accent after:absolute after:inset-0 after:content-['']">
        View details
        <span className="transition-transform group-hover:translate-x-0.5"><ArrowRightIcon /></span>
        {photos > 0 && <span className="ml-auto font-mono text-xs font-normal text-muted">{photos} {photos === 1 ? 'photo' : 'photos'}</span>}
      </Link>
    </li>
  )
}

/** Organization: a lighter, tinted card with an accent edge so it reads as a different kind of entry. */
function OrgCard({ e }: { e: ExperienceItem }) {
  const photos = getGalleryImages(e, e.role).length
  return (
    <li className="group relative rounded-panel border border-l-[3px] border-line border-l-accent bg-accent/5 p-5 transition-colors focus-within:border-accent hover:border-accent/60 hover:border-l-accent sm:p-6">
      <div className="flex items-start gap-3">
        <OrgLogo name={e.organization} src={e.logo} />
        <p className="min-w-0 text-sm text-muted">{e.organization}{e.location && <span className="text-muted/80"> · {e.location}</span>}</p>
      </div>
      <h4 className="mt-4 text-lg font-semibold leading-snug">{e.role}</h4>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <p className="font-mono text-xs text-muted">{e.period}</p>
        {e.employmentType && <span className="tag">{e.employmentType}</span>}
        {e.isDemo && <span className="tag text-accent">sample</span>}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">{e.description}</p>
      {!!e.stack?.length && <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">{e.stack.map((t) => <li key={t} className="tag">{t}</li>)}</ul>}
      <Link to={`/experience/${e.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent after:absolute after:inset-0 after:content-['']">
        View details
        <span className="transition-transform group-hover:translate-x-0.5"><ArrowRightIcon /></span>
        {photos > 0 && <span className="font-mono text-xs font-normal text-muted">· {photos} {photos === 1 ? 'photo' : 'photos'}</span>}
      </Link>
    </li>
  )
}

/** Work / internship (left) and organization experience (right), side by side on large screens and stacked on mobile. */
export function Experience() {
  const groups = GROUPS.map((g) => ({ ...g, items: p.experience.filter((e) => e.kind === g.kind) })).filter((g) => g.items.length)
  if (!groups.length) return null
  return (
    <section aria-labelledby="experience" className="section border-b border-line">
      <div className="container-page">
        <SectionHeading id="experience" title="Experience" lead="Where I have interned and worked, and the organizations I have been part of." />
        <div className={`grid items-start gap-10 lg:gap-8 ${groups.length > 1 ? 'lg:grid-cols-2' : ''}`}>
          {groups.map((g) => (
            <div key={g.kind} className="min-w-0">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-control bg-accent/10 text-accent">{g.icon}</span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-tight">{g.title}</h3>
                  <p className="font-mono text-xs text-muted">{g.hint}</p>
                </div>
                <span className="ml-auto font-mono text-xs text-muted" aria-label={`${g.items.length} entries`}>{String(g.items.length).padStart(2, '0')}</span>
              </div>
              <ol className="space-y-4">
                {g.items.map((e) => (g.kind === 'work' ? <WorkCard key={e.slug} e={e} /> : <OrgCard key={e.slug} e={e} />))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
