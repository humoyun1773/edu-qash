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
  AlertTriangle
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
        accentGradient="from-indigo-600 via-purple-600 to-pink-600"
      />

      {/* MAIN CONTENT PANEL */}
      <div className="flex-1 min-w-0 space-y-8">
        {/* TOP OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckSquare className="w-20 h-20 text-emerald-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Kutilayotgan Kurslar</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white font-display">{pendingContent.length}</h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <Clock className="w-4 h-4 mr-1.5" />
              <span>Tekshiruv kutilmoqda</span>
            </div>
          </div>

          <div className="relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-amber-500/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldAlert className="w-20 h-20 text-amber-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tushgan E'tirozlar</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white font-display">{reports.length}</h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-amber-600 dark:text-amber-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <AlertTriangle className="w-4 h-4 mr-1.5" />
              <span>Shikoyatlar ro'yxati</span>
            </div>
          </div>

          <div className="relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-indigo-500/40 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles className="w-20 h-20 text-indigo-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Moderatsiya Tizimi</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white font-display">Aktiv</h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>Platforma filtratsiyasi faol</span>
            </div>
          </div>
        </div>

        {/* SETTINGS TAB */}
        {moderatorTab === 'settings' && <DashboardSettings />}

        {/* CONTENT MODERATION TAB */}
        {moderatorTab === 'content' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 space-y-8 shadow-xl transition-all">
            {/* Sarlavha Paneli */}
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
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
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 shadow-lg">
                  <CheckSquare className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Barcha kontentlar tekshirilgan!
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Hozircha moderatsiyadan o'tishi kerak bo'lgan yangi kurslar yo'q.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingContent.map((item) => (
                  <div
                    key={item.id}
                    className="group p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:shadow-xl space-y-5 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 text-[10px] font-extrabold rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider border border-indigo-500/20">
                          {item.type || 'Kurs'}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {item.createdAt || 'Yangi'}
                        </span>
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {item.description || 'Tavsif berilmagan'}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 pt-2">
                        <User className="w-4 h-4 text-indigo-500" />
                        <span>Muallif: {item.authorName || 'Noma’lum'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                      <button
                        onClick={() => handleApprove(item.id)}
                        disabled={processingId === item.id}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
                      >
                        {processingId === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Tasdiqlash</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        disabled={processingId === item.id}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20 flex items-center justify-center gap-1.5"
                      >
                        {processingId === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <X className="w-4 h-4" />
                            <span>Rad Etish</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* REPORTS TAB */}
        {moderatorTab === 'reports' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 space-y-8 shadow-xl transition-all">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                    Foydalanuvchilar E'tirozlari va Shikoyatlari
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Noo'rin kontent va qoida buzilishlari haqidagi xabarlar.
                  </p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Shikoyatlar yuklanmoqda...
                </span>
              </div>
            ) : reports.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 shadow-lg">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Hozircha shikoyatlar kelib tushmagan
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase">
                          {rep.reason || 'Shikoyat'}
                        </span>
                        <span className="text-xs text-slate-400">{rep.createdAt || 'Bugun'}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {rep.targetTitle || "Noma'lum Ob'yekt"}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {rep.details || 'Batafsil ma’lumot ko‘rsatilmadi.'}
                      </p>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md self-start sm:self-center">
                      Ko'rib Chiqish
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