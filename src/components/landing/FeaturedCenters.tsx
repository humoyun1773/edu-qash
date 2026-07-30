import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Star, ArrowRight, ShieldCheck, MapPin, BookOpen, Users, Clock, Loader2 } from 'lucide-react';
import { centersApi } from '../../services/centersApi';
import type { LearningCenter } from '../../types';

import { PageLoader } from '../common/PageLoader';

export const FeaturedCenters: React.FC = () => {
  const [centers, setCenters] = useState<LearningCenter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    centersApi.getCenters()
      .then((res) => setCenters(res || []))
      .catch(() => setCenters([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <PageLoader fullScreen={false} />
      </section>
    );
  }

  return (
    <section className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 my-16">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Building2 className="w-4 h-4 text-emerald-500" />
            </div>
            Nufuzli O‘quv Markazlar Katalogi
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 tracking-tight font-display">
            Top Reytingdagi Markazlar
          </h2>
        </div>

        <Link 
          to="/centers" 
          className="py-3 px-6 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-xs border border-slate-300/80 dark:border-slate-700/80 active:scale-95 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <span>Barcha Markazlar</span> 
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Empty State or Centers Grid */}
      {centers.length === 0 ? (
        <div className="text-center py-20 bg-white/40 dark:bg-slate-900/40 rounded-3xl backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Building2 className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Hozircha o'quv markazlar mavjud emas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {centers.map((center) => (
            <div
              key={center.id}
              className="group overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/50 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Cover Banner */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={center.cover}
                    alt={center.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-black text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-xl">
                    <Star className="w-3.5 h-3.5 fill-emerald-400" /> {center.rating} <span className="text-slate-400 font-normal">({center.reviewsCount})</span>
                  </div>

                  {/* Verified Badge */}
                  {center.verified && (
                    <div className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shadow-xl">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Rasmiy
                    </div>
                  )}

                  {/* Logo Overlap */}
                  <div className="absolute -bottom-6 left-6 w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500/50 p-1 shadow-2xl z-10 group-hover:scale-105 transition-transform duration-300">
                    <img src={center.logo} alt={center.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 pt-10 space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white font-display group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {center.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed font-medium">
                      {center.description}
                    </p>
                  </div>

                  {/* Location Info */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-bold pt-1">
                    <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="truncate">{center.address} ({center.city})</span>
                  </div>

                  {/* Stat Badges Row */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs">
                    <div className="p-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200/60 dark:border-slate-800/60">
                      <BookOpen className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
                      <span className="block font-black text-slate-900 dark:text-white font-display">{center.coursesCount}</span>
                      <span className="block text-[10px] text-slate-400 font-medium">Kurslar</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200/60 dark:border-slate-800/60">
                      <Users className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                      <span className="block font-black text-slate-900 dark:text-white font-display">{center.teachersCount}</span>
                      <span className="block text-[10px] text-slate-400 font-medium">Ustozlar</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200/60 dark:border-slate-800/60">
                      <Clock className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                      <span className="block font-bold text-slate-900 dark:text-white text-[10px] truncate">{center.workingHours}</span>
                      <span className="block text-[10px] text-slate-400 font-medium">Ish vaqti</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Action Link */}
              <div className="px-6 pb-6 pt-2 bg-slate-50/50 dark:bg-slate-950/40">
                <Link 
                  to="/centers" 
                  className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:border-emerald-500 hover:text-white font-extrabold text-xs text-center transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Markaz Profilini Ko‘rish</span> 
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};