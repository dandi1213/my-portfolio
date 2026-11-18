import React, { useState, useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // 1. Cek langsung posisi elemen saat mount (langsung tampilkan jika sudah di/dekat viewport)
    try {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight + 250 && rect.bottom > -250) {
        setIsVisible(true);
        return;
      }
    } catch {
      // Fallback aman
      setIsVisible(true);
      return;
    }

    // 2. IntersectionObserver dengan rootMargin lebar dan threshold sangat rendah (0.01)
    // agar animasi sudah memicu bahkan sebelum elemen persis masuk layar di HP
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (node) observer?.unobserve(node);
          }
        },
        {
          threshold: 0.01,
          rootMargin: '150px 0px 150px 0px',
        }
      );
      observer.observe(node);
    } else {
      setIsVisible(true);
    }

    // 3. Fallback safety timer: Jika karena alasan apa pun (throttling di HP / scroll restoration)
    // observer tidak trigger dalam 1.5 detik, paksa elemen terlihat agar TIDAK PERNAH kosong/blank
    const fallbackTimer = window.setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => {
      if (observer) observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}
