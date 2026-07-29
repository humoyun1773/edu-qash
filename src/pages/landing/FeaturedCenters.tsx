import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Star, ArrowRight, ShieldCheck, MapPin, BookOpen, Users, Clock, Loader2 } from 'lucide-react';
import { centersApi } from '../../services/centersApi';
import type { LearningCenter } from '../../types';

export const FeaturedCenters: React.FC = () => {
  const [centers, setCenters] = useState<LearningCenter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    centersApi.getCenters()
      .then((res) => {
        if (isMounted) {
          setCenters(res || []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCenters([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          <span className="ml-3 text-slate-600 dark:text-slate-400 font-semibold">Markazlar yuklanmoqda...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Building2 className="w-4 h-4" /> Nufuzli O'quv Markazlar Katalogi
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Top Reytingdagi Markazlar
          </h2>
        </div>
        <Link 
          to="/centers" 
          className="btn-secondary text-xs font-bold py-2.5 px-4 shadow-sm hover:shadow-emerald-500/20 flex items-center gap-2"
        >
          Barcha Markazlar <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Content Grid / Empty State */}
      {centers.length === 0 ? (
        <div className="text-center py-16">
          <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-semibold">Hozircha o'quv markazlar mavjud emas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {centers.map((center) => (
            <div
              key={center.id}
              className="glass-card glass-card-hover overflow-hidden flex flex-col justify-between group border-emerald-500/20 hover:border-emerald-500/50 shadow-xl transition-all duration-300"
            >
              <div>
                {/* Center Cover & Header Badges */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={center.cover}
                    alt={`${center.name} muqovasi`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-emerald-400" /> {center.rating} ({center.reviewsCount} baho)
                  </div>
                  
                  {/* Verified Badge */}
                  {center.verified && (
                    <div className="absolute top-3.5 right-3.5 bg-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shadow-lg">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Rasmiy
                    </div>
                  )}

                  {/* Logo Avatar Overlay */}
                  <div className="absolute -bottom-6 left-6 w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500/50 p-1 shadow-2xl z-10">
                    <img 
                      src={center.logo} 
                      alt={`${center.name} logotipi`} 
                      className="w-full h-full object-cover rounded-xl" 
                    />
                  </div>
                </div>

                {/* Center Details */}
                <div className="p-6 pt-10 space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {center.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {center.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                    <MapPin className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">{center.address} ({center.city})</span>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-center text-xs">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                      <BookOpen className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mx-auto mb-1" />
                      <span className="block font-black text-slate-900 dark:text-white">{center.coursesCount}</span>
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400">Kurslar</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                      <Users className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mx-auto mb-1" />
                      <span className="block font-black text-slate-900 dark:text-white">{center.teachersCount}</span>
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400">Ustozlar</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                      <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400 mx-auto mb-1" />
                      <span className="block font-bold text-slate-900 dark:text-white text-[10px] truncate">{center.workingHours}</span>
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400">Ish vaqti</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-2 bg-slate-50/50 dark:bg-slate-950/40">
                <Link 
                  to={`/centers/${center.id}`} 
                  className="w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:border-emerald-500 hover:text-white font-extrabold text-xs text-center transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  Markaz Profilini Ko'rish <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedCenters;