// @vitest-environment jsdom
import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { render, screen, within, cleanup, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import App from '../App'
import { ImageGallery } from '../components/ImageGallery'
import { getGalleryImages } from '../lib/images'
import { portfolio } from '../data/portfolio'

const Where = () => { const l = useLocation(); return <output data-testid="loc">{l.pathname + l.hash}</output> }
const setup = (path = '/') => { cleanup(); render(<MemoryRouter initialEntries={[path]}><App /><Where /></MemoryRouter>) }
const loc = () => screen.getByTestId('loc').textContent
const carousels = () => document.querySelectorAll('[aria-roledescription="carousel"]')
const three = ['/a.png', '/b.png', { src: '/c.png', caption: 'Third picture' }]

beforeAll(() => {
  Element.prototype.scrollIntoView = () => {}
  window.scrollTo = () => {}
  window.IntersectionObserver = class { observe() {} disconnect() {} unobserve() {} takeRecords() { return [] } } as never
})

// ----- data helper ---------------------------------------------------------
describe('getGalleryImages (backward compatible data)', () => {
  it('legacy single `image` still works', () => {
    expect(getGalleryImages({ image: '/x.png' }, 'X')).toEqual([{ src: '/x.png', alt: 'X', caption: undefined }])
  })
  it('no image at all gives an empty list (placeholder case)', () => {
    expect(getGalleryImages({}, 'X')).toEqual([])
    expect(getGalleryImages({ image: '' }, 'X')).toEqual([])
    expect(getGalleryImages({ images: [] }, 'X')).toEqual([])
  })
  it('`images` wins over `image`; empty paths and duplicates are dropped', () => {
    const list = getGalleryImages({ image: '/old.png', images: ['/a.png', '', '/a.png', '/b.png'] }, 'X')
    expect(list.map((i) => i.src)).toEqual(['/a.png', '/b.png'])
  })
  it('falls back to `image` when `images` has nothing usable', () => {
    expect(getGalleryImages({ image: '/old.png', images: [''] }, 'X').map((i) => i.src)).toEqual(['/old.png'])
  })
  it('alt text is numbered for several images and can be overridden', () => {
    const list = getGalleryImages({ images: ['/a.png', { src: '/b.png', alt: 'Custom', caption: 'Cap' }] }, 'Team')
    expect(list.map((i) => i.alt)).toEqual(['Team (1 of 2)', 'Custom'])
    expect(list[1].caption).toBe('Cap')
  })
})

// ----- gallery component ---------------------------------------------------
describe('ImageGallery', () => {
  const gallery = (n: number | 'caption') => {
    cleanup()
    const items = n === 'caption' ? three : three.slice(0, n)
    render(<ImageGallery images={getGalleryImages({ images: items }, 'Demo')} label="Demo" />)
  }

  it('renders the placeholder when empty, nothing when no placeholder is given', () => {
    cleanup()
    render(<ImageGallery images={[]} label="Demo" placeholder={{ hint: 'shot goes here', fileName: 'a.png' }} />)
    expect(screen.getByRole('img', { name: 'shot goes here' })).toBeTruthy()
    cleanup()
    const { container } = render(<ImageGallery images={[]} label="Demo" />)
    expect(container.innerHTML).toBe('')
  })

  it('one image: shown plainly, no carousel navigation, counter or dots', () => {
    gallery(1)
    expect(screen.getByRole('img', { name: 'Demo' })).toBeTruthy()
    expect(screen.queryByRole('region')).toBeNull()
    expect(screen.queryByRole('button', { name: /next image|previous image|go to image/i })).toBeNull()
    expect(screen.queryByText(/ \/ /)).toBeNull()
  })

  it('several images: carousel with counter, arrows and dots', async () => {
    gallery(3)
    expect(screen.getByRole('region', { name: 'Demo — images' }).getAttribute('aria-roledescription')).toBe('carousel')
    expect(screen.getByText('1 / 3')).toBeTruthy()
    expect((screen.getByRole('button', { name: 'Previous image' }) as HTMLButtonElement).disabled).toBe(true)
    await userEvent.click(screen.getByRole('button', { name: 'Next image' }))
    expect(screen.getByText('2 / 3')).toBeTruthy()
    await userEvent.click(screen.getByRole('button', { name: 'Go to image 3' }))
    expect(screen.getByText('3 / 3')).toBeTruthy()
    expect((screen.getByRole('button', { name: 'Next image' }) as HTMLButtonElement).disabled).toBe(true)
    await userEvent.click(screen.getByRole('button', { name: 'Previous image' }))
    expect(screen.getByText('2 / 3')).toBeTruthy()
    expect(screen.getAllByRole('group').map((g) => g.getAttribute('aria-label'))).toEqual(['1 of 3', '2 of 3', '3 of 3'])
  })

  it('arrow keys move between images', async () => {
    gallery(3)
    screen.getByRole('button', { name: 'Next image' }).focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByText('2 / 3')).toBeTruthy()
    await userEvent.keyboard('{ArrowLeft}')
    expect(screen.getByText('1 / 3')).toBeTruthy()
  })

  it('swiping (native scroll) updates the counter', async () => {
    gallery(3)
    const track = screen.getAllByRole('group')[0].parentElement as HTMLElement
    Object.defineProperty(track, 'clientWidth', { value: 300, configurable: true })
    Object.defineProperty(track, 'scrollLeft', { value: 600, configurable: true, writable: true })
    fireEvent.scroll(track)
    await waitFor(() => expect(screen.getByText('3 / 3')).toBeTruthy())
  })

  it('click opens the lightbox; Esc closes it and returns focus; it navigates and shows captions', async () => {
    gallery('caption')
    await userEvent.click(screen.getByRole('button', { name: /Enlarge: Demo \(1 of 3\)/ }))
    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByRole('img', { name: 'Demo (1 of 3)' })).toBeTruthy()
    expect(document.activeElement).toBe(within(dialog).getByRole('button', { name: 'Close image viewer' }))
    await userEvent.click(within(dialog).getByRole('button', { name: 'Next image' }))
    await userEvent.keyboard('{ArrowRight}')
    expect(within(dialog).getByText('3 / 3')).toBeTruthy()
    expect(within(dialog).getByText('Third picture')).toBeTruthy()
    expect(document.body.style.overflow).toBe('hidden')
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.body.style.overflow).not.toBe('hidden')
    // the carousel is now on the picture that was last viewed
    expect(screen.getAllByText('3 / 3').length).toBeGreaterThan(0)
    expect(document.activeElement?.getAttribute('aria-label')).toMatch(/Enlarge/)
  })

  it('lightbox: swipe left/right and close button', async () => {
    gallery(3)
    await userEvent.click(screen.getAllByRole('button', { name: /Enlarge/ })[0])
    const dialog = screen.getByRole('dialog')
    const stage = dialog.querySelector('img')!.parentElement as HTMLElement
    fireEvent.touchStart(stage, { touches: [{ clientX: 220, clientY: 10 }] })
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 100, clientY: 12 }] })
    expect(within(dialog).getByText('2 / 3')).toBeTruthy()
    fireEvent.touchStart(stage, { touches: [{ clientX: 100, clientY: 10 }] })
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 230, clientY: 10 }] })
    expect(within(dialog).getByText('1 / 3')).toBeTruthy()
    await userEvent.click(within(dialog).getByRole('button', { name: 'Close image viewer' }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('single image can also be enlarged, without arrows', async () => {
    gallery(1)
    await userEvent.click(screen.getByRole('button', { name: /Enlarge/ }))
    const dialog = screen.getByRole('dialog')
    expect(within(dialog).queryByRole('button', { name: /next image|previous image/i })).toBeNull()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('a broken image falls back to a placeholder tile instead of a broken icon', () => {
    gallery(2)
    fireEvent.error(screen.getAllByRole('img')[0])
    expect(screen.getByRole('img', { name: 'image could not be loaded' })).toBeTruthy()
  })
})

// ----- integrated pages ----------------------------------------------------
describe('galleries on pages (and old data keeps working)', () => {
  const restore: (() => void)[] = []
  afterEach(() => { restore.splice(0).forEach((fn) => fn()) })
  const patch = <T extends object>(obj: T, extra: Partial<T>) => {
    const before = { ...obj }
    Object.assign(obj, extra)
    restore.push(() => { for (const k of Object.keys(extra)) delete (obj as Record<string, unknown>)[k]; Object.assign(obj, before) })
  }

  it('certificates with a single legacy `image` show one plain image (no carousel)', () => {
    setup('/portfolio/certificates')
    expect(carousels().length).toBe(0)
    expect(screen.getAllByRole('img', { name: /^Certificate:/ }).length).toBe(portfolio.certificates.length)
  })

  it('a certificate with `images` gets a carousel; others are unchanged', () => {
    patch(portfolio.certificates[0], { images: ['/certificate/TOEFL.png', '/certificate/webinar.png'] })
    setup('/portfolio/certificates')
    expect(carousels().length).toBe(1)
    expect(screen.getByText('1 / 2')).toBeTruthy()
  })

  it('project detail: legacy image shows plainly; `images` gives a carousel; project without image shows placeholder', () => {
    setup(`/portfolio/projects/${portfolio.projects[0].slug}`)
    expect(carousels().length).toBe(0)
    expect(screen.getByRole('img', { name: /Screenshot of/ })).toBeTruthy()
    patch(portfolio.projects[0], { images: ['/projects/smart_agriculture.png', '/projects/whatsapp-monitoring-dashboard.jpeg', '/projects/FotoProfil.jpeg'] })
    setup(`/portfolio/projects/${portfolio.projects[0].slug}`)
    expect(screen.getByText('1 / 3')).toBeTruthy()
    setup(`/portfolio/projects/${portfolio.projects[2].slug}`)
    expect(screen.getByRole('img', { name: 'screenshot goes here' })).toBeTruthy()
  })

  it('project card shows how many images a project has', () => {
    patch(portfolio.projects[0], { images: ['/a.png', '/b.png'] })
    setup('/portfolio/projects')
    expect(screen.getByText('2 images')).toBeTruthy()
  })

  it('awards: gallery only when images exist', () => {
    setup('/portfolio/awards')
    expect(carousels().length).toBe(0)
    patch(portfolio.awards[0], { images: ['/a.png', '/b.png'] })
    setup('/portfolio/awards')
    expect(screen.getByText('1 / 2')).toBeTruthy()
  })

  it('awards show a reference link only when a valid URL is configured', () => {
    setup('/portfolio/awards')
    expect(screen.queryByRole('link', { name: /view award reference/i })).toBeNull()
    patch(portfolio.awards[0], { url: 'https://example.com/award' })
    setup('/portfolio/awards')
    expect(screen.getByRole('link', { name: /view award reference/i }).getAttribute('href')).toBe('https://example.com/award')
  })
})

// ----- experience ----------------------------------------------------------
describe('Experience', () => {
  const restore: (() => void)[] = []
  afterEach(() => { restore.splice(0).forEach((fn) => fn()) })

  it('is a section on the main page, between About and Portfolio, with work and organization groups', () => {
    setup()
    const sec = document.getElementById('experience')!.closest('section') as HTMLElement
    const order = ['about', 'experience', 'portfolio'].map((id) => document.getElementById(id) as HTMLElement)
    expect(order[0].compareDocumentPosition(order[1]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(order[1].compareDocumentPosition(order[2]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    const v = within(sec)
    expect(v.getByRole('heading', { level: 2 }).textContent).toBe('Experience')
    expect(v.getByRole('heading', { name: 'Work & internship' })).toBeTruthy()
    expect(v.getByRole('heading', { name: 'Organizations' })).toBeTruthy()
    for (const e of portfolio.experience) {
      expect(v.getByRole('heading', { level: 4, name: e.role })).toBeTruthy()
      expect(v.getByText(e.organization)).toBeTruthy()
    }
    expect(v.getAllByRole('link', { name: /view details/i }).map((a) => a.getAttribute('href'))).toEqual(portfolio.experience.map((e) => `/experience/${e.slug}`))
  })

  it('shows period, position, organization, summary; the sample entry is labelled', () => {
    setup()
    const v = within(document.getElementById('experience')!.closest('section') as HTMLElement)
    const work = portfolio.experience.find((e) => e.kind === 'work')!
    expect(v.getByText(work.period)).toBeTruthy()
    expect(v.getByText(work.description)).toBeTruthy()
    expect(v.getAllByText('sample').length).toBe(portfolio.experience.filter((e) => e.isDemo).length)
  })

  it('a group with no entries is hidden', () => {
    const saved = portfolio.experience
    portfolio.experience = saved.filter((e) => e.kind === 'work')
    restore.push(() => { portfolio.experience = saved })
    setup()
    expect(screen.queryByRole('heading', { name: 'Organizations' })).toBeNull()
    expect(screen.getByRole('heading', { name: 'Work & internship' })).toBeTruthy()
  })

  it('detail page: info first, then gallery, lists and related project; back goes to the Experience section', async () => {
    const work = portfolio.experience.find((e) => e.kind === 'work')!
    setup(`/experience/${work.slug}`)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(work.role)
    expect(screen.getByText(work.organization)).toBeTruthy()
    for (const r of work.responsibilities) expect(screen.getByText(r)).toBeTruthy()
    for (const a of work.achievements ?? []) expect(screen.getByText(a)).toBeTruthy()
    expect(screen.getByRole('link', { name: portfolio.projects[0].title }).getAttribute('href')).toBe(`/portfolio/projects/${portfolio.projects[0].slug}`)
    expect(within(screen.getByRole('navigation', { name: 'Main' })).getByRole('link', { name: 'Experience' }).getAttribute('aria-current')).toBe('true')
    await userEvent.click(within(screen.getByRole('main')).getByRole('link', { name: 'Experience' }))
    expect(loc()).toBe('/#experience')
  })

  it('experience details show a reference link only when a valid URL is configured', () => {
    const work = portfolio.experience.find((e) => e.kind === 'work')!
    setup(`/experience/${work.slug}`)
    expect(screen.queryByRole('link', { name: /view experience reference/i })).toBeNull()
    const saved = work.url
    work.url = 'https://example.com/experience'
    restore.push(() => { work.url = saved })
    setup(`/experience/${work.slug}`)
    expect(screen.getByRole('link', { name: /view experience reference/i }).getAttribute('href')).toBe('https://example.com/experience')
  })

  it('detail page gallery: single image is plain, several images give the carousel (same behavior as Projects)', () => {
    const work = portfolio.experience.find((e) => e.kind === 'work')!
    setup(`/experience/${work.slug}`)
    expect(carousels().length).toBe(0)
    const saved = work.images
    work.images = [...(saved ?? []), { src: '/certificate/TOEFL.png', caption: 'Team photo' }, '/certificate/webinar.png']
    restore.push(() => { work.images = saved })
    setup(`/experience/${work.slug}`)
    expect(screen.getByText('1 / 3')).toBeTruthy()
    expect(screen.getByRole('region', { name: /images$/ })).toBeTruthy()
  })

  it('entry without images shows no gallery at all; unknown slug shows 404; /experience redirects to the section', () => {
    const sample = portfolio.experience.find((e) => e.isDemo)!
    setup(`/experience/${sample.slug}`)
    expect(carousels().length).toBe(0)
    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.getByText(/sample content/i)).toBeTruthy()
    setup('/experience/nope'); expect(screen.getByText(/this experience doesn’t exist/i)).toBeTruthy()
    setup('/experience'); expect(loc()).toBe('/#experience')
  })

  it('logo falls back to initials even when the name starts with a bracket (sample entry)', () => {
    setup()
    const sec = within(document.getElementById('experience')!.closest('section') as HTMLElement)
    expect(sec.getByText('[ORGANIZATION NAME]').previousElementSibling?.textContent).toBe('ON')
    expect(sec.getByText('PT Indopoly Swakarsa Industry Tbk').previousElementSibling?.textContent).toBe('PI')
  })

  it('experience data is well-formed: unique slugs, valid kinds, related project exists', () => {
    const slugs = portfolio.experience.map((e) => e.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const e of portfolio.experience) {
      expect(['work', 'organization']).toContain(e.kind)
      expect(e.responsibilities.length).toBeGreaterThan(0)
      if (e.projectSlug) expect(portfolio.projects.some((p) => p.slug === e.projectSlug)).toBe(true)
    }
  })
})
