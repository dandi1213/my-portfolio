import { useState, type FormEvent } from 'react'
import { portfolio as p } from '../data/portfolio'
import { SectionHeading } from '../components/SectionHeading'
import { SafeLink } from '../components/SafeLink'
import { MailIcon, PhoneIcon, PinIcon, socialIcon } from '../components/Icons'
import { validEmail, validPhone } from '../lib/placeholder'

const field = 'mt-1.5 w-full rounded-control border border-line bg-surface px-3 py-2.5 text-sm placeholder:text-muted/70 focus:border-accent'

export function Contact() {
  const email = validEmail(p.email)
  const phone = validPhone(p.profile.phone)
  const [notice, setNotice] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      setNotice('Email is not configured yet. Set `email` in src/data/portfolio.ts to enable this form.')
      return
    }
    const d = new FormData(e.currentTarget)
    const body = `${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Message from ${d.get('name')}`)}&body=${encodeURIComponent(body)}`
    setNotice('Your email app should open with the message ready to send.')
  }

  return (
    <section aria-labelledby="contact" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading id="contact" title="Let’s work together" lead="I’m open to junior developer roles, internships and small projects. Send a message and I’ll reply by email." />
          <ul className="space-y-3 text-sm">
            <li>
              <SafeLink href={email ? `mailto:${email}` : undefined} className="inline-flex items-center gap-3 text-muted hover:text-fg"><MailIcon />{p.email}</SafeLink>
            </li>
            <li>
              <SafeLink href={phone ? `tel:${phone}` : undefined} className="inline-flex items-center gap-3 text-muted hover:text-fg"><PhoneIcon />{p.profile.phone}</SafeLink>
            </li>
            <li><span className="inline-flex items-center gap-3 text-muted"><PinIcon />{p.profile.address}</span></li>
            {p.social.map((s) => (
              <li key={s.label}><SafeLink href={s.url} className="inline-flex items-center gap-3 text-muted hover:text-fg">{socialIcon(s.label)}{s.label}</SafeLink></li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
          <div><label htmlFor="c-name" className="text-sm font-medium">Name</label><input id="c-name" name="name" required autoComplete="name" className={field} /></div>
          <div><label htmlFor="c-email" className="text-sm font-medium">Your email</label><input id="c-email" name="email" type="email" required autoComplete="email" className={field} /></div>
          <div><label htmlFor="c-msg" className="text-sm font-medium">Message</label><textarea id="c-msg" name="message" rows={5} required className={field} /></div>
          <button type="submit" className="btn btn-primary">Open in email app</button>
          <p role="status" className="min-h-5 text-sm text-muted">{notice}</p>
        </form>
      </div>
    </section>
  )
}
