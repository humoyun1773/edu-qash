import React, { useState, useMemo } from 'react';
import { CheckSquare, Settings, Loader2, Check, X, ShieldAlert } from 'lucide-react';
import { useModerator } from '../../hooks/useModerator';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import type { SidebarTabItem } from '../../components/dashboard/DashboardSidebar';
import { DashboardSettings } from './DashboardSettings';

type ModeratorTabType = 'courses_review' | 'reports' | 'settings';

export const ModeratorDashboard: React.FC = () => {
  const [moderatorTab, setModeratorTab] = useState<ModeratorTabType>('courses_review');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const { pendingContent, reports, loading, approveContent, rejectContent } = useModerator();

  const handleApprove = async (id: string) => {
    try {
      setProcessingId(id);
      await approveContent(id);
    } catch (error) {
      console.error('Tasdiqlashda xatolik yuz berdi:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setProcessingId(id);
      await rejectContent(id, 'Moderatsiya talablariga mos kelmadi');
    } catch (error) {
      console.error('Rad etishda xatolik yuz berdi:', error);
    } finally {
      setProcessingId(null);
    }
  };

  // Dynamic tabs configuration with badge counts
  const moderatorTabs = useMemo<SidebarTabItem<ModeratorTabType>[]>(
    () => [
      {
        id: 'courses_review',
        label: 'Moderatsiya',
        icon: <CheckSquare className="w-4 h-4" />,
        badge: pendingContent.length,
      },
      {
        id: 'reports',
        label: 'Shikoyatlar',
        icon: <ShieldAlert className="w-4 h-4" />,
        badge: reports.length,
      },
      {
        id: 'settings',
        label: 'Sozlamalar',
        icon: <Settings className="w-4 h-4" />,
      },
    ],
    [pendingContent.length, reports.length]
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* COLLAPSIBLE SIDEBAR */}
      <DashboardSidebar
        title="Moderator Menyusi"
        activeTab={moderatorTab}
        onSelectTab={setModeratorTab}
        tabs={moderatorTabs}
        accentGradient="from-indigo-600 to-violet-600"
      />

      {/* MAIN CONTENT PANEL */}
      <div className="flex-1 space-y-6">
        {/* SETTINGS TAB */}
        {moderatorTab === 'settings' && <DashboardSettings />}

        {/* COURSES REVIEW / MODERATION TAB */}
        {moderatorTab === 'courses_review' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-500" /> Kurslar va Kontent Moderatsiyasi
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                <span className="ml-2 text-xs text-slate-500">Moderatsiya ob'yektlari yuklanmoqda...</span>
              </div>
            ) : pendingContent.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs font-medium">
                Hozircha moderatsiyani kutayotgan materiallar yo'q
              </div>
            ) : (
              <div className="space-y-4">
                {pendingContent.map((item) => {
                  const isItemProcessing = processingId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                    >
                      <div>
                        <span className="badge badge-indigo uppercase">{item.type}</span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{item.title}</h4>
                        <span className="text-xs text-slate-500">
                          Yuboruvchi: {item.submittedBy} • {item.submittedAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={isItemProcessing}
                          onClick={() => handleApprove(item.id)}
                          className="p-2 px-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                        >
                          {isItemProcessing ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          Tasdiqlash
                        </button>

                        <button
                          type="button"
                          disabled={isItemProcessing}
                          onClick={() => handleReject(item.id)}
                          className="p-2 px-3 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                        >
                          {isItemProcessing ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                          Rad Etish
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* REPORTS TAB */}
        {moderatorTab === 'reports' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" /> Foydalanuvchilar Shikoyatlari
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-rose-500" />
                <span className="ml-2 text-xs text-slate-500">Shikoyatlar yuklanmoqda...</span>
              </div>
            ) : reports.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs font-medium">
                Hozircha hech qanday shikoyatlar kelib tushmadi
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <span className="badge badge-amber">{rep.contentType}</span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{rep.reason}</p>
                      <span className="text-[11px] text-slate-500">Shikoyat qiluvchi: {rep.reportedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};