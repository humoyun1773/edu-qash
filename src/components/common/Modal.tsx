import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  maxWidth = 'md' 
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  // ESC tugmasi bosilganda modalni yopish
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Modal ochiqligida BODY scroll ni to'liq bloklash
  useEffect(() => {
    if (!isOpen) return;

    // Joriy scroll pozitsiyasini saqlab body ni qotirib qo'yamiz
    const scrollY = window.scrollY;
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      // Modal yopilganda sahifani oldingidek holatga qaytaramiz
      document.body.style.overflow = originalStyle;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Backdrop wheel eventini to'liq bloklash
  const blockWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div 
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overscroll-none"
      onClick={onClose}
      onWheel={blockWheel}
      onTouchMove={(e) => e.preventDefault()}
      style={{ touchAction: 'none' }}
    >
      {/* Modal Card */}
      <div 
        className={`relative w-full ${maxWidthClasses[maxWidth]} bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all text-slate-900 dark:text-white overflow-hidden animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Neon Glow Highlights */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-5 relative z-10">
          <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Modalni yopish"
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="relative z-10 text-slate-600 dark:text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
};