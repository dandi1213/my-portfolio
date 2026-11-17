import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SkillItem } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';
import { TechLogo } from './TechLogo';

interface SkillsProps {
  skills: SkillItem[];
}

export function Skills({ skills }: SkillsProps) {
  const [rotY, setRotY] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [stageSize, setStageSize] = useState({
    radius: 360,
    cardW: 110,
    cardH: 120,
    stageH: 520,
    isMobile: false,
  });

  const rotYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const anyHoveredRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartRotRef = useRef(0);
  const hasMovedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = skills.length;
  const angleStep = 360 / count;

  /* ── Responsive sizing ───────────────────────────────────────── */
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const isMobile = w < 640;

      const radius = isMobile
        ? Math.max(145, Math.min(220, w * 0.38))
        : Math.max(260, Math.min(380, w * 0.42));

      const cardW = isMobile ? 82 : 110;
      const cardH = isMobile ? 92 : 122;
      const stageH = isMobile ? 420 : 520;

      setStageSize({ radius, cardW, cardH, stageH, isMobile });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  /* ── Smooth Auto-rotate animation loop ───────────────────────── */
  useEffect(() => {
    const AUTO_SPEED = 0.22;
    const tick = () => {
      if (!isDraggingRef.current && !anyHoveredRef.current) {
        rotYRef.current = (rotYRef.current + AUTO_SPEED) % 360;
        setRotY(rotYRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Drag & Touch handling ──────────────────────────────────── */
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
    rotYRef.current = dragStartRotRef.current + delta * 0.45;
    setRotY(rotYRef.current);
  };

  const endDrag = () => {
    isDraggingRef.current = false;
  };

  /* ── Rotate to specific card ─────────────────────────────────── */
  const rotateToCard = useCallback(
    (index: number) => {
      const targetAngle = -(index * angleStep);
      const current = rotYRef.current;
      const diff = ((targetAngle - current) % 360 + 540) % 360 - 180;
      rotYRef.current = current + diff;
      setRotY(rotYRef.current);
    },
    [angleStep]
  );

  const stepNext = () => {
    rotYRef.current -= angleStep;
    setRotY(rotYRef.current);
  };

  const stepPrev = () => {
    rotYRef.current += angleStep;
    setRotY(rotYRef.current);
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
            subtitle="List of skills and software that I have mastered, can be rotated in circular 3D format."
          />
        </Reveal>

        {/* ── 3D CYCLE STAGE ─────────────────────────────────────── */}
        <Reveal delay={100}>
          <div className="relative">
            {/* Interactive stage (Straight upright, no X-tilt) */}
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
              onTouchStart={(e) => startDrag(e.touches[0].clientX)}
              onTouchMove={(e) => {
                e.preventDefault();
                moveDrag(e.touches[0].clientX);
              }}
              onTouchEnd={endDrag}
            >
              {/* 3D Space */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* ── 3D Glass Cards (Bagian tengah sudah dihapus) ── */}
                {skills.map((skill, i) => {
                  const baseAngle = i * angleStep;
                  const totalAngleDeg =
                    ((baseAngle + rotY) % 360 + 360) % 360;
                  const rad = (totalAngleDeg * Math.PI) / 180;

                  // 3D coordinates:
                  // X = sin(rad) * radius
                  // Z = cos(rad) * radius (+radius at front, -radius at back inside the screen)
                  const x = Math.sin(rad) * radius;
                  const z = Math.cos(rad) * radius;

                  const facing = Math.cos(rad); // 1 (front) to -1 (back)
                  const nf = (facing + 1) / 2; // 0 to 1

                  // Curves inward towards depth on the left & right sides
                  const inwardRotateY = -Math.sin(rad) * (isMobile ? 30 : 40);

                  // Scale variation
                  const baseScale = isMobile
                    ? 0.78 + nf * 0.32
                    : 0.82 + nf * 0.36;

                  const isHov = hoveredSkill === skill.name;
                  const isFront = nf > 0.65;

                  // zIndex ensures proper occlusion (front covers back naturally)
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
                        transition: isDraggingRef.current
                          ? 'none'
                          : 'transform 240ms cubic-bezier(0.2, 0.9, 0.4, 1)',
                      }}
                    >
                      {/* Realistic Frosted Dark Glass Surface */}
                      <div
                        className={`group relative w-full h-full rounded-2xl flex flex-col items-center justify-center p-3 overflow-hidden select-none transition-all duration-300 border ${
                          isHov
                            ? 'border-white/40 shadow-2xl shadow-black/90 scale-[1.02]'
                            : isFront
                            ? 'border-white/[0.14] shadow-xl shadow-black/80 hover:border-white/30'
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
                        <span className="text-[10px] font-mono text-zinc-400 mb-1.5 tracking-wider uppercase opacity-85">
                          {skill.category.split(' ')[0]}
                        </span>

                        {/* Tech Logo */}
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-transform duration-300 ${
                            isHov ? 'scale-110' : ''
                          }`}
                        >
                          <TechLogo skillKey={skill.key} />
                        </div>

                        {/* Tech Name */}
                        <span
                          className={`mt-2 font-medium text-center leading-tight transition-colors duration-200 ${
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
                  className="pointer-events-auto p-2.5 sm:p-3 rounded-xl bg-[#111114]/90 border border-white/[0.1] text-zinc-400 hover:text-white hover:border-white/25 transition-all shadow-xl shadow-black/60 backdrop-blur-md"
                  style={{
                    boxShadow:
                      'inset 0 1px 1px 0 rgba(255,255,255,0.15), 0 8px 20px rgba(0,0,0,0.6)',
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none px-2 sm:px-4">
                <button
                  type="button"
                  aria-label="Next skill"
                  onClick={stepNext}
                  className="pointer-events-auto p-2.5 sm:p-3 rounded-xl bg-[#111114]/90 border border-white/[0.1] text-zinc-400 hover:text-white hover:border-white/25 transition-all shadow-xl shadow-black/60 backdrop-blur-md"
                  style={{
                    boxShadow:
                      'inset 0 1px 1px 0 rgba(255,255,255,0.15), 0 8px 20px rgba(0,0,0,0.6)',
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Pagination / Item Indicators */}
            <div className="flex items-center justify-center gap-2 mt-2">
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
      </div>
    </section>
  );
}
