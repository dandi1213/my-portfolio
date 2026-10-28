import { portfolio as p } from '../data/portfolio'
import { SectionHeading } from '../components/SectionHeading'
import { ImageGallery } from '../components/ImageGallery'
import { getGalleryImages } from '../lib/images'
import { SafeLink } from '../components/SafeLink'
import { ExternalIcon } from '../components/Icons'
import { validUrl } from '../lib/placeholder'

export default function AwardsPage() {
  return (
    <section aria-labelledby="awards" className="section">
      <div className="container-page">
        <SectionHeading id="awards" title="Awards" lead="Recognition and achievements." back={{ to: '/#portfolio', label: 'Portfolio' }} as="h1" />
        <ul className="grid gap-6 md:grid-cols-2">
          {p.awards.map((a) => {
            const images = getGalleryImages(a, `Award: ${a.title}`)
            return (
            <li key={`${a.title}-${a.year}`} className="rounded-panel border border-line bg-surface p-5">
              {images.length > 0 && <div className="mb-4 overflow-hidden rounded-control border border-line"><ImageGallery images={images} label={a.title} /></div>}
              <p className="font-mono text-xs text-muted">{a.year}</p>
              <h2 className="mt-1 text-lg font-semibold">{a.title}</h2>
              <p className="mt-1 text-sm text-muted">{a.issuer}</p>
              <p className="mt-3 text-sm text-muted">{a.description}</p>
              {validUrl(a.url) && (
                <SafeLink href={a.url} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">View award reference <ExternalIcon /></SafeLink>
              )}
            </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
