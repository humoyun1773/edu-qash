import React, { useState, useMemo } from 'react';
import { 
  CheckSquare, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  User, 
  BookOpen, 
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { useModerator } from '../../hooks/useModerator';
import { DashboardSidebar, type SidebarTabItem } from './DashboardSidebar';

type ModeratorTabType = 'courses_review' | 'reports';

export const ModeratorDashboard: React.FC = () => {
  const [moderatorTab, setModeratorTab] = useState<ModeratorTabType>('courses_review');
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Hook - moderator ma'lumotlarini yuklaydi (API + fallback mock)
  const { pendingContent, reports, loading, approveContent, rejectContent } = useModerator();

  const handleApprove = async (id: string) => {
    try {
      setProcessingId(id);
      await approveContent(id);
    } catch (err) {
      console.error('Tasdiqlashda xatolik:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setProcessingId(id);
      await rejectContent(id, 'Moderatsiya talablariga mos kelmadi');
    } catch (err) {
      console.error('Rad etishda xatolik:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const moderatorTabs = useMemo<SidebarTabItem<ModeratorTabType>[]>(() => [
    {
      id: 'courses_review',
      label: 'Kurslar Moderatsiyasi',
      icon: <CheckSquare className="w-4 h-4" />,
      badge: pendingContent.length
    },
    {
      id: 'reports',
      label: 'Shikoyat va Murojaatlar',
      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
      badge: reports.length
    }
  ], [pendingContent.length, reports.length]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-slate-900 dark:text-white">
      
      {/* UNIVERSAL SIDEBAR */}
      <DashboardSidebar
        title="Moderator Paneli"
        activeTab={moderatorTab}
        onSelectTab={setModeratorTab}
        tabs={moderatorTabs}
        accentGradient="from-indigo-600 to-violet-600"
      />

      {/* MAIN CONTENT PANEL */}
      <div className="lg:col-span-3 space-y-6">
        
        {/* TAB 1: KURSLAR MODERATSIYASI */}
        {moderatorTab === 'courses_review' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  Kurslar Moderatsiyasi
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  O'quv markazlari va ustozlar tomonidan yuklangan yangi kurslarni ko'rib chiqish.
                </p>
              </div>
              <span className="self-start sm:self-auto text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
                Kutilayotgan: {pendingContent.length} ta
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                <span className="ml-2 text-xs text-slate-500">Moderatsiya ob'yektlari yuklanmoqda...</span>
              </div>
            ) : pendingContent.length === 0 ? (
              <p className="text-xs text-center py-8 text-slate-400">Tekshirilishi kerak bo'lgan kurslar mavjud emas.</p>
            ) : (
              <div className="space-y-4">
                {pendingContent.map((item) => {
                  const isProcessing = processingId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-4 hover:border-indigo-500/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                              {item.type}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                              <Clock className="w-3 h-3" /> {item.submittedAt}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{item.title}</h4>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <User className="w-3.5 h-3.5" />
                            <span>Yuboruvchi: <strong className="text-slate-700 dark:text-slate-200">{item.submittedBy}</strong></span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            className="px-3.5 py-2 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" /> Tafsilotlar
                          </button>
                          <button
                            disabled={isProcessing}
                            onClick={() => handleReject(item.id)}
                            className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                          >
                            {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                            Rad etish
                          </button>
                          <button
                            disabled={isProcessing}
                            onClick={() => handleApprove(item.id)}
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                          >
                            {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                            Tasdiqlash
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SHIKOYATLAR */}
        {moderatorTab === 'reports' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Foydalanuvchilar Shikoyatlari</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Platformadagi qoidabuzarliklar va e'tirozlarni ko'rib chiqish paneli</p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                <span className="ml-2 text-xs text-slate-500">Shikoyatlar yuklanmoqda...</span>
              </div>
            ) : reports.length === 0 ? (
              <p className="text-xs text-center py-8 text-slate-400">Hozircha hech qanday shikoyat kelib tushmadi.</p>
            ) : (
              <div className="space-y-3">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          {report.contentType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic">"{report.reason}"</p>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2">
                        <span>Kimdan: <strong className="text-slate-700 dark:text-slate-200">{report.reportedBy}</strong></span>
                        <span>•</span>
                        <span>{report.createdAt}</span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                        <BookOpen className="w-3.5 h-3.5" /> Ochiq
                      </span>
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