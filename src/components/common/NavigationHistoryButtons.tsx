import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const NavigationHistoryButtons: React.FC<{ className?: string }> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const maxIdxRef = useRef<number>(0);

  useEffect(() => {
    const stateIdx = (window.history.state as { idx?: number })?.idx ?? 0;
    if (stateIdx > maxIdxRef.current) {
      maxIdxRef.current = stateIdx;
    }
    setCanGoBack(stateIdx > 0);
    setCanGoForward(stateIdx < maxIdxRef.current);
  }, [location.pathname, location.search]);

  const handleBack = () => {
    const stateIdx = (window.history.state as { idx?: number })?.idx ?? 0;
    if (stateIdx > 0) {
      navigate(-1);
    }
  };

  const handleForward = () => {
    const stateIdx = (window.history.state as { idx?: number })?.idx ?? 0;
    if (stateIdx < maxIdxRef.current) {
      navigate(1);
    }
  };

  return (
    <div className={`flex items-center gap-1.5 shrink-0 ${className}`}>
      <button
        type="button"
        onClick={handleBack}
        disabled={!canGoBack}
        title={canGoBack ? "Orqaga (Back)" : "Orqaga sahifa yo'q"}
        className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80 ${
          canGoBack
            ? 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white cursor-pointer active:scale-95 shadow-sm'
            : 'bg-slate-100/40 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-40'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={handleForward}
        disabled={!canGoForward}
        title={canGoForward ? "Oldinga (Forward)" : "Oldinga sahifa yo'q"}
        className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80 ${
          canGoForward
            ? 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white cursor-pointer active:scale-95 shadow-sm'
            : 'bg-slate-100/40 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-40'
        }`}
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
