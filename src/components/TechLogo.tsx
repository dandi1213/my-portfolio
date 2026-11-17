
import React from 'react';

interface TechLogoProps {
  skillKey: string;
}

// Logo teknologi dari CDN Devicon
const onlineLogos: Record<string, string> = {
  python:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  csharp:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
  fastapi:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
  flutter:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
  mongodb:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  mysql:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  'machine-learning':
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
  pandas:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
  iot:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg',
  nodered:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
};

export function TechLogo({ skillKey }: TechLogoProps) {
  // Tampilkan logo online jika tersedia
  if (onlineLogos[skillKey]) {
    return (
      <img
        src={onlineLogos[skillKey]}
        alt={`${skillKey} logo`}
        className="w-8 h-8 object-contain"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  switch (skillKey) {
    case 'react':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.6" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)" />
        </svg>
      );

    case 'nextjs':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <circle cx="12" cy="12" r="9.5" fill="#18181B" stroke="#E4E4E7" strokeWidth="1.6" />
          <path d="M9 15.5V8.5L16.5 18" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 8.5V13.2" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'typescript':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#3178C6" />
          <path d="M7.2 11.2H12.4M9.8 11.2V17.4" stroke="#FFFFFF" strokeWidth="1.85" strokeLinecap="round" />
          <path d="M17.5 11.9C17 11.4 16.3 11.2 15.4 11.2C14.3 11.2 13.6 11.8 13.6 12.6C13.6 14.3 17.6 13.9 17.6 15.8C17.6 16.7 16.8 17.4 15.4 17.4C14.4 17.4 13.7 17.1 13.2 16.5" stroke="#FFFFFF" strokeWidth="1.85" strokeLinecap="round" />
        </svg>
      );

    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#F7DF1E" />
          <path d="M10.7 11.2V15.7C10.7 16.8 10 17.4 8.9 17.4C8.2 17.4 7.7 17.1 7.4 16.6" stroke="#18181B" strokeWidth="1.85" strokeLinecap="round" />
          <path d="M17.5 11.9C17 11.4 16.3 11.2 15.4 11.2C14.3 11.2 13.6 11.8 13.6 12.6C13.6 14.3 17.6 13.9 17.6 15.8C17.6 16.7 16.8 17.4 15.4 17.4C14.4 17.4 13.7 17.1 13.2 16.5" stroke="#18181B" strokeWidth="1.85" strokeLinecap="round" />
        </svg>
      );

    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M6.5 10.5C7.4 7.8 9.2 6.5 11.8 6.5C15.2 6.5 15.8 9 17.6 9.4C18.9 9.7 20 9.2 21 8C20.1 10.7 18.3 12 15.7 12C12.3 12 11.7 9.5 9.9 9.1C8.6 8.8 7.5 9.3 6.5 10.5Z" fill="#38BDF8" />
          <path d="M3 15.5C3.9 12.8 5.7 11.5 8.3 11.5C11.7 11.5 12.3 14 14.1 14.4C15.4 14.7 16.5 14.2 17.5 13C16.6 15.7 14.8 17 12.2 17C8.8 17 8.2 14.5 6.4 14.1C5.1 13.8 4 14.3 3 15.5Z" fill="#38BDF8" />
        </svg>
      );

    case 'html5':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M4.2 3H19.8L18.4 18.7L12 20.8L5.6 18.7L4.2 3Z" fill="#E34F26" />
          <path d="M12 4.4V19.3L17.2 17.6L18.3 4.4H12Z" fill="#F06529" />
          <path d="M15.8 7.6H8.2L8.7 11.6H15.3L14.8 15.6L12 16.4L9.2 15.6L9 13.8" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'css3':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M4.2 3H19.8L18.4 18.7L12 20.8L5.6 18.7L4.2 3Z" fill="#1572B6" />
          <path d="M12 4.4V19.3L17.2 17.6L18.3 4.4H12Z" fill="#33A9DC" />
          <path d="M8.2 7.6H15.8L15.3 11.6H9.5M15.3 11.6L14.8 15.6L12 16.4L9.2 15.6L9 13.8" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'nodejs':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M12 2.6L20.2 7.3V16.7L12 21.4L3.8 16.7V7.3L12 2.6Z" fill="#5FA04E" fillOpacity="0.18" stroke="#68A063" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M9.4 14.7V9.3L14.6 14.7V9.3" stroke="#83CD29" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'graphql':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <polygon points="12,3 19.8,7.5 19.8,16.5 12,21 4.2,16.5 4.2,7.5" stroke="#E10098" strokeWidth="1.55" />
          <polygon points="12,3 19.8,16.5 4.2,16.5" stroke="#E10098" strokeWidth="1.55" />
          <circle cx="12" cy="3" r="1.5" fill="#E10098" />
          <circle cx="19.8" cy="7.5" r="1.5" fill="#E10098" />
          <circle cx="19.8" cy="16.5" r="1.5" fill="#E10098" />
          <circle cx="12" cy="21" r="1.5" fill="#E10098" />
          <circle cx="4.2" cy="16.5" r="1.5" fill="#E10098" />
          <circle cx="4.2" cy="7.5" r="1.5" fill="#E10098" />
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <rect x="4.6" y="4.6" width="14.8" height="14.8" rx="2.6" transform="rotate(45 12 12)" fill="#F05032" />
          <circle cx="12" cy="8.4" r="1.45" fill="#FFFFFF" />
          <circle cx="12" cy="15.6" r="1.45" fill="#FFFFFF" />
          <circle cx="15.6" cy="12" r="1.45" fill="#FFFFFF" />
          <path d="M12 9.8V14.2M13 9.4L14.6 11" stroke="#FFFFFF" strokeWidth="1.65" strokeLinecap="round" />
        </svg>
      );

    case 'vite':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M3.8 4.8L12 20.2L20.2 4.8L12 8.1L3.8 4.8Z" fill="#8B5CF6" stroke="#8B5CF6" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M13.2 4.2L9.8 11.8H13L11.2 17.6L15.6 10.4H12.4L13.2 4.2Z" fill="#FFD62E" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <ellipse cx="12" cy="6.2" rx="7.5" ry="3" fill="#4A89DC" fillOpacity="0.28" stroke="#4A89DC" strokeWidth="1.7" />
          <path d="M4.5 6.2V12C4.5 13.7 7.9 15 12 15C16.1 15 19.5 13.7 19.5 12V6.2" stroke="#4A89DC" strokeWidth="1.7" />
          <path d="M4.5 12V17.8C4.5 19.5 7.9 20.8 12 20.8C16.1 20.8 19.5 19.5 19.5 17.8V12" stroke="#68A4F1" strokeWidth="1.7" />
        </svg>
      );
  }
}
