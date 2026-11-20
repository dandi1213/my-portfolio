import React from 'react';
import { Calendar, GraduationCap, Award, MapPin } from 'lucide-react';
import { EducationItem } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';
import { Card3d } from './Card3d';

interface EducationProps {
  education: EducationItem[];
}

export function Education({ education }: EducationProps) {
  return (
    <section id="education" className="py-24 lg:py-32 relative border-t border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            title="My"
            highlight="Education"
            subtitle="Kualifikasi pendidikan formal di bidang teknik serta dasar-dasar otomasi industri."
          />
        </Reveal>

        {/* 3D Credential Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, idx) => {
            return (
              <Reveal key={edu.id} delay={idx * 120}>
                <Card3d
                  maxTilt={9}
                  scale={1.02}
                  className="h-full rounded-3xl bg-[#111114] border border-white/[0.1] hover:border-white/25 p-7 sm:p-8 flex flex-col justify-between shadow-2xl shadow-black/80 transition-all group overflow-hidden"
                >
                  <div className="space-y-5" style={{ transform: 'translateZ(25px)' }}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      {/* ── Logo Sekolah / Perguruan Tinggi ── */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.1] flex items-center justify-center group-hover:border-white/25 transition-colors">
                        <img
                          src={edu.logo || "/images/Education/placeholder-polman.svg"}
                          alt={`Logo ${edu.institution}`}
                          className="w-full h-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-end gap-2.5">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-zinc-200 bg-white/[0.05] border border-white/10 shadow-md">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          {edu.period}
                        </span>

                        {edu.honors && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-zinc-300 bg-white/[0.03] border border-white/[0.08]">
                            <Award className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Prestasi / Sertifikasi</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight leading-snug">
                        {edu.degree}
                      </h3>
                      <div className="text-sm font-medium text-zinc-300 mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="inline-flex items-center gap-1.5 text-zinc-200">
                          <GraduationCap className="w-4 h-4 text-zinc-400 shrink-0" />
                          {edu.institution}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 text-zinc-400">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                          {edu.location}
                        </span>
                      </div>
                    </div>

                    {edu.honors && (
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 leading-relaxed font-mono">
                        {edu.honors}
                      </div>
                    )}

                    <p className="text-sm text-zinc-400 leading-relaxed">{edu.description}</p>
                  </div>

                  <div
                    className="pt-6 mt-6 border-t border-white/[0.08] flex flex-wrap gap-2"
                    style={{ transform: 'translateZ(18px)' }}
                  >
                    {edu.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/[0.04] text-zinc-200 border border-white/[0.09] shadow-sm hover:border-white/20 hover:scale-105 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card3d>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
