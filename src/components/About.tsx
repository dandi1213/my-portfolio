import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  GraduationCap,
  Wifi,
  Lock,
} from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';
import { Card3d } from './Card3d';

interface AboutProps {
  personal: PersonalInfo;
  onNavigate?: (sectionId: string) => void;
}

export function About({ personal }: AboutProps) {
  // Device mode: 'laptop' (Web) or 'mobile' (HP)
  const [deviceMode, setDeviceMode] = useState<'laptop' | 'mobile'>('laptop');
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Auto-flip between Laptop (Web) and HP (Mobile) secara berkala
  useEffect(() => {
    const timer = setInterval(() => {
      setDeviceMode((prev) => (prev === 'laptop' ? 'mobile' : 'laptop'));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const isMobileView = deviceMode === 'mobile';

  // 3D Parallax tilt tracking mouse for the standalone device
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el || window.innerWidth < 768) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotX = -y * 14;
    const rotY = x * 14;
    el.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
  };

  const handleStageMouseLeave = () => {
    const el = stageRef.current;
    if (el) {
      el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <section id="about" className="py-24 lg:py-32 relative border-t border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            title="About"
            highlight="Me"
            subtitle="A closer look at my background, engineering philosophy, and cross-platform technical focus."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Standalone 3D Floating Device (Laptop ⇄ HP, tanpa card pembungkus) */}
          <Reveal delay={80} className="lg:col-span-5 flex items-center justify-center">
            <div
              ref={stageRef}
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
              onClick={() =>
                setDeviceMode((prev) => (prev === 'laptop' ? 'mobile' : 'laptop'))
              }
              title="Klik untuk membalik antara Laptop dan HP"
              className="relative w-full max-w-[420px] h-[390px] sm:h-[440px] flex items-center justify-center cursor-pointer select-none transition-transform duration-200 ease-out"
              style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 3D Flip Body (Rotates Y 180 degrees) */}
              <div
                className="w-full h-full relative flex items-center justify-center transition-transform duration-800 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${isMobileView ? 180 : 0}deg)`,
                }}
              >
                {/* ── SIDE A: 3D STANDALONE LAPTOP (WEB) ────────────── */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* Laptop Screen Body */}
                  <div className="w-full max-w-[350px] sm:max-w-[400px] rounded-2xl bg-[#09090C] border-2 border-white/20 p-2 sm:p-2.5 shadow-2xl shadow-black/95 flex flex-col transition-all hover:border-white/35">
                    {/* Camera Dot */}
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mx-auto mb-1.5" />

                    {/* Display Screen */}
                    <div className="rounded-xl bg-[#111116] border border-white/[0.08] overflow-hidden flex flex-col text-left">
                      {/* Browser Window Header */}
                      <div className="px-3 py-2 bg-[#17171d] border-b border-white/[0.08] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500/80" />
                          <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                          <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#0a0a0d] border border-white/[0.07] text-[10px] font-mono text-zinc-400">
                          <Lock className="w-2.5 h-2.5 text-emerald-400" />
                          <span>dandialidrus.id/dashboard</span>
                        </div>
                        <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Live</span>
                        </span>
                      </div>

                      {/* Web Dashboard UI */}
                      <div className="p-3 sm:p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                              Web &amp; Telemetry
                            </p>
                            <h4 className="text-xs sm:text-sm font-bold text-zinc-100">
                              IoT &amp; ERP Monitoring
                            </h4>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[10px] font-mono text-zinc-300">
                            v2.6
                          </span>
                        </div>

                        {/* Telemetry Wave Graph */}
                        <div className="p-2.5 rounded-xl bg-[#09090D] border border-white/[0.07] space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                            <span>Sensor Stream</span>
                            <span className="text-emerald-400 font-semibold">91.5% Accuracy</span>
                          </div>
                          <div className="h-14 w-full flex items-end gap-1 px-1 pt-2">
                            {[35, 60, 45, 80, 55, 90, 70, 85, 95, 65, 80, 100].map((val, idx) => (
                              <div
                                key={idx}
                                className="flex-1 rounded-t bg-gradient-to-t from-white/10 to-white/60 transition-all duration-300"
                                style={{ height: `${val}%` }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {['React.js', 'FastAPI', 'MongoDB', 'REST API', 'Tailwind'].map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-white/[0.05] text-zinc-300 border border-white/[0.08]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Laptop Bottom Lip / Stand */}
                    <div className="w-28 sm:w-36 h-1.5 bg-zinc-600 rounded-b-lg mx-auto mt-2.5 opacity-70 shadow-sm" />
                  </div>
                </div>

                {/* ── SIDE B: 3D STANDALONE SMARTPHONE (HP) ─────────── */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {/* Smartphone Chassis Frame */}
                  <div className="w-[210px] sm:w-[235px] h-[360px] sm:h-[395px] rounded-[38px] bg-[#09090C] border-2 border-white/25 p-2.5 shadow-2xl shadow-black/95 overflow-hidden flex flex-col transition-all hover:border-white/40">
                    {/* Screen Glass */}
                    <div className="w-full h-full rounded-[28px] bg-[#111116] border border-white/[0.08] overflow-hidden flex flex-col text-left justify-between p-3">
                      {/* Status Bar & Dynamic Island */}
                      <div>
                        <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 px-1 pt-0.5">
                          <span>09:41</span>
                          <div className="w-14 h-3.5 rounded-full bg-black border border-white/15 mx-auto" />
                          <div className="flex items-center gap-1">
                            <Wifi className="w-2.5 h-2.5 text-zinc-400" />
                            <div className="w-3.5 h-2 rounded-sm border border-zinc-400 p-0.5 flex items-center">
                              <div className="w-full h-full bg-zinc-300 rounded-2xs" />
                            </div>
                          </div>
                        </div>

                        {/* Mobile Header */}
                        <div className="mt-3.5 px-1">
                          <span className="text-[9px] font-mono text-pink-400 uppercase tracking-wider">
                            Mobile Application
                          </span>
                          <h4 className="text-xs font-bold text-zinc-100 leading-tight mt-0.5">
                            Puskesmas Garuda
                          </h4>
                          <p className="text-[10px] text-zinc-400 font-mono">
                            Portal Dokumen Seluler
                          </p>
                        </div>

                        {/* Mobile App Document Card */}
                        <div className="mt-3 p-2.5 rounded-xl bg-[#09090D] border border-white/[0.08] space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-medium text-zinc-200">
                            <span>Arsip Dokumen</span>
                            <span className="text-emerald-400 text-[9px] font-mono">✓ Cloud Sync</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-white/[0.08] flex items-center justify-center text-[11px]">
                              📄
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] text-zinc-200 font-medium truncate">
                                Administrasi KKN.pdf
                              </p>
                              <p className="text-[8px] font-mono text-zinc-500">
                                1.8 MB · Terverifikasi
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-1 mt-2.5 px-1">
                          {['Flutter', 'Dart', 'Android/iOS'].map((m) => (
                            <span
                              key={m}
                              className="px-2 py-0.5 rounded text-[8px] font-mono bg-white/[0.05] text-zinc-300 border border-white/[0.08]"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Mobile Bottom Bar */}
                      <div className="pt-2 border-t border-white/[0.07] flex items-center justify-around text-zinc-500 text-[10px]">
                        <span className="text-zinc-100 font-bold">●</span>
                        <span>■</span>
                        <span>▲</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Narrative & 3D Interactive Metadata */}
          <Reveal delay={140} className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
              {personal.aboutParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Unified Info Dock (Location & Education) */}
            <div className="pt-3">
              <div className="rounded-2xl bg-[#111114]/90 border border-white/[0.08] backdrop-blur-md p-3.5 sm:px-6 sm:py-4 shadow-xl shadow-black/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
                {/* Item 1: Location */}
                <div className="flex items-center gap-3 sm:flex-1">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-zinc-300 shrink-0">
                    <MapPin className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Location</p>
                    <p className="text-xs sm:text-sm font-semibold text-zinc-100">Purwakarta</p>
                  </div>
                </div>

                {/* Item 2: Education */}
                <div className="flex items-center gap-3 pt-2.5 sm:pt-0 sm:pl-6 sm:flex-1">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-zinc-300 shrink-0">
                    <GraduationCap className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Education</p>
                    <p className="text-xs sm:text-sm font-semibold text-zinc-100">D4 TRIN · Polman Bandung</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
