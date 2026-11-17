import React from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
}

interface NavbarProps {
  brandName: string;
  navItems: NavItem[];
  activeSection: string;
  isScrolled: boolean;
  scrollProgress: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onNavigate: (sectionId: string) => void;
  cvUrl?: string;
}

export function Navbar({
  brandName,
  navItems,
  activeSection,
  isScrolled,
  scrollProgress,
  mobileMenuOpen,
  setMobileMenuOpen,
  onNavigate,
  cvUrl
}: NavbarProps) {
  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090B]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] bg-zinc-200 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="text-lg sm:text-xl font-bold tracking-tight text-zinc-100 hover:text-white transition-colors"
        >
          {brandName}
        </a>

        <nav
          className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.035] border border-white/[0.08] backdrop-blur-md"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={cvUrl || '#'}
            target={cvUrl ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-950 bg-zinc-100 hover:bg-white transition-all shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>Lihat CV</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          className="lg:hidden p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-zinc-200 border border-white/10 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-4 p-4 rounded-2xl bg-[#111114]/95 backdrop-blur-xl border border-white/12 shadow-2xl space-y-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'text-zinc-300 hover:bg-white/[0.06]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-white/10">
            <a
              href={cvUrl || '#'}
              target={cvUrl ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-zinc-950 bg-zinc-100 hover:bg-white transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Lihat CV</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
