import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showSubtitle = true,
  size = 'md',
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const iconSize = isSm ? 32 : isLg ? 52 : 40;
  const textSize = isSm ? 'text-2xl' : isLg ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl';
  const subTextSize = isSm ? 'text-[9px]' : isLg ? 'text-xs sm:text-sm' : 'text-[10.5px] sm:text-[11.5px]';

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 sm:gap-3 group shrink-0 select-none ${className}`}
      title="Eduqash - Ta'lim va Rivojlanish Platformasi"
    >
      {/* Education SVG Icon - Graduation Cap */}
      <div className="relative shrink-0 flex items-center justify-center rounded-2xl overflow-hidden shadow-md group-hover:shadow-indigo-500/40 transition-all duration-300 group-hover:scale-105">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Eduqash Logo"
        >
          {/* Background */}
          <rect width="64" height="64" rx="14" fill="url(#bg_grad)" />

          {/* Graduation cap top (mortarboard diamond) */}
          <path
            d="M32 11L7 24L32 37L57 24L32 11Z"
            fill="url(#cap_top)"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1"
            strokeLinejoin="round"
          />

          {/* Left staff line */}
          <line x1="7" y1="24" x2="7" y2="39" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

          {/* Tassel knob */}
          <circle cx="7" cy="41.5" r="3" fill="#fbbf24" />

          {/* Gown / scroll body */}
          <path
            d="M20 31.5V41C20 46.523 25.477 51 32 51C38.523 51 44 46.523 44 41V31.5"
            fill="url(#body_grad)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Star sparkle */}
          <path
            d="M50 10L51.4 13.9L55.5 14L52.2 16.5L53.3 20.5L50 18.3L46.7 20.5L47.8 16.5L44.5 14L48.6 13.9L50 10Z"
            fill="#fcd34d"
          />

          <defs>
            <linearGradient id="bg_grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="cap_top" x1="7" y1="11" x2="57" y2="37" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e0e7ff" />
              <stop offset="100%" stopColor="#c7d2fe" />
            </linearGradient>
            <linearGradient id="body_grad" x1="20" y1="31" x2="44" y2="51" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text + Subtitle Column */}
      <div className="hidden sm:flex flex-col justify-center">
        {/* Text Logo: eduqash */}
        <div className="flex items-baseline font-black tracking-tight leading-none font-display">
          {/* 'edu' in glowing sky-blue gradient */}
          <span className={`bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-500 dark:from-sky-400 dark:via-sky-300 dark:to-cyan-300 bg-clip-text text-transparent font-black ${textSize}`}>
            edu
          </span>

          {/* 'qash' in deep navy blue (Light mode) and brilliant white-sky (Dark mode) */}
          <span className={`bg-gradient-to-r from-indigo-950 via-blue-900 to-slate-900 dark:from-white dark:via-slate-100 dark:to-sky-200 bg-clip-text text-transparent font-black ${textSize}`}>
            qash
          </span>
        </div>

        {/* Subtitle (Directly under eduqash text) */}
        {showSubtitle && (
          <span
            className={`font-extrabold text-slate-700 dark:text-slate-200 tracking-normal group-hover:text-indigo-600 dark:group-hover:text-sky-400 transition-colors mt-0.5 font-sans leading-tight whitespace-nowrap ${subTextSize}`}
          >
            Ta'lim va Rivojlanish Platformasi
          </span>
        )}
      </div>
    </Link>
  );
};
