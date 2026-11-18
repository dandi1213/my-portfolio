import React, { useState, useRef, useEffect } from 'react';
import { Award, ExternalLink, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { CertificateItem } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';
import { Card3d } from './Card3d';

interface CertificatesProps {
  certificates: CertificateItem[];
}

export function Certificates({ certificates }: CertificatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);

  const categories = [
    'All',
    'Bahasa',
    'Otomasi Industri',
    'Software & Programming',
    'Penghargaan',
  ];

  const filteredCertificates =
    selectedCategory === 'All'
      ? certificates
      : certificates.filter((c) => c.category === selectedCategory);

  // Reset scroll dan index saat kategori berubah
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setActiveIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Deteksi card yang aktif di HP berdasarkan posisi scroll
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el || window.innerWidth >= 768) return;

    const cards = el.querySelectorAll<HTMLElement>('[data-cert-card]');
    if (!cards || cards.length === 0) return;

    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  // Scroll ke sertifikat tertentu (saat pagination dot atau panah diklik)
  const scrollToIndex = (idx: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('[data-cert-card]');
    if (cards[idx]) {
      cards[idx].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveIndex(idx);
    }
  };

  // ── Mouse Drag Support (bisa langsung digeser dengan mouse/kursor di PC/Laptop) ──
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el || window.innerWidth >= 768) return;
    isMouseDownRef.current = true;
    isDraggingRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    startScrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el || !isMouseDownRef.current || window.innerWidth >= 768) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 4) {
      isDraggingRef.current = true;
    }
    el.scrollLeft = startScrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isMouseDownRef.current = false;
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [filteredCertificates.length]);

  return (
    <section id="certificates" className="py-24 lg:py-32 relative border-t border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            title="Honors &"
            highlight="Certifications"
            subtitle="Dokumentasi sertifikasi resmi, uji kompetensi, dan penghargaan yang telah diraih."
          />
        </Reveal>

        {/* Category Filter Tabs */}
        <Reveal delay={80}>
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 sm:mb-10">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`inline-flex h-10 items-center justify-center whitespace-nowrap px-4 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-md'
                      : 'bg-white/[0.035] hover:bg-white/[0.08] text-zinc-400 hover:text-zinc-200 border border-white/[0.08]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* 
          Container Sertifikat Responsif:
          - Di HP: Horizontal Slider yang bisa LANGSUNG DIGESER (swipe jari di HP atau drag mouse di PC), snap halus.
          - Di Tablet / Desktop (md ke atas): Grid 2-3 kolom standar tanpa ada perubahan.
        */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="certificates-scroll-container flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-proximity md:snap-none -mx-4 px-4 sm:mx-0 sm:px-0 select-none cursor-grab active:cursor-grabbing md:cursor-default"
        >
          {filteredCertificates.map((cert, idx) => (
            <div
              key={cert.id}
              data-cert-card
              className="w-[84vw] max-w-[340px] md:w-auto shrink-0 md:shrink snap-center flex flex-col"
            >
              <Reveal key={cert.id} delay={idx * 60} className="h-full">
                <Card3d
                  maxTilt={6}
                  scale={1.02}
                  className="h-full rounded-2xl bg-[#0c0c10] border border-white/15 p-2 shadow-2xl shadow-black/90 transition-all group select-none flex flex-col hover:border-white/30"
                >
                  {/* ── Inner Certificate Sheet ── */}
                  <div
                    className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#15151a] via-[#111116] to-[#0d0d12] border border-white/[0.08] p-4 sm:p-5 flex flex-col justify-between overflow-hidden"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {/* Decorative Guilloche Inlay Border */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-1.5 rounded-lg border border-dashed border-white/[0.08] pointer-events-none"
                    />

                    {/* ── Top Header: Document Badge & Issuer ── */}
                    <div className="relative z-10 flex items-start justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="min-w-0">
                        <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.2em] uppercase text-zinc-400 block">
                          Official Certificate
                        </span>
                        <p className="text-xs font-semibold text-zinc-300 truncate mt-0.5" title={cert.issuer}>
                          {cert.issuer}
                        </p>
                      </div>

                      {/* Certificate Medallion Stamp */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/15 via-white/5 to-transparent border border-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                        <Award className="w-4 h-4 text-zinc-200" />
                      </div>
                    </div>

                    {/* ── Middle: Certificate Title & Short Details ── */}
                    <div className="relative z-10 my-3.5 space-y-2">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-mono bg-white/[0.04] text-zinc-400 border border-white/[0.06] mb-1">
                          {cert.category}
                        </span>
                        <h3
                          className="text-sm sm:text-base font-bold text-zinc-100 tracking-tight leading-snug line-clamp-2 group-hover:text-white transition-colors"
                          title={cert.title}
                        >
                          {cert.title}
                        </h3>
                      </div>

                      <p className="text-[11px] sm:text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>

                    {/* ── Bottom: Date, Signature Line & Action Button ── */}
                    <div className="relative z-10 pt-2.5 border-t border-white/[0.07] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                        <Calendar className="w-3 h-3 text-zinc-400" />
                        <span>{cert.issueDate}</span>
                      </div>

                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (isDraggingRef.current) {
                              e.preventDefault();
                              e.stopPropagation();
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-zinc-950 bg-zinc-100 hover:bg-white transition-all shadow-sm shrink-0"
                        >
                          <span>Buka</span>
                          <ExternalLink className="w-2.5 h-2.5 text-zinc-700" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card3d>
              </Reveal>
            </div>
          ))}
        </div>

        {/* ── Kontrol Navigasi & Pagination Dots khusus di Layar HP ── */}
        {filteredCertificates.length > 1 && (
          <div className="md:hidden flex items-center justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Sertifikat sebelumnya"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-zinc-300 disabled:opacity-20 transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {filteredCertificates.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Ke sertifikat nomor ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? 'w-6 bg-zinc-100 shadow-sm'
                      : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(filteredCertificates.length - 1, activeIndex + 1))}
              disabled={activeIndex === filteredCertificates.length - 1}
              aria-label="Sertifikat berikutnya"
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
