import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X, ShieldAlert } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

export interface ConfirmConfig {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

interface ToastContextType {
  toast: {
    success: (message: string, title?: string, duration?: number) => void;
    error: (message: string, title?: string, duration?: number) => void;
    warning: (message: string, title?: string, duration?: number) => void;
    info: (message: string, title?: string, duration?: number) => void;
    show: (type: ToastType, message: string, title?: string, duration?: number) => void;
  };
  confirm: (config: ConfirmConfig) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmConfig, setConfirmConfig] = useState<ConfirmConfig | null>(null);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((type: ToastType, message: string, title?: string, duration = 4000) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastItem = { id, type, message, title, duration };

    setToasts((prev) => [newToast, ...prev].slice(0, 5)); // max 5 visible

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const toast = {
    success: (message: string, title?: string, duration?: number) => show('success', message, title, duration),
    error: (message: string, title?: string, duration?: number) => show('error', message, title, duration),
    warning: (message: string, title?: string, duration?: number) => show('warning', message, title, duration),
    info: (message: string, title?: string, duration?: number) => show('info', message, title, duration),
    show,
  };

  const confirm = useCallback((config: ConfirmConfig) => {
    setConfirmConfig(config);
  }, []);

  const handleConfirmAction = async () => {
    if (confirmConfig) {
      const action = confirmConfig.onConfirm;
      setConfirmConfig(null);
      await action();
    }
  };

  const handleCancelAction = () => {
    if (confirmConfig?.onCancel) {
      confirmConfig.onCancel();
    }
    setConfirmConfig(null);
  };

  return (
    <ToastContext.Provider value={{ toast, confirm }}>
      {children}

      {/* Toast Notifications Container (ALL TOASTS UNIFIED BLUE THEME) */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((item) => (
          <div
            key={item.id}
            className="pointer-events-auto relative overflow-hidden flex items-start gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300 transform animate-toast-in bg-blue-500/10 dark:bg-blue-950/60 border-blue-500/40 text-blue-950 dark:text-blue-100 shadow-blue-500/15"
          >
            <div className="flex-shrink-0 mt-0.5">
              {item.type === 'success' && <CheckCircle2 className="w-5 h-5 text-blue-500 animate-bounce" />}
              {item.type === 'error' && <AlertCircle className="w-5 h-5 text-blue-500 animate-pulse" />}
              {item.type === 'warning' && <AlertTriangle className="w-5 h-5 text-blue-500 animate-pulse" />}
              {item.type === 'info' && <Info className="w-5 h-5 text-blue-500 animate-pulse" />}
            </div>

            <div className="flex-1 min-w-0 pr-2">
              {item.title && <h4 className="text-xs font-black uppercase tracking-wider mb-0.5 font-display text-blue-600 dark:text-blue-300">{item.title}</h4>}
              <p className="text-xs font-semibold leading-relaxed break-words">{item.message}</p>
            </div>

            <button
              onClick={() => removeToast(item.id)}
              className="flex-shrink-0 text-blue-400 hover:text-blue-700 dark:hover:text-white transition-all p-1 rounded-xl hover:bg-blue-200/50 dark:hover:bg-blue-900/50 active:scale-90 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Bottom Progress Bar (BLUE) */}
            <div
              className="absolute bottom-0 left-0 h-1 animate-toast-progress bg-blue-500"
              style={{ animationDuration: `${item.duration || 4000}ms` }}
            />
          </div>
        ))}
      </div>

      {/* Custom Modal Confirmation */}
      {confirmConfig && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${
                confirmConfig.type === 'danger'
                  ? 'bg-rose-500/10 text-rose-500'
                  : confirmConfig.type === 'warning'
                  ? 'bg-amber-500/10 text-amber-500'
                  : 'bg-indigo-500/10 text-indigo-500'
              }`}>
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {confirmConfig.title || 'Tasdiqlash'}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {confirmConfig.message}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancelAction}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all"
              >
                {confirmConfig.cancelText || 'Bekor qilish'}
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-all active:scale-95 ${
                  confirmConfig.type === 'danger'
                    ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
                    : confirmConfig.type === 'warning'
                    ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                    : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
                }`}
              >
                {confirmConfig.confirmText || 'Tasdiqlash'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
