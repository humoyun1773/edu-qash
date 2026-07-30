import React, { useState } from 'react';
import { 
  CheckSquare, 
  Loader2, 
  Check, 
  X, 
  ShieldAlert, 
  Sparkles, 
  User, 
  Clock, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { useModerator } from '../../../hooks/useModerator';
import { DashboardSidebar } from '../common/DashboardSidebar';
import { DashboardSettings } from '../DashboardSettings';
import { getModeratorTabs, type ModeratorTabType } from './moderatorTabs';

export const ModeratorDashboard: React.FC = () => {
  const [moderatorTab, setModeratorTab] = useState<ModeratorTabType>('content');
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

  const moderatorTabs = getModeratorTabs();

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
      {/* COLLAPSIBLE SIDEBAR */}
      <DashboardSidebar
        title="Moderator Menyusi"
        activeTab={moderatorTab}
        onSelectTab={setModeratorTab}
        tabs={moderatorTabs}
        accentGradient="from-indigo-600 to-violet-600"
      />

      {/* MAIN CONTENT PANEL */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* SETTINGS TAB */}
        {moderatorTab === 'settings' && <DashboardSettings />}

        {/* CONTENT MODERATION TAB */}
        {moderatorTab === 'content' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-800/80 space-y-8 shadow-2xl shadow-indigo-500/5 transition-all">
            {/* Sarlavha Paneli */}
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    Kurslar va Kontent Moderatsiyasi
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Platformaga joylashtirilayotgan yangi kurs va materiallarni tekshirish.
                  </p>
                </div>
              </div>

              {pendingContent.length > 0 && (
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {pendingContent.length} ta kutilmoqda
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 animate-pulse">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Moderatsiya ob'yektlari yuklanmoqda...
                </span>
              </div>
            ) : pendingContent.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-slate-200/80 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-950/30 space-y-2">
                <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 w-16 h-16 mx-auto flex items-center justify-center text-slate-400">
                  <Sparkles className="w-8 h-8 opacity-60 text-emerald-500" />
                </div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Moderatsiyada materiallar yo'q
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Barcha yangi kontentlar ko'rib chiqilgan yoki hozircha kutilayotgan arizalar yo'q.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingContent.map((item) => {
                  const isItemProcessing = processingId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-white/80 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-lg shadow-slate-500/5 hover:border-indigo-500/40 transition-all group"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-indigo-500/10 to-violet-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                            {item.type}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-indigo-500" />
                            {item.submittedBy}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {item.submittedAt}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 self-end sm:self-center">
                        <button
                          type="button"
                          disabled={isItemProcessing}
                          onClick={() => handleApprove(item.id)}
                          className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold text-xs flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
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
                          className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-bold text-xs flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
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

        {/* REVIEWS & REPORTS TAB */}
        {moderatorTab === 'reviews' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-800/80 space-y-8 shadow-2xl shadow-indigo-500/5 transition-all">
            {/* Sarlavha Paneli */}
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shadow-sm">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    Foydalanuvchilar Shikoyatlari
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Foydalanuvchilar va o'quvchilar tomonidan kelib tushgan e'tirozlar hamda shikoyatlar.
                  </p>
                </div>
              </div>

              {reports.length > 0 && (
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  {reports.length} ta shikoyat
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 animate-pulse">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Shikoyatlar yuklanmoqda...
                </span>
              </div>
            ) : reports.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-slate-200/80 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-950/30 space-y-2">
                <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 w-16 h-16 mx-auto flex items-center justify-center text-slate-400">
                  <CheckSquare className="w-8 h-8 opacity-60 text-emerald-500" />
                </div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Hech qanday shikoyatlar yo'q
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Platformada hozircha qoida buzilishlari yoki e'tirozlar qayd etilmadi.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-5 rounded-2xl bg-white/80 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-slate-500/5 hover:border-rose-500/30 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {rep.contentType}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {rep.reason}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <User className="w-3.5 h-3.5 text-rose-500" />
                        <span>Shikoyat qiluvchi: <strong className="text-slate-700 dark:text-slate-300">{rep.reportedBy}</strong></span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all self-end sm:self-center flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Tafsilotlar
                    </button>
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