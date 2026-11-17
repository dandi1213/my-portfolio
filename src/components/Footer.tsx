import React from 'react';
import { Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { NavItem } from './Navbar';

interface FooterProps {
  personal: PersonalInfo;
  navItems: NavItem[];
  onNavigate: (sectionId: string) => void;
}

export function Footer({ personal, navItems, onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-white/[0.08] py-12 bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-100" />
          <span className="font-display text-lg font-bold text-zinc-100">
            {personal.brandName}
          </span>
        </div>

        <nav aria-label="Footer Navigation" className="flex flex-wrap justify-center gap-5">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="text-xs sm:text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={personal.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <p>
          © {new Date().getFullYear()} {personal.fullName}. All rights reserved.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
