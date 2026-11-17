import React from 'react';

interface SectionHeaderProps {
  title: string;
  highlight?: string;
  subtitle?: string;
}

export function SectionHeader({ title, highlight, subtitle }: SectionHeaderProps) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-16">
      <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-zinc-100 leading-tight">
        {title}{' '}
        {highlight && <span className="text-zinc-400 font-semibold">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
