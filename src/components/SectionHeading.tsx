import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from './Icons'

interface Props {
  id: string
  title: string
  lead?: string
  /** Optional "back" link shown above the title. */
  back?: { to: string; label: string }
  /** Use "h1" only on stand-alone pages; sections of the main page use "h2". */
  as?: 'h1' | 'h2'
}

export function SectionHeading({ id, title, lead, back, as: Tag = 'h2' }: Props) {
  return (
    <div className="mb-10 max-w-2xl">
      {back && <Link to={back.to} className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-fg"><ArrowLeftIcon />{back.label}</Link>}
      <Tag id={id} className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</Tag>
      {lead && <p className="mt-3 text-muted">{lead}</p>}
    </div>
  )
}
