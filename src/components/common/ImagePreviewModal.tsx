import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCw, RefreshCw, X, Download } from 'lucide-react';

interface ImagePreviewModalProps {
  src: string;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  src,
  alt = 'Image Preview',
  isOpen,
  onClose,
}) => {
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setRotate(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !src) return null;

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotate((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setScale(1);
    setRotate(0);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `avatar-preview-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      {/* Top Toolbar (Ant Design Style) */}
      <div
        className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-2 shadow-2xl backdrop-blur-xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleZoomIn}
          className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Kattalashtirish (Zoom In)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Kichiklashtirish (Zoom Out)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleRotate}
          className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Burish (Rotate 90°)"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Asliga qaytarish"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Yuklab olish"
        >
          <Download className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-slate-700 mx-1" />
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors"
          title="Yopish (ESC)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center overflow-hidden transition-transform duration-200 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          style={{
            transform: `scale(${scale}) rotate(${rotate}deg)`,
            transition: 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)',
          }}
          className="max-w-[85vw] max-h-[80vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/10"
        />
      </div>
    </div>
  );
};
