import type { SVGProps } from 'react'

const base: SVGProps<SVGSVGElement> = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const SunIcon = () => (<svg {...base}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>)
export const MoonIcon = () => (<svg {...base}><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" /></svg>)
export const MenuIcon = () => (<svg {...base}><path d="M4 7h16M4 12h16M4 17h16" /></svg>)
export const CloseIcon = () => (<svg {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>)
export const ExternalIcon = () => (<svg {...base} width={15} height={15}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" /></svg>)
export const ArrowLeftIcon = () => (<svg {...base}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>)
export const MailIcon = () => (<svg {...base}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>)
export const PhoneIcon = () => (<svg {...base}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>)
export const PinIcon = () => (<svg {...base}><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>)
export const GithubIcon = () => (<svg {...base} fill="currentColor" stroke="none"><path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.100.6-1.400-2.200-.3-4.600-1.100-4.600-5 0-1.100.4-2 1-2.700-.1-.3-.4-1.300.1-2.700 0 0 .8-.3 2.700 1a9.400 9.400 0 015 0c1.900-1.300 2.700-1 2.700-1 .5 1.400.2 2.400.1 2.700.6.7 1 1.600 1 2.700 0 3.900-2.400 4.700-4.600 5 .4.3.7.9.7 1.900v2.800c0 .3.2.6.7.5A10 10 0 0012 2z" /></svg>)
export const LinkedinIcon = () => (<svg {...base} fill="currentColor" stroke="none"><path d="M4.5 3.5a2 2 0 110 4 2 2 0 010-4zM3 9h3v12H3zM9 9h2.900v1.700h.1c.4-.8 1.400-1.900 3.300-1.900 3.500 0 4.200 2.300 4.200 5.300V21h-3v-6c0-1.400 0-3.200-2-3.200s-2.300 1.500-2.300 3.100V21H9z" /></svg>)

export const socialIcon = (label: string) => {
  const l = label.toLowerCase()
  if (l.includes('github')) return <GithubIcon />
  if (l.includes('linkedin')) return <LinkedinIcon />
  return <ExternalIcon />
}

export const ChevronLeftIcon = () => (<svg {...base}><path d="M15 5l-7 7 7 7" /></svg>)
export const ChevronRightIcon = () => (<svg {...base}><path d="M9 5l7 7-7 7" /></svg>)
export const ExpandIcon = () => (<svg {...base} width={16} height={16}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>)
export const BriefcaseIcon = () => (<svg {...base}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M3 13h18" /></svg>)
export const UsersIcon = () => (<svg {...base}><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0112 0M16 5.2a3.2 3.2 0 010 5.6M18 14.5a6 6 0 013 5.5" /></svg>)
export const ArrowRightIcon = () => (<svg {...base} width={16} height={16}><path d="M5 12h14M13 6l6 6-6 6" /></svg>)
export const ChevronDownIcon = () => (<svg {...base} width={16} height={16}><path d="M6 9l6 6 6-6" /></svg>)
