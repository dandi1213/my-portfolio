import React, { useState, useEffect } from 'react';
import { ArrowUp, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { ProjectItem, ExperienceItem } from './types/portfolio';
import { Navbar, NavItem } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Certificates } from './components/Certificates';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './modals/ProjectModal';
import { ExperienceModal } from './modals/ExperienceModal';

export default function App() {
  const { personal, education, certificates, skills, projects, experience } = PORTFOLIO_DATA;

  // Navigation & Scroll State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Modal & Experience Filter States
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const [selectedExpType, setSelectedExpType] = useState('All');
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const [expModalItem, setExpModalItem] = useState<ExperienceItem | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' }
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? '' : prev));
    }, 3200);
  };

  // Lock background body scroll when any modal is open
  useEffect(() => {
    const isModalOpen = Boolean(selectedProject || expModalItem);
    if (isModalOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
    } else {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedProject, expModalItem]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;

      setScrollProgress(progress);
      setIsScrolled(scrollTop > 24);
      setShowBackToTop(scrollTop > 480);

      const sectionIds = ['home', 'about', 'education', 'skills', 'projects', 'experience', 'certificates', 'contact'];
      const offsetPosition = scrollTop + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= offsetPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredExperience =
    selectedExpType === 'All'
      ? experience
      : experience.filter((item) => item.type === selectedExpType);

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 selection:bg-zinc-200 selection:text-zinc-950 overflow-x-hidden font-sans">
      <Navbar
        brandName={personal.brandName}
        navItems={navItems}
        activeSection={activeSection}
        isScrolled={isScrolled}
        scrollProgress={scrollProgress}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onNavigate={scrollToSection}
        cvUrl={personal.cvUrl}
      />

      <main>
        <Hero personal={personal} onNavigate={scrollToSection} />
        <About
          personal={personal}
          onNavigate={scrollToSection}
        />
        <Education education={education} />
        <Skills skills={skills} />
        <Projects
          projects={projects}
          onOpenProjectModal={(project) => setSelectedProject(project)}
        />
        <Experience
          experience={experience}
          selectedExpType={selectedExpType}
          setSelectedExpType={setSelectedExpType}
          activeExpIndex={activeExpIndex}
          setActiveExpIndex={setActiveExpIndex}
          onOpenExperienceModal={(item) => setExpModalItem(item)}
        />
        <Certificates certificates={certificates} />
        <Contact personal={personal} onShowToast={showToast} />
      </main>

      <Footer personal={personal} />

      {showBackToTop && (
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-30 p-3.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 shadow-xl shadow-black/70 transition-all"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onShowToast={showToast}
      />

      <ExperienceModal
        experienceItem={expModalItem}
        allItems={filteredExperience}
        onSelectExperience={(nextItem) => {
          setExpModalItem(nextItem);
          const idx = filteredExperience.findIndex((item) => item.id === nextItem.id);
          if (idx !== -1) setActiveExpIndex(idx);
        }}
        onClose={() => setExpModalItem(null)}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-zinc-100 text-zinc-950 text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
