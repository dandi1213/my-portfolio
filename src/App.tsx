import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import ProjectPage from './pages/ProjectPage'
import ExperiencePage from './pages/ExperiencePage'
import CertificatesPage from './pages/CertificatesPage'
import AwardsPage from './pages/AwardsPage'
import TechStackPage from './pages/TechStackPage'
import NotFound from './pages/NotFound'
import { portfolio } from './data/portfolio'

/** Scrolls to the #section in the URL (or to the top) when the route changes. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const el = hash ? document.getElementById(hash.slice(1)) : null
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  useEffect(() => {
    document.title = portfolio.seo.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', portfolio.seo.description)
  }, [])
  return (
    <>
      <ScrollManager />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Old multi-page URLs keep working by pointing to the matching section. */}
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/experience" element={<Navigate to="/#experience" replace />} />
          <Route path="/experience/:slug" element={<ExperiencePage />} />
          <Route path="/portfolio" element={<Navigate to="/#portfolio" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="/portfolio/projects" element={<ProjectsPage />} />
          <Route path="/portfolio/projects/:slug" element={<ProjectPage />} />
          <Route path="/portfolio/certificates" element={<CertificatesPage />} />
          <Route path="/portfolio/awards" element={<AwardsPage />} />
          <Route path="/portfolio/tech-stack" element={<TechStackPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
