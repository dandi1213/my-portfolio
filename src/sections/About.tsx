import { useState } from 'react'
import { portfolio as p } from '../data/portfolio'
import { SectionHeading } from '../components/SectionHeading'
import { SafeLink } from '../components/SafeLink'
import { validEmail, validPhone } from '../lib/placeholder'
import { ChevronDownIcon } from '../components/Icons'

function ProfilePhoto() {
  const [failed, setFailed] = useState(false)
  const frame = 'aspect-square w-full max-w-[260px] rounded-panel border border-line'
  if (p.profile.photo && !failed) {
    return <img src={p.profile.photo} alt={`Photo of ${p.profile.fullName}`} width={260} height={260} decoding="async" onError={() => setFailed(true)} className={`${frame} object-cover`} />
  }
  return (
    <div className={`${frame} grid place-content-center bg-surface text-center`} role="img" aria-label="Profile photo placeholder">
      <p className="font-mono text-5xl text-accent">{p.monogram}</p>
      <p className="mt-3 font-mono text-xs text-muted">// profile photo</p>
    </div>
  )
}

function EducationLogo({ institution, src }: { institution: string; src?: string }) {
  const [failed, setFailed] = useState(!src)
  const initials = institution
    .split(/\s+/)
    .filter((word) => /^[A-Z0-9]/i.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  if (failed) {
    return (
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-control border border-line bg-surface font-mono text-xs font-semibold text-accent" aria-hidden="true">
        {initials}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={`${institution} logo`}
      width={40}
      height={40}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-10 w-10 shrink-0 rounded-control border border-line bg-surface object-contain p-1"
    />
  )
}

export function About() {
  const email = validEmail(p.email)
  const phone = validPhone(p.profile.phone)
  const latest = p.education[0]
  const [open, setOpen] = useState(false)

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: 'Full name', value: p.profile.fullName },
    { label: 'Place & date of birth', value: p.profile.birth },
    { label: 'Address', value: p.profile.address },
    { label: 'Email', value: <SafeLink href={email ? `mailto:${email}` : undefined} className="hover:text-accent">{p.email}</SafeLink> },
    { label: 'Phone', value: <SafeLink href={phone ? `tel:${phone}` : undefined} className="hover:text-accent">{p.profile.phone}</SafeLink> },
    { label: 'Latest education', value: `${latest.program}, ${latest.institution}` },
  ]

  return (
    <section aria-labelledby="about" className="section border-b border-line">
      <div className="container-page">
        <SectionHeading id="about" title="About me" />

        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          <ProfilePhoto />
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">{p.about[0]}</p>

            {/* Collapsed by default. The content stays in the DOM and is hidden with visibility, so it is out of the tab order and screen readers until opened. */}
            <div
              id="about-more"
              className={`grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-out motion-reduce:transition-none ${open ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="max-w-2xl space-y-5 pt-5 text-lg leading-relaxed text-muted">
                  {p.about.slice(1).map((para) => <p key={para}>{para}</p>)}
                </div>
                <dl className="mt-10 divide-y divide-line border-y border-line">
                  {rows.map((r) => (
                    <div key={r.label} className="grid gap-1 py-4 sm:grid-cols-[200px_1fr] sm:gap-3">
                      <dt className="font-semibold">{r.label}</dt>
                      <dd className="text-muted">{r.value}</dd>
                    </div>
                  ))}
                  <div className="grid gap-3 py-4 sm:grid-cols-[200px_1fr]">
                    <dt className="font-semibold">Interests</dt>
                    <dd><ul className="flex flex-wrap gap-2">{p.focus.map((f) => <li key={f} className="tag text-sm text-fg">{f}</li>)}</ul></dd>
                  </div>
                  <div className="grid gap-3 py-4 sm:grid-cols-[200px_1fr]">
                    <dt className="font-semibold">Expertise</dt>
                    <dd><ul className="flex flex-wrap gap-2">{p.techStack.map((g) => <li key={g.category} className="tag text-sm text-fg">{g.category}</li>)}</ul></dd>
                  </div>
                </dl>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="about-more"
              className="btn btn-ghost mt-6"
            >
              {open ? 'View Less' : 'View More'}
              <span className={`transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}><ChevronDownIcon /></span>
            </button>
          </div>
        </div>

        <h2 className="mb-8 mt-20 text-2xl font-bold tracking-tight sm:text-3xl">Education</h2>
        <ol className="relative ml-2 border-l border-line">
          {p.education.map((e) => (
            <li key={`${e.institution}-${e.period}`} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-accent bg-bg" aria-hidden="true" />
              <p className="font-mono text-xs text-muted">{e.period}</p>
              <h3 className="mt-1 text-lg font-semibold">{e.program}</h3>
              <div className="mt-2 flex items-center gap-3">
                <EducationLogo institution={e.institution} src={e.logo} />
                <p className="text-muted">{e.institution}</p>
              </div>
              {e.description && <p className="mt-2 max-w-xl text-sm text-muted">{e.description}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
