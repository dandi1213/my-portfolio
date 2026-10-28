import type { Project } from '../data/types'
import { getGalleryImages } from '../lib/images'
import { MediaThumb } from './MediaThumb'

/** Card thumbnail: the first picture of the project (the full gallery lives on the case-study page). */
export function ProjectThumb({ project, eager = false }: { project: Project; eager?: boolean }) {
  const first = getGalleryImages(project, `Screenshot of ${project.title}`)[0]
  return <MediaThumb src={first?.src} alt={first?.alt ?? `Screenshot of ${project.title}`} hint="screenshot goes here" fileName={`${project.slug}.png`} eager={eager} />
}
