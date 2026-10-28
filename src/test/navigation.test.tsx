// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen, within, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import App from '../App'
import { portfolio } from '../data/portfolio'

const Where = () => { const l = useLocation(); return <output data-testid="loc">{l.pathname + l.hash}</output> }
const setup = (path = '/') => { cleanup(); render(<MemoryRouter initialEntries={[path]}><App /><Where /></MemoryRouter>) }
const loc = () => screen.getByTestId('loc').textContent
const mainNav = () => within(screen.getByRole('navigation', { name: 'Main' }))

beforeAll(() => {
  Element.prototype.scrollIntoView = () => {}
  window.scrollTo = () => {}
  window.IntersectionObserver = class { observe() {} disconnect() {} unobserve() {} takeRecords() { return [] } } as never
})

describe('single-page main navigation', () => {
  it('navbar has exactly Home, About, Experience, Portfolio, Contact', () => {
    setup()
    expect(mainNav().getAllByRole('link').map((a) => a.textContent)).toEqual(['Home', 'About', 'Experience', 'Portfolio', 'Contact'])
  })
  it.each([['Home', '#home'], ['About', '#about'], ['Experience', '#experience'], ['Portfolio', '#portfolio'], ['Contact', '#contact']])('%s is an in-page anchor %s whose target exists', (label, hash) => {
    setup()
    expect(mainNav().getByRole('link', { name: label }).getAttribute('href')).toBe(hash)
    expect(document.getElementById(hash.slice(1))).toBeTruthy()
  })
  it('all five sections are on the one page, in order, with a single h1', () => {
    setup()
    const ids = ['home', 'about', 'experience', 'portfolio', 'contact'].map((id) => document.getElementById(id) as HTMLElement)
    expect(ids.every(Boolean)).toBe(true)
    ids.reduce((prev, el) => { expect(prev.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy(); return el })
    expect(screen.getAllByRole('heading', { level: 1 }).length).toBe(1)
  })
  it('clicking menu items never changes the route', async () => {
    setup()
    for (const l of ['About', 'Experience', 'Portfolio', 'Contact', 'Home']) await userEvent.click(mainNav().getByRole('link', { name: l }))
    expect(new URL('http://x' + loc()).pathname).toBe('/')
  })
  it('Let’s collaborate scrolls to Contact', () => {
    setup()
    expect(screen.getByRole('link', { name: /collaborate/i }).getAttribute('href')).toBe('#contact')
  })
  it('old URLs redirect to the matching section', () => {
    for (const s of ['about', 'experience', 'portfolio', 'contact']) { setup('/' + s); expect(loc()).toBe(`/#${s}`) }
  })
})

describe('home content', () => {
  it('"See my projects" opens the Projects detail page; CV link is the PDF', async () => {
    setup()
    expect(screen.getByText(/curiculum vitae/i).getAttribute('href')).toBe(portfolio.cvPath)
    await userEvent.click(screen.getByRole('link', { name: /see my projects/i }))
    expect(loc()).toBe('/portfolio/projects')
  })
  it('About shows exactly 2 education entries and the biodata fields', () => {
    setup()
    const about = within(document.getElementById('about')!.closest('section')!)
    expect(about.getAllByRole('heading', { level: 3 }).length).toBe(2)
    for (const education of portfolio.education) {
      // The logo file loads normally; initials appear only when it fails to load.
      if (education.logo) fireEvent.error(about.getByAltText(`${education.institution} logo`))
      const institution = about.getByText(education.institution)
      expect(institution.previousElementSibling?.textContent).toBe(
        education.institution.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase(),
      )
    }
    for (const l of ['Full name', 'Place & date of birth', 'Address', 'Email', 'Phone', 'Latest education', 'Interests', 'Expertise']) expect(about.getByText(l)).toBeTruthy()
  })
  it('Portfolio has 4 categories linking to their detail pages', async () => {
    setup()
    const sec = within(document.getElementById('portfolio')!.closest('section')!)
    expect(sec.getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['/portfolio/projects', '/portfolio/certificates', '/portfolio/awards', '/portfolio/tech-stack'])
    await userEvent.click(sec.getByRole('link', { name: /view awards/i }))
    expect(loc()).toBe('/portfolio/awards')
  })
  it('Contact: email is a working mailto link; phone is a working tel link', () => {
    setup()
    const contact = within(document.getElementById('contact')!.closest('section')!)
    expect(contact.getByText(portfolio.email).closest('a')?.getAttribute('href')).toBe(`mailto:${portfolio.email}`)
    expect(contact.getAllByText(portfolio.profile.phone)[0].closest('a')?.getAttribute('href')).toBe(`tel:${portfolio.profile.phone.replace(/[^\d+]/g, '')}`)
  })
})

describe('portfolio detail pages', () => {
  it.each([['/portfolio/projects', 'Projects'], ['/portfolio/certificates', 'Certificates'], ['/portfolio/awards', 'Awards'], ['/portfolio/tech-stack', 'Tech Stack']])('%s renders and its back button returns to the Portfolio section', async (path, title) => {
    setup(path)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(title)
    await userEvent.click(within(screen.getByRole('main')).getByRole('link', { name: 'Portfolio' }))
    expect(loc()).toBe('/#portfolio')
    expect(document.getElementById('portfolio')).toBeTruthy()
  })
  it('navbar on a detail page goes back to a section of the main page', async () => {
    setup('/portfolio/awards')
    expect(mainNav().getByRole('link', { name: 'Portfolio' }).getAttribute('aria-current')).toBe('true')
    await userEvent.click(mainNav().getByRole('link', { name: 'About' }))
    expect(loc()).toBe('/#about')
  })
  it('project detail opens from the list, unknown project/URL show 404', async () => {
    setup('/portfolio/projects')
    await userEvent.click(screen.getAllByRole('link', { name: 'Case study' })[0])
    expect(loc()).toBe(`/portfolio/projects/${portfolio.projects[0].slug}`)
    setup('/portfolio/projects/nope'); expect(screen.getByText(/this project doesn’t exist/i)).toBeTruthy()
    setup('/nope'); expect(screen.getByText('404')).toBeTruthy()
  })
  it('tech stack uses the configured logo paths and falls back to a placeholder tile', () => {
    setup('/portfolio/tech-stack')
    const imgs = [...document.querySelectorAll('main img')] as HTMLImageElement[]
    expect(imgs.map((i) => i.getAttribute('src'))).toEqual(portfolio.techStack.flatMap((g) => g.items.map((t) => t.logo)))
    fireEvent.error(imgs[0])
    expect(document.querySelectorAll('main img').length).toBe(imgs.length - 1)
    expect(screen.getByText('PY')).toBeTruthy()
  })
})
