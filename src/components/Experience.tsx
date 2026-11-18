import React, { useRef } from 'react';
import {
  Award,
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';
import { Card3d } from './Card3d';

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
  onOpenExperienceModal,
}: ExperienceProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef<number | null>(null);
  const dragStartScrollRef = useRef(0);
  const didDragRef = useRef(false);

  const expTypes = ['All', 'Work Experience', 'Organization'];
  const filteredExperience =
    selectedExpType === 'All'
      ? experience
      : experience.filter((item) => item.type === selectedExpType);
  const safeActiveIndex =
    filteredExperience.length > 0 ? activeExpIndex % filteredExperience.length : 0;

  const scrollToExperience = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>('[data-experience-card]');
    const target = cards[index];
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    setActiveExpIndex(index);
  };

  const handleExperienceScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    const container = event.currentTarget;
    const cards = container.querySelectorAll<HTMLElement>('[data-experience-card]');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveExpIndex(closestIndex);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0 || window.innerWidth >= 768) return;
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = event.currentTarget.scrollLeft;
    didDragRef.current = false;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    const distance = event.clientX - dragStartXRef.current;
    if (Math.abs(distance) > 4) didDragRef.current = true;
    if (didDragRef.current) {
      event.currentTarget.scrollLeft = dragStartScrollRef.current - distance;
    }
  };

  const handleMouseUp = () => {
    dragStartXRef.current = null;
  };

  return (
    <section id="experience" className="py-24 lg:py-32 relative border-t border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            title="Work"
            highlight="Experience"
            subtitle="Pengalaman magang, proyek, dan organisasi yang mencerminkan keterlibatan saya dalam pengembangan teknologi serta kolaborasi tim."
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
                  className={`flex h-10 items-center justify-center gap-2 whitespace-nowrap px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-950 font-semibold'
                      : 'bg-white/[0.035] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08]'
                  }`}
                >
                  <span>{type}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-zinc-950/15 text-zinc-950'
                        : 'bg-white/[0.06] text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {filteredExperience.length > 0 && (
          <div
            ref={scrollContainerRef}
            onScroll={handleExperienceScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="experience-scroll-container -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 select-none cursor-grab active:cursor-grabbing sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:cursor-default lg:gap-8"
          >
            {filteredExperience.map((item, idx) => (
              <div
                key={item.id}
                data-experience-card
                className="w-[84vw] max-w-[350px] shrink-0 snap-center md:w-auto md:max-w-none"
              >
              <Reveal delay={idx * 100} className="h-full">
                <Card3d
                  maxTilt={7}
                  scale={1.015}
                  className="h-full rounded-2xl bg-[#111114] border border-white/[0.1] hover:border-white/25 p-5 sm:p-7 md:rounded-3xl flex flex-col shadow-2xl shadow-black/80 transition-all group overflow-hidden"
                >
                  <article
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      if (didDragRef.current) {
                        didDragRef.current = false;
                        event.preventDefault();
                        return;
                      }
                      onOpenExperienceModal(item);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        onOpenExperienceModal(item);
                      }
                    }}
                    className="flex h-full min-h-[310px] md:min-h-0 flex-col text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-xl"
                    aria-label={`View full details for ${item.role} at ${item.organization}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/[0.08] md:pb-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] md:text-xs font-semibold bg-zinc-100 text-zinc-950">
                        <Briefcase className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        <span className="max-w-[145px] truncate md:max-w-none">{item.type}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08]">
                        <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 text-zinc-400" />
                        <span className="max-w-[115px] truncate md:max-w-none">{item.period}</span>
                      </span>
                    </div>

                    <div className="flex-1 space-y-3 pt-4 md:space-y-4 md:pt-5">
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-100 tracking-tight leading-snug line-clamp-2">
                          {item.role}
                        </h3>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm text-zinc-400">
                          <span className="inline-flex max-w-full items-center gap-1.5 font-semibold text-zinc-200">
                            <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 text-zinc-400" />
                            <span className="truncate">{item.organization}</span>
                          </span>
                          <span className="hidden md:inline">•</span>
                          <span className="hidden md:inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {item.highlightMetric && (
                        <div className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.035] px-2.5 py-1.5 text-[10px] md:text-xs font-mono text-zinc-300">
                          <Award className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0 text-zinc-400" />
                          <span className="truncate">{item.highlightMetric}</span>
                        </div>
                      )}

                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-2 md:line-clamp-3">
                        {item.description}
                      </p>

                      {item.impactStats?.length > 0 && (
                        <div className="hidden md:grid grid-cols-3 gap-2">
                          {item.impactStats.slice(0, 3).map((stat) => (
                            <div
                              key={stat.label}
                              className="rounded-xl border border-white/[0.07] bg-[#09090B] px-2.5 py-3"
                            >
                              <p className="text-sm font-bold text-zinc-100">{stat.value}</p>
                              <p className="mt-1 text-[10px] text-zinc-500">{stat.label}</p>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>

                    <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-wrap items-end justify-between gap-2 md:mt-5 md:pt-5 md:gap-3">
                      <div className="flex min-w-0 flex-wrap gap-1.5">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="max-w-[110px] truncate px-2 py-1 rounded-lg text-[10px] md:text-[11px] font-medium bg-white/[0.04] text-zinc-200 border border-white/[0.08]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] md:text-xs font-semibold text-zinc-300 group-hover:text-white">
                        View Details
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </article>
                </Card3d>
              </Reveal>
              </div>
            ))}
          </div>
        )}

        {filteredExperience.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => scrollToExperience(Math.max(0, safeActiveIndex - 1))}
              disabled={safeActiveIndex === 0}
              aria-label="Pengalaman sebelumnya"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-zinc-300 disabled:opacity-20 transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5" aria-label="Pilih pengalaman">
              {filteredExperience.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToExperience(index)}
                  aria-label={`Ke pengalaman nomor ${index + 1}`}
                  aria-current={index === safeActiveIndex ? 'true' : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === safeActiveIndex
                      ? 'w-6 bg-zinc-100 shadow-sm'
                      : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                scrollToExperience(
                  Math.min(filteredExperience.length - 1, safeActiveIndex + 1)
                )
              }
              disabled={safeActiveIndex === filteredExperience.length - 1}
              aria-label="Pengalaman berikutnya"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-zinc-300 disabled:opacity-20 transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
