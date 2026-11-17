import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface CvModalProps {
  isOpen: boolean;
  data: PortfolioData;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export function CvModal({ isOpen, data, onClose, onShowToast }: CvModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { personal, education, experience, skills } = data;

  const handleDownloadFile = () => {
    const cvContent = [
      `${personal.fullName.toUpperCase()} — CURRICULUM VITAE`,
      `${personal.roles[0]}`,
      `Location: ${personal.location} | Email: ${personal.email}`,
      `GitHub: ${personal.socials.github} | LinkedIn: ${personal.socials.linkedin}`,
      `\nSUMMARY\n${personal.aboutParagraphs.join('\n')}`,
      `\nEXPERIENCE\n` +
        experience
          .map(
            (e) =>
              `- ${e.role} @ ${e.organization} (${e.period})\n  ${e.description}`
          )
          .join('\n'),
      `\nEDUCATION\n` +
        education
          .map((ed) => `- ${ed.degree} — ${ed.institution} (${ed.period})`)
          .join('\n'),
      `\nCORE TECHNICAL STACK\n${skills.map((s) => s.name).join(', ')}`
    ].join('\n');

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personal.fullName.replace(/\s+/g, '_')}_CV.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onShowToast('CV file downloaded successfully.');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111114] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Curriculum Vitae Preview
            </p>
            <h3 id="cv-modal-title" className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-1">
              {personal.fullName}
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              {personal.roles[0]} • {personal.location}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close CV preview"
            className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/15 text-zinc-300 border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 text-sm text-zinc-300">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Professional Profile
            </h4>
            <p className="leading-relaxed text-zinc-300">{personal.aboutParagraphs[0]}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
              Recent Experience
            </h4>
            <div className="space-y-2.5">
              {experience.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-[#09090B] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                >
                  <div>
                    <p className="font-semibold text-zinc-100">{item.role}</p>
                    <p className="text-xs text-zinc-400">{item.organization}</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{item.period}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
              Education
            </h4>
            <div className="space-y-2">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-3.5 rounded-2xl bg-[#09090B] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                >
                  <div>
                    <p className="font-semibold text-zinc-100">{edu.degree}</p>
                    <p className="text-xs text-zinc-400">{edu.institution}</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:bg-white/10 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleDownloadFile}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-950 bg-zinc-100 hover:bg-white transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download CV File</span>
          </button>
        </div>
      </div>
    </div>
  );
}
