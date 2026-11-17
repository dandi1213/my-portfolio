import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Github, Linkedin, Instagram, Sparkles, Cpu, Code2 } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';

interface HeroProps {
  personal: PersonalInfo;
  onNavigate: (sectionId: string) => void;
}

export function Hero({ personal, onNavigate }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const avatarStageRef = useRef<HTMLDivElement | null>(null);

  // Auto-flip coin photo secara berkala (setiap 4.5 detik)
  useEffect(() => {
    const flipTimer = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 4500);

    return () => clearInterval(flipTimer);
  }, []);

  useEffect(() => {
    const currentPhrase = personal.roles[roleIndex % personal.roles.length];
    const typingSpeed = isDeleting ? 35 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedRole.length < currentPhrase.length) {
        setDisplayedRole(currentPhrase.slice(0, displayedRole.length + 1));
      } else if (!isDeleting && displayedRole.length === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 1700);
      } else if (isDeleting && displayedRole.length > 0) {
        setDisplayedRole(currentPhrase.slice(0, displayedRole.length - 1));
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personal.roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex, personal.roles]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    el.style.setProperty('--spot-opacity', '1');

    // 3D Parallax Tilt for Avatar Stage
    if (avatarStageRef.current && window.innerWidth >= 768) {
      const stageRect = avatarStageRef.current.getBoundingClientRect();
      const centerX = stageRect.left + stageRect.width / 2;
      const centerY = stageRect.top + stageRect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      const rotY = deltaX * 16;
      const rotX = -deltaY * 16;
      avatarStageRef.current.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(
        2
      )}deg) rotateY(${rotY.toFixed(2)}deg)`;
    }
  };

  const handleHeroMouseLeave = () => {
    const el = heroRef.current;
    if (el) {
      el.style.setProperty('--spot-opacity', '0');
    }
    if (avatarStageRef.current) {
      avatarStageRef.current.style.transform =
        'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative min-h-screen flex items-center pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 editorial-grid-bg pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: 'var(--spot-opacity, 0)',
          background:
            'radial-gradient(550px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.055), transparent 70%)'
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#09090B] to-transparent"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-10 items-center">
          {/* Avatar Stage: on Mobile appears FIRST (order-1), on Desktop on the right (order-2) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex items-center justify-center">
            <div
              ref={avatarStageRef}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[360px] lg:h-[360px] flex items-center justify-center preserve-3d transition-transform duration-300 ease-out my-2 sm:my-0"
            >
              {/* Radial Glowing Core */}
              <div
                aria-hidden="true"
                className="absolute inset-6 sm:inset-8 rounded-full bg-gradient-to-tr from-white/10 via-white/5 to-transparent blur-2xl animate-pulse-glow pointer-events-none"
              />

              {/* 3D Orbiting Rings */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-dashed border-white/[0.13] animate-orbit-ccw pointer-events-none"
              >
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-zinc-300 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-4 sm:inset-6 rounded-full border border-white/[0.09] animate-orbit-cw pointer-events-none"
              >
                <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-zinc-400 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              </div>

              {/* Central 3D Flip Coin Avatar (Auto-flip coin effect) */}
              <div
                className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 cursor-pointer select-none"
                style={{
                  perspective: '1200px',
                  transform: 'translateZ(20px)',
                }}
                onClick={() => setIsFlipped((prev) => !prev)}
                title="Klik untuk membalik foto"
              >
                {/* 3D Coin Body with smooth physics easing */}
                <div
                  className="w-full h-full relative rounded-full transition-transform duration-900 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:scale-[1.03]"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
                  }}
                >
                  {/* FRONT SIDE */}
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden p-1.5 bg-gradient-to-b from-white/25 via-white/5 to-transparent border-2 border-white/25 shadow-2xl shadow-black/90"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'translateZ(2px)',
                    }}
                  >
                    <img
                      src={personal.profilePhoto}
                      alt={personal.fullName}
                      className="w-full h-full rounded-full object-cover object-center grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                    />
                    {/* Dynamic sheen sweep during flip */}
                    <div
                      key={`front-${isFlipped}`}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none animate-coin-sheen"
                    />
                  </div>

                  {/* BACK SIDE */}
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden p-1.5 bg-gradient-to-b from-white/25 via-white/5 to-transparent border-2 border-white/25 shadow-2xl shadow-black/90"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg) translateZ(2px)',
                    }}
                  >
                    <img
                      src={personal.secondaryPhoto || personal.profilePhoto}
                      alt={`${personal.fullName} (Side 2)`}
                      className="w-full h-full rounded-full object-cover object-center grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                    />
                    {/* Dynamic sheen sweep during flip */}
                    <div
                      key={`back-${isFlipped}`}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none animate-coin-sheen"
                    />
                  </div>
                </div>
              </div>

              {/* Floating 3D Badge 1: IoT & Smart Systems (Top Left) */}
              <div
                className="absolute top-0 left-0 sm:top-2 sm:left-1 z-20 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl bg-[#111114]/95 border border-white/20 backdrop-blur-md shadow-xl shadow-black/80 flex items-center gap-2 animate-float-slow"
                style={{ transform: 'translateZ(50px)' }}
              >
                <div className="p-1 sm:p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <Cpu className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-zinc-400">Specialty</p>
                  <p className="text-[11px] sm:text-xs font-bold text-zinc-100 whitespace-nowrap">IoT &amp; Automation</p>
                </div>
              </div>

              {/* Floating 3D Badge 2: Full-Stack Web (Safe in-bounds positioning, never cut off) */}
              <div
                className="absolute bottom-2 right-1 sm:top-1/2 sm:right-1 lg:right-2 sm:bottom-auto sm:-translate-y-1/2 z-20 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl bg-[#111114]/95 border border-white/20 backdrop-blur-md shadow-xl shadow-black/80 flex items-center gap-2 animate-float-reverse"
                style={{ transform: 'translateZ(45px)' }}
              >
                <div className="p-1 sm:p-1.5 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-400">
                  <Code2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-zinc-400">Focus</p>
                  <p className="text-[11px] sm:text-xs font-bold text-zinc-100 whitespace-nowrap">Full-Stack Web</p>
                </div>
              </div>

              {/* Floating 3D Badge 3: Machine Learning (Visible on sm+ bottom left) */}
              <div
                className="hidden sm:flex absolute bottom-2 left-4 sm:left-6 z-20 px-3 py-2 rounded-2xl bg-[#111114]/95 border border-white/20 backdrop-blur-md shadow-xl shadow-black/80 items-center gap-2 animate-float-slow"
                style={{ transform: 'translateZ(40px)', animationDelay: '-2.5s' }}
              >
                <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Domain</p>
                  <p className="text-xs font-bold text-zinc-100 whitespace-nowrap">Machine Learning</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Column: on Mobile appears BELOW photo (order-2), on Desktop on the left (order-1) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              <h1 className="font-display text-3xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight text-zinc-100 leading-[1.1]">
                <span className="block">Hi, I&apos;m</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400">
                  {personal.fullName}
                </span>
              </h1>

              <div className="min-h-[32px] sm:min-h-[40px] flex items-center justify-center lg:justify-start">
                <p className="text-base sm:text-2xl font-medium text-zinc-400">
                  <span>{displayedRole}</span>
                  <span
                    aria-hidden="true"
                    className="inline-block w-[2px] h-4 sm:h-6 bg-zinc-200 ml-1 align-middle animate-pulse"
                  />
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {personal.heroBio}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="hero-cta-sweep inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-zinc-950 bg-zinc-100 hover:bg-white shadow-xl shadow-white/10 transition-all hover:scale-[1.02]"
              >
                <span>View My Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-zinc-200 bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 transition-all hover:scale-[1.02]"
              >
                <span>Contact Me</span>
              </button>
            </div>

            <div className="pt-3 flex items-center justify-center lg:justify-start gap-3">
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/10 hover:-translate-y-1 text-zinc-300 hover:text-zinc-100 border border-white/10 transition-all shadow-lg"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/10 hover:-translate-y-1 text-zinc-300 hover:text-zinc-100 border border-white/10 transition-all shadow-lg"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personal.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/10 hover:-translate-y-1 text-zinc-300 hover:text-zinc-100 border border-white/10 transition-all shadow-lg"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
