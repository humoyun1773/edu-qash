import React from 'react';
import { Link } from 'react-router-dom';
import geminiLogo from '../../assets/Gemini_Generated_Image_34qs3e34qs3e34qs.png';

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

  // Crisp sizes
  const logoHeight = isSm ? 'h-8 sm:h-9' : isLg ? 'h-13 sm:h-16' : 'h-10 sm:h-12';
  const textSize = isSm ? 'text-2xl' : isLg ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl';
  const subTextSize = isSm ? 'text-[9px]' : isLg ? 'text-xs sm:text-sm' : 'text-[10.5px] sm:text-[11.5px]';

  return (
    <Link
      to="/"
      className={`inline-flex flex-col group shrink-0 select-none ${className}`}
      title="Eduqash - Ta'lim va Rivojlanish Platformasi"
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Gemini Logo Emblem (Always visible on mobile & desktop) */}
        <div className="relative shrink-0 flex items-center justify-center p-1 sm:p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm group-hover:border-indigo-500/50 group-hover:shadow-md transition-all duration-300">
          <img
            src={geminiLogo}
            alt="Eduqash Emblem"
            className={`${logoHeight} w-auto object-contain rounded-xl mix-blend-multiply dark:mix-blend-normal dark:contrast-125 dark:brightness-110 transition-transform duration-300 group-hover:scale-105`}
          />
        </div>

        {/* Text Logo (Hidden on small mobile screens, visible on sm: 640px+ screens) */}
        <div className="hidden sm:flex items-baseline font-black tracking-tight leading-none font-display">
          {/* 'edu' in glowing sky-blue gradient */}
          <span className={`bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-500 dark:from-sky-400 dark:via-sky-300 dark:to-cyan-300 bg-clip-text text-transparent font-black ${textSize}`}>
            edu
          </span>

          {/* 'qash' in deep navy blue (Light mode) and brilliant white-sky (Dark mode) */}
          <span className={`bg-gradient-to-r from-indigo-950 via-blue-900 to-slate-900 dark:from-white dark:via-slate-100 dark:to-sky-200 bg-clip-text text-transparent font-black ${textSize}`}>
            qash
          </span>
        </div>
      </div>

      {/* Subtitle (Hidden on small mobile screens, visible on sm: 640px+ screens) */}
      {showSubtitle && (
        <span
          className={`hidden sm:block font-extrabold text-slate-600 dark:text-slate-300 tracking-wider group-hover:text-indigo-600 dark:group-hover:text-sky-400 transition-colors mt-1 font-sans ${subTextSize}`}
        >
          Ta'lim va Rivojlanish Platformasi
        </span>
      )}
    </Link>
  );
};
