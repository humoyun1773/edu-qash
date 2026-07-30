import React from 'react';

interface PageLoaderProps {
  fullScreen?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  fullScreen = true,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center transition-colors duration-300 ${
        fullScreen
          ? 'min-h-[70vh] w-full'
          : 'py-16 w-full rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl'
      }`}
    >
      {/* Ambient Glow */}
      <div className="absolute w-28 h-28 bg-indigo-500/20 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Orbiting rings only — no icon */}
      <div className="relative flex items-center justify-center w-16 h-16">
        {/* Ring 1 — clockwise slow */}
        <div
          className="absolute w-16 h-16 rounded-full border-2 border-dashed border-indigo-400/50 dark:border-indigo-500/50 animate-spin"
          style={{ animationDuration: '5s' }}
        />
        {/* Ring 2 — counter-clockwise */}
        <div
          className="absolute w-10 h-10 rounded-full border border-violet-400/40 dark:border-violet-500/40 animate-spin"
          style={{ animationDuration: '3s', animationDirection: 'reverse' }}
        />
        {/* Center dot */}
        <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-lg shadow-indigo-500/50 animate-pulse" />
      </div>
    </div>
  );
};

export default PageLoader;
