/**
 * One gallery image. A plain string is the path inside /public (e.g. "/projects/a.png");
 * use the object form to add alt text or a caption.
 */
export type MediaImage = string | { src: string; alt?: string; caption?: string }

/**
 * Shared by every item that can show pictures (projects, certificates, awards, experience).
 * - `image`  : the original single-image field. Still works, so old data needs no change.
 * - `images` : any number of pictures, shown as a swipeable gallery. When present it wins over `image`.
 */
export interface WithImages {
  image?: string
  images?: MediaImage[]
}

export interface Project extends WithImages {
  slug: string
  title: string
  summary: string
  problem: string
  role: string
  process: string
  outcome: string
  features: string[]
  stack: string[]
  repoUrl?: string
  demoUrl?: string
  // image / images: see WithImages. Leave both empty to show a placeholder.
  /** Remove this flag once the entry describes a real project. */
  isDemo?: boolean
}

export interface TechItem {
  name: string
  /** Path inside /public, e.g. "/assets/tech/react.svg". Missing file => placeholder tile. */
  logo: string
}

export interface TechGroup {
  category: string
  items: TechItem[]
}

export interface EducationEntry {
  institution: string
  /** Path inside /public, e.g. "/education/school-logo.png". Optional. */
  logo?: string
  program: string
  period: string
  description?: string
}

export interface Certificate extends WithImages {
  name: string
  issuer: string
  year: string
  // image / images: see WithImages (path inside /public, e.g. "/certificate/python.png"). Optional.
  /** Link to the certificate / credential. Optional. */
  url?: string
}

export type ExperienceKind = 'work' | 'organization'

export interface Experience extends WithImages {
  /** Used in the URL: /experience/:slug. Lowercase, no spaces. */
  slug: string
  /** "work" = job or internship, "organization" = student / community organization. */
  kind: ExperienceKind
  /** Company, institution or organization name. */
  organization: string
  /** Position held. */
  role: string
  /** Free text, e.g. "Feb 2025 – Jul 2025". */
  period: string
  /** Optional, e.g. "Cikarang, West Java". */
  location?: string
  /** Optional label, e.g. "Internship", "Full-time", "Committee". */
  employmentType?: string
  /** Optional logo path inside /public. Falls back to initials. */
  logo?: string
  /** Short summary shown on the main page card. */
  description: string
  /** Detailed duties, shown on the detail page. */
  responsibilities: string[]
  /** Contributions / results, shown on the detail page. */
  achievements?: string[]
  /** Optional link to a reference about this experience. */
  url?: string
  /** Tools and technologies. Optional. */
  stack?: string[]
  /** Slug of a related project (links to its case study). Optional. */
  projectSlug?: string
  /** Remove this flag once the entry describes a real experience. */
  isDemo?: boolean
}

export interface Award extends WithImages {
  title: string
  issuer: string
  year: string
  description: string
  /** Optional link to a reference or credential for the award. */
  url?: string
}

export interface Profile {
  fullName: string
  /** Path inside /public, e.g. "/profile.jpg". Empty => placeholder. */
  photo: string
  birth: string
  address: string
  phone: string
}

export interface SocialLink {
  label: string
  url: string
}

export interface Portfolio {
  name: string
  monogram: string
  title: string
  tagline: string
  intro: string
  focus: string[]
  openTo: string
  email: string
  cvPath: string
  social: SocialLink[]
  profile: Profile
  about: string[]
  /** Exactly two entries. The first one is treated as the latest education. */
  education: [EducationEntry, EducationEntry]
  /** Work, internship and organization experience, in the order they should appear (newest first). */
  experience: Experience[]
  projects: Project[]
  certificates: Certificate[]
  awards: Award[]
  techStack: TechGroup[]
  seo: { title: string; description: string }
}
