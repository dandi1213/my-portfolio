import React, { useRef } from 'react';
import {
  Briefcase,
  Calendar,
  Award,
  ArrowUpRight,
  Building2,
  MapPin,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';

interface ExperienceProps {
  experience: ExperienceItem[];
  selectedExpType: string;
  setSelectedExpType: (type: string) => void;
  activeExpIndex: number;
  setActiveExpIndex: React.Dispatch<React.SetStateAction<number>>;
  onOpenExperienceModal: (item: ExperienceItem) => void;
}

export function Experience({
  experience,
  selectedExpType,
  setSelectedExpType,
  activeExpIndex,
  setActiveExpIndex,
  onOpenExperienceModal
}: ExperienceProps) {
  const expDragStartRef = useRef<{ x: number; y: number } | null>(null);
  const expDidDragRef = useRef(false);

  const expTypes = ['All', 'Work Experience', 'Organization'];
  const filteredExperience =
    selectedExpType === 'All'
      ? experience
      : experience.filter((item) => item.type === selectedExpType);
  const totalExpCount = filteredExperience.length;
  const safeExpIndex = totalExpCount > 0 ? activeExpIndex % totalExpCount : 0;

  const handlePrevExp = () => {
    if (totalExpCount <= 1) return;
    setActiveExpIndex((prev) => (prev - 1 + totalExpCount) % totalExpCount);
  };

  const handleNextExp = () => {
    if (totalExpCount <= 1) return;
    setActiveExpIndex((prev) => (prev + 1) % totalExpCount);
  };

  const handleExpPointerDown = (clientX: number, clientY: number) => {
    expDragStartRef.current = { x: clientX, y: clientY };
    expDidDragRef.current = false;
  };

  const handleExpPointerUp = (clientX: number, clientY: number) => {
    if (!expDragStartRef.current) return;
    const dx = clientX - expDragStartRef.current.x;
    const dy = clientY - expDragStartRef.current.y;
    expDragStartRef.current = null;

    if (Math.abs(dx) < 38 && Math.abs(dy) < 32) return;
    expDidDragRef.current = true;

    if (dx < -38 || dy < -32) {
      setActiveExpIndex((prev) => (prev + 1) % totalExpCount);
    } else {
      setActiveExpIndex((prev) => (prev - 1 + totalExpCount) % totalExpCount);
    }
  };

  return (
    <section id="experience" className="py-24 lg:py-32 relative border-t border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            title="Work"
            highlight="Experience"
            subtitle="Scrub the career timeline, flick through stacked role dossiers, or click the active card to inspect full impact metrics and deliverables."
          />
        </Reveal>

        <Reveal delay={80}>
          <div
            className="flex flex-wrap items-center justify-center gap-2.5 mb-10"
            role="tablist"
            aria-label="Filter experience by role type"
          >
            {expTypes.map((type) => {
              const isActive = selectedExpType === type;
              const count =
                type === 'All'
                  ? experience.length
                  : experience.filter((item) => item.type === type).length;

              return (
                <button
                  key={type}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setSelectedExpType(type);
                    setActiveExpIndex(0);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-950 font-semibold'
                      : 'bg-white/[0.035] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08]'
                  }`}
                >
                  <span>{type}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-zinc-950/15 text-zinc-950' : 'bg-white/[0.06] text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {totalExpCount > 0 && (
          <Reveal delay={140}>
            <div className="max-w-4xl mx-auto mb-10">
              <div className="relative p-4 sm:p-5 rounded-2xl bg-[#111114] border border-white/[0.08]">
                {totalExpCount > 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden sm:block absolute left-12 right-12 top-[34px] h-[2px] bg-white/[0.08] rounded-full overflow-hidden"
                  >
                    <div
                      className="h-full bg-zinc-200 transition-all duration-500 ease-out"
                      style={{
                        width: `${(safeExpIndex / (totalExpCount - 1)) * 100}%`
                      }}
                    />
                  </div>
                )}

                <div
                  className="grid gap-3"
                  style={{
                    gridTemplateColumns: `repeat(${totalExpCount}, minmax(0, 1fr))`
                  }}
                >
                  {filteredExperience.map((item, idx) => {
                    const isSelected = idx === safeExpIndex;
                    const isPastOrActive = idx <= safeExpIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveExpIndex(idx)}
                        aria-label={`Jump to ${item.role} (${item.period})`}
                        className="group relative flex flex-col items-center text-center focus:outline-none"
                      >
                        <span
                          className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-semibold border transition-all duration-300 ${
                            isSelected
                              ? 'bg-zinc-100 text-zinc-950 border-zinc-100 scale-110 shadow-lg shadow-black/60'
                              : isPastOrActive
                              ? 'bg-[#1A1A20] text-zinc-200 border-white/25 hover:border-white/50'
                              : 'bg-[#09090B] text-zinc-500 border-white/10 hover:border-white/30 hover:text-zinc-300'
                          }`}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>

                        <span
                          className={`mt-2.5 text-[11px] font-mono transition-colors ${
                            isSelected
                              ? 'text-zinc-100 font-semibold'
                              : 'text-zinc-500 group-hover:text-zinc-300'
                          }`}
                        >
                          {item.period}
                        </span>

                        <span
                          className={`hidden md:block mt-0.5 text-xs truncate max-w-[175px] transition-colors ${
                            isSelected
                              ? 'text-zinc-300 font-medium'
                              : 'text-zinc-500 group-hover:text-zinc-400'
                          }`}
                        >
                          {item.organization}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              className="exp-stack-stage relative max-w-4xl mx-auto h-[515px] sm:h-[465px] lg:h-[445px] select-none touch-pan-y"
              onMouseDown={(e) => handleExpPointerDown(e.clientX, e.clientY)}
              onMouseUp={(e) => handleExpPointerUp(e.clientX, e.clientY)}
              onTouchStart={(e) => {
                if (e.touches[0]) {
                  handleExpPointerDown(e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              onTouchEnd={(e) => {
                if (e.changedTouches[0]) {
                  handleExpPointerUp(
                    e.changedTouches[0].clientX,
                    e.changedTouches[0].clientY
                  );
                }
              }}
            >
              {filteredExperience.map((item, idx) => {
                const stackOffset = (idx - safeExpIndex + totalExpCount) % totalExpCount;
                const isFront = stackOffset === 0;
                const isPeekCard = stackOffset === 1 || stackOffset === 2;
                const isVisible = isFront || isPeekCard;

                const translateY = isFront
                  ? 0
                  : stackOffset === 1
                  ? 26
                  : stackOffset === 2
                  ? 48
                  : 64;
                const scale = isFront
                  ? 1
                  : stackOffset === 1
                  ? 0.955
                  : stackOffset === 2
                  ? 0.91
                  : 0.86;
                const rotateX = isFront ? 0 : stackOffset === 1 ? -1.5 : -3;

                const cardStyle: React.CSSProperties = {
                  transform: `translate3d(0, ${translateY}px, ${
                    -stackOffset * 40
                  }px) scale(${scale}) rotateX(${rotateX}deg)`,
                  opacity: !isVisible ? 0 : isFront ? 1 : stackOffset === 1 ? 0.72 : 0.42,
                  zIndex: 30 - stackOffset * 8,
                  pointerEvents: isVisible ? 'auto' : 'none',
                  transition:
                    'transform 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 380ms ease, border-color 300ms ease'
                };

                return (
                  <article
                    key={item.id}
                    style={cardStyle}
                    onClick={() => {
                      if (expDidDragRef.current) {
                        expDidDragRef.current = false;
                        return;
                      }
                      if (!isFront && isVisible) {
                        setActiveExpIndex(idx);
                        return;
                      }
                      if (isFront) {
                        onOpenExperienceModal(item);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (isFront && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        onOpenExperienceModal(item);
                      }
                    }}
                    tabIndex={isFront ? 0 : -1}
                    role="button"
                    aria-label={
                      isFront
                        ? `Open full dossier for ${item.role} at ${item.organization}`
                        : `Bring ${item.role} at ${item.organization} to front`
                    }
                    aria-hidden={!isVisible}
                    className={`group absolute inset-x-0 top-0 h-[445px] sm:h-[400px] lg:h-[385px] rounded-3xl bg-[#111114] border p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-black/75 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 overflow-hidden ${
                      isFront
                        ? 'border-white/25 hover:border-white/45'
                        : 'border-white/[0.09] hover:border-white/25'
                    }`}
                  >
                    {isFront && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/[0.06] via-transparent to-white/[0.02] pointer-events-none"
                      />
                    )}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-white/[0.08]">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-950">
                            <Briefcase className="w-3.5 h-3.5" />
                            {item.type}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08]">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                            {item.period}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.highlightMetric && (
                            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-zinc-200 bg-white/[0.04] border border-white/10">
                              <Award className="w-3.5 h-3.5 text-zinc-300" />
                              {item.highlightMetric}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-zinc-400 group-hover:text-zinc-100 bg-white/[0.03] border border-white/[0.07] transition-colors">
                            <span>Inspect Dossier</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                        <div>
                          <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-zinc-100 tracking-tight leading-snug">
                            {item.role}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-zinc-400 mt-1">
                            <span className="font-semibold text-zinc-200 inline-flex items-center gap-1.5">
                              <Building2 className="w-4 h-4 text-zinc-400" />
                              {item.organization}
                            </span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                              {item.location}
                            </span>
                          </div>
                        </div>

                        {Array.isArray(item.impactStats) && item.impactStats[0] && (
                          <div className="hidden md:flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-[#09090B] border border-white/[0.07] shrink-0">
                            {item.impactStats.slice(0, 2).map((stat) => (
                              <div key={stat.label} className="text-right">
                                <p className="text-sm font-display font-bold text-zinc-100">
                                  {stat.value}
                                </p>
                                <p className="text-[10px] text-zinc-500">{stat.label}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] text-zinc-200 border border-white/[0.08]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span className="text-xs font-semibold text-zinc-200 group-hover:text-white inline-flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-zinc-400" />
                        <span>View Full Breakdown</span>
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
              <p className="text-xs font-mono text-zinc-500">
                Role {String(safeExpIndex + 1).padStart(2, '0')} of{' '}
                {String(totalExpCount).padStart(2, '0')} • Swipe card or click stacked edge
              </p>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrevExp}
                  disabled={totalExpCount <= 1}
                  aria-label="Previous role card"
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] disabled:opacity-40 text-zinc-200 border border-white/10 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNextExp}
                  disabled={totalExpCount <= 1}
                  aria-label="Next role card"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-zinc-100 hover:bg-white disabled:opacity-40 transition-colors"
                >
                  <span>Next Card</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
