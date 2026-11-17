import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  AlertCircle,
  UserCheck,
  Workflow,
  Layers,
  Sparkles
} from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

interface ProjectSection {
  id: string;
  title: string;
  content: string;
  type: 'problem' | 'role' | 'process' | 'general';
}

function parseProjectDetails(description: string): {
  overview: string;
  sections: ProjectSection[];
} {
  if (!description) return { overview: '', sections: [] };

  const lines = description.split('\n');
  const sections: ProjectSection[] = [];
  let currentTitle = '';
  let currentContent: string[] = [];
  let overview = '';

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    // Match section headers like "Latar Belakang:", "Peran:", "Proses Pengembangan:", dll.
    const headerMatch = trimmed.match(/^([A-Za-zÀ-ÿ\s&/()-]+):$/);
    if (headerMatch && !headerMatch[1].toLowerCase().startsWith('http')) {
      if (currentTitle) {
        const text = currentContent.join('\n').trim();
        if (text) {
          sections.push(createSection(currentTitle, text));
        }
        currentContent = [];
      } else if (currentContent.length > 0) {
        overview = currentContent.join('\n').trim();
        currentContent = [];
      }
      currentTitle = headerMatch[1].trim();
    } else {
      currentContent.push(rawLine);
    }
  }

  if (currentTitle) {
    const text = currentContent.join('\n').trim();
    if (text) {
      sections.push(createSection(currentTitle, text));
    }
  } else if (currentContent.length > 0) {
    const remaining = currentContent.join('\n').trim();
    if (!overview) {
      overview = remaining;
    } else if (remaining) {
      const paragraphs = remaining.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
      paragraphs.forEach((p, idx) => {
        sections.push({
          id: `section-${idx}`,
          title: 'Detail Tambahan',
          content: p,
          type: 'general'
        });
      });
    }
  }

  return { overview, sections };
}

function createSection(title: string, content: string): ProjectSection {
  const lower = title.toLowerCase();
  let type: ProjectSection['type'] = 'general';
  let formattedTitle = title;

  if (lower.includes('latar') || lower.includes('masalah') || lower.includes('problem')) {
    type = 'problem';
    formattedTitle = 'Latar Belakang & Masalah';
  } else if (
    lower.includes('peran') &&
    (lower.includes('proses') || lower.includes('pengembangan'))
  ) {
    type = 'process';
    formattedTitle = 'Peran & Proses Pengembangan';
  } else if (lower.includes('peran') || lower.includes('role')) {
    type = 'role';
    formattedTitle = 'Peran & Tanggung Jawab';
  } else if (
    lower.includes('proses') ||
    lower.includes('pengembangan') ||
    lower.includes('alur') ||
    lower.includes('implementasi')
  ) {
    type = 'process';
    formattedTitle = 'Proses Pengembangan & Implementasi';
  }

  return {
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: formattedTitle,
    content,
    type
  };
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const images =
    project && Array.isArray(project.images) && project.images.length > 0
      ? project.images
      : [];

  useEffect(() => {
    setActiveImageIdx(0);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (images.length > 1 && e.key === 'ArrowRight') {
        setActiveImageIdx((prev) => (prev + 1) % images.length);
      } else if (images.length > 1 && e.key === 'ArrowLeft') {
        setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, images.length, onClose]);

  if (!project) return null;

  const currentImage = images[activeImageIdx] || images[0];
  const { overview, sections } = parseProjectDetails(project.description);

  const renderSectionIcon = (type: ProjectSection['type']) => {
    switch (type) {
      case 'problem':
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case 'role':
        return <UserCheck className="w-4 h-4 text-sky-400" />;
      case 'process':
        return <Workflow className="w-4 h-4 text-emerald-400" />;
      default:
        return <Layers className="w-4 h-4 text-zinc-300" />;
    }
  };

  const getSectionBadgeStyle = (type: ProjectSection['type']) => {
    switch (type) {
      case 'problem':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-300';
      case 'role':
        return 'bg-sky-500/10 border-sky-500/20 text-sky-300';
      case 'process':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300';
      default:
        return 'bg-white/[0.05] border-white/10 text-zinc-300';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111114] border border-white/15 shadow-2xl shadow-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Preview / Screenshot Carousel */}
        <div className="relative h-64 sm:h-80 lg:h-96 bg-[#09090B] overflow-hidden border-b border-white/10">
          {currentImage && (
            <img
              src={currentImage}
              alt={`${project.title} preview ${activeImageIdx + 1}`}
              className="w-full h-full object-cover transition-all duration-300"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-black/35 pointer-events-none" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project detail"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-zinc-100 border border-white/15 backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {images.length > 1 && (
            <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-xs font-mono text-zinc-200">
              Screenshot {activeImageIdx + 1} / {images.length}
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length)
                }
                aria-label="Previous project screenshot"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/70 hover:bg-zinc-100 text-zinc-100 hover:text-zinc-950 border border-white/15 backdrop-blur-md transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveImageIdx((prev) => (prev + 1) % images.length)}
                aria-label="Next project screenshot"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/70 hover:bg-zinc-100 text-zinc-100 hover:text-zinc-950 border border-white/15 backdrop-blur-md transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/75 border border-white/15 backdrop-blur-md">
              {images.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  aria-label={`View screenshot ${idx + 1}`}
                  className={`relative w-12 h-8 rounded-lg overflow-hidden border transition-all ${
                    idx === activeImageIdx
                      ? 'border-zinc-100 scale-105 opacity-100'
                      : 'border-white/15 opacity-55 hover:opacity-90'
                  }`}
                >
                  <img
                    src={imgSrc}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-7">
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-950">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono text-zinc-400 bg-white/[0.04] border border-white/[0.08]">
                {project.year} • {project.client}
              </span>
            </div>
            <h3
              id="project-modal-title"
              className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight"
            >
              {project.title}
            </h3>
          </div>

          {/* Overview / Ringkasan Proyek */}
          {overview && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.015] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                <span>Ringkasan Proyek</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                {overview}
              </p>
            </div>
          )}

          {/* Bagian Detail yang Dipisah-pisah (Latar Belakang, Peran, Proses Pengembangan) */}
          {sections.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Detail Pembahasan Proyek
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/15 transition-colors space-y-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-1.5 rounded-lg border flex items-center justify-center shrink-0 ${getSectionBadgeStyle(
                          section.type
                        )}`}
                      >
                        {renderSectionIcon(section.type)}
                      </div>
                      <h5 className="text-sm font-semibold text-zinc-100 tracking-tight">
                        {section.title}
                      </h5>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed pl-0 sm:pl-9 whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Highlights */}
          {Array.isArray(project.highlights) && project.highlights.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Fitur Utama &amp; Hasil Proyek
              </h4>
              <ul className="space-y-2.5">
                {project.highlights.map((item, idx) => {
                  const colonIdx = item.indexOf(':');
                  const hasLabel = colonIdx > 0 && colonIdx < 35;
                  const label = hasLabel ? item.substring(0, colonIdx) : '';
                  const rest = hasLabel ? item.substring(colonIdx + 1) : item;

                  return (
                    <li
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white/[0.025] border border-white/[0.07] flex items-start gap-3 text-sm text-zinc-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-zinc-100 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        {hasLabel ? (
                          <>
                            <strong className="text-zinc-100 font-semibold">{label}:</strong>
                            {rest}
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Teknologi &amp; Alat
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/[0.04] text-zinc-200 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:bg-white/10 transition-colors"
            >
              Tutup Detail
            </button>
            <div className="flex flex-wrap items-center gap-3">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 bg-white/[0.05] hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-950 bg-zinc-100 hover:bg-white transition-colors"
                >
                  <span>Open Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
