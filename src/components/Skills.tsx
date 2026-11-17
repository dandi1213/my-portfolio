import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, LayoutGrid, Orbit } from 'lucide-react';
import { SkillItem } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';
import { TechLogo } from './TechLogo';

interface SkillsProps {
  skills: SkillItem[];
}

export function Skills({ skills }: SkillsProps) {
  // Mode tampilan: 'grid' untuk tampilan kartu responsif (sangat cocok untuk HP), 'carousel' untuk 3D
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 'grid' : 'carousel';
    }
    return 'carousel';
  });

  // Opsi rotasi otomatis (di HP default nonaktif agar hemat daya dan tidak lag)
  const [isAutoRotate, setIsAutoRotate] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return true;
  });

  const [rotY, setRotY] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [stageSize, setStageSize] = useState({
    radius: 360,
    cardW: 110,
    cardH: 122,
    stageH: 500,
    isMobile: false,
  });

  const rotYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isSteppingRef = useRef(false);
  const stepTimeoutRef = useRef<number | null>(null);
  const anyHoveredRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartRotRef = useRef(0);
  const hasMovedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Touch gesture tracking for mobile (mencegah scroll vertikal terblokir)
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchDirectionRef = useRef<'none' | 'horizontal' | 'vertical'>('none');

  const count = skills.length;
  const angleStep = 360 / count;

  /* ── Responsive sizing ───────────────────────────────────────── */
  useEffect(() => {
    const updateSize = () => {
      const w = containerRef.current?.clientWidth || window.innerWidth;
      const isMobile = w < 640;

      // Di HP radius disesuaikan agar card tidak saling menabrak
      const radius = isMobile
        ? Math.max(140, Math.min(185, w * 0.38))
        : Math.max(260, Math.min(380, w * 0.42));

      const cardW = isMobile ? 74 : 110;
      const cardH = isMobile ? 86 : 122;
      const stageH = isMobile ? 380 : 500;

      setStageSize({ radius, cardW, cardH, stageH, isMobile });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [viewMode]);

  /* ── Ultra-Smooth Auto-rotate loop (Tanpa CSS transition conflict) ─ */
  useEffect(() => {
    if (!isAutoRotate || viewMode !== 'carousel') {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const AUTO_SPEED = 0.22;
    const tick = () => {
      if (!isDraggingRef.current && !anyHoveredRef.current && !isSteppingRef.current) {
        rotYRef.current = (rotYRef.current + AUTO_SPEED) % 360;
        setRotY(rotYRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isAutoRotate, viewMode]);

  /* ── Step Transition Helper (Aktifkan easing hanya saat tombol/dot diklik) ─ */
  const triggerStep = useCallback((targetAngle: number) => {
    isSteppingRef.current = true;
    rotYRef.current = targetAngle;
    setRotY(targetAngle);

    if (stepTimeoutRef.current) window.clearTimeout(stepTimeoutRef.current);
    stepTimeoutRef.current = window.setTimeout(() => {
      isSteppingRef.current = false;
    }, 380);
  }, []);

  /* ── Drag & Touch handling (Smooth & Scroll Friendly) ─────────── */
  const startDrag = (clientX: number) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartXRef.current = clientX;
    dragStartRotRef.current = rotYRef.current;
  };

  const moveDrag = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const delta = clientX - dragStartXRef.current;
    if (Math.abs(delta) > 4) {
      hasMovedRef.current = true;
    }
    rotYRef.current = dragStartRotRef.current + delta * 0.42;
    setRotY(rotYRef.current);
  };

  const endDrag = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers: Mencegah scroll vertikal halaman HP terhambat
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartXRef.current = t.clientX;
    touchStartYRef.current = t.clientY;
    touchDirectionRef.current = 'none';
    startDrag(t.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStartXRef.current;
    const dy = t.clientY - touchStartYRef.current;

    if (touchDirectionRef.current === 'none') {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        // Niat scroll vertikal: lepas drag, biarkan halaman bergulir normal
        touchDirectionRef.current = 'vertical';
        isDraggingRef.current = false;
        return;
      }
      if (Math.abs(dx) > 8) {
        touchDirectionRef.current = 'horizontal';
      }
    }

    if (touchDirectionRef.current === 'horizontal') {
      if (e.cancelable) e.preventDefault();
      moveDrag(t.clientX);
    }
  };

  const handleTouchEnd = () => {
    touchDirectionRef.current = 'none';
    endDrag();
  };

  /* ── Rotate to specific card ─────────────────────────────────── */
  const rotateToCard = useCallback(
    (index: number) => {
      const targetAngle = -(index * angleStep);
      const current = rotYRef.current;
      const diff = ((targetAngle - current) % 360 + 540) % 360 - 180;
      triggerStep(current + diff);
    },
    [angleStep, triggerStep]
  );

  const stepNext = () => {
    triggerStep(rotYRef.current - angleStep);
  };

  const stepPrev = () => {
    triggerStep(rotYRef.current + angleStep);
  };

  /* ── Hover interactions ──────────────────────────────────────── */
  const enterSkill = (name: string) => {
    anyHoveredRef.current = true;
    setHoveredSkill(name);
  };

  const leaveSkill = () => {
    anyHoveredRef.current = false;
    setHoveredSkill(null);
  };

  const { radius, cardW, cardH, stageH, isMobile } = stageSize;

  // Active front skill calculation
  const activeFrontIndex =
    Math.round(((-rotY % 360 + 360) % 360) / angleStep) % count;

  return (
    <section
      id="skills"
      className="py-24 lg:py-32 relative border-t border-white/[0.07]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Reveal>
          <SectionHeader
            title="Skills &"
            highlight="Technologies"
            subtitle="Daftar keahlian dan teknologi yang saya kuasai, dapat dilihat dalam format grid modern yang rapi atau 3D interaktif."
          />
        </Reveal>

        {/* ── View & Animation Control Bar ──────────────────────── */}
        <Reveal delay={60}>
          <div className="flex flex-wrap items-center justify-between gap-3 mt-8 mb-6">
            {/* View Switcher: Grid vs 3D Carousel */}
            <div className="inline-flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-zinc-950 font-semibold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Tampilkan semua keahlian dalam grid rapi"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'carousel'
                    ? 'bg-white text-zinc-950 font-semibold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Tampilkan dalam lingkaran 3D"
              >
                <Orbit className="w-3.5 h-3.5" />
                <span>3D Carousel</span>
              </button>
            </div>

            {/* Kontrol Putar Otomatis (Muncul pada mode 3D Carousel) */}
            {viewMode === 'carousel' && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all backdrop-blur-md ${
                    isAutoRotate
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                      : 'bg-white/[0.04] border-white/[0.1] text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                  title={isAutoRotate ? 'Jeda putaran otomatis' : 'Nyalakan putaran otomatis'}
                >
                  {isAutoRotate ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Auto-Rotate: On</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Auto-Rotate: Off</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {/* ── MODE 1: GRID VIEW (Sangat Nyaman & Responsif untuk HP & Desktop) ── */}
        {viewMode === 'grid' && (
          <Reveal delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {skills.map((skill) => {
                const isHov = hoveredSkill === skill.name;
                return (
                  <div
                    key={skill.name}
                    onMouseEnter={() => enterSkill(skill.name)}
                    onMouseLeave={leaveSkill}
                    className="group relative rounded-2xl p-4 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-300 border border-white/[0.08] hover:border-white/30 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/70 cursor-pointer"
                    style={{
                      background: isHov
                        ? 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(30,30,36,0.92) 35%, rgba(16,16,20,0.98) 100%)'
                        : 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(22,22,28,0.85) 40%, rgba(12,12,16,0.96) 100%)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      boxShadow: isHov
                        ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.6), 0 14px 30px -6px rgba(0,0,0,0.8)'
                        : 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 6px 16px -4px rgba(0,0,0,0.5)',
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
                    <span className="text-[10px] font-mono text-zinc-400 mb-2 tracking-wider uppercase opacity-85 group-hover:text-zinc-300">
                      {skill.category.split(' ')[0]}
                    </span>

                    {/* Tech Logo */}
                    <div className="w-10 h-10 my-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <TechLogo skillKey={skill.key} />
                    </div>

                    {/* Tech Name */}
                    <span className="mt-2 text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white transition-colors duration-200 line-clamp-1">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* ── MODE 2: 3D CYCLE STAGE (Dioptimasi tanpa stutter & tanpa tabrakan) ─ */}
        {viewMode === 'carousel' && (
          <Reveal delay={100}>
            <div className="relative">
              {/* Interactive stage */}
              <div
                ref={containerRef}
                className="relative w-full cursor-grab active:cursor-grabbing select-none"
                style={{
                  height: stageH,
                  perspective: '1200px',
                }}
                onMouseDown={(e) => startDrag(e.clientX)}
                onMouseMove={(e) => moveDrag(e.clientX)}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* 3D Space */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {skills.map((skill, i) => {
                    const baseAngle = i * angleStep;
                    const totalAngleDeg =
                      ((baseAngle + rotY) % 360 + 360) % 360;
                    const rad = (totalAngleDeg * Math.PI) / 180;

                    // 3D coordinates
                    const x = Math.sin(rad) * radius;
                    const z = Math.cos(rad) * radius;

                    const facing = Math.cos(rad); // 1 (front) to -1 (back)
                    const nf = (facing + 1) / 2; // 0 to 1

                    // Inward rotation
                    const inwardRotateY = -Math.sin(rad) * (isMobile ? 24 : 38);

                    // Skala dinamis: Kartu belakang dibuat mengecil agar tidak menabrak kartu depan
                    const baseScale = isMobile
                      ? 0.60 + nf * 0.42
                      : 0.72 + nf * 0.36;

                    // Transparansi bertahap berdasarkan kedalaman (kartu belakang fade out halus)
                    const depthOpacity = isMobile
                      ? Math.max(0.15, Math.pow(nf, 1.6))
                      : Math.max(0.22, Math.pow(nf, 1.2));

                    const isHov = hoveredSkill === skill.name;
                    const isFront = nf > 0.65;

                    // zIndex ensures proper occlusion
                    const zIndex = Math.round(z + radius);

                    return (
                      <div
                        key={skill.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!hasMovedRef.current) {
                            rotateToCard(i);
                          }
                        }}
                        onMouseEnter={() => enterSkill(skill.name)}
                        onMouseLeave={leaveSkill}
                        className="absolute pointer-events-auto cursor-pointer"
                        style={{
                          width: cardW,
                          height: cardH,
                          left: '50%',
                          top: '50%',
                          marginLeft: -cardW / 2,
                          marginTop: -cardH / 2,
                          zIndex,
                          transformStyle: 'preserve-3d',
                          transform: `translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(
                            1
                          )}px) rotateY(${inwardRotateY.toFixed(
                            1
                          )}deg) scale(${isHov ? baseScale * 1.15 : baseScale})`,
                          opacity: isHov ? 1 : depthOpacity,
                          pointerEvents: nf < 0.25 && isMobile ? 'none' : 'auto',
                          // HAPUS CSS transition selama auto-rotate atau drag agar tidak terjadi stutter / "ketahan-tahan"
                          transition: isSteppingRef.current
                            ? 'transform 380ms cubic-bezier(0.2, 0.9, 0.4, 1), opacity 380ms ease'
                            : isDraggingRef.current
                            ? 'none'
                            : isHov
                            ? 'transform 180ms ease'
                            : 'none',
                        }}
                      >
                        {/* Frosted Dark Glass Surface */}
                        <div
                          className={`group relative w-full h-full rounded-2xl flex flex-col items-center justify-center p-2.5 sm:p-3 overflow-hidden select-none transition-all duration-300 border ${
                            isHov
                              ? 'border-white/40 shadow-2xl shadow-black/90 scale-[1.02]'
                              : isFront
                              ? 'border-white/[0.16] shadow-xl shadow-black/80 hover:border-white/30'
                              : 'border-white/[0.07] shadow-lg shadow-black/60'
                          }`}
                          style={{
                            background: isHov
                              ? 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(30,30,36,0.92) 35%, rgba(16,16,20,0.98) 100%)'
                              : isFront
                              ? 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(22,22,28,0.88) 35%, rgba(12,12,16,0.96) 100%)'
                              : 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(18,18,22,0.85) 40%, rgba(10,10,14,0.94) 100%)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            boxShadow: isHov
                              ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.6), 0 16px 36px -8px rgba(0,0,0,0.9)'
                              : isFront
                              ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.5), 0 10px 25px -5px rgba(0,0,0,0.7)'
                              : 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 6px 16px -4px rgba(0,0,0,0.6)',
                          }}
                        >
                          {/* Glass Bevel Top Light Bar */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                          />

                          {/* Diagonal Glass Sheen Highlight */}
                          <div
                            aria-hidden="true"
                            className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-br from-white/[0.09] via-transparent to-transparent rounded-full blur-md pointer-events-none"
                          />

                          {/* Category Tag */}
                          <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 mb-1 sm:mb-1.5 tracking-wider uppercase opacity-85">
                            {skill.category.split(' ')[0]}
                          </span>

                          {/* Tech Logo */}
                          <div
                            className={`w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center transition-transform duration-300 ${
                              isHov ? 'scale-110' : ''
                            }`}
                          >
                            <TechLogo skillKey={skill.key} />
                          </div>

                          {/* Tech Name */}
                          <span
                            className={`mt-1.5 sm:mt-2 font-medium text-center leading-tight transition-colors duration-200 line-clamp-1 ${
                              isHov
                                ? 'text-white font-semibold'
                                : isFront
                                ? 'text-zinc-100'
                                : 'text-zinc-400'
                            }`}
                            style={{
                              fontSize: isMobile ? 10 : 12,
                            }}
                          >
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Prev / Next Buttons */}
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none px-2 sm:px-4">
                  <button
                    type="button"
                    aria-label="Previous skill"
                    onClick={stepPrev}
                    className="pointer-events-auto p-2 sm:p-3 rounded-xl bg-[#111114]/90 border border-white/[0.1] text-zinc-400 hover:text-white hover:border-white/25 transition-all shadow-xl shadow-black/60 backdrop-blur-md active:scale-95"
                    style={{
                      boxShadow:
                        'inset 0 1px 1px 0 rgba(255,255,255,0.15), 0 8px 20px rgba(0,0,0,0.6)',
                    }}
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none px-2 sm:px-4">
                  <button
                    type="button"
                    aria-label="Next skill"
                    onClick={stepNext}
                    className="pointer-events-auto p-2 sm:p-3 rounded-xl bg-[#111114]/90 border border-white/[0.1] text-zinc-400 hover:text-white hover:border-white/25 transition-all shadow-xl shadow-black/60 backdrop-blur-md active:scale-95"
                    style={{
                      boxShadow:
                        'inset 0 1px 1px 0 rgba(255,255,255,0.15), 0 8px 20px rgba(0,0,0,0.6)',
                    }}
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Pagination / Item Indicators */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2">
                {skills.map((s, idx) => {
                  const isActive = activeFrontIndex === idx;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => rotateToCard(idx)}
                      title={s.name}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-6 bg-white shadow-sm'
                          : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
