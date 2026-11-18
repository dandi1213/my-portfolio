import React, { useState, useRef } from "react";
import { Code2, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectItem } from "../types/portfolio";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

interface ProjectsProps {
  projects: ProjectItem[];
  onOpenProjectModal: (project: ProjectItem) => void;
}

export function Projects({ projects, onOpenProjectModal }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragXRef = useRef(0);
  const dragStartXRef = useRef<number | null>(null);
  const dragStartYRef = useRef<number | null>(null);
  const dragAxisRef = useRef<"x" | "y" | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);
  const didDragRef = useRef(false);

  const DRAG_THRESHOLD = 48;

  const projectCategories = ["All", "Web Development", "IoT & Embedded Systems", "Industrial Automation", "Mobile Development"];
  const filteredProjects = selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory);
  const totalFilteredProjects = filteredProjects.length;
  const safeProjectIndex = totalFilteredProjects > 0 ? activeProjectIndex % totalFilteredProjects : 0;

  const handlePrevProject = () => {
    if (totalFilteredProjects <= 1) return;
    setActiveProjectIndex((prev) => (prev - 1 + totalFilteredProjects) % totalFilteredProjects);
  };

  const handleNextProject = () => {
    if (totalFilteredProjects <= 1) return;
    setActiveProjectIndex((prev) => (prev + 1) % totalFilteredProjects);
  };

  const setDragOffset = (value: number) => {
    dragXRef.current = value;
    setDragX(value);
  };

  const handleProjectPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (totalFilteredProjects <= 1) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragPointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    dragStartYRef.current = event.clientY;
    dragAxisRef.current = null;
    didDragRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleProjectPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragPointerIdRef.current !== event.pointerId || dragStartXRef.current === null) return;

    const diffX = event.clientX - dragStartXRef.current;
    const diffY = event.clientY - (dragStartYRef.current ?? event.clientY);

    // Tentukan arah gestur dulu agar scroll vertikal halaman tidak ikut menggeser card.
    if (dragAxisRef.current === null) {
      if (Math.abs(diffX) < 6 && Math.abs(diffY) < 6) return;
      dragAxisRef.current = Math.abs(diffX) > Math.abs(diffY) ? "x" : "y";
      if (dragAxisRef.current === "x") setIsDragging(true);
    }

    if (dragAxisRef.current !== "x") return;
    if (Math.abs(diffX) > 6) didDragRef.current = true;
    setDragOffset(diffX);
  };

  const finishProjectDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragPointerIdRef.current !== event.pointerId) return;

    const diffX = dragXRef.current;
    dragPointerIdRef.current = null;
    dragStartXRef.current = null;
    dragStartYRef.current = null;
    dragAxisRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (Math.abs(diffX) >= DRAG_THRESHOLD) {
      didDragRef.current = true;
      if (diffX < 0) {
        handleNextProject();
      } else {
        handlePrevProject();
      }
    }
  };

  const cancelProjectDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragPointerIdRef.current !== event.pointerId) return;
    dragPointerIdRef.current = null;
    dragStartXRef.current = null;
    dragStartYRef.current = null;
    dragAxisRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <section id="projects" className="py-24 lg:py-32 relative border-t border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader title="Featured" highlight="Projects" subtitle="Jelajahi berbagai aplikasi web dan sistem desain terbaru. Pilih kartu proyek untuk melihat galeri tangkapan layar dan studi kasus lengkap." />
        </Reveal>

        <Reveal delay={80}>
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12" role="tablist" aria-label="Filter projects by category">
            {projectCategories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setSelectedCategory(category);
                    setActiveProjectIndex(0);
                  }}
                  className={`inline-flex h-9 sm:h-10 items-center justify-center whitespace-nowrap px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all ${isActive ? "bg-zinc-100 text-zinc-950 font-semibold" : "bg-white/[0.035] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08]"}`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        {totalFilteredProjects > 0 && (
          <Reveal delay={140}>
            <div
              className="project-cycle-stage relative h-[475px] sm:h-[505px] flex items-center justify-center select-none touch-pan-y cursor-grab active:cursor-grabbing"
              onPointerDown={handleProjectPointerDown}
              onPointerMove={handleProjectPointerMove}
              onPointerUp={finishProjectDrag}
              onPointerCancel={cancelProjectDrag}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") cancelProjectDrag(event);
              }}
            >
              {filteredProjects.map((project, idx) => {
                let offset = idx - safeProjectIndex;
                const half = Math.floor(totalFilteredProjects / 2);
                if (offset > half) offset -= totalFilteredProjects;
                if (offset < -half) offset += totalFilteredProjects;

                const absOffset = Math.abs(offset);
                const isCenter = offset === 0;
                const isVisible = absOffset <= 2;

                const translateX = `calc(${offset} * var(--cycle-step)${isDragging ? ` + ${dragX}px` : ""})`;
                const translateZ = isCenter ? 0 : absOffset === 1 ? -150 : -290;
                const rotateY = isCenter ? 0 : offset < 0 ? 22 : -22;
                const scale = isCenter ? 1 : absOffset === 1 ? 0.86 : 0.72;
                const opacity = !isVisible ? 0 : isCenter ? 1 : absOffset === 1 ? 0.58 : 0.24;

                const cardTransformStyle: React.CSSProperties = {
                  transform: `translate3d(${translateX}, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: 30 - absOffset * 10,
                  pointerEvents: isVisible ? "auto" : "none",
                  transition: isDragging ? "none" : "transform 540ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease, border-color 300ms ease",
                };

                const coverImage = Array.isArray(project.images) && project.images.length > 0 ? project.images[0] : "";

                return (
                  <article
                    key={project.id}
                    style={cardTransformStyle}
                    onClick={() => {
                      if (didDragRef.current) {
                        didDragRef.current = false;
                        return;
                      }
                      if (!isCenter) {
                        setActiveProjectIndex(idx);
                        return;
                      }
                      onOpenProjectModal(project);
                    }}
                    onKeyDown={(e) => {
                      if (isCenter && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        onOpenProjectModal(project);
                      }
                    }}
                    tabIndex={isCenter ? 0 : -1}
                    role="button"
                    aria-label={isCenter ? `Open details and screenshots for ${project.title}` : `Rotate ${project.title} to center`}
                    aria-hidden={!isVisible}
                    className={`group absolute w-[290px] sm:w-[390px] lg:w-[440px] rounded-3xl bg-[#111114] border overflow-hidden shadow-2xl shadow-black/80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 ${
                      isCenter ? "border-white/25 hover:border-white/45" : "border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    <div className="relative h-48 sm:h-56 bg-[#09090B] overflow-hidden border-b border-white/[0.08]">
                      {coverImage && <img src={coverImage} alt={project.title} draggable="false" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-black/25 pointer-events-none" />

                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/75 text-zinc-100 border border-white/15 backdrop-blur-md">{project.category}</span>
                      </div>

                      <div className="absolute top-3.5 right-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-black/75 text-zinc-300 border border-white/15 backdrop-blur-md">{project.year}</span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 space-y-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-zinc-100 tracking-tight line-clamp-1">{project.title}</h3>
                        <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">{project.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-2">
                        <div className="flex items-center gap-2">
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              draggable={false}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (didDragRef.current) e.preventDefault();
                              }}
                              aria-label={`View source code for ${project.title}`}
                              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/12 text-zinc-300 border border-white/10 transition-colors"
                            >
                              <Code2 className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              draggable={false}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (didDragRef.current) e.preventDefault();
                              }}
                              aria-label={`Open live demo for ${project.title}`}
                              className="p-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 transition-colors"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handlePrevProject}
                disabled={totalFilteredProjects <= 1}
                aria-label="Rotate to previous project"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/[0.1] disabled:opacity-40 text-zinc-200 border border-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {filteredProjects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setActiveProjectIndex(idx)}
                    aria-label={`Select project ${proj.title}`}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === safeProjectIndex ? "w-8 bg-zinc-100" : "w-2 bg-zinc-700 hover:bg-zinc-500"}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextProject}
                disabled={totalFilteredProjects <= 1}
                aria-label="Rotate to next project"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/[0.1] disabled:opacity-40 text-zinc-200 border border-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
