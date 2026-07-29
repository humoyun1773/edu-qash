import React, { useState } from 'react';
import { PanelLeftClose, PanelLeftOpen, Menu, X, Globe } from 'lucide-react';

export interface SidebarTabItem<T extends string> {
  id: T;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  colorClass?: string;
}

interface DashboardSidebarProps<T extends string> {
  title: string;
  activeTab: T;
  onSelectTab: (tab: T) => void;
  tabs: SidebarTabItem<T>[];
  accentGradient?: string;
}

export function DashboardSidebar<T extends string>({
  title,
  activeTab,
  onSelectTab,
  tabs,
  accentGradient = 'from-indigo-600 to-violet-600'
}: DashboardSidebarProps<T>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* MOBILE DRAWER TRIGGER BUTTON */}
      <div className="lg:hidden mb-4 flex items-center justify-between rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-3.5 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all shadow-md active:scale-95"
            aria-label="Menyuni ochish"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-xs font-black text-slate-900 dark:text-white tracking-wider uppercase">{title}</span>
        </div>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">
          <Globe className="w-3 h-3 animate-pulse" /> API Live
        </span>
      </div>

      {/* MOBILE BACKDROP */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-md lg:hidden transition-opacity animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`
          relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 shadow-2xl transition-all duration-300 ease-in-out h-fit z-50
          ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}
          fixed inset-y-0 left-0 w-72 lg:static lg:z-auto
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Ambient Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* SIDEBAR HEADER */}
        <div className="px-2 py-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-800/80 mb-3 flex items-center justify-between">
          {!isCollapsed && (
            <span className="truncate flex items-center gap-2">
              <span className="truncate">{title}</span>
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold shrink-0">
                <Globe className="w-2.5 h-2.5" /> Live
              </span>
            </span>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all active:scale-95"
            title={isCollapsed ? "Sidebar-ni kengaytirish" : "Sidebar-ni yopish"}
          >
            {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          {/* Mobile Close Toggle */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TAB ITEMS LIST */}
        <nav className="space-y-1.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectTab(tab.id);
                  setIsMobileOpen(false);
                }}
                title={isCollapsed ? tab.label : undefined}
                className={`
                  w-full p-3.5 rounded-2xl text-xs font-bold text-left flex items-center justify-between transition-all duration-300 relative overflow-hidden active:scale-[0.98] group
                  ${isActive
                    ? `bg-gradient-to-r ${accentGradient} text-white shadow-lg shadow-indigo-500/25 border border-white/20`
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }
                  ${isCollapsed ? 'justify-center p-3.5' : ''}
                `}
              >
                <span className="flex items-center gap-3 truncate">
                  <div
                    className={`
                      p-2 rounded-xl transition-all duration-300 shrink-0
                      ${isActive 
                        ? 'bg-white/20 text-white shadow-sm' 
                        : 'bg-slate-100 dark:bg-slate-800/90 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-50 dark:group-hover:bg-slate-800'
                      }
                    `}
                  >
                    {tab.icon}
                  </div>
                  {!isCollapsed && <span className="truncate">{tab.label}</span>}
                </span>

                {!isCollapsed && tab.badge !== undefined && (
                  <span
                    className={`
                      text-[10px] px-2.5 py-0.5 rounded-full font-extrabold transition-all ml-2 shrink-0
                      ${isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }
                    `}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}