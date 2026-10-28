import { portfolio as p } from '../data/portfolio'
import { SectionHeading } from '../components/SectionHeading'
import { ImageGallery } from '../components/ImageGallery'
import { getGalleryImages } from '../lib/images'
import { SafeLink } from '../components/SafeLink'
import { ExternalIcon } from '../components/Icons'
import { validUrl } from '../lib/placeholder'

export default function CertificatesPage() {
  return (
    <section aria-labelledby="certificates" className="section">
      <div className="container-page">
        <SectionHeading id="certificates" title="Certificates" lead="Courses and training I have completed." back={{ to: '/#portfolio', label: 'Portfolio' }} as="h1" />
        <div className="grid gap-6 md:grid-cols-2">
          {p.certificates.map((c) => (
            <article key={`${c.name}-${c.year}`} className="flex flex-col overflow-hidden rounded-panel border border-line bg-surface">
              <div className="overflow-hidden border-b border-line">
                <ImageGallery images={getGalleryImages(c, `Certificate: ${c.name}`)} label={c.name} placeholder={{ hint: 'certificate image goes here', fileName: 'certificate.jpg' }} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-xs text-muted">{c.year}</p>
                <h2 className="mt-1 text-lg font-semibold">{c.name}</h2>
                <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                {validUrl(c.url) && (
                  <SafeLink href={c.url} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">View certificate <ExternalIcon /></SafeLink>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
