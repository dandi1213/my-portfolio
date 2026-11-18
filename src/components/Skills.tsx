import React, { useRef, useEffect } from 'react';
import { SkillItem } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';
import { TechLogo } from './TechLogo';

interface SkillsProps {
  skills: SkillItem[];
}

export function Skills({ skills }: SkillsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef<number | null>(null);

  // Pause otomatis saat user menyentuh / menggeser layar
  const pauseAutoScrollTemporarily = () => {
    isUserInteractingRef.current = true;
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    // Lanjutkan otomatis bergeser setelah 2.5 detik jika tidak ada sentuhan lagi
    resumeTimeoutRef.current = window.setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 2500);
  };

  // ── Auto-Scroll Halus di HP (Ping-Pong Bolak-Balik Otomatis) ───────────────
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let rafId: number;
    let direction: 'right' | 'left' = 'right';
    let isPausedAtEdge = false;
    let edgeTimer: number | null = null;

    const SPEED = 0.55; // Kecepatan geser sangat lembut dan stabil

    const tick = () => {
      if (
        window.innerWidth < 640 &&
        el &&
        !isUserInteractingRef.current &&
        !isPausedAtEdge
      ) {
        const maxScroll = el.scrollWidth - el.clientWidth;

        if (maxScroll > 15) {
          if (direction === 'right') {
            el.scrollLeft += SPEED;
            if (el.scrollLeft >= maxScroll - 1) {
              isPausedAtEdge = true;
              edgeTimer = window.setTimeout(() => {
                direction = 'left';
                isPausedAtEdge = false;
              }, 1800); // Berhenti 1.8 detik di ujung kanan
            }
          } else {
            el.scrollLeft -= SPEED;
            if (el.scrollLeft <= 1) {
              isPausedAtEdge = true;
              edgeTimer = window.setTimeout(() => {
                direction = 'right';
                isPausedAtEdge = false;
              }, 1800); // Berhenti 1.8 detik di ujung kiri
            }
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (edgeTimer) window.clearTimeout(edgeTimer);
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // ── Mouse Drag Support untuk layar sentuh / desktop ────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el || window.innerWidth >= 640) return;
    pauseAutoScrollTemporarily();
    isMouseDownRef.current = true;
    isDraggingRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    startScrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el || !isMouseDownRef.current || window.innerWidth >= 640) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      isDraggingRef.current = true;
    }
    el.scrollLeft = startScrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isMouseDownRef.current = false;
    pauseAutoScrollTemporarily();
  };

  return (
    <section
      id="skills"
      className="py-24 lg:py-32 relative border-t border-white/[0.07]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Reveal>
          <div className="mb-10 sm:mb-12">
            <SectionHeader
              title="Skills &"
              highlight="Technologies"
              subtitle="Kumpulan bahasa pemrograman, kerangka kerja, database, dan alat teknologi yang saya kuasai."
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          {/* 
            Container Responsif:
            - Di HP: 2 baris kartu yang otomatis bergeser pelan tanpa bar scrollbar, dapat langsung diusap/disentuh kapan saja.
            - Di Desktop: Grid standar utuh yang menampilkan seluruh kartu sekaligus secara rapi (3 hingga 6 kolom).
          */}
          <div
            ref={scrollContainerRef}
            onTouchStart={pauseAutoScrollTemporarily}
            onTouchMove={pauseAutoScrollTemporarily}
            onTouchEnd={pauseAutoScrollTemporarily}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="skills-scroll-container grid grid-rows-2 grid-flow-col auto-cols-[135px] sm:auto-cols-auto sm:grid-rows-none sm:grid-flow-row sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible touch-pan-x select-none cursor-grab active:cursor-grabbing sm:cursor-default"
          >
            {skills.map((skill) => (
              <div
                key={skill.name}
                onClick={(e) => {
                  if (isDraggingRef.current) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
                className="group relative rounded-2xl p-3.5 sm:p-4 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-300 border border-white/[0.08] hover:border-white/30 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/70 w-[135px] sm:w-auto h-[128px] sm:h-auto shrink-0 sm:shrink"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(22,22,28,0.85) 40%, rgba(12,12,16,0.96) 100%)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow:
                    'inset 0 1px 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 6px 16px -4px rgba(0,0,0,0.5)',
                }}
              >
                {/* Bevel highlight */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                />
                {/* Diagonal Glass Sheen Highlight */}
                <div
                  aria-hidden="true"
                  className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-br from-white/[0.09] via-transparent to-transparent rounded-full blur-md pointer-events-none group-hover:scale-125 transition-transform duration-500"
                />

                {/* Category Tag */}
                <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 mb-1 tracking-wider uppercase opacity-85 group-hover:text-zinc-300 truncate max-w-full">
                  {skill.category.split(' ')[0]}
                </span>

                {/* Tech Logo */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 my-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 pointer-events-none">
                  <TechLogo skillKey={skill.key} />
                </div>

                {/* Tech Name */}
                <span className="mt-1 sm:mt-1.5 text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white transition-colors duration-200 line-clamp-1 max-w-full">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
