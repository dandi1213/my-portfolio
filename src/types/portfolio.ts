export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
}

export interface PersonalInfo {
  brandName: string;
  fullName: string;
  profilePhoto: string;
  secondaryPhoto?: string;
  roles: string[];
  heroBio: string;
  aboutParagraphs: string[];
  location: string;
  educationSummary: string;
  experienceSummary: string;
  email: string;
  socials: SocialLinks;
  cvUrl: string;
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  location: string;
  honors: string;
  description: string;
  highlights: string[];
  logo?: string;
}

export interface SkillItem {
  name: string;
  category: string;
  key: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web Development' | 'IoT & Embedded Systems' | 'Industrial Automation' | 'Mobile Development' | string;
  year: string;
  client: string;
  description: string;
  images: string[];
  tags: string[];
  highlights: string[];
  liveUrl: string;
  repoUrl: string;
  architectureSnippet: string;
}

export interface ImpactStat {
  label: string;
  value: string;
}

export interface ExperienceItem {
  id: string;
  type: 'Work Experience' | 'Freelance' | 'Organization' | string;
  period: string;
  role: string;
  organization: string;
  location: string;
  teamContext: string;
  highlightMetric: string;
  description: string;
  achievements: string[];
  impactStats: ImpactStat[];
  tags: string[];
  image?: string;
  images?: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: 'Otomasi & IoT' | 'Software & Web' | 'Kompetisi' | string;
  credentialUrl?: string;
  credentialId?: string;
  description: string;
  skills: string[];
  image?: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  education: EducationItem[];
  certificates: CertificateItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
}
