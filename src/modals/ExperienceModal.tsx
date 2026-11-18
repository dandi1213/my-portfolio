import React, { useEffect } from 'react';
import {
  Briefcase,
  Calendar,
  Award,
  Building2,
  MapPin,
  Users,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';

interface ExperienceModalProps {
  experienceItem: ExperienceItem | null;
  allItems?: ExperienceItem[];
  onSelectExperience: (item: ExperienceItem) => void;
  onClose: () => void;
}

export function ExperienceModal({
  experienceItem,
  allItems = [],
  onSelectExperience,
  onClose
}: ExperienceModalProps) {
  useEffect(() => {
    if (!experienceItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (allItems.length > 1 && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        const currentIdx = allItems.findIndex((item) => item.id === experienceItem.id);
        if (currentIdx === -1) return;
        const nextIdx =
          e.key === 'ArrowRight'
            ? (currentIdx + 1) % allItems.length
            : (currentIdx - 1 + allItems.length) % allItems.length;
        onSelectExperience(allItems[nextIdx]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [experienceItem, allItems, onSelectExperience, onClose]);

  if (!experienceItem) return null;

  const currentIdx = allItems.findIndex((item) => item.id === experienceItem.id);
  const hasMultiple = allItems.length > 1 && currentIdx !== -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overscroll-contain select-none sm:select-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-exp-title"
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      <div
        className="relative w-full max-w-3xl h-[88vh] max-h-[88vh] flex flex-col rounded-3xl bg-[#111114] border border-white/15 shadow-2xl shadow-black/90 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── HEADER (JUDUL, METADATA & TOMBOL CLOSE) STATIS DI ATAS ── */}
        <div className="p-5 sm:p-7 border-b border-white/10 bg-[#141418] shrink-0 select-none z-20">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-950">
                  <Briefcase className="w-3.5 h-3.5" />
                  {experienceItem.type}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-zinc-300 bg-white/[0.05] border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  {experienceItem.period}
                </span>
                {experienceItem.highlightMetric && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-zinc-200 bg-white/[0.04] border border-white/10">
                    <Award className="w-3.5 h-3.5 text-zinc-300" />
                    {experienceItem.highlightMetric}
                  </span>
                )}
              </div>

              <h3
                id="modal-exp-title"
                className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight leading-snug"
              >
                {experienceItem.role}
              </h3>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-zinc-400">
                <span className="font-semibold text-zinc-200 inline-flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
                  {experienceItem.organization}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {experienceItem.location}
                </span>
                {experienceItem.teamContext && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-zinc-300">
                      <Users className="w-3.5 h-3.5 text-zinc-400" />
                      {experienceItem.teamContext}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Tombol Close Statis (Selalu di pojok kanan atas) */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close role dossier"
              className="p-2 sm:p-2.5 rounded-full bg-white/[0.08] hover:bg-white/20 text-zinc-200 border border-white/15 transition-all shrink-0 hover:scale-105 active:scale-95 shadow-lg shadow-black/40 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── MODAL BODY: DAPAT DISCROLL BEBAS TANPA MEMPENGARUHI HALAMAN UTAMA ── */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 sm:space-y-7 overscroll-contain">
          {Array.isArray(experienceItem.impactStats) && experienceItem.impactStats.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {experienceItem.impactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#09090B] border border-white/[0.08] text-center"
                >
                  <p className="text-base sm:text-xl lg:text-2xl font-display font-bold text-zinc-100">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Role Scope &amp; Mandate
            </h4>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {experienceItem.description}
            </p>
          </div>

          {Array.isArray(experienceItem.achievements) && experienceItem.achievements.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Key Deliverables &amp; Engineering Outcomes
              </h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {experienceItem.achievements.map((point, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/[0.025] border border-white/[0.07] flex items-start gap-3 text-sm text-zinc-200 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-zinc-100 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Core Technologies &amp; Focus Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {experienceItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/[0.04] text-zinc-200 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {hasMultiple && (
            <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onSelectExperience(
                      allItems[(currentIdx - 1 + allItems.length) % allItems.length]
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev Role</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onSelectExperience(allItems[(currentIdx + 1) % allItems.length])
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors cursor-pointer"
                >
                  <span>Next Role</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
